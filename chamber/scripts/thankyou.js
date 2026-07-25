const currentUrl = window.location.href;
const url = new URL(currentUrl);
document.getElementById("res-first").textContent = url.searchParams.get("first_name");
document.getElementById("res-last").textContent = url.searchParams.get("last_name");
document.getElementById("res-email").textContent = url.searchParams.get("email");
document.getElementById("res-phone").textContent = url.searchParams.get("phone");
document.getElementById("res-business").textContent = url.searchParams.get("organization");
const timestamp = url.searchParams.get("timestamp");
if (timestamp) {
    const formattedDate = new Date(timestamp).toLocaleString();
    document.getElementById("res-date").textContent = formattedDate;
}