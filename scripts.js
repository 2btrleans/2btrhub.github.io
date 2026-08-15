// ===== STATE =====
let activeGameId = null;
let searchQuery = '';

// (emojis are now in data.js)

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderGames();
  renderScripts();
  setupSearch();
});

// ===== STATS =====
function renderStats() {
  document.getElementById('total-scripts').textContent = scripts.length;
  document.getElementById('total-games').textContent = games.length;
}

// ===== GAMES =====
function renderGames() {
  const grid = document.getElementById('games-grid');
  grid.innerHTML = '';

  games.forEach(game => {
    const count = scripts.filter(s => s.gameId === game.id).length;
    const card = document.createElement('div');
    card.className = 'game-card';
    card.style.setProperty('--game-color', game.color);
    card.dataset.gameId = game.id;

    card.innerHTML = `
      <div class="game-icon">${game.emoji || '🎮'}</div>
      <div class="game-name">${game.name}</div>
      <div class="game-script-count">${count} scripts</div>
    `;

    card.addEventListener('click', () => toggleGame(game.id));
    grid.appendChild(card);
  });
}

function toggleGame(gameId) {
  if (activeGameId === gameId) {
    activeGameId = null;
  } else {
    activeGameId = gameId;
  }
  updateGameCards();
  renderScripts();
}

function updateGameCards() {
  document.querySelectorAll('.game-card').forEach(card => {
    const id = parseInt(card.dataset.gameId);
    card.classList.toggle('active', id === activeGameId);
  });
}

// ===== SEARCH =====
function setupSearch() {
  const input = document.getElementById('search-input');
  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderScripts();
  });
}

// ===== SCRIPTS =====
function getFilteredScripts() {
  return scripts.filter(script => {
    const matchesGame = activeGameId ? script.gameId === activeGameId : true;
    const matchesSearch = searchQuery
      ? script.title.toLowerCase().includes(searchQuery) ||
        script.description.toLowerCase().includes(searchQuery) ||
        script.tags.some(t => t.toLowerCase().includes(searchQuery)) ||
        getGameName(script.gameId).toLowerCase().includes(searchQuery)
      : true;
    return matchesGame && matchesSearch;
  });
}

function getGameName(gameId) {
  const game = games.find(g => g.id === gameId);
  return game ? game.name : '';
}

function getGameUrl(gameId) {
  const game = games.find(g => g.id === gameId);
  return game ? game.url : '#';
}

function getGameColor(gameId) {
  const game = games.find(g => g.id === gameId);
  return game ? game.color : '#7c3aed';
}

function renderScripts() {
  const grid = document.getElementById('scripts-grid');
  const countEl = document.getElementById('scripts-count');
  const filtered = getFilteredScripts();

  countEl.textContent = filtered.length + ' scripts';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-icon">🔍</div>
        <h3>No scripts found</h3>
        <p>Try selecting a different game or changing your search term.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = '';
  filtered.forEach((script, index) => {
    const card = createScriptCard(script, index);
    grid.appendChild(card);
  });
}

function createScriptCard(script, index) {
  const card = document.createElement('div');
  card.className = 'script-card';
  card.style.animationDelay = `${index * 0.05}s`;

  const gameName = getGameName(script.gameId);
  const gameColor = getGameColor(script.gameId);
  const gameUrl = getGameUrl(script.gameId);

  const tagsHtml = script.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

  card.innerHTML = `
    <div class="script-header">
      <div class="script-info">
        <h3>${script.title}</h3>
        <p>${script.description}</p>
      </div>
      <span class="script-game-badge" style="color: ${gameColor};">${gameName}</span>
    </div>
    <div class="script-tags">
      ${tagsHtml}
    </div>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-lang">Lua</span>
        <div style="display:flex;gap:6px;">
          <a class="play-btn" href="${gameUrl}" target="_blank" rel="noopener noreferrer">
            🎮 Play Game
          </a>
          <button class="copy-btn" onclick="copyScript(this, ${script.id})">
            📋 Copy
          </button>
        </div>
      </div>
      <pre><code>${escapeHtml(script.code)}</code></pre>
    </div>
  `;

  return card;
}

// ===== COPY =====
function copyScript(btn, scriptId) {
  const script = scripts.find(s => s.id === scriptId);
  if (!script) return;

  navigator.clipboard.writeText(script.code).then(() => {
    btn.classList.add('copied');
    btn.textContent = '✓ Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '📋 Copy';
    }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = script.code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.classList.add('copied');
    btn.textContent = '✓ Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '📋 Copy';
    }, 2000);
  });
}

// ===== CLEAR FILTER =====
function clearFilter() {
  activeGameId = null;
  updateGameCards();
  renderScripts();
}

// ===== UTILS =====
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
