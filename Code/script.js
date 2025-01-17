// ==========================================================================
//  Testimonials Slider
//  Implementiert das Karussell für die Testimonials-Karten
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Selektiert die Slider- und Karten-Elemente
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');

    // Initialisiert die aktuelle Slide-Position und die Gesamtzahl der Slides
    let currentSlide = 0;
    const slideCount = slides.length;

    // Initialisiert den Slider
    updateSlider();

    // Event Listener für den "Zurück" Button
    prevButton.addEventListener('click', () => {
        // Berechnet die neue Slide-Position und aktualisiert den Slider
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });

    // Event Listener für den "Weiter" Button
    nextButton.addEventListener('click', () => {
        // Berechnet die neue Slide-Position und aktualisiert den Slider
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });

    // Event Listener für die Punkte (Dots)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Setzt die aktuelle Slide-Position auf die gewählte Position
            currentSlide = index;
            updateSlider();
        });
    });

    // Auto-Advances den Slider alle 5 Sekunden
    setInterval(() => {
        // Berechnet die neue Slide-Position und aktualisiert den Slider
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }, 5000);

    /**
     * Aktualisiert die Position des Sliders und der Punkte (Dots)
     */
    function updateSlider() {
        // Aktualisiert die Position der Slides
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });

        // Aktualisiert die Punkte (Dots)
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
});
