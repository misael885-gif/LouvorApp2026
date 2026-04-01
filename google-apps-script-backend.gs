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
  "coverFileId",
  "audioTracksJson"
];

const DEFAULT_ROTATION_NAMES = ["Daniela", "Mileide", "Tamires"];
const DEFAULT_ROTATION_ANCHOR = "2026-03-23";
const AUDIO_TRACK_SLOTS = [
  { id: "back", label: "BACK" },
  { id: "drums", label: "DRUMS" },
  { id: "gtr", label: "GTR" },
  { id: "full", label: "MUSICA" },
  { id: "keys", label: "TECLADOS" }
];
const ACTIVE_PRESENCE_TTL_MS = 2 * 60 * 1000;

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

    if (action === "settings") {
      return jsonResponse(buildPublicSettings_());
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
      requireAdminLogin_(payload.username, payload.adminKey);
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

    if (action === "uploadStemTrack") {
      requireAdminKey_(payload.adminKey);
      const uploadedTrack = saveStemTrack_(
        payload.songId,
        payload.producer,
        payload.slotId,
        payload.fileBase64,
        payload.mimeType,
        payload.extension,
        payload.fileDataUrl
      );
      const updatedSong = upsertSongTrack_(payload.songId, payload.slotId, uploadedTrack.trackUrl, uploadedTrack.trackFileId);
      return jsonResponse({
        ok: true,
        trackUrl: uploadedTrack.trackUrl,
        trackFileId: uploadedTrack.trackFileId,
        song: updatedSong
      });
    }

    if (action === "resetSongTracks") {
      requireAdminKey_(payload.adminKey);
      const clearedSong = resetSongTracks_(payload.songId);
      return jsonResponse({
        ok: true,
        song: clearedSong
      });
    }

    if (action === "getTrackData") {
      const trackData = getSongTrackData_(payload.songId, payload.slotId);
      return jsonResponse({
        ok: true,
        fileId: trackData.fileId,
        fileName: trackData.fileName,
        mimeType: trackData.mimeType,
        base64: trackData.base64
      });
    }

    if (action === "saveRotationSettings") {
      requireAdminKey_(payload.adminKey);
      const savedRotation = saveRotationSettings_(payload.rotationNames, payload.rotationAnchor);
      const publicSettings = buildPublicSettings_();
      return jsonResponse({
        ok: true,
        rotationNames: savedRotation.rotationNames,
        rotationAnchor: savedRotation.rotationAnchor,
        memberLoginRequired: publicSettings.memberLoginRequired,
        memberUsernames: publicSettings.memberUsernames
      });
    }

    if (action === "saveSharedState") {
      const access = requireSharedStateAccess_(payload);
      const sharedState = saveSharedState_(payload.sharedState || {}, access);
      return jsonResponse({
        ok: true,
        sharedState: sharedState
      });
    }

    if (action === "syncPresence") {
      const access = requireSharedStateAccess_(payload);
      const presence = syncPresence_(payload.sessionId, access);
      return jsonResponse({
        ok: true,
        onlineUsersCount: presence.onlineUsersCount,
        onlineUsernames: presence.onlineUsernames
      });
    }

    if (action === "signOutPresence") {
      const access = requireSharedStateAccess_(payload);
      const presence = removePresence_(payload.sessionId);
      return jsonResponse({
        ok: true,
        onlineUsersCount: presence.onlineUsersCount,
        onlineUsernames: presence.onlineUsernames
      });
    }

    if (action === "listMembers") {
      requireAdminKey_(payload.adminKey);
      return jsonResponse({
        ok: true,
        members: readMembers_().map(function(member) {
          return {
            username: member.username,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt
          };
        })
      });
    }

    if (action === "saveMember") {
      requireAdminKey_(payload.adminKey);
      const members = saveMember_(payload.username, payload.passwordHash);
      return jsonResponse({
        ok: true,
        members: members.map(function(member) {
          return {
            username: member.username,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt
          };
        })
      });
    }

    if (action === "deleteMember") {
      requireAdminKey_(payload.adminKey);
      const members = deleteMember_(payload.username);
      return jsonResponse({
        ok: true,
        members: members.map(function(member) {
          return {
            username: member.username,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt
          };
        })
      });
    }

    if (action === "memberLogin") {
      const member = validateMemberLogin_(payload.username, payload.passwordHash);
      return jsonResponse({
        ok: true,
        username: member.username
      });
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

function ensureTracksFolderId_(rawTracksFolderId, coversFolderId) {
  const properties = PropertiesService.getScriptProperties();
  const normalizedTracksFolderId = normalizeGoogleResourceId_(rawTracksFolderId);

  if (normalizedTracksFolderId) {
    return normalizedTracksFolderId;
  }

  const coversFolder = DriveApp.getFolderById(coversFolderId);
  const childFolders = coversFolder.getFoldersByName("Tracks MP3");
  const tracksFolder = childFolders.hasNext()
    ? childFolders.next()
    : coversFolder.createFolder("Tracks MP3");

  properties.setProperty("TRACKS_FOLDER_ID", tracksFolder.getId());
  return tracksFolder.getId();
}

function getSettings_() {
  const properties = PropertiesService.getScriptProperties();
  const rawSheetId = cleanValue(properties.getProperty("SHEET_ID"));
  const rawCoversFolderId = cleanValue(properties.getProperty("COVERS_FOLDER_ID"));
  const rawTracksFolderId = cleanValue(properties.getProperty("TRACKS_FOLDER_ID"));
  const sheetId = normalizeGoogleResourceId_(rawSheetId);
  const coversFolderId = normalizeGoogleResourceId_(rawCoversFolderId);
  const adminKey = cleanValue(properties.getProperty("ADMIN_KEY"));
  const adminUsername = cleanValue(properties.getProperty("ADMIN_USERNAME")) || "admin";

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

  const tracksFolderId = ensureTracksFolderId_(rawTracksFolderId, coversFolderId);

  return {
    sheetId: sheetId,
    coversFolderId: coversFolderId,
    tracksFolderId: tracksFolderId,
    adminKey: adminKey,
    adminUsername: adminUsername
  };
}

function requireAdminKey_(receivedKey) {
  const settings = getSettings_();
  const normalizedKey = cleanValue(receivedKey);

  if (!normalizedKey || normalizedKey !== settings.adminKey) {
    throw new Error("Chave admin invalida.");
  }
}

function requireAdminLogin_(username, receivedKey) {
  const settings = getSettings_();
  const normalizedUsername = normalizeMemberUsername_(username || "admin");
  const normalizedAdminUsername = normalizeMemberUsername_(settings.adminUsername || "admin");
  const normalizedKey = cleanValue(receivedKey);

  if (!normalizedUsername || normalizedUsername !== normalizedAdminUsername || !normalizedKey || normalizedKey !== settings.adminKey) {
    throw new Error("Usuario ou senha do administrador invalidos.");
  }
}

function requireSharedStateAccess_(payload) {
  const adminKey = cleanValue(payload && payload.adminKey);

  if (adminKey) {
    requireAdminKey_(adminKey);
    return {
      role: "admin",
      username: getSettings_().adminUsername || "admin"
    };
  }

  const member = validateMemberLogin_(payload && payload.username, payload && payload.passwordHash);

  return {
    role: "member",
    username: member.username
  };
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
    coverFileId: cleanValue(row[11]),
    audioTracks: parseAudioTracksJson_(row[12])
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
    cleanValue(song.coverFileId),
    audioTracksToJson_(song.audioTracks)
  ];
}

function findSongRowMatch_(sheet, songId) {
  const normalizedSongId = cleanValue(songId);
  const lastRow = sheet.getLastRow();

  if (!normalizedSongId || lastRow < 2) {
    return null;
  }

  const idRows = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

  for (var index = 0; index < idRows.length; index += 1) {
    if (cleanValue(idRows[index][0]) === normalizedSongId) {
      const rowIndex = index + 2;
      return {
        rowIndex: rowIndex,
        row: sheet.getRange(rowIndex, 1, 1, SONG_HEADERS.length).getValues()[0]
      };
    }
  }

  return null;
}

function findSongRowIndex_(sheet, songId) {
  const rowMatch = findSongRowMatch_(sheet, songId);
  return rowMatch ? rowMatch.rowIndex : 0;
}

function upsertSong_(song) {
  const sheet = getSheet_();
  const nextSong = normalizeSong_(song);
  const rowMatch = findSongRowMatch_(sheet, nextSong.id);
  const rowIndex = rowMatch ? rowMatch.rowIndex : 0;
  const currentSong = rowMatch ? rowToSong_(rowMatch.row) : null;

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

    nextSong.audioTracks = reconcileAudioTracks_(currentSong.audioTracks, nextSong.audioTracks);
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

  AUDIO_TRACK_SLOTS.forEach(function(slot) {
    const track = currentSong.audioTracks && currentSong.audioTracks[slot.id];
    const trackFileId = cleanValue(track && track.fileId);

    if (trackFileId) {
      trashDriveFile_(trackFileId);
    }
  });

  const legacyClickTrack = currentSong.audioTracks && currentSong.audioTracks.click;
  const legacyClickFileId = cleanValue(legacyClickTrack && legacyClickTrack.fileId);

  if (legacyClickFileId) {
    trashDriveFile_(legacyClickFileId);
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

function saveStemTrack_(songId, producer, slotId, fileBase64, mimeType, extension, legacyFileDataUrl) {
  const settings = getSettings_();
  let folder;

  try {
    folder = DriveApp.getFolderById(settings.tracksFolderId);
  } catch (error) {
    throw new Error("Nao consegui abrir a pasta das tracks. Revise TRACKS_FOLDER_ID ou COVERS_FOLDER_ID.");
  }

  const normalizedSongId = cleanValue(songId) || String(Date.now());
  const normalizedProducer = cleanValue(producer) === "alagoa" ? "alagoa" : "elite";
  const normalizedSlotId = normalizeAudioTrackSlotId_(slotId);
  const normalizedExtension = cleanValue(extension) || "mp3";
  const normalizedBase64 = extractUploadBase64_(fileBase64, legacyFileDataUrl);
  const contentType = resolveStemContentType_(mimeType, normalizedExtension, legacyFileDataUrl);

  if (!normalizedSlotId) {
    throw new Error("Faixa de audio invalida para upload.");
  }

  if (!normalizedBase64) {
    throw new Error("Arquivo de audio invalido para upload.");
  }

  trashMatchingStemFiles_(folder, normalizedProducer, normalizedSongId, normalizedSlotId);
  const blob = Utilities.newBlob(
    Utilities.base64Decode(normalizedBase64),
    contentType,
    "stem-" + normalizedProducer + "-" + normalizedSongId + "-" + normalizedSlotId + "." + normalizedExtension
  );
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    trackUrl: buildDriveFileUrl_(file.getId()),
    trackFileId: file.getId()
  };
}

function upsertSongTrack_(songId, slotId, trackUrl, trackFileId) {
  const sheet = getSheet_();
  const rowIndex = findSongRowIndex_(sheet, songId);

  if (!rowIndex) {
    throw new Error("Nao encontrei a musica para vincular a track.");
  }

  const currentSong = rowToSong_(sheet.getRange(rowIndex, 1, 1, SONG_HEADERS.length).getValues()[0]);
  const normalizedSlotId = normalizeAudioTrackSlotId_(slotId);

  if (!normalizedSlotId) {
    throw new Error("Faixa de audio invalida para salvar.");
  }

  currentSong.audioTracks = normalizeAudioTracks_(currentSong.audioTracks);
  currentSong.audioTracks[normalizedSlotId] = {
    label: currentSong.audioTracks[normalizedSlotId].label,
    url: cleanValue(trackUrl),
    fileId: cleanValue(trackFileId)
  };
  currentSong.updatedAt = new Date().toISOString();
  sheet.getRange(rowIndex, 1, 1, SONG_HEADERS.length).setValues([songToRow_(currentSong)]);
  return currentSong;
}

function extractUploadBase64_(fileBase64, legacyFileDataUrl) {
  const normalizedBase64 = cleanValue(fileBase64);

  if (normalizedBase64) {
    return normalizedBase64;
  }

  const normalizedDataUrl = cleanValue(legacyFileDataUrl);

  if (!normalizedDataUrl || normalizedDataUrl.indexOf("data:audio/") !== 0) {
    return "";
  }

  return normalizedDataUrl.split(",")[1] || "";
}

function resolveStemContentType_(mimeType, extension, legacyFileDataUrl) {
  const normalizedMimeType = cleanValue(mimeType).toLowerCase();

  if (normalizedMimeType.indexOf("audio/") === 0) {
    return normalizedMimeType;
  }

  const normalizedExtension = cleanValue(extension).toLowerCase();

  if (normalizedExtension === "wav") {
    return "audio/wav";
  }

  if (normalizedExtension === "aac" || normalizedExtension === "m4a" || normalizedExtension === "mp4") {
    return "audio/mp4";
  }

  if (cleanValue(legacyFileDataUrl).indexOf("data:audio/") === 0) {
    return getContentTypeFromDataUrl_(legacyFileDataUrl);
  }

  return "audio/mpeg";
}

function resetSongTracks_(songId) {
  const sheet = getSheet_();
  const rowIndex = findSongRowIndex_(sheet, songId);

  if (!rowIndex) {
    throw new Error("Nao encontrei a musica para limpar as tracks.");
  }

  const currentSong = rowToSong_(sheet.getRange(rowIndex, 1, 1, SONG_HEADERS.length).getValues()[0]);
  const settings = getSettings_();
  let folder = null;

  try {
    folder = DriveApp.getFolderById(settings.tracksFolderId);
  } catch (_error) {
    folder = null;
  }

  AUDIO_TRACK_SLOTS.forEach(function(slot) {
    const track = currentSong.audioTracks && currentSong.audioTracks[slot.id];
    const trackFileId = cleanValue(track && track.fileId);

    if (trackFileId) {
      trashDriveFile_(trackFileId);
    }

    if (folder) {
      trashMatchingStemFiles_(folder, currentSong.producer, currentSong.id, slot.id);
    }
  });

  const legacyClickTrack = currentSong.audioTracks && currentSong.audioTracks.click;
  const legacyClickFileId = cleanValue(legacyClickTrack && legacyClickTrack.fileId);

  if (legacyClickFileId) {
    trashDriveFile_(legacyClickFileId);
  }

  if (folder) {
    trashMatchingStemFiles_(folder, currentSong.producer, currentSong.id, "click");
  }

  currentSong.audioTracks = createEmptyAudioTracks_();
  currentSong.updatedAt = new Date().toISOString();
  sheet.getRange(rowIndex, 1, 1, SONG_HEADERS.length).setValues([songToRow_(currentSong)]);
  return currentSong;
}

function getSongTrackData_(songId, slotId) {
  const sheet = getSheet_();
  const rowIndex = findSongRowIndex_(sheet, songId);

  if (!rowIndex) {
    throw new Error("Nao encontrei a musica para abrir o MP3.");
  }

  const currentSong = rowToSong_(sheet.getRange(rowIndex, 1, 1, SONG_HEADERS.length).getValues()[0]);
  const normalizedSlotId = normalizeAudioTrackSlotId_(slotId);

  if (!normalizedSlotId) {
    throw new Error("Faixa de audio invalida.");
  }

  const audioTracks = normalizeAudioTracks_(currentSong.audioTracks);
  const track = audioTracks[normalizedSlotId];
  const fileId = cleanValue(track && track.fileId);

  if (!fileId) {
    throw new Error("Essa faixa ainda nao recebeu MP3.");
  }

  const file = DriveApp.getFileById(fileId);
  const blob = file.getBlob();
  const bytes = blob.getBytes();

  if (!bytes || !bytes.length) {
    throw new Error("O MP3 dessa faixa esta vazio.");
  }

  return {
    fileId: fileId,
    fileName: cleanValue(file.getName()),
    mimeType: cleanValue(blob.getContentType()) || "audio/mpeg",
    base64: Utilities.base64Encode(bytes)
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
    coverFileId: cleanValue(song.coverFileId),
    audioTracks: normalizeAudioTracks_(song.audioTracks)
  };
}

function normalizeAudioTrackSlotId_(slotId) {
  const normalizedSlotId = cleanValue(slotId).toLowerCase();
  const matchedSlot = AUDIO_TRACK_SLOTS.filter(function(slot) {
    return slot.id === normalizedSlotId;
  })[0];

  return matchedSlot ? matchedSlot.id : "";
}

function createEmptyAudioTracks_() {
  const tracks = {};

  AUDIO_TRACK_SLOTS.forEach(function(slot) {
    tracks[slot.id] = {
      label: slot.label,
      url: "",
      fileId: ""
    };
  });

  return tracks;
}

function parseAudioTracksJson_(rawValue) {
  const normalizedValue = cleanValue(rawValue);

  if (!normalizedValue) {
    return createEmptyAudioTracks_();
  }

  try {
    return normalizeAudioTracks_(JSON.parse(normalizedValue));
  } catch (error) {
    return createEmptyAudioTracks_();
  }
}

function normalizeAudioTracks_(input) {
  const source = input && typeof input === "object" ? input : {};
  const normalizedTracks = createEmptyAudioTracks_();

  AUDIO_TRACK_SLOTS.forEach(function(slot) {
    const entry = source[slot.id] && typeof source[slot.id] === "object" ? source[slot.id] : {};
    normalizedTracks[slot.id] = {
      label: slot.label,
      url: cleanValue(entry.url),
      fileId: cleanValue(entry.fileId)
    };
  });

  return normalizedTracks;
}

function audioTracksToJson_(audioTracks) {
  return JSON.stringify(normalizeAudioTracks_(audioTracks));
}

function reconcileAudioTracks_(currentAudioTracks, nextAudioTracks) {
  const currentTracks = normalizeAudioTracks_(currentAudioTracks);
  const updatedTracks = normalizeAudioTracks_(nextAudioTracks);

  AUDIO_TRACK_SLOTS.forEach(function(slot) {
    const currentTrack = currentTracks[slot.id];
    const nextTrack = updatedTracks[slot.id];
    const currentFileId = cleanValue(currentTrack.fileId);
    const nextFileId = cleanValue(nextTrack.fileId);
    const currentUrl = cleanValue(currentTrack.url);
    const nextUrl = cleanValue(nextTrack.url);
    const shouldClearTrack = !nextUrl;
    const shouldReplaceTrack = currentFileId && nextFileId && currentFileId !== nextFileId;

    if ((shouldClearTrack || shouldReplaceTrack) && currentFileId) {
      trashDriveFile_(currentFileId);
    }

    if (shouldClearTrack) {
      nextTrack.url = "";
      nextTrack.fileId = "";
    } else if (!nextFileId && currentFileId && nextUrl === currentUrl) {
      nextTrack.fileId = currentFileId;
    }
  });

  const legacyClickTrack = currentAudioTracks && typeof currentAudioTracks === "object"
    ? currentAudioTracks.click
    : null;
  const legacyClickFileId = cleanValue(legacyClickTrack && legacyClickTrack.fileId);

  if (legacyClickFileId) {
    trashDriveFile_(legacyClickFileId);
  }

  return updatedTracks;
}

function buildDriveFileUrl_(fileId) {
  return "https://drive.usercontent.google.com/download?id=" + fileId + "&export=download&authuser=0&confirm=t";
}

function trashMatchingStemFiles_(folder, producer, songId, slotId) {
  if (!folder) {
    return;
  }

  const normalizedProducer = cleanValue(producer) === "alagoa" ? "alagoa" : "elite";
  const normalizedSongId = cleanValue(songId);
  const normalizedSlotId = normalizeAudioTrackSlotId_(slotId);

  if (!normalizedSongId || !normalizedSlotId) {
    return;
  }

  const filePrefix = "stem-" + normalizedProducer + "-" + normalizedSongId + "-" + normalizedSlotId + ".";
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = cleanValue(file.getName());

    if (fileName.indexOf(filePrefix) === 0) {
      file.setTrashed(true);
    }
  }
}

function buildPublicSettings_() {
  const rotationSettings = readRotationSettings_();
  const members = readMembers_();
  const sharedState = readSharedState_();
  const presence = readActivePresence_();

  return {
    ok: true,
    rotationNames: rotationSettings.rotationNames,
    rotationAnchor: rotationSettings.rotationAnchor,
    favorites: sharedState.favorites,
    manualRotationOffset: sharedState.manualRotationOffset,
    weeklySelectedSongIds: sharedState.weeklySelectedSongIds,
    weeklySelectionOwners: sharedState.weeklySelectionOwners,
    weeklySelectionWeekKey: sharedState.weeklySelectionWeekKey,
    memberLoginRequired: members.length > 0,
    onlineUsersCount: presence.onlineUsersCount,
    onlineUsernames: presence.onlineUsernames,
    memberUsernames: members.map(function(member) {
      return member.username;
    })
  };
}

function readActivePresence_() {
  const properties = PropertiesService.getScriptProperties();
  var parsedPresence;

  try {
    parsedPresence = JSON.parse(cleanValue(properties.getProperty("ACTIVE_PRESENCE_JSON")) || "{}");
  } catch (error) {
    parsedPresence = {};
  }

  const now = Date.now();
  const nextPresence = {};
  var hasChanged = false;

  Object.keys(parsedPresence).forEach(function(sessionId) {
    const entry = parsedPresence[sessionId] && typeof parsedPresence[sessionId] === "object"
      ? parsedPresence[sessionId]
      : {};
    const normalizedSessionId = cleanValue(sessionId);
    const normalizedUsername = cleanValue(entry.username);
    const normalizedRole = cleanValue(entry.role);
    const lastSeenAt = Number(entry.lastSeenAt);

    if (!normalizedSessionId || !normalizedUsername || !normalizedRole || !isFinite(lastSeenAt) || now - lastSeenAt > ACTIVE_PRESENCE_TTL_MS) {
      hasChanged = true;
      return;
    }

    nextPresence[normalizedSessionId] = {
      username: normalizedUsername,
      role: normalizedRole,
      lastSeenAt: lastSeenAt
    };
  });

  if (hasChanged) {
    properties.setProperty("ACTIVE_PRESENCE_JSON", JSON.stringify(nextPresence));
  }

  return summarizePresence_(nextPresence);
}

function summarizePresence_(presenceSessions) {
  const source = presenceSessions && typeof presenceSessions === "object" ? presenceSessions : {};
  const seenUsernames = {};
  const usernames = [];

  Object.keys(source).forEach(function(sessionId) {
    const entry = source[sessionId] && typeof source[sessionId] === "object" ? source[sessionId] : {};
    const normalizedUsername = cleanValue(entry.username);
    const usernameKey = normalizeMemberUsername_(normalizedUsername);

    if (!normalizedUsername || !usernameKey || seenUsernames[usernameKey]) {
      return;
    }

    seenUsernames[usernameKey] = true;
    usernames.push(normalizedUsername);
  });

  usernames.sort(function(leftUsername, rightUsername) {
    return leftUsername.localeCompare(rightUsername);
  });

  return {
    sessions: source,
    onlineUsersCount: usernames.length,
    onlineUsernames: usernames
  };
}

function syncPresence_(sessionId, access) {
  const normalizedSessionId = cleanValue(sessionId);

  if (!normalizedSessionId) {
    throw new Error("Sessao online invalida.");
  }

  const properties = PropertiesService.getScriptProperties();
  const presence = readActivePresence_();
  const nextPresence = presence.sessions;

  nextPresence[normalizedSessionId] = {
    username: cleanValue(access && access.username),
    role: cleanValue(access && access.role) || "member",
    lastSeenAt: Date.now()
  };

  properties.setProperty("ACTIVE_PRESENCE_JSON", JSON.stringify(nextPresence));
  return summarizePresence_(nextPresence);
}

function removePresence_(sessionId) {
  const normalizedSessionId = cleanValue(sessionId);
  const properties = PropertiesService.getScriptProperties();
  const presence = readActivePresence_();
  const nextPresence = presence.sessions;

  if (normalizedSessionId) {
    delete nextPresence[normalizedSessionId];
  }

  properties.setProperty("ACTIVE_PRESENCE_JSON", JSON.stringify(nextPresence));
  return summarizePresence_(nextPresence);
}

function readRotationSettings_() {
  const properties = PropertiesService.getScriptProperties();
  var parsedRotationNames;

  try {
    parsedRotationNames = JSON.parse(cleanValue(properties.getProperty("ROTATION_NAMES_JSON")) || "[]");
  } catch (error) {
    parsedRotationNames = [];
  }

  return {
    rotationNames: sanitizeRotationNames_(parsedRotationNames),
    rotationAnchor: normalizeRotationAnchor_(properties.getProperty("ROTATION_ANCHOR"))
  };
}

function saveRotationSettings_(rotationNames, rotationAnchor) {
  const properties = PropertiesService.getScriptProperties();
  const normalizedRotationNames = sanitizeRotationNames_(rotationNames);
  const normalizedRotationAnchor = normalizeRotationAnchor_(rotationAnchor);

  properties.setProperty("ROTATION_NAMES_JSON", JSON.stringify(normalizedRotationNames));
  properties.setProperty("ROTATION_ANCHOR", normalizedRotationAnchor);

  return {
    rotationNames: normalizedRotationNames,
    rotationAnchor: normalizedRotationAnchor
  };
}

function readSharedState_() {
  const properties = PropertiesService.getScriptProperties();
  var parsedState;

  try {
    parsedState = JSON.parse(cleanValue(properties.getProperty("SHARED_APP_STATE_JSON")) || "{}");
  } catch (error) {
    parsedState = {};
  }

  var weeklySelectedSongIds = sanitizeStringArray_(parsedState.weeklySelectedSongIds);

  return {
    favorites: sanitizeStringArray_(parsedState.favorites),
    manualRotationOffset: normalizeManualRotationOffset_(parsedState.manualRotationOffset),
    weeklySelectedSongIds: weeklySelectedSongIds,
    weeklySelectionOwners: sanitizeWeeklySelectionOwners_(parsedState.weeklySelectionOwners, weeklySelectedSongIds),
    weeklySelectionWeekKey: normalizeWeekKey_(parsedState.weeklySelectionWeekKey)
  };
}

function writeSharedState_(sharedState) {
  const normalizedSharedState = {
    favorites: sanitizeStringArray_(sharedState.favorites),
    manualRotationOffset: normalizeManualRotationOffset_(sharedState.manualRotationOffset),
    weeklySelectedSongIds: sanitizeStringArray_(sharedState.weeklySelectedSongIds),
    weeklySelectionOwners: sanitizeWeeklySelectionOwners_(sharedState.weeklySelectionOwners, sharedState.weeklySelectedSongIds),
    weeklySelectionWeekKey: normalizeWeekKey_(sharedState.weeklySelectionWeekKey)
  };

  PropertiesService.getScriptProperties().setProperty("SHARED_APP_STATE_JSON", JSON.stringify(normalizedSharedState));
  return normalizedSharedState;
}

function saveSharedState_(sharedState, access) {
  const currentState = readSharedState_();
  const nextState = {
    favorites: hasOwnProperty_(sharedState, "favorites") ? sanitizeStringArray_(sharedState.favorites) : currentState.favorites,
    manualRotationOffset: currentState.manualRotationOffset,
    weeklySelectedSongIds: hasOwnProperty_(sharedState, "weeklySelectedSongIds")
      ? sanitizeStringArray_(sharedState.weeklySelectedSongIds)
      : currentState.weeklySelectedSongIds,
    weeklySelectionOwners: currentState.weeklySelectionOwners,
    weeklySelectionWeekKey: hasOwnProperty_(sharedState, "weeklySelectionWeekKey")
      ? normalizeWeekKey_(sharedState.weeklySelectionWeekKey)
      : currentState.weeklySelectionWeekKey
  };

  if (access && access.role === "admin" && hasOwnProperty_(sharedState, "manualRotationOffset")) {
    nextState.manualRotationOffset = normalizeManualRotationOffset_(sharedState.manualRotationOffset);
  }

  if (hasOwnProperty_(sharedState, "weeklySelectionOwners")) {
    nextState.weeklySelectionOwners = sanitizeWeeklySelectionOwners_(
      sharedState.weeklySelectionOwners,
      nextState.weeklySelectedSongIds
    );
  } else {
    nextState.weeklySelectionOwners = sanitizeWeeklySelectionOwners_(
      currentState.weeklySelectionOwners,
      nextState.weeklySelectedSongIds
    );
  }

  return writeSharedState_(nextState);
}

function readMembers_() {
  const properties = PropertiesService.getScriptProperties();
  var parsedMembers;

  try {
    parsedMembers = JSON.parse(cleanValue(properties.getProperty("MEMBER_ACCOUNTS_JSON")) || "[]");
  } catch (error) {
    parsedMembers = [];
  }

  return (Array.isArray(parsedMembers) ? parsedMembers : [])
    .map(function(member) {
      return {
        username: cleanValue(member.username),
        usernameKey: normalizeMemberUsername_(member.usernameKey || member.username),
        passwordHash: cleanValue(member.passwordHash),
        createdAt: cleanValue(member.createdAt),
        updatedAt: cleanValue(member.updatedAt)
      };
    })
    .filter(function(member) {
      return member.username && member.usernameKey && member.passwordHash;
    })
    .sort(function(leftMember, rightMember) {
      return leftMember.username.localeCompare(rightMember.username);
    });
}

function writeMembers_(members) {
  const normalizedMembers = (Array.isArray(members) ? members : [])
    .map(function(member) {
      return {
        username: cleanValue(member.username),
        usernameKey: normalizeMemberUsername_(member.usernameKey || member.username),
        passwordHash: cleanValue(member.passwordHash),
        createdAt: cleanValue(member.createdAt),
        updatedAt: cleanValue(member.updatedAt)
      };
    })
    .filter(function(member) {
      return member.username && member.usernameKey && member.passwordHash;
    })
    .sort(function(leftMember, rightMember) {
      return leftMember.username.localeCompare(rightMember.username);
    });

  PropertiesService.getScriptProperties().setProperty("MEMBER_ACCOUNTS_JSON", JSON.stringify(normalizedMembers));
  return normalizedMembers;
}

function saveMember_(username, passwordHash) {
  const normalizedUsername = cleanValue(username);
  const usernameKey = normalizeMemberUsername_(username);
  const normalizedPasswordHash = cleanValue(passwordHash);

  if (!normalizedUsername || !usernameKey || !normalizedPasswordHash) {
    throw new Error("Usuario e senha do membro sao obrigatorios.");
  }

  const now = new Date().toISOString();
  const members = readMembers_();
  const nextMembers = [];
  var updated = false;

  for (var index = 0; index < members.length; index += 1) {
    var member = members[index];

    if (member.usernameKey !== usernameKey) {
      nextMembers.push(member);
      continue;
    }

    nextMembers.push({
      username: normalizedUsername,
      usernameKey: usernameKey,
      passwordHash: normalizedPasswordHash,
      createdAt: member.createdAt || now,
      updatedAt: now
    });
    updated = true;
  }

  if (!updated) {
    nextMembers.push({
      username: normalizedUsername,
      usernameKey: usernameKey,
      passwordHash: normalizedPasswordHash,
      createdAt: now,
      updatedAt: now
    });
  }

  return writeMembers_(nextMembers);
}

function deleteMember_(username) {
  const usernameKey = normalizeMemberUsername_(username);

  if (!usernameKey) {
    throw new Error("Usuario do membro invalido.");
  }

  return writeMembers_(readMembers_().filter(function(member) {
    return member.usernameKey !== usernameKey;
  }));
}

function validateMemberLogin_(username, passwordHash) {
  const usernameKey = normalizeMemberUsername_(username);
  const normalizedPasswordHash = cleanValue(passwordHash);

  if (!usernameKey || !normalizedPasswordHash) {
    throw new Error("Usuario ou senha do membro invalidos.");
  }

  var members = readMembers_();

  for (var index = 0; index < members.length; index += 1) {
    if (members[index].usernameKey === usernameKey && members[index].passwordHash === normalizedPasswordHash) {
      return members[index];
    }
  }

  throw new Error("Usuario ou senha do membro incorretos.");
}

function sanitizeStringArray_(values) {
  var source = Array.isArray(values) ? values : [];
  var normalizedValues = [];
  var seen = {};

  for (var index = 0; index < source.length; index += 1) {
    var currentValue = cleanValue(source[index]);

    if (!currentValue || seen[currentValue]) {
      continue;
    }

    seen[currentValue] = true;
    normalizedValues.push(currentValue);
  }

  return normalizedValues;
}

function sanitizeWeeklySelectionOwners_(owners, validSongIds) {
  var source = owners && typeof owners === "object" && !Array.isArray(owners) ? owners : {};
  var validIds = sanitizeStringArray_(validSongIds);
  var validLookup = {};
  var normalizedOwners = {};

  for (var index = 0; index < validIds.length; index += 1) {
    validLookup[validIds[index]] = true;
  }

  Object.keys(source).forEach(function(songId) {
    var normalizedSongId = cleanValue(songId);
    var normalizedUsername = cleanValue(source[songId]);

    if (!normalizedSongId || !normalizedUsername || !validLookup[normalizedSongId]) {
      return;
    }

    normalizedOwners[normalizedSongId] = normalizedUsername;
  });

  return normalizedOwners;
}

function normalizeManualRotationOffset_(value) {
  var numericValue = Number(value);
  return isFinite(numericValue) ? numericValue : 0;
}

function normalizeWeekKey_(value) {
  var normalizedValue = cleanValue(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(normalizedValue) ? normalizedValue : "";
}

function hasOwnProperty_(target, key) {
  return !!target && Object.prototype.hasOwnProperty.call(target, key);
}

function sanitizeRotationNames_(rotationNames) {
  var source = rotationNames;

  if (!Array.isArray(source)) {
    source = cleanValue(rotationNames)
      .split(/\r?\n|,/)
      .map(function(entry) {
        return cleanValue(entry);
      });
  }

  var uniqueNames = [];
  var seen = {};

  for (var index = 0; index < source.length; index += 1) {
    var currentName = cleanValue(source[index]);
    var currentKey = normalizeMemberUsername_(currentName);

    if (!currentName || !currentKey || seen[currentKey]) {
      continue;
    }

    seen[currentKey] = true;
    uniqueNames.push(currentName);
  }

  return uniqueNames.length ? uniqueNames : DEFAULT_ROTATION_NAMES.slice();
}

function normalizeRotationAnchor_(value) {
  var normalizedValue = cleanValue(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(normalizedValue) ? normalizedValue : DEFAULT_ROTATION_ANCHOR;
}

function normalizeMemberUsername_(value) {
  return cleanValue(value).toLowerCase();
}

function getContentTypeFromDataUrl_(dataUrl) {
  if (dataUrl.indexOf("data:audio/mpeg") === 0 || dataUrl.indexOf("data:audio/mp3") === 0) {
    return "audio/mpeg";
  }

  if (dataUrl.indexOf("data:audio/wav") === 0 || dataUrl.indexOf("data:audio/x-wav") === 0) {
    return "audio/wav";
  }

  if (dataUrl.indexOf("data:audio/mp4") === 0 || dataUrl.indexOf("data:audio/aac") === 0) {
    return "audio/mp4";
  }

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
