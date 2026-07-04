const hamburgerBtn = document.querySelector('#nav-btn');
const navigation = document.querySelector('.navigation');

hamburgerBtn.addEventListener('click', () => {
    navigation.classList.toggle('show');
    hamburgerBtn.classList.toggle('show');
});