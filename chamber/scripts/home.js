// --- WEATHER API LOGIC ---
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const forecastList = document.querySelector('#forecast-list');

const lat = 4.8156;
const lon = 7.0498;
const apiKey = 'b6e1229c4f028ba0057654ff6045f3f1'; 

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error(await forecastResponse.text());
        }
    } catch (error) {
        console.error('Weather Fetch Error:', error);
    }
}

function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
    
    // Capitalize each word in description
    const desc = data.weather[0].description;
    const words = desc.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    weatherDesc.textContent = words.join(" ");

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
}

function displayForecast(data) {
    const days = [data.list[8], data.list[16], data.list[24]];
    
    forecastList.innerHTML = '';
    days.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        
        let li = document.createElement('li');
        li.innerHTML = `<strong>${dayName}:</strong> ${temp}&deg;C`;
        forecastList.appendChild(li);
    });
}

// --- SPOTLIGHT LOGIC ---
const membersUrl = 'data/members.json';
const spotlightContainer = document.querySelector('#spotlight-container');

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        
        const qualifiedMembers = data.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

        const selectedMembers = shuffled.slice(0, 3);
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error('Spotlight Fetch Error:', error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = '';
    
    members.forEach(member => {
        let div = document.createElement('div');
        div.classList.add('spotlight-item');
        
        let logo = document.createElement('img');
        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `${member.name} Logo`);
        logo.setAttribute('loading', 'lazy');
        
        let name = document.createElement('h4');
        name.textContent = member.name;
        
        let phone = document.createElement('p');
        phone.textContent = member.phone;
        
        let website = document.createElement('a');
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        
        let level = document.createElement('p');
        level.innerHTML = `<em>Level: ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</em>`;
        
        div.appendChild(logo);
        div.appendChild(name);
        div.appendChild(level);
        div.appendChild(phone);
        div.appendChild(website);
        
        spotlightContainer.appendChild(div);
    });
}

fetchWeather();
fetchSpotlights();