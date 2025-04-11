
// document.addEventListener('DOMContentLoaded', function() {
//     // Generate and display intern ID immediately
//     const internId = 'INTERN-' + Math.floor(1000 + Math.random() * 9000);
//     document.getElementById('internIdDisplay').textContent = internId;
    
//     // Set current date as default for start date
//     document.getElementById('startDate').value = new Date().toISOString().split('T')[0];

//     // Initialize Supabase
//     const supabaseUrl = 'https://smzezqtlqndrbesykjoo.supabase.co';
//     const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtemV6cXRscW5kcmJlc3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDE0MDAsImV4cCI6MjA1NzcxNzQwMH0.RCzrsJ9dnvPaDiOa1g8zDqBo9WaiqZLdDtabm9fMBtw';
//     const supabase = supabase.createClient(supabaseUrl, supabaseKey);

//     // Form submission handler
//     const form = document.getElementById('internForm');
//     form.addEventListener('submit', async function(e) {
//         e.preventDefault(); // Prevent default form submission
        
//         // Collect form data
//         const formData = {
//             intern_id: internId,
//             first_name: document.getElementById('firstName').value,
//             last_name: document.getElementById('lastName').value,
//             email: document.getElementById('email').value,
//             phone_number: document.getElementById('phone').value || null,
//             university: document.getElementById('university').value || null,
//             role: document.getElementById('role').value,
//             department: document.getElementById('department').value,
//             start_date: document.getElementById('startDate').value
//         };
        
//         try {
//             // Insert into Supabase
//             const { data, error } = await supabase
//                 .from('interns')
//                 .insert([formData]);

//             if (error) throw error;

//             // Calculate end date (6 months from start date)
//             const startDate = new Date(formData.start_date);
//             const endDate = new Date(startDate);
//             endDate.setMonth(startDate.getMonth() + 6);

//             // Store data for card page
//             localStorage.setItem('internData', JSON.stringify({
//                 internId: formData.intern_id,
//                 firstName: formData.first_name,
//                 lastName: formData.last_name,
//                 email: formData.email,
//                 phone: formData.phone_number,
//                 university: formData.university,
//                 role: formData.role,
//                 department: formData.department,
//                 startDate: formData.start_date,
//                 endDate: endDate.toISOString().split('T')[0]
//             }));

//             // Show success popup
//             document.getElementById('popupOverlay').style.display = 'flex';
            
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Registration failed: " + error.message);
//         }
//     });

//     // View card button handler
//     document.getElementById('viewCardBtn').addEventListener('click', function() {
//         window.location.href = 'interns-card.html';
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    // Generate and display intern ID immediately
    const internId = 'INTERN-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('internIdDisplay').textContent = internId;
    
    // Set current date as default for start date
    document.getElementById('startDate').value = new Date().toISOString().split('T')[0];

    // Initialize Supabase - FIXED: Properly import and initialize Supabase client
    const supabaseUrl = 'https://smzezqtlqndrbesykjoo.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtemV6cXRscW5kcmJlc3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDE0MDAsImV4cCI6MjA1NzcxNzQwMH0.RCzrsJ9dnvPaDiOa1g8zDqBo9WaiqZLdDtabm9fMBtw';
    // Make sure you've imported the Supabase JS client in your HTML file
    const supabase = supabaseCreateClient(supabaseUrl, supabaseKey);

    // Form submission handler
    const form = document.getElementById('internForm');
    if (form) { // Check if form exists
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Collect form data
            const formData = {
                intern_id: internId,
                first_name: document.getElementById('firstName').value,
                last_name: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone_number: document.getElementById('phone').value || null,
                university: document.getElementById('university').value || null,
                role: document.getElementById('role').value,
                department: document.getElementById('department').value,
                start_date: document.getElementById('startDate').value
            };
            
            try {
                // Insert into Supabase
                const { data, error } = await supabase
                    .from('interns')
                    .insert([formData]);

                if (error) throw error;

                // Calculate end date (6 months from start date)
                const startDate = new Date(formData.start_date);
                const endDate = new Date(startDate);
                endDate.setMonth(startDate.getMonth() + 6);

                // Store data for card page
                localStorage.setItem('internData', JSON.stringify({
                    internId: formData.intern_id,
                    firstName: formData.first_name,
                    lastName: formData.last_name,
                    email: formData.email,
                    phone: formData.phone_number,
                    university: formData.university,
                    role: formData.role,
                    department: formData.department,
                    startDate: formData.start_date,
                    endDate: endDate.toISOString().split('T')[0]
                }));

                // Show success popup
                const popupOverlay = document.getElementById('popupOverlay');
                if (popupOverlay) {
                    popupOverlay.style.display = 'flex';
                } else {
                    console.error("Popup overlay element not found");
                    // If popup doesn't exist, redirect immediately
                    window.location.href = 'interns-card.html';
                }
                
            } catch (error) {
                console.error("Error:", error);
                alert("Registration failed: " + error.message);
            }
        });
    } else {
        console.error("Form element not found");
    }

    // View card button handler
    const viewCardBtn = document.getElementById('viewCardBtn');
    if (viewCardBtn) {
        viewCardBtn.addEventListener('click', function() {
            window.location.href = 'interns-card.html';
        });
    } else {
        console.error("View card button not found");
    }
    
    // ADDED: Close popup button handler (if you have one)
    const closePopupBtn = document.getElementById('closePopupBtn');
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            document.getElementById('popupOverlay').style.display = 'none';
            // Redirect to card page after closing popup
            window.location.href = 'interns-card.html';
        });
    }
    
    // ADDED: Auto-redirect after showing popup for a few seconds
    // This ensures redirection happens even if user doesn't click the button
    const autoRedirectDelay = 3000; // 3 seconds
    const popupOverlay = document.getElementById('popupOverlay');
    if (popupOverlay && popupOverlay.style.display === 'flex') {
        setTimeout(function() {
            window.location.href = 'interns-card.html';
        }, autoRedirectDelay);
    }
});