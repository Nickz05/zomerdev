/* ==========================================================================
   Contact Page JavaScript - Zomer Development
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

    // Pre-select package from URL parameter
    preselectPackageFromURL();

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });

        // Form submission
        contactForm.addEventListener('submit', handleFormSubmission);
    }

    // Smooth scrolling for internal links
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

    // Back to top functionality
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
});

// Pre-select package from URL parameter
function preselectPackageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageParam = urlParams.get('package');

    if (packageParam) {
        const packageSelect = document.getElementById('package');
        if (packageSelect) {
            // Map URL parameter to select option values
            const packageMapping = {
                'starter': 'starter',
                'standaard': 'standaard',
                'pro angular': 'pro-angular'
            };

            const selectValue = packageMapping[packageParam.toLowerCase()];
            if (selectValue) {
                packageSelect.value = selectValue;

                // Optional: Scroll to the form after a short delay
                setTimeout(() => {
                    const formSection = document.getElementById('contact-form');
                    if (formSection) {
                        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 500);
            }
        }
    }
}

// Close mobile menu function
function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
}

// Scroll to form function
function scrollToForm() {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Clear form function
function clearForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        clearAllErrors();
    }
}

// Field validation functions
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    clearFieldError(field);

    // Required field check
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Dit veld is verplicht';
        isValid = false;
    }
    // Email validation
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Voer een geldig email adres in';
            isValid = false;
        }
    }
    // Phone validation (optional but if filled should be valid)
    else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Voer een geldig telefoonnummer in';
            isValid = false;
        }
    }
    // Name validation
    else if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
        if (value.length < 2) {
            errorMessage = 'Naam moet minimaal 2 karakters bevatten';
            isValid = false;
        }
    }
    // Company name validation
    else if (fieldName === 'company' && value && value.length < 2) {
        errorMessage = 'Bedrijfsnaam moet minimaal 2 karakters bevatten';
        isValid = false;
    }
    // Message validation
    else if (fieldName === 'message' && value && value.length < 10) {
        errorMessage = 'Bericht moet minimaal 10 karakters bevatten';
        isValid = false;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.id + '-error') || document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.id + '-error') || document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.input-error');
    const inputElements = document.querySelectorAll('.error');

    errorElements.forEach(el => el.textContent = '');
    inputElements.forEach(el => el.classList.remove('error'));
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;

    // Validate all required fields
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    // Check if at least one website type is selected
    const websiteTypes = form.querySelectorAll('input[name="website-type"]:checked');
    if (websiteTypes.length === 0) {
        // Show error for website type section
        const websiteTypeError = document.createElement('div');
        websiteTypeError.className = 'input-error';
        websiteTypeError.textContent = 'Selecteer minimaal één website type';

        const checkboxGroup = form.querySelector('.checkbox-group');
        if (checkboxGroup && !checkboxGroup.querySelector('.input-error')) {
            checkboxGroup.appendChild(websiteTypeError);
        }
        isFormValid = false;
    }

    // Check privacy checkbox
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        showFieldError(privacyCheckbox, 'Je moet akkoord gaan met de privacyverklaring');
        isFormValid = false;
    }

    return isFormValid;
}

async function handleFormSubmission(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');

    // Validate form
    if (!validateForm()) {
        // Scroll to first error
        const firstError = document.querySelector('.error, .input-error:not(:empty)');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';

    try {
        // Prepare form data
        const formData = new FormData(form);

        // Add website types as a formatted string
        const websiteTypes = Array.from(form.querySelectorAll('input[name="website-type"]:checked'))
            .map(input => input.value)
            .join(', ');
        formData.set('website-types', websiteTypes);

        // Submit form
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset form after delay
            setTimeout(() => {
                form.reset();
                clearAllErrors();
            }, 1000);

            // Track success event (if you have analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: 'Contact Form Submission'
                });
            }
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        alert('Er is een probleem opgetreden bij het verzenden van je bericht. Probeer het opnieuw of stuur een email naar info@zomerdev.com');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
});

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states for method cards
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('primary')) {
                scrollToForm();
            }
        });
    });

    // Form progress indicator (optional)
    const formSections = document.querySelectorAll('.form-section');
    const progressIndicator = createProgressIndicator(formSections.length);

    if (progressIndicator) {
        const formWrapper = document.querySelector('.form-wrapper');
        formWrapper.insertBefore(progressIndicator, formWrapper.firstChild.nextSibling);
        updateFormProgress();
    }

    // Add input focus effects
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

function createProgressIndicator(totalSteps) {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'form-progress';
    progressContainer.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        <div class="progress-text">
            <span id="progressText">Vul de formulier in</span>
            <span id="progressPercent">0%</span>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .form-progress {
            margin-bottom: 2rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .progress-bar {
            height: 6px;
            background: #e0e0e0;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #2563eb, #1e40af);
            width: 0%;
            transition: width 0.3s ease;
        }
        .progress-text {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #666;
        }
    `;
    document.head.appendChild(style);

    return progressContainer;
}

function updateFormProgress() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const allInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    const filledInputs = Array.from(allInputs).filter(input => {
        if (input.type === 'checkbox') {
            return input.checked;
        }
        return input.value.trim() !== '';
    });

    const progressPercent = Math.round((filledInputs.length / allInputs.length) * 100);
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressPercentElement = document.getElementById('progressPercent');

    if (progressFill && progressPercentElement) {
        progressFill.style.width = progressPercent + '%';
        progressPercentElement.textContent = progressPercent + '%';
    }

    if (progressText) {
        if (progressPercent === 100) {
            progressText.textContent = 'Formulier compleet! Klaar om te verzenden.';
        } else if (progressPercent > 50) {
            progressText.textContent = 'Bijna klaar...';
        } else {
            progressText.textContent = 'Vul de formulier in';
        }
    }
}

// Add event listeners to update progress
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updateFormProgress);
        input.addEventListener('change', updateFormProgress);
    });
});

// Form analytics (optional - uncomment if you use Google Analytics)
/*
function trackFormInteraction(action, field) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Form Interaction',
            event_label: field,
            custom_map: {custom_dimension_1: 'contact_form'}
        });
    }
}

// Track field focus events
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            trackFormInteraction('field_focus', this.name || this.id);
        });
    });
});
*/