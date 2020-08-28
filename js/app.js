// const getTask = () => db.collection("proximamente").get();

// const btn = document.querySelector('button')

// btn.addEventListener('click', async () => {

//   const querySnapshot = await getTask()
// querySnapshot.forEach(doc => {
//   console.log(doc.data())
// });

// })

//COnexion con Firebase
const db = firebase.firestore()

//Variables del Dom
const btns = document.querySelectorAll(".MenuBotones button")
const movieGrid = document.querySelector(".MovieGrid")
let contenido = ""

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

        
            contenido += `<div class="movie">
            <div class="imagen">
            <div class="overlay">
            <div class="info">
            <p>${nuevas.titulo}</p>
            <button class="btnVerMas">VER MAS</button>
            </div>
            </div>
            <img src="${nuevas.imagen}" alt="Proximamente1">
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

})



//Botones Secciones
btns.forEach((btn, index) => {

    btn.addEventListener("click", async function (e) {
        btns.forEach(btn => btn.classList.remove('active'))
        e.target.classList.add("active")
        console.log(index)

        if (index === 0) {
            //Nuevo
            contenido = ""
            movieGrid.innerHTML = "<h3 class='animate__animated animate__flash'><i class='fas fa-spinner'></i> Loading...</h3>"
            onGetNuevas((querySnapshot) => {

                querySnapshot.forEach(doc => {
                    //nuevo.push()
                    const nuevas = doc.data()

                  
                    contenido += `<div class="movie">
                    <div class="imagen">
                    <div class="overlay">
                    <div class="info">
                    <p>${nuevas.titulo}</p>
                    <button class="btnVerMas">VER MAS</button>
                    </div>
                    </div>
                    <img src="${nuevas.imagen}" alt="Proximamente1">
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

            //contenido+=

        } else if (index === 1) {
            //Proximamente

            contenido = ""
            movieGrid.innerHTML = "<h3 class='animate__animated animate__flash'><i class='fas fa-spinner'></i> Loading...</h3>"
            const querySnapshot = await getProximas()

            querySnapshot.forEach(doc => {

                const proximamente = doc.data()
               

                contenido += `<div class="movie">
                <div class="imagen">
                <div class="overlay">
                <div class="info">
                <p>${proximamente.titulo}</p>
                <button class="btnVerMas">VER MAS</button>
                </div>
                </div>
                <img src="${proximamente.imagen}" alt="Proximamente1">
                </div>
                <div class="texto">
                <h4 class="titulo">MULAN</h4>
                <p class="genero">${proximamente.genero}</p>
                <p><b>PROXIMAMENTE</b></P>
                </div>
                </div>
                </div>`;
            })

            movieGrid.innerHTML = contenido

        } else if (index === 2) {
            //Anime
            contenido = ""
            movieGrid.innerHTML = "<h3 class='animate__animated animate__flash'><i class='fas fa-spinner'></i> Loading...</h3>"

            const querySnapshot = await getAnimes()
            querySnapshot.forEach(doc => {
                
                const Animes= doc.data()
           

                contenido += `<div class="movie">
                <div class="imagen">
                <div class="overlay">
                <div class="info">
                <p>${Animes.titulo}</p>
                <button class="btnVerMas">VER MAS</button>
                </div>
                </div>
                <img src="${Animes.imagen}" alt="Proximamente1">
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

        } else if (index === 3) {

            //Series
            contenido = ""
            movieGrid.innerHTML = "<h3 class='animate__animated animate__flash'><i class='fas fa-spinner'></i> Loading...</h3>"

            const querySnapshot = await getSeries()
            querySnapshot.forEach(doc => {
                const Series = doc.data()
               

                contenido += `<div class="movie">
                <div class="imagen">
                <div class="overlay">
                <div class="info">
                <p>${Series.titulo}</p>
                <button class="btnVerMas">VER MAS</button>
                </div>
                </div>
                <img src="${Series.imagen}" alt="Proximamente1">
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
        } else if (index === 4) {


        } else if (index === 5) {

        }



    })

})