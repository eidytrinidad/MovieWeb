//Base
const db = firebase.firestore();

const saveTask = (
  titulo,
  genero,
  director,
  elenco,
  audio,
  plot,
  imagen,
  puntuacion,
  titulos,
  descarga,
  online,
  tipo
) => {
  db.collection(`${tipo}`).doc().set({
    titulo,
    genero,
    director,
    elenco,
    audio,
    plot,
    imagen,
    puntuacion,
    titulos,
    descarga,
    online,
  });
};

const btns = document.querySelectorAll(".btn");

const AdminGrid = document.querySelector(".AdminGrid .contenedor");
let contenido = "";

window.addEventListener("load", async () => {
  AdminGrid.innerHTML = formAgregarUI(contenido);
  formAgregarFunc();
});

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index == 0) {
      AdminGrid.innerHTML = formAgregarUI(contenido);
      formAgregarFunc();
    }
    if (index == 1) {
  
    }
    if (index == 2) {
      AdminGrid.innerHTML = formBorrarUI(contenido);
      formBorrarFunc();
    }
    if (index == 3) {
    }
  });
});

function formAgregarUI(contenido) {
  contenido += `
<h3>Agregar </h3>

<div class="Mensajes"></div>
<form id="formGuardar">
  <div class="form-group">
    <label for="titulo">Titulo</label>
    <input type="text" id="titulo" class="form-control" />
  </div>
  <div class="form-group">
    <label for="genero">Genero</label>
    <input type="text" id="genero" class="form-control" />
  </div>
  <div class="form-group">
    <label for="director">Director</label>
    <input type="text" id="director" class="form-control" />
  </div>
  <div class="form-group">
    <label for="audio">Audio</label>
    <input type="text" id="audio" class="form-control" />
  </div>
  <div class="form-group">
    <label for="elenco">Elenco</label>
    <input type="text" id="elenco" class="form-control" />
  </div>
  <div class="form-group">
    <label for="imagen">Imagen</label>
   <input type="file" id="imagen" class="form-control">
 
  </div>
  <div class="form-group">
    <label for="plot">Plot</label>
    <input type="text" id="plot" class="form-control" />
  </div>
  <div class="form-group">
    <label for="puntuacion">Puntuacion</label>
    <input type="text" id="puntuacion" class="form-control" />
  </div>
  <div class="form-group">
    <label for="titulos">Titulos Adicionales</label>
    <input type="text" id="titulos" class="form-control" />
  </div>
  <div class="form-group">
    <label for="titulos">Link(Descarga)</label>
    <input type="text" id="descarga" class="form-control" />
  </div>
  <div class="form-group">
    <label for="titulos">Link(Ver Online)</label>
    <input type="text" id="online" class="form-control" />
  </div>
  <div class="form-group">
    <label for="titulos">Tabla donde Guardar</label>
   <select id="tipo" class="form-control col-3">
       <option value=""></option>
       <option value="bannerMovie">Banner</option>
       <option value="nuevo">Nuevas</option>
       <option value="proximamente">Proximamente</option>
       <option value="series">Series</option>
       <option value="anime">Animes</option>
       <option value="todas">Mas</option>
   </select>
  </div>
  
  <button class="btnAgregar">Agregar</button>
</form>

`;

  return contenido;
}

// Formulario Guardar
const formAgregarFunc = () => {
  const formularioGuardar = document.querySelector("#formGuardar");

  formularioGuardar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.querySelector("#titulo").value;
    const genero = document.querySelector("#genero").value;
    const director = document.querySelector("#director").value;
    const elenco = document.querySelector("#elenco").value;
    const audio = document.querySelector("#audio").value;
    const plot = document.querySelector("#plot").value;
    const puntuacion = document.querySelector("#puntuacion").value;

    const titulos = document.querySelector("#titulos").value;
    const tipo = document.querySelector("#tipo").value;
    const descarga = document.querySelector("#descarga").value;
    const online = document.querySelector("#online").value;

    //Constantes de Imagenes
    const ref = firebase.storage().ref();
    const photo = document.querySelector("#imagen").files[0];
    const imagen = photo.name;
    const metadata = {
      contentType: photo.type,
    };

    const task = ref.child(imagen).put(photo, metadata);

    const Mensaje = document.querySelector(".Mensajes");

    let error = "";

    if (titulo == "") {
      error +=
        "<p class='alert alert-danger text-center'>EL Campo Titulo no puede Quedar Vacio</p>";
    }
    if (genero == "") {
      error +=
        "<p class='alert alert-danger text-center'>EL Campo Genero no puede Quedar Vacio</p>";
    }
    if (audio == "") {
      error +=
        "<p class='alert alert-danger text-center'>EL Campo Audio no puede Quedar Vacio</p>";
    }
    if (elenco == "") {
      error +=
        "<p class='alert alert-danger text-center'>EL Campo Elenco no puede Quedar Vacio</p>";
    }
    if (plot == "") {
      error +=
        "<p class='alert alert-danger text-center'>EL Campo Plot no puede Quedar Vacio</p>";
    }
    if (puntuacion == "") {
      error +=
        "<p class='alert alert-danger text-center'>EL Campo Puntuacion no puede Quedar Vacio</p>";
    }
    if (titulos == "") {
      error +=
        "<p class='alert alert-danger text-center'>EL Campo Titulos no puede Quedar Vacio</p>";
    }
    if (imagen == "") {
      error +=
        "<p class='alert alert-danger text-center'>EL Campo Imagen no puede Quedar Vacio</p>";
    }
    if (tipo == "") {
      error +=
        "<p class='alert alert-danger text-center'>EL Campo tipo no puede Quedar Vacio</p>";
    }

    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then(async (url) => {
        const imagen = url;
        Mensaje.innerHTML = error;
        
        if (!error) {
          await saveTask(
            titulo,
            genero,
            director,
            elenco,
            audio,
            plot,
            imagen,
            puntuacion,
            titulos,
            descarga,
            online,
            tipo
          );
          Mensaje.innerHTML =
            "<p class='alert alert-success text-center'>Pelicula Agregada Con exito</p>";
        }
      });
  });
};

function formBorrarUI(contenido) {
  contenido += `
  <h3>Borrar </h3>
  <form id="borrar">

    <div class="form-group">
      <label for="genero">Seleccione El Genero</label>
      <select name="" id="genero" class="form-control">
        <option value=""></option>
        <option value="anime">Anime</option>
        <option value="nuevo">Nuevo</option>
        <option value="proximamente">Proximamente</option>
        <option value="series">series</option>
        <option value="todas">Todas</option>
        <option value="trailers">Trailers</option>
        <option value="bannerMovie">Banner</option>
      </select>
    </div>

    <div class="form-group">
      <label for="titulo">Titulo</label>
      <input type="text" id="titulo" class="form-control">
    </div>
    <button class="btn btn-primary mt-5">Borrar</button>
  </form>
  `;
  return contenido;
}

function formBorrarFunc() {
  const formBorrar = document.querySelector("#borrar");

  formBorrar.addEventListener("submit", (e) => {
    e.preventDefault();
    const genero = document.querySelector("#genero").value;
    const titulo = document.querySelector("#titulo").value;
    console.log(genero, titulo);

    const pelicula = db.collection(genero);
    pelicula.where("titulo", "==", titulo).onSnapshot((querySnapshot) => {

      querySnapshot.forEach((doc) => {
    
        var result = confirm("Esta Seguro que quiere borrar este titulo?"); 
        if (result == true) { 
            
            db.collection(genero).doc(doc.id).delete();
            alert("Titulo Borrado.") ; 
        } else { 
            
        } 
        
      });
    });
  });
}
