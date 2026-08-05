// ==========================================
// LOGIC 1: DYNAMIC FOOTER DATES
// ==========================================

const currentYearSpan = document.getElementById('currentyear');
const lastModifiedSpan = document.getElementById('lastModified');

const today = new Date();

currentYearSpan.innerHTML = today.getFullYear();
lastModifiedSpan.innerHTML = `Last Modification: ${document.lastModified}`;

// ==========================================
// LOGIC 2: MOBILE HAMBURGER MENU
// ==========================================

const navButton = document.getElementById('nav-btn');
const navMenu = document.getElementById('nav-menu');

navButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    if (navMenu.classList.contains('open')) {
        navButton.innerHTML = '&#10005;';
    }
    else {
        navButton.innerHTML = '&#9776;';
    }
});

// ==========================================
// LOGIC 3: THE MOVIE DATABASE (Array of Objects)
// ==========================================

const movies = [
    {
        title: "The Dark Knight",
        year: "2008",
        rating: "PG-13",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        title: "Inception",
        year: "2010",
        rating: "PG-13",
        poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
        title: "Interstellar",
        year: "2014",
        rating: "PG-13",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeX3n13L1R79M0.jpg",
        plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
        title: "The Matrix",
        year: "1999",
        rating: "R",
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    },
    {
        title: "Dune: Part Two",
        year: "2024",
        rating: "PG-13",
        poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2TGp84jJ9.jpg",
        plot: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family."
    }
];

// ==========================================
// LOGIC 4: INJECTING MOVIES INTO THE HTML
// ==========================================

const movieGrid = document.getElementById('movie-grid');

function displayMovies(movieList) {
    if (!movieGrid) return;

    movieGrid.innerHTML = '';

    movieList.forEach((movie, index) => {
        const card = document.createElement('article'); 
        card.classList.add('movie-card');
        
        // THE FIX: Add the click event listener directly to the card
        card.addEventListener('click', () => {
            window.openModal(index);
        });

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="card-info">
                <h3>${movie.title}</h3>
                <p>${movie.year} | ${movie.rating}</p>
            </div>
        `;
        
        movieGrid.appendChild(card);
    });
}

displayMovies(movies);
// ==========================================
// LOGIC 5: HERO SLIDESHOW TIMER
// ==========================================

// 1. Find the HTML elements we just created
const heroImage = document.getElementById('hero-image');
const heroTitle = document.getElementById('hero-title');
const heroPlot = document.getElementById('hero-plot');

if (heroImage) {
    let currentMovieIndex = 0;

    function updateHero() {
        const featuredMovie = movies[currentMovieIndex];
        
        heroImage.style.opacity = 0;
        heroTitle.style.opacity = 0;
        heroPlot.style.opacity = 0;
 
        setTimeout(() => {
            heroImage.src = featuredMovie.poster;
            heroTitle.innerHTML = featuredMovie.title;
            heroPlot.innerHTML = featuredMovie.plot;
            
            heroImage.style.opacity = 1;
            heroTitle.style.opacity = 1;
            heroPlot.style.opacity = 1;
        }, 500);

        currentMovieIndex++;
        if (currentMovieIndex >= movies.length) {
            currentMovieIndex = 0;
        }
    }

    updateHero();
    setInterval(updateHero, 7000);
}

// ==========================================
// LOGIC 6: INTERACTIVE MODAL
// ==========================================

const modal = document.getElementById('movie-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalPlot = document.getElementById('modal-plot');
const modalPoster = document.getElementById('modal-poster');

if (modal) {
    // Attach to 'window' so inline HTML onclick attributes can see it
    window.openModal = function(movieIndex) {
        // Grab the movie from your placeholder array
        const selectedMovie = movies[movieIndex];
        
        // Inject the data
        modalTitle.innerHTML = selectedMovie.title;
        modalPlot.innerHTML = selectedMovie.plot;
        modalPoster.src = selectedMovie.poster;
        modalPoster.alt = `${selectedMovie.title} Poster`;

        // Pop open the modal natively
        modal.showModal();
    };

    // Close button logic
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });

    // Close if user clicks outside the modal box
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });
}