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
            <h4 class="titulo">${proximamente.titulo}</h4>
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
        contenido = ""
        movieGrid.innerHTML = '<h4 class="loading" class="animate__animated animate__flash"><i class="fas fa-spinner"></i> Loading...</h4>'
        const querySnapshot = await getTodas();

        querySnapshot.forEach(doc => {
            const Todas = doc.data()
            movieId = doc.id

            moviesUI(Todas, movieId)
            
        })
        movieGrid.innerHTML = contenido
        const btnVerMas = document.querySelectorAll(".btnVerMas")


        btnVerMas.forEach(btn => {
            btn.addEventListener("click", (e) => {
                console.log()

                localStorage.setItem("id", e.target.getAttribute('data-id'))

                localStorage.setItem("genero", "todas")
            })
        })

    }
}
