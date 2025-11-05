document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Prevent form from submitting if validation fails
            if (!validateForm()) {
                e.preventDefault();
            }
        });

        // Remove red border when user starts typing
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach((input) => {
            input.addEventListener('input', function () {
                if (this.style.borderColor === 'red') {
                    this.style.borderColor = '';
                    this.style.backgroundColor = '';
                }
            });
        });
    }

    function validateForm() {
        let isValid = true;
        const errors = [];

        // Get form elements
        const name = document.getElementById('name');
        const surname = document.getElementById('surname');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Reset all borders first
        resetBorders([name, surname, email, message]);

        // Simple validation checks
        if (name.value.trim() === '') {
            showError(name);
            errors.push('First name is required');
            isValid = false;
        }

        if (surname.value.trim() === '') {
            showError(surname);
            errors.push('Last name is required');
            isValid = false;
        }

        if (email.value.trim() === '') {
            showError(email);
            errors.push('Email address is required');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showError(email);
            errors.push('Please enter a valid email address');
            isValid = false;
        }

        if (message.value.trim() === '') {
            showError(message);
            errors.push('Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message);
            errors.push('Message must be at least 10 characters');
            isValid = false;
        }

        // Show all errors in one alert
        if (!isValid) {
            const errorMessage =
                'Please fix the following errors:\n\n' + errors.join('\n• ');
            alert(errorMessage);
        }

        return isValid;
    }

    function showError(field) {
        // Add red border
        field.style.borderColor = 'red';
    }

    function resetBorders(fields) {
        fields.forEach((field) => {
            field.style.borderColor = '';
        });
    }

    function isValidEmail(email) {
        return email.includes('@') && email.includes('.');
    }
});
