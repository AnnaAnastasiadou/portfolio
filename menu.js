/**
 * MOBILE MENU FUNCTIONALITY
 * 
 * This script handles the responsive navigation menu, including:
 * - Hamburger menu toggle on mobile
 * - Auto-closing behavior during navigation and scrolling
 * - Responsive state management
 */

// Wait for DOM content to be fully loaded before executing script
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navButtons = document.querySelectorAll('.nav-button');
    const navbar = document.getElementById('navbar');

    // Variables for scroll behavior
    let lastScrollPosition = window.pageYOffset;
    const SCROLL_THRESHOLD = 50;
    let isMenuOpen = false;

    /**
     * TOGGLE MOBILE MENU VISIBILITY
     * @param {boolean} [shouldOpen] - Optional: Force open (true) or close (false)
     * 
     * Handles:
     * - Toggling hamburger icon animation
     * - Showing/hiding mobile menu
     * - State management (isMenuOpen)
     * - Only affects mobile/tablet viewports (<=768px)
     */

    function toggleMenu(shouldOpen) {
        // Only apply on mobile/tablet view
        if (window.innerWidth <= 768) {
            // Determine if menu should be open or closed
            isMenuOpen = typeof shouldOpen === 'boolean' ? shouldOpen : !isMenuOpen;
            // Toggle hamburger icon state
            hamburger.classList.toggle('is-active', isMenuOpen);
            // Toggle navbar expanded state
            navbar.classList.toggle('expanded', isMenuOpen);
        }
    }

    /**
     * HANDLE SCROLL BEHAVIOR
     * 
     * Manages:
     * - Hiding navbar when scrolling down for mobile/tablet and desktop
     * - Showing navbar when scrolling up for desktops
     * - Navbar stays closed on mobile when scrolling up
     */
    function handleScroll() {
        const currentScroll = window.pageYOffset;

         // Mobile-specific behaviors
        if (window.innerWidth <= 768) {
            // Close menu if scrolling down and menu is open
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
        
        // Reset navbar state on mobile
        if (window.innerWidth < 768) {
            navbar.classList.remove('navbar-hidden');
        }
    }

    /**
     * HANDLE WINDOW RESIZE EVENTS
     * 
     * Ensures proper menu state when resizing browser window
     */
    function handleResize() {
        if (window.innerWidth > 768) {
            // If resizing to desktop, close mobile menu and show desktop navbar
            toggleMenu(false);
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('expanded'); 
            hamburger.classList.remove('is-active'); 
        }
        // If resizing to mobile, start with a closed menu
        if (window.innerWidth <= 768) {
            navbar.classList.remove('expanded'); 
        }
    }

    // EVENT LISTENERS //
    // Hamburger menu click - toggle menu visibility
    hamburger.addEventListener('click', () => toggleMenu());
    // Navigation link clicks - close menu on mobile
    navButtons.forEach(btn =>
        btn.addEventListener('click', () => {
            if (window.innerWidth <= 768) toggleMenu(false);
        })
    );

    // Window scroll - handle navbar hide/show behavior
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Window resize - handle responsive changes
    window.addEventListener('resize', handleResize);

    // Initialize navbar state on page load
    handleResize();
});
