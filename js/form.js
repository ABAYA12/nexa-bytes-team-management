import { supabase } from './config.js'; // ✅ adjust the path if needed

document.addEventListener('DOMContentLoaded', function () {
    const employeeId = 'NBX-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('employeeId').value = employeeId;

    const form = document.getElementById('memberForm');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = {
            employee_id: document.getElementById('employeeId').value,
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

        // ✅ Send to Supabase
        const { data, error } = await supabase
            .from('team_members')
            .insert([formData]);

        if (error) {
            console.error('Insert error:', error.message);
            alert('❌ Failed to submit form: ' + error.message);
        } else {
            console.log('✅ Inserted data:', data);
            localStorage.setItem('memberData', JSON.stringify(data[0]));
            window.location.href = 'card.html';
        }
    });

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('startDate').value = formattedDate;
});
