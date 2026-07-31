import { places } from '../data/discover.mjs';

// ==========================================
// 1. LOCALSTORAGE VISITOR MESSAGE LOGIC
// ==========================================
const visitorMessage = document.querySelector('#visitor-message');
const msInDay = 86400000;
const lastVisit = localStorage.getItem('lastVisitDate');
const now = Date.now();

if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = now - parseInt(lastVisit);
    
    if (timeDifference < msInDay) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
        const daysBetween = Math.floor(timeDifference / msInDay);
        const dayText = daysBetween === 1 ? "day" : "days";
        visitorMessage.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
    }
}

localStorage.setItem('lastVisitDate', now);


// ==========================================
// 2. INJECT 8 CARDS FROM JSON MODULE
// ==========================================
const gridContainer = document.querySelector('#discover-grid');

function displayPlaces(items) {
    gridContainer.innerHTML = '';

    items.forEach((item) => {
        const card = document.createElement('article');
        card.classList.add('discover-card');

        const title = document.createElement('h2');
        title.textContent = item.title;

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = `${item.image}`;
        img.alt = item.title;
        img.setAttribute('loading', 'lazy');
        img.setAttribute('width', '300');
        img.setAttribute('height', '200');
        figure.appendChild(img);

        const address = document.createElement('address');
        address.textContent = item.address;

        const description = document.createElement('p');
        description.textContent = item.description;

        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Learn More';

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        gridContainer.appendChild(card);
    });
}

displayPlaces(places);