const btns = document.querySelectorAll(".MenuBotones button")
const movieGrid = document.querySelector(".MovieGrid")

console.log(movieGrid)

let contenido = ""

//Botones Secciones
btns.forEach((btn, index) => {

    btn.addEventListener("click", function (e) {
        btns.forEach(btn => btn.classList.remove('active'))
        e.target.classList.add("active")
        console.log(index)

        if (index === 0) {
            //Nuevo
            movieGrid.innerHTML = ""


        } else if (index === 1) {
            //Proximamente
            contenido=""
            movieGrid.innerHTML = ""
            contenido += `<div class="movie">
            <div class="imagen">
            <div class="overlay">
            <div class="info">
            <p>MULAN</p>
            <button class="btnVerMas">VER MAS</button>
            </div>
            </div>
            <img src="mulan.jpg" alt="Proximamente1">
            </div>
            <div class="texto">
            <h4 class="titulo">MULAN</h4>
            <p class="genero">Action, Adventure, Sci-Fi</p>
            <p><b>PROXIMAMENTE</b></P>
            </div>
            </div>
            </div>`;
            movieGrid.innerHTML = contenido

        } else if (index === 2) {
            //Anime
            contenido=""
            movieGrid.innerHTML = ""
            contenido += `<div class="movie">
            <div class="imagen">
            <div class="overlay">
            <div class="info">
            <p>MULAN</p>
            <button class="btnVerMas">VER MAS</button>
            </div>
            </div>
            <img src="yourName.jpg" alt="Proximamente1">
            </div>
            <div class="texto">
            <h4 class="titulo">YOUR NAME</h4>
            <p class="genero">Anime, Adventure, Sci-Fi</p>
            <p><b>PROXIMAMENTE</b></P>
            </div>
            </div>
            </div>`;
            movieGrid.innerHTML = contenido

        } else if (index === 3) {

            //Series
            contenido=""
            movieGrid.innerHTML = ""
            contenido += `<div class="movie">
                    <div class="imagen">
                    <div class="overlay">
                    <div class="info">
                    <p>LUCIFER</p>
                    <button class="btnVerMas">VER MAS</button>
                    </div>
                    </div>
                    <img src="lucifer.jpg" alt="Proximamente1">
                    </div>
                    <div class="texto">
                    <h4 class="titulo">LUCIFER</h4>
                    <p class="genero">Action, Sci-Fi</p>
                    <p><b>PROXIMAMENTE</b></P>
                    </div>
                    </div>
                    </div>`;
            movieGrid.innerHTML = contenido
        } else if (index === 4) {


        } else if (index === 5) {

        }



    })

})