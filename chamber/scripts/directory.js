const directoryContainer = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

const membersURL = 'data/members.json';

async function getChamberMembers() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const displayMembers = (members) => {
    directoryContainer.innerHTML = '';

    members.forEach((member) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let membership = document.createElement('p');

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        membership.textContent = `Membership Level: ${member.membership_level}`;
        website.textContent = "Visit Website";
        website.href = member.website;
        website.target = "_blank";

        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `${member.name} Logo`);
        logo.setAttribute('loading', 'lazy'); 
        logo.setAttribute('width', '200');
        logo.setAttribute('height', 'auto');

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(website);

        directoryContainer.appendChild(card);
    });
}


gridButton.addEventListener('click', () => {
    directoryContainer.classList.add('grid');
    directoryContainer.classList.remove('list');
});

listButton.addEventListener('click', () => {
    directoryContainer.classList.add('list');
    directoryContainer.classList.remove('grid');
});

getChamberMembers();