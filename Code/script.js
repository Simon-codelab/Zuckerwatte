// ==========================================================================
//  Testimonials Slider
//  Implementiert das Karussell für die Testimonials-Karten
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere den Testimonials Slider
    initTestimonialsSlider();
    
    // Initialisiere die Navigation Bubble
    initNavigationBubble();
    
    // Initialisiere das Kontaktformular
    initContactForm();
});

function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');

    if (!slider || !slides.length || !dots.length || !prevButton || !nextButton) return; // Wenn der Slider nicht existiert, beende die Funktion

    let currentSlide = 0;
    const slideCount = slides.length;

    // Initial setup
    updateSlides();
    updateDots();

    // Previous button click
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlides();
        updateDots();
    });

    // Next button click
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlides();
        updateDots();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentSlide !== index) {
                currentSlide = index;
                updateSlides();
                updateDots();
            }
        });
    });

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === (currentSlide - 1 + slideCount) % slideCount) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Auto-advance every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlides();
        updateDots();
    }, 5000);
}

function initNavigationBubble() {
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');
    
    if (!navLinks || !links.length) return; // Wenn die Navigation nicht existiert, beende die Funktion
    
    let currentLink = null;
    
    // Erstelle das Bubble-Element
    const bubble = document.createElement('span');
    bubble.className = 'nav-bubble';
    navLinks.appendChild(bubble);

    // Funktion zum Aktualisieren der Bubble-Position
    function updateBubblePosition(link) {
        if (currentLink === link) return;
        currentLink = link;
        
        const rect = link.getBoundingClientRect();
        const navRect = navLinks.getBoundingClientRect();
        
        bubble.style.width = `${rect.width}px`;
        bubble.style.height = `${rect.height}px`;
        bubble.style.left = `${rect.left - navRect.left}px`;
        bubble.style.top = `${rect.top - navRect.top}px`;
        
        requestAnimationFrame(() => {
            if (!bubble.style.opacity || bubble.style.opacity === '0') {
                bubble.style.animation = 'bubbleAnimation 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
            } else {
                bubble.style.opacity = '1';
            }
        });
    }

    // Event-Listener für Hover
    links.forEach(link => {
        const li = link.parentElement;
        li.addEventListener('mouseenter', () => {
            updateBubblePosition(link);
        });
    });

    // Verstecke Bubble wenn die Maus die Navigation verlässt
    navLinks.addEventListener('mouseleave', (e) => {
        const rect = navLinks.getBoundingClientRect();
        const isReallyLeaving = 
            e.clientY < rect.top || 
            e.clientY > rect.bottom || 
            e.clientX < rect.left || 
            e.clientX > rect.right;

        if (isReallyLeaving) {
            currentLink = null;
            bubble.style.animation = 'none';
            bubble.style.opacity = '0';
        }
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return; // Wenn das Formular nicht existiert, beende die Funktion
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Zeige das Modal
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'flex';
        }
        
        // Setze das Formular zurück
        this.reset();
        
        return false;
    });

    // Modal schließen
    window.closeModal = function() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Schließe Modal auch wenn außerhalb geklickt wird
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
}

function initBubblyButton() {
    const animateButton = function(e) {
        e.preventDefault();
        e.target.classList.remove('animate');
        e.target.classList.add('animate');
        setTimeout(function(){
            e.target.classList.remove('animate');
        }, 700);
    };

    const bubblyButtons = document.querySelectorAll(".cta-button");
    bubblyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Verhindere sofortige Navigation
            
            // Füge die Bubbles hinzu
            animateButton(e);
            
            // Navigiere nach einer kurzen Verzögerung (für die Animation)
            const href = this.getAttribute('href');
            if (href) {
                setTimeout(() => {
                    window.location.href = href;
                }, 600); // Warte bis die Animation fertig ist
            }
        });
    });
}

// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

initBubblyButton();
