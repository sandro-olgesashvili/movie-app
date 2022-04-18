const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById('main')
const form = document.getElementById('form')
const searhc = document.getElementById('search')

getMovies() 


async function getMovies() {
    const res = await fetch(APIURL);

    const data = await res.json()

    console.log(data);


    showMovies(data.results)


}

function showMovies (movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const {poster_path, original_title, vote_average } = movie

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${original_title}">
            <div class="movie-info">
                <h3>${original_title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
        `

        main.appendChild(movieEl)
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
    
    const searchTerm = searhc.value

    if(searchTerm) {


        
        searhc.value = ''
    }
})