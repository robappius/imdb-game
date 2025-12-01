// content.js
// IMDB Competitive Click Race - rebuilt; host now redirects to actorA immediately on create

const FIREBASE_DB_URL = "https://imdb-game-343f1-default-rtdb.firebaseio.com"; // Corrected URL
const GAMES_ROOT = `${FIREBASE_DB_URL}/games`;
//THIS IS THE FED BRANCH
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
  { name: "Pedro Rascal", url: "https://www.imdb.com/name/nm0050959/" },
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
let finished = false; // local session flag to block further clicks after finishing
let roundStartedAt = null; // preserved across finished state (stored locally) so winners board can compute durations
let lastReadyAt = null; // timestamp when user clicked Play Again (local helper to handle races)

// ----------------------
// UI overlay (reworked: includes name input + players list)
const uiBox = document.createElement("div");
uiBox.id = "uiOverlay"
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

// Name input
const nameRow = document.createElement("div");
nameRow.style.display = "flex";
nameRow.style.alignItems = "center";
nameRow.style.gap = "6px";
nameRow.style.marginTop = "8px";
uiBox.appendChild(nameRow);

const nameInput = document.createElement("input");
nameInput.id = "nameInput";
nameInput.placeholder = "Display name (you)";
Object.assign(nameInput.style, { padding: "6px", flex: "1", marginBottom: "20px", });
nameRow.appendChild(nameInput);

const nameSaveBtn = document.createElement("button");
nameSaveBtn.textContent = "Save";
nameSaveBtn.id = "nameSaveBtn";
nameSaveBtn.className = "blue-button";
nameRow.appendChild(nameSaveBtn);

// Global round timer (moved below nameRow and above players lobby list, left aligned)
const roundTimerDiv = document.createElement("div");
roundTimerDiv.id = "roundTimer";

// --- WINNER MESSAGE CONTAINER ---
const winnerBox = document.createElement("div");
winnerBox.id = "winnerbox";

// Container for the winner/leaderboard text
const winnerTextContainer = document.createElement("div");
winnerTextContainer.style.marginBottom = "15px";
winnerBox.appendChild(winnerTextContainer);

// Main winner text element (for 1st place)
const winnerText = document.createElement("div");
winnerText.id = "winnerText"
winnerTextContainer.appendChild(winnerText);

// Leaderboard list element (for 2nd, 3rd, etc. and Give Up players)
const leaderboardList = document.createElement("div");
leaderboardList.id = "leaderboardList";
winnerTextContainer.appendChild(leaderboardList);


// Play Again Button
const playAgainBtn = document.createElement("button");
playAgainBtn.textContent = "Play Again";
playAgainBtn.className = "yellow-button";

playAgainBtn.style.zIndex = "1000001";
playAgainBtn.style.pointerEvents = "auto";
winnerBox.appendChild(playAgainBtn);

uiBox.appendChild(winnerBox); // Append winner box to the main UI box

// controls row (Create/Join)
const btnRow = document.createElement("div");
btnRow.style.marginBottom = "8px";
uiBox.appendChild(btnRow);

const startBtn = document.createElement("button");
startBtn.textContent = "Create Game";
startBtn.className = "blue-button";
btnRow.appendChild(startBtn);

const joinBtn = document.createElement("button");
joinBtn.textContent = "Join Game";
joinBtn.className = "blue-button";
btnRow.appendChild(joinBtn);

// Action buttons (Leave/Give Up)
const actionRow = document.createElement("div");
actionRow.style.marginTop = "6px";
actionRow.style.display = "none";
uiBox.appendChild(actionRow);

// Give Up Button (New)
const giveUpBtn = document.createElement("button");
giveUpBtn.textContent = "Give Up";
giveUpBtn.id = "biveUpBtn"
giveUpBtn.className = "blue-button";
actionRow.appendChild(giveUpBtn);

// Copy Code Button
const copybtn = document.createElement("button");
copybtn.textContent = "Copy Code";
copybtn.id = 'copybtn';
copybtn.className = "blue-button"
actionRow.appendChild(copybtn);

// Copy Button code to copy code (non-blocking notice)
const copyNotice = document.createElement('div');
Object.assign(copyNotice.style, {
  marginTop: '3px',
  padding: '6px 6px',
  background: 'rgb(245, 197, 24)',
  color: '#000',
  borderRadius: '0px',
  fontSize: '12px',
  display: 'none',
  textAlign: 'left'
});
copyNotice.setAttribute('aria-live','polite');
actionRow.appendChild(copyNotice);

let copyNoticeTimeout = null;

copybtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(gameId || "");
    console.log("Game ID copied to clipboard:", gameId);

    // Change button text and color
    showCopyOnButton("Copied!", "green");
  } catch (err) {
    console.error("Failed to copy Game ID:", err);

    // Show error feedback on button
    showCopyOnButton("Failed!", "red");
  }
});

function showCopyOnButton(text, color) {
  // Save original state
  const originalText = copybtn.textContent;
  const originalColor = copybtn.style.backgroundColor;

  // Apply feedback
  copybtn.textContent = text;
  copybtn.style.backgroundColor = color;

  // Reset after 2 seconds
  setTimeout(() => {
    copybtn.textContent = originalText;
    copybtn.style.backgroundColor = originalColor;
  }, 2000);
}

// START ROUND button (host-only)
const startRoundBtn = document.createElement("button");
startRoundBtn.textContent = "Start Round";
startRoundBtn.className = "blue-button";
actionRow.appendChild(startRoundBtn);

startRoundBtn.addEventListener("click", async () => {
  if (!gameId) { alert("No active game"); return; }
  try {
    await startRound();
  } catch (err) {
    console.error("startRound failed", err);
    alert("Failed to start round.");
  }
});

const leaveBtn = document.createElement("button");
leaveBtn.textContent = "Leave Game";
leaveBtn.className ="blue-button";
actionRow.appendChild(leaveBtn);

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

// Insert the round timer below the nameRow and above lobbyBox
nameRow.after(roundTimerDiv);

// join controls (enter game id)
const joinRow = document.createElement("div");
joinRow.style.display = "none";
joinRow.style.marginTop = "8px";
uiBox.appendChild(joinRow);

const joinInput = document.createElement("input");
joinInput.placeholder = "Enter Game ID";
Object.assign(joinInput.style, { padding: "6px", width: "160px", marginRight: "6px" });
joinRow.appendChild(joinInput);

const joinSubmit = document.createElement("button");
joinSubmit.textContent = "Join";
joinSubmit.id = "joinSubmit";
joinSubmit.className = "blue-button";
joinRow.appendChild(joinSubmit);

// status text
const statusDiv = document.createElement("div");
statusDiv.style.whiteSpace = "pre-wrap";
statusDiv.style.marginTop = "8px";
uiBox.appendChild(statusDiv);

// hint
const hintDiv = document.createElement("div");
hintDiv.style.fontSize = "11px";
hintDiv.style.opacity = "100";
hintDiv.style.marginTop = "2px";
hintDiv.style.marginBottom = "12px";
hintDiv.innerHTML = "Create a game to generate an ID and enter the lobby. When 2 players are present the host can start the round.";
uiBox.appendChild(hintDiv);

// ----------------------
// RULES MODAL
// Add a Rules button at the bottom of the main modal which opens a secondary modal overlay
const rulesBtn = document.createElement("button");
rulesBtn.textContent = "Rules";
// use the shared stylesheet class instead of inline styles
rulesBtn.className = "good-button";
uiBox.appendChild(rulesBtn);

// Create the overlay that will appear on top of everything
const rulesOverlay = document.createElement("div");
Object.assign(rulesOverlay.style, {
  position: "fixed",
  inset: "0",
  background: "rgba(0,0,0,0.5)",
  zIndex: 1000002,
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  boxSizing: "border-box",
  display: "none" // ensure default is hidden and never shown automatically on load
});
rulesOverlay.setAttribute('aria-hidden', 'true');
rulesOverlay.setAttribute('role', 'dialog');
rulesOverlay.setAttribute('aria-modal', 'true');

// Inner rules box
const rulesBox = document.createElement("div");
Object.assign(rulesBox.style, {
  width: "420px",
  maxWidth: "100%",
  // match main modal golden styling
  background: "linear-gradient(295deg,rgba(110, 88, 10, 1) 0%, rgba(245, 197, 24, 1) 100%)",
  color: "#000", // black text like main UI
  borderRadius: "10px",
  padding: "16px",
  boxSizing: "border-box",
  boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
  textAlign: "left",
  fontSize: "14px",
  lineHeight: "1.4"
});
rulesOverlay.appendChild(rulesBox);

// Title
const rulesTitle = document.createElement("div");
rulesTitle.textContent = "Rules";
Object.assign(rulesTitle.style, {   fontFamily: "Arial, sans-serif", fontWeight: "700", fontSize: "16px", marginBottom: "8px", color: "#000" });
rulesBox.appendChild(rulesTitle);

// Rules content (ordered list)
const rulesContent = document.createElement("div");
rulesContent.innerHTML = `
<ol style="font-family: Arial, sans-serif; padding-left: 18px; margin: 0 0 10px 0; list-style-type: decimal;">
<li>Click through actors, movies and TV shows to reach the destination actor generated</li>
<li>Only the clicks on actors will be counted in the click counter</li>
<li>The player with the least actor clicks wins! If players are tied in click count then the player that reached the destination actor the fastest wins</li>
</ol>
`;
rulesBox.appendChild(rulesContent);

// Close button area
const rulesCloseRow = document.createElement("div");
Object.assign(rulesCloseRow.style, { textAlign: "right", fontFamily: "Arial, sans-serif", marginTop: "10px" });
const rulesCloseBtn = document.createElement("button");
rulesCloseBtn.textContent = "Close";
// use the shared stylesheet class instead of inline styles
rulesCloseBtn.className = "good-button";
rulesCloseRow.appendChild(rulesCloseBtn);
rulesBox.appendChild(rulesCloseRow);

// Append to body so it overlays the entire page (including the uiBox)
document.body.appendChild(rulesOverlay);

// Open / close handlers
function openRulesModal() {
  rulesOverlay.style.display = "flex";
  rulesOverlay.setAttribute('aria-hidden', 'false');
  // trap focus to close button for accessibility
  rulesCloseBtn.focus();
  // prevent background scrolling while modal is open
  document.body.style.overflow = "hidden";
}
function closeRulesModal() {
  rulesOverlay.style.display = "none";
  rulesOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = "";
  // return focus to the rules button
  rulesBtn.focus();
}

rulesBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openRulesModal();
});

rulesCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeRulesModal();
});

// close when clicking outside the rules box
rulesOverlay.addEventListener("click", (e) => {
  if (e.target === rulesOverlay) {
    closeRulesModal();
  }
});

// close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && rulesOverlay.style.display === "flex") {
    closeRulesModal();
  }
});

// ----------------------
// Initialization
(async function init() {
  try {
    const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks', 'displayName', 'role', 'hasRedirected', 'finished', 'roundStartedAt', 'lastReadyAt']);
    if (stored.playerId) playerId = stored.playerId;
    else {
      playerId = randId(6);
      await storageSet({ playerId });
    }

    displayName = stored.displayName || `Player-${playerId}`;
    nameInput.value = displayName;

    if (stored.role) role = stored.role;
    if (stored.hasRedirected) hasRedirected = stored.hasRedirected;
    if (stored.finished) finished = stored.finished;
    if (stored.roundStartedAt) roundStartedAt = stored.roundStartedAt;
    if (stored.lastReadyAt) lastReadyAt = stored.lastReadyAt;

    if (stored.gameId) {
      gameId = stored.gameId;
      actorPair = stored.actorPair || null;
      clicks = stored.clicks || 0;
      startPolling();
    }
    refreshStatusUI();
    updateGameControls();
    console.log("IMDB Click Race initialized", { playerId, displayName, hasRedirected, finished, roundStartedAt, lastReadyAt, gameId });
  } catch (err) {
    console.error("Init error", err);
  }
})();

// ----------------------
// UI helpers
function formatDuration(ms) {
  if (typeof ms !== 'number' || isNaN(ms)) return "";
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function refreshStatusUI(snapshotGame) {
  if (snapshotGame) {
    gameInfo.innerHTML = `Game: <strong>${gameId}</strong><br>Target: ${snapshotGame.actorA ? snapshotGame.actorA.name : 'TBD'} → ${snapshotGame.actorB ? snapshotGame.actorB.name : 'TBD'}`;
    actorPair = snapshotGame.actorA && snapshotGame.actorB ? [snapshotGame.actorA, snapshotGame.actorB] : actorPair;
    storageSet({ actorPair }).catch(() => {});
  } else {
    if (gameId && actorPair) {
      gameInfo.innerHTML = `Game: <strong>${gameId}</strong><br>Target: ${actorPair[0].name} → ${actorPair[1].name}`;
    } else {
      gameInfo.innerHTML = "Game: <em>Not in a game</em>";
    }
  }

  // ROUND TIMER: show if round active
  if (snapshotGame && snapshotGame.startedAt && snapshotGame.status === 'active') {
    // Use server start time as canonical
    roundStartedAt = snapshotGame.startedAt;
    storageSet({ roundStartedAt }).catch(() => {});
    roundTimerDiv.style.display = 'block';
    const elapsed = Date.now() - roundStartedAt;
    roundTimerDiv.textContent = `Time: ${formatDuration(elapsed)}`;
  } else if (snapshotGame && snapshotGame.status === 'finished') {
    // keep roundStartedAt (preserved) so winners board can compute durations;
    if (roundStartedAt) {
      roundTimerDiv.style.display = 'block';
      // show final total if winner present
      if (snapshotGame.winner) {
        const elapsed = Date.now() - roundStartedAt;
        roundTimerDiv.textContent = `Time: ${formatDuration(elapsed)}`;
      } else {
        roundTimerDiv.style.display = 'none';
      }
    } else {
      roundTimerDiv.style.display = 'none';
    }
  } else {
    // lobby or no active round: hide timer and clear preserved start when in lobby
    if (snapshotGame && snapshotGame.status === 'lobby') {
      roundStartedAt = null;
      storageSet({ roundStartedAt: null }).catch(() => {});
      // also clear local lastReadyAt on lobby entry to avoid stale readyness
      lastReadyAt = null;
      storageSet({ lastReadyAt: null }).catch(() => {});
    }
    roundTimerDiv.style.display = 'none';
  }

  // If the game is in lobby mode, reset redirect flag so participants will redirect on the next start
  if (snapshotGame && snapshotGame.status === 'lobby') {
    hasRedirected = false;
    storageSet({ hasRedirected }).catch(() => {});
  }

  // --- WINNER LOGIC FOR UI (replacement block) ---
  if (snapshotGame && snapshotGame.status === 'finished') {
    const players = snapshotGame.players || {};

    // 1. Build players array
    const allPlayers = Object.keys(players).map(pid => ({ pid, ...players[pid] }));

    // finished players: sort by clicks then finishedAt (earliest first)
    const finishedPlayers = allPlayers
      .filter(p => p.finishedAt && !p.gaveUp)
      .sort((a, b) => {
        const ac = Number(a.clicks ?? Infinity);
        const bc = Number(b.clicks ?? Infinity);
        if (ac !== bc) return ac - bc;
        const af = Number(a.finishedAt ?? Infinity);
        const bf = Number(b.finishedAt ?? Infinity);
        return af - bf;
      });

    // gave up players: sort by gaveUpAt ascending (first to give up at the top)
    const gaveUpPlayers = allPlayers
      .filter(p => p.gaveUp)
      .sort((a, b) => {
        const aa = Number(a.gaveUpAt ?? Infinity);
        const ba = Number(b.gaveUpAt ?? Infinity);
        return aa - ba;
      });

    leaderboardList.innerHTML = '';

    if (finishedPlayers.length > 0) {
      // Prefer server-declared winner if present and valid, otherwise fall back to sorted list
      const serverWinnerPid = snapshotGame.winner;
      let winner;
      if (serverWinnerPid && players[serverWinnerPid] && players[serverWinnerPid].finishedAt) {
        winner = { pid: serverWinnerPid, ...players[serverWinnerPid] };
      } else {
        winner = finishedPlayers[0];
      }

      const winnerName = winner.name || winner.pid;
      const baseStart = snapshotGame.startedAt || roundStartedAt;
      const winnerTime = (winner.finishedAt && baseStart) ? formatDuration(winner.finishedAt - baseStart) : "";
      winnerText.innerHTML = `${winnerName} WINS! ${winnerTime ? `${winnerTime}` : ''}`;

      // render finished leaderboard (already sorted)
      finishedPlayers.forEach((player, index) => {
        const rank = index + 1;
        const playerName = player.name || player.pid;
        const clicks = player.clicks;
        const base = snapshotGame.startedAt || roundStartedAt;
        const playerTime = (player.finishedAt && base) ? formatDuration(player.finishedAt - base) : '';

        const listItem = document.createElement('div');
        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';
        listItem.style.gap = '8px';
        listItem.style.width = '100%';

        const left = document.createElement('div');
        const suffix = rank === 1 ? 'st' : (rank === 2 ? 'nd' : (rank === 3 ? 'rd' : 'th'));
        left.innerHTML = `${rank}${suffix} Place: <strong>${playerName}</strong> (${clicks} clicks)`;
        left.style.textAlign = 'left';
        left.style.flex = '1';

        const timeDiv = document.createElement('div');
        timeDiv.textContent = playerTime ? playerTime : '';
        timeDiv.style.minWidth = '56px';
        timeDiv.style.textAlign = 'right';
        timeDiv.style.opacity = player.pid === playerId ? '1' : '0.95';

        listItem.appendChild(left);
        listItem.appendChild(timeDiv);

        if (player.pid === playerId) {
          left.style.fontWeight = '700';
          left.style.color = '#fff';
        }

        leaderboardList.appendChild(listItem);
      });
    } else {
      // No finishers: show Game Ended and indicate no finishers
      winnerText.innerHTML = `Game Ended`;
      leaderboardList.innerHTML = 'No finishers recorded.';
    }

    // Append gave-up players at bottom in order who gave up first -> last
    if (gaveUpPlayers.length > 0) {
      const divider = document.createElement('div');
      divider.style.borderTop = '1px dashed rgba(245, 197, 24, 0.4)';
      divider.style.margin = '8px 0';
      leaderboardList.appendChild(divider);

      const gaveUpHeader = document.createElement('div');
      gaveUpHeader.textContent = 'Non-Finishers:';
      gaveUpHeader.style.fontWeight = 'bold';
      gaveUpHeader.style.marginTop = '4px';
      leaderboardList.appendChild(gaveUpHeader);

      gaveUpPlayers.forEach(player => {
        const playerName = player.name || player.pid;
        const listItem = document.createElement('div');
        const gaveUpAt = player.gaveUpAt ? new Date(Number(player.gaveUpAt)).toLocaleTimeString() : '';
        listItem.innerHTML = `${playerName} — Gave Up ${gaveUpAt ? `(${gaveUpAt})` : ''} 🏳️`;
        listItem.style.textAlign = 'center';
        listItem.style.opacity = '0.8';

        if (player.pid === playerId) {
          listItem.style.fontWeight = 'bold';
          listItem.style.color = '#fff';
          listItem.style.opacity = '1';
        }

        leaderboardList.appendChild(listItem);
      });
    }

    winnerBox.style.display = "flex"; // Show the overlay
    // Hide standard lobby/controls
    lobbyBox.style.display = "none";
    btnRow.style.display = "none";
    nameRow.style.display = "none";
    actionRow.style.display = "none";
  } else {
    // Hide winner box if no winner or game is not finished
    winnerBox.style.display = "none";
    if (gameId) {
        // Only show controls/lobby if a game is active
        lobbyBox.style.display = "block";
        btnRow.style.display = "block";
        nameRow.style.display = "flex";

        // Only show Give Up if the game is started and current player hasn't finished/given up
        const isStarted = snapshotGame && snapshotGame.startedAt;
        const currentPlayer = snapshotGame?.players?.[playerId];
        const canGiveUp = isStarted && currentPlayer && !currentPlayer.finishedAt && !currentPlayer.gaveUp;

        actionRow.style.display = "block";
        giveUpBtn.style.display = canGiveUp ? "inline-block" : "none";

    } else {
        actionRow.style.display = "none";
    }
  }

  // Show host Start Round button if in lobby
  if (snapshotGame && snapshotGame.status === 'lobby' && role === 'host') {
    startRoundBtn.style.display = 'inline-block';
  } else {
    startRoundBtn.style.display = 'none';
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

  const allPlayers = Object.keys(playersObj).map(pid => ({ pid, ...playersObj[pid] }));

  // 1. Sort Finished players by clicks then finishedAt
  const finishedPlayers = allPlayers
    .filter(p => p.finishedAt && !p.gaveUp)
    .sort((a, b) => {
       const ac = Number(a.clicks ?? Infinity);
       const bc = Number(b.clicks ?? Infinity);
       if (ac !== bc) return ac - bc;
       const af = Number(a.finishedAt ?? Infinity);
       const bf = Number(b.finishedAt ?? Infinity);
       return af - bf;
    });

  // 2. Collect Active players (not finished and not given up)
  const activePlayers = allPlayers
    .filter(p => !p.finishedAt && !p.gaveUp);

  // 3. Collect Gave Up players (order by gaveUpAt)
  const gaveUpPlayers = allPlayers
    .filter(p => p.gaveUp)
    .sort((a, b) => {
      const aa = Number(a.gaveUpAt ?? Infinity);
      const ba = Number(b.gaveUpAt ?? Infinity);
      return aa - ba;
    });

  // Combine in order: Finished, Active, Gave Up
  const sortedPlayers = [...finishedPlayers, ...activePlayers, ...gaveUpPlayers];

  for (const p of sortedPlayers) {
    const row = document.createElement("div");
    row.style.padding = "4px 0";
    row.style.fontSize = "13px";
    const label = p.pid === playerId ? `${p.name || p.pid} (You)` : (p.name || p.pid);

    let statusLabel = "";
    if (p.finishedAt) {
      const base = roundStartedAt;
      const dur = (base && p.finishedAt) ? formatDuration(p.finishedAt - base) : '';
      statusLabel = ` — ${p.clicks} clicks ✅ finished${dur ? ` — ${dur}` : ''}`;
    } else if (p.gaveUp) {
      // include gaveUpAt if present
      const gaveUpAt = p.gaveUpAt ? ` (${new Date(Number(p.gaveUpAt)).toLocaleTimeString()})` : '';
      statusLabel = ` — GAVE UP${gaveUpAt} 🏳️`;
      row.style.opacity = '0.6';
    } else if (p.ready) {
      statusLabel = " — READY ⏱️";
      row.style.fontWeight = '600';
    } else if (typeof p.clicks !== 'undefined') {
      statusLabel = ` — ${p.clicks} clicks`;
    }

    row.innerHTML = label + statusLabel;
    playersList.appendChild(row);
  }
}

function updateGameControls() {
  const inGame = !!gameId;
  startBtn.style.display = inGame ? "none" : "inline-block";
  joinBtn.style.display = inGame ? "none" : "inline-block";
  joinRow.style.display = inGame ? "none" : "none";
  actionRow.style.display = inGame ? "block" : "none";
  lobbyBox.style.display = inGame ? "block" : "none";

  if (!inGame) {
     winnerBox.style.display = "none";
     btnRow.style.display = "block";
     nameRow.style.display = "flex";
     lobbyBox.style.display = "none";
  }
}

// ----------------------
// Game operations

// Host action: start a new round using players who are ready or all players that are joined (non-gaveUp)
// REPLACE the existing startRound() with this function
async function startRound() {
  if (!gameId) throw new Error("No gameId");
  // Fetch latest snapshot to avoid races
  const snapshot = await dbGet(`${gameId}`);
  if (!snapshot) throw new Error("Game not found");

  const players = snapshot.players || {};

  // explicit ready flags
  const explicitReady = Object.keys(players).filter(pid => players[pid] && players[pid].ready);

  // all non-gaveUp players (joined)
  const allNonGaveUp = Object.keys(players).filter(pid => players[pid] && !players[pid].gaveUp);

  // Decide readyPids for selection rules:
  // - If 2+ explicit ready -> use explicitReady
  // - Else -> fall back to allNonGaveUp
  let readyPids = explicitReady.length >= 2 ? explicitReady : allNonGaveUp;

  // If still <2, allow host solo if they're the only joined player
  const hostSoloAllowed = (readyPids.length === 1 && readyPids[0] === playerId && role === 'host');

  // Build participants map:
  // 1) Include optimistic participants map (written by guests when they Play Again)
  // 2) Include non-gaveUp players from snapshot.players
  // 3) Include readyPids
  // 4) Always include the host (playerId) so the host can't accidentally exclude themself
  const participants = {};
  const existingParticipants = snapshot.participants || {};
  Object.keys(existingParticipants).forEach(pid => {
    if (existingParticipants[pid]) participants[pid] = true;
  });

  Object.keys(players).forEach(pid => {
    if (players[pid] && !players[pid].gaveUp) participants[pid] = true;
  });

  readyPids.forEach(pid => { participants[pid] = true; });

  // Ensure host is included so host can't be left out due to a previous gaveUp flag
  if (playerId) participants[playerId] = true;

  const participantIds = Object.keys(participants);

  // Now decide if we have enough participants (use participants size, not readyPids length)
  if (participantIds.length < 2 && !hostSoloAllowed) {
    alert("Need at least 2 participants to start a round (or host can start solo if alone).");
    return;
  }

  // choose new actors
  const shuffled = [...actorList].sort(() => Math.random() - 0.5);
  const newActorPair = [shuffled[0], shuffled[1]];

  // Patch game root with new round metadata, clear previous startedAt/winner etc
  await dbPatch(`${gameId}`, {
    actorA: newActorPair[0],
    actorB: newActorPair[1],
    startedAt: Date.now(),
    status: "active",
    winner: null,
    winnerClicks: null,
    participants
  });

  // Reset each participant's player record (clicks, finishedAt, gaveUp=false, ready=false, gaveUpAt=null)
  const resets = participantIds.map(pid => {
    // carry forward name if available; defensive
    const name = (players[pid] && players[pid].name) ? players[pid].name : undefined;
    const payload = { clicks: 0, finishedAt: null, gaveUp: false, ready: false, gaveUpAt: null };
    if (name) payload.name = name;
    return dbPatch(`${gameId}/players/${pid}`, payload);
  });

  await Promise.all(resets);

  console.log("Started new round with participants:", participantIds);
}
async function createGameAndStart() {
  const id = randId(5);
  gameId = id;

  actorPair = null;
  clicks = 0;
  finished = false;

  const now = Date.now();
  const gameObj = {
    actorA: null,
    actorB: null,
    players: { [playerId]: { clicks: 0, name: displayName, gaveUp: false, ready: true, gaveUpAt: null } }, // host ready by default so they can start solo
    status: "lobby",
    winner: null,
    winnerClicks: null,
    createdAt: now
  };

  try {
    // create lobby (not started)
    await dbPut(`${gameId}`, gameObj);
    await storageSet({ gameId, actorPair, clicks, finished });
    role = 'host';
    await storageSet({ role });
    refreshStatusUI(gameObj);
    updateGameControls();
    startPolling();

    // NOTE: do not redirect here — host will click Start Round when ready
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
    finished = false;

    // add self to players (don't auto-ready)
    await dbPatch(`${gameId}/players/${playerId}`, { clicks: 0, name: displayName, gaveUp: false, ready: false, gaveUpAt: null });
    await storageSet({ gameId, actorPair, clicks, finished });
    role = 'guest';
    await storageSet({ role });

    refreshStatusUI(game);
    updateGameControls();
    startPolling();

    // If game already started (startedAt present) the poll will redirect this client automatically (if participant)
  } catch (err) {
    console.error("joinGameWithId failed", err);
    alert("Failed to join game. Check DB URL and code.");
  }
}

async function giveUpGame() {
    if (!gameId || !confirm("Are you sure you want to give up? You will be excluded from winning.")) return;
    
    // mark local finished flag so clicks are blocked, but keep polling running so player will see the final winner screen
    finished = true;
    await storageSet({ finished });

    try {
        // 1. Set the gaveUp flag and record when the player gave up
        const gaveUpAt = Date.now();
        await dbPatch(`${gameId}/players/${playerId}`, { gaveUp: true, finishedAt: null, name: displayName, gaveUpAt });

        // 2. Fetch the updated game state
        const snapshot = await dbGet(`${gameId}`);
        const players = snapshot?.players || {};
        const playerIds = Object.keys(players);
        
        // 3. Check for automatic game end 
        // Only consider players who DID NOT give up when checking finishers
        const finishedPlayers = playerIds.filter(pid => 
            players[pid] && players[pid].finishedAt && !players[pid].gaveUp
        );
        const activePlayers = playerIds.filter(pid => 
            players[pid] && !players[pid].finishedAt && !players[pid].gaveUp
        );
        const gaveUpPlayers = playerIds.filter(pid =>
            players[pid] && players[pid].gaveUp
        );

        // a) If there is exactly one valid finisher AND there are zero active players, declare winner (existing behavior)
        if (finishedPlayers.length === 1 && activePlayers.length === 0) {
            const winnerPid = finishedPlayers[0];
            const winnerClicks = players[winnerPid].clicks;
            
            // Set winner and status
            await dbPatch(`${gameId}`, { 
                winner: winnerPid, 
                winnerClicks: winnerClicks, 
                status: "finished" 
            });
            console.log(`Game ended instantly: ${winnerPid} won by default.`);
            
            // Update UI with the final state
            refreshStatusUI(await dbGet(`${gameId}`));
            return;
        }

        // b) If there are NO finishers and NO active players, everyone gave up -> end the game so clients show gave-up board
        if (finishedPlayers.length === 0 && activePlayers.length === 0 && gaveUpPlayers.length > 0) {
            await dbPatch(`${gameId}`, {
              winner: null,
              winnerClicks: null,
              status: "finished"
            });
            console.log(`All players gave up; ending game and showing gave-up board.`);
            refreshStatusUI(await dbGet(`${gameId}`));
            return;
        }

        // else: just update the UI with the 'gave up' status
        refreshStatusUI(snapshot); 

    } catch (err) {
        console.error("Failed to give up game", err);
        alert("Failed to give up.");
    }
}

async function leaveGame(shouldRestart = false) {
  if (!gameId) { 
      // If we're forcing a restart, and not in a game, just execute the restart logic.
      if (shouldRestart) {
          stopPolling();
          gameId = null;
          actorPair = null;
          clicks = 0;
          role = null;
          hasRedirected = false;
          finished = false;
          await storageSet({ finished });
          refreshStatusUI();
          updateGameControls();
      } else {
        alert("Not in a game."); 
      }
      return;
  }
  
  try {
    // Remove player entry (set to null)
    await dbPatch(`${gameId}/players/${playerId}`, null);
  } catch (err) {
    console.warn("Failed to remove player from DB", err);
  }
  
  // Clear local state and storage
  stopPolling();
  await storageRemove(['gameId', 'actorPair', 'clicks', 'role', 'hasRedirected', 'finished', 'lastReadyAt']); 
  gameId = null;
  actorPair = null;
  clicks = 0;
  role = null;
  hasRedirected = false;
  finished = false;
  lastReadyAt = null;
  
  // Re-run UI update
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
    refreshStatusUI(snapshot); // This now handles displaying the winner message and buttons
    renderPlayersList(snapshot.players || {});

    const players = snapshot.players || {};
    const playerIds = Object.keys(players);
    const currentPlayer = players[playerId];
    
    // If the current player has given up, mark local finished but keep polling so they receive final winner screen
    if (currentPlayer && currentPlayer.gaveUp) {
        if (!finished) {
           finished = true;
           await storageSet({ finished });
        }
        // continue polling to pick up end-of-game updates
    }

    // If startedAt is set and we haven't redirected yet, redirect only participants to actorA
    if (snapshot.startedAt && !hasRedirected) {
      if (snapshot.actorA && snapshot.actorB) {
        actorPair = [snapshot.actorA, snapshot.actorB];
        await storageSet({ actorPair });
      }

      // Determine participant membership:
      // - explicit participants map from host
      // - server ready flag
      // - fallback: server record non-gaveUp if there's no participants map
      // - optimistic local signal lastReadyAt within 5s of startedAt
      const serverPlayerRec = snapshot.players && snapshot.players[playerId] ? snapshot.players[playerId] : null;
      const playerReadyFlag = !!(serverPlayerRec && serverPlayerRec.ready);
      const playerGaveUpFlag = !!(serverPlayerRec && serverPlayerRec.gaveUp);
      const explicitlyIncluded = !!(snapshot.participants && snapshot.participants[playerId]);

      const recentReadyRace = lastReadyAt && snapshot.startedAt && Math.abs(snapshot.startedAt - lastReadyAt) < 5000;

      const amParticipant = explicitlyIncluded || playerReadyFlag || (serverPlayerRec && !playerGaveUpFlag) || recentReadyRace;

      if (amParticipant) {
        // Clear local stale finished/hasRedirected flags for reliable redirect
        finished = false;
        hasRedirected = false;
        await storageSet({ finished, hasRedirected });

        await sleep(150);
        if (actorPair && actorPair[0] && actorPair[0].url) {
          hasRedirected = true;
          await storageSet({ hasRedirected });
          window.location.href = actorPair[0].url;
          return;
        }
      } else {
        // Not a participant -- remain in lobby. Ensure we show lobby UI.
        refreshStatusUI(snapshot);
        renderPlayersList(snapshot.players || {});
      }
    }

    // Winner determination (Host-only logic): 
    
    // 1. Filter out players who gave up before checking for the winner
    const finishedPlayers = playerIds.filter(pid => 
        players[pid] && players[pid].finishedAt && !players[pid].gaveUp
    );
    
    // 2. Check for game conclusion conditions
    let conclude = false;
    
    // Standard condition: two or more finished players
    if (finishedPlayers.length >= 2) {
        conclude = true;
    }
    
    // Special condition: one finished player and zero active players
    if (!conclude && finishedPlayers.length === 1) {
        const activePlayers = playerIds.filter(pid => 
            players[pid] && !players[pid].finishedAt && !players[pid].gaveUp
        );
        if (activePlayers.length === 0) {
            conclude = true; // One finisher, everyone else is out/given up. Declare them the winner.
        }
    }

    if (conclude && !snapshot.winner && role === 'host') {
      // New tie-aware selection:
      // 1) Find minimum click count among finishers
      // 2) From players with that click count, pick the one with the smallest finishedAt (earliest)
      let winnerPid = null;
      let minClicks = Infinity;
    
      // Determine minClicks first
      for (const pid of finishedPlayers) {
        const rec = players[pid];
        const c = Number(rec?.clicks) || Infinity;
        if (c < minClicks) minClicks = c;
      }
    
      // Collect candidates with clicks === minClicks and pick earliest finishedAt
      let earliestFinishedAt = Infinity;
      for (const pid of finishedPlayers) {
        const rec = players[pid];
        const c = Number(rec?.clicks) || Infinity;
        const finishedAt = Number(rec?.finishedAt) || Infinity;
        if (c === minClicks) {
          if (finishedAt < earliestFinishedAt) {
            earliestFinishedAt = finishedAt;
            winnerPid = pid;
          }
        }
      }
    
      if (!winnerPid) {
        // Fallback (defensive): pick first finished player
        winnerPid = finishedPlayers[0];
        minClicks = Number(players[winnerPid].clicks) || Infinity;
      }
    
      // Update DB with winner and set status to finished
      await dbPatch(`${gameId}`, {
        winner: winnerPid,
        winnerClicks: minClicks,
        status: "finished",
        startedAt: null // clear startedAt to indicate round ended
      });
      console.log(`Host set winner: ${winnerPid} in ${minClicks} clicks (earliest finishedAt).`);
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

  // If we've already marked finished in this session, ignore further clicks
  if (finished) return;

  if (!actorPair) {
    try {
      const snapshot = await dbGet(`${gameId}`);
      if (snapshot && snapshot.actorA && snapshot.actorB)
        actorPair = [snapshot.actorA, snapshot.actorB];
    } catch (err) {
      console.warn("Failed to fetch actorPair during click", err);
    }
  }

  // Double-check server-side that this player hasn't finished or given up (prevents post-finish increments)
  try {
    const playerRec = await dbGet(`${gameId}/players/${playerId}`);
    if (playerRec && (playerRec.finishedAt || playerRec.gaveUp)) {
      finished = !!playerRec.finishedAt || !!playerRec.gaveUp;
      await storageSet({ finished });
      return;
    }

    // Determine new clicks based on latest known value (server preferred if available)
    const serverClicks = Number(playerRec?.clicks) || 0;
    const currentLocalClicks = Number(clicks) || 0;
    const base = Math.max(serverClicks, currentLocalClicks);
    const newClicks = base + 1;
    clicks = newClicks; // update local counter

    const targetUrl = actorPair?.[1]?.url;
    if (targetUrl && href.startsWith(targetUrl)) {
      // finishing click: write clicks + finishedAt atomically
      const finishedAt = Date.now();
      await dbPatch(`${gameId}/players/${playerId}`, { clicks: newClicks, finishedAt, name: displayName, gaveUp: false });
      finished = true;
      await storageSet({ clicks, finished });
      // The poll function will now detect the winner and display the message to all players.
    } else {
      // non-finishing click: just update clicks
      await dbPatch(`${gameId}/players/${playerId}`, { clicks: newClicks, name: displayName, gaveUp: false }); 
      await storageSet({ clicks });
    }
  } catch (err) {
    console.error("Failed to persist click", err);
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

// New: Give Up Button Listener
giveUpBtn.addEventListener("click", giveUpGame);

nameSaveBtn.addEventListener("click", async () => {
  displayName = (nameInput.value || "").trim() || displayName || `Player-${playerId}`;
  await storageSet({ displayName });
  if (gameId) {
    try {
      // Also update the name on the server, ensuring gaveUp status is preserved or defaulted
      await dbPatch(`${gameId}/players/${playerId}`, { 
          name: displayName, 
          gaveUp: (await dbGet(`${gameId}/players/${playerId}/gaveUp`)) || false
      }); 
    } catch (err) {
      console.warn("Failed to update name on server", err);
    }
  }
  refreshStatusUI();
});

// Play Again Button Listener (mark ready + return to lobby)
// Moved into named handler so it can be invoked by the button itself and by a fallback click detector
// --- REPLACE handlePlayAgainClick with this version ---
async function handlePlayAgainClick() {
  if (!gameId) return;
  try {
    // Reset local counters so the UI doesn't show previous round values
    clicks = 0;
    finished = false;
    hasRedirected = false;
    lastReadyAt = Date.now();
    await storageSet({ clicks, finished, hasRedirected, lastReadyAt });

    // Mark this player ready for the next round (don't leave the game)
    await dbPatch(`${gameId}/players/${playerId}`, { ready: true, gaveUp: false, finishedAt: null, clicks: 0, name: displayName, gaveUpAt: null });

    // Also write an optimistic participants entry so the host's startRound can pick this guest up
    await dbPatch(`${gameId}/participants/${playerId}`, true);

    // Move the game into lobby mode so host can start the next round; clear previous winner/startedAt (do NOT clear participants)
    await dbPatch(`${gameId}`, { status: 'lobby', winner: null, winnerClicks: null, startedAt: null });

    // Refresh UI to show lobby state
    const snap = await dbGet(`${gameId}`);
    refreshStatusUI(snap);
    renderPlayersList(snap.players || {});
    updateGameControls();
    // polling already running; nothing more to do
  } catch (err) {
    console.error("Failed to ready for next round", err);
    alert("Failed to mark ready.");
  }
}

// attach handler to the button
playAgainBtn.addEventListener('click', handlePlayAgainClick);

// fallback: winnerBox click handler detects clicks that land within the visible button rect
// and calls the same handler. This helps if something overlays the button and prevents
// the button's own click event from firing in some browsers / devices.
winnerBox.addEventListener('click', (e) => {
  try {
    const rect = playAgainBtn.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      // call handler but don't await (click handler already handles async)
      handlePlayAgainClick();
      // prevent duplicate handling by preventing default propagation
      e.preventDefault();
      e.stopPropagation();
    }
  } catch (err) {
    // ignore; non-critical
  }
});

// ----------------------
// Initial rehydration
(async function initialRefresh() {
  const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks', 'displayName', 'role', 'hasRedirected', 'finished', 'roundStartedAt', 'lastReadyAt']);
  if (stored.playerId) playerId = stored.playerId;
  if (stored.displayName) {
    displayName = stored.displayName;
    nameInput.value = displayName;
  }
  if (stored.role) role = stored.role;
  if (stored.hasRedirected) hasRedirected = stored.hasRedirected; 
  if (stored.finished) finished = stored.finished;
  if (stored.roundStartedAt) roundStartedAt = stored.roundStartedAt;
  if (stored.lastReadyAt) lastReadyAt = stored.lastReadyAt;

  if (stored.gameId) {
    gameId = stored.gameId;
    actorPair = stored.actorPair || null;
    clicks = stored.clicks || 0;
    startPolling();
  }
  refreshStatusUI();
  updateGameControls();
})();
