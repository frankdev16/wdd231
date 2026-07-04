const navButton = document.getElementById('nav-btn');

const nav = document.getElementById('nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    nav.classList.toggle('show');
});




