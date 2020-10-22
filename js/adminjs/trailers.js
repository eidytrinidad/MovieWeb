export function formsTrailers(contenido) {
    contenido += `      
    
      <!--Formulario Trailer-->
      
       <h3>Formulario Trailers </h3>  
      <form id="agregar">
    
        <div class="form-group">

        <div class="form-group">
          <label for="titulo">Titulo</label>
          <input type="text" id="titulo" class="form-control">
        </div>
        <div class="form-group">
            <label for="titulo">ID Titulo</label>
            <input type="text" id="idTitulo" class="form-control">
        </div>
        <div class="form-group">
            <label for="titulo">Imagen</label>
            <input type="file" id="imagen" class="form-control">
        </div>
        <button  class="btn btn-info py-2 mt-4">Guardar</button>
      </form>
    
      `;

    return contenido;
}

export function formsTrailerAgregar(db) {

    const formAgregar = document.querySelector("#agregar")

    console.log(formAgregar)
    formAgregar.addEventListener('submit', (e) => {
        e.preventDefault()

        const titulo = document.querySelector("#titulo").value
        const peliculaId = document.querySelector("#idTitulo").value

        const ref = firebase.storage().ref();
        const photo = document.querySelector("#imagen").files[0];
        const imagen = photo.name;
        const metadata = {
            contentType: photo.type,
        };

        const task = ref.child(imagen).put(photo, metadata);


        task
            .then((snapshot) => snapshot.ref.getDownloadURL())
            .then( async(url) => {
                const imagen = url;

            
                    try {
                        await saveTask(db,titulo, imagen, peliculaId)
                    } catch (error) {
                        console.log(error)
                    }
               

                Swal.fire({
                    icon: 'success',
                    title: 'Trailer Guardado Con Exito',
                    showConfirmButton: false,
                    timer: 1500
                })

            });

    })

}


const saveTask = (db,titulo, imagen, peliculaId) => {
    db.collection(`trailers`).doc().set({
        titulo,
        imagen,
        peliculaId
    });
};