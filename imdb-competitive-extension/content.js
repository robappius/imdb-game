// content.js
// IMDB Competitive Click Race - rebuilt; host now redirects to actorA immediately on create

const FIREBASE_DB_URL = "https://imdb-game-343f1-default-rtdb.firebaseio.com"; // Corrected URL
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
let finished = false; // local session flag to block further clicks after finishing

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

// --- WINNER MESSAGE CONTAINER ---
const winnerBox = document.createElement("div");
Object.assign(winnerBox.style, {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "#f5c518",
  display: "none",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  textAlign: "center",
  fontSize: "20px",
  padding: "12px",
  boxSizing: "border-box"
});

// Container for the winner/leaderboard text
const winnerTextContainer = document.createElement("div");
winnerTextContainer.style.marginBottom = "15px";
winnerBox.appendChild(winnerTextContainer);

// Main winner text element (for 1st place)
const winnerText = document.createElement("div");
Object.assign(winnerText.style, {
  fontWeight: "bold",
  fontSize: "1.4em", 
  marginBottom: "8px",
  textShadow: "1px 1px 2px #000"
});
winnerTextContainer.appendChild(winnerText);

// Leaderboard list element (for 2nd, 3rd, etc. and Give Up players)
const leaderboardList = document.createElement("div");
Object.assign(leaderboardList.style, {
    fontSize: "0.8em",
    fontWeight: "normal",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    maxWidth: "80%",
    margin: "0 auto"
});
winnerTextContainer.appendChild(leaderboardList);


// Play Again Button
const playAgainBtn = document.createElement("button");
playAgainBtn.textContent = "Play Again";
// Make the whole visible button area clickable: full-width, block, comfortable padding
Object.assign(playAgainBtn.style, { 
    padding: "12px 14px", 
    borderRadius: "6px", 
    background: "#f5c518", 
    color: "#000", 
    border: "2px solid #000", 
    fontWeight: "bold",
    cursor: "pointer",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    marginTop: "8px",
    textAlign: "center",
    // increase tap target on touch devices
    touchAction: "manipulation"
});
// ensure button receives pointer events if something is overlaid; give it high z-index
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
Object.assign(startBtn.style, { padding: "6px 8px", marginRight: "6px", borderRadius: "6px", background: "#000", color: "#fff", border: "none", cursor: "pointer" });
btnRow.appendChild(startBtn);

const joinBtn = document.createElement("button");
joinBtn.textContent = "Join Game";
Object.assign(joinBtn.style, { padding: "6px 8px", borderRadius: "6px", background: "#000", color: "#fff", border: "none", cursor: "pointer" });
btnRow.appendChild(joinBtn);

// Action buttons (Leave/Give Up)
const actionRow = document.createElement("div");
actionRow.style.marginTop = "6px";
actionRow.style.display = "none";
uiBox.appendChild(actionRow);

// Give Up Button (New)
const giveUpBtn = document.createElement("button");
giveUpBtn.textContent = "Give Up";
Object.assign(giveUpBtn.style, { 
    padding: "6px 8px", 
    marginRight: "6px", 
    borderRadius: "6px", 
    background: "#ff6347", 
    color: "#fff", 
    border: "none", 
    cursor: "pointer" 
});
actionRow.appendChild(giveUpBtn);

// Copy Code Button
const copybtn = document.createElement("button");
copybtn.textContent = "Copy Code";
copybtn.id = 'copybtn';
Object.assign(copybtn.style, { 
    padding: "6px 8px", 
    
    marginRight: "6px", 
    borderRadius: "6px", 
    background: "#c4341bff", 
    color: "#fff", 
    border: "none", 
    cursor: "pointer" 
});
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
    showCopyNotice("Game code copied!");
  } catch (err) {
    console.error("Failed to copy Game ID:", err);
    showCopyNotice("Failed to copy game code");
  }
});

function showCopyNotice(text) {
  if (copyNoticeTimeout) {
    clearTimeout(copyNoticeTimeout);
    copyNoticeTimeout = null;
  }
  copyNotice.textContent = text;
  copyNotice.style.display = 'block';
  copyNoticeTimeout = setTimeout(() => {
    copyNotice.style.display = 'none';
    copyNoticeTimeout = null;
  }, 2000);
}

// START ROUND button (host-only)
const startRoundBtn = document.createElement("button");
startRoundBtn.textContent = "Start Round";
Object.assign(startRoundBtn.style, {
  padding: "6px 8px",
  marginRight: "6px",
  borderRadius: "6px",
  background: "#004d00",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  display: "none" // shown only to host in lobby
});
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
Object.assign(leaveBtn.style, { 
    padding: "6px 8px", 
    borderRadius: "6px", 
    background: "#b22222", 
    color: "#fff", 
    border: "none", 
    cursor: "pointer" 
});
actionRow.appendChild(leaveBtn);

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
hintDiv.style.opacity = "0";
hintDiv.style.marginTop = "8px";
hintDiv.innerHTML = "Create a game to generate an ID and enter the lobby. When 2 players are present the host can start the round.";
uiBox.appendChild(hintDiv);

// ----------------------
// Initialization
(async function init() {
  try {
    const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks', 'displayName', 'role', 'hasRedirected', 'finished']);
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

    if (stored.gameId) {
      gameId = stored.gameId;
      actorPair = stored.actorPair || null;
      clicks = stored.clicks || 0;
      startPolling();
    }
    refreshStatusUI();
    updateGameControls();
    console.log("IMDB Click Race initialized, playerId:", playerId, "name:", displayName, "redirected:", hasRedirected, "finished:", finished);
  } catch (err) {
    console.error("Init error", err);
  }
})();

// ----------------------
// UI helpers
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

  // If the game is in lobby mode, reset redirect flag so participants will redirect on the next start
  if (snapshotGame && snapshotGame.status === 'lobby') {
    hasRedirected = false;
    storageSet({ hasRedirected }).catch(() => {});
  }

  // --- WINNER LOGIC FOR UI ---
  if (snapshotGame && snapshotGame.winner && snapshotGame.winnerClicks) {
    const players = snapshotGame.players || {};
    
    // 1. Separate players into two groups
    const allPlayers = Object.keys(players).map(pid => ({ pid, ...players[pid] }));

    const finishedPlayers = allPlayers
      .filter(p => p.finishedAt && !p.gaveUp) // Only count finishers who didn't give up
      .sort((a, b) => (a.clicks || Infinity) - (b.clicks || Infinity));
      
    const gaveUpPlayers = allPlayers
      .filter(p => p.gaveUp); // These players have no score, so no need to sort

    leaderboardList.innerHTML = '';
    
    if (finishedPlayers.length > 0) {
        // Display 1st Place (The Winner)
        const winner = finishedPlayers[0];
        const winnerName = winner.name || winner.pid;
        winnerText.innerHTML = `🏁 ${winnerName} WINS! 🏆`;
        
        // Display the rest of the finished leaderboard
        finishedPlayers.forEach((player, index) => {
            const rank = index + 1;
            const playerName = player.name || player.pid;
            const clicks = player.clicks;
            
            const listItem = document.createElement('div');
            // Use correct ordinal suffix
            const suffix = rank === 1 ? 'st' : (rank === 2 ? 'nd' : (rank === 3 ? 'rd' : 'th'));
            
            listItem.innerHTML = `${rank}${suffix} Place: ${playerName} (${clicks} clicks)`;
            listItem.style.textAlign = 'center';
            
            // Highlight the current player if they finished
            if (player.pid === playerId) {
                 listItem.style.fontWeight = 'bold';
                 listItem.style.color = '#fff';
            }
            
            leaderboardList.appendChild(listItem);
        });
        
    } else {
        // This handles cases where a game ends but nobody actually finished (e.g. everyone gave up)
        winnerText.innerHTML = `Game Ended`;
        leaderboardList.innerHTML = 'No finishers recorded.';
    }
    
    // 2. Append Gave Up players at the bottom
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
            listItem.innerHTML = `${playerName} — Gave Up 🏳️`;
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

  // 1. Sort Finished players by clicks
  const finishedPlayers = allPlayers
    .filter(p => p.finishedAt && !p.gaveUp) // Only count finishers who didn't give up
    .sort((a, b) => (a.clicks || Infinity) - (b.clicks || Infinity));
    
  // 2. Collect Active players (not finished and not given up)
  const activePlayers = allPlayers
    .filter(p => !p.finishedAt && !p.gaveUp);

  // 3. Collect Gave Up players
  const gaveUpPlayers = allPlayers
    .filter(p => p.gaveUp);

  // Combine in order: Finished, Active, Gave Up
  const sortedPlayers = [...finishedPlayers, ...activePlayers, ...gaveUpPlayers];

  for (const p of sortedPlayers) {
    const row = document.createElement("div");
    row.style.padding = "4px 0";
    row.style.fontSize = "13px";
    const label = p.pid === playerId ? `${p.name || p.pid} (You)` : (p.name || p.pid);
    
    let statusLabel = "";
    if (p.finishedAt) {
      statusLabel = ` — ${p.clicks} clicks ✅ finished`;
    } else if (p.gaveUp) {
      statusLabel = " — GAVE UP 🏳️";
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
  joinRow.style.display = inGame ? "none" : "none"; // joinRow toggled by clicking Join button
  // leave/give up logic is now handled in refreshStatusUI based on game state
  actionRow.style.display = inGame ? "block" : "none"; 
  lobbyBox.style.display = inGame ? "block" : "none";
  
  if (!inGame) {
     winnerBox.style.display = "none";
     btnRow.style.display = "block";
     nameRow.style.display = "flex";
     lobbyBox.style.display = "none"; // Hide lobby box when no game is active
  }
}

// ----------------------
// Game operations

// Host action: start a new round using players who are ready or all players that are joined (non-gaveUp)
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

  // Decide participants:
  // - If 2+ explicit ready -> use explicitReady
  // - Else if explicitReady is <2 -> fall back to including allNonGaveUp (so guests are included by default)
  // - Allow host solo only if only one joined player exists and it's the host
  let readyPids = explicitReady.length >= 2 ? explicitReady : allNonGaveUp;

  // If still <2, allow host solo if they're the only joined player
  const hostSoloAllowed = (readyPids.length === 1 && readyPids[0] === playerId && role === 'host');

  if (readyPids.length < 2 && !hostSoloAllowed) {
    alert("Need at least 2 participants to start a round (or host can start solo if alone).");
    return;
  }

  // choose new actors
  const shuffled = [...actorList].sort(() => Math.random() - 0.5);
  const newActorPair = [shuffled[0], shuffled[1]];

  // Build participants map
  const participants = {};
  readyPids.forEach(pid => { participants[pid] = true; });

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

  // Reset each participant's player record (clicks, finishedAt, gaveUp, ready=false)
  const resets = readyPids.map(pid => {
    return dbPatch(`${gameId}/players/${pid}`, { clicks: 0, finishedAt: null, gaveUp: false, ready: false });
  });

  // Wait for all resets to finish
  await Promise.all(resets);

  console.log("Started new round with participants:", readyPids);
}

async function createGameAndStart() {
  const id = randId(5);
  gameId = id;

  // choose pair at startRound time
  actorPair = null;
  clicks = 0;
  finished = false;

  const now = Date.now();
  const gameObj = {
    actorA: null,
    actorB: null,
    players: { [playerId]: { clicks: 0, name: displayName, gaveUp: false, ready: true } }, // host ready by default so they can start solo
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
    await dbPatch(`${gameId}/players/${playerId}`, { clicks: 0, name: displayName, gaveUp: false, ready: false });
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
        // 1. Set the gaveUp flag for the current player (don't set finishedAt)
        await dbPatch(`${gameId}/players/${playerId}`, { gaveUp: true, finishedAt: null, name: displayName });
        
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
        
        // Game ends if: 
        // a) There is exactly one valid finisher AND
        // b) There are zero active, non-finished players left.
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
        } else {
            // If the game didn't end instantly, update UI with the 'gave up' status
            refreshStatusUI(snapshot); 
        }

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
  await storageRemove(['gameId', 'actorPair', 'clicks', 'role', 'hasRedirected', 'finished']); 
  gameId = null;
  actorPair = null;
  clicks = 0;
  role = null;
  hasRedirected = false;
  finished = false;
  
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
      // - If the host explicitly included this player in snapshot.participants -> treat them as participant ALWAYS
      // - Otherwise accept snapshot.players[playerId].ready (covers race where per-player resets haven't landed yet)
      // - Fallback to old behavior: when there's no participants map, consider non-gaveUp players participants
      const serverPlayerRec = snapshot.players && snapshot.players[playerId] ? snapshot.players[playerId] : null;
      const playerReadyFlag = !!(serverPlayerRec && serverPlayerRec.ready);
      const playerGaveUpFlag = !!(serverPlayerRec && serverPlayerRec.gaveUp);

      // New: prefer the explicit participants map from the host and ignore gaveUp when host explicitly included the player
      const explicitlyIncluded = !!(snapshot.participants && snapshot.participants[playerId]);

      const amParticipant = explicitlyIncluded ||
                            playerReadyFlag ||
                            (!snapshot.participants && serverPlayerRec && !playerGaveUpFlag);

      if (amParticipant) {
        // If the host explicitly included us, clear any stale local gave-up/finished state so redirect happens reliably.
        // This is defensive for races where local storage still marked 'finished' or 'gaveUp' after clicking Give Up earlier.
        if (explicitlyIncluded) {
          finished = false;
          hasRedirected = false;
          await storageSet({ finished, hasRedirected });
        } else {
          // For other cases, also ensure we clear finished so UI/redirect flow is fresh
          clicks = 0;
          finished = false;
          hasRedirected = false;
          await storageSet({ clicks, finished, hasRedirected, gameId });
        }

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
      let winnerPid;
      let minClicks;

      if (finishedPlayers.length > 0) {
        // If there are finishers, find the one with min clicks
        winnerPid = finishedPlayers[0];
        minClicks = players[winnerPid].clicks || Infinity;
        
        for (const pid of finishedPlayers) {
          const c = Number(players[pid].clicks) || Infinity;
          if (c < minClicks) { minClicks = c; winnerPid = pid; }
        }
      } else {
        // This case should be prevented by the 'finishedPlayers.length > 0' check.
        return; 
      }
      
      // Update DB with winner and set status to finished
      await dbPatch(`${gameId}`, { 
          winner: winnerPid, 
          winnerClicks: minClicks, 
          status: "finished",
          startedAt: null // clear startedAt to indicate round ended
      });
      console.log(`Host set winner: ${winnerPid} in ${minClicks} clicks.`);
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
async function handlePlayAgainClick() {
  if (!gameId) return;
  try {
    // Reset local counters so the UI doesn't show previous round values
    clicks = 0;
    finished = false;
    hasRedirected = false;
    await storageSet({ clicks, finished, hasRedirected });

    // Mark this player ready for the next round (don't leave the game)
    await dbPatch(`${gameId}/players/${playerId}`, { ready: true, gaveUp: false, finishedAt: null, clicks: 0, name: displayName });

    // Move the game into lobby mode so host can start the next round; clear previous winner/startedAt/participants
    await dbPatch(`${gameId}`, { status: 'lobby', winner: null, winnerClicks: null, startedAt: null, participants: null });

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
  const stored = await storageGet(['playerId', 'gameId', 'actorPair', 'clicks', 'displayName', 'role', 'hasRedirected', 'finished']);
  if (stored.playerId) playerId = stored.playerId;
  if (stored.displayName) {
    displayName = stored.displayName;
    nameInput.value = displayName;
  }
  if (stored.role) role = stored.role;
  if (stored.hasRedirected) hasRedirected = stored.hasRedirected; 
  if (stored.finished) finished = stored.finished;

  if (stored.gameId) {
    gameId = stored.gameId;
    actorPair = stored.actorPair || null;
    clicks = stored.clicks || 0;
    startPolling();
  }
  refreshStatusUI();
  updateGameControls();
})();
