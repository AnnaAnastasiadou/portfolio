document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navButtons = document.querySelectorAll('.nav-button');
    const navbar = document.getElementById('navbar');

    let lastScrollPosition = window.pageYOffset;
    const SCROLL_THRESHOLD = 50;
    let isMenuOpen = false;

    function toggleMenu(shouldOpen) {
        if (window.innerWidth <= 768) {
            isMenuOpen = typeof shouldOpen === 'boolean' ? shouldOpen : !isMenuOpen;
            hamburger.classList.toggle('is-active', isMenuOpen);
            navbar.classList.toggle('expanded', isMenuOpen);
        }
    }

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (window.innerWidth <= 768) {
            // Mobile: Close menu if scrolling down
            if (currentScroll > lastScrollPosition && isMenuOpen) {
                toggleMenu(false);
            }
            // Show navbar when scrolling up
            if (currentScroll < lastScrollPosition) {
                navbar.classList.remove('navbar-hidden');
            }
        }

        // Hide navbar when scrolling down past threshold
        if (currentScroll > lastScrollPosition && currentScroll > SCROLL_THRESHOLD) {
            navbar.classList.add('navbar-hidden');
        } else if (currentScroll < lastScrollPosition) {
            navbar.classList.remove('navbar-hidden');
        }

        lastScrollPosition = currentScroll;
        if (window.innerWidth < 768) {
            navbar.classList.remove('navbar-hidden');
        }
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            toggleMenu(false); // Close mobile menu state
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('expanded'); // ✅ Ensure menu is visible on desktop
            hamburger.classList.remove('is-active'); // Optionally reset hamburger icon
        }
        if (window.innerWidth <= 768) {
            navbar.classList.remove('expanded'); // Remove expanded class on mobile
        }
    }

    // Event listeners
    hamburger.addEventListener('click', () => toggleMenu());
    navButtons.forEach(btn =>
        btn.addEventListener('click', () => {
            if (window.innerWidth <= 768) toggleMenu(false);
        })
    );
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Init
    handleResize();
});
