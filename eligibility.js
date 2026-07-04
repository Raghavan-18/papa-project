document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const progressLine = document.getElementById('progressLine');
    const form = document.getElementById('eligibilityForm');
    
    let currentStep = 0;

    function updateFormSteps() {
        // Hide all steps
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        formSteps[currentStep].classList.add('active');
        
        // Update Indicators
        stepIndicators.forEach((indicator, index) => {
            if (index < currentStep) {
                indicator.classList.add('completed');
                indicator.classList.remove('active');
            } else if (index === currentStep) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
            } else {
                indicator.classList.remove('active', 'completed');
            }
        });
        
        // Update Progress Line
        const progressPercentage = (currentStep / (stepIndicators.length - 1)) * 100;
        progressLine.style.width = `${progressPercentage}%`;
        
        // Button visibility
        if (currentStep === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-flex';
        }
        
        if (currentStep === formSteps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }

    function validateCurrentStep() {
        const currentInputs = formSteps[currentStep].querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        currentInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
                // Reset border after 2 seconds
                setTimeout(() => {
                    input.style.borderColor = 'var(--card-border)';
                }, 2000);
            } else {
                input.style.borderColor = 'var(--card-border)';
            }
        });
        
        return isValid;
    }

    nextBtn.addEventListener('click', () => {
        if (validateCurrentStep()) {
            currentStep++;
            updateFormSteps();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentStep--;
        updateFormSteps();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            // Redirect to AI verification loading page
            window.location.href = 'verifying.html';
        }
    });
});
