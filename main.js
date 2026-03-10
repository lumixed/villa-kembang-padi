import './style.css'

// Property Data
const properties = [
    {
        id: 1,
        title: "Villa Kembang Padi - Canggu",
        location: "SriKrisna I No.11, Canggu, Bali",
        category: "bali",
        price: "IDR 3.5M",
        image: "/assets/bali_hero.jpg",
        beds: 3,
        baths: 3,
        size: "300 sqm",
        tag: "CANGGU"
    },
    {
        id: 2,
        title: "Villa Kembang Padi - Kemenuh",
        location: "Jl. Ir. Sutami, Kec. Sukawati, Gianyar, Bali",
        category: "bali",
        price: "IDR 4.2M",
        image: "/assets/bali_pool.png",
        beds: 4,
        baths: 4,
        size: "450 sqm",
        tag: "RICE FIELD VIEW"
    },
    {
        id: 3,
        title: "Kembang Padi House - Malabar",
        location: "Jl. Waluh No.20, Kec. Lengkong, Bandung",
        category: "bandung",
        price: "IDR 1.8M",
        image: "/assets/bandung_home.png",
        beds: 3,
        baths: 2,
        size: "220 sqm",
        tag: "DOWNTOWN"
    },
    {
        id: 4,
        title: "Kembang Padi House - Sriwijaya",
        location: "Jl. Sriwijaya No.98, Kec. Regol, Bandung",
        category: "bandung",
        price: "IDR 2.2M",
        image: "/assets/bandung_mountain.png",
        beds: 4,
        baths: 3,
        size: "280 sqm",
        tag: "CITY ACCESS"
    },
    {
        id: 5,
        title: "Kembang Padi House - Paledang",
        location: "Jl. Wangsareja No.24 A, Kec. Lengkong, Bandung",
        category: "bandung",
        price: "IDR 1.5M",
        image: "/assets/bandung_home.png", // Reusing for now, will generate more
        beds: 2,
        baths: 1,
        size: "150 sqm",
        tag: "COZY"
    }
];

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    renderProperties('all');
    initNavbarScroll();
    initFilters();
    initRevealAnimations();
    initMobileMenu();
});

function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

let revealObserver;

function initRevealAnimations() {
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    observeNewElements();
}

function observeNewElements() {
    const revealElements = document.querySelectorAll('.reveal:not(.active)');
    revealElements.forEach(el => revealObserver.observe(el));
}

// Render Properties
function renderProperties(filter) {
    const grid = document.getElementById('property-grid');
    if (!grid) return;

    const filteredData = filter === 'all'
        ? properties
        : properties.filter(p => p.category === filter);

    grid.innerHTML = filteredData.map((p, index) => `
    <div class="property-card reveal" style="transition-delay: ${index * 0.1}s">
      <div class="property-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="property-tag">${p.tag}</span>
      </div>
      <div class="property-info">
        <span class="property-location">${p.location}</span>
        <h3>${p.title}</h3>
        <p class="price">${p.price} <span>/ night</span></p>
        <div class="property-meta">
          <span>${p.beds} Beds</span>
          <span>${p.baths} Baths</span>
          <span>${p.size}</span>
        </div>
      </div>
    </div>
  `).join('');

    // Re-observe newly created elements
    if (revealObserver) {
        observeNewElements();
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Filtering Logic
function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update buttons
            buttons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Filter grid
            const filter = e.target.dataset.filter;
            renderProperties(filter);
        });
    });
}

// CSS for reveal
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
