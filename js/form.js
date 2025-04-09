
// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize Supabase first
//     const supabaseUrl = 'https://smzezqtlqndrbesykjoo.supabase.co';
//     const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtemV6cXRscW5kcmJlc3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDE0MDAsImV4cCI6MjA1NzcxNzQwMH0.RCzrsJ9dnvPaDiOa1g8zDqBo9WaiqZLdDtabm9fMBtw';
//     const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

//     // Generate employee ID (NBX-XXXX where XXXX is random 4-digit number)
//     const employeeId = 'NBX-' + Math.floor(1000 + Math.random() * 9000);
//     document.getElementById('employeeId').value = employeeId;
    
//     // Form submission handler
//     const form = document.getElementById('memberForm');
//     form.addEventListener('submit', async function(e) {
//         e.preventDefault();
        
//         // Map form data to database columns (EXACTLY matching your table schema)
//         const formData = {
//             employee_id: document.getElementById('employeeId').value,
//             first_name: document.getElementById('firstName').value,
//             last_name: document.getElementById('lastName').value,
//             email: document.getElementById('email').value,
//             phone_number: document.getElementById('phone').value,
//             gender: document.getElementById('gender').value,
//             dob: document.getElementById('dob').value,
//             role: document.getElementById('role').value,
//             department: document.getElementById('department').value,
//             github: document.getElementById('github').value,
//             linkedin: document.getElementById('linkedin').value,
//             bio: document.getElementById('bio').value,
//             start_date: document.getElementById('startDate').value
//         };
        
//         try {
//             // Insert into Supabase
//             const { data, error } = await supabase
//                 .from('employees')
//                 .insert([formData]);

//             if (error) throw error;

//             // Keep original localStorage & redirect (using original field names)
//             localStorage.setItem('memberData', JSON.stringify({
//                 employeeId: formData.employee_id,
//                 firstName: formData.first_name,
//                 lastName: formData.last_name,
//                 email: formData.email,
//                 phone: formData.phone_number,
//                 gender: formData.gender,
//                 dob: formData.dob,
//                 role: formData.role,
//                 department: formData.department,
//                 github: formData.github,
//                 linkedin: formData.linkedin,
//                 bio: formData.bio,
//                 startDate: formData.start_date
//             }));
            
//             window.location.href = 'card.html';

//         } catch (error) {
//             console.error("Supabase Error:", error);
//             alert("Failed to save data. Error: " + error.message);
//         }
//     });
    
//     // Set current date as default for start date
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     document.getElementById('startDate').value = formattedDate;
// });


document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase first
    const supabaseUrl = 'https://smzezqtlqndrbesykjoo.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtemV6cXRscW5kcmJlc3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDE0MDAsImV4cCI6MjA1NzcxNzQwMH0.RCzrsJ9dnvPaDiOa1g8zDqBo9WaiqZLdDtabm9fMBtw';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    // Generate employee ID (NBX-XXXX where XXXX is random 4-digit number)
    const employeeId = 'NBX-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('employeeId').value = employeeId;
    
    // Create success popup element (added to DOM but hidden)
    const successPopup = document.createElement('div');
    successPopup.id = 'successPopup';
    successPopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        max-width: 400px;
        width: 90%;
        text-align: center;
        display: none;
        border: 1px solid #e0e0e0;
    `;
    successPopup.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h2 style="color: #4CAF50; margin-bottom: 10px;">Success!</h2>
        <p style="color: #555; margin-bottom: 20px;">Employee information has been successfully submitted.</p>
        <button id="popupCloseBtn" style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px;">Continue</button>
    `;
    document.body.appendChild(successPopup);

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

            // Show success popup instead of immediate redirect
            successPopup.style.display = 'block';
            
            // Add overlay
            const overlay = document.createElement('div');
            overlay.id = 'popupOverlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 999;
            `;
            document.body.appendChild(overlay);

            // Close button handler
            document.getElementById('popupCloseBtn').addEventListener('click', function() {
                successPopup.style.display = 'none';
                overlay.remove();
                window.location.href = 'card.html';
            });

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