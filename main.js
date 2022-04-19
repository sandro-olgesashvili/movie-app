const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(APIURL) 


async function getMovies(url) {
    const res = await fetch(url);

    const data = await res.json()

    console.log(data);


    showMovies(data.results)


}

function showMovies (movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        if(movie.poster_path !== null ) {

            const {poster_path, original_title, vote_average, overview } = movie
    
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie')
    
            movieEl.innerHTML = `
                <img src="${IMGPATH + poster_path}" alt="${original_title}">
                <div class="movie-info">
                    <h3>${original_title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>

                <div class="overview"><h4>Overview: </h4>
                <br>                
                ${overview} </div>
            `
    
            main.appendChild(movieEl)
        }
    })

}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >=5) {
        return 'orange'
    } else {
        return 'red'
    }
}


form.addEventListener('submit', e => {
    e.preventDefault()
    
    const searchTerm = search.value

    if(searchTerm) {

        getMovies(SEARCHAPI + searchTerm)
        
        search.value = ''
    }
})