/**
 * f0undr Urdu e-Book — Interactive Pedagogical & Literary Engine
 * Comprehensive JavaScript for FBISE Grade 7 Urdu Curriculum
 */

(() => {
  'use strict';

  // =========================================================================
  // 1. THEME SWITCHER (ورقِ قدیم -> شبستان -> اجلا سفید)
  // =========================================================================
  const THEMES = ['parchment', 'dark', 'clean'];
  const THEME_LABELS = {
    parchment: { name: 'ورقِ قدیم', icon: '📜' },
    dark: { name: 'شبستان', icon: '🌙' },
    clean: { name: 'اجلا سفید', icon: '☀️' }
  };

  let currentTheme = localStorage.getItem('f0undr-urdu-theme') || 'parchment';

  function applyTheme(theme) {
    if (theme === 'parchment') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('f0undr-urdu-theme', theme);
    currentTheme = theme;

    const iconEl = document.getElementById('theme-icon');
    const labelEl = document.getElementById('theme-label');
    if (iconEl) iconEl.textContent = THEME_LABELS[theme].icon;
    if (labelEl) labelEl.textContent = THEME_LABELS[theme].name;
  }

  applyTheme(currentTheme);

  document.querySelectorAll('#theme-toggle, [data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextIdx = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
      applyTheme(THEMES[nextIdx]);
    });
  });

  // =========================================================================
  // 2. TEXT SIZE CONTROLLER (چھوٹا / معیاری / بڑا)
  // =========================================================================
  const FONT_SIZES = ['1.15rem', '1.28rem', '1.45rem'];
  let currentSizeIdx = parseInt(localStorage.getItem('f0undr-urdu-fontsize') || '1', 10);

  function applyFontSize(idx) {
    if (idx < 0) idx = 0;
    if (idx >= FONT_SIZES.length) idx = FONT_SIZES.length - 1;
    document.documentElement.style.setProperty('--reading-font-size', FONT_SIZES[idx]);
    localStorage.setItem('f0undr-urdu-fontsize', idx);
    currentSizeIdx = idx;
  }

  applyFontSize(currentSizeIdx);

  const fontIncreaseBtn = document.getElementById('font-increase');
  const fontDecreaseBtn = document.getElementById('font-decrease');
  if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener('click', () => applyFontSize(currentSizeIdx + 1));
  }
  if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener('click', () => applyFontSize(currentSizeIdx - 1));
  }

  // =========================================================================
  // 3. UNIT NAVIGATION & DUAL-MODE (Single Unit vs Full Book)
  // =========================================================================
  const units = [
    { id: 'dua', num: 'افتتاحیہ', title: 'مناجاتِ سحر', genre: 'مناجات و بندگی', pageImg: 'assets/book_images/dua_page.png' },
    { id: 'unit-1', num: '۱', title: 'حمدِ باری تعالیٰ', genre: 'عرفانِ الٰہی', pageImg: 'assets/book_images/unit1_hamd_page.png' },
    { id: 'unit-2', num: '۲', title: 'نعتِ رسولِ مقبولﷺ', genre: 'مدحتِ نبویﷺ', pageImg: 'assets/book_images/unit2_naat_page.png' },
    { id: 'unit-3', num: '۳', title: 'طبِ نبویﷺ اور ہماری صحت', genre: 'اسلامی و سائنسی حکمت', pageImg: 'assets/book_images/unit3_tib_e_nabwi_page.png' },
    { id: 'unit-4', num: '۴', title: 'بابائے اردو مولوی عبدالحق', genre: 'معمارِ زبان و ادب', pageImg: 'assets/book_images/unit4_baba_e_urdu_page.png' },
    { id: 'unit-5', num: '۵', title: 'نغمۂ برسات', genre: 'فطری شاعری', pageImg: 'assets/book_images/unit5_barsat_page.png' },
    { id: 'unit-6', num: '۶', title: 'نگارستانِ وطن (پاکستان کی سیر)', genre: 'تمدنی و جغرافیائی سفرنامہ', pageImg: 'assets/book_images/unit6_pakistan_sair_page.png' },
    { id: 'unit-7', num: '۷', title: 'نشانِ حیدر — تمغۂ شجاعت', genre: 'عظمتِ شجاعت و حبِ وطن', pageImg: 'assets/book_images/unit7_nishan_e_haider_page.png' },
    { id: 'unit-8', num: '۸', title: 'ملی نغمہ (پاسبانانِ وطن)', genre: 'ترانۂ وحدت و وفاداری', pageImg: 'assets/book_images/unit8_milli_naghma_page.png' },
    { id: 'unit-9', num: '۹', title: 'سلطان صلاح الدین ایوبی', genre: 'عہد ساز سپہ سالار و فاتح', pageImg: 'assets/book_images/unit9_salahuddin_page.png' },
    { id: 'unit-10', num: '۱۰', title: 'قدرتی آفات اور سائنسی تدابیر', genre: 'شہری دفاع و ہنگامی شعور', pageImg: 'assets/book_images/unit10_qudrati_aafat_page.png' },
    { id: 'unit-11', num: '۱۱', title: 'حضرت ابراہیم علیہ السلام', genre: 'عزمِ توحید و تسلیم و رضا', pageImg: 'assets/book_images/unit11_hazrat_ibrahim_page.png' },
    { id: 'unit-12', num: '۱۲', title: 'انفارمیشن ٹیکنالوجی اور عصرِ حاضر', genre: 'جدید سائنسی و ڈیجیٹل انقلاب', pageImg: 'assets/book_images/unit12_it_page.png' },
    { id: 'unit-13', num: '۱۳', title: 'ہلالِ احمر (Red Crescent)', genre: 'بے لوث خدمتِ خلق کا ادارہ', pageImg: 'assets/book_images/unit13_hilal_e_ahmar_page.png' },
    { id: 'unit-14', num: '۱۴', title: 'ایک بادشاہ کی انوکھی تمنا', genre: 'درسِ قناعت و اخلاقی تمثیل', pageImg: 'assets/book_images/unit14_badshah_khwahish_page.png' },
    { id: 'unit-15', num: '۱۵', title: 'فکرِ اقبال اور نوجوان', genre: 'خودی و شاہین کا استعارہ', pageImg: 'assets/book_images/unit15_iqbal_naujawan_page.png' },
    { id: 'unit-16', num: '۱۶', title: 'مردِ مسلمان (کلامِ اقبال)', genre: 'اوصافِ مومن کا آئینہ دار کلام', pageImg: 'assets/book_images/unit16_marde_musalman_page.png' },
    { id: 'unit-17', num: '۱۷', title: 'گلشنِ دو روز (حقیقتِ حیات)', genre: 'اخلاقِ حسنہ و حقیقتِ کائنات', pageImg: 'assets/book_images/unit17_gulshan_do_roz_page.png' },
    { id: 'unit-18', num: '۱۸', title: 'رکشے والا (عظمتِ محنت)', genre: 'تقدیسِ مشقت و رزقِ حلال', pageImg: 'assets/book_images/unit18_rikshewala_page.png' },
    { id: 'unit-19', num: '۱۹', title: 'پرانی موٹر (سید ضمیر جعفری)', genre: 'شگفتہ کلامی و لطیف مزاح', pageImg: 'assets/book_images/unit19_purani_motor_page.png' },
    { id: 'unit-20', num: '۲۰', title: 'شہری شعور اور ٹریفک کے قوانین', genre: 'قانون کی پاسداری و اجتماعی تحفظ', pageImg: 'assets/book_images/unit20_traffic_rules_page.png' }
  ];

  let activeUnitIndex = 0;
  let isContinuousMode = false;

  const substripUnitEl = document.getElementById('active-unit-label');
  const viewModeToggleBtn = document.getElementById('view-mode-toggle');
  const unitArticles = document.querySelectorAll('.unit-article');
  const unitPills = document.querySelectorAll('.unit-pill');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function showUnit(index, scroll = true) {
    if (index < 0) index = 0;
    if (index >= units.length) index = units.length - 1;
    activeUnitIndex = index;
    const currentUnit = units[index];

    if (!isContinuousMode) {
      unitArticles.forEach((art) => {
        if (art.id === currentUnit.id) {
          art.style.display = 'block';
        } else {
          art.style.display = 'none';
        }
      });
    }

    // Update Pills and Drawer Links
    unitPills.forEach(pill => {
      if (pill.getAttribute('data-unit-id') === currentUnit.id) {
        pill.classList.add('active');
        pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        pill.classList.remove('active');
      }
    });

    drawerLinks.forEach(link => {
      if (link.getAttribute('data-unit-id') === currentUnit.id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Substrip Label
    if (substripUnitEl) {
      substripUnitEl.textContent = `سبق نمبر ${currentUnit.num}: ${currentUnit.title} (${currentUnit.genre})`;
    }

    // Update bottom pager buttons
    const prevBtn = document.getElementById('global-prev-unit');
    const nextBtn = document.getElementById('global-next-unit');
    if (prevBtn) {
      prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
      if (index > 0) prevBtn.querySelector('.pager-title').textContent = units[index - 1].title;
    }
    if (nextBtn) {
      nextBtn.style.visibility = index < units.length - 1 ? 'visible' : 'hidden';
      if (index < units.length - 1) nextBtn.querySelector('.pager-title').textContent = units[index + 1].title;
    }

    if (scroll) {
      const targetEl = document.getElementById(currentUnit.id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    history.replaceState(null, '', `#${currentUnit.id}`);
  }

  // Handle URL hash on load
  const initialHash = window.location.hash.replace('#', '');
  const foundIdx = units.findIndex(u => u.id === initialHash);
  if (foundIdx !== -1) {
    showUnit(foundIdx, false);
  } else {
    showUnit(0, false);
  }

  // Toggle Continuous vs Single-Unit Mode
  if (viewModeToggleBtn) {
    viewModeToggleBtn.addEventListener('click', () => {
      isContinuousMode = !isContinuousMode;
      if (isContinuousMode) {
        unitArticles.forEach(art => art.style.display = 'block');
        viewModeToggleBtn.innerHTML = `<span>📑</span> یونٹ بہ یونٹ مطالعہ`;
        viewModeToggleBtn.classList.add('btn-primary');
      } else {
        viewModeToggleBtn.innerHTML = `<span>📖</span> مکمل نصاب مسلسل دیکھیں`;
        viewModeToggleBtn.classList.remove('btn-primary');
        showUnit(activeUnitIndex, true);
      }
    });
  }

  // Bottom Pagers
  const prevBtn = document.getElementById('global-prev-unit');
  const nextBtn = document.getElementById('global-next-unit');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => showUnit(activeUnitIndex - 1, true));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => showUnit(activeUnitIndex + 1, true));
  }

  // Unit Pills Click
  unitPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const id = pill.getAttribute('data-unit-id');
      const idx = units.findIndex(u => u.id === id);
      if (idx !== -1) showUnit(idx, true);
    });
  });

  // Drawer Open/Close & Selection
  const drawerOverlay = document.getElementById('chapter-drawer-overlay');
  const drawerTrigger = document.getElementById('drawer-trigger');
  const drawerCloseBtn = document.getElementById('drawer-close');

  function toggleDrawer(open) {
    if (drawerOverlay) {
      drawerOverlay.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }

  if (drawerTrigger) drawerTrigger.addEventListener('click', () => toggleDrawer(true));
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', () => toggleDrawer(false));
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) toggleDrawer(false);
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-unit-id');
      const idx = units.findIndex(u => u.id === id);
      if (idx !== -1) {
        showUnit(idx, true);
        toggleDrawer(false);
      }
    });
  });

  // Filter Drawer Items
  const drawerSearchInput = document.getElementById('drawer-search-input');
  if (drawerSearchInput) {
    drawerSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.drawer-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'block' : 'none';
      });
    });
  }

  // =========================================================================
  // 4. READING PROGRESS & SCROLL SPY
  // =========================================================================
  const progressFill = document.getElementById('reading-progress-fill');
  const progressPercentText = document.getElementById('progress-percent-text');

  function updateReadingProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressPercentText) progressPercentText.textContent = `${percent}% مطالعہ`;

    if (isContinuousMode) {
      const scrollPos = window.scrollY + 250;
      for (let i = 0; i < units.length; i++) {
        const el = document.getElementById(units[i].id);
        if (el && el.offsetTop <= scrollPos) {
          activeUnitIndex = i;
          if (substripUnitEl) {
            substripUnitEl.textContent = `سبق نمبر ${units[i].num}: ${units[i].title} (${units[i].genre})`;
          }
        }
      }
    }
  }

  window.addEventListener('scroll', updateReadingProgress, { passive: true });

  // =========================================================================
  // 5. URDU SPEECH AUDIO SYNTHESIZER (صوتی قرأت)
  // =========================================================================
  let synth = window.speechSynthesis;
  let activeUtterance = null;
  let isSpeaking = false;
  const audioToggleBtn = document.getElementById('global-audio-toggle');

  function getUrduVoice() {
    if (!synth) return null;
    const voices = synth.getVoices();
    // Search for urdu voices first
    let voice = voices.find(v => v.lang.startsWith('ur'));
    if (!voice) voice = voices.find(v => v.lang.startsWith('ar')); // Arabic fallback
    return voice;
  }

  function readAloud(text) {
    if (!synth) {
      alert('معذرت! آپ کا براؤزر صوتی قرأت (Speech Synthesis) کو سپورٹ نہیں کرتا۔');
      return;
    }
    stopAudio();
    const utterance = new SpeechSynthesisUtterance(text);
    const urduVoice = getUrduVoice();
    if (urduVoice) utterance.voice = urduVoice;
    utterance.lang = urduVoice ? urduVoice.lang : 'ur-PK';
    utterance.rate = 0.88; // Slightly deliberate for clear Urdu diction

    utterance.onend = () => {
      isSpeaking = false;
      if (audioToggleBtn) {
        audioToggleBtn.innerHTML = `<span>🔊</span> صوتی قرأت سنیں`;
        audioToggleBtn.classList.remove('btn-primary');
      }
    };

    utterance.onerror = () => {
      isSpeaking = false;
      if (audioToggleBtn) {
        audioToggleBtn.innerHTML = `<span>🔊</span> صوتی قرأت سنیں`;
        audioToggleBtn.classList.remove('btn-primary');
      }
    };

    activeUtterance = utterance;
    synth.speak(utterance);
    isSpeaking = true;
    if (audioToggleBtn) {
      audioToggleBtn.innerHTML = `<span>⏸️</span> قرأت روکیں`;
      audioToggleBtn.classList.add('btn-primary');
    }
  }

  function stopAudio() {
    if (synth && (synth.speaking || synth.pending)) {
      synth.cancel();
    }
    isSpeaking = false;
    if (audioToggleBtn) {
      audioToggleBtn.innerHTML = `<span>🔊</span> صوتی قرأت سنیں`;
      audioToggleBtn.classList.remove('btn-primary');
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (isSpeaking) {
        stopAudio();
      } else {
        const curUnit = units[activeUnitIndex];
        const unitEl = document.getElementById(curUnit.id);
        if (unitEl) {
          // Extract text from poetry or prose
          const verseTexts = Array.from(unitEl.querySelectorAll('.verse-line, .prose-content p'))
            .map(p => p.textContent.trim())
            .join('۔ ');
          readAloud(`${curUnit.title}۔ ${verseTexts}`);
        }
      }
    });
  }

  // Pre-fetch voices
  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => getUrduVoice();
  }

  // =========================================================================
  // 6. ORIGINAL TEXTBOOK PAGE LIGHTBOX
  // =========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCloseBtn = document.getElementById('lightbox-close');

  function openLightbox(imgSrc, titleText) {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = imgSrc;
      if (lightboxTitle) lightboxTitle.textContent = titleText || 'اصل درسی کتاب کا صفحہ';
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.querySelectorAll('[data-open-page-img]').forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-open-page-img');
      const title = btn.getAttribute('data-page-title');
      openLightbox(imgSrc, title);
    });
  });

  // =========================================================================
  // 7. INTERACTIVE VOCABULARY TOOLTIP (فرہنگ و معانی پاپ اوور)
  // =========================================================================
  const vocabPopover = document.getElementById('vocab-popover');
  const popoverTerm = document.getElementById('popover-term');
  const popoverDef = document.getElementById('popover-def');

  document.querySelectorAll('.vocab-word').forEach(word => {
    word.addEventListener('click', (e) => {
      e.stopPropagation();
      const term = word.getAttribute('data-term') || word.textContent.trim();
      const def = word.getAttribute('data-def') || 'معنی درج نہیں';

      if (popoverTerm) popoverTerm.textContent = term;
      if (popoverDef) popoverDef.textContent = def;

      const rect = word.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      if (vocabPopover) {
        vocabPopover.style.top = `${rect.bottom + scrollTop + 8}px`;
        vocabPopover.style.left = `${rect.left + scrollLeft - 40}px`;
        vocabPopover.classList.add('visible');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (vocabPopover && !vocabPopover.contains(e.target)) {
      vocabPopover.classList.remove('visible');
    }
  });

  // =========================================================================
  // 8. TASHREEH & CENTRAL IDEA ACCORDION
  // =========================================================================
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (item) {
        item.classList.toggle('open');
      }
    });
  });

  // =========================================================================
  // 9. INTERACTIVE QUIZZES ENGINE (معروضی سوالات و امتحانات)
  // =========================================================================
  document.querySelectorAll('.quiz-wrapper').forEach(wrapper => {
    const scoreBadge = wrapper.querySelector('.quiz-score-badge');
    const cards = wrapper.querySelectorAll('.quiz-card');
    const resetBtn = wrapper.querySelector('.quiz-reset-btn');
    let correctCount = 0;
    let answeredCount = 0;

    function updateScore() {
      if (scoreBadge) {
        const pct = Math.round((correctCount / cards.length) * 100);
        scoreBadge.textContent = `نمبر: ${correctCount} / ${cards.length} (${pct}%)`;
      }
    }

    cards.forEach(card => {
      const correctIdx = parseInt(card.getAttribute('data-answer'), 10);
      const buttons = card.querySelectorAll('.quiz-option-btn');
      const explanation = card.querySelector('.quiz-explanation');

      buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.disabled = true);
          answeredCount++;

          if (idx === correctIdx) {
            btn.classList.add('selected-correct');
            correctCount++;
            if (explanation) {
              explanation.className = 'quiz-explanation show correct';
              explanation.innerHTML = `<strong>✓ درست جواب!</strong> ${card.getAttribute('data-explain') || 'شاباش! آپ کا انتخاب بالکل درست ہے۔'}`;
            }
          } else {
            btn.classList.add('selected-wrong');
            if (buttons[correctIdx]) buttons[correctIdx].classList.add('is-answer');
            if (explanation) {
              explanation.className = 'quiz-explanation show wrong';
              explanation.innerHTML = `<strong>✗ غلط جواب۔</strong> ${card.getAttribute('data-explain') || 'درست جواب نمایاں کر دیا گیا ہے۔'}`;
            }
          }
          updateScore();
        });
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        correctCount = 0;
        answeredCount = 0;
        cards.forEach(card => {
          const buttons = card.querySelectorAll('.quiz-option-btn');
          buttons.forEach(b => {
            b.disabled = false;
            b.classList.remove('selected-correct', 'selected-wrong', 'is-answer');
          });
          const explanation = card.querySelector('.quiz-explanation');
          if (explanation) {
            explanation.className = 'quiz-explanation';
            explanation.textContent = '';
          }
        });
        if (scoreBadge) scoreBadge.textContent = `نمبر: 0 / ${cards.length} (0%)`;
      });
    }
  });

  // =========================================================================
  // 10. 3D FLASHCARDS ENGINE (فلیش کارڈز)
  // =========================================================================
  const FLASHCARDS_DATA = [
    { cat: 'حمد و نعت', term: 'حمد', def: 'وہ کلام یا نظم جس میں اللہ تعالیٰ کی تعریف، صفات اور حمد و ثنا بیان کی جائے۔' },
    { cat: 'حمد و نعت', term: 'نعت', def: 'وہ کلام یا منظوم نذرانہ عقیدت جس میں حضور اکرم نبی کریم صلی اللہ علیہ و آلہ وسلم کی تعریف و توصیف بیان ہو۔' },
    { cat: 'حمد و نعت', term: 'شکر سرا', def: 'اللہ تعالیٰ کا شکر ادا کرنے والا، احسان مند رہنے والا۔' },
    { cat: 'حمد و نعت', term: 'دستگیری', def: 'مدد کرنا، گرتے ہوئے کا ہاتھ تھامنا، بے بسوں کا سہارا بننا۔' },
    { cat: 'شاعری', term: 'مصرع', def: 'شعر کی ایک سطر کو مصرع کہتے ہیں۔ دو مصرعوں سے مل کر ایک شعر بنتا ہے۔' },
    { cat: 'شاعری', term: 'قافیہ', def: 'شعر کے آخر میں آنے والے ہم آواز (ہم وزن) الفاظ، جیسے ترانہ، فسانہ، نشانہ۔' },
    { cat: 'شاعری', term: 'ردیف', def: 'قافیے کے بعد بار بار ہو بہو دہرائے جانے والے الفاظ کو ردیف کہتے ہیں۔' },
    { cat: 'قواعد و انشاء', term: 'اسم معرفہ', def: 'کسی خاص شخص، خاص جگہ یا خاص چیز کے نام کو اسم معرفہ (Proper Noun) کہتے ہیں، مثلاً: علامہ اقبال، لاہور، قرآن مجید۔' },
    { cat: 'قواعد و انشاء', term: 'اسم نکرہ', def: 'کسی عام شخص، عام چیز یا عام جگہ کے نام کو اسم نکرہ (Common Noun) کہتے ہیں، مثلاً: لڑکا، شہر، کتاب۔' },
    { cat: 'قواعد و انشاء', term: 'صفت و موصوف', def: 'وہ لفظ جو کسی اسم کی اچھائی یا برائی ظاہر کرے صفت ہے، اور جس کی حالت بتائی جائے وہ موصوف ہے (مثلاً: نیک لڑکا)۔' },
    { cat: 'شخصیات', term: 'بابائے اردو', def: 'مولوی عبدالحق جنہوں نے اپنی ساری زندگی اردو زبان کی ترویج، تحقیق اور اشاعت کے لیے وقف کر دی۔' },
    { cat: 'قومی تاریخ', term: 'نشانِ حیدر', def: 'پاکستان کا اعلیٰ ترین فوجی اعزاز جو مادرِ وطن کے لیے بے مثال شجاعت دکھانے والے شہداء کو عطا کیا جاتا ہے۔' },
    { cat: 'جدید دور', term: 'انفارمیشن ٹیکنالوجی', def: 'کمپیوٹر اور مواصلاتی رابطوں کے ذریعے معلومات کو پیدا کرنے، محفوظ کرنے اور ترسیل کرنے کا جدید نظام۔' },
    { cat: 'فلاح و انسانیت', term: 'ہلالِ احمر', def: 'بین الاقوامی فلاحی ادارہ (Red Crescent) جو جنگ، زلزلے اور قدرتی آفات میں بلا تفریق انسانیت کی خدمت کرتا ہے۔' },
    { cat: 'کلامِ اقبال', term: 'خودی', def: 'علامہ اقبال کے فلسفے میں خودی سے مراد احساسِ ذات، خود شناسی، عزتِ نفس اور اخلاقی بلندی ہے۔' },
    { cat: 'کلامِ اقبال', term: 'شاہین', def: 'اقبال کا پسندیدہ پرندہ جو بلند پروازی، خودداری، غیرت اور درویشی کی علامت ہے۔' }
  ];

  const flashcardStage = document.getElementById('flashcard-stage');
  const flashcardTag = document.getElementById('flashcard-tag');
  const flashcardTerm = document.getElementById('flashcard-term');
  const flashcardDef = document.getElementById('flashcard-def');
  const flashcardCounter = document.getElementById('flashcard-counter');
  const flashcardFilter = document.getElementById('flashcard-filter');
  const cardPrevBtn = document.getElementById('card-prev');
  const cardNextBtn = document.getElementById('card-next');
  const cardShuffleBtn = document.getElementById('card-shuffle');
  const cardMasterBtn = document.getElementById('card-master');
  const cardReviewBtn = document.getElementById('card-review');
  const masteredCountEl = document.getElementById('mastered-count');
  const reviewCountEl = document.getElementById('review-count');

  let cardIndex = 0;
  let activeCards = [...FLASHCARDS_DATA];
  let masteredSet = new Set(JSON.parse(localStorage.getItem('f0undr-urdu-mastered') || '[]'));
  let reviewSet = new Set(JSON.parse(localStorage.getItem('f0undr-urdu-review') || '[]'));

  function updateCardStats() {
    if (masteredCountEl) masteredCountEl.textContent = `${masteredSet.size} یاد ہو گئے`;
    if (reviewCountEl) reviewCountEl.textContent = `${reviewSet.size} دہرائی درکار`;
    localStorage.setItem('f0undr-urdu-mastered', JSON.stringify([...masteredSet]));
    localStorage.setItem('f0undr-urdu-review', JSON.stringify([...reviewSet]));
  }

  function renderCard() {
    if (!flashcardStage || activeCards.length === 0) return;
    flashcardStage.classList.remove('flipped');
    const item = activeCards[cardIndex];
    if (flashcardTag) flashcardTag.textContent = item.cat;
    if (flashcardTerm) flashcardTerm.textContent = item.term;
    if (flashcardDef) flashcardDef.textContent = item.def;
    if (flashcardCounter) flashcardCounter.textContent = `کارڈ ${cardIndex + 1} از ${activeCards.length}`;
  }

  if (flashcardStage) {
    flashcardStage.addEventListener('click', () => {
      flashcardStage.classList.toggle('flipped');
    });
  }

  if (cardNextBtn) {
    cardNextBtn.addEventListener('click', () => {
      cardIndex = (cardIndex + 1) % activeCards.length;
      renderCard();
    });
  }

  if (cardPrevBtn) {
    cardPrevBtn.addEventListener('click', () => {
      cardIndex = (cardIndex - 1 + activeCards.length) % activeCards.length;
      renderCard();
    });
  }

  if (cardShuffleBtn) {
    cardShuffleBtn.addEventListener('click', () => {
      activeCards.sort(() => Math.random() - 0.5);
      cardIndex = 0;
      renderCard();
    });
  }

  if (cardMasterBtn) {
    cardMasterBtn.addEventListener('click', () => {
      const cur = activeCards[cardIndex];
      masteredSet.add(cur.term);
      reviewSet.delete(cur.term);
      updateCardStats();
      cardIndex = (cardIndex + 1) % activeCards.length;
      renderCard();
    });
  }

  if (cardReviewBtn) {
    cardReviewBtn.addEventListener('click', () => {
      const cur = activeCards[cardIndex];
      reviewSet.add(cur.term);
      masteredSet.delete(cur.term);
      updateCardStats();
      cardIndex = (cardIndex + 1) % activeCards.length;
      renderCard();
    });
  }

  if (flashcardFilter) {
    flashcardFilter.addEventListener('change', (e) => {
      const cat = e.target.value;
      if (cat === 'all') {
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
  // 11. STUDENT NOTEBOOK AUTO-SAVING (طالب علم کے نوٹس)
  // =========================================================================
  document.querySelectorAll('.notebook-textarea').forEach(textarea => {
    const key = `f0undr-urdu-note-${textarea.getAttribute('data-note-unit')}`;
    textarea.value = localStorage.getItem(key) || '';

    const statusEl = textarea.closest('.student-notebook').querySelector('.notebook-status');

    let timeout = null;
    textarea.addEventListener('input', () => {
      if (statusEl) statusEl.textContent = 'محفوظ ہو رہا ہے...';
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.setItem(key, textarea.value);
        if (statusEl) statusEl.textContent = '✓ محفوظ شدہ';
      }, 600);
    });
  });

  // =========================================================================
  // 12. GLOBAL SEARCH MODAL (Ctrl + K تلاش)
  // =========================================================================
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('global-search-input');
  const searchResultsList = document.getElementById('search-results-list');
  const searchTriggerBtn = document.getElementById('global-search-trigger');
  const searchCloseBtn = document.getElementById('search-close');

  function openSearch() {
    if (searchModal && searchInput) {
      searchModal.classList.add('active');
      searchInput.value = '';
      searchInput.focus();
      renderSearchResults('');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (searchTriggerBtn) searchTriggerBtn.addEventListener('click', openSearch);
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Keyboard shortcut Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape') {
      closeSearch();
      closeLightbox();
      toggleDrawer(false);
    }
  });

  // Search index built from all units and vocabulary
  function renderSearchResults(query) {
    if (!searchResultsList) return;
    searchResultsList.innerHTML = '';
    const q = query.trim().toLowerCase();

    if (!q) {
      searchResultsList.innerHTML = `<li style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:1.15rem;">سبق، شعر، شاعر، یا مشکل لفظ کا کوئی بھی حصہ تلاش کریں...</li>`;
      return;
    }

    const matches = [];

    // Search Units
    units.forEach((u, idx) => {
      if (u.title.toLowerCase().includes(q) || u.genre.toLowerCase().includes(q)) {
        matches.push({
          unitId: u.id,
          unitIdx: idx,
          title: `سبق نمبر ${u.num}: ${u.title}`,
          snippet: `صنف: ${u.genre}`
        });
      }
    });

    // Search Flashcards & Vocabulary
    FLASHCARDS_DATA.forEach(card => {
      if (card.term.toLowerCase().includes(q) || card.def.toLowerCase().includes(q)) {
        matches.push({
          unitId: 'flashcards',
          unitIdx: -1,
          title: `لغت و فرہنگ: ${card.term}`,
          snippet: card.def
        });
      }
    });

    if (matches.length === 0) {
      searchResultsList.innerHTML = `<li style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:1.15rem;">کوئی نتیجہ نہیں ملا۔ برائے مہربانی دیگر الفاظ آزمائیں۔</li>`;
      return;
    }

    matches.slice(0, 10).forEach(m => {
      const li = document.createElement('li');
      li.className = 'search-item';
      li.innerHTML = `
        <span class="search-item-title">${m.title}</span>
        <span class="search-item-snippet">${m.snippet}</span>
      `;
      li.addEventListener('click', () => {
        closeSearch();
        if (m.unitIdx !== -1) {
          showUnit(m.unitIdx, true);
        } else {
          const el = document.getElementById(m.unitId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      searchResultsList.appendChild(li);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
  }

})();
