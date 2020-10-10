export function formsEditarUI(contenido) {
  contenido += `      
  
    <!--Formulario Buscar-->
    
     <h3>Formulario Editar </h3>
     <div class="Mensajes"></div>
  
    <form>
  
      <div class="form-group">
      <label for="genero">Seleccione Tabla</label>
        <select  id="generoBuscar" class="form-control">
          <option value=""></option>
          <option value="anime">Anime</option>
          <option value="nuevo">Nuevo</option>
          <option value="proximamente">Proximamente</option>
          <option value="series">Series</option>
          <option value="todas">Todas</option>
          <option value="trailers">Trailers</option>
          <option value="bannerMovie">Banner</option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="titulo">Buscar Por Titulo</label>
        <input type="text" id="tituloBuscar" class="form-control">
      </div>
      <button id="btnBuscar" type="button" class="btn btn-info py-2 mt-4">Buscar</button>
    </form>
  
    `;

  return contenido;
}

export function formsEditarFunc(
  db,
  contenido,
  AdminGrid,
  editarTask,
  saveTask
) {
  const btnBuscar = document.querySelector("#btnBuscar");

  var ifExist = true;
  btnBuscar.addEventListener("click", (e) => {
    e.preventDefault();

    const genero = document.querySelector("#generoBuscar").value;
    const titulo = document.querySelector("#tituloBuscar").value;

    const pelicula = db.collection(genero);
    pelicula.where("titulo", "==", titulo).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (ifExist) {
          AdminGrid.innerHTML += EditarUI2(contenido, doc.data());
          funcEditar(editarTask, genero, saveTask, doc.id, db);
          ifExist = false;
         
        }
      });
    });
  });
}

export function EditarUI2(contenido, info) {
  contenido += `   
      <hr/>
      <form >
      <div class="form-group">
        <label for="titulo">Titulo</label>
        <input type="text" id="titulo" class="form-control" value= "${info.titulo}" />
      </div>

      <div class="form-group">
      <label for="genero">Genero</label>
      <input type="text" id="genero" class="form-control" value= "${info.genero}"  />
    </div>
    <div class="form-group">
      <label for="director">Director</label>
      <input type="text" id="director" class="form-control" value= "${info.director}"  />
    </div>
    <div class="form-group">
      <label for="audio">Audio</label>
      <input type="text" id="audio" class="form-control" value= "${info.audio}" />
    </div>
    <div class="form-group">
      <label for="elenco">Elenco</label>
      <input type="text" id="elenco" class="form-control" value= "${info.elenco}" />
    </div>
    <div class="form-group">
      <label for="imagen">Imagen</label>
     <input type="file" id="imagen" class="form-control">
   
    </div>
    <div class="form-group">
      <label for="plot">Plot</label>
      <input type="text" id="plot" class="form-control" value= "${info.plot}" />
    </div>
    <div class="form-group">
      <label for="puntuacion">Puntuacion</label>
      <input type="text" id="puntuacion" class="form-control" value= "${info.puntuacion}" />
    </div>
    <div class="form-group">
      <label for="titulos">Titulos Adicionales</label>
      <input type="text" id="titulos" class="form-control" value= "${info.titulos}" />
    </div>
    <div class="form-group">
      <label for="titulos">Link(Descarga)</label>
      <input type="text" id="descarga" class="form-control" value= "${info.descarga}" />
    </div>
    <div class="form-group">
      <label for="titulos">Link(Ver Online)</label>
      <input type="text" id="online" class="form-control" value= "${info.online}" />
    </div>
  

      <div class="form-group">
     <label for="titulos">Mover a Tabla (solo si se quiere Mover de Tabla)</label>

    <select  id="mover" class="form-control">
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
    
        <button id="btnEditar" class="btnAgregar">Editar</button>

      </form>
    
    `;

  return contenido;
}

export async function funcEditar(editarTask, tabla, saveTask, id, db) {

  const btnEditar = document.querySelector("#btnEditar");
  const loading = document.querySelector(".loading");

  btnEditar.addEventListener("click", async (e) => {
    e.preventDefault();

    const titulo = document.querySelector("#titulo").value;
    const genero = document.querySelector("#genero").value;
    const director = document.querySelector("#director").value;
    const elenco = document.querySelector("#elenco").value;
    const audio = document.querySelector("#audio").value;
    const plot = document.querySelector("#plot").value;
    const puntuacion = document.querySelector("#puntuacion").value;

    const titulos = document.querySelector("#titulos").value;

    const descarga = document.querySelector("#descarga").value;
    const online = document.querySelector("#online").value;

    const moverTabla = document.querySelector("#mover").value;

    //Constantes de Imagenes
    const ref = firebase.storage().ref();
    const photo = document.querySelector("#imagen").files[0];

    if (moverTabla !== "" && moverTabla !== null) {

      if(photo == undefined){
        Swal.fire({
          icon: "error",
          title: "Para mover a otra tabla tiene que agregar una imagen",
          showConfirmButton: true,
       
        });
      }
      if (photo !== undefined) {
        const metadata = {
          contentType: photo.type,
        };
        const imagen = photo.name;

        const task = ref.child(imagen).put(photo, metadata);
     

        task
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then(async (url) => {
            const imagen = url;
            loading.style.display = "flex";
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
              moverTabla
            );

            db.collection(tabla).doc(id).delete();
            Swal.fire({
              icon: "success",
              title: "Pelicula Actualizada y Movida con Exito",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    } else {
      if (photo !== undefined) {
        const metadata = {
          contentType: photo.type,
        };
        const imagen = photo.name;

        const task = ref.child(imagen).put(photo, metadata);

        task
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then(async (url) => {
            const imagen = url;
            await editarTask(id, tabla, {
              titulo: titulo,
              genero: genero,
              director: director,
              elenco: elenco,
              audio: audio,
              plot: plot,
              puntuacion: puntuacion,
              titulos: titulos,
              descarga: descarga,
              online: online,
              imagen: imagen,
            });
            Swal.fire({
              icon: "success",
              title: "Pelicula Actualizada con Exito",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } else {
        await editarTask(id, tabla, {
          titulo: titulo,
          genero: genero,
          director: director,
          elenco: elenco,
          audio: audio,
          plot: plot,
          puntuacion: puntuacion,
          titulos: titulos,
          descarga: descarga,
          online: online,
        });
        Swal.fire({
          icon: "success",
          title: "Pelicula Actualizada con Exito",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  });
}
