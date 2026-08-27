export function displayThanksData() {
    const emailDisplay = document.getElementById('submitted-email');
    
    if (!emailDisplay) return;

    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get('email');
    
    if (userEmail) {
        emailDisplay.textContent = userEmail;
    } else {
        emailDisplay.textContent = "No email provided.";
    }
}