document.addEventListener('DOMContentLoaded', function () {

    // --- Leaflet Map Removed (Replaced with Google Maps Embed) ---

    // --- Navbar Collapse on Mobile ---
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const navbarCollapse = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });

    // --- Smooth Scroll (Polished optional behavior if CSS smooth-scroll fails or for offset) ---
    // CSS 'scroll-behavior: smooth' usually handles this, but JS allows for offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Scroll Spy (Active Nav Link on Scroll) ---
    const sections = document.querySelectorAll('section');
    const allNavLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment for header height (approx 80px) + some buffer
            if (window.scrollY >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            // Strict check: href must exactly match "#" + sectionId
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            } else if (!current && link.getAttribute('href') === '#home') {
                // Fallback: If at very top/no section active, light up Home
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    // Initial check on load
    highlightNavLink();

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // --- Dynamic Frames Rendering ---
    const framesContainer = document.getElementById('frames-container');
    if (framesContainer && typeof frameCategories !== 'undefined') {
        framesContainer.innerHTML = ''; // Clear existing content if any

        frameCategories.forEach(frame => {
            const col = document.createElement('div');
            col.className = 'col-md-4';

            col.innerHTML = `
                <div class="frame-category-card position-relative overflow-hidden rounded-4 shadow-sm h-100 bg-white">
                    <img src="${frame.image}" alt="${frame.title}" class="img-fluid">
                    <div class="category-overlay d-flex flex-column justify-content-end p-4">
                        <h4 class="text-white fw-bold mb-1">${frame.title}</h4>
                        <p class="text-white-50 small mb-0">${frame.description}</p>
                    </div>
                </div>
            `;
            framesContainer.appendChild(col);
        });
    }

    // --- Dynamic Discount Section & Notification Bar ---
    const offersSection = document.getElementById('offers');
    const discountContent = document.getElementById('discount-content');
    const notificationBar = document.getElementById('top-notification-bar');
    const notificationText = document.getElementById('notification-text');

    if (typeof discountOffer !== 'undefined' && discountOffer.isActive) {
        // Update Main Section
        if (offersSection && discountContent) {
            offersSection.style.display = 'block';
            discountContent.innerHTML = `
                <h2 class="fw-bold mb-3">${discountOffer.title}</h2>
                <p class="lead mb-4">${discountOffer.description}</p>
                <a href="${discountOffer.buttonLink}" class="btn btn-light btn-lg rounded-pill px-5 text-primary fw-bold">${discountOffer.buttonText}</a>
            `;
        }

        // Update Top Notification Bar
        if (notificationBar && notificationText) {
            notificationBar.style.display = 'block';
            notificationText.innerHTML = `<span class="me-4 text-warning">★ NEWS:</span> ${discountOffer.title} - ${discountOffer.description} <span class="ms-4 text-warning">★ CLICK "View Collection" TO SEE MORE!</span>`;
        }

    } else {
        if (offersSection) offersSection.style.display = 'none';
        if (notificationBar) notificationBar.style.display = 'none';
    }
});
