import { fetchMovies, searchMovies } from './api.js';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from './storage.js';
import { displayThanksData } from './thanks.js';

// --- GLOBAL STATE ---
let movies = [];
let currentPage = 1;
let currentOpenMovie = null;
let currentMovieIndex = 0;
let heroInterval;

// --- DOM ELEMENTS ---
const movieGrid = document.getElementById('movie-grid');
const watchlistGrid = document.getElementById('watchlist-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('movie-modal');

// --- FOOTER & NAV ---
// document.getElementById('currentyear').innerHTML = new Date().getFullYear();
// document.getElementById('lastModified').innerHTML = `Last Modification: ${document.lastModified}`;

// --- FOOTER & NAV ---
const yearElement = document.getElementById('currentyear');
if (yearElement) yearElement.innerHTML = new Date().getFullYear();

const lastModElement = document.getElementById('lastModified');
if (lastModElement) lastModElement.innerHTML = `Last Modification: ${document.lastModified}`;

const navButton = document.getElementById('nav-btn');
const navMenu = document.getElementById('nav-menu');
if (navButton && navMenu) {
    navButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navButton.innerHTML = navMenu.classList.contains('open') ? '&#10005;' : '&#9776;';
    });
}

// --- INITIALIZATION ---
async function initApp() {
    if (movieGrid) {
        const newMovies = await fetchMovies(currentPage);
        if (newMovies) {
            movies = newMovies;
            displayMovies(movies);
            startHeroSlideshow();
        } else {
            movieGrid.innerHTML = '<p class="empty-message">Failed to load movies.</p>';
        }
    }

    if (watchlistGrid) {
        renderWatchlist();
    }
}

// --- RENDER FUNCTIONS ---
function displayMovies(movieList) {
    if (!movieGrid) return;
    movieGrid.innerHTML = '';

    movieList.forEach((movie) => {
        const card = document.createElement('article');
        card.classList.add('movie-card');
        card.addEventListener('click', () => openModal(movie));

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

// --- HERO SLIDESHOW ---
function startHeroSlideshow() {
    const heroImage = document.getElementById('hero-image');
    if (!heroImage || movies.length === 0) return;

    updateHero();
    heroInterval = setInterval(updateHero, 7000);
}

function updateHero() {
    const heroImage = document.getElementById('hero-image');
    const heroTitle = document.getElementById('hero-title');
    const heroPlot = document.getElementById('hero-plot');
    
    if (!heroImage) return;

    const featuredMovie = movies[currentMovieIndex];
    heroImage.style.opacity = 0;
    heroTitle.style.opacity = 0;
    heroPlot.style.opacity = 0;

    setTimeout(() => {
        heroImage.src = featuredMovie.backdrop;
        heroTitle.innerHTML = featuredMovie.title;
        heroPlot.innerHTML = featuredMovie.plot;
        
        heroImage.style.opacity = 1;
        heroTitle.style.opacity = 1;
        heroPlot.style.opacity = 1;
    }, 500);

    currentMovieIndex = (currentMovieIndex + 1) % 5; 
}

// --- EVENT LISTENERS ---
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', async () => {
        currentPage++;
        const newMovies = await fetchMovies(currentPage);
        if (newMovies) {
            movies = [...movies, ...newMovies];
            displayMovies(movies);
        }
    });
}

if (searchForm && searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = e.target.value.trim();
        if (searchTerm === '') {
            displayMovies(movies);
            return;
        }

        const searchResults = await searchMovies(searchTerm);
        if (searchResults && searchResults.length > 0) {
            displayMovies(searchResults);
        } else if (movieGrid) {
            movieGrid.innerHTML = `<p class="empty-message">No movies found matching "${searchTerm}".</p>`;
        }
    });
}


// --- MODAL LOGIC ---
function openModal(movie) {
    if (!modal) return;
    
    currentOpenMovie = movie;
    document.getElementById('modal-title').innerHTML = movie.title;
    document.getElementById('modal-plot').innerHTML = movie.plot;
    document.getElementById('modal-poster').src = movie.backdrop || movie.poster;
    document.getElementById('modal-poster').alt = `${movie.title} Backdrop`;

    modal.showModal();
}

if (modal) {
    document.getElementById('close-modal').addEventListener('click', () => modal.close());
    
    modal.addEventListener('click', (e) => {
        const dims = modal.getBoundingClientRect();
        if (e.clientX < dims.left || e.clientX > dims.right || e.clientY < dims.top || e.clientY > dims.bottom) {
            modal.close();
        }
    });

    const addWatchlistBtn = document.getElementById('add-watchlist-btn');
    if (addWatchlistBtn) {
        addWatchlistBtn.addEventListener('click', () => {
            if (currentOpenMovie) addToWatchlist(currentOpenMovie);
        });
    }
}

// --- WATCHLIST PAGE LOGIC ---
function renderWatchlist() {
    if (!watchlistGrid) return;
    
    const savedMovies = getWatchlist();
    watchlistGrid.innerHTML = '';

    if (savedMovies.length === 0) {
        watchlistGrid.innerHTML = '<p class="empty-message">Your watchlist is empty. Go add some movies!</p>';
        return;
    }

    savedMovies.forEach((movie) => {
        const card = document.createElement('article');
        card.classList.add('movie-card');

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="card-info">
                <h3>${movie.title}</h3>
                <p>${movie.year} | ${movie.rating}</p>
                <button class="remove-btn" data-title="${movie.title}">Remove</button>
            </div>
        `;
        watchlistGrid.appendChild(card);
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const titleToRemove = e.target.getAttribute('data-title');
            removeFromWatchlist(titleToRemove);
            renderWatchlist(); 
        });
    });
}

// ---  FORM ACTION PAGE ---
const params = new URLSearchParams(window.location.search);
const query = params.get('query');

if (query && document.getElementById('search-results-grid')) {
    const searchGrid = document.getElementById('search-results-grid');
    
    if (searchInput) searchInput.value = query;

    searchMovies(query).then(results => {
        searchGrid.innerHTML = '';
        if (results && results.length > 0) {
            results.forEach(movie => {
                const card = document.createElement('article');
                card.classList.add('movie-card');
                card.addEventListener('click', () => openModal(movie));
                card.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                    <div class="card-info">
                        <h3>${movie.title}</h3>
                        <p>${movie.year} | &#9733; ${movie.rating}</p>
                    </div>
                `;
                searchGrid.appendChild(card);
            });
        } else {
            searchGrid.innerHTML = `<p class="empty-message">No movies found for "${query}".</p>`;
        }
    });
}

// --- BOOT UP THE APPLICATION ---
document.addEventListener('DOMContentLoaded', () => {
    
    initApp();

    displayThanksData();
    
});