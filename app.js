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

// Tratun Energy Campaign Suite (All 10 Featured Designs from "Tratun section" folder)
const tratunCampaigns = [
  {
    image: 'assets/images/Tratun section/tratun-tanker-campaign.png',
    tag: 'BRAND AWARENESS CAMPAIGN',
    title: 'The Human Fuel (Curved Road Smile Metaphor)',
    objective: 'Create a brand awareness post for Tratun Energy that conveys warmth and human connection while maintaining corporate authority in industrial downstream logistics.',
    concept: 'Employed a curved highway as an elegant visual metaphor for a smile, with the Tratun fuel tanker naturally completing the expression mid-transit across a clean white canvas.',
    impact: 'Approved on first iteration with zero revisions. Successfully deployed across Tratun\'s LinkedIn and Instagram channels to high audience reception.'
  },
  {
    image: 'assets/images/Tratun section/13th_July_Tratun_ When Everything Fits..jpg',
    tag: 'SUPPLY CHAIN & LOGISTICS',
    title: 'When Everything Fits (Precision Supply Logistics)',
    objective: 'Demonstrate operational precision, exact volumetric measurement, and seamless depot-to-site delivery for downstream commercial clients.',
    concept: 'Architectural alignment visual concept illustrating how Tratun\'s energy dispatch fits flawlessly into manufacturing schedules and facility operations.',
    impact: 'Established B2B trust among plant managers, highlighting zero operational downtime and dependable fuel delivery cycles.'
  },
  {
    image: 'assets/images/Tratun section/17th_June_Tratun_ switch to Tratun-.jpg',
    tag: 'CONVERSION & CLIENT TRANSITION',
    title: 'Switch to Tratun (Energy Reliability & Quality)',
    objective: 'Drive industrial facility conversion by contrasting frequent supplier shortages with Tratun\'s guaranteed premium diesel and fuel continuity.',
    concept: 'High-contrast industrial yellow and obsidian aesthetic with bold directive typography emphasizing immediate switch benefits.',
    impact: 'Generated high inbound engagement from procurement heads seeking reliable bulk diesel supply agreements.'
  },
  {
    image: 'assets/images/Tratun section/20th_July_Tratun_ Know Your Oil — Engine Oil Education.jpg',
    tag: 'EDUCATIONAL & PRODUCT INTEGRITY',
    title: 'Know Your Oil — Lubricant Performance Standards',
    objective: 'Educate logistics fleet managers and industrial vehicle operators on motor oil viscosity tiers and engine preservation.',
    concept: 'Clean visual hierarchy translating complex lubricant specifications, temperature tolerances, and API ratings into clear operational guidelines.',
    impact: 'Positioned Tratun as a technical advisor in equipment maintenance, driving lubricant product line inquiries.'
  },
  {
    image: 'assets/images/Tratun section/7th_August_Tratun_Why choose Tratun coal.jpg',
    tag: 'INDUSTRIAL SOLID FUELS',
    title: 'Why Choose Tratun Coal (Thermal Efficiency)',
    objective: 'Promote Tratun\'s solid energy portfolio, positioning high-grade thermal coal as a cost-effective power source for heavy industries.',
    concept: 'Raw industrial photography paired with sharp, high-contrast metric callouts highlighting calorific energy value and low residue emissions.',
    impact: 'Expanded commercial conversations into cement manufacturing, smelting, and heavy industrial boiler sectors.'
  },
  {
    image: 'assets/images/Tratun section/12th_August_Tratun_international youth day=.jpg',
    tag: 'CORPORATE SOCIAL IMPACT',
    title: 'International Youth Day — Fueling Ambition',
    objective: 'Celebrate Nigerian youth innovation and reinforce Tratun\'s commitment to economic empowerment through accessible energy.',
    concept: 'Warm, dynamic human photography integrated with sleek vector brand elements, communicating vitality and future ambition.',
    impact: 'Broad social reach and strong corporate sentiment across LinkedIn and Instagram community followers.'
  },
  {
    image: 'assets/images/Tratun section/1st_July_Tratun_Happy new month.jpg',
    tag: 'EXECUTIVE BRANDING',
    title: 'New Month Drive — Operational Momentum',
    objective: 'Mark Q3 operational commencement while affirming uninterrupted 24/7 delivery commitments to all enterprise partners.',
    concept: 'Sleek dark-mode aesthetic with ambient gold lighting accents, reinforcing premium corporate stature.',
    impact: 'Maintained high brand top-of-mind recall among corporate stakeholders and supply chain partners.'
  },
  {
    image: 'assets/images/Tratun section/21st_June_Tratun_ Happy Father\'s Day.jpg',
    tag: 'SPECIAL CAMPAIGN',
    title: 'Father\'s Day — The Backbone of Industry',
    objective: 'Humanize industrial logistics by drawing a parallel between the dedication of fathers and the steadfast reliability of energy.',
    concept: 'Evocative visual framing honoring fathers across the industrial workforce with warm typography and corporate balance.',
    impact: 'Achieved high organic share rates and deep community resonance across social touchpoints.'
  },
  {
    image: 'assets/images/Tratun section/1.jpg',
    tag: 'BRAND VALUE PROPOSITION',
    title: 'Downstream Supply Reliability & Fleet Excellence',
    objective: 'Position Tratun as the primary partner for corporate fleet fuel management and nationwide bulk diesel fulfillment.',
    concept: 'Clean brand framing with high-visibility fleet logistics imagery and strong brand typography.',
    impact: 'Highlighted comprehensive logistics network and round-the-clock commercial readiness.'
  },
  {
    image: 'assets/images/Tratun section/Monday, 17th August, 2026 How downstream Oil and gas matters for your business.jpg',
    tag: 'EXECUTIVE ADVISORY & INSIGHTS',
    title: 'Downstream Oil & Gas Strategy (Business Resilience)',
    objective: 'Educate corporate stakeholders on managing energy inflation, securing supply chains, and preventing manufacturing downtime.',
    concept: 'Structured editorial layout with clear data hierarchy, risk management metrics, and corporate typography.',
    impact: 'Established thought leadership and drove consultative engagements with commercial partners.'
  }
];

// Grosvenor Global Services Campaign Suite (5 Verified Images from Grosvenor Section)
const grosvenorCampaigns = [
  {
    image: 'assets/images/Grosvenor Section/grosvenor-hivis-campaign.png',
    tag: 'AUTHORITY POSITIONING',
    title: 'A Mission Isn\'t a Statement, It\'s a Standard',
    objective: 'Demonstrate Grosvenor\'s 10-year operational standard across industrial facilities and position the firm as the benchmark in operational reliability.',
    concept: 'Placed the brand message directly onto a frontline worker\'s hi-vis jacket with split lighting (dawn to dusk) across an oil refinery background, visualizing 24/7 continuous operations.',
    impact: 'Published on LinkedIn to corporate stakeholders, establishing an authoritative benchmark for technical service excellence.'
  },
  {
    image: 'assets/images/Grosvenor Section/grosvenor-reveal.jpg',
    tag: 'SYSTEMS COMPOSITING',
    title: 'Reveal the Pieces (Integrated Logistics Architecture)',
    objective: 'Demystify complex multi-modal supply chains by highlighting how marine freight, depot storage, and road fleet connect seamlessly.',
    concept: 'Conceptual jigsaw puzzle composite visual where each interlocking piece reveals a critical node of Grosvenor\'s end-to-end logistics.',
    impact: 'Widely praised by corporate procurement directors for simplifying multi-tier operational logistics into an elegant visual.'
  },
  {
    image: 'assets/images/Grosvenor Section/Have you filled up....png',
    tag: 'OPERATIONAL READINESS',
    title: 'Have You Filled Up? (Commercial Energy Continuity)',
    objective: 'Drive proactive commercial fuel ordering to prevent unexpected plant downtime during peak production cycles.',
    concept: 'High-impact corporate graphic with bold inquiry typography, high-visibility tanker dispatch visuals, and immediate CTA fulfillment channels.',
    impact: 'Generated direct inquiries from plant operations and fleet procurement managers across industrial corridors.'
  },
  {
    image: 'assets/images/Grosvenor Section/1st_Augustl_GGSL_New Month.jpg',
    tag: 'EXECUTIVE BRANDING',
    title: 'August Executive Campaign — Continuous Industrial Velocity',
    objective: 'Deliver an executive mid-Q3 message emphasizing reliability, safety compliance, and uninterrupted industrial fuel flow.',
    concept: 'Sophisticated typography on deep violet-obsidian gradient with refined metallic highlights and the 10-year anniversary emblem.',
    impact: 'Reinforced premium brand stature and contract retention among enterprise partners.'
  },
  {
    image: 'assets/images/Grosvenor Section/1st_Julyl_GGSL_New Month.jpg',
    tag: 'CORPORATE ENGAGEMENT',
    title: 'July Corporate Momentum — Powering Client Growth',
    objective: 'Acknowledge enterprise partnerships and reinforce Grosvenor\'s pledge of operational uptime and industrial safety.',
    concept: 'Clean corporate framing highlighting human and machine synergy in heavy industry with precision typography.',
    impact: 'Consistent engagement and relationship reinforcement across B2B channels.'
  }
];

// Ektos UI/UX Onboarding Flow Data (5 Large High-Definition Screens)
const ektosOnboardingSteps = [
  {
    image: 'assets/images/Onboarding page 1.png',
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
    image: 'assets/images/Onboarding page 2.png',
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
    image: 'assets/images/Onboarding page 3.png',
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
    image: 'assets/images/Onboarding page 4.png',
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
    image: 'assets/images/Onboarding page 5.png',
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
  initEktosOnboarding();
  initVideoInteractions();
  initKeyboardEvents();
  initInteractiveMedia();
  initVisualEditor();
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
// 5. TRATUN ENERGY SIDE-BY-SIDE SLIDER
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
    <button class="slider-film-thumb ${idx === 0 ? 'active' : ''}" data-idx="${idx}" aria-label="View Tratun design ${idx + 1}: ${item.title}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
    </button>
  `).join('');

  const thumbButtons = thumbsContainer.querySelectorAll('.slider-film-thumb');

  function updateSlide(index) {
    currentIndex = (index + tratunCampaigns.length) % tratunCampaigns.length;
    const current = tratunCampaigns[currentIndex];

    // Smooth quick transition
    mainImg.classList.add('fade-out');
    if (briefContent) briefContent.classList.add('fade-out');

    setTimeout(() => {
      mainImg.src = current.image;
      mainImg.alt = current.title;

      if (counter) {
        counter.textContent = `Design ${currentIndex + 1} of ${tratunCampaigns.length}`;
      }

      if (briefTag) briefTag.innerHTML = `<i class="fa-solid fa-tag"></i> ${current.tag}`;
      if (briefTitle) briefTitle.textContent = current.title;
      if (briefDesc) briefDesc.textContent = current.objective;
      if (briefConcept) briefConcept.textContent = current.concept;
      if (briefImpact) briefImpact.textContent = current.impact;

      thumbButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === currentIndex);
      });

      mainImg.classList.remove('fade-out');
      if (briefContent) briefContent.classList.remove('fade-out');
    }, 120);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
  }

  thumbButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      updateSlide(idx);
    });
  });

  if (mainViewport) {
    mainViewport.addEventListener('click', () => {
      const current = tratunCampaigns[currentIndex];
      openLightbox(current.image, current.title, current.objective);
    });
  }
}

// ==========================================================================
// 6. GROSVENOR GLOBAL SERVICES SIDE-BY-SIDE SLIDER
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
    <button class="slider-film-thumb ${idx === 0 ? 'active' : ''}" data-idx="${idx}" aria-label="View Grosvenor design ${idx + 1}: ${item.title}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
    </button>
  `).join('');

  const thumbButtons = thumbsContainer.querySelectorAll('.slider-film-thumb');

  function updateSlide(index) {
    currentIndex = (index + grosvenorCampaigns.length) % grosvenorCampaigns.length;
    const current = grosvenorCampaigns[currentIndex];

    // Smooth quick transition
    mainImg.classList.add('fade-out');
    if (briefContent) briefContent.classList.add('fade-out');

    setTimeout(() => {
      mainImg.src = current.image;
      mainImg.alt = current.title;

      if (counter) {
        counter.textContent = `Design ${currentIndex + 1} of ${grosvenorCampaigns.length}`;
      }

      if (briefTag) briefTag.innerHTML = `<i class="fa-solid fa-tag"></i> ${current.tag}`;
      if (briefTitle) briefTitle.textContent = current.title;
      if (briefDesc) briefDesc.textContent = current.objective;
      if (briefConcept) briefConcept.textContent = current.concept;
      if (briefImpact) briefImpact.textContent = current.impact;

      thumbButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === currentIndex);
      });

      mainImg.classList.remove('fade-out');
      if (briefContent) briefContent.classList.remove('fade-out');
    }, 120);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
  }

  thumbButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      updateSlide(idx);
    });
  });

  if (mainViewport) {
    mainViewport.addEventListener('click', () => {
      const current = grosvenorCampaigns[currentIndex];
      openLightbox(current.image, current.title, current.objective);
    });
  }
}

// ==========================================================================
// 7. EKTOS UI/UX ONBOARDING SHOWCASE
// ==========================================================================

function initEktosOnboarding() {
  let currentStep = 0;
  const screenImg = document.getElementById('ektosScreenImg');
  const phoneFrame = document.getElementById('ektosPhoneFrame');
  const textContent = document.getElementById('ektosTextContent');
  const stageTitle = document.getElementById('ektosStageTitle');
  const stageDesc = document.getElementById('ektosStageDesc');
  const stepperPills = document.querySelectorAll('.onboarding-step-pill');
  const thumbBtns = document.querySelectorAll('.onboarding-thumb-btn');
  const prevBtn = document.getElementById('ektosPrevBtn');
  const nextBtn = document.getElementById('ektosNextBtn');

  if (!screenImg || ektosOnboardingSteps.length === 0) return;

  function updateStep(index) {
    currentStep = (index + ektosOnboardingSteps.length) % ektosOnboardingSteps.length;
    const step = ektosOnboardingSteps[currentStep];

    screenImg.classList.add('fade-out');
    if (textContent) textContent.classList.add('fade-out');

    setTimeout(() => {
      screenImg.src = step.image;
      screenImg.alt = step.mainTitle;

      if (stageTitle) stageTitle.textContent = step.mainTitle;
      if (stageDesc) stageDesc.textContent = step.desc;

      stepperPills.forEach((pill, idx) => {
        pill.classList.toggle('active', idx === currentStep);
      });

      thumbBtns.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentStep);
      });

      screenImg.classList.remove('fade-out');
      if (textContent) textContent.classList.remove('fade-out');
    }, 120);
  }

  stepperPills.forEach((pill, idx) => {
    pill.addEventListener('click', () => updateStep(idx));
  });

  thumbBtns.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => updateStep(idx));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateStep(currentStep - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateStep(currentStep + 1));
  }

  if (phoneFrame) {
    phoneFrame.addEventListener('click', () => {
      const step = ektosOnboardingSteps[currentStep];
      openLightbox(step.image, step.mainTitle, step.desc);
    });
  }
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

function openResumeModal() {
  lastActiveElement = document.activeElement;
  const modal = document.getElementById('resumeModal');
  const closeBtn = modal ? modal.querySelector('.modal-close-btn') : null;

  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  }
}

function closeResumeModal(event) {
  const modal = document.getElementById('resumeModal');
  if (modal) {
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
// 12. AI BRAIN DUMP SIMULATOR
// ==========================================================================

function runBrainDumpSimulation() {
  const input = document.getElementById('simInput');
  const output = document.getElementById('simOutput');
  if (!input || !output) return;

  const rawText = input.value.trim();
  const text = rawText || "Need to review Tratun tanker carousel and export 4 video title cards for CareerPaddy tomorrow at 2pm";

  if (!rawText) {
    input.value = text;
  }

  let dynamicTasks = [];
  const lower = text.toLowerCase();

  if (lower.includes('review') || lower.includes('tratun') || lower.includes('carousel')) {
    dynamicTasks.push({
      title: "Review visual narrative and export final carousel graphics",
      tag: "TRATUN",
      priority: "HIGH",
      time: "Tomorrow 2:00 PM"
    });
  }

  if (lower.includes('video') || lower.includes('careerpaddy') || lower.includes('cards') || lower.includes('export')) {
    dynamicTasks.push({
      title: "Export 4 modular title cards across skill difficulty tiers",
      tag: "CAREERPADDY",
      priority: "NORMAL",
      time: "Pending"
    });
  }

  if (lower.includes('app') || lower.includes('hindsight') || lower.includes('exam') || lower.includes('design') || lower.includes('ektos')) {
    dynamicTasks.push({
      title: "Map student diagnostic mock examination user flows",
      tag: "HINDSIGHT AI",
      priority: "CRITICAL",
      time: "Friday 10:00 AM"
    });
  }

  if (dynamicTasks.length === 0) {
    dynamicTasks = [
      { title: `Parse & organize requirements: "${text.slice(0, 42)}..."`, tag: "STRATEGY", priority: "HIGH", time: "Today" },
      { title: "Generate responsive UI layout and component tokens", tag: "DESIGN", priority: "NORMAL", time: "Pending" },
      { title: "Dispatch automated status notification to Telegram alert bot", tag: "SYSTEM", priority: "AUTOMATED", time: "Instant" }
    ];
  } else {
    dynamicTasks.push({
      title: "Push weekly productivity metrics & tasks to Telegram channel",
      tag: "ENIGMA OS",
      priority: "AUTOMATED",
      time: "Daily 6:00 PM"
    });
  }

  output.innerHTML = `
    <div style="color: var(--accent-emerald); font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
      <i class="fa-solid fa-check-circle"></i> AI Parser Extracted ${dynamicTasks.length} Structured Action Items:
    </div>
    ${dynamicTasks.map(t => `
      <div class="task-item">
        <div>
          <strong style="color: var(--accent-cyan);">[${t.tag}]</strong> ${t.title}
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-shrink: 0; margin-left: 0.5rem;">
          <span style="background: rgba(56, 189, 248, 0.15); color: var(--accent-cyan); padding: 2px 6px; border-radius: 4px; font-size: 0.7rem;">${t.time}</span>
          <span style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); padding: 2px 6px; border-radius: 4px; font-size: 0.7rem;">${t.priority}</span>
        </div>
      </div>
    `).join('')}
    <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.4rem;">
      ➔ Dispatched to Supabase DB & synced to Telegram alert channel via pg_cron.
    </div>
  `;
  output.style.display = 'flex';
}

// ==========================================================================
// 13. IN-BROWSER VISUAL & LAYOUT EDITOR ENGINE (OPTION 2)
// ==========================================================================

let isEditModeActive = false;
let areHighlightsActive = true;
let visualEdits = {};
let activeTargetImg = null;

const STORAGE_KEY = 'enigma_portfolio_visual_edits';

function initVisualEditor() {
  loadSavedEdits();

  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'e' || e.key === 'E')) {
      e.preventDefault();
      toggleEditMode();
    }
  });

  const fileInput = document.getElementById('imageSwapFile');
  const previewImg = document.getElementById('imageSwapPreview');
  const pathInput = document.getElementById('imageSwapPath');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (previewImg) previewImg.src = event.target.result;
          if (pathInput) pathInput.value = `assets/images/${file.name}`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (pathInput) {
    pathInput.addEventListener('input', (e) => {
      if (previewImg && e.target.value.trim()) {
        previewImg.src = e.target.value.trim();
      }
    });
  }
}

function loadSavedEdits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      visualEdits = JSON.parse(raw);
      applySavedEdits();
      updateEditsBadge();
    }
  } catch (err) {
    console.warn('Could not load visual edits from storage:', err);
  }
}

function saveEditsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visualEdits));
    updateEditsBadge();
  } catch (err) {
    console.warn('Could not save visual edits to storage:', err);
  }
}

function updateEditsBadge() {
  const badge = document.getElementById('editorEditsCounter');
  if (badge) {
    const count = Object.keys(visualEdits).length;
    badge.textContent = `${count} Edit${count === 1 ? '' : 's'}`;
  }
}

function getEditableSelector(el) {
  if (el.id) return `#${el.id}`;
  
  let path = [];
  let current = el;
  while (current && current !== document.body && current !== document.documentElement) {
    let selector = current.tagName.toLowerCase();
    if (current.id) {
      selector = `#${current.id}`;
      path.unshift(selector);
      break;
    } else if (current.className && typeof current.className === 'string') {
      const cleanClass = current.className.split(' ').filter(c => c && !c.startsWith('editor') && !c.startsWith('is-') && c !== 'active' && c !== 'just-moved')[0];
      if (cleanClass) selector += `.${cleanClass}`;
    }
    
    if (current.parentElement) {
      const siblings = Array.from(current.parentElement.children).filter(c => c.tagName === current.tagName);
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        selector += `:nth-of-type(${index})`;
      }
    }
    path.unshift(selector);
    current = current.parentElement;
  }
  return path.join(' > ');
}

function applySavedEdits() {
  Object.keys(visualEdits).forEach(key => {
    const edit = visualEdits[key];
    const el = document.querySelector(key);
    if (el) {
      if (edit.type === 'text') {
        el.innerHTML = edit.value;
      } else if (edit.type === 'image') {
        el.src = edit.value;
      } else if (edit.type === 'deleted') {
        el.style.display = 'none';
      } else if (edit.type === 'layout-flip') {
        el.classList.toggle('reversed', edit.reversed);
      }
    }
  });
}

function toggleEditMode(forceState) {
  if (typeof forceState === 'boolean') {
    isEditModeActive = forceState;
  } else {
    isEditModeActive = !isEditModeActive;
  }

  document.body.classList.toggle('editor-active', isEditModeActive);
  const toolbar = document.getElementById('editorToolbar');
  const adminBtn = document.getElementById('adminModeBtn');

  if (toolbar) {
    toolbar.style.display = isEditModeActive ? 'flex' : 'none';
  }

  if (adminBtn) {
    adminBtn.classList.toggle('active', isEditModeActive);
    adminBtn.innerHTML = isEditModeActive ? 
      '<i class="fa-solid fa-check"></i> <span>Editing Active (Alt+E)</span>' : 
      '<i class="fa-solid fa-pen-to-square"></i> <span>Edit Mode (Alt+E)</span>';
  }

  // 1. Setup Editable Text Elements
  const textCandidates = document.querySelectorAll(
    'h1, h2, h3, h4, h5, p, .project-badge, .project-timeline, .tech-tag, .bio-title, .hero-status-pill, .stat-value, .stat-label, .timeline-role, .timeline-org, .timeline-meta, .section-heading, .section-subheading'
  );

  textCandidates.forEach(el => {
    if (el.closest('.visual-editor-toolbar') || el.closest('#imageSwapModal') || el.closest('.editor-layout-bar') || el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') return;

    if (isEditModeActive) {
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('data-editable', 'true');
      el.setAttribute('spellcheck', 'false');

      if (!el._hasEditorListener) {
        el.addEventListener('input', () => {
          const selector = getEditableSelector(el);
          visualEdits[selector] = {
            type: 'text',
            value: el.innerHTML
          };
          saveEditsToStorage();
        });
        el._hasEditorListener = true;
      }
    } else {
      el.removeAttribute('contenteditable');
      el.removeAttribute('data-editable');
    }
  });

  // 2. Setup Image Replace Overlays
  setupImageReplacers(isEditModeActive);

  // 3. Setup Layout Controls (Flip Sides, Reorder, Delete)
  setupLayoutControls(isEditModeActive);

  showToast(isEditModeActive ? '✨ Visual & Layout Editor Active — Click text, swap images, or flip/move cards!' : 'Visual Edit Mode Closed');
}

function setupImageReplacers(enable) {
  const images = document.querySelectorAll(
    '.side-slider-main-img, .media-hero-img, .portrait-img, .gallery-item img, .project-media-card-sub img, .slider-film-thumb img'
  );

  images.forEach(img => {
    let parent = img.parentElement;
    let trigger = parent ? parent.querySelector('.image-replace-trigger') : null;

    if (enable) {
      parent.classList.add('editable-image-container');
      if (!trigger) {
        trigger = document.createElement('button');
        trigger.className = 'image-replace-trigger';
        trigger.innerHTML = '<i class="fa-solid fa-camera"></i> Replace';
        trigger.onclick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          openImageSwapper(img);
        };
        parent.appendChild(trigger);
      }
      trigger.style.display = 'flex';
    } else {
      if (trigger) trigger.style.display = 'none';
      if (parent) parent.classList.remove('editable-image-container');
    }
  });
}

function setupLayoutControls(enable) {
  // Add control bar to all project cards & main sections
  const containers = document.querySelectorAll('.project-card, section[id]:not(.hero-section)');

  containers.forEach(container => {
    let bar = container.querySelector(':scope > .editor-layout-bar');

    if (enable) {
      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'editor-layout-bar';

        const isCard = container.classList.contains('project-card');
        const splitChild = container.querySelector('.campaign-showcase-split, .project-inner');

        let buttonsHTML = '';

        // Flip sides button (for cards with 2 columns)
        if (splitChild) {
          buttonsHTML += `<button class="layout-bar-btn flip-btn" title="Swap Image & Text Sides"><i class="fa-solid fa-arrows-left-right"></i> Flip Sides</button>`;
        }

        // Move Up & Move Down
        buttonsHTML += `
          <button class="layout-bar-btn up-btn" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
          <button class="layout-bar-btn down-btn" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
          <button class="layout-bar-btn delete-btn" title="${isCard ? 'Delete / Hide Card' : 'Delete / Hide Section'}"><i class="fa-solid fa-trash-can"></i></button>
        `;

        bar.innerHTML = buttonsHTML;

        // Bind Flip
        const flipBtn = bar.querySelector('.flip-btn');
        if (flipBtn && splitChild) {
          flipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isReversed = splitChild.classList.toggle('reversed');
            splitChild.classList.add('just-moved');
            setTimeout(() => splitChild.classList.remove('just-moved'), 800);

            const selector = getEditableSelector(splitChild);
            visualEdits[selector] = {
              type: 'layout-flip',
              reversed: isReversed
            };
            saveEditsToStorage();
            showToast('Layout flipped successfully!');
          });
        }

        // Bind Move Up
        const upBtn = bar.querySelector('.up-btn');
        if (upBtn) {
          upBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const prev = container.previousElementSibling;
            if (prev && (prev.classList.contains('project-card') || prev.tagName === 'SECTION')) {
              container.parentNode.insertBefore(container, prev);
              container.classList.add('just-moved');
              setTimeout(() => container.classList.remove('just-moved'), 800);
              showToast('Moved up!');
            }
          });
        }

        // Bind Move Down
        const downBtn = bar.querySelector('.down-btn');
        if (downBtn) {
          downBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const next = container.nextElementSibling;
            if (next && (next.classList.contains('project-card') || next.tagName === 'SECTION')) {
              container.parentNode.insertBefore(next, container);
              container.classList.add('just-moved');
              setTimeout(() => container.classList.remove('just-moved'), 800);
              showToast('Moved down!');
            }
          });
        }

        // Bind Delete
        const delBtn = bar.querySelector('.delete-btn');
        if (delBtn) {
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = container.querySelector('h3, h2')?.textContent?.trim() || 'this item';
            if (confirm(`Are you sure you want to remove ${title}?`)) {
              container.style.display = 'none';
              const selector = getEditableSelector(container);
              visualEdits[selector] = {
                type: 'deleted',
                value: 'none'
              };
              saveEditsToStorage();
              showToast('Item removed from view');
            }
          });
        }

        container.appendChild(bar);
      }
      bar.style.display = 'flex';
    } else {
      if (bar) bar.style.display = 'none';
    }
  });
}

function toggleEditorHighlights() {
  areHighlightsActive = !areHighlightsActive;
  document.body.classList.toggle('hide-highlights', !areHighlightsActive);
  const btn = document.getElementById('editorHighlightToggle');
  if (btn) {
    btn.innerHTML = areHighlightsActive ? 
      '<i class="fa-solid fa-highlighter"></i> Outlines' : 
      '<i class="fa-regular fa-eye-slash"></i> Clean View';
  }
}

function openImageSwapper(imgElement) {
  activeTargetImg = imgElement;
  const modal = document.getElementById('imageSwapModal');
  const previewImg = document.getElementById('imageSwapPreview');
  const pathInput = document.getElementById('imageSwapPath');
  const fileInput = document.getElementById('imageSwapFile');

  if (previewImg) previewImg.src = imgElement.src;
  if (pathInput) pathInput.value = imgElement.getAttribute('src') || '';
  if (fileInput) fileInput.value = '';

  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeImageSwapModal() {
  const modal = document.getElementById('imageSwapModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  activeTargetImg = null;
}

function applyImageSwap() {
  if (!activeTargetImg) return;
  const previewImg = document.getElementById('imageSwapPreview');
  const pathInput = document.getElementById('imageSwapPath');
  const newSrc = pathInput && pathInput.value.trim() ? pathInput.value.trim() : (previewImg ? previewImg.src : '');

  if (newSrc) {
    activeTargetImg.src = newSrc;
    const selector = getEditableSelector(activeTargetImg);
    visualEdits[selector] = {
      type: 'image',
      value: newSrc
    };
    saveEditsToStorage();
    showToast('Image updated successfully!');
  }
  closeImageSwapModal();
}

function resetAllVisualEdits() {
  if (confirm('Are you sure you want to reset all visual and layout edits back to original default?')) {
    localStorage.removeItem(STORAGE_KEY);
    visualEdits = {};
    location.reload();
  }
}

function exportVisualEdits() {
  const clone = document.documentElement.cloneNode(true);

  clone.classList.remove('editor-active', 'hide-highlights');
  clone.querySelectorAll('.image-replace-trigger').forEach(t => t.remove());
  clone.querySelectorAll('.editor-layout-bar').forEach(b => b.remove());
  clone.querySelectorAll('[contenteditable]').forEach(el => {
    el.removeAttribute('contenteditable');
    el.removeAttribute('data-editable');
    el.removeAttribute('spellcheck');
  });
  clone.querySelectorAll('.editable-image-container').forEach(c => c.classList.remove('editable-image-container'));
  clone.querySelectorAll('.just-moved').forEach(c => c.classList.remove('just-moved'));

  const toolbar = clone.querySelector('#editorToolbar');
  if (toolbar) toolbar.style.display = 'none';

  const swapModal = clone.querySelector('#imageSwapModal');
  if (swapModal) {
    swapModal.style.display = 'none';
    swapModal.classList.remove('active');
  }

  const cleanHTML = '<!DOCTYPE html>\n<html lang="en">\n' + clone.innerHTML + '\n</html>';

  const blob = new Blob([cleanHTML], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('🎉 index.html downloaded! Replace index.html in your folder to make changes permanent for GitHub.');
}
