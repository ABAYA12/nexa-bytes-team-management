import { supabase } from './config.js';

// Generate a unique employee ID
function generateEmployeeId() {
    return 'NBX-' + Math.floor(1000 + Math.random() * 9000);
}

// Initialize form functionality
function initForm() {
    // Generate and set employee ID
    const employeeId = generateEmployeeId();
    const employeeIdField = document.getElementById('employeeId');
    
    if (employeeIdField) {
        employeeIdField.value = employeeId;
        console.log('Employee ID generated:', employeeId);
    } else {
        console.error('Employee ID field not found');
        return; // Exit if critical field missing
    }

    // Set today's date as start date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;

    // Handle form submission
    const form = document.getElementById('memberForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Collect all form data
        const formData = {
            employee_id: employeeId, // Using the pre-generated ID
            first_name: document.getElementById('firstName').value.trim(),
            last_name: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone_number: document.getElementById('phone').value.trim(),
            gender: document.getElementById('gender').value,
            dob: document.getElementById('dob').value,
            role: document.getElementById('role').value.trim(),
            department: document.getElementById('department').value,
            start_date: document.getElementById('startDate').value,
            github: document.getElementById('github')?.value.trim() || null,
            linkedin: document.getElementById('linkedin')?.value.trim() || null,
            bio: document.getElementById('bio')?.value.trim() || null
        };

        // Validate required fields
        if (!formData.first_name || !formData.last_name || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            // Submit to Supabase
            const { data, error } = await supabase
                .from('team_members')
                .insert([formData])
                .select();

            if (error) throw error;

            // Store data and redirect on success
            localStorage.setItem('memberData', JSON.stringify(data[0]));
            window.location.href = 'card.html';
            
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Submission failed: ${error.message}`);
        }
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initForm);

// Fallback: If DOM is already loaded when script runs
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initForm, 100);
}