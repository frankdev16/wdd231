const apiKey = '3a7cb81c2157f241da49ceb926f84ce3';

export async function fetchMovies(page = 1) {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch popular movies');
        const data = await response.json();
        return formatMovies(data.results);
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

export async function searchMovies(searchTerm) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(searchTerm)}&page=1`;
    try {
        const response = await fetch(searchUrl);
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        return formatMovies(data.results);
    } catch (error) {
        console.error("Search API Error:", error);
        return null;
    }
}

function formatMovies(results) {
    return results.map(movie => ({
        title: movie.title,
        year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'images/placeholder.jpg',
        backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : '',
        plot: movie.overview || 'No description available.'
    }));
}