(() => {
  // =========================================================================
  // 1. THEME SWITCHER (Parchment -> Dark -> Clean)
  // =========================================================================
  const THEMES = ["parchment", "dark", "clean"];
  const THEME_LABELS = {
    parchment: { name: "Parchment", icon: "📜" },
    dark: { name: "Dark Mode", icon: "🌙" },
    clean: { name: "Clean White", icon: "☀️" }
  };

  let currentTheme = localStorage.getItem("f0undr-theme") || "parchment";

  function applyTheme(theme) {
    if (theme === "parchment") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem("f0undr-theme", theme);
    currentTheme = theme;

    const iconEl = document.getElementById("theme-icon");
    const labelEl = document.getElementById("theme-name");
    if (iconEl) iconEl.textContent = THEME_LABELS[theme].icon;
    if (labelEl) labelEl.textContent = THEME_LABELS[theme].name;
  }

  applyTheme(currentTheme);

  document.querySelectorAll("#theme-toggle, [data-theme-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const nextIdx = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
      applyTheme(THEMES[nextIdx]);
    });
  });

  // =========================================================================
  // 2. READING PROGRESS & DYNAMIC CHAPTER SCROLL-SPY
  // =========================================================================
  const progress = document.querySelector("#chapter-progress");
  const progressCopy = document.querySelector("#progress-copy");
  const readingLabel = document.querySelector(".reading-label");
  const contentsDialog = document.querySelector("#contents-dialog");

  const chapters = [
    { id: "unit-one", title: "Unit 1 · ICT Fundamentals" },
    { id: "unit-two", title: "Unit 2 · Digital Skills" },
    { id: "unit-three", title: "Unit 3 · Algorithmic Thinking" },
    { id: "unit-four", title: "Unit 4 · Programming" },
    { id: "unit-five", title: "Unit 5 · Digital Citizenship" },
    { id: "unit-six", title: "Unit 6 · Entrepreneurship" },
    { id: "flashcards", title: "Interactive · Flashcards" },
    { id: "glossary", title: "Reference · Glossary" },
    { id: "abbreviations", title: "Reference · Abbreviations" }
  ];

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
    
    if (progress) {
      progress.value = percent;
      progress.textContent = `${percent}%`;
    }
    if (progressCopy) {
      progressCopy.textContent = `${percent}% read`;
    }

    const scrollPos = window.scrollY + 220;
    let activeTitle = "f0undr Book · Curriculum";
    for (const chap of chapters) {
      const el = document.getElementById(chap.id);
      if (el && el.offsetTop <= scrollPos) {
        activeTitle = chap.title;
      }
    }
    if (readingLabel) {
      readingLabel.innerHTML = `<span class="reading-dot" aria-hidden="true"></span> ${activeTitle}`;
    }
  }

  // =========================================================================
  // 3. INTERACTIVE SELF-ASSESSMENT QUIZZES (Units 1 to 6)
  // =========================================================================
  document.querySelectorAll(".quiz-section").forEach(section => {
    const unit = section.getAttribute("data-quiz-unit");
    const scoreBadge = section.querySelector(".quiz-score-badge");
    const cards = section.querySelectorAll(".quiz-card");
    const resetBtn = section.querySelector(".quiz-reset-btn");
    let correctCount = 0;
    let answeredCount = 0;

    function updateScore() {
      if (scoreBadge) {
        const pct = Math.round((correctCount / cards.length) * 100);
        scoreBadge.textContent = `Score: ${correctCount} / ${cards.length} (${pct}%)`;
      }
    }

    cards.forEach(card => {
      const correctIdx = parseInt(card.getAttribute("data-answer"), 10);
      const buttons = card.querySelectorAll(".quiz-option-btn");
      const explanation = card.querySelector(".quiz-explanation");

      buttons.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
          // Disable all buttons in this question
          buttons.forEach(b => b.disabled = true);
          answeredCount++;

          if (idx === correctIdx) {
            btn.classList.add("selected-correct");
            card.classList.add("answered-correct");
            correctCount++;
            if (explanation) {
              explanation.className = "quiz-explanation show correct";
              explanation.innerHTML = `<strong>✓ Correct!</strong> ${card.getAttribute("data-explain") || "Well done!"}`;
            }
          } else {
            btn.classList.add("selected-wrong");
            card.classList.add("answered-wrong");
            // Highlight the correct one
            if (buttons[correctIdx]) buttons[correctIdx].classList.add("is-answer");
            if (explanation) {
              explanation.className = "quiz-explanation show wrong";
              explanation.innerHTML = `<strong>✗ Incorrect.</strong> ${card.getAttribute("data-explain") || "Review the unit notes above."}`;
            }
          }
          updateScore();
        });
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        correctCount = 0;
        answeredCount = 0;
        cards.forEach(card => {
          card.classList.remove("answered-correct", "answered-wrong");
          const buttons = card.querySelectorAll(".quiz-option-btn");
          buttons.forEach(b => {
            b.disabled = false;
            b.classList.remove("selected-correct", "selected-wrong", "is-answer");
          });
          const explanation = card.querySelector(".quiz-explanation");
          if (explanation) {
            explanation.className = "quiz-explanation";
            explanation.textContent = "";
          }
        });
        if (scoreBadge) scoreBadge.textContent = `Score: 0 / ${cards.length} (0%)`;
      });
    }
  });

  // =========================================================================
  // 4. INTERACTIVE 3D FLASHCARDS ENGINE
  // =========================================================================
  const FLASHCARDS_DATA = [
    { cat: "Unit 1", term: "ICT", def: "Information & Communication Technology: the broad ecosystem of computing devices, telecommunication networks, and software used to create, process, store, and communicate information." },
    { cat: "Unit 1", term: "Data vs. Information", def: "Data refers to raw, unorganized facts and symbols (e.g. 98, 86). Information is data processed, structured, and presented in context to be meaningful and actionable." },
    { cat: "Unit 1", term: "IPO Cycle", def: "Input-Process-Output Cycle: The foundational operational model of all computer systems, extended with persistent secondary storage." },
    { cat: "Unit 1", term: "ALU", def: "Arithmetic Logic Unit: The sub-processor within the CPU executing mathematical calculations (+, -, *, /) and logical comparisons (<, >, =)." },
    { cat: "Unit 1", term: "Control Unit (CU)", def: "The CPU section that directs the flow of instructions and data, acting like an electronic traffic controller between memory and ALU." },
    { cat: "Unit 1", term: "RAM", def: "Random Access Memory: High-speed volatile primary memory used by the CPU for active programs. Erases completely when power is switched off." },
    { cat: "Unit 1", term: "ROM", def: "Read-Only Memory: Non-volatile chip permanently holding the essential firmware and startup instructions (BIOS) to boot the system." },
    { cat: "Unit 1", term: "Supercomputer", def: "The most powerful class of computers on Earth, engineered for quantum physics, weather forecasting, and molecular simulations." },
    { cat: "Unit 2", term: "Word Processor", def: "Application software designed for drafting, editing, formatting, reviewing, and printing text-based documents." },
    { cat: "Unit 2", term: "The Ribbon", def: "The command toolbar spanning the top of Microsoft Office applications, systematically grouped into tabs (Home, Insert, Layout, Review)." },
    { cat: "Unit 2", term: "Slide Master", def: "The master template in presentation software that dictates typography, color themes, headers, and layouts for all slides in the deck." },
    { cat: "Unit 2", term: "Bcc (Blind Carbon Copy)", def: "Email field where recipient addresses remain strictly hidden from all other recipients, safeguarding personal privacy." },
    { cat: "Unit 2", term: "Netiquette", def: "The established rules of courtesy, respect, and professional behavior when communicating over digital networks." },
    { cat: "Unit 3", term: "Decomposition", def: "Computational thinking strategy of breaking down a large, complicated problem into smaller, modular, easily solvable components." },
    { cat: "Unit 3", term: "Abstraction", def: "Focusing exclusively on essential, critical details while filtering out irrelevant background noise and complexity." },
    { cat: "Unit 3", term: "Algorithm", def: "A step-by-step, finite, unambiguous set of ordered instructions designed to accomplish a specific task or solve a problem." },
    { cat: "Unit 3", term: "Flowchart", def: "A visual schematic displaying an algorithm's sequence, branches, and loops using standardized geometric shapes connected by flow lines." },
    { cat: "Unit 3", term: "Trace Table", def: "A manual testing matrix used on paper to track variable values step by step (dry running) to detect logic errors before coding." },
    { cat: "Unit 4", term: "Compiler vs. Interpreter", def: "A compiler translates the entire source program into machine code prior to execution; an interpreter analyzes and runs code line by line." },
    { cat: "Unit 4", term: "Scratch 3.0", def: "MIT's visual block-based programming environment where code blocks snap together like puzzle pieces, eliminating syntax errors." },
    { cat: "Unit 4", term: "Iteration (Loop)", def: "A programming structure that repeats a block of instructions (e.g. repeat 10, forever, repeat until condition is met)." },
    { cat: "Unit 4", term: "Variable", def: "A named digital storage container in a computer program that holds changeable values such as Score, Lives, or Timer." },
    { cat: "Unit 4", term: "Selection (Condition)", def: "A decision construct that evaluates whether a condition is True or False to branch program execution (if-then-else)." },
    { cat: "Unit 5", term: "Digital Footprint", def: "The permanent trail of digital records and telemetry left behind whenever you interact with online services (Active vs. Passive)." },
    { cat: "Unit 5", term: "Two-Factor Authentication", def: "A security protocol requiring two distinct proof factors to log in (something you know: password + something you have: phone code)." },
    { cat: "Unit 5", term: "Ransomware", def: "Malicious software that locks and encrypts a victim's personal files, demanding payment to unlock the cryptographic keys." },
    { cat: "Unit 5", term: "Phishing", def: "Social engineering fraud using spoofed emails or messages pretending to be trusted institutions to steal confidential passwords." },
    { cat: "Unit 5", term: "PECA (2016)", def: "Prevention of Electronic Crimes Act: Pakistan's national cybercrime law penalizing unauthorized system access, hacking, and harassment." },
    { cat: "Unit 5", term: "CRAAP Test", def: "Information evaluation checklist: Currency, Relevance, Authority, Accuracy, and Purpose to detect fake news and bias." },
    { cat: "Unit 6", term: "Digital Entrepreneurship", def: "Launching innovative business ventures leveraging cloud software and internet scale with low startup costs and global reach." },
    { cat: "Unit 6", term: "Design Thinking", def: "A human-centered 5-stage innovation framework: Empathize, Define, Ideate, Prototype, and Test." },
    { cat: "Unit 6", term: "MVP", def: "Minimum Viable Product: The simplest functional prototype built with minimal effort to validate customer demand and collect user feedback." },
    { cat: "Unit 6", term: "Elevator Pitch", def: "A crisp 2-minute oral presentation covering Hook & Problem, Digital Solution, Traction, and Call to Action." },
    { cat: "Acronyms", term: "SSD", def: "Solid State Drive: High-speed flash storage device with zero moving mechanical parts." },
    { cat: "Acronyms", term: "URL", def: "Uniform Resource Locator: The standardized web address of a digital resource on the Internet." },
    { cat: "Acronyms", term: "VPN", def: "Virtual Private Network: An encrypted network tunnel shielding personal data over public Wi-Fi connections." }
  ];

  const flashcardObj = document.getElementById("flashcard-obj");
  const flashcardTag = document.getElementById("flashcard-tag");
  const flashcardTerm = document.getElementById("flashcard-term");
  const flashcardDef = document.getElementById("flashcard-def");
  const flashcardCounter = document.getElementById("flashcard-counter");
  const flashcardFilter = document.getElementById("flashcard-filter");
  const prevCardBtn = document.getElementById("card-prev");
  const nextCardBtn = document.getElementById("card-next");
  const shuffleCardBtn = document.getElementById("card-shuffle");
  const masterCardBtn = document.getElementById("card-master");
  const reviewCardBtn = document.getElementById("card-review");
  const masteredCountEl = document.getElementById("mastered-count");
  const reviewCountEl = document.getElementById("review-count");

  let cardIndex = 0;
  let activeCards = [...FLASHCARDS_DATA];
  let masteredSet = new Set(JSON.parse(localStorage.getItem("f0undr-mastered-cards") || "[]"));
  let reviewSet = new Set(JSON.parse(localStorage.getItem("f0undr-review-cards") || "[]"));

  function updateCardStats() {
    if (masteredCountEl) masteredCountEl.textContent = `${masteredSet.size} Mastered`;
    if (reviewCountEl) reviewCountEl.textContent = `${reviewSet.size} Need Review`;
    localStorage.setItem("f0undr-mastered-cards", JSON.stringify([...masteredSet]));
    localStorage.setItem("f0undr-review-cards", JSON.stringify([...reviewSet]));
  }

  function renderCard() {
    if (!flashcardObj || activeCards.length === 0) return;
    flashcardObj.classList.remove("is-flipped");
    const item = activeCards[cardIndex];
    if (flashcardTag) flashcardTag.textContent = item.cat;
    if (flashcardTerm) flashcardTerm.textContent = item.term;
    if (flashcardDef) flashcardDef.textContent = item.def;
    if (flashcardCounter) flashcardCounter.textContent = `Card ${cardIndex + 1} of ${activeCards.length}`;
  }

  if (flashcardObj) {
    flashcardObj.addEventListener("click", () => {
      flashcardObj.classList.toggle("is-flipped");
    });
  }

  if (nextCardBtn) {
    nextCardBtn.addEventListener("click", () => {
      cardIndex = (cardIndex + 1) % activeCards.length;
      renderCard();
    });
  }

  if (prevCardBtn) {
    prevCardBtn.addEventListener("click", () => {
      cardIndex = (cardIndex - 1 + activeCards.length) % activeCards.length;
      renderCard();
    });
  }

  if (shuffleCardBtn) {
    shuffleCardBtn.addEventListener("click", () => {
      activeCards.sort(() => Math.random() - 0.5);
      cardIndex = 0;
      renderCard();
    });
  }

  if (masterCardBtn) {
    masterCardBtn.addEventListener("click", () => {
      const current = activeCards[cardIndex];
      masteredSet.add(current.term);
      reviewSet.delete(current.term);
      updateCardStats();
      cardIndex = (cardIndex + 1) % activeCards.length;
      renderCard();
    });
  }

  if (reviewCardBtn) {
    reviewCardBtn.addEventListener("click", () => {
      const current = activeCards[cardIndex];
      reviewSet.add(current.term);
      masteredSet.delete(current.term);
      updateCardStats();
      cardIndex = (cardIndex + 1) % activeCards.length;
      renderCard();
    });
  }

  if (flashcardFilter) {
    flashcardFilter.addEventListener("change", (e) => {
      const cat = e.target.value;
      if (cat === "all") {
        activeCards = [...FLASHCARDS_DATA];
      } else {
        activeCards = FLASHCARDS_DATA.filter(c => c.cat === cat);
      }
      cardIndex = 0;
      renderCard();
    });
  }

  updateCardStats();
  renderCard();

  // =========================================================================
  // 5. LIVE SEARCH ENGINE (Ctrl + K)
  // =========================================================================
  const searchDialog = document.getElementById("search-dialog");
  const searchTrigger = document.getElementById("search-trigger");
  const searchClose = document.getElementById("search-close");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchChips = document.querySelectorAll(".search-chip-btn");

  // Search Index Builder
  const SEARCH_INDEX = [];

  function buildSearchIndex() {
    // 1. Units & Sub-sections
    chapters.forEach(c => {
      const sec = document.getElementById(c.id);
      if (sec) {
        const title = sec.querySelector("h2")?.textContent || c.title;
        const textSnippets = Array.from(sec.querySelectorAll("p, h3, li"))
          .map(el => el.textContent)
          .join(" ")
          .substring(0, 500);
        SEARCH_INDEX.push({
          type: "unit",
          badge: "Curriculum Unit",
          title: title,
          targetId: c.id,
          snippet: textSnippets
        });
      }
    });

    // 2. Glossary Terms
    document.querySelectorAll(".ref-grid .ref-card").forEach((card, idx) => {
      const term = card.querySelector("dt")?.textContent || "";
      const def = card.querySelector("dd")?.textContent || "";
      if (!card.id) card.id = `glossary-term-${idx}`;
      SEARCH_INDEX.push({
        type: "glossary",
        badge: "Glossary",
        title: term,
        targetId: card.id,
        snippet: def
      });
    });

    // 3. Abbreviations
    document.querySelectorAll(".abbrev-grid .abbrev-card").forEach((card, idx) => {
      const short = card.querySelector(".abbrev-short")?.textContent || "";
      const full = card.querySelector(".abbrev-full")?.textContent || "";
      const desc = card.querySelector(".abbrev-desc")?.textContent || "";
      if (!card.id) card.id = `abbrev-item-${idx}`;
      SEARCH_INDEX.push({
        type: "abbrev",
        badge: "Acronym",
        title: `${short} — ${full}`,
        targetId: card.id,
        snippet: desc
      });
    });

    // 4. Keyboard Shortcuts
    document.querySelectorAll(".data-table tbody tr").forEach((row, idx) => {
      const shortcut = row.querySelector("td:first-child")?.textContent?.trim() || "";
      const desc = row.querySelector("td:last-child")?.textContent?.trim() || "";
      if (shortcut.includes("Ctrl") || shortcut.includes("F7")) {
        if (!row.id) row.id = `shortcut-row-${idx}`;
        SEARCH_INDEX.push({
          type: "shortcut",
          badge: "Keyboard Shortcut",
          title: shortcut,
          targetId: row.id,
          snippet: desc
        });
      }
    });
  }

  let activeFilter = "all";

  function highlightMatches(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  function performSearch(query) {
    if (!searchResults) return;
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) {
      searchResults.innerHTML = `<div class="search-empty">Type keywords above to search all 6 units, definitions, acronyms, and shortcut keys...</div>`;
      return;
    }

    const filtered = SEARCH_INDEX.filter(item => {
      if (activeFilter !== "all" && item.type !== activeFilter) return false;
      return item.title.toLowerCase().includes(cleanQuery) || item.snippet.toLowerCase().includes(cleanQuery);
    });

    if (filtered.length === 0) {
      searchResults.innerHTML = `<div class="search-empty">No results found for "<strong>${query}</strong>". Try searching for "ALU", "RAM", "Flowchart", "Scratch", or "PECA".</div>`;
      return;
    }

    searchResults.innerHTML = filtered.slice(0, 15).map(item => `
      <a href="#${item.targetId}" class="search-item" data-target="${item.targetId}">
        <span class="search-item-badge">${item.badge}</span>
        <h4 class="search-item-title">${highlightMatches(item.title, query)}</h4>
        <p class="search-item-desc">${highlightMatches(item.snippet.substring(0, 140) + "…", query)}</p>
      </a>
    `).join("");

    // Hook click to smooth scroll and pulse target
    searchResults.querySelectorAll(".search-item").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        const targetEl = document.getElementById(targetId);
        searchDialog?.close();
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          targetEl.classList.remove("target-highlight");
          void targetEl.offsetWidth; // reflow
          targetEl.classList.add("target-highlight");
        }
      });
    });
  }

  if (searchTrigger && searchDialog) {
    searchTrigger.addEventListener("click", () => {
      if (SEARCH_INDEX.length === 0) buildSearchIndex();
      searchDialog.showModal();
      searchInput?.focus();
    });
  }

  searchClose?.addEventListener("click", () => searchDialog?.close());
  searchDialog?.addEventListener("click", (e) => {
    if (e.target === searchDialog) searchDialog.close();
  });

  searchInput?.addEventListener("input", (e) => {
    performSearch(e.target.value);
  });

  searchChips.forEach(chip => {
    chip.addEventListener("click", () => {
      searchChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.getAttribute("data-filter");
      performSearch(searchInput?.value || "");
    });
  });

  // Global Keyboard Shortcuts (Ctrl+K to Search, Escape to Close)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (searchDialog) {
        if (searchDialog.open) {
          searchDialog.close();
        } else {
          if (SEARCH_INDEX.length === 0) buildSearchIndex();
          searchDialog.showModal();
          searchInput?.focus();
        }
      }
    }
  });

  // =========================================================================
  // 6. MULTI-UNIT STUDENT LAB WORKBOOKS AUTO-SAVER
  // =========================================================================
  const formConfigs = [
    { id: "reflection-form-1", key: "f0undr-book-unit-1-notes", status: "save-status-1" },
    { id: "reflection-form-2", key: "f0undr-book-unit-2-notes", status: "save-status-2" },
    { id: "reflection-form-3", key: "f0undr-book-unit-3-notes", status: "save-status-3" },
    { id: "reflection-form-4", key: "f0undr-book-unit-4-notes", status: "save-status-4" },
    { id: "reflection-form-5", key: "f0undr-book-unit-5-notes", status: "save-status-5" },
    { id: "reflection-form-6", key: "f0undr-book-unit-6-notes", status: "save-status-6" },
    { id: "reflection-form", key: "f0undr-book-ict-chapter-1-notes", status: "save-status" }
  ];

  formConfigs.forEach(({ id, key, status }) => {
    const form = document.getElementById(id);
    const statusEl = document.getElementById(status);
    if (!form) return;

    let saveTimer;

    function getNotes() {
      return Object.fromEntries(new FormData(form).entries());
    }

    function saveNotes(announce = true) {
      try {
        localStorage.setItem(key, JSON.stringify(getNotes()));
        if (announce && statusEl) statusEl.textContent = "Lab notes saved in this browser.";
      } catch (err) {
        if (statusEl) statusEl.textContent = "Browser could not save notes. You can still print or save as PDF.";
      }
    }

    try {
      const saved = JSON.parse(localStorage.getItem(key) || "{}");
      for (const [name, val] of Object.entries(saved)) {
        const field = form.elements.namedItem(name);
        if (field && typeof val === "string") field.value = val;
      }
      if (Object.values(saved).some(v => v) && statusEl) {
        statusEl.textContent = "Your saved lab notes are ready.";
      }
    } catch (e) {
      if (statusEl) statusEl.textContent = "Your lab notes are ready.";
    }

    form.addEventListener("input", () => {
      if (statusEl) statusEl.textContent = "Saving draft…";
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => saveNotes(), 300);
    });

    form.querySelector("[data-save-notes]")?.addEventListener("click", () => {
      window.clearTimeout(saveTimer);
      saveNotes();
    });

    form.querySelector("[data-clear-notes]")?.addEventListener("click", () => {
      if (!window.confirm("Clear your saved notes for this unit? This cannot be undone.")) return;
      form.reset();
      try {
        localStorage.removeItem(key);
        if (statusEl) statusEl.textContent = "Saved notes cleared.";
      } catch (err) {
        if (statusEl) statusEl.textContent = "Could not clear saved notes.";
      }
    });
  });

  // Print buttons
  document.querySelectorAll("[data-print-page]").forEach(btn => {
    btn.addEventListener("click", () => window.print());
  });

  // Table of Contents Dialog
  document.querySelectorAll("[data-open-contents]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (contentsDialog?.showModal) contentsDialog.showModal();
    });
  });

  document.querySelector("[data-close-contents]")?.addEventListener("click", () => contentsDialog?.close());
  contentsDialog?.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => contentsDialog.close());
  });
  contentsDialog?.addEventListener("click", (evt) => {
    if (evt.target === contentsDialog) contentsDialog.close();
  });

  // Smart "Go Back" handler
  document.querySelectorAll("[data-go-back]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.history.length > 1 && document.referrer) {
        window.history.back();
      } else {
        const syllabus = document.getElementById("syllabus-table");
        if (syllabus) {
          syllabus.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });
  });

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();
})();
