document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Hamburger Menu Functionaliteit
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    // Functie om het menu te sluiten en body scroll te herstellen
    function closeMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Toggle menu bij klik op de hamburger
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Sluit menu bij klik buiten het menu
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMenu();
            }
        });

        // Sluit menu bij het vergroten van het scherm (desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    /* ==========================================================================
       Prijzen Carousel Functionaliteit
       ========================================================================== */
    const cardsContainer = document.querySelector('.pricing-cards-container');
    const cards = document.querySelectorAll('.pricing-card');
    const dots = document.querySelectorAll('.dot');

    if (cardsContainer && cards.length > 0 && dots.length > 0) {

        // Functie om de actieve navigatiepunt bij te werken op basis van scrollpositie
        const updateActiveDot = () => {
            let activeIndex = 0;
            const containerScrollLeft = cardsContainer.scrollLeft;

            cards.forEach((card, index) => {
                // Check of de kaart in het midden van de container staat
                if (Math.abs(card.offsetLeft - containerScrollLeft) < card.offsetWidth / 2) {
                    activeIndex = index;
                }
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        };

        // Initialisatie: scroll naar de middelste kaart bij het laden
        const centerCardIndex = 1;
        const centerCard = cards[centerCardIndex];

        // Zorg dat de code alleen op mobiel wordt uitgevoerd
        if (window.innerWidth <= 768) {
            if (centerCard) {
                setTimeout(() => {
                    cardsContainer.scrollLeft = centerCard.offsetLeft - (cardsContainer.offsetWidth - centerCard.offsetWidth) / 2;
                    updateActiveDot();
                }, 100);
            }
        }

        // Event listener voor het bijwerken van de puntjes
        cardsContainer.addEventListener('scroll', () => {
            // Gebruik een kleine debounce om prestaties te verbeteren
            clearTimeout(cardsContainer.scrollTimeout);
            cardsContainer.scrollTimeout = setTimeout(updateActiveDot, 50);
        });

        // Navigatie via de puntjes
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const targetCard = cards[index];
                if (targetCard) {
                    const targetPosition = targetCard.offsetLeft - (cardsContainer.offsetWidth - targetCard.offsetWidth) / 2;
                    cardsContainer.scrollTo({
                        left: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Controleer of de layout verandert bij resizen
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                cardsContainer.scrollLeft = 0; // Reset de scrollpositie op desktop
            } else {
                updateActiveDot();
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const recaptchaTokenInput = document.getElementById('recaptcha-token');
    const SITE_KEY = '6LeHrrQrAAAAAPQEXOU54CnP6MWq4TII9O0jvBgy';

    if (contactForm && recaptchaTokenInput) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Voorkom dat het formulier direct wordt verzonden

            // Genereer een reCAPTCHA token
            grecaptcha.enterprise.ready(async () => {
                const token = await grecaptcha.enterprise.execute(SITE_KEY, {action: 'contact_form'});
                recaptchaTokenInput.value = token;

                // Verstuur het formulier nu de token is toegevoegd
                contactForm.submit();
            });
        });
    }
});