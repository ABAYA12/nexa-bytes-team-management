
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase first
    const supabaseUrl = 'https://smzezqtlqndrbesykjoo.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtemV6cXRscW5kcmJlc3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDE0MDAsImV4cCI6MjA1NzcxNzQwMH0.RCzrsJ9dnvPaDiOa1g8zDqBo9WaiqZLdDtabm9fMBtw';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    // Generate employee ID (NBX-XXXX where XXXX is random 4-digit number)
    const employeeId = 'NBX-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('employeeId').value = employeeId;
    
    // Form submission handler
    const form = document.getElementById('memberForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Map form data to database columns (EXACTLY matching your table schema)
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
            github: document.getElementById('github').value,
            linkedin: document.getElementById('linkedin').value,
            bio: document.getElementById('bio').value,
            start_date: document.getElementById('startDate').value
        };
        
        try {
            // Insert into Supabase
            const { data, error } = await supabase
                .from('employees')
                .insert([formData]);

            if (error) throw error;

            // Keep original localStorage & redirect (using original field names)
            localStorage.setItem('memberData', JSON.stringify({
                employeeId: formData.employee_id,
                firstName: formData.first_name,
                lastName: formData.last_name,
                email: formData.email,
                phone: formData.phone_number,
                gender: formData.gender,
                dob: formData.dob,
                role: formData.role,
                department: formData.department,
                github: formData.github,
                linkedin: formData.linkedin,
                bio: formData.bio,
                startDate: formData.start_date
            }));
            
            window.location.href = 'card.html';

        } catch (error) {
            console.error("Supabase Error:", error);
            alert("Failed to save data. Error: " + error.message);
        }
    });
    
    // Set current date as default for start date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('startDate').value = formattedDate;
});