export function formBorrarUI(contenido) {
    contenido += `
    <h3>Formulario Borrar </h3>
    <form id="borrar">
  
      <div class="form-group">
        <label for="genero">Seleccione Tabla</label>
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
      <button class="btn btn-danger py-2 mt-5">Borrar</button>
    </form>
    `;
    return contenido;
  }
  
  export function formBorrarFunc(db) {
    const formBorrar = document.querySelector("#borrar");
  
    formBorrar.addEventListener("submit", (e) => {
      e.preventDefault();
      const genero = document.querySelector("#genero").value;
      const titulo = document.querySelector("#titulo").value;
   
  
      const pelicula = db.collection(genero);
      pelicula.where("titulo", "==", titulo).onSnapshot((querySnapshot) => {
  
        if (querySnapshot.docs.length==0) {
            console.log("No exste")
        }else{
          querySnapshot.forEach((doc) => {
    
            Swal.fire({
              title: 'Esta Seguro?',
              text: "Si es borrado esta accion no se puede revertir!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si,Borrar!'
            }).then((result) => {
              if (result.isConfirmed) {
                db.collection(genero).doc(doc.id).delete();
               
                Swal.fire(
                  'Borrado!',
                  'Se ha borrado satisfactoriamente.',
                  'success'
                )
              }
            })
            
          });
        }
     
      });
  
    });
  
    formBorrar.reset();
  
  }