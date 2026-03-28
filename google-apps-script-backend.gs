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

const DEFAULT_ROTATION_NAMES = ["Daniela", "Mileide", "Tamires"];
const DEFAULT_ROTATION_ANCHOR = "2026-03-23";

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

function getSettings_() {
  const properties = PropertiesService.getScriptProperties();
  const rawSheetId = cleanValue(properties.getProperty("SHEET_ID"));
  const rawCoversFolderId = cleanValue(properties.getProperty("COVERS_FOLDER_ID"));
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

  return {
    sheetId: sheetId,
    coversFolderId: coversFolderId,
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

function buildPublicSettings_() {
  const rotationSettings = readRotationSettings_();
  const members = readMembers_();
  const sharedState = readSharedState_();

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
    memberUsernames: members.map(function(member) {
      return member.username;
    })
  };
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
