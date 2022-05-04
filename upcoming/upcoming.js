const APIURL =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

let countPage = 1;




const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const btnNext = document.getElementById('btn-next')
const btnPrev = document.getElementById('btn-prev')



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

            const {poster_path, original_title, release_date, overview } = movie
    
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie')
    
            movieEl.innerHTML = `
                <img src="${IMGPATH + poster_path}" alt="${original_title}">
                <div class="movie-info direction">
                    <h3>${original_title}</h3>
                    <span class="green mg-tp">Release date: ${release_date}</span>
                </div>

                <div class="overview"><h4>Overview: </h4>
                <br>                
                ${overview} </div>
            `
    
            main.appendChild(movieEl)
        }
    })

}



form.addEventListener('submit', e => {
    e.preventDefault()
    
    const searchTerm = search.value

    if(searchTerm) {

        getMovies(SEARCHAPI + searchTerm)
        
        search.value = ''
    }
})




btnNext.addEventListener('click', async () => {


    countPage++

    document.documentElement.scrollTop = 0

    
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=${countPage}`)

    const data = await res.json()

    showMovies(data.results);
})

btnPrev.addEventListener('click', async () => {


    countPage--

    document.documentElement.scrollTop = 0

    if(countPage <= 0 ) {
        getMovies(APIURL)
        countPage = 1

    } else {
        const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=${countPage}`)

        const data = await res.json()

        showMovies(data.results);
    }
})