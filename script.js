// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Dark Theme Toggle
let isDarkMode = false;

const toggleTheme = () => {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.setAttribute('data-lucide', 'moon');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.setAttribute('data-lucide', 'sun');
        localStorage.setItem('theme', 'light');
    }
    
    // Refresh lucide icons
    if (window.lucide && window.lucide.createIcons) { window.lucide.createIcons(); }
};

themeToggle.addEventListener('click', toggleTheme);

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    isDarkMode = true;
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.setAttribute('data-lucide', 'moon');
} else {
    themeIcon.setAttribute('data-lucide', 'sun');
}

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        const section = document.querySelector(targetId);
        
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
};

// Navbar Background on Scroll
const updateNavbarBackground = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbarBackground();
    handleScrollAnimations();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animations
const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .skill-category, .project-card');
animateElements.forEach(el => observer.observe(el));

// Animate Skill Progress Bars
const animateSkillBars = (skillCategory) => {
    const progressBars = skillCategory.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, 300);
    });
};

// Form Validation
const validateForm = () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
    
    // Name validation
    if (name === '') {
        document.getElementById('name-error').textContent = 'Name is required';
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('email-error').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Message validation
    if (message === '') {
        document.getElementById('message-error').textContent = 'Message is required';
        isValid = false;
    } else if (message.length < 10) {
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    return isValid;
};

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success message
        const button = contactForm.querySelector('.btn');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i data-lucide="check"></i> Message Sent!';
        button.style.background = 'var(--success-color)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = 'var(--primary-color)';
            if (window.lucide && window.lucide.createIcons) { window.lucide.createIcons(); }
        }, 3000);
        
        // Refresh lucide icons
        if (window.lucide && window.lucide.createIcons) { window.lucide.createIcons(); }
    }
});

// Real-time form validation
document.getElementById('name').addEventListener('input', () => {
    const name = document.getElementById('name').value.trim();
    const error = document.getElementById('name-error');
    
    if (name.length > 0 && name.length < 2) {
        error.textContent = 'Name must be at least 2 characters';
    } else {
        error.textContent = '';
    }
});

document.getElementById('email').addEventListener('input', () => {
    const email = document.getElementById('email').value.trim();
    const error = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.length > 0 && !emailRegex.test(email)) {
        error.textContent = 'Please enter a valid email address';
    } else {
        error.textContent = '';
    }
});

document.getElementById('message').addEventListener('input', () => {
    const message = document.getElementById('message').value.trim();
    const error = document.getElementById('message-error');
    
    if (message.length > 0 && message.length < 10) {
        error.textContent = 'Message must be at least 10 characters';
    } else {
        error.textContent = '';
    }
});

// Typing Animation for Hero Title
const initTypingAnimation = () => {
    const typingText = document.querySelector('.typing-text');
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let index = 0;
    const typeWriter = () => {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
};

// Handle Scroll Animations
const handleScrollAnimations = () => {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
};

// Parallax Effect for Hero Section
const handleParallax = () => {
    const heroSection = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
};

// Add parallax to scroll event
window.addEventListener('scroll', () => {
    handleParallax();
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (window.lucide && window.lucide.createIcons) { window.lucide.createIcons(); }
    
    // Start typing animation
    initTypingAnimation();
    
    // Initial scroll animations check
    handleScrollAnimations();
    
    // Add CSS class for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-up, .fade-in-left, .fade-in-right {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .fade-in-left {
            transform: translateX(-30px);
        }
        
        .fade-in-right {
            transform: translateX(30px);
        }
        
        .fade-in-up.animate, .fade-in-left.animate, .fade-in-right.animate {
            opacity: 1;
            transform: translate(0);
        }
        
        .nav.scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        [data-theme="dark"] .nav.scrolled {
            background: rgba(15, 23, 42, 0.98) !important;
        }
    `;
    document.head.appendChild(style);
});

// Smooth scroll to top
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add scroll to top functionality (you can add a button for this)
window.addEventListener('scroll', () => {
    const scrollTopButton = document.querySelector('.scroll-to-top');
    if (scrollTopButton) {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    }
});