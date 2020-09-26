//Conexion con Firebase

const db = firebase.firestore()

//Burger Menu
const btnBurger = document.querySelector(".btnBurger");
const icon = document.querySelector(".btnBurger i");
const burgerMenu = document.querySelector(".burgerMenu");

let value = false;
btnBurger.addEventListener("click", () => {

    console.log(!value)
    if (!value) {
        value = true
        burgerMenu.style.display = "flex";
        icon.classList.add("fa-times");
    } else {
        value = false;
        burgerMenu.style.display = "none";
        icon.classList.remove("fa-times")
    }
})


//Variables del Dom
const btns = document.querySelectorAll(".MenuBotones button")
const movieGrid = document.querySelector(".MovieGrid")
const contenedor = document.querySelector("main .contenedor")
const btnInfoBanner = document.querySelector(".btnInfo");


btnInfoBanner.addEventListener("click", () => {
    window.location.reload()
    localStorage.setItem("id", 'SfK5FHrb890oxXAaIyyY')
    localStorage.setItem("genero", "bannerMovie")
})

let contenido = ""

var movieId = ""

//Queries

//nuevas Peliculas
const onGetNuevas = (callback) => db.collection("nuevo").onSnapshot(callback)

//Proximas
const getProximas = () => db.collection("proximamente").get();

//Animes
const getAnimes = () => db.collection("anime").get();

//Series
const getSeries = () => db.collection("series").get();

//Series
const getTrailers = () => db.collection("trailers").get();



window.addEventListener('load', () => {

    onGetNuevas((querySnapshot) => {

        querySnapshot.forEach(doc => {
            //nuevo.push()
            const nuevas = doc.data()
            let movieId = doc.id
            moviesUI(nuevas, movieId)
            if (movieGrid) {
                movieGrid.innerHTML = contenido
                const btnVerMas = document.querySelectorAll(".btnVerMas")


                btnVerMas.forEach(btn => {
                    btn.addEventListener("click", (e) => {
                        console.log()

                        localStorage.setItem("id", e.target.getAttribute('data-id'))

                        localStorage.setItem("genero", "nuevo")
                    })
                })
            }
        })
    })

})



//Botones Secciones
btns.forEach((btn, index) => {

    btn.addEventListener("click", function (e) {
        btns.forEach(btn => btn.classList.remove('active'))
        e.target.classList.add("active")

        movieSectionsUI(index)

    })

})



async function movieSectionsUI(index) {

    if (index === 0) {
        //Nuevo
        contenido = ""
        movieGrid.innerHTML = '<h4 class="loading" class="animate__animated animate__flash"><i class="fas fa-spinner"></i> Loading...</h4>'
        onGetNuevas((querySnapshot) => {

            querySnapshot.forEach(doc => {
                //nuevo.push()
                const nuevas = doc.data()

                movieId = doc.id
                moviesUI(nuevas, movieId)
            
                movieGrid.innerHTML = contenido
            })
        })
        movieGrid.innerHTML = contenido


        const btnVerMas = document.querySelectorAll(".btnVerMas")


        btnVerMas.forEach(btn => {
            btn.addEventListener("click", (e) => {
                console.log()

                localStorage.setItem("id", e.target.getAttribute('data-id'))

                localStorage.setItem("genero", "nuevo")
            })
        })


    } else if (index === 1) {
        //Proximamente

        contenido = ""
        movieGrid.innerHTML = '<h4 class="loading" class="animate__animated animate__flash"><i class="fas fa-spinner"></i> Loading...</h4>'
        const querySnapshot = await getProximas()

        querySnapshot.forEach(doc => {

            const proximamente = doc.data()

            movieId = doc.id

            contenido += `<div class="movie">
            <div class="imagen">
            <div class="overlay">
            <div class="info">
            <p>${proximamente.titulo}</p>
            <a href="pelicula.html" class="btnVerMas" data-id=${movieId}>VER MAS</a>
            </div>
            </div>
            <img src="${proximamente.imagen}" alt="Proximamente">
            </div>
            <div class="texto">
            <h4 class="titulo">MULAN</h4>
            <p class="genero">${proximamente.genero}</p>
            <p><b>PROXIMAMENTE</b></P>
            </div>
            </div>
            </div>
       
            `;


        })

        movieGrid.innerHTML = contenido


        const btnVerMas = document.querySelectorAll(".btnVerMas")


        btnVerMas.forEach(btn => {
            btn.addEventListener("click", (e) => {
                console.log()

                localStorage.setItem("id", e.target.getAttribute('data-id'))

                localStorage.setItem("genero", "proximamente")
            })
        })

    } else if (index === 2) {
        //Anime
        contenido = ""
        movieGrid.innerHTML = '<h4 class="loading" class="animate__animated animate__flash"><i class="fas fa-spinner"></i> Loading...</h4>'

        const querySnapshot = await getAnimes()
        querySnapshot.forEach(doc => {

            const Animes = doc.data()

            movieId = doc.id

            moviesUI(Animes, movieId)
        })
        movieGrid.innerHTML = contenido

        const btnVerMas = document.querySelectorAll(".btnVerMas")


        btnVerMas.forEach(btn => {
            btn.addEventListener("click", (e) => {
                console.log()

                localStorage.setItem("id", e.target.getAttribute('data-id'))

                localStorage.setItem("genero", "anime")
            })
        })

    } else if (index === 3) {

        //Series
        contenido = ""
        movieGrid.innerHTML = '<h4 class="loading" class="animate__animated animate__flash"><i class="fas fa-spinner"></i> Loading...</h4>'
        const querySnapshot = await getSeries()

        querySnapshot.forEach(doc => {
            const Series = doc.data()
            movieId = doc.id

            moviesUI(Series, movieId)
        })
        movieGrid.innerHTML = contenido
        const btnVerMas = document.querySelectorAll(".btnVerMas")


        btnVerMas.forEach(btn => {
            btn.addEventListener("click", (e) => {
                console.log()

                localStorage.setItem("id", e.target.getAttribute('data-id'))

                localStorage.setItem("genero", "series")
            })
        })
    } else if (index === 4) {

        contenido = ""
        movieGrid.innerHTML = '<h4 class="loading" class="animate__animated animate__flash"><i class="fas fa-spinner"></i> Loading...</h4>'

        const querySnapshot = await getTrailers()
        querySnapshot.forEach(doc => {
            const trailers = doc.data()
            contenido += `
            <div class="trailer">
                <img class="" src=${trailers.imagen} alt="">
                <a href="#player"data-peliculaid=${trailers.peliculaId} class="btnVerTrailer">Ver Trailer</a>
            </div>
        `;
          
        })

        movieGrid.innerHTML=""

        const tContenedor= document.createElement('div')
        tContenedor.classList.add('trailers')
        tContenedor.innerHTML=`${contenido}`
        movieGrid.appendChild(tContenedor)
        const player = document.createElement('div')
        changeTrailer("KK8FHdFluOQ",movieGrid,player)
        const btnVerTrailer = document.querySelectorAll('.btnVerTrailer')
        btnVerTrailer.forEach(btn => {
        
            btn.addEventListener("click", function() {
              
                changeTrailer(btn.dataset.peliculaid,movieGrid,player)
                
            })
        })
        
    } else if (index === 5) {

    }
}

//carga la pelicula  a la pagina de pelicula
async function cargar() {

    let movieID = localStorage.getItem("id")


    let genero = localStorage.getItem("genero")


    let pelicula = await db.collection(genero).doc(movieID).get();

    //Llama a la pagina de pelicula
    moviePageUI(pelicula.data())

}

// UI de la pagina de pelicula
function moviePageUI(pelicula) {
   
    contenido += `
    <h3 class=tituloPelicula>${pelicula.titulo}</h3>
    <article class="detallePelicula">
        <div class="portada">
            <img src=${pelicula.imagen} alt="portada">
        </div>
    
        <div class="texto">
                    <p class="plot">${pelicula.plot}</p>

                    <p class="titulo"><b>Títulos</b>:${pelicula.titulos}
                    </p>

                    <p class="generos"><b>Géneros</b>:${pelicula.genero}</p>

                    <p class="audio"><b>Audio:</b>${pelicula.audio}</p>

                    <p class="director"><b>Director</b>:${pelicula.director}</p>

                    <p class="elenco"><b>Elenco: </b>${pelicula.elenco}</p>
                </div>
    </article>
    <article class="links">
    <h3 >VER ONLINE/DESCARGAR</h3>

<a href=""><img src="img/veronline.png" alt="ver online"></a>
<a href=""><img src="img/descargar.png" alt="descargar"></a>
</article>
    `

    contenedor.innerHTML = contenido

}


const changeTrailer=(trailerId,movieGrid,player)=>{
  
  
    content=`
    <iframe id="ytplayer" type="text/html" width="550" height="350"
    src="http://www.youtube.com/embed/${trailerId}?&origin=http://example.com"
    frameborder="0" allowfullscreen/> 
    `
  
        player.classList.add('playerSection')
        player.innerHTML=  `<div id="player" class="player">${content}</div>`
        movieGrid.insertBefore(player,movieGrid.firstElementChild)

  }
  
  //UI De las peliculas por seccion
  
  
  function moviesUI(pelicula, movieId) {
    contenido += `<div class="movie">
    <div class="imagen">
    <div class="overlay">
    <div class="info">
    <p>${pelicula.titulo}</p>
    <a href="pelicula.html" class="btnVerMas" data-id=${movieId}>VER MAS</a>
    </div>
    </div>
    <img src="${pelicula.imagen}" alt="Series">
    </div>
    <div class="texto">
    <h4 class="titulo">${pelicula.titulo}</h4>
    <p class="genero">${pelicula.genero}</p>
    <div class="puntuacion">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <p>${pelicula.puntuacion}</p>
                </div>
    </div>
    </div>
    </div>`;
  }
  