document.addEventListener("DOMContentLoaded", function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#projectNavbar');

    if (navbarToggler && navbarCollapse) {
        // Open navbar by default only on the projects page for desktops
        if (window.location.pathname.includes("projects") && window.innerWidth >= 992) { 
            navbarCollapse.classList.add('show');
            navbarToggler.setAttribute('aria-expanded', 'true');
        }

        // Toggle functionality
        navbarToggler.addEventListener('click', () => {
            const isExpanded = navbarCollapse.classList.contains('show');
            navbarToggler.setAttribute('aria-expanded', !isExpanded);
        });
    }
});


  
  console.log(navbarToggler);