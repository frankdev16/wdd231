// Select the hamburger button and the navigation menu
const hamburgerBtn = document.querySelector('#nav-btn');
const navigation = document.querySelector('.navigation');

// Listen for a click on the hamburger button
hamburgerBtn.addEventListener('click', () => {
    // Toggle the 'show' class on both elements
    navigation.classList.toggle('show');
    hamburgerBtn.classList.toggle('show');
});