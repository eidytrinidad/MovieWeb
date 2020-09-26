//UI De las peliculas por seccion

 function moviesUI(pelicula=[], movieId=0) {
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

