
// UI De las peliculas por seccion

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

        return contenido
      }
      
      
//carga la Datos a la pagina de pelicula
async function cargar() {

    let movieID = localStorage.getItem("id")


    let genero = localStorage.getItem("genero")


    let pelicula = await db.collection(genero).doc(movieID).get();

    //Llama a la pagina de pelicula
    moviePageUI(pelicula.data())

}

//Funcion Pagina de Peliculas
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
    
    <a href=${pelicula.online} target=_blank><img src="img/veronline.png" alt="ver online"></a>
    <a href=${pelicula.descarga} target=_blank><img src="img/descargar.png" alt="descargar"></a>
    </article>
        `
    
        contenedor.innerHTML = contenido
    
    }
    

    //Trailers
const changeTrailer=(trailerId,movieGrid,player)=>{
  
  
    content=`
    <iframe id="ytplayer" type="text/html" width="550" height="350"
    src="https://www.youtube.com/embed/${trailerId}?&origin=http://example.com"
    frameborder="0" allowfullscreen/> 
    `
  
        player.classList.add('playerSection')
        player.innerHTML=  `<div id="player" class="player">${content}</div>`
        movieGrid.insertBefore(player,movieGrid.firstElementChild)

  }