// content.js
// IMDB Competitive Click Race - content script (updated)
// IMPORTANT: Replace FIREBASE_DB_URL with your Firebase Realtime Database URL (no trailing .json)

const FIREBASE_DB_URL = "https://imdb-game-343f1-default-rtdb.firebaseio.com"; // <<-- REPLACE THIS

// ----------------------
// Small actor list (name + imdb actor URL). Expand as needed.
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
    { name: "Chris Evans", url: "https://www.imdb.com/name/nm0262635/" },
    { name: "Chris Hemsworth", url: "https://www.imdb.com/name/nm1165110/" },
    { name: "Chris Pine", url: "https://www.imdb.com/name/nm1517976/" },
    { name: "Christopher Walken", url: "https://www.imdb.com/name/nm0000686/" },
    { name: "Christoph Waltz", url: "https://www.imdb.com/name/nm0910607/" },
    { name: "Cillian Murphy", url: "https://www.imdb.com/name/nm0614165/" },
    { name: "Claire Foy", url: "https://www.imdb.com/name/nm2946516/" },
    { name: "Claire Danes", url: "https://www.imdb.com/name/nm0000132/" },
    { name: "Clive Owen", url: "https://www.imdb.com/name/nm0654110/" },
    { name: "Colin Farrell", url: "https://www.imdb.com/name/nm0268199/" },
    { name: "Colin Firth", url: "https://www.imdb.com/name/nm0000147/" },
    { name: "Daisy Ridley", url: "https://www.imdb.com/name/nm5397459/" },
    { name: "Dakota Fanning", url: "https://www.imdb.com/name/nm0266824/" },
    { name: "Dakota Johnson", url: "https://www.imdb.com/name/nm0424848/" },
    { name: "Daniel Craig", url: "https://www.imdb.com/name/nm0185819/" },
    { name: "Daniel Day-Lewis", url: "https://www.imdb.com/name/nm0000358/" },
    { name: "Daniel Kaluuya", url: "https://www.imdb.com/name/nm2257207/" },
    { name: "Daniel Radcliffe", url: "https://www.imdb.com/name/nm0705356/" },
    { name: "Danny DeVito", url: "https://www.imdb.com/name/nm0000362/" },
    { name: "Dave Bautista", url: "https://www.imdb.com/name/nm1176985/" },
    { name: "David Harbour", url: "https://www.imdb.com/name/nm1092086/" },
    { name: "David Tennant", url: "https://www.imdb.com/name/nm0855039/" },
    { name: "Demi Moore", url: "https://www.imdb.com/name/nm0000193/" },
    { name: "Denis Ménochet", url: "https://www.imdb.com/name/nm1015684/" },
    { name: "Denzel Washington", url: "https://www.imdb.com/name/nm0000243/" },
    { name: "Diego Luna", url: "https://www.imdb.com/name/nm0526019/" },
    { name: "Djimon Hounsou", url: "https://www.imdb.com/name/nm0005023/" },
    { name: "Donald Glover", url: "https://www.imdb.com/name/nm2255973/" },
    { name: "Don Cheadle", url: "https://www.imdb.com/name/nm0000332/" },
    { name: "Dustin Hoffman", url: "https://www.imdb.com/name/nm0000163/" },
    { name: "Eiza González", url: "https://www.imdb.com/name/nm2325063/" },
    { name: "Elisabeth Moss", url: "https://www.imdb.com/name/nm0005253/" },
    { name: "Elizabeth Debicki", url: "https://www.imdb.com/name/nm4456120/" },
    { name: "Elizabeth Olsen", url: "https://www.imdb.com/name/nm0647634/" },
    { name: "Elle Fanning", url: "https://www.imdb.com/name/nm1102577/" },
    { name: "Emily Blunt", url: "https://www.imdb.com/name/nm1289434/" },
    { name: "Emily Watson", url: "https://www.imdb.com/name/nm0001833/" },
    { name: "Emma Mackey", url: "https://www.imdb.com/name/nm9404359/" },
    { name: "Emma Roberts", url: "https://www.imdb.com/name/nm0731075/" },
    { name: "Emma Stone", url: "https://www.imdb.com/name/nm1297015/" },
    { name: "Emma Thompson", url: "https://www.imdb.com/name/nm0000668/" },
    { name: "Ewan McGregor", url: "https://www.imdb.com/name/nm0000191/" },
    { name: "Ezra Miller", url: "https://www.imdb.com/name/nm3009232/" },
    { name: "Felicity Jones", url: "https://www.imdb.com/name/nm0428065/" },
    { name: "Finn Wolfhard", url: "https://www.imdb.com/name/nm6016511/" },
    { name: "Florence Pugh", url: "https://www.imdb.com/name/nm6073955/" },
    { name: "Forest Whitaker", url: "https://www.imdb.com/name/nm0001845/" },
    { name: "Frances McDormand", url: "https://www.imdb.com/name/nm0000531/" },
    { name: "Freddie Highmore", url: "https://www.imdb.com/name/nm0383603/" },
    { name: "Gal Gadot", url: "https://www.imdb.com/name/nm2933757/" },
    { name: "Gary Oldman", url: "https://www.imdb.com/name/nm0000198/" },
    { name: "Gemma Arterton", url: "https://www.imdb.com/name/nm2605345/" },
    { name: "Gemma Chan", url: "https://www.imdb.com/name/nm2395586/" },
    { name: "George Clooney", url: "https://www.imdb.com/name/nm0000123/" },
    { name: "Gerard Butler", url: "https://www.imdb.com/name/nm0124930/" },
    { name: "Giancarlo Esposito", url: "https://www.imdb.com/name/nm0002064/" },
    { name: "Gugu Mbatha-Raw", url: "https://www.imdb.com/name/nm1813221/" },
    { name: "Haley Bennett", url: "https://www.imdb.com/name/nm2247245/" },
    { name: "Haley Joel Osment", url: "https://www.imdb.com/name/nm0005286/" },
    { name: "Harrison Ford", url: "https://www.imdb.com/name/nm0000148/" },
    { name: "Harvey Keitel", url: "https://www.imdb.com/name/nm0000172/" },
    { name: "Hayley Atwell", url: "https://www.imdb.com/name/nm2018237/" },
    { name: "Helen Mirren", url: "https://www.imdb.com/name/nm0000545/" },
    { name: "Henry Cavill", url: "https://www.imdb.com/name/nm0147147/" },
    { name: "Hilary Swank", url: "https://www.imdb.com/name/nm0000671/" },
    { name: "Hugh Grant", url: "https://www.imdb.com/name/nm0000424/" },
    { name: "Hugh Jackman", url: "https://www.imdb.com/name/nm0413168/" },
    { name: "Idris Elba", url: "https://www.imdb.com/name/nm0252961/" },
    { name: "Imogen Poots", url: "https://www.imdb.com/name/nm1782298/" },
    { name: "Ioan Gruffudd", url: "https://www.imdb.com/name/nm0344435/" },
    { name: "Isabelle Huppert", url: "https://www.imdb.com/name/nm0001376/" },
    { name: "Jack Black", url: "https://www.imdb.com/name/nm0085312/" },
    { name: "Jack O'Connell", url: "https://www.imdb.com/name/nm1925239/" },
    { name: "Jackie Chan", url: "https://www.imdb.com/name/nm0000329/" },
    { name: "Jacob Elordi", url: "https://www.imdb.com/name/nm6489366/" },
    { name: "Jake Gyllenhaal", url: "https://www.imdb.com/name/nm0350453/" },
    { name: "James Caan", url: "https://www.imdb.com/name/nm0001001/" },
    { name: "James Franco", url: "https://www.imdb.com/name/nm0290556/" },
    { name: "James McAvoy", url: "https://www.imdb.com/name/nm0564215/" },
    { name: "James Norton", url: "https://www.imdb.com/name/nm4124003/" },
    { name: "Jamie Bell", url: "https://www.imdb.com/name/nm0068260/" },
    { name: "Jamie Foxx", url: "https://www.imdb.com/name/nm0004937/" },
    { name: "Jane Fonda", url: "https://www.imdb.com/name/nm0000401/" },
    { name: "Jared Harris", url: "https://www.imdb.com/name/nm0365140/" },
    { name: "Jared Leto", url: "https://www.imdb.com/name/nm0001467/" },
    { name: "Jason Bateman", url: "https://www.imdb.com/name/nm0000867/" },
    { name: "Jason Momoa", url: "https://www.imdb.com/name/nm0597388/" },
    { name: "Jason Statham", url: "https://www.imdb.com/name/nm0005458/" },
    { name: "Javier Bardem", url: "https://www.imdb.com/name/nm0000849/" },
    { name: "Jeff Bridges", url: "https://www.imdb.com/name/nm0000313/" },
    { name: "Jeff Goldblum", url: "https://www.imdb.com/name/nm0000156/" },
    { name: "Jennifer Connelly", url: "https://www.imdb.com/name/nm0000124/" },
    { name: "Jennifer Lawrence", url: "https://www.imdb.com/name/nm2225369/" },
    { name: "Jennifer Lopez", url: "https://www.imdb.com/name/nm0000182/" },
    { name: "Jeremy Irons", url: "https://www.imdb.com/name/nm0000460/" },
    { name: "Jeremy Renner", url: "https://www.imdb.com/name/nm0719637/" },
    { name: "Jessie Buckley", url: "https://www.imdb.com/name/nm2976585/" },
    { name: "Jessica Chastain", url: "https://www.imdb.com/name/nm1567113/" },
    { name: "Jim Carrey", url: "https://www.imdb.com/name/nm0000120/" },
    { name: "Joaquin Phoenix", url: "https://www.imdb.com/name/nm0001618/" }
    

  ];
  

// ----------------------
// Utilities
function randId(len = 5) {
  return Math.random().toString(36).substr(2, len).toUpperCase();
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Simple Firebase REST helpers using fetch
function dbPut(path, value) {
  const url = `${FIREBASE_DB_URL}/${path}.json`;
  return fetch(url, { method: "PUT", body: JSON.stringify(value) }).then(r => r.json());
}
function dbPatch(path, value) {
  const url = `${FIREBASE_DB_URL}/${path}.json`;
  return fetch(url, { method: "PATCH", body: JSON.stringify(value) }).then(r => r.json());
}
function dbGet(path) {
  const url = `${FIREBASE_DB_URL}/${path}.json`;
  return fetch(url).then(r => r.json());
}

// ----------------------
// Variables persisted across page loads (we use chrome.storage.local)
let playerId = null;
let gameId = null;
let actorPair = null; // [ {name,url}, {name,url} ]
let clicks = 0;
let pollingInterval = null;

// ----------------------
// Helper wrappers for chrome.storage.local (promisified)
function storageGet(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (items) => resolve(items));
  });
}
function storageSet(obj) {
  return new Promise((resolve) => {
    chrome.storage.local.set(obj, () => resolve());
  });
}
function storageRemove(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.remove(keys, () => resolve());
  });
}

// ----------------------
// Build UI overlay (style option 2: large Tampermonkey-like panel)
const uiBox = document.createElement("div");
Object.assign(uiBox.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "300px",
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

// Header
const header = document.createElement("div");
header.style.fontWeight = "700";
header.style.marginBottom = "8px";
header.textContent = "IMDB Competitive Click Race";
uiBox.appendChild(header);

// Game info
const gameInfo = document.createElement("div");
gameInfo.style.marginBottom = "8px";
gameInfo.innerHTML = "Game: <em>Not in a game</em>";
uiBox.appendChild(gameInfo);

// Buttons row
const btnRow = document.createElement("div");
btnRow.style.marginBottom = "8px";
uiBox.appendChild(btnRow);

const startBtn = document.createElement("button");
startBtn.textContent = "Start Game";
Object.assign(startBtn.style, {
  padding: "6px 8px",
  marginRight: "6px",
  borderRadius: "6px",
  background: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer"
});
btnRow.appendChild(startBtn);

const joinBtn = document.createElement("button");
joinBtn.textContent = "Join Game";
Object.assign(joinBtn.style, {
  padding: "6px 8px",
  borderRadius: "6px",
  background: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer"
});
btnRow.appendChild(joinBtn);

// Status / scores
const statusDiv = document.createElement("div");
statusDiv.style.whiteSpace = "pre-wrap";
statusDiv.style.marginBottom = "8px";
uiBox.appendChild(statusDiv);

// Join controls (hidden by default)
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
Object.assign(joinSubmit.style, {
  padding: "6px 8px",
  borderRadius: "6px",
  background: "#333",
  color: "#fff",
  border: "none",
  cursor: "pointer"
});
joinRow.appendChild(joinSubmit);

const leaveBtn = document.createElement("button");
leaveBtn.textContent = "Leave Game";
Object.assign(leaveBtn.style, {
  display: "inline-block",
  marginTop: "6px",
  padding: "6px 8px",
  borderRadius: "6px",
  background: "#b22222",
  color: "#fff",
  border: "none",
  cursor: "pointer"
});
uiBox.appendChild(leaveBtn);

// small hint
const hintDiv = document.createElement("div");
hintDiv.style.fontSize = "11px";
hintDiv.style.opacity = "0.9";
hintDiv.style.marginTop = "6px";
hintDiv.innerHTML = "Start a game to generate a game ID. Share ID with opponent. Both players will be auto-redirected to the start actor.";
uiBox.appendChild(hintDiv);

// ----------------------
// Initialize: load storage or create playerId
(async function init() {
  try {
    const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks']);
    if (stored.playerId) {
      playerId = stored.playerId;
    } else {
      playerId = randId(6);
      await storageSet({ playerId });
    }

    if (stored.gameId) {
      gameId = stored.gameId;
      actorPair = stored.actorPair || null;
      clicks = stored.clicks || 0;
      // Start polling to get the actual state (if game still exists)
      startPolling();
    }

    refreshStatusUI();
  } catch (err) {
    console.error("Init error", err);
  }
})();

// ----------------------
// UI helpers
function refreshStatusUI(snapshotGame) {
  // snapshotGame is optional — if provided use it to show remote players and winner
  if (snapshotGame) {
    // Use authoritative server snapshot
    gameInfo.innerHTML = `Game: <strong>${gameId}</strong><br>Target: ${snapshotGame.actorA.name} → ${snapshotGame.actorB.name}`;
    actorPair = [snapshotGame.actorA, snapshotGame.actorB];
    // persist actorPair
    storageSet({ actorPair });
  } else {
    if (gameId && actorPair) {
      gameInfo.innerHTML = `Game: <strong>${gameId}</strong><br>Target: ${actorPair[0].name} → ${actorPair[1].name}`;
    } else {
      gameInfo.innerHTML = "Game: <em>Not in a game</em>";
    }
  }

  let text = `Player ID: ${playerId}\nClicks: ${clicks}\n\n`;
  if (snapshotGame && snapshotGame.players) {
    const players = snapshotGame.players;
    for (const pid of Object.keys(players)) {
      const p = players[pid] || { clicks: 0 };
      const label = pid === playerId ? "You" : `Opponent (${pid})`;
      text += `${label}: ${p.clicks} clicks\n`;
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
  // create new game id
  const id = randId(5);
  gameId = id;
  // pick two random actors
  const shuffled = [...actorList].sort(() => Math.random() - 0.5);
  actorPair = [shuffled[0], shuffled[1]];
  clicks = 0;

  const gameObj = {
    actorA: actorPair[0],
    actorB: actorPair[1],
    players: {
      [playerId]: { clicks: 0 }
    },
    status: "active",
    winner: null,
    winnerClicks: null,
    createdAt: Date.now()
  };

  try {
    await dbPut(`games/${gameId}`, gameObj);
    // persist game state locally
    await storageSet({ gameId, actorPair, clicks: 0 });
    refreshStatusUI(gameObj);
    startPolling();
    // auto-redirect starter to Actor A
    window.location.href = actorPair[0].url;
  } catch (err) {
    console.error("Failed to create game", err);
    alert("Failed to create game. Check Firebase DB URL and rules.");
  }
}

async function joinGameWithId(inputId) {
  const id = (inputId || "").trim().toUpperCase();
  if (!id) return alert("Enter a game ID.");

  try {
    const game = await dbGet(`games/${id}`);
    if (!game) return alert("Game not found: " + id);

    gameId = id;
    actorPair = [game.actorA, game.actorB];
    clicks = 0;

    // Add or set player entry
    await dbPatch(`games/${gameId}/players/${playerId}`, { clicks: 0 });
    // persist locally
    await storageSet({ gameId, actorPair, clicks: 0 });
    refreshStatusUI(game);
    startPolling();

    // auto-redirect joiner to Actor A as well
    await sleep(200); // allow DB write to settle
    window.location.href = actorPair[0].url;
  } catch (err) {
    console.error("Failed to join game", err);
    alert("Failed to join game. Check Firebase DB URL and Game ID.");
  }
}

async function leaveGame() {
  if (!gameId) {
    alert("Not in a game.");
    return;
  }
  try {
    // Remove player entry from DB (optional)
    await dbPatch(`games/${gameId}/players/${playerId}`, null);
  } catch (err) {
    console.warn("Failed to remove player from DB (non-critical)", err);
  }
  stopPolling();
  await storageRemove(['gameId', 'actorPair', 'clicks']);
  gameId = null;
  actorPair = null;
  clicks = 0;
  refreshStatusUI();
}

// ----------------------
// Polling to fetch game state regularly (1s)
async function pollOnce() {
  try {
    if (!gameId) return;
    const snapshot = await dbGet(`games/${gameId}`);
    if (!snapshot) {
      // Game removed / not found
      gameInfo.innerHTML = `Game: <em>Not found</em>`;
      return;
    }

    // If snapshot has players, update local UI
    refreshStatusUI(snapshot);

    // If a winner was set, stop polling after showing result briefly
    if (snapshot.winner) {
      // Persist final state locally for transparency
      await storageSet({ clicks, gameId, actorPair });
      // Optionally you may stop polling immediately
      // stopPolling();
    }
  } catch (err) {
    console.error("Polling error", err);
  }
}

function startPolling() {
  if (pollingInterval) return;
  pollOnce();
  pollingInterval = setInterval(pollOnce, 1000);
}
function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

// ----------------------
// Click handling rules
// Count only when the user clicks an actor link (per your chosen rule)
document.addEventListener("click", async (e) => {
  const anchor = e.target.closest("a");
  if (!anchor || !anchor.href) return;

  // Only consider clicks to IMDB actor pages (pattern: /name/nm\d+/)
  if (/\/name\/nm\d+\/?/.test(anchor.href)) {
    // If not in a game, do nothing (we do not start a game on click)
    if (!gameId) return;

    try {
      // Increment local clicks
      clicks = (Number(clicks) || 0) + 1;
      // Persist local clicks (so reloads show them)
      await storageSet({ clicks });

      // Perform read-modify-write to DB for player's clicks
      const current = await dbGet(`games/${gameId}/players/${playerId}/clicks`);
      const newClicks = (Number(current) || 0) + 1;
      await dbPatch(`games/${gameId}/players/${playerId}`, { clicks: newClicks });

      // Update status UI immediately (optimistic)
      statusDiv.textContent = `Player ID: ${playerId}\nClicks: ${clicks}\n\nUpdating...`;

      // Check whether the clicked link is the target actor's URL
      const normalizedHref = anchor.href.split('?')[0].replace(/\/+$/, "") + "/";
      const targetNormalized = (actorPair && actorPair[1] && actorPair[1].url) ? actorPair[1].url.split('?')[0].replace(/\/+$/, "") + "/" : null;

      if (targetNormalized && normalizedHref === targetNormalized) {
        // Attempt to set winner atomically (best effort; simple check)
        const snapshot = await dbGet(`games/${gameId}`);
        if (!snapshot.winner) {
          await dbPatch(`games/${gameId}`, { winner: playerId, winnerClicks: newClicks, finishedAt: Date.now(), status: "finished" });
        }
      }
    } catch (err) {
      console.error("Error handling actor click", err);
    }
  }
});

// ----------------------
// Wire UI buttons
startBtn.addEventListener("click", () => {
  joinRow.style.display = "none";
  createGameAndStart();
});

joinBtn.addEventListener("click", () => {
  joinRow.style.display = joinRow.style.display === "none" ? "block" : "none";
});

joinSubmit.addEventListener("click", () => {
  const val = joinInput.value && joinInput.value.trim().toUpperCase();
  if (!val) return alert("Enter a Game ID to join.");
  joinGameWithId(val);
});

leaveBtn.addEventListener("click", () => {
  leaveGame();
});

// ----------------------
// Ensure UI shows current local state on initial load (if stored)
(async function initialRefresh() {
  const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks']);
  if (stored.playerId) playerId = stored.playerId;
  if (stored.gameId) {
    gameId = stored.gameId;
    actorPair = stored.actorPair || null;
    clicks = stored.clicks || 0;
    startPolling();
    // Do not auto-redirect here on reload — only redirect when Start/Join invoked
    refreshStatusUI();
  } else {
    refreshStatusUI();
  }
})();
