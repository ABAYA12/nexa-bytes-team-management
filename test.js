// document.addEventListener('DOMContentLoaded', function() {
//     // Generate and display intern ID immediately
//     const internId = 'INTERN-' + Math.floor(1000 + Math.random() * 9000);
//     const internIdDisplay = document.getElementById('internIdDisplay');
//     if (internIdDisplay) {
//         internIdDisplay.textContent = internId;
//     }
    
//     // Set current date as default for start date
//     const startDateElement = document.getElementById('startDate');
//     if (startDateElement) {
//         startDateElement.value = new Date().toISOString().split('T')[0];
//     }

//     // Initialize Supabase
//     const supabaseUrl = 'https://smzezqtlqndrbesykjoo.supabase.co';
//     const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtemV6cXRscW5kcmJlc3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDE0MDAsImV4cCI6MjA1NzcxNzQwMH0.RCzrsJ9dnvPaDiOa1g8zDqBo9WaiqZLdDtabm9fMBtw';
//     const supabase = supabaseCreateClient(supabaseUrl, supabaseKey);

//     // Form submission handler
//     const form = document.getElementById('internForm');
//     if (form) {
//         form.addEventListener('submit', async function(e) {
//             e.preventDefault(); // Prevent default form submission
//             console.log("Form submitted");
            
//             // Collect form data
//             const formData = {
//                 intern_id: internId,
//                 first_name: document.getElementById('firstName').value,
//                 last_name: document.getElementById('lastName').value,
//                 email: document.getElementById('email').value,
//                 phone_number: document.getElementById('phone').value || null,
//                 university: document.getElementById('university').value || null,
//                 role: document.getElementById('role').value,
//                 department: document.getElementById('department').value,
//                 start_date: document.getElementById('startDate').value
//             };
            
//             console.log("Form data collected:", formData);
            
//             try {
//                 // Insert into Supabase
//                 const { data, error } = await supabase
//                     .from('interns')
//                     .insert([formData]);

//                 if (error) {
//                     throw error;
//                 }
                
//                 console.log("Data saved to Supabase successfully");

//                 // Calculate end date (6 months from start date)
//                 const startDate = new Date(formData.start_date);
//                 const endDate = new Date(startDate);
//                 endDate.setMonth(startDate.getMonth() + 6);

//                 // Store data for card page
//                 const cardData = {
//                     internId: formData.intern_id,
//                     firstName: formData.first_name,
//                     lastName: formData.last_name,
//                     email: formData.email,
//                     phone: formData.phone_number,
//                     university: formData.university,
//                     role: formData.role,
//                     department: formData.department,
//                     startDate: formData.start_date,
//                     endDate: endDate.toISOString().split('T')[0]
//                 };
                
//                 localStorage.setItem('internData', JSON.stringify(cardData));
//                 console.log("Data saved to localStorage");
                
//                 // Show success popup if it exists
//                 const popupOverlay = document.getElementById('popupOverlay');
//                 if (popupOverlay) {
//                     console.log("Showing popup");
//                     popupOverlay.style.display = 'flex';
                    
//                     // Important: Set a GUARANTEED redirect after a short delay
//                     setTimeout(function() {
//                         console.log("Redirecting to card page from timeout");
//                         window.location.href = 'interns-card.html';
//                     }, 2000); // 2 seconds
//                 } else {
//                     // No popup, redirect immediately
//                     console.log("No popup found, redirecting immediately");
//                     window.location.href = 'interns-card.html';
//                 }
                
//             } catch (error) {
//                 console.error("Error:", error);
//                 alert("Registration failed: " + error.message);
//             }
//         });
//     } else {
//         console.error("Form element not found");
//     }

//     // View card button handler (inside popup)
//     const viewCardBtn = document.getElementById('viewCardBtn');
//     if (viewCardBtn) {
//         viewCardBtn.addEventListener('click', function() {
//             console.log("View card button clicked");
//             window.location.href = 'interns-card.html';
//         });
//     }
// });


document.addEventListener('DOMContentLoaded', function() {
    // 1. FIRST generate and display the ID immediately
    const internId = 'INTERN-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('internIdDisplay').textContent = internId;
    
    // 2. Set current date as default
    document.getElementById('startDate').value = new Date().toISOString().split('T')[0];

    // 3. Initialize Supabase PROPERLY
    const supabaseUrl = 'https://smzezqtlqndrbesykjoo.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtemV6cXRscW5kcmJlc3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDE0MDAsImV4cCI6MjA1NzcxNzQwMH0.RCzrsJ9dnvPaDiOa1g8zDqBo9WaiqZLdDtabm9fMBtw';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    // 4. Form submission handler
    document.getElementById('internForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get all form values
        const formData = {
            intern_id: internId, // Using the already generated ID
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
            const { error } = await supabase
                .from('interns')
                .insert([formData]);

            if (error) throw error;

            // Calculate end date (6 months)
            const endDate = new Date(formData.start_date);
            endDate.setMonth(endDate.getMonth() + 6);

            // Save data for card page
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
            document.getElementById('popupOverlay').style.display = 'flex';
            
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed. Please try again.\nError: " + error.message);
        }
    });

    // 5. Handle the popup button click
    document.getElementById('viewCardBtn').addEventListener('click', function() {
        window.location.href = 'interns-card.html';
    });
});