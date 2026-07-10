const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url); // request
  const data = await response.json(); // parse the JSON data
    //   console.log(data.prophets); // temp output test of data response 
    displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
   prophets.forEach((prophet) => {
       // card build code goes here
       const section = document.createElement('section');
       const fullName = document.createElement('h2');
       const portrait = document.createElement('img');

       fullName.textContent = `${prophet.name} ${prophet.lastname}`;
       portrait.setAttribute('src', prophet.imageurl);
       portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - Prophet number ${prophet.order}`);
       portrait.setAttribute('loading', 'lazy');
       portrait.setAttribute('width', '100%');
       portrait.setAttribute('height', 'auto');

       section.appendChild(fullName);
       section.appendChild(portrait);
       cards.appendChild(section);
  });
}

const footer = document.querySelector('footer');

footer.textContent = `Franklin Anyaogu | WDD231`;

