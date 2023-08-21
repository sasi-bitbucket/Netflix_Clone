// APi key for TMDB
const API_KEY = "da7fe896239d6f7ede9c5fe5cbd1947e";

const requests = {

    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries:`/discover/movie?api_key=${API_KEY}&with_genres=99`,

}

export default requests;

//https://api.themoviedb.org/3/trending/all/week?api_key=da7fe896239d6f7ede9c5fe5cbd1947e&language=en-US
//https://api.themoviedb.org/3/discover/tv?api_key=?api_key=da7fe896239d6f7ede9c5fe5cbd1947e&with_network=213