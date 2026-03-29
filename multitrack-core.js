(function initMinisterioMultitrackCore(globalScope) {
  const MULTITRACK_SLOTS = [
    { id: "drums", label: "DRUMS", channel: "1" },
    { id: "back", label: "BACK", channel: "2" },
    { id: "keys", label: "TECLADOS", channel: "3" },
    { id: "gtr", label: "GTR", channel: "4" },
    { id: "full", label: "MUSICA", channel: "5" },
    { id: "click", label: "CLICK E GUIA", channel: "6" }
  ];

  const MULTITRACK_DB_MIN = -100;
  const MULTITRACK_DB_MAX = 12;
  const MAX_STEM_UPLOAD_BYTES = 18 * 1024 * 1024;

  function cleanTrackText(value) {
    return String(value ?? "").trim();
  }

  function createEmptyAudioTracks() {
    return MULTITRACK_SLOTS.reduce((tracks, slot) => {
      tracks[slot.id] = {
        label: slot.label,
        url: "",
        fileId: ""
      };
      return tracks;
    }, {});
  }

  function normalizeSongAudioTracks(input) {
    let source = input;

    if (typeof source === "string") {
      try {
        source = JSON.parse(source);
      } catch (_error) {
        source = {};
      }
    }

    if (!source || typeof source !== "object") {
      source = {};
    }

    const tracks = createEmptyAudioTracks();

    for (const slot of MULTITRACK_SLOTS) {
      const entry = source[slot.id] && typeof source[slot.id] === "object"
        ? source[slot.id]
        : {};

      tracks[slot.id] = {
        label: slot.label,
        url: cleanTrackText(entry.url),
        fileId: cleanTrackText(entry.fileId)
      };
    }

    return tracks;
  }

  function buildGoogleDriveStemUrl(fileId, fallbackUrl = "") {
    const normalizedFileId = cleanTrackText(fileId);

    if (normalizedFileId) {
      return `https://drive.usercontent.google.com/download?id=${encodeURIComponent(normalizedFileId)}&export=download&authuser=0&confirm=t`;
    }

    return cleanTrackText(fallbackUrl);
  }

  function resolveSongAudioTrackUrl(trackLike) {
    return buildGoogleDriveStemUrl(trackLike?.fileId, cleanTrackText(trackLike?.url));
  }

  function getSongAudioTracks(songLike) {
    return normalizeSongAudioTracks(songLike?.audioTracks);
  }

  function getSongAudioTrack(songLike, slotId) {
    return getSongAudioTracks(songLike)[slotId] || createEmptyAudioTracks()[slotId];
  }

  function songHasMultitrackPlayer(songLike) {
    const tracks = getSongAudioTracks(songLike);
    return MULTITRACK_SLOTS.some((slot) => Boolean(resolveSongAudioTrackUrl(tracks[slot.id])));
  }

  function formatDbValue(dbValue) {
    const normalizedValue = Number.isFinite(Number(dbValue)) ? Number(dbValue) : 0;
    const roundedValue = Math.round(normalizedValue);

    if (roundedValue <= MULTITRACK_DB_MIN) {
      return "-100 dB";
    }

    if (roundedValue > 0) {
      return `+${roundedValue} dB`;
    }

    return `${roundedValue} dB`;
  }

  function convertDbToGain(dbValue) {
    const normalizedValue = Number.isFinite(Number(dbValue)) ? Number(dbValue) : 0;

    if (normalizedValue <= MULTITRACK_DB_MIN) {
      return 0;
    }

    return Math.pow(10, normalizedValue / 20);
  }

  function formatPlayerTime(seconds) {
    const safeSeconds = Number.isFinite(Number(seconds)) ? Math.max(0, Number(seconds)) : 0;
    const totalSeconds = Math.floor(safeSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  function createEmptyMultitrackPlayerState() {
    return {
      songId: "",
      ready: false,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      referenceSlotId: "",
      context: null,
      tracks: new Map(),
      rafId: 0,
      syncTimerId: 0,
      progressPointerDown: false,
      startedAt: 0,
      instanceToken: ""
    };
  }

  function createMultitrackAudioContext() {
    const ContextConstructor = globalScope.AudioContext || globalScope.webkitAudioContext;

    if (typeof ContextConstructor !== "function") {
      return null;
    }

    return new ContextConstructor({
      latencyHint: "interactive"
    });
  }

  function decodeAudioBuffer(context, arrayBuffer) {
    if (!context) {
      return Promise.reject(new Error("AudioContext indisponivel."));
    }

    const bufferCopy = arrayBuffer.slice(0);

    return new Promise((resolve, reject) => {
      const maybePromise = context.decodeAudioData(bufferCopy, resolve, reject);

      if (maybePromise && typeof maybePromise.then === "function") {
        maybePromise.then(resolve).catch(reject);
      }
    });
  }

  async function fetchAndDecodeMultitrackBuffer(trackUrl, context) {
    const response = await fetch(trackUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Falha ao baixar a track (${response.status}).`);
    }

    const audioArrayBuffer = await response.arrayBuffer();

    if (!audioArrayBuffer.byteLength) {
      throw new Error("Track vazia recebida da nuvem.");
    }

    return decodeAudioBuffer(context, audioArrayBuffer);
  }

  globalScope.MINISTERIO_MULTITRACK_CORE = {
    MULTITRACK_SLOTS,
    MULTITRACK_DB_MIN,
    MULTITRACK_DB_MAX,
    MAX_STEM_UPLOAD_BYTES,
    createEmptyAudioTracks,
    normalizeSongAudioTracks,
    buildGoogleDriveStemUrl,
    resolveSongAudioTrackUrl,
    getSongAudioTracks,
    getSongAudioTrack,
    songHasMultitrackPlayer,
    formatDbValue,
    convertDbToGain,
    formatPlayerTime,
    createEmptyMultitrackPlayerState,
    createMultitrackAudioContext,
    decodeAudioBuffer,
    fetchAndDecodeMultitrackBuffer
  };
})(window);
