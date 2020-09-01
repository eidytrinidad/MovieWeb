

//COnexion con Firebase
const db = firebase.firestore()

//Variables del Dom
const btns = document.querySelectorAll(".MenuBotones button")
const movieGrid = document.querySelector(".MovieGrid")
const contenedor = document.querySelector("main .contenedor")
let contenido = ""

var movieId=""

//Queries

//nuevas Peliculas
const onGetNuevas = (callback) => db.collection("nuevo").onSnapshot(callback)

//Proximas
const getProximas = () => db.collection("proximamente").get();

//Animes
const getAnimes = () => db.collection("anime").get();

//Series
const getSeries = () => db.collection("series").get();

var nuevo = []

window.addEventListener('load', () => {
 
    onGetNuevas((querySnapshot) => {

        querySnapshot.forEach(doc => {
            //nuevo.push()
            const nuevas = doc.data()
            let movieId=doc.id
        
            contenido += `<div class="movie">
            <div class="imagen">
            <div class="overlay">
            <div class="info">
            <p>${nuevas.titulo}</p>
            <a href="pelicula.html" class="btnVerMas" data-id=${movieId}>VER MAS</a>
            </div>
            </div>
            <img src="${nuevas.imagen}" alt="Nuevas">
            </div>
            <div class="texto">
            <h4 class="titulo">${nuevas.titulo}</h4>
            <p class="genero">${nuevas.genero}</p>
            <div class="puntuacion">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <p>${nuevas.puntuacion}</p>
                        </div>
            </div>
            </div>
            </div>`;
            if(movieGrid){
                movieGrid.innerHTML = contenido
                const btnVerMas = document.querySelectorAll(".btnVerMas")
    
    
                btnVerMas.forEach(btn=>{
                    btn.addEventListener("click",(e)=>{
                        console.log()
        
                        sessionStorage.setItem("id",e.target.getAttribute('data-id'))
        
                        sessionStorage.setItem("genero","nuevo")
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

                movieId=doc.id
          
                contenido += `<div class="movie">
                <div class="imagen">
                <div class="overlay">
                <div class="info">
                <p>${nuevas.titulo}</p>
                <a href="pelicula.html" class="btnVerMas" data-id=${movieId}>VER MAS</a>
                </div>
                </div>
                <img src="${nuevas.imagen}" alt="Nuevas">
                </div>
                <div class="texto">
                <h4 class="titulo">${nuevas.titulo}</h4>
                <p class="genero">${nuevas.genero}</p>
                <div class="puntuacion">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <p>${nuevas.puntuacion}</p>
                </div>
                </div>
                </div>
                </div>`;
                movieGrid.innerHTML = contenido
            })
        })
        movieGrid.innerHTML = contenido

           
        const btnVerMas = document.querySelectorAll(".btnVerMas")
    
    
        btnVerMas.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                console.log()

                sessionStorage.setItem("id",e.target.getAttribute('data-id'))

                sessionStorage.setItem("genero","nuevo")
            })
        })

    
    } else if (index === 1) {
        //Proximamente

        contenido = ""
        movieGrid.innerHTML = '<h4 class="loading" class="animate__animated animate__flash"><i class="fas fa-spinner"></i> Loading...</h4>'
        const querySnapshot = await getProximas()

        querySnapshot.forEach(doc => {

            const proximamente = doc.data()
           
            movieId=doc.id
          
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
    
    
        btnVerMas.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                console.log()

                sessionStorage.setItem("id",e.target.getAttribute('data-id'))

                sessionStorage.setItem("genero","proximamente")
            })
        })

    } else if (index === 2) {
        //Anime
        contenido = ""
        movieGrid.innerHTML = '<h4 class="loading" class="animate__animated animate__flash"><i class="fas fa-spinner"></i> Loading...</h4>'

        const querySnapshot = await getAnimes()
        querySnapshot.forEach(doc => {
            
            const Animes= doc.data()
       
            movieId=doc.id

            contenido += `<div class="movie">
            <div class="imagen">
            <div class="overlay">
            <div class="info">
            <p>${Animes.titulo}</p>
            <a href="pelicula.html" class="btnVerMas" data-id=${movieId}>VER MAS</a>
            </div>
            </div>
            <img src="${Animes.imagen}" alt="Animes">
            </div>
            <div class="texto">
            <h4 class="titulo">${Animes.titulo}</h4>
            <p class="genero">${Animes.genero}</p>
            <div class="puntuacion">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <p>${Animes.puntuacion}</p>
                        </div>
            </div>
            </div>
            </div>`;
        })
        movieGrid.innerHTML = contenido
        
        const btnVerMas = document.querySelectorAll(".btnVerMas")
    
    
        btnVerMas.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                console.log()

                sessionStorage.setItem("id",e.target.getAttribute('data-id'))

                sessionStorage.setItem("genero","anime")
            })
        })

    } else if (index === 3) {

        //Series
        contenido = ""
        movieGrid.innerHTML = '<h4 class="loading" class="animate__animated animate__flash"><i class="fas fa-spinner"></i> Loading...</h4>'
        const querySnapshot = await getSeries()
        querySnapshot.forEach(doc => {
            const Series = doc.data()
            movieId=doc.id

            contenido += `<div class="movie">
            <div class="imagen">
            <div class="overlay">
            <div class="info">
            <p>${Series.titulo}</p>
            <a href="pelicula.html" class="btnVerMas" data-id=${movieId}>VER MAS</a>
            </div>
            </div>
            <img src="${Series.imagen}" alt="Series">
            </div>
            <div class="texto">
            <h4 class="titulo">${Series.titulo}</h4>
            <p class="genero">${Series.genero}</p>
            <div class="puntuacion">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <p>${Series.puntuacion}</p>
                        </div>
            </div>
            </div>
            </div>`;
        })
        movieGrid.innerHTML = contenido
        const btnVerMas = document.querySelectorAll(".btnVerMas")
    
    
        btnVerMas.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                console.log()

                sessionStorage.setItem("id",e.target.getAttribute('data-id'))

                sessionStorage.setItem("genero","series")
            })
        })
    } else if (index === 4) {


    } else if (index === 5) {

    }
}

async function cargar() {

    let movieID=sessionStorage.getItem("id")
  

   let genero = sessionStorage.getItem("genero")
  
   
  let pelicula= await db.collection(genero).doc(movieID).get();

 

  moviePageUI(pelicula.data())
 
}


function moviePageUI(pelicula) {
    console.log(pelicula)
    contenido+=`
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

    contenedor.innerHTML=contenido
    
}