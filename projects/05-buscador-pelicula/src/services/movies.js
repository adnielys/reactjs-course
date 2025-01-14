const API_KEY = 'dbd3586c'
export const searchMovies = async ({search}) =>{
    if(search ==='')return
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const responseMovies = await response.json()
        const movies = responseMovies.Search

        return movies?.map(movie=>({
            id: movie.imdbID,
            title : movie.Title,
            year:movie.Year,
            poster:movie.Poster
        }))
    } catch(e){
        console.error('Error al buscar películas:', e.message);
        throw new Error('Error searching movies')
    }
}