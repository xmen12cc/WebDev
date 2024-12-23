document.addEventListener("DOMContentLoaded", function() {
    // Select elements for both navbars
    const navbarToggler1 = document.querySelector('.navbar-toggler[data-target="#navbarNav"]');
    const navbarCollapse1 = document.querySelector('#navbarNav');

    const navbarToggler2 = document.querySelector('.navbar-toggler[data-target="#projectNavbar"]');
    const navbarCollapse2 = document.querySelector('#projectNavbar');

    // Handle Navbar 1 (horizontal) - Always closed on render
    if (navbarToggler1 && navbarCollapse1) {
        navbarCollapse1.classList.remove('show');  // Ensure it's always off
        navbarToggler1.setAttribute('aria-expanded', 'false');
    }

    // Handle Navbar 2 (vertical) - Only open on projects page for desktop
    if (navbarToggler2 && navbarCollapse2) {
        if (window.location.pathname.includes("projects") && window.innerWidth >= 992) { 
            navbarCollapse2.classList.add('show');
            navbarToggler2.setAttribute('aria-expanded', 'true');
        }

        // Toggle functionality for vertical navbar
        navbarToggler2.addEventListener('click', () => {
            const isExpanded = navbarCollapse2.classList.contains('show');
            navbarToggler2.setAttribute('aria-expanded', !isExpanded);
        });
    }
});





  
