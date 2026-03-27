const SONG_HEADERS = [
  "id",
  "producer",
  "artist",
  "title",
  "lyrics",
  "notes",
  "source",
  "coverUrl",
  "youtubeUrl",
  "createdAt",
  "updatedAt",
  "coverFileId"
];

function doGet(e) {
  try {
    const action = cleanValue(e && e.parameter && e.parameter.action);

    if (action === "catalog") {
      return jsonResponse({
        ok: true,
        songs: readSongs_()
      });
    }

    if (action === "health") {
      const settings = getSettings_();
      return jsonResponse({
        ok: true,
        status: "ready",
        sheetId: settings.sheetId,
        coversFolderId: settings.coversFolderId
      });
    }

    return jsonResponse({
      ok: false,
      error: "Acao GET invalida."
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : "Falha interna no Apps Script."
    });
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const action = cleanValue(payload.action);

    if (action === "login") {
      requireAdminKey_(payload.adminKey);
      return jsonResponse({ ok: true });
    }

    if (action === "saveSong") {
      requireAdminKey_(payload.adminKey);
      const savedSong = upsertSong_(payload.song || {});
      return jsonResponse({ ok: true, song: savedSong });
    }

    if (action === "deleteSong") {
      requireAdminKey_(payload.adminKey);
      deleteSong_(payload.songId);
      return jsonResponse({ ok: true });
    }

    if (action === "uploadCover") {
      requireAdminKey_(payload.adminKey);
      const uploadedCover = saveCover_(payload.songId, payload.producer, payload.coverDataUrl, payload.extension);
      return jsonResponse({ ok: true, coverUrl: uploadedCover.coverUrl, coverFileId: uploadedCover.coverFileId });
    }

    return jsonResponse({
      ok: false,
      error: "Acao POST invalida."
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : "Falha interna no Apps Script."
    });
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSettings_() {
  const properties = PropertiesService.getScriptProperties();
  const rawSheetId = cleanValue(properties.getProperty("SHEET_ID"));
  const rawCoversFolderId = cleanValue(properties.getProperty("COVERS_FOLDER_ID"));
  const sheetId = normalizeGoogleResourceId_(rawSheetId);
  const coversFolderId = normalizeGoogleResourceId_(rawCoversFolderId);
  const adminKey = cleanValue(properties.getProperty("ADMIN_KEY"));

  if (!rawSheetId) {
    throw new Error("SHEET_ID nao configurado.");
  }

  if (!sheetId) {
    throw new Error("https://docs.google.com/spreadsheets/d/1ItUq7CaWbVVHH1M1Qg1dutJLFsZOXMEqrDP-Xutvvek/edit?gid=0#gid=0");
  }

  if (!rawCoversFolderId) {
    throw new Error("COVERS_FOLDER_ID nao configurado.");
  }

  if (!coversFolderId) {
    throw new Error("https://drive.google.com/drive/folders/1RFct9qkSQZqG01bqwGWT3sUFqLz5rzSL");
  }

  if (!adminKey) {
    throw new Error("ADMIN_KEY nao configurado.");
  }

  return {
    sheetId: sheetId,
    coversFolderId: coversFolderId,
    adminKey: adminKey
  };
}

function requireAdminKey_(receivedKey) {
  const settings = getSettings_();
  const normalizedKey = cleanValue(receivedKey);

  if (!normalizedKey || normalizedKey !== settings.adminKey) {
    throw new Error("Chave admin invalida.");
  }
}

function getSheet_() {
  const settings = getSettings_();
  let spreadsheet;

  try {
    spreadsheet = SpreadsheetApp.openById(settings.sheetId);
  } catch (error) {
    throw new Error("Nao consegui abrir a planilha. Revise a propriedade SHEET_ID e o acesso da planilha.");
  }

  let sheet = spreadsheet.getSheetByName("songs");

  if (!sheet) {
    sheet = spreadsheet.insertSheet("songs");
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, SONG_HEADERS.length).setValues([SONG_HEADERS]);
  } else {
    const headerRange = sheet.getRange(1, 1, 1, SONG_HEADERS.length);
    const currentHeaders = headerRange.getValues()[0];
    const needsHeaderReset = SONG_HEADERS.some(function(header, index) {
      return cleanValue(currentHeaders[index]) !== header;
    });

    if (needsHeaderReset) {
      headerRange.setValues([SONG_HEADERS]);
    }
  }

  return sheet;
}

function readSongs_() {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, SONG_HEADERS.length).getValues();
  const songs = rows
    .map(function(row) {
      return rowToSong_(row);
    })
    .filter(function(song) {
      return cleanValue(song.id);
    });

  songs.sort(function(leftSong, rightSong) {
    const artistCompare = leftSong.artist.localeCompare(rightSong.artist);
    if (artistCompare !== 0) {
      return artistCompare;
    }

    return leftSong.title.localeCompare(rightSong.title);
  });

  return songs;
}

function rowToSong_(row) {
  return {
    id: cleanValue(row[0]),
    producer: cleanValue(row[1]),
    artist: cleanValue(row[2]),
    title: cleanValue(row[3]),
    lyrics: cleanValue(row[4]),
    notes: cleanValue(row[5]),
    source: cleanValue(row[6]),
    coverUrl: cleanValue(row[7]),
    youtubeUrl: cleanValue(row[8]),
    createdAt: cleanValue(row[9]),
    updatedAt: cleanValue(row[10]),
    coverFileId: cleanValue(row[11])
  };
}

function songToRow_(song) {
  return [
    cleanValue(song.id),
    cleanValue(song.producer),
    cleanValue(song.artist),
    cleanValue(song.title),
    cleanValue(song.lyrics),
    cleanValue(song.notes),
    cleanValue(song.source),
    cleanValue(song.coverUrl),
    cleanValue(song.youtubeUrl),
    cleanValue(song.createdAt),
    cleanValue(song.updatedAt),
    cleanValue(song.coverFileId)
  ];
}

function findSongRowIndex_(sheet, songId) {
  const songs = readSongs_();

  for (var index = 0; index < songs.length; index += 1) {
    if (songs[index].id === cleanValue(songId)) {
      return index + 2;
    }
  }

  return 0;
}

function upsertSong_(song) {
  const sheet = getSheet_();
  const nextSong = normalizeSong_(song);
  const rowIndex = findSongRowIndex_(sheet, nextSong.id);
  const currentSong = rowIndex ? rowToSong_(sheet.getRange(rowIndex, 1, 1, SONG_HEADERS.length).getValues()[0]) : null;

  if (currentSong) {
    const currentCoverFileId = cleanValue(currentSong.coverFileId);
    const nextCoverFileId = cleanValue(nextSong.coverFileId);
    const shouldClearCover = !cleanValue(nextSong.coverUrl);
    const shouldReplaceCover = currentCoverFileId && nextCoverFileId && currentCoverFileId !== nextCoverFileId;

    if ((shouldClearCover || shouldReplaceCover) && currentCoverFileId) {
      trashDriveFile_(currentCoverFileId);
    }

    if (shouldClearCover) {
      nextSong.coverFileId = "";
    } else if (!nextCoverFileId && currentCoverFileId && cleanValue(nextSong.coverUrl) === cleanValue(currentSong.coverUrl)) {
      nextSong.coverFileId = currentCoverFileId;
    }
  }

  if (rowIndex) {
    sheet.getRange(rowIndex, 1, 1, SONG_HEADERS.length).setValues([songToRow_(nextSong)]);
  } else {
    sheet.appendRow(songToRow_(nextSong));
  }

  return nextSong;
}

function deleteSong_(songId) {
  const sheet = getSheet_();
  const rowIndex = findSongRowIndex_(sheet, songId);

  if (!rowIndex) {
    return;
  }

  const currentSong = rowToSong_(sheet.getRange(rowIndex, 1, 1, SONG_HEADERS.length).getValues()[0]);

  if (cleanValue(currentSong.coverFileId)) {
    trashDriveFile_(currentSong.coverFileId);
  }

  sheet.deleteRow(rowIndex);
}

function saveCover_(songId, producer, coverDataUrl, extension) {
  const settings = getSettings_();
  let folder;

  try {
    folder = DriveApp.getFolderById(settings.coversFolderId);
  } catch (error) {
    throw new Error("Nao consegui abrir a pasta das capas. Revise a propriedade COVERS_FOLDER_ID e o acesso da pasta.");
  }

  const normalizedSongId = cleanValue(songId) || String(Date.now());
  const normalizedProducer = cleanValue(producer) === "alagoa" ? "alagoa" : "elite";
  const normalizedExtension = cleanValue(extension) || "jpg";
  const data = cleanValue(coverDataUrl);

  if (!data || data.indexOf("data:image/") !== 0) {
    throw new Error("Imagem invalida para upload.");
  }

  const base64 = data.split(",")[1] || "";
  const contentType = getContentTypeFromDataUrl_(data);
  const blob = Utilities.newBlob(Utilities.base64Decode(base64), contentType, normalizedProducer + "-" + normalizedSongId + "." + normalizedExtension);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    coverUrl: "https://drive.google.com/uc?export=view&id=" + file.getId(),
    coverFileId: file.getId()
  };
}

function normalizeSong_(song) {
  const now = new Date().toISOString();

  return {
    id: cleanValue(song.id) || String(Date.now()),
    producer: cleanValue(song.producer) === "alagoa" ? "alagoa" : "elite",
    artist: cleanValue(song.artist) || "Ministerio",
    title: cleanValue(song.title) || "Sem titulo",
    lyrics: cleanValue(song.lyrics),
    notes: cleanValue(song.notes),
    source: cleanValue(song.source),
    coverUrl: cleanValue(song.coverUrl),
    youtubeUrl: cleanValue(song.youtubeUrl),
    createdAt: cleanValue(song.createdAt) || now,
    updatedAt: cleanValue(song.updatedAt) || now,
    coverFileId: cleanValue(song.coverFileId)
  };
}

function getContentTypeFromDataUrl_(dataUrl) {
  if (dataUrl.indexOf("data:image/png") === 0) {
    return "image/png";
  }

  if (dataUrl.indexOf("data:image/webp") === 0) {
    return "image/webp";
  }

  return "image/jpeg";
}

function trashDriveFile_(fileId) {
  try {
    DriveApp.getFileById(cleanValue(fileId)).setTrashed(true);
  } catch (error) {
    // ignora arquivo ausente
  }
}

function normalizeGoogleResourceId_(value) {
  const normalizedValue = cleanValue(value);

  if (!normalizedValue) {
    return "";
  }

  const decodedValue = decodeURIComponent(normalizedValue);
  const urlMatches = [
    decodedValue.match(/\/d\/([A-Za-z0-9_-]{20,})/),
    decodedValue.match(/\/folders\/([A-Za-z0-9_-]{20,})/)
  ];

  for (var index = 0; index < urlMatches.length; index += 1) {
    if (urlMatches[index] && urlMatches[index][1]) {
      return urlMatches[index][1];
    }
  }

  if (/^[A-Za-z0-9_-]{20,}$/.test(decodedValue)) {
    return decodedValue;
  }

  const idCandidate = decodedValue
    .replace(/[?#].*$/, "")
    .split("/")
    .map(function(segment) {
      return cleanValue(segment);
    })
    .filter(function(segment) {
      return /^[A-Za-z0-9_-]{20,}$/.test(segment);
    })[0];

  return idCandidate || "";
}

function cleanValue(value) {
  return String(value || "").trim();
}
