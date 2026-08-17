/* ==========================================================================
   Balogun Olamide (Enigma) — High Performance Portfolio Engine
   Interactive Luxury Obsidian & Gold Portfolio System
   Optimized for Instant Speed, Responsiveness, & Accessibility
   ========================================================================== */

let lastActiveElement = null;
let filterTimeoutId = null;

// ==========================================================================
// 1. DATA SOURCES
// ==========================================================================
// Tratun Energy Campaign Suite (10 Curated Creative Pieces with exact Brief / Interpretation / Execution)
const tratunCampaigns = [
  {
    image: 'assets/images/Tratun section/20th_July_Tratun_ Know Your Oil — Engine Oil Education.webp',
    tag: 'EDUCATIONAL & PRODUCT INTEGRITY',
    title: '01 — Engine Oil Education',
    brief: 'Show how skipping regular oil changes can damage an engine.',
    interpretation: 'Show the negative outcome of neglected oil changes alongside the positive outcome of proper maintenance, using a single image without making the composition feel crowded.',
    execution: 'Split the engine down the middle, with one side rusted and damaged and the other fresh and properly oiled. A grid pattern was added to the background to create depth instead of relying on a flat backdrop.'
  },
  {
    image: 'assets/images/Tratun section/21st_June_Tratun_ Happy Father\'s Day.webp',
    tag: 'SPECIAL STORYTELLING',
    title: '02 — Happy Father\'s Day',
    brief: 'Show a Tratun tanker moving along a father\'s tie to communicate the idea that fathers pave the way.',
    interpretation: 'Turn the tie into a road, using Tratun blue and a central strip to make the road metaphor immediately readable.',
    execution: 'The tanker was positioned moving toward the edge of the tie, with “Happy Father\'s Day” on one side and “Celebrating the ones who paved the way” on the other. The layout creates an F-pattern that guides the viewer through the message.'
  },
  {
    image: 'assets/images/Tratun section/Monday, 17th August, 2026 How downstream Oil and gas matters for your business.webp',
    tag: 'INDUSTRY INFOGRAPHIC',
    title: '03 — Why Downstream Oil & Gas Matters',
    brief: 'Explain why downstream oil and gas matters to businesses, point by point.',
    interpretation: 'Anchor the composition with a real downstream facility while presenting the key reasons in a fan-shaped arrangement, allowing the information to build progressively rather than reading as a flat list.',
    execution: 'Created a fan-shaped infographic with one icon representing each reason, guiding the viewer through the information in sequence.'
  },
  {
    image: 'assets/images/Tratun section/tratun-tanker-campaign.webp',
    tag: 'HUMAN CONNECTION METAPHOR',
    title: '04 — Smile, Tratun Is On Their Way',
    brief: 'Create a playful visual around a Tratun truck and a smile-shaped road.',
    interpretation: 'Push the reference further by giving the concept a more playful personality while keeping the brand recognisable.',
    execution: 'Placed the Tratun truck along the curved road to form a smile, then added googly eyes to make the corporate brand feel more approachable rather than stiff.'
  },
  {
    image: 'assets/images/Tratun section/7th_August_Tratun_Why choose Tratun coal.webp',
    tag: 'TECHNICAL & SOLID FUELS',
    title: '05 — Why Choose Tratun Coal',
    brief: 'Explain why clients should choose Tratun for coal supply.',
    interpretation: 'Break the key trust factors into separate, scannable points rather than presenting them as one block of information.',
    execution: 'Displayed each reason as a hanging tag on a keyring, with a blurred coal mine in the background providing context without competing with the information.'
  },
  {
    image: 'assets/images/Tratun section/13th_July_Tratun_ When Everything Fits..webp',
    tag: 'SUPPLY CHAIN INTEGRATION',
    title: '06 — When Everything Fits',
    brief: 'Show the range of products Tratun supplies.',
    interpretation: 'Present Tratun as the piece that completes the wider operation, rather than as a supplier of a single product.',
    execution: 'Created a jigsaw piece carrying the Tratun logo and positioned it within a machine made up of different product types — gas, PMS, LPG, kerosene, diesel and lubricants. The concept was paired with the line “When everything fits… Tratun is the supplier.”'
  },
  {
    image: 'assets/images/Tratun section/17th_June_Tratun_ switch to Tratun-.webp',
    tag: 'PROBLEM-SOLVING METAPHOR',
    title: '07 — Switch to Tratun',
    brief: 'Show the toll that unreliable fuel supply can take on a production manager.',
    interpretation: 'Make the manager\'s problems literal by placing them inside his own head, showing how unreliable supply becomes another source of pressure.',
    execution: 'Created a cutaway view of the manager\'s head, revealing him buried under crumpled paperwork at his desk. The message positions unreliable fuel supply as one problem that shouldn\'t have to remain on his table — and switching to Tratun as the solution.'
  },
  {
    image: 'assets/images/tratun-power.webp',
    tag: 'OPERATIONAL READINESS',
    title: '08 — Constant Power',
    brief: 'Show why consistent power and fuel supply matter to daily operations.',
    interpretation: 'Fuel isn\'t separate from the day\'s other responsibilities. It is one of the first things that needs to be handled before the rest can move forward.',
    execution: 'Created a dark, unlit environment to represent the absence of power, with a factory manager refuelling first through a miniature Tratun truck on the table. Three clipboards — staff meeting, maintenance and refuelling — show the tasks waiting behind it.'
  },
  {
    image: 'assets/images/Tratun section/12th_August_Tratun_international youth day=.webp',
    tag: 'YOUTH EMPOWERMENT & WORKFORCE',
    title: '09 — International Youth Day',
    brief: 'Create a visual for International Youth Day highlighting young talent in the energy sector.',
    interpretation: 'Show that the future of the energy industry is driven by young professionals on the ground today, moving away from abstract concepts to real operational workforce representation.',
    execution: 'Positioned young energy professionals in field gear on site at an active facility, paired with the headline “Happy International Youth Day — The future of energy is already working.”'
  },
  {
    image: 'assets/images/Tratun section/1.webp',
    tag: 'PERFORMANCE METAPHOR',
    title: '10 — Every Champion Needs Fuel',
    brief: 'Connect Tratun with the football/World Cup moment.',
    interpretation: 'Extend the idea of fuel beyond its industrial context and connect it to performance. The football becomes the thing being “fuelled.”',
    execution: 'A golden liquid swirl was wrapped around the ball during the strike, creating the visual impression that the ball is being fuelled by Tratun. The concept was paired with the line “Every champion needs fuel.”'
  }
];

// Grosvenor Global Services Campaign Suite (5 Verified Creative Pieces with exact User Copy)
const grosvenorCampaigns = [
  {
    image: 'assets/images/Grosvenor Section/grosvenor-reveal.webp',
    tag: '10TH ANNIVERSARY ENGAGEMENT',
    title: '01 — 10th Anniversary Jigsaw',
    brief: 'Create an engaging visual to celebrate Grosvenor\'s 10th anniversary.',
    interpretation: 'Use a jigsaw as a simple metaphor for the different pieces that make up the organisation and its journey.',
    execution: 'Created a jigsaw-based anniversary visual designed primarily as an engagement post.'
  },
  {
    image: 'assets/images/Grosvenor Section/Have you filled up....webp',
    tag: 'COMMUNITY ENGAGEMENT',
    title: '02 — Have You Fueled Up Your Car\'s Tank Today?',
    brief: 'Create an engagement post around everyday vehicle refuelling.',
    interpretation: 'Use a familiar refuelling moment to create a simple question that encourages the audience to interact with the post.',
    execution: 'Featured a fuel nozzle filling a vehicle\'s tank, paired with the question “Have you fueled up your car\'s tank today?”'
  },
  {
    image: 'assets/images/Grosvenor Section/grosvenor-hivis-campaign.webp',
    tag: '10TH ANNIVERSARY & OPERATIONAL ETHOS',
    title: '03 — A Mission Isn\'t a Statement',
    brief: 'Create an anniversary piece around Grosvenor\'s mission and standards.',
    interpretation: 'Present the message in a way that connects the company\'s stated mission to the everyday behaviour required to uphold it.',
    execution: 'Placed the statement “A mission isn\'t a statement. It\'s a standard you show up to every day.” across the back of a Walker I-Vis, using the physical garment as part of the visual rather than treating the statement as standalone typography.'
  },
  {
    image: 'assets/images/Grosvenor Section/1st_Julyl_GGSL_New Month.webp',
    tag: 'MONTHLY LOGISTICS COMMENCEMENT',
    title: '04 — July Is Here',
    brief: 'Create a visual to mark the beginning of July.',
    interpretation: 'Use a cargo manifest to connect the new-month message to Grosvenor\'s operational and industrial context.',
    execution: 'Created a cargo-manifest visual centred around the simple message “July is here.”'
  },
  {
    image: 'assets/images/Grosvenor Section/1st_Augustl_GGSL_New Month.webp',
    tag: 'ECOSYSTEM SHOWCASE & 8TH MONTH',
    title: '05 — August',
    brief: 'Create a visual to welcome August while highlighting the breadth of Grosvenor\'s operations.',
    interpretation: 'Use the number eight as the main visual device, connecting the eighth month of the year with the different things Grosvenor does.',
    execution: 'Built the composition around an oversized 8, incorporating visual elements representing Grosvenor\'s different activities.'
  }
];

// Ektos UI/UX Onboarding Flow Data (5 Curated Interactive Screens)
const ektosOnboardingSteps = [
  {
    stageNumber: '01',
    title: '01 — Take Control of Your Finances',
    desc: 'Introduces the core value proposition: understanding and managing everyday finances.',
    image: 'assets/images/Onboarding page 1.webp'
  },
  {
    stageNumber: '02',
    title: '02 — Save Towards Your Goal',
    desc: 'Turns financial intentions into visible, trackable savings goals.',
    image: 'assets/images/Onboarding page 2.webp'
  },
  {
    stageNumber: '03',
    title: '03 — Budget With Confidence',
    desc: 'Introduces budgeting as a practical system for staying on top of spending.',
    image: 'assets/images/Onboarding page 3.webp'
  },
  {
    stageNumber: '04',
    title: '04 — Sign In',
    desc: 'A familiar, focused authentication flow that brings users back into the product.',
    image: 'assets/images/Onboarding page 4.webp'
  },
  {
    stageNumber: '05',
    title: '05 — Create Account',
    desc: 'A simple entry point into the Ektos experience.',
    image: 'assets/images/Onboarding page 5.webp'
  }
];

// ==========================================================================
// 2. DOM INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFilters();
  initTratunSlider();
  initGrosvenorSlider();
  initEktosCarousel();
  initVideoInteractions();
  initKeyboardEvents();
  initInteractiveMedia();
});

// ==========================================================================
// 3. NAVIGATION & SCROLL SPY
// ==========================================================================

function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link:not(.mobile-link)');
  const sections = document.querySelectorAll('section[id]');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars-staggered', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars-staggered');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Scroll Spy for active navigation link state
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sectionsList = Array.from(sections);

  function updateActiveNav() {
    const scrollPos = window.scrollY + 160;
    let currentId = '';

    for (let i = sectionsList.length - 1; i >= 0; i--) {
      const sec = sectionsList[i];
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.getAttribute('id');
        break;
      }
    }

    if (!currentId && sectionsList.length > 0) {
      currentId = sectionsList[0].getAttribute('id');
    }

    allNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        updateActiveNav();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateActiveNav, { passive: true });
  window.addEventListener('hashchange', () => {
    setTimeout(updateActiveNav, 100);
  });
  updateActiveNav();
}

// ==========================================================================
// 4. PROJECT CATEGORY FILTERS
// ==========================================================================

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('is-hidden', 'is-filtering-out');
        } else {
          card.classList.add('is-hidden', 'is-filtering-out');
        }
      });
    });
  });
}

// ==========================================================================
// ==========================================================================
// 5. TRATUN ENERGY SIDE-BY-SIDE SLIDER (INSTANT RESPONSE & TOUCH SWIPE)
// ==========================================================================

function initTratunSlider() {
  let currentIndex = 0;
  const mainImg = document.getElementById('tratunMainImg');
  const mainViewport = document.getElementById('tratunMainViewport');
  const counter = document.getElementById('tratunCounter');
  const thumbsContainer = document.getElementById('tratunThumbs');
  const prevBtn = document.getElementById('tratunPrevBtn');
  const nextBtn = document.getElementById('tratunNextBtn');
  
  const briefContent = document.getElementById('tratunBriefContent');
  const briefTag = document.getElementById('tratunBriefTag');
  const briefTitle = document.getElementById('tratunBriefTitle');
  const briefDesc = document.getElementById('tratunBriefDesc');
  const briefConcept = document.getElementById('tratunBriefConcept');
  const briefImpact = document.getElementById('tratunBriefImpact');

  if (!mainImg || !thumbsContainer || tratunCampaigns.length === 0) return;

  // Render Thumbnail strip
  thumbsContainer.innerHTML = tratunCampaigns.map((item, idx) => `
    <button type="button" class="slider-film-thumb ${idx === 0 ? 'active' : ''}" data-idx="${idx}" aria-label="View Tratun design ${idx + 1}: ${item.title}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
    </button>
  `).join('');

  const thumbButtons = thumbsContainer.querySelectorAll('.slider-film-thumb');

  function updateSlide(index) {
    currentIndex = (index + tratunCampaigns.length) % tratunCampaigns.length;
    const current = tratunCampaigns[currentIndex];

    // Instant update
    mainImg.src = current.image;
    mainImg.alt = current.title;

    if (counter) {
      counter.textContent = `Design ${currentIndex + 1} of ${tratunCampaigns.length}`;
    }

    if (briefTag) briefTag.innerHTML = `<i class="fa-solid fa-tag"></i> ${current.tag}`;
    if (briefTitle) briefTitle.textContent = current.title;
    if (briefDesc) briefDesc.textContent = current.brief;
    if (briefConcept) briefConcept.textContent = current.interpretation;
    if (briefImpact) briefImpact.textContent = current.execution;

    thumbButtons.forEach((btn, i) => {
      btn.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateSlide(currentIndex + 1);
    });
  }

  // Thumbnails: Click & Touch handlers
  thumbButtons.forEach(btn => {
    const handleThumb = (e) => {
      e.preventDefault();
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      updateSlide(idx);
    };
    btn.addEventListener('click', handleThumb);
  });

  // Main Viewport Lightbox Trigger
  if (mainViewport) {
    mainViewport.addEventListener('click', (e) => {
      e.preventDefault();
      const current = tratunCampaigns[currentIndex];
      if (current) {
        openLightbox(current.image, current.title, `${current.brief} — ${current.execution}`);
      }
    });

    // Touch Swipe Gestures
    let touchStartX = 0;
    let touchStartY = 0;
    mainViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    mainViewport.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX > 0) {
          updateSlide(currentIndex - 1); // Swipe Right -> Prev
        } else {
          updateSlide(currentIndex + 1); // Swipe Left -> Next
        }
      }
    }, { passive: true });
  }
}

// ==========================================================================
// 6. GROSVENOR GLOBAL SERVICES SIDE-BY-SIDE SLIDER (INSTANT RESPONSE & TOUCH SWIPE)
// ==========================================================================

function initGrosvenorSlider() {
  let currentIndex = 0;
  const mainImg = document.getElementById('grosvenorMainImg');
  const mainViewport = document.getElementById('grosvenorMainViewport');
  const counter = document.getElementById('grosvenorCounter');
  const thumbsContainer = document.getElementById('grosvenorThumbs');
  const prevBtn = document.getElementById('grosvenorPrevBtn');
  const nextBtn = document.getElementById('grosvenorNextBtn');
  
  const briefContent = document.getElementById('grosvenorBriefContent');
  const briefTag = document.getElementById('grosvenorBriefTag');
  const briefTitle = document.getElementById('grosvenorBriefTitle');
  const briefDesc = document.getElementById('grosvenorBriefDesc');
  const briefConcept = document.getElementById('grosvenorBriefConcept');
  const briefImpact = document.getElementById('grosvenorBriefImpact');

  if (!mainImg || !thumbsContainer || grosvenorCampaigns.length === 0) return;

  // Render Thumbnail strip
  thumbsContainer.innerHTML = grosvenorCampaigns.map((item, idx) => `
    <button type="button" class="slider-film-thumb ${idx === 0 ? 'active' : ''}" data-idx="${idx}" aria-label="View Grosvenor design ${idx + 1}: ${item.title}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
    </button>
  `).join('');

  const thumbButtons = thumbsContainer.querySelectorAll('.slider-film-thumb');

  function updateSlide(index) {
    currentIndex = (index + grosvenorCampaigns.length) % grosvenorCampaigns.length;
    const current = grosvenorCampaigns[currentIndex];

    // Instant update
    mainImg.src = current.image;
    mainImg.alt = current.title;

    if (counter) {
      counter.textContent = `Design ${currentIndex + 1} of ${grosvenorCampaigns.length}`;
    }

    if (briefTag) briefTag.innerHTML = `<i class="fa-solid fa-tag"></i> ${current.tag}`;
    if (briefTitle) briefTitle.textContent = current.title;
    if (briefDesc) briefDesc.textContent = current.brief;
    if (briefConcept) briefConcept.textContent = current.interpretation;
    if (briefImpact) briefImpact.textContent = current.execution;

    thumbButtons.forEach((btn, i) => {
      btn.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateSlide(currentIndex + 1);
    });
  }

  // Thumbnails: Click & Touch handlers
  thumbButtons.forEach(btn => {
    const handleThumb = (e) => {
      e.preventDefault();
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      updateSlide(idx);
    };
    btn.addEventListener('click', handleThumb);
  });

  // Main Viewport Lightbox Trigger
  if (mainViewport) {
    mainViewport.addEventListener('click', (e) => {
      e.preventDefault();
      const current = grosvenorCampaigns[currentIndex];
      if (current) {
        openLightbox(current.image, current.title, `${current.brief} — ${current.execution}`);
      }
    });

    // Touch Swipe Gestures
    let touchStartX = 0;
    let touchStartY = 0;
    mainViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    mainViewport.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX > 0) {
          updateSlide(currentIndex - 1); // Swipe Right -> Prev
        } else {
          updateSlide(currentIndex + 1); // Swipe Left -> Next
        }
      }
    }, { passive: true });
  }
}

// ==========================================================================
// 7. EKTOS UI/UX ONBOARDING SHOWCASE (AUTO-ADVANCING SINGLE DEVICE)
// ==========================================================================

function initEktosCarousel() {
  let currentIndex = 0;
  const AUTOPLAY_INTERVAL = 4800; // 4.8 seconds
  let autoplayTimer = null;
  let isPaused = false;

  const container = document.getElementById('ektosFlowContainer');
  const counterEl = document.getElementById('ektosFlowCounter');
  const prevBtn = document.getElementById('ektosFlowPrev');
  const nextBtn = document.getElementById('ektosFlowNext');
  const pills = document.querySelectorAll('.ektos-pill-btn');
  const deviceFrame = document.getElementById('ektosDeviceFrame');
  const deviceImg = document.getElementById('ektosDeviceImg');
  const captionPane = document.getElementById('ektosCaptionPane');
  const captionStep = document.getElementById('ektosCaptionStep');
  const captionTitle = document.getElementById('ektosCaptionTitle');
  const captionDesc = document.getElementById('ektosCaptionDesc');

  if (!container || !deviceImg) return;

  function updateStage(index, immediate = false) {
    currentIndex = (index + ektosOnboardingSteps.length) % ektosOnboardingSteps.length;
    const current = ektosOnboardingSteps[currentIndex];

    // Update Counter (01 / 05)
    if (counterEl) {
      counterEl.textContent = `${current.stageNumber} / 05`;
    }

    // Update Progress Step Pills
    pills.forEach((pill, idx) => {
      const isActive = idx === currentIndex;
      pill.classList.toggle('active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
      
      const bar = pill.querySelector('.pill-bar');
      if (bar) {
        bar.style.animation = 'none';
        if (isActive && !isPaused) {
          void bar.offsetWidth; // Trigger reflow for smooth re-animation
          bar.style.animation = `pillProgress ${AUTOPLAY_INTERVAL}ms linear forwards`;
        }
      }
    });

    // Smooth subtle crossfade for image & text
    if (!immediate) {
      if (deviceImg) deviceImg.classList.add('fade-out');
      if (captionPane) captionPane.classList.add('fade-out');

      setTimeout(() => {
        if (deviceImg) {
          deviceImg.src = current.image;
          deviceImg.alt = current.title;
          deviceImg.classList.remove('fade-out');
        }
        if (captionStep) captionStep.textContent = `${current.stageNumber} / 05 • ONBOARDING FLOW`;
        if (captionTitle) captionTitle.textContent = current.title;
        if (captionDesc) captionDesc.textContent = current.desc;
        if (captionPane) captionPane.classList.remove('fade-out');
      }, 220);
    } else {
      if (deviceImg) {
        deviceImg.src = current.image;
        deviceImg.alt = current.title;
      }
      if (captionStep) captionStep.textContent = `${current.stageNumber} / 05 • ONBOARDING FLOW`;
      if (captionTitle) captionTitle.textContent = current.title;
      if (captionDesc) captionDesc.textContent = current.desc;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    isPaused = false;
    const activeBar = document.querySelector('.ektos-pill-btn.active .pill-bar');
    if (activeBar) {
      activeBar.style.animationPlayState = 'running';
    }
    autoplayTimer = setInterval(() => {
      updateStage(currentIndex + 1);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pauseAutoplay() {
    stopAutoplay();
    isPaused = true;
    const activeBar = document.querySelector('.ektos-pill-btn.active .pill-bar');
    if (activeBar) {
      activeBar.style.animationPlayState = 'paused';
    }
  }

  // Navigation Arrows
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateStage(currentIndex - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateStage(currentIndex + 1);
      startAutoplay();
    });
  }

  // Direct Pill Clicks
  pills.forEach((pill, idx) => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      updateStage(idx);
      startAutoplay();
    });
  });

  // Lightbox & Touch Gestures on Device Frame
  if (deviceFrame) {
    deviceFrame.addEventListener('click', () => {
      const current = ektosOnboardingSteps[currentIndex];
      if (current) {
        openLightbox(current.image, current.title, current.desc);
      }
    });

    let touchStartX = 0;
    let touchStartY = 0;
    deviceFrame.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    deviceFrame.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX > 0) {
          updateStage(currentIndex - 1); // Swipe Right -> Prev
        } else {
          updateStage(currentIndex + 1); // Swipe Left -> Next
        }
        startAutoplay();
      }
    }, { passive: true });
  }

  // Hover to pause, leave to resume
  container.addEventListener('mouseenter', pauseAutoplay);
  container.addEventListener('mouseleave', startAutoplay);
  container.addEventListener('focusin', pauseAutoplay);
  container.addEventListener('focusout', startAutoplay);

  // Initial setup & start
  updateStage(0, true);
  startAutoplay();
}

// ==========================================================================
// 8. VIDEO PLAYBACK & HOVER TRIGGERS
// ==========================================================================

function initVideoInteractions() {
  const reelCards = document.querySelectorAll('.reel-video-wrapper');
  reelCards.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    if (video) {
      wrapper.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
      wrapper.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });
}

// ==========================================================================
// 9. LIGHTBOX & MODAL CONTROLLERS
// ==========================================================================

function openLightbox(mediaSrc, title, description, mediaType = null) {
  lastActiveElement = document.activeElement;
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalVideo = document.getElementById('lightboxVideo');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalDesc = document.getElementById('lightboxDesc');
  const closeBtn = modal ? modal.querySelector('.modal-close-btn') : null;

  const isVideo = mediaType === 'video' || (typeof mediaSrc === 'string' && (mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.mov')));

  if (modal) {
    if (isVideo && modalVideo) {
      modalVideo.src = mediaSrc;
      modalVideo.style.display = 'block';
      if (modalImg) {
        modalImg.src = '';
        modalImg.style.opacity = '0';
        modalImg.style.display = 'none';
      }
      modalVideo.play().catch(() => {});
    } else if (modalImg) {
      modalImg.style.opacity = '0';
      modalImg.style.transition = 'opacity 0.2s ease';
      modalImg.src = mediaSrc;
      modalImg.alt = title || 'Artwork preview';
      modalImg.style.display = 'block';
      if (modalImg.complete) {
        modalImg.style.opacity = '1';
      } else {
        modalImg.onload = () => {
          modalImg.style.opacity = '1';
        };
      }
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.src = '';
        modalVideo.style.display = 'none';
      }
    }

    if (modalTitle) modalTitle.textContent = title || 'Artwork Showcase';
    if (modalDesc) modalDesc.textContent = description || '';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  }
}

function closeLightbox(event) {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalVideo = document.getElementById('lightboxVideo');
  if (modal) {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
      modalVideo.style.display = 'none';
    }
    if (modalImg) {
      modalImg.src = '';
      modalImg.style.opacity = '0';
      modalImg.style.display = 'none';
    }
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }
}

// ==========================================================================
// 10. ACCESSIBILITY & KEYBOARD HANDLERS
// ==========================================================================

function initInteractiveMedia() {
  const interactiveElements = document.querySelectorAll('.gallery-item, .media-interactive-card, .side-slider-viewport, .phone-mockup-frame, .reel-card');
  interactiveElements.forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
}

function initKeyboardEvents() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeResumeViewer();
      closeContactModal();
      closeResumeModal();
    }

    const activeModal = document.querySelector('.modal-backdrop.active');
    if (activeModal && e.key === 'Tab') {
      const focusableEls = activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableEls.length === 0) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });
}

// ==========================================================================
// 11. TOAST & UTILITIES
// ==========================================================================

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

function copyEmail(e) {
  if (e) e.preventDefault();
  const email = "olamidebalogun3131@gmail.com";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  } else {
    showToast(`Email: ${email}`);
  }
}

// ==========================================================================
// 12. INSTANT RESUME VIEWER & CONTACT MODALS
// ==========================================================================

function openResumeViewer(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('resumeViewerModal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeViewer(e) {
  if (e && e.target && e.target.closest('.resume-viewer-dialog') && !e.target.closest('.modal-close-btn')) {
    return;
  }
  const modal = document.getElementById('resumeViewerModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function openContactModal(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal(e) {
  if (e && e.target && e.target.closest('.resume-modal-dialog') && !e.target.closest('.modal-close-btn')) {
    return;
  }
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// Backwards compatibility alias
function openResumeModal(e) {
  openResumeViewer(e);
}
function closeResumeModal(e) {
  closeResumeViewer(e);
  closeContactModal(e);
}

window.openResumeViewer = openResumeViewer;
window.closeResumeViewer = closeResumeViewer;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.openResumeModal = openResumeModal;
window.closeResumeModal = closeResumeModal;
window.showToast = showToast;
window.copyEmail = copyEmail;

