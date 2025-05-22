document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navButtons = document.querySelectorAll('.nav-button');
    const navbar = document.getElementById('navbar');
    
    // Variables for scroll handling
    let isScrolling;
    const SCROLL_DELAY = 150; // Adjust timing (ms) for when navbar reappears
    
    // Toggle menu function
    function toggleMenu() {
        hamburger.classList.toggle('is-active');
        navList.classList.toggle('expanded');
    }
    
    // Hamburger click event
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when nav button is clicked (mobile only)
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            // Desktop - ensure menu is always visible
            hamburger.classList.remove('is-active');
            navList.classList.add('expanded');
        } else {
            // Mobile - ensure proper initial state
            if (!hamburger.classList.contains('is-active')) {
                navList.classList.remove('expanded');
            }
        }
    }
    
    // Scroll event handler
    function handleScroll() {
        // Hide navbar immediately when scrolling starts
        navbar.classList.add('navbar-hidden');
        
        // Clear previous timeout to prevent reappearing too soon
        window.clearTimeout(isScrolling);
        
        // Set timeout to show navbar after scrolling stops
        isScrolling = setTimeout(function() {
            navbar.classList.remove('navbar-hidden');
        }, SCROLL_DELAY);
    }
    
    // Initialize and add event listeners
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
});