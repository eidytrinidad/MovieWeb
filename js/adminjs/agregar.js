export function formAgregarUI(contenido) {
    contenido += `
  <h3> Formulario Agregar </h3>
  
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
  export function formAgregarFunc(saveTask) {
    const formularioGuardar = document.querySelector("#formGuardar");
    const loading=document.querySelector('.loading');
  
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
            
            setTimeout(() => {
              
               saveTask(
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
            
            }, 2000);
          
            Swal.fire({
              icon: 'success',
              title: 'Pelicula Guardada Con Exito',
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
    });
  };
  