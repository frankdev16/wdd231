export function getWatchlist() {
    return JSON.parse(localStorage.getItem('cineTrackWatchlist')) || [];
}

export function addToWatchlist(movie) {
    let watchlist = getWatchlist();
    const isAlreadySaved = watchlist.some(saved => saved.title === movie.title);

    if (!isAlreadySaved) {
        watchlist.push(movie);
        localStorage.setItem('cineTrackWatchlist', JSON.stringify(watchlist));
        alert(`${movie.title} has been added to your watchlist!`);
    } else {
        alert(`${movie.title} is already in your watchlist.`);
    }
}

export function removeFromWatchlist(movieTitle) {
    let watchlist = getWatchlist();
    watchlist = watchlist.filter(movie => movie.title !== movieTitle);
    localStorage.setItem('cineTrackWatchlist', JSON.stringify(watchlist));
}