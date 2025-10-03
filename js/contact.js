// Contact page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    // Initialize contact form
    initializeContactForm();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize map functionality (if needed)
    initializeMap();
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(fieldName)} is required`;
        isValid = false;
    }
    
    // Email validation
    if (fieldName === 'email' && value && !utils.validateEmail(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Phone validation
    if (fieldName === 'phone' && value && !utils.validatePhone(value)) {
        errorMessage = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Message length validation
    if (fieldName === 'message' && value && value.length < 10) {
        errorMessage = 'Message must be at least 10 characters long';
        isValid = false;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        subject: 'Beauty Topic',
        message: 'Your Beauty Question'
    };
    return labels[fieldName] || fieldName;
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        utils.showNotification('Thank you! Our beauty experts will get back to you soon.', 'success');
        
        // Log form data (for development)
        console.log('Form submitted:', data);
        
        // You can send the data to your server here
        // sendToServer(data);
        
    }, 2000);
}

function initializeFormValidation() {
    // Add custom validation styles
    const style = document.createElement('style');
    style.textContent = `
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #e74c3c;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
        
        .form-group.success input,
        .form-group.success select,
        .form-group.success textarea {
            border-color: #27ae60;
            box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 0.5rem;
        }
        
        .success-message {
            color: #27ae60;
            font-size: 0.85rem;
            margin-top: 0.5rem;
        }
    `;
    document.head.appendChild(style);
}

function initializeScrollAnimations() {
    // Animate contact items on scroll
    const contactItems = document.querySelectorAll('.contact-item');
    
    const itemObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                itemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    contactItems.forEach(item => {
        itemObserver.observe(item);
    });
    
    // Animate form on scroll
    const contactForm = document.querySelector('.contact-form-container');
    if (contactForm) {
        const formObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInRight 0.8s ease-out';
                    formObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        formObserver.observe(contactForm);
    }
}

function initializeMap() {
    // Placeholder for map functionality
    // You can integrate Google Maps, OpenStreetMap, or other mapping services here
    
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Add map placeholder
        mapContainer.innerHTML = `
            <div style="
                width: 100%;
                height: 300px;
                background: #f8f9fa;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 1.1rem;
                border: 2px dashed #ddd;
            ">
                Map will be displayed here
            </div>
        `;
    }
}

// Add contact form enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #666;
            margin-top: 0.5rem;
        `;
        
        messageField.parentNode.appendChild(counter);
        
        messageField.addEventListener('input', function() {
            const remaining = 500 - this.value.length;
            counter.textContent = `${remaining} characters remaining`;
            counter.style.color = remaining < 50 ? '#e74c3c' : '#666';
        });
        
        // Set initial counter
        counter.textContent = 'Tell us about your beauty needs...';
    }
    
    // Add phone number formatting
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            this.value = value;
        });
    }
    
    // Add form auto-save functionality
    const form = document.getElementById('contactForm');
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Load saved data
        const savedData = JSON.parse(localStorage.getItem('contact_form_data') || '{}');
        inputs.forEach(input => {
            if (savedData[input.name]) {
                input.value = savedData[input.name];
            }
        });
        
        // Save data on input
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                localStorage.setItem('contact_form_data', JSON.stringify(data));
            });
        });
        
        // Clear saved data on successful submission
        form.addEventListener('submit', function() {
            setTimeout(() => {
                localStorage.removeItem('contact_form_data');
            }, 3000);
        });
    }
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .contact-item {
        transition: all 0.3s ease;
    }
    
    .contact-item:hover {
        transform: translateX(5px);
        background: #e9ecef;
    }
    
    .social-link {
        transition: all 0.3s ease;
    }
    
    .social-link:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
`;
document.head.appendChild(style);
