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

// Tratun Energy Campaign Suite (All 13 Verified Creative Pieces with exact Brief / Interpretation / Execution)
const tratunCampaigns = [
  {
    image: 'assets/images/Tratun section/20th_July_Tratun_ Know Your Oil — Engine Oil Education.webp',
    tag: 'EDUCATIONAL & PRODUCT INTEGRITY',
    title: 'Engine Oil Education',
    brief: 'Content writer wanted to show that skipping oil changes destroys your engine.',
    interpretation: 'Show damage from skipping oil and the good outcome from not skipping — in one image, without making it busy.',
    execution: 'Split the engine down the middle — one side rusted/damaged, one side fresh and oiled. Added a grid pattern in the background instead of a flat backdrop, so the image reads with more depth.'
  },
  {
    image: 'assets/images/Tratun section/21st_June_Tratun_ Happy Father\'s Day.webp',
    tag: 'SPECIAL STORYTELLING',
    title: 'Happy Father\'s Day',
    brief: 'Show a Tratun tanker moving along a father\'s tie, to say fathers pave the way.',
    interpretation: 'Have the truck driving toward the edge of the tie, tie colored Tratun blue, with a center strip to make it read clearly as a road.',
    execution: 'Placed "Happy Father\'s Day" on one side and "Celebrating the ones who paved the way" on the other, so the eye moves through the layout in an F-pattern.'
  },
  {
    image: 'assets/images/Tratun section/Monday, 17th August, 2026 How downstream Oil and gas matters for your business.webp',
    tag: 'INDUSTRY INFOGRAPHIC',
    title: 'Why Downstream Oil & Gas Matters',
    brief: 'Explain why downstream oil and gas matters for business, point by point.',
    interpretation: 'Anchor the bottom of the image with a real downstream facility, and lay the reasons out in a fan shape so they build progressively rather than sitting as a flat list.',
    execution: 'Fan-shaped infographic, one icon per reason, guiding the eye through each point in sequence.'
  },
  {
    image: 'assets/images/Tratun section/tratun-tanker-campaign.webp',
    tag: 'HUMAN CONNECTION METAPHOR',
    title: 'Smile, Tratun Is On Their Way',
    brief: 'Add a Tratun truck into a smile-shaped image.',
    interpretation: 'Take the reference further than the original inspo — add googly eyes to keep it playful.',
    execution: 'Truck placed on the curved road-smile, googly eyes added so the corporate brand feels approachable instead of stiff.'
  },
  {
    image: 'assets/images/4th_May_Tratun_Keep chasing those goals with full tank.webp',
    tag: 'PERFORMANCE METAPHOR',
    title: 'Every Champion Needs Fuel',
    brief: 'Tie Tratun into the football/World Cup moment.',
    interpretation: 'Fuel isn\'t just industrial — it\'s what powers performance. The ball becomes the thing being "fueled."',
    execution: 'Golden liquid swirl wrapped around the ball mid-strike, visually reading as the ball being fueled by Tratun, paired with "Every champion needs fuel."'
  },
  {
    image: 'assets/images/Tratun section/1st_July_Tratun_Happy new month.webp',
    tag: 'ASPIRATIONAL BRANDING',
    title: 'Happy New Month',
    brief: 'Standard monthly greeting post.',
    interpretation: 'Use a fuel nozzle as the visual anchor, with the city reflected in it.',
    execution: 'Lagos skyline reflected in a chrome nozzle, casual/aspirational mood rather than hard-sell.'
  },
  {
    image: 'assets/images/Tratun section/7th_August_Tratun_Why choose Tratun coal.webp',
    tag: 'TECHNICAL & SOLID FUELS',
    title: 'Why Choose Tratun Coal',
    brief: 'Explain why clients should choose Tratun for coal supply.',
    interpretation: 'Break trust factors into separate, scannable reasons instead of one paragraph.',
    execution: 'Reasons displayed as hanging tags on a keyring, blurred coal mine in the background for context.'
  },
  {
    image: 'assets/images/Tratun section/13th_July_Tratun_ When Everything Fits..webp',
    tag: 'SUPPLY CHAIN INTEGRATION',
    title: 'When Everything Fits',
    brief: 'Show the range of products Tratun supplies.',
    interpretation: 'Tratun isn\'t just one product — it\'s the piece that completes the whole operation.',
    execution: 'Jigsaw piece with the Tratun logo fitting into a machine made of the different product types (gas, PMS, LPG, kerosene, diesel, lube), with the line "When everything fits… Tratun is the supplier."'
  },
  {
    image: 'assets/images/Tratun section/17th_June_Tratun_ switch to Tratun-.webp',
    tag: 'PROBLEM-SOLVING METAPHOR',
    title: 'Switch to Tratun (Grey Hair)',
    brief: 'Show the toll of unreliable fuel supply on a production manager.',
    interpretation: 'Put the manager\'s problems literally inside his own head — an open skull showing him overwhelmed at his desk.',
    execution: 'Cutaway head reveals the manager buried in crumpled paper, exhausted. Caption: unreliable fuel supply shouldn\'t be one more problem on his table — switching to Tratun removes it.'
  },
  {
    image: 'assets/images/tratun-power.webp',
    tag: 'OPERATIONAL READINESS',
    title: 'Constant Power (Clipboards)',
    brief: 'Show why consistent power/fuel matters for daily operations.',
    interpretation: 'Fuel isn\'t separate from the day\'s other tasks — it\'s the first thing that has to happen before the rest can move.',
    execution: 'Dark, unlit background (no power), factory manager refueling first via a miniature Tratun truck on the table, three clipboards (staff meeting, maintenance, refueling) showing the tasks stacking up behind it.'
  },
  {
    image: 'assets/images/Friday 21st  August, 2026 Supply is within reach (2).webp',
    tag: 'WORKFLOW PRIORITY',
    title: 'Finish Your To-Do List',
    brief: 'Companion piece to #10 — same idea, different angle.',
    interpretation: 'Without fuel, everything else on the list stalls — fuel has to be handled first.',
    execution: 'Clipboard to-do list with "Buy fuel" checked off first, ahead of reports and invoices.'
  },
  {
    image: 'assets/images/Tratun section/12th_August_Tratun_international youth day=.webp',
    tag: 'GENERATIONAL TRUST',
    title: 'Happy Children\'s Day',
    brief: 'Seasonal greeting tied to the tanker.',
    interpretation: 'Show generational trust being passed down — not just a truck on a street, but a father guiding his son toward it.',
    execution: 'Two hands on the toy tanker — child\'s hand on the truck, father\'s hand over the child\'s, guiding it. Miniature wooden street and buildings set the toy-world scale. Reads as: the son learns to trust Tratun through his father.'
  },
  {
    image: 'assets/images/Tratun section/1.webp',
    tag: 'CRITICAL CONTINUITY',
    title: 'Don\'t Let the Light Go Out',
    brief: 'Show Tratun as the fuel source keeping a business running.',
    interpretation: 'Without Tratun, there\'s no light — make that literal and immediate.',
    execution: 'Miniature office interior built into a puzzle piece, lit only because a Tratun tanker is connected and refueling it.'
  }
];

// Grosvenor Global Services Campaign Suite (5 Verified Creative Pieces with exact User Copy)
const grosvenorCampaigns = [
  {
    image: 'assets/images/Grosvenor Section/grosvenor-reveal.webp',
    tag: '10TH ANNIVERSARY ENGAGEMENT',
    title: '10th Anniversary Engagement Jigsaw',
    brief: 'The design is a jigsaw to celebrate the 10th anniversary.',
    interpretation: 'It is an engagement post designed to invite interaction from corporate stakeholders.',
    execution: 'Interlocking puzzle piece composition highlighting 10 years of Grosvenor service standard.'
  },
  {
    image: 'assets/images/Grosvenor Section/Have you filled up....webp',
    tag: 'COMMUNITY ENGAGEMENT',
    title: 'Fuel Up Engagement Campaign',
    brief: 'The caption says, "Have you fueled up your car\'s tank today?"',
    interpretation: 'It features a gas nozzle being filled in a car as an interactive community engagement piece.',
    execution: 'Striking composition featuring a vehicle fueling nozzle paired with conversational engagement copy for Grosvenor.'
  },
  {
    image: 'assets/images/Grosvenor Section/grosvenor-hivis-campaign.webp',
    tag: '10TH ANNIVERSARY & OPERATIONAL ETHOS',
    title: 'A Mission Isn\'t a Statement, It\'s a Standard',
    brief: 'Part of the designs for the 10th anniversary.',
    interpretation: 'It says, "A mission isn\'t a statement. It\'s a standard you show up to every day."',
    execution: 'Written boldly at the back of a frontline worker\'s Walker Hi-Vis jacket, demonstrating operational authority.'
  },
  {
    image: 'assets/images/Grosvenor Section/1st_Julyl_GGSL_New Month.webp',
    tag: 'MONTHLY LOGISTICS COMMENCEMENT',
    title: 'July Cargo Manifest (Happy New Month)',
    brief: 'Created to celebrate July as a Happy New Month design.',
    interpretation: 'It features a cargo manifest that communicates "July is here."',
    execution: 'Stylized freight manifest layout welcoming the new month while reinforcing Grosvenor\'s logistics readiness.'
  },
  {
    image: 'assets/images/Grosvenor Section/1st_Augustl_GGSL_New Month.webp',
    tag: 'ECOSYSTEM SHOWCASE & 8TH MONTH',
    title: 'August Multimodal Service Ecosystem',
    brief: 'An 8-shape design showing everything Grosvenor does.',
    interpretation: 'It celebrates the eighth month, which is August, while mapping full multi-modal capabilities.',
    execution: 'Custom isometric "8" loop illustrating Grosvenor\'s comprehensive maritime freight, energy distribution, and logistics.'
  }
];

// Ektos UI/UX Onboarding Flow Data (5 Large High-Definition Screens)
const ektosOnboardingSteps = [
  {
    image: 'assets/images/Onboarding page 1.webp',
    stageNumber: '01',
    stepTitle: '01. Welcome & Proposition',
    mainTitle: 'Stage 1: Core Value Proposition & Orientation',
    desc: 'Establishes immediate emotional resonance and clarity. Clean typography and generous whitespace focus user attention directly on the central benefit without overwhelming them with dense setup forms.',
    p1Title: 'Progressive Disclosure',
    p1Desc: 'Reveals information step-by-step to prevent cognitive overload during first-time app launch.',
    p2Title: 'Friction Reduction',
    p2Desc: 'Thumb-zone friendly CTA placement optimizing one-handed navigation on modern mobile displays.'
  },
  {
    image: 'assets/images/Onboarding page 2.webp',
    stageNumber: '02',
    stepTitle: '02. Goal Calibration',
    mainTitle: 'Stage 2: Personalized Goal Setting & Customization',
    desc: 'Empowers users to customize their journey right away. Interactive selection chips record user preferences in real time to tailor their dashboard experience before they reach the home view.',
    p1Title: 'User Agency',
    p1Desc: 'Giving users choice increases retention by establishing early psychological investment in the app.',
    p2Title: 'Instant Feedback',
    p2Desc: 'Selected parameters trigger subtle haptic states and visual confirmation indicators.'
  },
  {
    image: 'assets/images/Onboarding page 3.webp',
    stageNumber: '03',
    stepTitle: '03. Wealth Systems',
    mainTitle: 'Stage 3: Interactive Exploration & Core Tooling',
    desc: 'Demonstrates key budgeting and investment functionality through interactive visual previews rather than passive text walls, accelerating user time-to-value (TTV) and feature adoption.',
    p1Title: 'Contextual Tooltips',
    p1Desc: 'Actionable micro-copy guides users toward high-impact features naturally.',
    p2Title: 'Visual Scaffolding',
    p2Desc: 'Familiar UI components ensure users never feel lost or confused.'
  },
  {
    image: 'assets/images/Onboarding page 4.webp',
    stageNumber: '04',
    stepTitle: '04. Community Sync',
    mainTitle: 'Stage 4: Real-time Community & Collaboration',
    desc: 'Highlights social proof, live activity streams, and peer collaboration features, fostering a strong sense of belonging and ongoing community engagement.',
    p1Title: 'Social Proof Integration',
    p1Desc: 'Live activity avatars build immediate credibility and user confidence.',
    p2Title: 'Network Effects',
    p2Desc: 'Frictionless invite mechanisms enable organic peer-to-peer growth.'
  },
  {
    image: 'assets/images/Onboarding page 5.webp',
    stageNumber: '05',
    stepTitle: '05. Instant Launch',
    mainTitle: 'Stage 5: Account Activation & One-Click Launch',
    desc: 'Streamlined authentication screen with biometric and one-tap social login, transitioning the user seamlessly from onboarding into their fully personalized active workspace.',
    p1Title: 'Zero-Password Friction',
    p1Desc: 'Supports biometric and OAuth 2.0 logins to prevent onboarding drop-off.',
    p2Title: 'Celebratory Handoff',
    p2Desc: 'Smooth transition animation signals completion and launches the primary user dashboard.'
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

  // IntersectionObserver for active link state
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
}

// ==========================================================================
// 4. PROJECT CATEGORY FILTERS & EXPANDABLE PRODUCT SYSTEMS
// ==========================================================================

let isProductsExpanded = false;

function toggleProductSystems(forceState) {
  const productCards = document.querySelectorAll('.project-card.product-system-card');
  const btn = document.getElementById('toggleProductsBtn');
  const btnText = document.getElementById('toggleProductsBtnText');

  if (typeof forceState === 'boolean') {
    isProductsExpanded = forceState;
  } else {
    isProductsExpanded = !isProductsExpanded;
  }

  productCards.forEach(card => {
    if (isProductsExpanded) {
      card.classList.remove('is-extended-hidden', 'is-hidden', 'is-filtering-out');
    } else {
      card.classList.add('is-extended-hidden');
    }
  });

  if (btn) {
    btn.classList.toggle('expanded', isProductsExpanded);
    btn.setAttribute('aria-expanded', isProductsExpanded ? 'true' : 'false');
  }

  if (btnText) {
    btnText.textContent = isProductsExpanded ? 'Hide Product Systems (3)' : 'See More Case Studies (Product & Systems)';
  }

  if (isProductsExpanded && typeof forceState !== 'boolean') {
    const firstProduct = document.querySelector('.project-card.product-system-card');
    if (firstProduct) {
      firstProduct.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const expandBox = document.getElementById('expandProductBox');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      if (filterTimeoutId) {
        clearTimeout(filterTimeoutId);
        filterTimeoutId = null;
      }

      if (filter === 'featured') {
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (category === 'campaign' || category === 'ops') {
            card.classList.remove('is-hidden', 'is-filtering-out');
          } else {
            card.classList.add('is-filtering-out');
          }
        });
        toggleProductSystems(false);
        if (expandBox) expandBox.classList.remove('is-hidden');
      } else if (filter === 'all') {
        projectCards.forEach(card => {
          card.classList.remove('is-extended-hidden', 'is-hidden', 'is-filtering-out');
        });
        if (expandBox) expandBox.classList.add('is-hidden');
      } else if (filter === 'product') {
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (category === 'product') {
            card.classList.remove('is-extended-hidden', 'is-hidden', 'is-filtering-out');
          } else {
            card.classList.add('is-filtering-out');
          }
        });
        if (expandBox) expandBox.classList.add('is-hidden');
      } else {
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (category === filter) {
            card.classList.remove('is-hidden', 'is-filtering-out');
          } else {
            card.classList.add('is-filtering-out');
          }
        });
        if (expandBox) expandBox.classList.add('is-hidden');
      }

      filterTimeoutId = setTimeout(() => {
        projectCards.forEach(card => {
          if (card.classList.contains('is-filtering-out')) {
            card.classList.add('is-hidden');
          }
        });
      }, 250);
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

  // Main Viewport Tap Navigation & Lightbox Expand
  if (mainViewport) {
    mainViewport.addEventListener('click', (e) => {
      const zoomPill = e.target.closest('.slider-zoom-pill');
      if (zoomPill) {
        const current = tratunCampaigns[currentIndex];
        openLightbox(current.image, current.title, `${current.brief} | ${current.execution}`);
        return;
      }

      // Tap on left 45% -> Previous slide, right 55% -> Next slide
      const rect = mainViewport.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX < rect.width * 0.45) {
        updateSlide(currentIndex - 1);
      } else {
        updateSlide(currentIndex + 1);
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

  // Main Viewport Tap Navigation & Lightbox Expand
  if (mainViewport) {
    mainViewport.addEventListener('click', (e) => {
      const zoomPill = e.target.closest('.slider-zoom-pill');
      if (zoomPill) {
        const current = grosvenorCampaigns[currentIndex];
        openLightbox(current.image, current.title, current.objective);
        return;
      }

      // Tap on left 45% -> Previous slide, right 55% -> Next slide
      const rect = mainViewport.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX < rect.width * 0.45) {
        updateSlide(currentIndex - 1);
      } else {
        updateSlide(currentIndex + 1);
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
// 7. EKTOS UI/UX ONBOARDING CAROUSEL
// ==========================================================================

function initEktosCarousel() {
  const track = document.getElementById('ektosCarouselTrack');
  const prevBtn = document.getElementById('ektosPrevSlide');
  const nextBtn = document.getElementById('ektosNextSlide');
  const dotsContainer = document.getElementById('ektosCarouselDots');

  if (!track) return;

  const cards = track.querySelectorAll('.ektos-slide-card');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot-btn') : [];

  function getCardWidth() {
    if (cards.length === 0) return 320;
    const cardRect = cards[0].getBoundingClientRect();
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 28;
    return cardRect.width + gap;
  }

  function updateDots() {
    if (!dots || dots.length === 0) return;
    const scrollPos = track.scrollLeft;
    const cardWidth = getCardWidth();
    const activeIndex = Math.min(
      Math.max(0, Math.round(scrollPos / cardWidth)),
      cards.length - 1
    );

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }

  if (dots && dots.length > 0) {
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        track.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
      });
    });
  }

  let isScrolling;
  track.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(updateDots, 60);
  }, { passive: true });
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
      if (modalImg) modalImg.style.display = 'none';
      modalVideo.play().catch(() => {});
    } else if (modalImg) {
      modalImg.src = mediaSrc;
      modalImg.alt = title || 'Artwork preview';
      modalImg.style.display = 'block';
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
  const modalVideo = document.getElementById('lightboxVideo');
  if (modal) {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
      modalVideo.style.display = 'none';
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

