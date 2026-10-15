(() => {
  // =========================================================================
  // 1. BESPOKE THEME SWITCHER (Editorial Light -> Warm Sand -> Nordic Midnight -> Obsidian Dark)
  // =========================================================================
  const THEMES = ["light", "sepia", "midnight", "dark"];
  const THEME_LABELS = {
    light: { name: "Editorial Light", icon: "☀️", color: "#fafafc" },
    sepia: { name: "Warm Sand", icon: "📜", color: "#f7f3e8" },
    midnight: { name: "Nordic Midnight", icon: "🌊", color: "#0c1222" },
    dark: { name: "Obsidian Dark", icon: "🌌", color: "#0b0f17" }
  };

  let currentTheme = localStorage.getItem("f0undr-mind-theme") || "light";
  if (!THEMES.includes(currentTheme)) {
    currentTheme = "light";
  }

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) {
      theme = "light";
    }
    if (theme === "light") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem("f0undr-mind-theme", theme);
    currentTheme = theme;

    const iconEl = document.getElementById("theme-icon");
    const labelEl = document.getElementById("theme-name");
    if (iconEl && THEME_LABELS[theme]) iconEl.textContent = THEME_LABELS[theme].icon;
    if (labelEl && THEME_LABELS[theme]) labelEl.textContent = THEME_LABELS[theme].name;

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor && THEME_LABELS[theme]) {
      metaThemeColor.setAttribute("content", THEME_LABELS[theme].color);
    }
  }

  applyTheme(currentTheme);

  document.querySelectorAll("#theme-toggle, [data-theme-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const currentIndex = THEMES.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % THEMES.length;
      const nextTheme = THEMES[nextIndex];
      applyTheme(nextTheme);
      if (typeof showToast === "function") {
        showToast(`Theme: ${THEME_LABELS[nextTheme].name}`, THEME_LABELS[nextTheme].icon);
      }
    });
  });

  // =========================================================================
  // 2. READING PROGRESS & DYNAMIC CHAPTER SCROLL-SPY
  // =========================================================================
  const progress = document.querySelector("#chapter-progress");
  const progressCopy = document.querySelector("#progress-copy");
  const readingLabel = document.querySelector(".reading-label");

  const chapters = [
    { id: "unit-one", title: "Unit 1 · Accelerated Learning" },
    { id: "unit-two", title: "Unit 2 · Memory Architecture & Loci" },
    { id: "unit-three", title: "Unit 3 · Non-Verbal Mind Reading" },
    { id: "unit-four", title: "Unit 4 · Deception Detection" },
    { id: "unit-five", title: "Unit 5 · Persuasion & Influence" },
    { id: "unit-six", title: "Unit 6 · Mental Models & Decisions" },
    { id: "flashcards", title: "Interactive · 3D Flashcards" },
    { id: "glossary", title: "Reference · Master Glossary" }
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
    let activeTitle = "The Art of Mental Mastery";
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

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // =========================================================================
  // 3. TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showToast(message, icon = "✓") {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerHTML = `<span style="color:var(--accent-cyan); font-size:1.1rem; font-weight:900;">${icon}</span> <span>${message}</span>`;
    toast.classList.add("show");
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  // =========================================================================
  // 4. READER CONTROLS: FONT SIZING (A- / A+)
  // =========================================================================
  const fontDecreaseBtn = document.getElementById("font-decrease");
  const fontIncreaseBtn = document.getElementById("font-increase");
  let currentFontScale = parseFloat(localStorage.getItem("f0undr-mind-font-scale")) || 1.0;

  function applyFontScale(scale) {
    currentFontScale = Math.min(Math.max(scale, 0.85), 1.35);
    document.documentElement.style.setProperty("--font-scale", currentFontScale);
    document.querySelectorAll(".reading-column").forEach(el => {
      el.style.fontSize = `calc(1.18rem * ${currentFontScale})`;
      el.style.lineHeight = `${1.85 * (currentFontScale >= 1.2 ? 1.05 : 1)}`;
    });
    localStorage.setItem("f0undr-mind-font-scale", currentFontScale.toFixed(2));
  }
  applyFontScale(currentFontScale);

  if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener("click", () => {
      applyFontScale(currentFontScale - 0.08);
      showToast(`Text size: ${Math.round(currentFontScale * 100)}%`, "🔤");
    });
  }
  if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener("click", () => {
      applyFontScale(currentFontScale + 0.08);
      showToast(`Text size: ${Math.round(currentFontScale * 100)}%`, "🔤");
    });
  }

  // =========================================================================
  // 5. ACCESSIBLE AUDIO NARRATION (Web Speech API)
  // =========================================================================
  let activeAudioBtn = null;

  function stopCurrentAudio() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (activeAudioBtn) {
      activeAudioBtn.classList.remove("playing");
      const icon = activeAudioBtn.querySelector(".audio-icon");
      const text = activeAudioBtn.querySelector(".audio-text");
      if (icon) icon.textContent = "🔊";
      if (text) text.textContent = "Listen to Unit";
      activeAudioBtn = null;
    }
  }

  document.querySelectorAll("[data-unit-audio]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) {
        showToast("Audio narration is not supported by your browser.", "⚠️");
        return;
      }

      if (btn.classList.contains("playing")) {
        stopCurrentAudio();
        showToast("Audio recitation stopped.", "⏹");
        return;
      }

      stopCurrentAudio();

      const unitId = btn.getAttribute("data-unit-audio");
      const unitEl = document.getElementById(unitId);
      if (!unitEl) return;

      const readingCol = unitEl.querySelector(".reading-column");
      if (!readingCol) return;

      const paragraphs = Array.from(readingCol.querySelectorAll("p, li, blockquote"))
        .map(p => p.textContent.trim())
        .filter(t => t.length > 20)
        .slice(0, 12)
        .join(". ");

      if (!paragraphs) return;

      btn.classList.add("playing");
      const icon = btn.querySelector(".audio-icon");
      const text = btn.querySelector(".audio-text");
      if (icon) icon.textContent = "⏹";
      if (text) text.textContent = "Stop Audio";
      activeAudioBtn = btn;

      const utterance = new SpeechSynthesisUtterance(paragraphs);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = "en-US";

      utterance.onend = () => stopCurrentAudio();
      utterance.onerror = () => stopCurrentAudio();

      window.speechSynthesis.speak(utterance);
      const unitName = unitEl.querySelector("h2")?.textContent || "Unit";
      showToast(`Narrating ${unitName}...`, "🔊");
    });
  });

  window.addEventListener("beforeunload", () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  });

  // =========================================================================
  // 6. UNIT COMPLETION TRACKER
  // =========================================================================
  const COMPLETED_UNITS_KEY = "f0undr-mind-completed-units";
  let completedUnits = [];
  try {
    const raw = localStorage.getItem(COMPLETED_UNITS_KEY);
    if (raw) completedUnits = JSON.parse(raw);
  } catch (err) {
    completedUnits = [];
  }

  function updateCompletionButtons() {
    document.querySelectorAll("[data-complete-unit]").forEach(btn => {
      const unitId = btn.getAttribute("data-complete-unit");
      const isDone = completedUnits.includes(unitId);
      const textEl = btn.querySelector(".complete-text");
      if (isDone) {
        btn.classList.add("completed");
        if (textEl) textEl.textContent = "Unit Completed ✓";
      } else {
        btn.classList.remove("completed");
        const unitName = unitId.replace("unit-", "Unit ");
        if (textEl) textEl.textContent = `Mark ${unitName.charAt(0).toUpperCase() + unitName.slice(1)} Complete`;
      }
    });
  }
  updateCompletionButtons();

  document.querySelectorAll("[data-complete-unit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const unitId = btn.getAttribute("data-complete-unit");
      const idx = completedUnits.indexOf(unitId);
      if (idx > -1) {
        completedUnits.splice(idx, 1);
        showToast("Unit marked as incomplete", "↩");
      } else {
        completedUnits.push(unitId);
        showToast("Unit mastery unlocked & completed!", "🎉");
      }
      localStorage.setItem(COMPLETED_UNITS_KEY, JSON.stringify(completedUnits));
      updateCompletionButtons();
    });
  });

  // =========================================================================
  // 7. COPY TACTICAL DRILLS & FRAMEWORKS
  // =========================================================================
  document.querySelectorAll(".copy-framework-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".try-card");
      if (!card) return;
      const title = card.querySelector("h3")?.textContent || "Cognitive Framework";
      const desc = card.querySelector("p")?.textContent || "";
      const quote = card.querySelector("blockquote")?.textContent || "";
      const payload = `🧠 [f0undr Mental Mastery] ${title}\n\n${desc}\n\nCore Directive:\n${quote}\n\n(From: The Art of Mental Mastery by f0undr)`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(payload).then(() => {
          showToast(`Copied "${title}" to clipboard!`, "📋");
        }).catch(() => {
          showToast("Copied framework", "📋");
        });
      } else {
        showToast("Clipboard access unavailable", "⚠️");
      }
    });
  });

  // =========================================================================
  // 8. INTERACTIVE STUDENT LAB WORKBOOK (Auto-saving, Copy & Export)
  // =========================================================================
  const WORKBOOK_KEY = "f0undr-mind-mastery-workbook";
  const workbookTextareas = document.querySelectorAll(".prompt-row textarea");
  const saveStatusEl = document.querySelector(".save-status");
  const exportBtn = document.querySelector("#export-workbook-btn");

  let workbookData = {};
  try {
    const raw = localStorage.getItem(WORKBOOK_KEY);
    if (raw) workbookData = JSON.parse(raw);
  } catch (err) {
    console.warn("Could not parse workbook data", err);
  }

  // Populate saved data
  workbookTextareas.forEach(textarea => {
    const name = textarea.getAttribute("name");
    if (name && workbookData[name]) {
      textarea.value = workbookData[name];
    }

    // Auto-save on input
    textarea.addEventListener("input", () => {
      workbookData[name] = textarea.value;
      localStorage.setItem(WORKBOOK_KEY, JSON.stringify(workbookData));
      if (saveStatusEl) {
        saveStatusEl.textContent = "Saved locally ✓";
        saveStatusEl.style.color = "var(--accent-cyan)";
      }
    });
  });

  // Individual Unit Save Buttons
  document.querySelectorAll(".workbook-save-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.setItem(WORKBOOK_KEY, JSON.stringify(workbookData));
      const unitKey = btn.getAttribute("data-unit-save") || "unit";
      const formattedName = unitKey.replace("unit-", "Unit ");
      showToast(`${formattedName.charAt(0).toUpperCase() + formattedName.slice(1)} notes saved locally!`, "💾");
    });
  });

  // Individual Unit Copy Notes Buttons
  document.querySelectorAll(".workbook-copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const section = btn.closest(".workbook-section");
      if (!section) return;
      const unitKey = btn.getAttribute("data-unit-copy") || "Unit";
      const unitTitle = section.querySelector("h3")?.textContent || unitKey;
      let notesText = `# ${unitTitle} — Notes\n\n`;

      section.querySelectorAll(".prompt-row").forEach(row => {
        const title = row.querySelector("strong")?.textContent || "Prompt";
        const textarea = row.querySelector("textarea");
        const val = textarea && textarea.value.trim() ? textarea.value.trim() : "[No notes entered]";
        notesText += `### ${title}\n${val}\n\n`;
      });

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(notesText).then(() => {
          showToast(`Copied ${unitTitle} notes to clipboard!`, "📋");
        }).catch(() => {
          showToast("Notes copied", "📋");
        });
      } else {
        showToast("Clipboard unavailable", "⚠️");
      }
    });
  });

  // Individual Unit Reset Buttons
  document.querySelectorAll(".workbook-reset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const section = btn.closest(".workbook-section");
      if (!section) return;
      const unitTitle = section.querySelector("h3")?.textContent || "this unit";
      if (confirm(`Are you sure you want to clear your notes for ${unitTitle}?`)) {
        section.querySelectorAll("textarea").forEach(t => {
          const name = t.getAttribute("name");
          if (name) delete workbookData[name];
          t.value = "";
        });
        localStorage.setItem(WORKBOOK_KEY, JSON.stringify(workbookData));
        showToast(`Cleared notes for ${unitTitle}`, "🗑");
      }
    });
  });

  // Global Export All Notes
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      let content = "# The Art of Mental Mastery — Complete Student Workbook\n";
      content += `Generated on: ${new Date().toLocaleString()}\n`;
      content += `Author: f0undr\n\n`;

      workbookTextareas.forEach(textarea => {
        const row = textarea.closest(".prompt-row");
        const title = row ? row.querySelector("strong")?.textContent || textarea.name : textarea.name;
        const val = textarea.value.trim() || "[No entry recorded]";
        content += `### ${title}\n${val}\n\n`;
      });

      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Mental-Mastery-Workbook-Notes.md";
      a.click();
      URL.revokeObjectURL(url);
      showToast("Exported all workbook notes (.md)", "📥");
    });
  });

  // Floating Back to Top Button
  const floatingTopBtn = document.getElementById("floating-top-btn");
  if (floatingTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 380) {
        floatingTopBtn.classList.add("visible");
      } else {
        floatingTopBtn.classList.remove("visible");
      }
    }, { passive: true });
  }

  // =========================================================================
  // 5. INTERACTIVE SELF-ASSESSMENT QUIZZES (Units 1 to 6)
  // =========================================================================
  document.querySelectorAll(".quiz-section").forEach(section => {
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
      const correctIndex = parseInt(card.getAttribute("data-answer"), 10);
      const explanationEl = card.querySelector(".quiz-explanation");
      const optionBtns = card.querySelectorAll(".quiz-option-btn");

      optionBtns.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
          if (card.classList.contains("answered")) return;
          card.classList.add("answered");
          answeredCount++;

          optionBtns.forEach(b => (b.disabled = true));

          if (idx === correctIndex) {
            btn.classList.add("selected-correct");
            card.classList.add("answered-correct");
            correctCount++;
            if (explanationEl) {
              explanationEl.classList.add("show", "correct");
            }
          } else {
            btn.classList.add("selected-wrong");
            card.classList.add("answered-wrong");
            if (optionBtns[correctIndex]) {
              optionBtns[correctIndex].classList.add("is-answer");
            }
            if (explanationEl) {
              explanationEl.classList.add("show", "wrong");
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
          card.classList.remove("answered", "answered-correct", "answered-wrong");
          card.querySelectorAll(".quiz-option-btn").forEach(btn => {
            btn.disabled = false;
            btn.classList.remove("selected-correct", "selected-wrong", "is-answer");
          });
          const exp = card.querySelector(".quiz-explanation");
          if (exp) exp.classList.remove("show", "correct", "wrong");
        });
        if (scoreBadge) {
          scoreBadge.textContent = `Score: 0 / ${cards.length} (0%)`;
        }
      });
    }
  });

  // =========================================================================
  // 6. 3D INTERACTIVE FLASHCARDS ENGINE
  // =========================================================================
  const FLASHCARDS = [
    // Unit 1: Accelerated Learning
    {
      unit: "unit1",
      category: "Accelerated Learning",
      term: "Long-Term Potentiation (LTP)",
      desc: "A persistent strengthening of synapses based on recent patterns of activity. High-frequency stimulation produces a long-lasting increase in signal transmission between two neurons."
    },
    {
      unit: "unit1",
      category: "Accelerated Learning",
      term: "The Feynman Technique",
      desc: "A 4-step mental heuristic: 1) Pick a concept, 2) Explain it to a 10-year-old in plain language, 3) Identify knowledge gaps where you resort to jargon, 4) Refine, simplify, and anchor with an analogy."
    },
    {
      unit: "unit1",
      category: "Accelerated Learning",
      term: "Ultralearning (Directness)",
      desc: "The principle of learning by doing the thing you want to become good at directly, rather than relying on abstract, passive classroom proxies or easy multiple-choice exercises."
    },
    {
      unit: "unit1",
      category: "Accelerated Learning",
      term: "Subvocalization Elimination",
      desc: "Overcoming the internal vocalization of each word in your mind while reading by expanding peripheral eye span and using a visual pacer, unlocking 700+ words per minute."
    },
    {
      unit: "unit1",
      category: "Accelerated Learning",
      term: "Interleaving Effect",
      desc: "Mixing distinct but related topics or problem types during study sessions instead of block practicing one skill repeatedly, dramatically boosting transfer to novel exams and real situations."
    },

    // Unit 2: Memory Architecture & Loci
    {
      unit: "unit2",
      category: "Memory Palace",
      term: "Method of Loci",
      desc: "The ancient Greek and Roman mnemonic system of visualizing a familiar architectural layout and placing exaggerated, bizarre mental imagery at specific fixed stations (loci) along a clockwise path."
    },
    {
      unit: "unit2",
      category: "Memory Palace",
      term: "The Major System",
      desc: "A phonetic number-memorization code where digits (0–9) map to consonant sounds (e.g., 1 = T/D, 2 = N, 3 = M, 4 = R, 5 = L, etc.), converting raw numbers into unforgettable vivid nouns."
    },
    {
      unit: "unit2",
      category: "Memory Palace",
      term: "The PAO System",
      desc: "Person-Action-Object: Compresses 6 digits or 3 playing cards into a single scene (e.g., Einstein [Person] juggling [Action] blazing pineapples [Object]) at one palace station."
    },
    {
      unit: "unit2",
      category: "Memory Palace",
      term: "Dual Coding Theory",
      desc: "Paivio's cognitive theory stating that memory is exponentially stronger when an idea is encoded both verbally/semantically and visually/spatially at the same time."
    },
    {
      unit: "unit2",
      category: "Memory Palace",
      term: "Sensory Exaggeration (B.A.K.E.R.)",
      desc: "Making memory anchors Bizarre, Animated, Kinetic, Emotional, and Ridiculous. The brain prioritizes novelty and threat/humor over sterile, dull facts."
    },

    // Unit 3: Non-Verbal Mind Reading
    {
      unit: "unit3",
      category: "Body Language",
      term: "Microexpression",
      desc: "An involuntary, fleeting facial expression lasting only 1/25th to 1/5th of a second that reveals someone's true, suppressed emotion before the conscious neocortex can mask it."
    },
    {
      unit: "unit3",
      category: "Body Language",
      term: "Limbic Inversion (Navarro Rule)",
      desc: "The further a body part is from the brain, the harder it is to fake. Feet and legs reflect unfiltered survival reflexes (honesty), while the face is socialized and deceptively rehearsed."
    },
    {
      unit: "unit3",
      category: "Body Language",
      term: "Ventral Denial & Fronting",
      desc: "Ventral fronting (facing torso directly toward someone) signals trust and openness. Ventral denial (blading torso or turning hips toward an exit) reveals subconscious discomfort or a desire to flee."
    },
    {
      unit: "unit3",
      category: "Body Language",
      term: "Suprasternal Notch Touching",
      desc: "Placing fingers on the dimple at the base of the throat. A classic high-stress pacifying reflex used to protect the vulnerable jugular vein and stimulate the vagus nerve to reduce heart rate."
    },
    {
      unit: "unit3",
      category: "Body Language",
      term: "Duchenne Smile",
      desc: "A genuine smile of true joy. Requires both the zygomatic major (pulling mouth corners up) AND the orbicularis oculi (crinkling crow's feet around eyes). Fake smiles only move the mouth."
    },
    {
      unit: "unit3",
      category: "Body Language",
      term: "Asymmetric Smirk (Contempt)",
      desc: "The only universally recognized one-sided facial microexpression (AU R12/L14). Indicates feelings of moral superiority, condescension, or disrespect. High predictor of relationship divorce."
    },

    // Unit 4: Deception Detection & Profiling
    {
      unit: "unit4",
      category: "Deception Detection",
      term: "Cognitive Load of Deception",
      desc: "Lying requires managing the fabrication, suppressing the truth, monitoring the listener's suspicion, and controlling non-verbals. Asking reverse-chronology questions collapses this mental bandwidth."
    },
    {
      unit: "unit4",
      category: "Deception Detection",
      term: "Linguistic Distancing",
      desc: "Deceptive speakers unconsciously drop first-person pronouns ('I', 'me', 'my') and use passive or depersonalized phrasing ('that woman', 'mistakes were made') to psychologically dissociate from guilt."
    },
    {
      unit: "unit4",
      category: "Deception Detection",
      term: "Statement Symmetry (SCAN)",
      desc: "Truthful narratives follow a natural ratio: 25% Prologue, 50% Core Incident, 25% Epilogue/Aftermath. Deceptive stories over-elaborate the prologue (70%) and rush through the critical incident (10%)."
    },
    {
      unit: "unit4",
      category: "Deception Detection",
      term: "Barnum / Forer Effect",
      desc: "The psychological bias where individuals believe vague, universally applicable personality statements ('You have a great need for other people to like you') are uncannily specific to them."
    },
    {
      unit: "unit4",
      category: "Deception Detection",
      term: "Rainbow Ruse",
      desc: "A cold reading technique that simultaneously credits a person with a personality trait and its exact opposite ('You are generally warm and patient, but when pushed too far, you can be fiercely decisive')."
    },

    // Unit 5: Persuasion & Influence
    {
      unit: "unit5",
      category: "Persuasion",
      term: "Rule of Reciprocity",
      desc: "The human compulsion to repay what another person has provided. Initiating with an unexpected, customized favor creates an urgent subconscious psychological debt."
    },
    {
      unit: "unit5",
      category: "Persuasion",
      term: "Door-in-the-Face Technique",
      desc: "Making an extreme initial request that you know will be rejected, followed immediately by your actual desired request. The target perceives this as a concession and feels compelled to concede too."
    },
    {
      unit: "unit5",
      category: "Persuasion",
      term: "Foot-in-the-Door Phenomenon",
      desc: "Securing compliance for a modest, trivial initial request, which shifts the subject's self-image. Subsequent, much larger requests aligned with that new self-image are accepted at 3x higher rates."
    },
    {
      unit: "unit5",
      category: "Persuasion",
      term: "Anchoring Bias",
      desc: "The cognitive tendency to disproportionately rely on the first piece of information encountered when making decisions (e.g., initial price quote anchors the perceived value of everything following)."
    },
    {
      unit: "unit5",
      category: "Persuasion",
      term: "Gray Rock Defense",
      desc: "A psychological self-defense tactic against manipulative, toxic, or narcissistic personalities: becoming unreactive, bland, and emotionally unresponsive like an ordinary gray rock, starving them of drama."
    },

    // Unit 6: Mental Models & Decisions
    {
      unit: "unit6",
      category: "Mental Models",
      term: "First Principles Thinking",
      desc: "Boiling down a problem to its most fundamental physical, undeniable truths and reasoning up from there, rather than reasoning by analogy and copying what others do."
    },
    {
      unit: "unit6",
      category: "Mental Models",
      term: "Inversion ('Invert, Always Invert')",
      desc: "Carl Jacobi & Charlie Munger's technique of solving problems backwards. Instead of asking 'How do I succeed?', ask 'What would guarantee failure?' and ruthlessly eliminate those failure paths."
    },
    {
      unit: "unit6",
      category: "Mental Models",
      term: "Second-Order Thinking",
      desc: "Asking 'And then what?' Beyond immediate first-order payoffs, evaluate the downstream systemic consequences and delayed reactions that often reverse the initial benefit."
    },
    {
      unit: "unit6",
      category: "Mental Models",
      term: "Hanlon’s Razor",
      desc: "'Never attribute to malice that which is adequately explained by stupidity or carelessness.' Eliminates paranoid overthinking in interpersonal negotiations and social observation."
    },
    {
      unit: "unit6",
      category: "Mental Models",
      term: "Stoic Dichotomy of Control",
      desc: "Epictetus' framework dividing reality into things within our control (beliefs, efforts, reactions) and things outside our control (others' actions, outcomes, reputations). Peace is total focus on the former."
    }
  ];

  let currentCardIndex = 0;
  let filteredCards = [...FLASHCARDS];
  let masteredCards = new Set(JSON.parse(localStorage.getItem("f0undr-mastered-cards") || "[]"));
  let reviewCards = new Set(JSON.parse(localStorage.getItem("f0undr-review-cards") || "[]"));

  const flashcardObj = document.querySelector("#flashcard-obj");
  const flashcardTag = document.querySelector("#flashcard-tag");
  const flashcardTerm = document.querySelector("#flashcard-term");
  const flashcardDesc = document.querySelector("#flashcard-desc");
  const filterSelect = document.querySelector("#flashcard-filter");
  const masteredCountEl = document.querySelector("#stat-mastered-count");
  const reviewCountEl = document.querySelector("#stat-review-count");
  const nextBtn = document.querySelector("#fc-next-btn");
  const prevBtn = document.querySelector("#fc-prev-btn");
  const masterBtn = document.querySelector("#fc-master-btn");
  const reviewBtn = document.querySelector("#fc-review-btn");

  function saveFlashcardStats() {
    localStorage.setItem("f0undr-mastered-cards", JSON.stringify([...masteredCards]));
    localStorage.setItem("f0undr-review-cards", JSON.stringify([...reviewCards]));
    if (masteredCountEl) masteredCountEl.textContent = masteredCards.size;
    if (reviewCountEl) reviewCountEl.textContent = reviewCards.size;
  }

  function renderCard() {
    if (!flashcardObj || filteredCards.length === 0) return;
    const card = filteredCards[currentCardIndex];
    flashcardObj.classList.remove("is-flipped");

    setTimeout(() => {
      if (flashcardTag) flashcardTag.textContent = `${card.category} · Card ${currentCardIndex + 1} of ${filteredCards.length}`;
      if (flashcardTerm) flashcardTerm.textContent = card.term;
      if (flashcardDesc) flashcardDesc.textContent = card.desc;
    }, 120);
  }

  if (flashcardObj) {
    flashcardObj.addEventListener("click", () => {
      flashcardObj.classList.toggle("is-flipped");
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentCardIndex = (currentCardIndex + 1) % filteredCards.length;
      renderCard();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentCardIndex = (currentCardIndex - 1 + filteredCards.length) % filteredCards.length;
      renderCard();
    });
  }

  if (masterBtn) {
    masterBtn.addEventListener("click", e => {
      e.stopPropagation();
      const card = filteredCards[currentCardIndex];
      masteredCards.add(card.term);
      reviewCards.delete(card.term);
      saveFlashcardStats();
      currentCardIndex = (currentCardIndex + 1) % filteredCards.length;
      renderCard();
    });
  }

  if (reviewBtn) {
    reviewBtn.addEventListener("click", e => {
      e.stopPropagation();
      const card = filteredCards[currentCardIndex];
      reviewCards.add(card.term);
      masteredCards.delete(card.term);
      saveFlashcardStats();
      currentCardIndex = (currentCardIndex + 1) % filteredCards.length;
      renderCard();
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      const val = filterSelect.value;
      if (val === "all") {
        filteredCards = [...FLASHCARDS];
      } else {
        filteredCards = FLASHCARDS.filter(c => c.unit === val);
      }
      currentCardIndex = 0;
      renderCard();
    });
  }

  saveFlashcardStats();
  renderCard();

  // =========================================================================
  // 7. IN-BOOK LIVE SEARCH ENGINE (Ctrl + K)
  // =========================================================================
  const SEARCH_INDEX = [
    {
      unit: "Unit 1",
      badge: "Ultralearning",
      title: "Neuroplasticity & Synaptic Pruning",
      desc: "The physiological mechanism of learning: synaptic plasticity, LTP, dendrite sprouting, and myelin insulation for 100x signal velocity.",
      anchor: "unit-one"
    },
    {
      unit: "Unit 1",
      badge: "Learning",
      title: "The Feynman Technique",
      desc: "4-step protocol for true conceptual mastery and cutting technical jargon by teaching to a child.",
      anchor: "feynman-technique"
    },
    {
      unit: "Unit 1",
      badge: "Ultralearning",
      title: "Active Recall & The Forgetting Curve",
      desc: "Why passive re-reading is an illusion of competence; Ebbinghaus decay curve and optimal spaced intervals (1, 3, 7, 30 days).",
      anchor: "active-recall"
    },
    {
      unit: "Unit 1",
      badge: "Speed Reading",
      title: "Subvocalization Reduction & Pacing",
      desc: "Eliminating the inner voice bottleneck, training peripheral sight span, and tripling reading speed without comprehension loss.",
      anchor: "speed-reading"
    },
    {
      unit: "Unit 2",
      badge: "Memory",
      title: "Sherlockian Method of Loci (Mind Palace)",
      desc: "Architectural blueprint of spatial loci, clockwise route mapping, and anchoring memories to permanent physical rooms.",
      anchor: "unit-two"
    },
    {
      unit: "Unit 2",
      badge: "Memory",
      title: "The Major System (0 to 9 Phonetic Code)",
      desc: "Translating abstract numbers into consonants and unforgettable imagery for phone numbers, dates, and historical timelines.",
      anchor: "major-system"
    },
    {
      unit: "Unit 2",
      badge: "Memory",
      title: "The PAO Framework (Person-Action-Object)",
      desc: "Advanced memory champion system: compressing 6 digits or 3 cards into a single memorable vignette.",
      anchor: "pao-system"
    },
    {
      unit: "Unit 3",
      badge: "Mind Reading",
      title: "Paul Ekman's 7 Universal Microexpressions",
      desc: "Anger, Fear, Disgust, Contempt, Joy, Sadness, Surprise: Facial Action Coding System (FACS) involuntary muscle leaks.",
      anchor: "unit-three"
    },
    {
      unit: "Unit 3",
      badge: "Body Language",
      title: "FBI Honesty Inversion (Navarro Rule)",
      desc: "Why feet and legs speak absolute truth while faces lie. Baseline calibration, ventral denial, and pacifying neck touches.",
      anchor: "navarro-rule"
    },
    {
      unit: "Unit 3",
      badge: "Body Language",
      title: "Ocular Cues, Pupil Dilation & Blink Spikes",
      desc: "Reading autonomic nervous system arousal, gaze avoidance vs. aggressive stare-down, and baseline blink frequency shifts.",
      anchor: "ocular-cues"
    },
    {
      unit: "Unit 4",
      badge: "Lie Detection",
      title: "Cognitive Load of Deception",
      desc: "Why deception drains working memory, and using reverse-chronological questioning to expose fabricated accounts.",
      anchor: "unit-four"
    },
    {
      unit: "Unit 4",
      badge: "Lie Detection",
      title: "Linguistic Leakage & Statement Analysis",
      desc: "Pronoun dropping, passive voice distancing, narrative asymmetry, and tension leaks in deceptive confessions.",
      anchor: "statement-analysis"
    },
    {
      unit: "Unit 4",
      badge: "Mentalism",
      title: "Cold Reading & The Barnum Effect",
      desc: "How mentalists appear to read minds using universal truisms, rainbow ruses, flattering ambiguities, and subtle elicitation.",
      anchor: "cold-reading"
    },
    {
      unit: "Unit 5",
      badge: "Influence",
      title: "Robert Cialdini's 7 Principles of Persuasion",
      desc: "Reciprocity, Scarcity, Authority, Consistency, Liking, Social Proof, and Unity: Ethical compliance levers and defensive immunity.",
      anchor: "unit-five"
    },
    {
      unit: "Unit 5",
      badge: "Influence",
      title: "Framing & Psychological Anchoring",
      desc: "Kahneman & Tversky's System 1 and System 2 heuristics; how reference points dictate value and agreement.",
      anchor: "framing-anchoring"
    },
    {
      unit: "Unit 5",
      badge: "Psychology Shield",
      title: "Dark Psychology Defense & Gray Rocking",
      desc: "Identifying gaslighting, love bombing, and manipulative guilt-traps; emotional detachment and frame control.",
      anchor: "dark-psychology"
    },
    {
      unit: "Unit 6",
      badge: "Mental Models",
      title: "First Principles Thinking (Musk & Aristotle)",
      desc: "Deconstructing assumptions to bedrock physics and building innovative solutions from pure fundamental truths.",
      anchor: "unit-six"
    },
    {
      unit: "Unit 6",
      badge: "Mental Models",
      title: "Inversion: Solving Backwards (Munger & Jacobi)",
      desc: "Identifying how to guarantee catastrophe, systematically eradicating failure modes to let success emerge naturally.",
      anchor: "inversion-principle"
    },
    {
      unit: "Unit 6",
      badge: "Mental Models",
      title: "Second-Order Thinking & Cognitive Razors",
      desc: "Evaluating cascading downstream consequences ('And then what?') alongside Occam's and Hanlon's Razors.",
      anchor: "second-order"
    }
  ];

  const searchDialog = document.querySelector("#search-dialog");
  const searchTriggerBtn = document.querySelector("#search-trigger");
  const searchCloseBtn = document.querySelector("#search-close");
  const searchInput = document.querySelector("#search-input");
  const searchResultsList = document.querySelector("#search-results");
  const searchChips = document.querySelectorAll(".search-chip-btn");

  let activeChip = "all";

  function openSearch() {
    if (searchDialog) {
      searchDialog.showModal();
      if (searchInput) {
        searchInput.focus();
        renderSearchResults(searchInput.value.trim());
      }
    }
  }

  function closeSearch() {
    if (searchDialog) searchDialog.close();
  }

  function highlightMatches(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  function renderSearchResults(query = "") {
    if (!searchResultsList) return;
    const cleanQuery = query.toLowerCase();

    const matches = SEARCH_INDEX.filter(item => {
      const matchChip = activeChip === "all" || item.unit.toLowerCase().includes(activeChip) || item.badge.toLowerCase().includes(activeChip);
      const matchText = !cleanQuery || item.title.toLowerCase().includes(cleanQuery) || item.desc.toLowerCase().includes(cleanQuery) || item.badge.toLowerCase().includes(cleanQuery);
      return matchChip && matchText;
    });

    if (matches.length === 0) {
      searchResultsList.innerHTML = `<div class="search-empty">No matching cognitive concepts found for "${query}". Try searching "Palace", "Ekman", "Feynman", or "Inversion".</div>`;
      return;
    }

    searchResultsList.innerHTML = matches
      .map(m => {
        return `
        <a class="search-item" href="#${m.anchor}">
          <span class="search-item-badge">${m.unit} · ${m.badge}</span>
          <h4 class="search-item-title">${highlightMatches(m.title, query)}</h4>
          <p class="search-item-desc">${highlightMatches(m.desc, query)}</p>
        </a>
      `;
      })
      .join("");

    searchResultsList.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => closeSearch());
    });
  }

  if (searchTriggerBtn) searchTriggerBtn.addEventListener("click", openSearch);
  if (searchCloseBtn) searchCloseBtn.addEventListener("click", closeSearch);
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      renderSearchResults(e.target.value.trim());
    });
  }

  searchChips.forEach(chip => {
    chip.addEventListener("click", () => {
      searchChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeChip = chip.getAttribute("data-filter") || "all";
      renderSearchResults(searchInput ? searchInput.value.trim() : "");
    });
  });

  // Hotkey listener (Ctrl + K or Cmd + K)
  window.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape") {
      if (searchDialog && searchDialog.open) closeSearch();
    }
  });

  // Print button
  document.querySelectorAll("[data-print-book]").forEach(btn => {
    btn.addEventListener("click", () => window.print());
  });
})();
