// ==========================================================================
//  Testimonials Slider
//  Implementiert das Karussell für die Testimonials-Karten
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Testimonials Slider
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');

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

    // Bubbly Button Animation
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
        btn.addEventListener('click', animateButton, false);
    });
});
