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

// // ==========================================
// // LOGIC 3: THE MOVIE DATABASE (Array of Objects)
// // ==========================================

// const movies = [
//     {
//         title: "The Dark Knight",
//         year: "2008",
//         rating: "PG-13",
//         poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
//         plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
//     },
//     {
//         title: "Inception",
//         year: "2010",
//         rating: "PG-13",
//         poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
//         plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
//     },
//     {
//         title: "Interstellar",
//         year: "2014",
//         rating: "PG-13",
//         poster: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeX3n13L1R79M0.jpg",
//         plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
//     },
//     {
//         title: "The Matrix",
//         year: "1999",
//         rating: "R",
//         poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
//         plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
//     },
//     {
//         title: "Dune: Part Two",
//         year: "2024",
//         rating: "PG-13",
//         poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2TGp84jJ9.jpg",
//         plot: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family."
//     }
// ];

// // ==========================================
// // LOGIC 4: INJECTING MOVIES INTO THE HTML
// // ==========================================

// const movieGrid = document.getElementById('movie-grid');

// function displayMovies(movieList) {
//     if (!movieGrid) return;

//     movieGrid.innerHTML = '';

//     movieList.forEach((movie, index) => {
//         const card = document.createElement('article');
//         card.classList.add('movie-card');
        
//         // THE FIX: Add the click event listener directly to the card
//         card.addEventListener('click', () => {
//             window.openModal(index);
//         });

//         card.innerHTML = `
//             <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
//             <div class="card-info">
//                 <h3>${movie.title}</h3>
//                 <p>${movie.year} | ${movie.rating}</p>
//             </div>
//         `;
        
//         movieGrid.appendChild(card);
//     });
// }

// displayMovies(movies);

// ==========================================
// LOGIC 3 & 4: FETCHING LIVE DATA & LOAD MORE
// ==========================================

const apiKey = '3a7cb81c2157f241da49ceb926f84ce3'; 
let currentPage = 1; // Keeps track of which API page we are on
let movies = []; 

const movieGrid = document.getElementById('movie-grid');
const loadMoreBtn = document.getElementById('load-more-btn');

async function getMovies(page = 1) {
    // Notice the URL now uses the dynamic ${page} variable at the very end
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch from TMDB');
        
        const data = await response.json();
        
        // Map the new incoming data
        const newMovies = data.results.map(movie => { 
            return {
                title: movie.title,
                year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A', 
                rating: movie.vote_average.toFixed(1), 
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                backdrop: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`, 
                plot: movie.overview
            };
        });

        // Add the newly fetched movies to our main array
        movies = [...movies, ...newMovies];

        // Render the updated grid
        displayMovies(movies);

        // Only start the hero slideshow on the very first page load
        if (page === 1 && document.getElementById('hero-image')) {
            updateHero(); 
            setInterval(updateHero, 7000);
        }

    } catch (error) {
        console.error("API Error:", error);
        if (movieGrid && page === 1) {
            movieGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Failed to load movies. Please check your network connection.</p>';
        }
    }
}

function displayMovies(movieList) {
    if (!movieGrid) return;
    movieGrid.innerHTML = '';

    movieList.forEach((movie, index) => {
        const card = document.createElement('article'); 
        card.classList.add('movie-card');
        
        card.addEventListener('click', () => {
            window.openModal(index);
        });

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="card-info">
                <h3>${movie.title}</h3>
                <p>${movie.year} | &#9733; ${movie.rating}</p>
            </div>
        `;
        
        movieGrid.appendChild(card);
    });
}

// Listen for the Load More click
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        currentPage++; // Increase the page number
        getMovies(currentPage); // Fetch the next batch
    });
}

// Trigger the initial fetch for page 1
getMovies(currentPage);


// ==========================================
// LOGIC 5: HERO SLIDESHOW TIMER
// ==========================================

const heroImage = document.getElementById('hero-image');
const heroTitle = document.getElementById('hero-title');
const heroPlot = document.getElementById('hero-plot');

let currentMovieIndex = 0;

// Remove the 'if (heroImage)' wrapper here since it is now called dynamically from the fetch
function updateHero() {
    if (!heroImage) return; // Failsafe
    
    const featuredMovie = movies[currentMovieIndex];
    
    heroImage.style.opacity = 0;
    heroTitle.style.opacity = 0;
    heroPlot.style.opacity = 0;

    setTimeout(() => {
        // THE CRITICAL CHANGE: Use the widescreen backdrop!
        heroImage.src = featuredMovie.backdrop; 
        heroTitle.innerHTML = featuredMovie.title;
        heroPlot.innerHTML = featuredMovie.plot;
        
        heroImage.style.opacity = 1;
        heroTitle.style.opacity = 1;
        heroPlot.style.opacity = 1;
    }, 500);

    currentMovieIndex++;
    if (currentMovieIndex >= 5) { // Limit the slideshow to just the top 5 movies
        currentMovieIndex = 0;
    }
}

// ==========================================
// LOGIC 6: INTERACTIVE MODAL & LOCAL STORAGE
// ==========================================

const modal = document.getElementById('movie-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalPlot = document.getElementById('modal-plot');
const modalPoster = document.getElementById('modal-poster');
const addWatchlistBtn = document.getElementById('add-watchlist-btn');

let currentOpenMovie = null;

if (modal) {
    window.openModal = function(movieIndex) {
        currentOpenMovie = movies[movieIndex];
        
        modalTitle.innerHTML = currentOpenMovie.title;
        modalPlot.innerHTML = currentOpenMovie.plot;
        modalPoster.src = currentOpenMovie.poster;
        modalPoster.alt = `${currentOpenMovie.title} Poster`;

        modal.showModal();
    };

    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });

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

    // --- NEW LOCAL STORAGE LOGIC ---
    if (addWatchlistBtn) {

        addWatchlistBtn.addEventListener('click', () => {
            if (!currentOpenMovie) return;
            let watchlist = JSON.parse(localStorage.getItem('cineTrackWatchlist')) || [];
            const isAlreadySaved = watchlist.some(movie => movie.title === currentOpenMovie.title);

            if (!isAlreadySaved) {
                watchlist.push(currentOpenMovie);
              
                localStorage.setItem('cineTrackWatchlist', JSON.stringify(watchlist));
    
                alert(`${currentOpenMovie.title} has been added to your watchlist!`);
            } else {
                alert(`${currentOpenMovie.title} is already in your watchlist.`);
            }
        });
    }
}

// ==========================================
// LOGIC 7: LIVE TMDB SEARCH API INTEGRATION
// ==========================================

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

if (searchForm && searchInput) {
    // Prevent default form submission on Enter
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
    });

    // Listen for keystrokes in real-time
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = e.target.value.trim();

        // If the search box is cleared, go back to showing the popular movies list
        if (searchTerm === '') {
            displayMovies(movies);
            return;
        }

        // TMDB Search Endpoint URL
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(searchTerm)}&page=1`;

        try {
            const response = await fetch(searchUrl);
            if (!response.ok) throw new Error('Search failed');

            const data = await response.json();

            // Map the search results to match our movie object structure
            const searchResults = data.results.map(movie => {
                return {
                    title: movie.title,
                    year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A', 
                    rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A', 
                    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'images/placeholder.jpg',
                    backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '', 
                    plot: movie.overview || 'No description available.'
                };
            });

            const movieGrid = document.getElementById('movie-grid');

            if (searchResults.length === 0) {
                movieGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem;">No movies found matching "${searchTerm}".</p>`;
            } else {
                // Temporarily display the searched movies in the grid
                displaySearchedMovies(searchResults);
            }

        } catch (error) {
            console.error("Search API Error:", error);
        }
    });
}

// A helper function to display search results so modals still open correctly
function displaySearchedMovies(searchResults) {
    if (!movieGrid) return;
    movieGrid.innerHTML = '';

    searchResults.forEach((movie, index) => {
        const card = document.createElement('article'); 
        card.classList.add('movie-card');
        
        // We temporarily store search results globally or pass them to a handler if needed,
        // but for the modal, let's update a temporary search array reference:
        card.addEventListener('click', () => {
            // Open modal using the search results list
            openSearchModal(movie);
        });

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="card-info">
                <h3>${movie.title}</h3>
                <p>${movie.year} | &#9733; ${movie.rating}</p>
            </div>
        `;
        
        movieGrid.appendChild(card);
    });
}

// Special modal opener for search results since indices differ from the main array
function openSearchModal(movie) {
    const modal = document.getElementById('movie-modal');
    if (!modal) return;

    const modalTitle = document.getElementById('modal-title');
    const modalPlot = document.getElementById('modal-plot');
    const modalPoster = document.getElementById('modal-poster');
    
    // Set currentOpenMovie so the Watchlist button works for searched movies too!
    currentOpenMovie = movie;
    
    modalTitle.innerHTML = movie.title;
    modalPlot.innerHTML = movie.plot;
    modalPoster.src = movie.poster;
    modalPoster.alt = `${movie.title} Poster`;

    modal.showModal();
}
// ==========================================
// LOGIC 8: RENDER WATCHLIST PAGE
// ==========================================

const watchlistGrid = document.getElementById('watchlist-grid');

if (watchlistGrid) {
    function renderWatchlist() {
        // 1. Grab the saved string from memory and convert it back to an array
        // If nothing is saved yet, fallback to an empty array []
        let savedMovies = JSON.parse(localStorage.getItem('cineTrackWatchlist')) || [];

        // 2. Clear the grid so we don't accidentally duplicate cards
        watchlistGrid.innerHTML = '';

        // 3. Handle the empty state
        if (savedMovies.length === 0) {
            watchlistGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem;">Your watchlist is empty. Go add some movies!</p>';
            return; // Stops the function right here
        }

        // 4. Loop through the saved movies and build the cards
        savedMovies.forEach((movie) => {
            const card = document.createElement('article');
            card.classList.add('movie-card');

            // Notice we added a "Remove" button that passes the movie's title
            card.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="card-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.year} | ${movie.rating}</p>
                    <button class="remove-btn" onclick="removeFromWatchlist('${movie.title}')">Remove</button>
                </div>
            `;
            
            watchlistGrid.appendChild(card);
        });
    }

    // 5. Global function to remove a movie
    window.removeFromWatchlist = function(movieTitle) {
        // Grab the current list
        let savedMovies = JSON.parse(localStorage.getItem('cineTrackWatchlist')) || [];
        
        // Filter out the movie that matches the title we want to delete
        savedMovies = savedMovies.filter(movie => movie.title !== movieTitle);
        
        // Save the new, updated list back to memory
        localStorage.setItem('cineTrackWatchlist', JSON.stringify(savedMovies));
        
        // Re-render the grid instantly so the card disappears
        renderWatchlist();
    };

    // 6. Run the render function immediately when the page loads
    renderWatchlist();
}