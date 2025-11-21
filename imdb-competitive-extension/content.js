// content.js
// IMDB Competitive Click Race - cleaned and fixed (REST / content-script friendly)

const FIREBASE_DB_URL = "https://imdb-game-343f1-default-rtdb.firebaseio.com"; // root (no .json)
const GAMES_ROOT = `${FIREBASE_DB_URL}/games`;

// ----------------------
// Actor list (keep this short for testing, you can expand later)
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
    { name: "Scarlett Johansson", url: "https://www.imdb.com/name/nm0424060/" },
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
function dbPut(path, value) { return fetch(`${GAMES_ROOT}/${path}.json`, { method: "PUT", body: JSON.stringify(value) }).then(r => r.json()); }
function dbPatch(path, value) { return fetch(`${GAMES_ROOT}/${path}.json`, { method: "PATCH", body: JSON.stringify(value) }).then(r => r.json()); }
function dbGet(path) { return fetch(`${GAMES_ROOT}/${path}.json`).then(r => r.json()); }

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

// ----------------------
// UI overlay
const uiBox = document.createElement("div");
Object.assign(uiBox.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "320px",
  backgroundColor: "#f5c518",
  color: "#000",
  padding: "14px",
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

const gameInfo = document.createElement("div");
gameInfo.style.marginBottom = "8px";
gameInfo.innerHTML = "Game: <em>Not in a game</em>";
uiBox.appendChild(gameInfo);

const btnRow = document.createElement("div");
btnRow.style.marginBottom = "8px";
uiBox.appendChild(btnRow);

const startBtn = document.createElement("button");
startBtn.textContent = "Start Game";
Object.assign(startBtn.style, { padding: "6px 8px", marginRight: "6px", borderRadius: "6px", background: "#000", color: "#fff", border: "none", cursor: "pointer" });
btnRow.appendChild(startBtn);

const joinBtn = document.createElement("button");
joinBtn.textContent = "Join Game";
Object.assign(joinBtn.style, { padding: "6px 8px", borderRadius: "6px", background: "#000", color: "#fff", border: "none", cursor: "pointer" });
btnRow.appendChild(joinBtn);

const statusDiv = document.createElement("div");
statusDiv.style.whiteSpace = "pre-wrap";
statusDiv.style.marginBottom = "8px";
uiBox.appendChild(statusDiv);

// join controls
const joinRow = document.createElement("div");
joinRow.style.display = "none";
joinRow.style.marginBottom = "8px";
uiBox.appendChild(joinRow);

const joinInput = document.createElement("input");
joinInput.placeholder = "Enter Game ID (e.g. ABC12)";
Object.assign(joinInput.style, { padding: "6px", width: "160px", marginRight: "6px" });
joinRow.appendChild(joinInput);

const joinSubmit = document.createElement("button");
joinSubmit.textContent = "Join";
Object.assign(joinSubmit.style, { padding: "6px 8px", borderRadius: "6px", background: "#333", color: "#fff", border: "none", cursor: "pointer" });
joinRow.appendChild(joinSubmit);

const leaveBtn = document.createElement("button");
leaveBtn.textContent = "Leave Game";
Object.assign(leaveBtn.style, { display: "inline-block", marginTop: "6px", padding: "6px 8px", borderRadius: "6px", background: "#b22222", color: "#fff", border: "none", cursor: "pointer" });
uiBox.appendChild(leaveBtn);

const hintDiv = document.createElement("div");
hintDiv.style.fontSize = "11px";
hintDiv.style.opacity = "0.9";
hintDiv.style.marginTop = "6px";
hintDiv.innerHTML = "Start a game to generate a game ID. Share ID with opponent. Both players auto-redirect to start actor.";
uiBox.appendChild(hintDiv);

// ----------------------
// Initialization: load storage and start polling if needed
(async function init() {
  try {
    const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks']);
    if (stored.playerId) playerId = stored.playerId;
    else {
      playerId = randId(6);
      await storageSet({ playerId });
    }

    if (stored.gameId) {
      gameId = stored.gameId;
      actorPair = stored.actorPair || null;
      clicks = stored.clicks || 0;
      startPolling();
    }
    refreshStatusUI();
    console.log("IMDB Click Race initialized, playerId:", playerId);
  } catch (err) {
    console.error("Init error", err);
  }
})();

// ----------------------
// UI helper
function refreshStatusUI(snapshotGame) {
  if (snapshotGame) {
    gameInfo.innerHTML = `Game: <strong>${gameId}</strong><br>Target: ${snapshotGame.actorA.name} → ${snapshotGame.actorB.name}`;
    actorPair = [snapshotGame.actorA, snapshotGame.actorB];
    storageSet({ actorPair }).catch(() => {});
  } else {
    if (gameId && actorPair) gameInfo.innerHTML = `Game: <strong>${gameId}</strong><br>Target: ${actorPair[0].name} → ${actorPair[1].name}`;
    else gameInfo.innerHTML = "Game: <em>Not in a game</em>";
  }

  let text = `Player ID: ${playerId}\nClicks: ${clicks}\n\n`;
  if (snapshotGame && snapshotGame.players) {
    const players = snapshotGame.players;
    for (const pid of Object.keys(players)) {
      const p = players[pid] || { clicks: 0 };
      const label = pid === playerId ? "You" : `Opponent (${pid})`;
      text += `${label}: ${p.clicks} clicks`;
      if (p.finishedAt) text += ` (Reached ${ actorPair ? actorPair[1].name : 'target' })`;
      text += "\n";
    }
    if (snapshotGame.winner) {
      const winLabel = snapshotGame.winner === playerId ? "You WIN!" : `Opponent (${snapshotGame.winner}) wins`;
      text += `\n${winLabel} in ${snapshotGame.winnerClicks} clicks\n`;
    }
  }
  statusDiv.textContent = text;
}

// ----------------------
// Game operations
async function createGameAndStart() {
  const id = randId(5);
  gameId = id;

  const shuffled = [...actorList].sort(() => Math.random() - 0.5);
  actorPair = [shuffled[0], shuffled[1]];
  clicks = 0;

  const gameObj = {
    actorA: actorPair[0],
    actorB: actorPair[1],
    players: { [playerId]: { clicks: 0 } },
    status: "active",
    winner: null,
    winnerClicks: null,
    createdAt: Date.now()
  };

  try {
    await dbPut(`${gameId}`, gameObj);
    await storageSet({ gameId, actorPair, clicks });
    refreshStatusUI(gameObj);
    startPolling();

    await storageSet({ role: 'host' }).catch(()=>{});

    window.location.href = actorPair[0].url;
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

    await dbPatch(`${gameId}/players/${playerId}`, { clicks: 0 });
    await storageSet({ gameId, actorPair, clicks });
    refreshStatusUI(game);
    startPolling();

    await storageSet({ role: 'guest' }).catch(()=>{});

    await sleep(200);
    window.location.href = actorPair[0].url;
  } catch (err) {
    console.error("joinGameWithId failed", err);
    alert("Failed to join game. Check DB URL and code.");
  }
}

async function leaveGame() {
  if (!gameId) { alert("Not in a game."); return; }
  try {
    await dbPatch(`${gameId}/players/${playerId}`, null);
  } catch (err) {
    console.warn("Failed to remove player from DB", err);
  }
  stopPolling();
  await storageRemove(['gameId', 'actorPair', 'clicks']);
  gameId = null; actorPair = null; clicks = 0;
  refreshStatusUI();
}

// ----------------------
// Polling / winner determination
async function pollOnce() {
  if (!gameId) return;
  try {
    const snapshot = await dbGet(`${gameId}`);
    if (!snapshot) { gameInfo.innerHTML = `Game: <em>Not found</em>`; return; }
    refreshStatusUI(snapshot);

    const players = snapshot.players || {};
    const finishedPids = Object.keys(players).filter(pid => players[pid].finishedAt);
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
// CLICK TRACKING (only actor page clicks)
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
      if (snapshot && snapshot.actorA && snapshot.actorB) actorPair = [snapshot.actorA, snapshot.actorB];
    } catch (err) {
      console.warn("Failed to fetch actorPair during click", err);
    }
  }

  clicks = (Number(clicks) || 0) + 1;
  try {
    await storageSet({ clicks });
    await dbPatch(`${gameId}/players/${playerId}`, { clicks });
  } catch (err) {
    console.error("Failed to persist click", err);
  }

  const targetUrl = actorPair?.[1]?.url;
  if (targetUrl && href.startsWith(targetUrl)) {
    try {
      await dbPatch(`${gameId}/players/${playerId}`, { finishedAt: Date.now() });
      alert(`You reached ${actorPair[1].name} in ${clicks} clicks.`);
    } catch (err) {
      console.error("Failed to set finishedAt", err);
    }
  }
});

// ----------------------
// UI button wiring
startBtn.addEventListener("click", () => { joinRow.style.display = "none"; createGameAndStart(); });
joinBtn.addEventListener("click", () => { joinRow.style.display = joinRow.style.display === "none" ? "block" : "none"; });
joinSubmit.addEventListener("click", () => { joinGameWithId(joinInput.value); });
leaveBtn.addEventListener("click", leaveGame);

// ----------------------
// Initial refresh / persisted state rehydration
(async function initialRefresh() {
  const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks']);
  if (stored.playerId) playerId = stored.playerId;
  if (stored.gameId) {
    gameId = stored.gameId;
    actorPair = stored.actorPair || null;
    clicks = stored.clicks || 0;
    startPolling();
  }
  refreshStatusUI();
})();
