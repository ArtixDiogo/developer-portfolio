// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Close mobile menu if open before scrolling
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const menuToggle = document.querySelector('.menu-toggle');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Reset icon
            }

            // Scroll to element
            // Consider header height if it's fixed and opaque
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition, // Adjust if you have a fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) { // Check if header exists
        if (window.scrollY > 80) { // Adjust scroll threshold if needed
            header.style.background = 'rgba(10, 10, 10, 0.98)'; 
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)'; 
        }
    }
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
};

const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observerInstance.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.skill-category, .contact-item, .hero-text, .hero-image, .about-text, .section-title').forEach(el => { 
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)'; 
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; 
    observer.observe(el);
});

// Lógica para menu hambúrguer
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        if (isActive) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Change to X icon
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Change back to bars
        }
    });
}