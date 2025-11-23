// content.js
// IMDB Competitive Click Race - rebuilt; host now redirects to actorA immediately on create

const FIREBASE_DB_URL = "https://imdb-game-343f1-default-rtdb.firebaseio.com"; // root (no .json)
const GAMES_ROOT = `${FIREBASE_DB_URL}/games`;

// ----------------------
// Actor list (same as previous)
const actorList = [
  { name: "Leonardo DiCaprio", url: "https://www.imdb.com/name/nm0000138/" },
  { name: "Brad Pitt", url: "https://www.imdb.com/name/nm0000093/" },
  { name: "Tom Hanks", url: "https://www.imdb.com/name/nm0000158/" },
  { name: "Meryl Streep", url: "https://www.imdb.com/name/nm0000658/" },
  { name: "Robert De Niro", url: "https://www.imdb.com/name/nm0000134/" },
  { name: "Al Pacino", url: "https://www.imdb.com/name/nm0000199/" },
  { name: "Denzel Washington", url: "https://www.imdb.com/name/nm0000243/" },
  { name: "Christian Bale", url: "https://www.imdb.com/name/nm0000288/" },
  { name: "Jennifer Lawrence", url: "https://www.imdb.com/name/nm2225369/" },
  { name: "Scarlett Johansson", url: "https://www.imdb.com/name/nm0424060/" },
  { name: "Natalie Portman", url: "https://www.imdb.com/name/nm0000204/" },
  { name: "Emma Stone", url: "https://www.imdb.com/name/nm1297015/" },
  { name: "Ryan Gosling", url: "https://www.imdb.com/name/nm0331516/" },
  { name: "Matt Damon", url: "https://www.imdb.com/name/nm0000354/" },
  { name: "Ben Affleck", url: "https://www.imdb.com/name/nm0000255/" },
  { name: "Chris Hemsworth", url: "https://www.imdb.com/name/nm1165110/" },
  { name: "Chris Evans", url: "https://www.imdb.com/name/nm0262635/" },
  { name: "Robert Downey Jr.", url: "https://www.imdb.com/name/nm0000375/" },
  { name: "Mark Ruffalo", url: "https://www.imdb.com/name/nm0749263/" },
  { name: "Samuel L. Jackson", url: "https://www.imdb.com/name/nm0000168/" },
  { name: "Morgan Freeman", url: "https://www.imdb.com/name/nm0000151/" },
  { name: "Harrison Ford", url: "https://www.imdb.com/name/nm0000148/" },
  { name: "Keanu Reeves", url: "https://www.imdb.com/name/nm0000206/" },
  { name: "Tom Cruise", url: "https://www.imdb.com/name/nm0000129/" },
  { name: "Sylvester Stallone", url: "https://www.imdb.com/name/nm0000230/" },
  { name: "Arnold Schwarzenegger", url: "https://www.imdb.com/name/nm0000216/" },
  { name: "Bruce Willis", url: "https://www.imdb.com/name/nm0000246/" },
  { name: "Will Smith", url: "https://www.imdb.com/name/nm0000226/" },
  { name: "Joaquin Phoenix", url: "https://www.imdb.com/name/nm0001618/" },
  { name: "Heath Ledger", url: "https://www.imdb.com/name/nm0005132/" },
  { name: "Jake Gyllenhaal", url: "https://www.imdb.com/name/nm0350453/" },
  { name: "Hugh Jackman", url: "https://www.imdb.com/name/nm0413168/" },
  { name: "Christian Slater", url: "https://www.imdb.com/name/nm0000677/" },
  { name: "Timothée Chalamet", url: "https://www.imdb.com/name/nm3154303/" },
  { name: "Zendaya", url: "https://www.imdb.com/name/nm3918035/" },
  { name: "Florence Pugh", url: "https://www.imdb.com/name/nm6073955/" },
  { name: "Adam Driver", url: "https://www.imdb.com/name/nm3485845/" },
  { name: "Bryan Cranston", url: "https://www.imdb.com/name/nm0186505/" },
  { name: "Aaron Paul", url: "https://www.imdb.com/name/nm0666739/" },
  { name: "Henry Cavill", url: "https://www.imdb.com/name/nm0147147/" },
  { name: "Gal Gadot", url: "https://www.imdb.com/name/nm2933757/" },
  { name: "Jason Momoa", url: "https://www.imdb.com/name/nm0597388/" },
  { name: "Jared Leto", url: "https://www.imdb.com/name/nm0001467/" },
  { name: "Daniel Radcliffe", url: "https://www.imdb.com/name/nm0705356/" },
  { name: "Emma Watson", url: "https://www.imdb.com/name/nm0914612/" },
  { name: "Rupert Grint", url: "https://www.imdb.com/name/nm0342488/" },
  { name: "Alan Rickman", url: "https://www.imdb.com/name/nm0000614/" },
  { name: "Ian McKellen", url: "https://www.imdb.com/name/nm0005212/" },
  { name: "Viggo Mortensen", url: "https://www.imdb.com/name/nm0001557/" },
  { name: "Orlando Bloom", url: "https://www.imdb.com/name/nm0089217/" },
  { name: "Elijah Wood", url: "https://www.imdb.com/name/nm0000704/" },
  { name: "Sean Astin", url: "https://www.imdb.com/name/nm0000276/" },
  { name: "Kit Harington", url: "https://www.imdb.com/name/nm3229685/" },
  { name: "Emilia Clarke", url: "https://www.imdb.com/name/nm3592338/" },
  { name: "Peter Dinklage", url: "https://www.imdb.com/name/nm0227759/" },
  { name: "Sophie Turner", url: "https://www.imdb.com/name/nm3849842/" },
  { name: "Maisie Williams", url: "https://www.imdb.com/name/nm3586035/" },
  { name: "Pedro Pascal", url: "https://www.imdb.com/name/nm0050959/" },
  { name: "Oscar Isaac", url: "https://www.imdb.com/name/nm1209966/" },
  { name: "John Boyega", url: "https://www.imdb.com/name/nm3915784/" },
  { name: "Daisy Ridley", url: "https://www.imdb.com/name/nm5397459/" },
  { name: "Adam Sandler", url: "https://www.imdb.com/name/nm0001191/" },
  { name: "Kevin Hart", url: "https://www.imdb.com/name/nm0366389/" },
  { name: "Steve Carell", url: "https://www.imdb.com/name/nm0136797/" },
  { name: "John Krasinski", url: "https://www.imdb.com/name/nm1024677/" },
  { name: "Emily Blunt", url: "https://www.imdb.com/name/nm1289434/" },
  { name: "Anne Hathaway", url: "https://www.imdb.com/name/nm0004266/" },
  { name: "Cate Blanchett", url: "https://www.imdb.com/name/nm0000949/" },
  { name: "Kate Winslet", url: "https://www.imdb.com/name/nm0000701/" },
  { name: "Amy Adams", url: "https://www.imdb.com/name/nm0010736/" },
  { name: "Jessica Chastain", url: "https://www.imdb.com/name/nm1567113/" },
  { name: "Viola Davis", url: "https://www.imdb.com/name/nm0205626/" },
  { name: "Michelle Williams", url: "https://www.imdb.com/name/nm0931329/" },
  { name: "Jodie Foster", url: "https://www.imdb.com/name/nm0000149/" },
  { name: "Sigourney Weaver", url: "https://www.imdb.com/name/nm0000244/" },
  { name: "Glenn Close", url: "https://www.imdb.com/name/nm0000335/" },
  { name: "Charlize Theron", url: "https://www.imdb.com/name/nm0000234/" },
  { name: "Margot Robbie", url: "https://www.imdb.com/name/nm3053338/" },
  { name: "Rosamund Pike", url: "https://www.imdb.com/name/nm0683253/" },
  { name: "Daniel Craig", url: "https://www.imdb.com/name/nm0185819/" },
  { name: "Rami Malek", url: "https://www.imdb.com/name/nm1785339/" },
  { name: "Christoph Waltz", url: "https://www.imdb.com/name/nm0910607/" },
  { name: "Michael Fassbender", url: "https://www.imdb.com/name/nm1055413/" },
  { name: "James McAvoy", url: "https://www.imdb.com/name/nm0564215/" },
  { name: "Halle Berry", url: "https://www.imdb.com/name/nm0000932/" },
  { name: "Patrick Stewart", url: "https://www.imdb.com/name/nm0001772/" },
  { name: "Hugh Grant", url: "https://www.imdb.com/name/nm0000424/" },
  { name: "Colin Firth", url: "https://www.imdb.com/name/nm0000147/" },
  { name: "Daniel Day-Lewis", url: "https://www.imdb.com/name/nm0000358/" },
  { name: "Sean Connery", url: "https://www.imdb.com/name/nm0000125/" },
  { name: "Robin Williams", url: "https://www.imdb.com/name/nm0000245/" },
];

// ----------------------
// Utilities
function randId(len = 5) { return Math.random().toString(36).substr(2, len).toUpperCase(); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// REST helpers (paths are appended to GAMES_ROOT)
function dbPut(path, value) {
  return fetch(`${GAMES_ROOT}/${path}.json`, { method: "PUT", body: JSON.stringify(value) }).then(r => r.json());
}
function dbPatch(path, value) {
  return fetch(`${GAMES_ROOT}/${path}.json`, { method: "PATCH", body: JSON.stringify(value) }).then(r => r.json());
}
function dbGet(path) {
  return fetch(`${GAMES_ROOT}/${path}.json`).then(r => r.json());
}

// ----------------------
// Storage helpers
async function storageGet(keys) { return new Promise(res => chrome.storage.local.get(keys, items => res(items))); }
async function storageSet(obj) { return new Promise(res => chrome.storage.local.set(obj, () => res())); }
async function storageRemove(keys) { return new Promise(res => chrome.storage.local.remove(keys, () => res())); }

// ----------------------
// Local state
let playerId = null;
let gameId = null;
let actorPair = null; // [actorA, actorB]
let clicks = 0;
let pollingInterval = null;
let displayName = null;
let role = null; // 'host' | 'guest' | null
let hasRedirected = false; // Now persistent via storage

// ----------------------
// UI overlay (reworked: includes name input + players list)
const uiBox = document.createElement("div");
Object.assign(uiBox.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "360px",
  maxWidth: "calc(100% - 40px)",
  backgroundColor: "#f5c518",
  color: "#000",
  padding: "12px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  zIndex: 999999,
  fontFamily: "Arial, sans-serif",
  fontSize: "13px",
  lineHeight: "1.3"
});
document.body.appendChild(uiBox);

const header = document.createElement("div");
header.style.fontWeight = "700";
header.style.marginBottom = "8px";
header.textContent = "IMDB Competitive Click Race";
uiBox.appendChild(header);

// Game info & target
const gameInfo = document.createElement("div");
gameInfo.style.marginBottom = "8px";
gameInfo.innerHTML = "Game: <em>Not in a game</em>";
uiBox.appendChild(gameInfo);

// controls row
const btnRow = document.createElement("div");
btnRow.style.marginBottom = "8px";
uiBox.appendChild(btnRow);

const startBtn = document.createElement("button");
startBtn.textContent = "Create Game";
Object.assign(startBtn.style, { padding: "6px 8px", marginRight: "6px", borderRadius: "6px", background: "#000", color: "#fff", border: "none", cursor: "pointer" });
btnRow.appendChild(startBtn);

const joinBtn = document.createElement("button");
joinBtn.textContent = "Join Game";
Object.assign(joinBtn.style, { padding: "6px 8px", borderRadius: "6px", background: "#000", color: "#fff", border: "none", cursor: "pointer" });
btnRow.appendChild(joinBtn);

const leaveBtn = document.createElement("button");
leaveBtn.textContent = "Leave Game";
Object.assign(leaveBtn.style, { display: "none", marginTop: "6px", padding: "6px 8px", borderRadius: "6px", background: "#b22222", color: "#fff", border: "none", cursor: "pointer" });
uiBox.appendChild(leaveBtn);

// Name input
const nameRow = document.createElement("div");
nameRow.style.display = "flex";
nameRow.style.alignItems = "center";
nameRow.style.gap = "6px";
nameRow.style.marginTop = "8px";
uiBox.appendChild(nameRow);

const nameInput = document.createElement("input");
nameInput.placeholder = "Display name (you)";
Object.assign(nameInput.style, { padding: "6px", flex: "1" });
nameRow.appendChild(nameInput);

const nameSaveBtn = document.createElement("button");
nameSaveBtn.textContent = "Save";
Object.assign(nameSaveBtn.style, { padding: "6px 8px", borderRadius: "6px", background: "#333", color: "#fff", border: "none", cursor: "pointer" });
nameRow.appendChild(nameSaveBtn);

// players list (lobby)
const lobbyBox = document.createElement("div");
lobbyBox.style.marginTop = "10px";
lobbyBox.style.padding = "8px";
lobbyBox.style.border = "1px solid rgba(0,0,0,0.08)";
lobbyBox.style.borderRadius = "6px";
lobbyBox.style.background = "rgba(0,0,0,0.02)";
lobbyBox.style.display = "none";
uiBox.appendChild(lobbyBox);

const lobbyTitle = document.createElement("div");
lobbyTitle.style.fontWeight = "600";
lobbyTitle.style.marginBottom = "6px";
lobbyTitle.textContent = "Lobby — Waiting for players";
lobbyBox.appendChild(lobbyTitle);

const playersList = document.createElement("div");
playersList.style.minHeight = "26px";
lobbyBox.appendChild(playersList);

// join controls (enter game id)
const joinRow = document.createElement("div");
joinRow.style.display = "none";
joinRow.style.marginTop = "8px";
uiBox.appendChild(joinRow);

const joinInput = document.createElement("input");
joinInput.placeholder = "Enter Game ID (e.g. ABC12)";
Object.assign(joinInput.style, { padding: "6px", width: "160px", marginRight: "6px" });
joinRow.appendChild(joinInput);

const joinSubmit = document.createElement("button");
joinSubmit.textContent = "Join";
Object.assign(joinSubmit.style, { padding: "6px 8px", borderRadius: "6px", background: "#333", color: "#fff", border: "none", cursor: "pointer" });
joinRow.appendChild(joinSubmit);

// status text
const statusDiv = document.createElement("div");
statusDiv.style.whiteSpace = "pre-wrap";
statusDiv.style.marginTop = "8px";
uiBox.appendChild(statusDiv);

// hint
const hintDiv = document.createElement("div");
hintDiv.style.fontSize = "11px";
hintDiv.style.opacity = "0.9";
hintDiv.style.marginTop = "8px";
hintDiv.innerHTML = "Create a game to generate an ID and enter the lobby. When 2 players are present the game will start automatically.";
uiBox.appendChild(hintDiv);

// ----------------------
// Initialization
(async function init() {
  try {
    // UPDATED: Added 'hasRedirected' to keys retrieved
    const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks', 'displayName', 'role', 'hasRedirected']);
    if (stored.playerId) playerId = stored.playerId;
    else {
      playerId = randId(6);
      await storageSet({ playerId });
    }

    displayName = stored.displayName || `Player-${playerId}`;
    nameInput.value = displayName;

    if (stored.role) role = stored.role;
    // NEW: Load hasRedirected state
    if (stored.hasRedirected) hasRedirected = stored.hasRedirected; 

    if (stored.gameId) {
      gameId = stored.gameId;
      actorPair = stored.actorPair || null;
      clicks = stored.clicks || 0;
      startPolling();
    }
    refreshStatusUI();
    updateGameControls();
    console.log("IMDB Click Race initialized, playerId:", playerId, "name:", displayName, "redirected:", hasRedirected);
  } catch (err) {
    console.error("Init error", err);
  }
})();

// ----------------------
// UI helpers
function refreshStatusUI(snapshotGame) {
  if (snapshotGame) {
    gameInfo.innerHTML = `Game: <strong>${gameId}</strong><br>Target: ${snapshotGame.actorA.name} → ${snapshotGame.actorB.name}`;
    actorPair = [snapshotGame.actorA, snapshotGame.actorB];
    storageSet({ actorPair }).catch(() => {});
  } else {
    if (gameId && actorPair) {
      gameInfo.innerHTML = `Game: <strong>${gameId}</strong><br>Target: ${actorPair[0].name} → ${actorPair[1].name}`;
    } else {
      gameInfo.innerHTML = "Game: <em>Not in a game</em>";
    }
  }

  let text = `Player ID: ${playerId}\nName: ${displayName}\nClicks: ${clicks}\n\n`;
  statusDiv.textContent = text;
}

function renderPlayersList(playersObj) {
  playersList.innerHTML = "";
  if (!playersObj || Object.keys(playersObj).length === 0) {
    playersList.textContent = "No players yet.";
    return;
  }
  const keys = Object.keys(playersObj);
  for (const pid of keys) {
    const p = playersObj[pid] || {};
    const row = document.createElement("div");
    row.style.padding = "4px 0";
    row.style.fontSize = "13px";
    const label = pid === playerId ? `${p.name || pid} (You)` : (p.name || pid);
    const clicksLabel = typeof p.clicks !== 'undefined' ? ` — ${p.clicks} clicks` : "";
    const finishedLabel = p.finishedAt ? " ✅ finished" : "";
    row.textContent = label + clicksLabel + finishedLabel;
    playersList.appendChild(row);
  }
}

function updateGameControls() {
  const inGame = !!gameId;
  startBtn.style.display = inGame ? "none" : "inline-block";
  joinBtn.style.display = inGame ? "none" : "inline-block";
  joinRow.style.display = inGame ? "none" : "none"; // joinRow toggled by clicking Join button
  leaveBtn.style.display = inGame ? "inline-block" : "none";
  lobbyBox.style.display = inGame ? "block" : "none";
}

// ----------------------
// Game operations

// REPLACED: createGameAndStart - host creates game AND immediately sets startedAt and redirects to actorA
async function createGameAndStart() {
  const id = randId(5);
  gameId = id;

  const shuffled = [...actorList].sort(() => Math.random() - 0.5);
  actorPair = [shuffled[0], shuffled[1]];
  clicks = 0;

  const now = Date.now();
  const gameObj = {
    actorA: actorPair[0],
    actorB: actorPair[1],
    players: { [playerId]: { clicks: 0, name: displayName } },
    status: "active",
    winner: null,
    winnerClicks: null,
    createdAt: now,
    startedAt: now
  };

  try {
    // create game and mark as started immediately
    await dbPut(`${gameId}`, gameObj);
    await storageSet({ gameId, actorPair, clicks });
    role = 'host';
    await storageSet({ role });
    refreshStatusUI(gameObj);
    updateGameControls();
    startPolling();

    // redirect host immediately to actorA
    if (actorPair && actorPair[0] && actorPair[0].url) {
      hasRedirected = true;
      // FIX: Persist hasRedirected state
      await storageSet({ hasRedirected }); 
      window.location.href = actorPair[0].url;
    }
  } catch (err) {
    console.error("createGameAndStart failed", err);
    alert("Failed to create game. Check DB URL / rules.");
  }
}

async function joinGameWithId(inputId) {
  const id = (inputId || "").trim().toUpperCase();
  if (!id) { alert("Enter a Game ID."); return; }

  try {
    const game = await dbGet(`${id}`);
    if (!game) { alert("Game not found: " + id); return; }

    gameId = id;
    actorPair = [game.actorA, game.actorB];
    clicks = 0;

    // add self to players
    await dbPatch(`${gameId}/players/${playerId}`, { clicks: 0, name: displayName });
    await storageSet({ gameId, actorPair, clicks });
    role = 'guest';
    await storageSet({ role });

    refreshStatusUI(game);
    updateGameControls();
    startPolling();

    // If game already started (startedAt present) the poll will redirect this client automatically
  } catch (err) {
    console.error("joinGameWithId failed", err);
    alert("Failed to join game. Check DB URL and code.");
  }
}

async function leaveGame() {
  if (!gameId) { alert("Not in a game."); return; }
  try {
    // Remove player entry (set to null)
    await dbPatch(`${gameId}/players/${playerId}`, null);
  } catch (err) {
    console.warn("Failed to remove player from DB", err);
  }
  stopPolling();
  // FIX: Clear hasRedirected state upon leaving
  await storageRemove(['gameId', 'actorPair', 'clicks', 'role', 'hasRedirected']); 
  gameId = null;
  actorPair = null;
  clicks = 0;
  role = null;
  hasRedirected = false;
  refreshStatusUI();
  updateGameControls();
}

// ----------------------
// Polling / lobby coordination / redirect-on-start
async function pollOnce() {
  if (!gameId) return;
  try {
    const snapshot = await dbGet(`${gameId}`);
    if (!snapshot) {
      gameInfo.innerHTML = `Game: <em>Not found</em>`;
      return;
    }

    // Update UI & players list every poll
    refreshStatusUI(snapshot);
    renderPlayersList(snapshot.players || {});

    const players = snapshot.players || {};
    const playerIds = Object.keys(players);

    // If we're host and there are >=2 players and game has not started, attempt to set startedAt
    if (!snapshot.startedAt && role === 'host' && playerIds.length >= 2) {
      try {
        await dbPatch(`${gameId}`, { startedAt: Date.now(), status: "active" });
        console.log("Host set startedAt");
      } catch (err) {
        console.warn("Failed to set startedAt (host)", err);
      }
    }

    // If startedAt is set and we haven't redirected yet, redirect both clients to actorA
    if (snapshot.startedAt && !hasRedirected) {
      if (snapshot.actorA && snapshot.actorB) {
        actorPair = [snapshot.actorA, snapshot.actorB];
        await storageSet({ actorPair });
      }
      await sleep(150);
      await storageSet({ gameId });
      if (actorPair && actorPair[0] && actorPair[0].url) {
        hasRedirected = true;
        // FIX: Persist hasRedirected state
        await storageSet({ hasRedirected }); 
        window.location.href = actorPair[0].url;
        return;
      }
    }

    // Winner determination: if two finished and no winner, compute winner
    const finishedPids = playerIds.filter(pid => players[pid] && players[pid].finishedAt);
    if (finishedPids.length >= 2 && !snapshot.winner) {
      let winnerPid = finishedPids[0];
      let minClicks = players[winnerPid].clicks || Infinity;
      for (const pid of finishedPids) {
        const c = Number(players[pid].clicks) || Infinity;
        if (c < minClicks) { minClicks = c; winnerPid = pid; }
      }
      await dbPatch(`${gameId}`, { winner: winnerPid, winnerClicks: minClicks, status: "finished" });
    }

  } catch (err) {
    console.error("pollOnce error", err);
  }
}

function startPolling() {
  if (pollingInterval) return;
  pollOnce();
  pollingInterval = setInterval(pollOnce, 1000);
}
function stopPolling() {
  if (pollingInterval) { clearInterval(pollingInterval); pollingInterval = null; }
}

// ----------------------
// CLICK TRACKING (only actor page clicks) - preserved logic
document.addEventListener("click", async (event) => {
  if (!gameId || !playerId) return;

  const a = event.target.closest("a");
  if (!a) return;

  let href = a.getAttribute("href");
  if (!href) return;

  if (href.startsWith("/")) href = "https://www.imdb.com" + href;
  if (!href.startsWith("http")) return;

  // Only actor pages count (allow extra query params)
  if (!/^https:\/\/www\.imdb\.com\/name\/nm\d+\/?/.test(href)) return;

  if (!actorPair) {
    try {
      const snapshot = await dbGet(`${gameId}`);
      if (snapshot && snapshot.actorA && snapshot.actorB)
        actorPair = [snapshot.actorA, snapshot.actorB];
    } catch (err) {
      console.warn("Failed to fetch actorPair during click", err);
    }
  }

  clicks = (Number(clicks) || 0) + 1;
  try {
    await storageSet({ clicks });
    await dbPatch(`${gameId}/players/${playerId}`, { clicks, name: displayName });
  } catch (err) {
    console.error("Failed to persist click", err);
  }

  const targetUrl = actorPair?.[1]?.url;
  if (targetUrl && href.startsWith(targetUrl)) {
    try {
      await dbPatch(`${gameId}/players/${playerId}`, { finishedAt: Date.now(), name: displayName });
      alert(`You reached ${actorPair[1].name} in ${clicks} clicks.`);
    } catch (err) {
      console.error("Failed to set finishedAt", err);
    }
  }
});

// ----------------------
// UI wiring
startBtn.addEventListener("click", async () => {
  displayName = (nameInput.value || "").trim() || displayName || `Player-${playerId}`;
  await storageSet({ displayName });
  createGameAndStart();
  updateGameControls();
});

joinBtn.addEventListener("click", () => {
  joinRow.style.display = joinRow.style.display === "none" ? "block" : "none";
});

joinSubmit.addEventListener("click", async () => {
  displayName = (nameInput.value || "").trim() || displayName || `Player-${playerId}`;
  await storageSet({ displayName });
  joinGameWithId(joinInput.value);
  updateGameControls();
});

leaveBtn.addEventListener("click", () => {
  leaveGame();
  updateGameControls();
});

nameSaveBtn.addEventListener("click", async () => {
  displayName = (nameInput.value || "").trim() || displayName || `Player-${playerId}`;
  await storageSet({ displayName });
  if (gameId) {
    try {
      await dbPatch(`${gameId}/players/${playerId}`, { name: displayName });
    } catch (err) {
      console.warn("Failed to update name on server", err);
    }
  }
  refreshStatusUI();
});

// ----------------------
// Initial rehydration
(async function initialRefresh() {
  // UPDATED: Added 'hasRedirected' to keys retrieved
  const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks', 'displayName', 'role', 'hasRedirected']);
  if (stored.playerId) playerId = stored.playerId;
  if (stored.displayName) {
    displayName = stored.displayName;
    nameInput.value = displayName;
  }
  if (stored.role) role = stored.role;
  // NEW: Load hasRedirected state
  if (stored.hasRedirected) hasRedirected = stored.hasRedirected; 

  if (stored.gameId) {
    gameId = stored.gameId;
    actorPair = stored.actorPair || null;
    clicks = stored.clicks || 0;
    startPolling();
  }
  refreshStatusUI();
  updateGameControls();
})();
