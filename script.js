// ========================================================
// 💖 ROMANTIC PROPOSAL WEBSITE - JAVASCRIPT LOGIC
// Heart Physics, Audio Synthesis, Runaway Button & Confetti
// + Fairy Dust Sparkle Trails, 3D Tilt & Multi-Color Themes
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Load Configuration, Themes & URL Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const themes = ["default", "theme-lavender", "theme-peach", "theme-candy"];
  let currentTheme = urlParams.get("theme") || localStorage.getItem("proposal_theme") || "default";

  const config = {
    herName: urlParams.get("her") || localStorage.getItem("proposal_herName") || PROPOSAL_CONFIG.herName,
    yourName: urlParams.get("him") || localStorage.getItem("proposal_yourName") || PROPOSAL_CONFIG.yourName,
    questionTitle: urlParams.get("title") || PROPOSAL_CONFIG.questionTitle,
    questionSubtitle: urlParams.get("subtitle") || PROPOSAL_CONFIG.questionSubtitle
  };

  // Apply Theme
  function applyTheme(themeName) {
    themes.forEach(t => {
      if (t !== "default") document.body.classList.remove(t);
    });
    if (themeName !== "default") {
      document.body.classList.add(themeName);
    }
    currentTheme = themeName;
    localStorage.setItem("proposal_theme", themeName);

    // Update active state on theme pill buttons
    document.querySelectorAll(".theme-pill-btn").forEach(btn => {
      if (btn.getAttribute("data-theme") === themeName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
  applyTheme(currentTheme);

  // 2. DOM Elements
  const introScreen = document.getElementById("intro-screen");
  const envelope = document.getElementById("envelope");
  const waxSeal = document.getElementById("wax-seal");
  const musicToggleBtn = document.getElementById("music-toggle-btn");
  const musicWaves = document.getElementById("music-waves");
  const themeCycleBtn = document.getElementById("theme-cycle-btn");
  const customizeBtn = document.getElementById("customize-btn");
  const customizerDrawer = document.getElementById("customizer-drawer");
  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  const saveConfigBtn = document.getElementById("save-config-btn");
  const copyLinkBtn = document.getElementById("copy-link-btn");
  const inputHerName = document.getElementById("input-her-name");
  const inputYourName = document.getElementById("input-your-name");

  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const teaseToast = document.getElementById("tease-toast");
  const celebrationModal = document.getElementById("celebration-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const certDateSpan = document.getElementById("cert-date");
  const whatsappShareLink = document.getElementById("whatsapp-share-link");
  const printCertBtn = document.getElementById("print-cert-btn");

  let dodgeCount = 0;
  let musicPlaying = false;
  let audioCtx = null;
  let melodyInterval = null;

  if (inputHerName) inputHerName.value = config.herName;
  if (inputYourName) inputYourName.value = config.yourName;

  // Theme Cycling in Top Controls
  if (themeCycleBtn) {
    themeCycleBtn.addEventListener("click", () => {
      const nextIdx = (themes.indexOf(currentTheme) + 1) % themes.length;
      applyTheme(themes[nextIdx]);
      playTone(784, audioCtx ? audioCtx.currentTime : 0, 0.4, "sine", 0.08);
      burstHeartsAt(window.innerWidth - 60, 40, 10);
    });
  }

  // Theme Pill Buttons in Customizer Drawer
  document.querySelectorAll(".theme-pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-theme");
      applyTheme(selected);
      playTone(880, audioCtx ? audioCtx.currentTime : 0, 0.3, "triangle", 0.08);
    });
  });

  // Render configured texts
  function applyDynamicContent() {
    document.querySelectorAll(".dyn-her-name").forEach(el => {
      el.textContent = config.herName;
    });
    document.querySelectorAll(".dyn-your-name").forEach(el => {
      el.textContent = config.yourName;
    });

    const qTitleEl = document.getElementById("dyn-question-title");
    if (qTitleEl) qTitleEl.textContent = `Will you be my girlfriend, ${config.herName}?`;

    const qSubEl = document.getElementById("dyn-question-subtitle");
    if (qSubEl) qSubEl.textContent = config.questionSubtitle;

    if (certDateSpan) {
      certDateSpan.textContent = PROPOSAL_CONFIG.celebration.certificateDate;
    }

    if (whatsappShareLink) {
      const msg = `Hey ${config.yourName}! I just saw the website... and I said YES! ❤️💍🥰`;
      whatsappShareLink.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    }
  }

  // Render Reasons
  function renderReasons() {
    const container = document.getElementById("reasons-container");
    if (!container) return;
    container.innerHTML = "";
    PROPOSAL_CONFIG.reasons.forEach(reason => {
      const card = document.createElement("div");
      card.className = "reason-card";
      card.innerHTML = `
        <div class="reason-icon">${reason.emoji}</div>
        <h3 class="reason-title">${reason.title}</h3>
        <p class="reason-desc">${reason.desc}</p>
      `;
      container.appendChild(card);
    });
  }

  // Render Memories & Attach 3D Tilt Listeners
  function renderMemories() {
    const container = document.getElementById("memories-container");
    if (!container) return;
    container.innerHTML = "";
    PROPOSAL_CONFIG.memories.forEach(mem => {
      const card = document.createElement("div");
      card.className = "polaroid-card";
      card.innerHTML = `
        <div class="polaroid-tape"></div>
        <div class="polaroid-img-wrapper">
          <img src="${mem.image}" alt="${mem.caption}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80'">
        </div>
        <h4 class="polaroid-caption">${mem.caption}</h4>
        <span class="polaroid-date">${mem.date}</span>
      `;

      // Interactive 3D mouse tilt
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = -(y / rect.height) * 16;
        const rotY = (x / rect.width) * 16;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });

      container.appendChild(card);
    });
  }

  applyDynamicContent();
  renderReasons();
  renderMemories();

  // ========================================================
  // 3. Romantic Lullaby Web Audio Synthesizer
  // ========================================================
  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, time, duration = 1.2, type = "sine", gainVal = 0.08) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(gainVal, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  function playChime() {
    initAudioContext();
    const now = audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      playTone(freq, now + idx * 0.12, 1.4, "triangle", 0.15);
    });
  }

  function playVictoryFanfare() {
    initAudioContext();
    const now = audioCtx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    chords.forEach((freq, idx) => {
      playTone(freq, now + idx * 0.09, 1.8, "sine", 0.18);
    });
    setTimeout(() => {
      if (!audioCtx) return;
      playTone(1046.50, audioCtx.currentTime, 2.5, "triangle", 0.22);
    }, 550);
  }

  function startRomanticMelody() {
    initAudioContext();
    musicPlaying = true;
    if (musicWaves) musicWaves.style.display = "inline-flex";

    const melody = [
      { note: 523.25, dur: 1.0 }, // C5
      { note: 659.25, dur: 0.8 }, // E5
      { note: 783.99, dur: 1.2 }, // G5
      { note: 659.25, dur: 0.8 }, // E5
      { note: 880.00, dur: 1.2 }, // A5
      { note: 783.99, dur: 0.8 }, // G5
      { note: 698.46, dur: 1.0 }, // F5
      { note: 659.25, dur: 1.2 }  // E5
    ];

    let noteIdx = 0;
    melodyInterval = setInterval(() => {
      if (!musicPlaying || !audioCtx) return;
      const current = melody[noteIdx % melody.length];
      playTone(current.note, audioCtx.currentTime, current.dur, "sine", 0.04);
      if (noteIdx % 2 === 0) {
        playTone(current.note / 2, audioCtx.currentTime, 1.5, "triangle", 0.03);
      }
      noteIdx++;
    }, 700);
  }

  function stopRomanticMelody() {
    musicPlaying = false;
    if (musicWaves) musicWaves.style.display = "none";
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener("click", () => {
      if (musicPlaying) {
        stopRomanticMelody();
      } else {
        startRomanticMelody();
      }
    });
  }

  // ========================================================
  // 4. Envelope Opening Interaction
  // ========================================================
  function openEnvelope() {
    if (envelope.classList.contains("opened")) return;
    envelope.classList.add("opened");
    playChime();
    burstHeartsAt(window.innerWidth / 2, window.innerHeight / 2, 35);

    setTimeout(() => {
      introScreen.classList.add("opened");
      startRomanticMelody();
    }, 1200);
  }

  if (waxSeal) waxSeal.addEventListener("click", openEnvelope);
  if (envelope) envelope.addEventListener("click", openEnvelope);

  // ========================================================
  // 5. The Playful Runaway "NO" Button Logic
  // ========================================================
  function dodgeNoButton(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    dodgeCount++;
    const phrases = PROPOSAL_CONFIG.noButtonPhrases;
    const phrase = phrases[dodgeCount % phrases.length];

    if (teaseToast) {
      teaseToast.textContent = phrase;
      teaseToast.classList.add("show");
    }

    const newYesScale = Math.min(1.85, 1 + dodgeCount * 0.08);
    const newNoScale = Math.max(0.65, 1 - dodgeCount * 0.04);
    btnYes.style.transform = `scale(${newYesScale})`;
    btnNo.style.transform = `scale(${newNoScale})`;

    const parent = btnNo.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const maxOffsetX = Math.min(180, parentRect.width / 2);
    const maxOffsetY = 60;

    let randX = (Math.random() - 0.5) * (maxOffsetX * 2);
    let randY = (Math.random() - 0.5) * (maxOffsetY * 2);

    btnNo.style.position = "relative";
    btnNo.style.transform = `translate(${randX}px, ${randY}px) scale(${newNoScale})`;

    const btnRect = btnNo.getBoundingClientRect();
    burstHeartsAt(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 6);
  }

  if (btnNo) {
    btnNo.addEventListener("mouseenter", dodgeNoButton);
    btnNo.addEventListener("touchstart", dodgeNoButton, { passive: false });
    btnNo.addEventListener("click", dodgeNoButton);
  }

  // ========================================================
  // 6. The "YES!" Celebration Modal & Confetti
  // ========================================================
  if (btnYes) {
    btnYes.addEventListener("click", () => {
      playVictoryFanfare();
      launchConfetti();
      burstHeartsAt(window.innerWidth / 2, window.innerHeight / 2, 70);
      celebrationModal.classList.add("active");
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      celebrationModal.classList.remove("active");
    });
  }

  if (printCertBtn) {
    printCertBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // ========================================================
  // 7. Customizer Drawer & Shareable Link Generator
  // ========================================================
  if (customizeBtn) {
    customizeBtn.addEventListener("click", () => {
      customizerDrawer.classList.add("active");
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener("click", () => {
      customizerDrawer.classList.remove("active");
    });
  }

  if (saveConfigBtn) {
    saveConfigBtn.addEventListener("click", () => {
      if (inputHerName.value.trim()) {
        config.herName = inputHerName.value.trim();
        localStorage.setItem("proposal_herName", config.herName);
      }
      if (inputYourName.value.trim()) {
        config.yourName = inputYourName.value.trim();
        localStorage.setItem("proposal_yourName", config.yourName);
      }
      applyDynamicContent();
      customizerDrawer.classList.remove("active");
      playChime();
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      const her = encodeURIComponent(inputHerName.value.trim() || config.herName);
      const him = encodeURIComponent(inputYourName.value.trim() || config.yourName);
      const thm = encodeURIComponent(currentTheme);
      const shareUrl = `${window.location.origin}${window.location.pathname}?her=${her}&him=${him}&theme=${thm}`;

      navigator.clipboard.writeText(shareUrl).then(() => {
        const originalText = copyLinkBtn.textContent;
        copyLinkBtn.textContent = "Link Copied! 💌";
        setTimeout(() => {
          copyLinkBtn.textContent = originalText;
        }, 2500);
      }).catch(() => {
        prompt("Copy this link to send to your girl:", shareUrl);
      });
    });
  }

  // ========================================================
  // 8. FAIRY DUST / SPARKLE CURSOR TRAIL ENGINE ✨
  // ========================================================
  const sparkleCanvas = document.getElementById("sparkle-canvas");
  const ctxSparkle = sparkleCanvas ? sparkleCanvas.getContext("2d") : null;
  let sparklesList = [];

  class SparkleParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 7 + 4;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2 - 0.5;
      this.opacity = 1;
      this.fade = Math.random() * 0.03 + 0.02;
      this.color = ["#ffd166", "#ff2a5f", "#c77dff", "#00f5d4", "#ffffff", "#ff99c8"][Math.floor(Math.random() * 6)];
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.15;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= this.fade;
      this.rot += this.rotSpeed;
    }

    draw(ctx) {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      // 4-point star sparkle shape
      ctx.beginPath();
      const s = this.size;
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.fill();
      ctx.restore();
    }
  }

  function addSparkle(x, y, count = 2) {
    for (let i = 0; i < count; i++) {
      sparklesList.push(new SparkleParticle(x, y));
    }
  }

  window.addEventListener("mousemove", (e) => {
    addSparkle(e.clientX, e.clientY, 2);
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches && e.touches[0]) {
      addSparkle(e.touches[0].clientX, e.touches[0].clientY, 3);
    }
  }, { passive: true });

  function animateSparkles() {
    if (ctxSparkle) {
      ctxSparkle.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
      for (let i = sparklesList.length - 1; i >= 0; i--) {
        const s = sparklesList[i];
        s.update();
        s.draw(ctxSparkle);
        if (s.opacity <= 0) {
          sparklesList.splice(i, 1);
        }
      }
    }
    requestAnimationFrame(animateSparkles);
  }
  animateSparkles();

  // ========================================================
  // 9. Floating Hearts Canvas Engine
  // ========================================================
  const heartsCanvas = document.getElementById("hearts-canvas");
  const ctxHearts = heartsCanvas ? heartsCanvas.getContext("2d") : null;
  let heartsList = [];

  function resizeCanvases() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (heartsCanvas) { heartsCanvas.width = w; heartsCanvas.height = h; }
    if (sparkleCanvas) { sparkleCanvas.width = w; sparkleCanvas.height = h; }
    const confettiCanvas = document.getElementById("confetti-canvas");
    if (confettiCanvas) { confettiCanvas.width = w; confettiCanvas.height = h; }
  }
  window.addEventListener("resize", resizeCanvases);
  resizeCanvases();

  class HeartParticle {
    constructor(x, y, isBurst = false) {
      this.x = x !== undefined ? x : Math.random() * window.innerWidth;
      this.y = y !== undefined ? y : window.innerHeight + 25;
      this.size = Math.random() * 16 + 10;
      this.speedY = isBurst ? (Math.random() - 0.5) * 14 : -(Math.random() * 1.6 + 0.8);
      this.speedX = isBurst ? (Math.random() - 0.5) * 14 : (Math.random() - 0.5) * 1.2;
      this.opacity = isBurst ? 1 : Math.random() * 0.65 + 0.25;
      this.fade = isBurst ? 0.015 : 0.002;
      this.color = ["#ff2a5f", "#ff758f", "#ff8fa3", "#ffd166", "#c77dff", "#f72585"][Math.floor(Math.random() * 6)];
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.05;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.opacity -= this.fade;
      this.rot += this.rotSpeed;
    }

    draw(ctx) {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const s = this.size / 2;
      ctx.moveTo(0, s / 3);
      ctx.bezierCurveTo(-s, -s, -s * 1.5, s / 3, 0, s * 1.5);
      ctx.bezierCurveTo(s * 1.5, s / 3, s, -s, 0, s / 3);
      ctx.fill();
      ctx.restore();
    }
  }

  function burstHeartsAt(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
      heartsList.push(new HeartParticle(x, y, true));
    }
  }

  setInterval(() => {
    if (heartsList.length < 45) {
      heartsList.push(new HeartParticle());
    }
  }, 380);

  function animateHearts() {
    if (ctxHearts) {
      ctxHearts.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
      for (let i = heartsList.length - 1; i >= 0; i--) {
        const h = heartsList[i];
        h.update();
        h.draw(ctxHearts);
        if (h.opacity <= 0 || h.y < -30) {
          heartsList.splice(i, 1);
        }
      }
    }
    requestAnimationFrame(animateHearts);
  }
  animateHearts();

  // ========================================================
  // 10. Multi-Colored Confetti Cannon Engine
  // ========================================================
  const confettiCanvas = document.getElementById("confetti-canvas");
  const ctxConfetti = confettiCanvas ? confettiCanvas.getContext("2d") : null;
  let confettiParticles = [];

  class ConfettiPiece {
    constructor() {
      this.x = window.innerWidth / 2;
      this.y = window.innerHeight * 0.6;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 22 + 9;
      this.vx = Math.cos(angle) * velocity;
      this.vy = Math.sin(angle) * velocity - 14;
      this.gravity = 0.42;
      this.drag = 0.96;
      this.size = Math.random() * 9 + 6;
      this.color = ["#ff0055", "#ff5400", "#ffbd00", "#00f5d4", "#7b2cbf", "#ff70a6", "#fee440", "#ff4d6d"][Math.floor(Math.random() * 8)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 18;
      this.opacity = 1;
      this.shape = Math.random() > 0.4 ? "rect" : "circle";
    }

    update() {
      this.vx *= this.drag;
      this.vy *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.opacity -= 0.007;
    }

    draw(ctx) {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      if (this.shape === "rect") {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function launchConfetti() {
    for (let i = 0; i < 220; i++) {
      confettiParticles.push(new ConfettiPiece());
    }
    animateConfetti();
  }

  function animateConfetti() {
    if (!ctxConfetti) return;
    ctxConfetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.update();
      p.draw(ctxConfetti);
      if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
        confettiParticles.splice(i, 1);
      }
    }
    if (confettiParticles.length > 0) {
      requestAnimationFrame(animateConfetti);
    }
  }
});
