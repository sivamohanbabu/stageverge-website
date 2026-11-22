// Stage Verge - Application Logic & Mobile Controllers

document.addEventListener("DOMContentLoaded", () => {
  // State
  let alarms = JSON.parse(localStorage.getItem("sv_alarms") || "[]");
  let todos = JSON.parse(localStorage.getItem("sv_todos") || "[]");
  let currentFilter = "all";
  let unescoFilter = "all";
  let countryFilter = "all";

  // Audio tone generator using Web Audio API (works offline without external files!)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playAlertBeep(freq = 600, duration = 0.25) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  // --- Clock & Anti-Procrastination Reminder ---
  function updateLiveClock() {
    const now = new Date();
    const timeEl = document.getElementById("current-time");
    const dateEl = document.getElementById("current-date");
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Check Alarms match
    const currentHHMM = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');
    const currentSec = now.getSeconds();
    if (currentSec === 0) {
      alarms.forEach(alarm => {
        if (alarm.enabled && alarm.time === currentHHMM) {
          triggerAlarmAlert(alarm);
        }
      });
    }
  }
  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  function triggerAlarmAlert(alarm) {
    // Play dual beep
    playAlertBeep(880, 0.4);
    setTimeout(() => playAlertBeep(1100, 0.4), 450);

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("⏰ Stage Verge Alarm: " + alarm.label, {
        body: `Time is up (${alarm.time})! Stay focused and defeat procrastination.`,
        icon: "manifest.json"
      });
    } else {
      alert(`⏰ [STAGE VERGE ALARM - ${alarm.time}]\n\n"${alarm.label}"\nDon't let time slip away! Take action now.`);
    }
  }

  // --- Pomodoro Focus Engine ---
  let pomodoroSeconds = 25 * 60;
  let pomodoroTotal = 25 * 60;
  let pomodoroTimer = null;
  const pomodoroDisplay = document.getElementById("pomodoro-display");
  const pomodoroProgress = document.getElementById("timer-progress-fill");
  const toggleBtn = document.getElementById("timer-toggle-btn");
  const resetBtn = document.getElementById("timer-reset-btn");
  const timerModeTag = document.getElementById("timer-mode-tag");

  function renderPomodoro() {
    const mins = Math.floor(pomodoroSeconds / 60);
    const secs = pomodoroSeconds % 60;
    pomodoroDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const pct = (pomodoroSeconds / pomodoroTotal) * 100;
    pomodoroProgress.style.width = `${pct}%`;
  }

  function startPomodoro() {
    if (pomodoroTimer) {
      clearInterval(pomodoroTimer);
      pomodoroTimer = null;
      toggleBtn.textContent = "Resume Focus Session";
      toggleBtn.classList.remove("btn-secondary");
      toggleBtn.classList.add("btn-primary");
    } else {
      toggleBtn.textContent = "Pause Session";
      toggleBtn.classList.remove("btn-primary");
      toggleBtn.classList.add("btn-secondary");
      playAlertBeep(520, 0.2);

      pomodoroTimer = setInterval(() => {
        if (pomodoroSeconds > 0) {
          pomodoroSeconds--;
          renderPomodoro();
        } else {
          clearInterval(pomodoroTimer);
          pomodoroTimer = null;
          toggleBtn.textContent = "Start Focus Session";
          playAlertBeep(800, 0.5);
          setTimeout(() => playAlertBeep(1200, 0.6), 500);
          showNotificationBanner("🎉 Session Completed!", "Great job! Take a short break or start the next high-value task.");
        }
      }, 1000);
    }
  }

  function resetPomodoro() {
    if (pomodoroTimer) {
      clearInterval(pomodoroTimer);
      pomodoroTimer = null;
    }
    pomodoroSeconds = pomodoroTotal;
    toggleBtn.textContent = "Start Focus Session";
    toggleBtn.classList.remove("btn-secondary");
    toggleBtn.classList.add("btn-primary");
    renderPomodoro();
  }

  toggleBtn.addEventListener("click", startPomodoro);
  resetBtn.addEventListener("click", resetPomodoro);

  document.querySelectorAll(".pill-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mins = parseInt(btn.dataset.time, 10);
      const mode = btn.dataset.mode;
      timerModeTag.textContent = mode;
      pomodoroTotal = mins * 60;
      pomodoroSeconds = pomodoroTotal;
      resetPomodoro();
    });
  });
  renderPomodoro();

  // --- Alarms Management ---
  const alarmForm = document.getElementById("new-alarm-form");
  const alarmsList = document.getElementById("alarms-list");
  const alarmCount = document.getElementById("alarm-count");

  function saveAlarms() {
    localStorage.setItem("sv_alarms", JSON.stringify(alarms));
    renderAlarms();
  }

  function renderAlarms() {
    alarmsList.innerHTML = "";
    alarmCount.textContent = `${alarms.length} set`;
    if (alarms.length === 0) {
      alarmsList.innerHTML = `<div style="text-align:center; padding:12px; color:var(--text-muted); font-size:12px;">No active alarms. Add one above to protect your time!</div>`;
      return;
    }

    alarms.forEach((a, idx) => {
      const row = document.createElement("div");
      row.className = "alarm-row";
      row.innerHTML = `
        <div>
          <div class="alarm-time">⏰ ${a.time}</div>
          <div class="alarm-label">${escapeHtml(a.label)}</div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <input type="checkbox" ${a.enabled ? 'checked' : ''} data-index="${idx}" class="alarm-toggle" title="Toggle Alarm">
          <button class="delete-btn" data-delete-alarm="${idx}">🗑️</button>
        </div>
      `;
      alarmsList.appendChild(row);
    });

    // Event listeners
    alarmsList.querySelectorAll(".alarm-toggle").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const i = e.target.dataset.index;
        alarms[i].enabled = e.target.checked;
        saveAlarms();
      });
    });

    alarmsList.querySelectorAll("[data-delete-alarm]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = e.target.dataset.deleteAlarm;
        alarms.splice(i, 1);
        saveAlarms();
      });
    });
  }

  alarmForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const timeVal = document.getElementById("alarm-time-input").value;
    const labelVal = document.getElementById("alarm-label-input").value.trim();
    if (!timeVal) return;

    alarms.push({
      time: timeVal,
      label: labelVal || "Focus Checkpoint",
      enabled: true
    });
    alarmForm.reset();
    saveAlarms();
    playAlertBeep(700, 0.15);
  });

  if (alarms.length === 0) {
    // Seed default smart alarms
    alarms.push({ time: "06:30", label: "Morning Rise & Hydrate (Zero Social Media)", enabled: true });
    alarms.push({ time: "12:00", label: "Midday Review: Did I waste my morning?", enabled: true });
    saveAlarms();
  } else {
    renderAlarms();
  }

  // --- Daily Todo List ---
  const todoForm = document.getElementById("todo-form");
  const todoContainer = document.getElementById("todos-container");
  const todoStats = document.getElementById("todo-stats");

  function saveTodos() {
    localStorage.setItem("sv_todos", JSON.stringify(todos));
    renderTodos();
  }

  function renderTodos() {
    todoContainer.innerHTML = "";
    const filtered = todos.filter(t => {
      if (currentFilter === "active") return !t.completed;
      if (currentFilter === "completed") return t.completed;
      return true;
    });

    const completedCount = todos.filter(t => t.completed).length;
    todoStats.textContent = `${completedCount} / ${todos.length} done`;

    if (filtered.length === 0) {
      todoContainer.innerHTML = `<div style="text-align:center; padding:16px; color:var(--text-muted); font-size:12px;">No tasks in this view. Keep winning your day!</div>`;
      return;
    }

    filtered.forEach((todo, idx) => {
      const realIdx = todos.indexOf(todo);
      const item = document.createElement("div");
      item.className = "todo-item";
      
      const priorityClass = todo.priority === 'high' ? 'red' : (todo.priority === 'medium' ? 'gold' : 'blue');

      item.innerHTML = `
        <div class="todo-left">
          <input type="checkbox" class="todo-checkbox" data-todo-idx="${realIdx}" ${todo.completed ? 'checked' : ''}>
          <div>
            <div class="todo-title ${todo.completed ? 'done' : ''}">${escapeHtml(todo.title)}</div>
            <div class="todo-meta">
              <span class="badge ${priorityClass}">${todo.priority.toUpperCase()}</span>
              <span style="font-size:10px; color:var(--text-muted);">${todo.category || 'General'}</span>
            </div>
          </div>
        </div>
        <button class="delete-btn" data-del-todo="${realIdx}">✕</button>
      `;
      todoContainer.appendChild(item);
    });

    todoContainer.querySelectorAll(".todo-checkbox").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const i = e.target.dataset.todoIdx;
        todos[i].completed = e.target.checked;
        if (todos[i].completed) playAlertBeep(900, 0.1);
        saveTodos();
      });
    });

    todoContainer.querySelectorAll("[data-del-todo]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = e.target.dataset.delTodo;
        todos.splice(i, 1);
        saveTodos();
      });
    });
  }

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const textInput = document.getElementById("todo-text-input");
    const priorityInput = document.getElementById("todo-priority-select");
    const categoryInput = document.getElementById("todo-category-select");

    const title = textInput.value.trim();
    if (!title) return;

    todos.unshift({
      title,
      priority: priorityInput.value,
      category: categoryInput.value,
      completed: false,
      timestamp: Date.now()
    });

    textInput.value = "";
    saveTodos();
    playAlertBeep(650, 0.12);
  });

  document.querySelectorAll(".filter-chips .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chips .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentFilter = chip.dataset.filter;
      renderTodos();
    });
  });

  if (todos.length === 0) {
    todos = [
      { title: "Define top 3 goals of today", priority: "high", category: "Work", completed: false },
      { title: "Review UNESCO World Heritage Sites in India", priority: "medium", category: "Learning", completed: false },
      { title: "Drink 2L water & 30 min brisk walk", priority: "high", category: "Health", completed: false }
    ];
    saveTodos();
  } else {
    renderTodos();
  }

  // --- Recommendations ---
  const recsContainer = document.getElementById("recommendations-container");
  const refreshRecBtn = document.getElementById("refresh-rec-btn");

  function renderRecommendations() {
    recsContainer.innerHTML = "";
    window.STAGE_VERGE_DATA.recommendations.forEach(r => {
      const card = document.createElement("div");
      card.className = "rec-card";
      card.innerHTML = `
        <div class="rec-icon">${r.icon}</div>
        <div style="flex:1;">
          <h4>${escapeHtml(r.title)}</h4>
          <p>${escapeHtml(r.desc)}</p>
          <span class="rec-tag">#${r.tag}</span>
        </div>
      `;
      recsContainer.appendChild(card);
    });
  }
  renderRecommendations();
  refreshRecBtn.addEventListener("click", () => {
    playAlertBeep(750, 0.1);
    showNotificationBanner("💡 Mindset Recharged", "Audit your schedule: Are you working on tasks that move the needle?");
  });

  // --- UNESCO Heritage Sites ---
  const unescoCardsList = document.getElementById("unesco-cards-list");
  const unescoSearch = document.getElementById("unesco-search");

  function renderUnesco() {
    const q = (unescoSearch.value || "").toLowerCase().trim();
    unescoCardsList.innerHTML = "";

    const filtered = window.STAGE_VERGE_DATA.unescoSites.filter(site => {
      const matchCategory = (unescoFilter === "all") || (site.category === unescoFilter);
      const matchSearch = site.name.toLowerCase().includes(q) ||
                          site.state.toLowerCase().includes(q) ||
                          site.desc.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      unescoCardsList.innerHTML = `<div style="text-align:center; padding:16px; color:var(--text-muted); font-size:12px;">No UNESCO sites matched your search.</div>`;
      return;
    }

    filtered.forEach(s => {
      const item = document.createElement("div");
      item.className = "feed-item";
      item.innerHTML = `
        <div class="feed-title-row">
          <div class="feed-title">${escapeHtml(s.name)}</div>
          <span class="badge ${s.category === 'India' ? 'gold' : 'blue'}">${s.category}</span>
        </div>
        <div class="feed-subtitle">📍 ${escapeHtml(s.state)} &bull; Inscribed: ${s.year} &bull; ${s.type}</div>
        <p class="feed-desc">${escapeHtml(s.desc)}</p>
      `;
      unescoCardsList.appendChild(item);
    });
  }

  unescoSearch.addEventListener("input", renderUnesco);
  document.querySelectorAll(".sub-pill").forEach(p => {
    p.addEventListener("click", () => {
      document.querySelectorAll(".sub-pill").forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      unescoFilter = p.dataset.unescoType;
      renderUnesco();
    });
  });
  renderUnesco();

  // --- India & Latest Countries ---
  const countriesCardsList = document.getElementById("countries-cards-list");
  const countrySearch = document.getElementById("country-search");

  function renderCountries() {
    const q = (countrySearch.value || "").toLowerCase().trim();
    countriesCardsList.innerHTML = "";

    const filtered = window.STAGE_VERGE_DATA.countries.filter(c => {
      const matchFilter = (countryFilter === "all") ||
                          (countryFilter === "recent" && c.isRecent) ||
                          (countryFilter === "india" && c.isIndia);
      const matchSearch = c.name.toLowerCase().includes(q) ||
                          c.capital.toLowerCase().includes(q) ||
                          c.continent.toLowerCase().includes(q) ||
                          (c.highlights && c.highlights.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      countriesCardsList.innerHTML = `<div style="text-align:center; padding:16px; color:var(--text-muted); font-size:12px;">No countries found.</div>`;
      return;
    }

    filtered.forEach(c => {
      const item = document.createElement("div");
      item.className = "feed-item";
      item.innerHTML = `
        <div class="feed-title-row">
          <div class="feed-title">${escapeHtml(c.name)}</div>
          <span class="badge ${c.isIndia ? 'gold' : 'blue'}">${c.continent}</span>
        </div>
        <div class="feed-subtitle">🏛️ Capital: ${escapeHtml(c.capital)} ${c.yearEstablished ? `&bull; Formed: ${c.yearEstablished}` : ''}</div>
        <p class="feed-desc">${escapeHtml(c.highlights)}</p>
        <div class="feed-meta-row">
          <span>💵 Currency: <strong>${escapeHtml(c.currency)}</strong></span>
          ${c.population ? `<span>👥 Population: <strong>${escapeHtml(c.population)}</strong></span>` : ''}
          ${c.status ? `<span>🌐 Status: <strong>${escapeHtml(c.status)}</strong></span>` : ''}
        </div>
      `;
      countriesCardsList.appendChild(item);
    });
  }

  countrySearch.addEventListener("input", renderCountries);
  document.querySelectorAll(".country-pill").forEach(p => {
    p.addEventListener("click", () => {
      document.querySelectorAll(".country-pill").forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      countryFilter = p.dataset.filter;
      renderCountries();
    });
  });
  renderCountries();

  // --- Bottom Navigation Tab Switching ---
  const navItems = document.querySelectorAll(".nav-item");
  const tabViews = document.querySelectorAll(".tab-view");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(i => i.classList.remove("active"));
      tabViews.forEach(v => v.classList.remove("active"));

      item.classList.add("active");
      const targetId = item.dataset.target;
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add("active");
        document.querySelector(".app-main").scrollTop = 0;
      }
    });
  });

  // --- Daily Notification & Permissions ---
  const notifBtn = document.getElementById("notif-perm-btn");
  const banner = document.getElementById("daily-notification-banner");
  const bannerTitle = document.getElementById("banner-title");
  const bannerDesc = document.getElementById("banner-desc");
  const bannerClose = document.getElementById("banner-close");

  function showNotificationBanner(title, text) {
    bannerTitle.textContent = title;
    bannerDesc.textContent = text;
    banner.classList.remove("hidden");
  }

  bannerClose.addEventListener("click", () => {
    banner.classList.add("hidden");
  });

  notifBtn.addEventListener("click", async () => {
    if ("Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        new Notification("⚡ Stage Verge Activated!", {
          body: "Daily focus notifications and alarms are enabled.",
          icon: "manifest.json"
        });
        showNotificationBanner("🔔 Notifications Active", "You will now receive daily time management & alarm alerts.");
      } else {
        showNotificationBanner("🔔 Browser Alert Active", "In-app alerts are active to keep you focused on your tasks!");
      }
    } else {
      showNotificationBanner("⚡ Notice", "In-app audio and visual alarms are ready.");
    }
  });

  // Quick alarm shortcut from header
  document.getElementById("quick-alarm-btn").addEventListener("click", () => {
    const focusTab = document.querySelector('[data-target="view-focus"]');
    if (focusTab) focusTab.click();
    document.getElementById("alarm-time-input").focus();
  });

  // Escape HTML helper
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }
});
