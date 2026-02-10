// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'TPGAsL8YNyrdVRKtR',      // Replace with your EmailJS public key
    SERVICE_ID: 'service_ybah5x8',      // Replace with your EmailJS service ID
    TEMPLATE_ID: 'template_fgc1rb2'     // Replace with your EmailJS template ID
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById('enquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Hide previous messages
            formMessage.className = 'form-message';
            formMessage.textContent = '';

            // Collect form data
            const formData = {
                title: document.getElementById('title').value,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value || 'Not provided',
                model: document.getElementById('model').value || 'Not selected',
                message: document.getElementById('message').value || 'No additional comments',
                contactEmail: document.querySelector('input[name="contactEmail"]').checked ? 'Yes' : 'No',
                contactPhone: document.querySelector('input[name="contactPhone"]').checked ? 'Yes' : 'No',
                contactPost: document.querySelector('input[name="contactPost"]').checked ? 'Yes' : 'No',
                contactSMS: document.querySelector('input[name="contactSMS"]').checked ? 'Yes' : 'No',
                fullName: document.getElementById('title').value + ' ' + 
                         document.getElementById('firstName').value + ' ' + 
                         document.getElementById('lastName').value,
                date: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            };

            // Send email using EmailJS
            emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                formData
            )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you for your enquiry! We will contact you shortly.';
                
                // Reset form
                enquiryForm.reset();
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Enquiry';
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }, 5000);
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Sorry, there was an error sending your enquiry. Please try again or contact us directly.';
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Enquiry';
            });
        });
    }
});

// Form Validation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.enquiry-form input, .enquiry-form select, .enquiry-form textarea');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(244, 67, 54, 0.5)';
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
});

// Phone Number Formatting (Optional)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            // Format: (XXX) XXX-XXXX
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
            } else {
                value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        e.target.value = value;
    });
}
