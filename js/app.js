
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

//Trailers
const getTrailers = () => db.collection("trailers").get();

//Mas 
const getTodas = () => db.collection("todas").get();


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
