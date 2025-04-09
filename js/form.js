import { supabase } from 'supabase/config.js'; // Adjust path if config.js is elsewhere

// Function to generate employee ID
function generateEmployeeId() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `NBX-${randomNum}`;
}

// Generate ID immediately and store it
const employeeId = generateEmployeeId();
console.log('Generated Employee ID:', employeeId);

// Function to initialize the form
function initializeForm() {
    console.log('Initializing form...');

    // Set Employee ID
    const employeeIdField = document.getElementById('employeeId');
    if (employeeIdField) {
        employeeIdField.value = employeeId;
        console.log('Employee ID set in input:', employeeId);
    } else {
        console.error('Employee ID field not found in DOM!');
    }

    // Set today's date as start date
    const today = new Date().toISOString().split('T')[0];
    const startDateField = document.getElementById('startDate');
    if (startDateField) {
        startDateField.value = today;
        console.log('Start date set:', today);
    } else {
        console.error('Start date field not found in DOM!');
    }

    // Form submission
    const form = document.getElementById('memberForm');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            console.log('Form submitted, collecting data...');

            const formData = {
                employee_id: employeeId, // Use the pre-generated ID
                first_name: document.getElementById('firstName').value,
                last_name: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone_number: document.getElementById('phone').value,
                gender: document.getElementById('gender').value,
                dob: document.getElementById('dob').value,
                role: document.getElementById('role').value,
                department: document.getElementById('department').value,
                start_date: document.getElementById('startDate').value,
                github: document.getElementById('github').value,
                linkedin: document.getElementById('linkedin').value,
                bio: document.getElementById('bio').value,
            };

            console.log('Form data to submit:', formData);

            try {
                const { data, error } = await supabase
                    .from('team_members')
                    .insert([formData]);

                if (error) {
                    console.error('Supabase insert error:', error.message);
                    alert('❌ Submission failed: ' + error.message);
                } else {
                    console.log('✅ Data inserted successfully:', data);
                    localStorage.setItem('memberData', JSON.stringify(data[0]));
                    window.location.href = 'card.html';
                }
            } catch (err) {
                console.error('Unexpected error during submission:', err);
                alert('❌ An unexpected error occurred. Please try again.');
            }
        });
    } else {
        console.error('Form element not found in DOM!');
    }
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, running initialization...');
    initializeForm();
});

// Fallback: Try to set employee ID immediately if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM already loaded, running fallback initialization...');
    initializeForm();
}