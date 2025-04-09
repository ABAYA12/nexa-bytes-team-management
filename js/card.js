document.addEventListener('DOMContentLoaded', function() {
    // Retrieve member data from localStorage
    const memberData = JSON.parse(localStorage.getItem('memberData'));
    
    if (memberData) {
        // Display member information
        document.getElementById('fullName').textContent = `${memberData.firstName} ${memberData.lastName}`;
        document.getElementById('employeeId').textContent = memberData.employeeId;
        document.getElementById('role').textContent = memberData.role;
        document.getElementById('department').textContent = memberData.department;
        
        // Format start date
        const startDate = new Date(memberData.startDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('startDate').textContent = startDate.toLocaleDateString('en-US', options);
        
        // Set member initials
        const initials = (memberData.firstName.charAt(0) + memberData.lastName.charAt(0)).toUpperCase();
        document.getElementById('memberInitials').textContent = initials;
        
        // Generate QR code
        new QRCode(document.getElementById('qrCode'), {
            text: memberData.employeeId,
            width: 150,
            height: 150,
            colorDark: "#1B263B",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        // No data found, redirect to form
        window.location.href = 'form.html';
    }
});