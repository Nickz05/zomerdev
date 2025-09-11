/* ==========================================================================
   Pricing Page JavaScript - Zomer Development
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Package/Comparison toggle functionality
    initializeViewToggle();

    // FAQ functionality
    initializeFAQ();

    // Pricing card interactions
    initializePricingCards();

    // Smooth scrolling
    initializeSmoothScrolling();

    // Back to top functionality
    initializeBackToTop();
});

// Close mobile menu function
function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
}

// Package/Comparison view toggle
function initializeViewToggle() {
    const packagesRadio = document.getElementById('packages-view');
    const comparisonRadio = document.getElementById('comparison-view');
    const packagesSection = document.getElementById('packages-section');
    const comparisonSection = document.getElementById('comparison-section');

    if (packagesRadio && comparisonRadio && packagesSection && comparisonSection) {
        packagesRadio.addEventListener('change', () => {
            if (packagesRadio.checked) {
                packagesSection.style.display = 'block';
                comparisonSection.style.display = 'none';

                // Smooth transition
                packagesSection.style.opacity = '0';
                setTimeout(() => {
                    packagesSection.style.opacity = '1';
                }, 50);
            }
        });

        comparisonRadio.addEventListener('change', () => {
            if (comparisonRadio.checked) {
                packagesSection.style.display = 'none';
                comparisonSection.style.display = 'block';

                // Smooth transition
                comparisonSection.style.opacity = '0';
                setTimeout(() => {
                    comparisonSection.style.opacity = '1';
                }, 50);
            }
        });
    }
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Pricing card interactions
function initializePricingCards() {
    const pricingButtons = document.querySelectorAll('.btn-pricing');

    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get package name from card
            const card = button.closest('.pricing-card');
            let packageName = 'Unknown';

            if (card.classList.contains('starter')) {
                packageName = 'Starter';
            } else if (card.classList.contains('standard')) {
                packageName = 'Standaard';
            } else if (card.classList.contains('pro-angular')) {
                packageName = 'Pro Angular';
            }

            // Redirect to contact page with package pre-selected
            const contactUrl = `contact.html?package=${encodeURIComponent(packageName.toLowerCase())}`;
            window.location.href = contactUrl;

            // Track package selection (if analytics available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'package_selection', {
                    event_category: 'Pricing',
                    event_label: packageName,
                    value: getPackagePrice(packageName)
                });
            }
        });
    });
}

// Helper function to get package price for analytics
function getPackagePrice(packageName) {
    const prices = {
        'Starter': 499,
        'Standaard': 799,
        'Pro Angular': 1199
    };
    return prices[packageName] || 0;
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Back to top functionality
function initializeBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Pricing card animations on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure CSS is loaded
    setTimeout(initializeScrollAnimations, 100);
});

// Package recommendation based on URL parameters
function initializePackageRecommendation() {
    const urlParams = new URLSearchParams(window.location.search);
    const recommendedPackage = urlParams.get('recommended');

    if (recommendedPackage) {
        const targetCard = document.querySelector(`.pricing-card.${recommendedPackage}`);
        if (targetCard) {
            // Highlight recommended package
            targetCard.style.border = '3px solid var(--color-primary-light)';
            targetCard.style.boxShadow = '0 0 20px rgba(33, 148, 243, 0.3)';

            // Scroll to pricing section
            setTimeout(() => {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 500);
        }
    }
}

// Call package recommendation on load
document.addEventListener('DOMContentLoaded', initializePackageRecommendation);

// Pricing calculator (optional feature)
function initializePricingCalculator() {
    const calculatorButton = document.getElementById('pricing-calculator-btn');
    const calculatorModal = document.getElementById('pricing-calculator-modal');

    if (calculatorButton && calculatorModal) {
        calculatorButton.addEventListener('click', () => {
            calculatorModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        // Close modal functionality
        const closeButtons = calculatorModal.querySelectorAll('.close-modal');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculatorModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });

        // Close on outside click
        calculatorModal.addEventListener('click', (e) => {
            if (e.target === calculatorModal) {
                calculatorModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Price update animation
function animatePriceChange(element, newPrice) {
    element.style.transform = 'scale(1.1)';
    element.style.color = 'var(--color-primary-light)';

    setTimeout(() => {
        element.textContent = newPrice;
    }, 150);

    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 300);
}

// Loading state for pricing buttons
function setButtonLoading(button, loading) {
    if (loading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Laden...';
    } else {
        button.disabled = false;
        // Restore original text based on package
        const card = button.closest('.pricing-card');
        let buttonText = 'Kies pakket';

        if (card.classList.contains('starter')) {
            buttonText = 'Kies Starter';
        } else if (card.classList.contains('standard')) {
            buttonText = 'Kies Standaard';
        } else if (card.classList.contains('pro-angular')) {
            buttonText = 'Kies Pro Angular';
        }

        button.innerHTML = buttonText;
    }
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', () => {
    const pricingButtons = document.querySelectorAll('.btn-pricing');

    pricingButtons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect styles
const rippleStyles = `
    .btn-pricing {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inject ripple styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Keyboard navigation for pricing cards
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('pricing-card')) {
            const button = focusedElement.querySelector('.btn-pricing');
            if (button) {
                e.preventDefault();
                button.click();
            }
        }
    }
});

// Make pricing cards focusable
document.addEventListener('DOMContentLoaded', () => {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.style.outline = 'none';

        card.addEventListener('focus', () => {
            card.style.boxShadow = '0 0 0 3px rgba(33, 148, 243, 0.3)';
        });

        card.addEventListener('blur', () => {
            card.style.boxShadow = '';
        });
    });
});