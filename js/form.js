// Generate employee ID on form load
document.addEventListener('DOMContentLoaded', function() {
    // Generate employee ID (NBX-XXXX where XXXX is random 4-digit number)
    const employeeId = 'NBX-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('employeeId').value = employeeId;
    
    // Form submission handler
    const form = document.getElementById('memberForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect all form data
        const formData = {
            employeeId: document.getElementById('employeeId').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            gender: document.getElementById('gender').value,
            dob: document.getElementById('dob').value,
            role: document.getElementById('role').value,
            department: document.getElementById('department').value,
            startDate: document.getElementById('startDate').value,
            github: document.getElementById('github').value,
            linkedin: document.getElementById('linkedin').value,
            bio: document.getElementById('bio').value
        };
        
        // Here you would normally send data to Supabase
        // For now, we'll store in localStorage and redirect
        localStorage.setItem('memberData', JSON.stringify(formData));
        
        // Redirect to card page
        window.location.href = 'card.html';
    });
    
    // Set current date as default for start date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('startDate').value = formattedDate;
});