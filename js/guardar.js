//Base
const db = firebase.firestore();

const saveTask = (titulo,genero,director,elenco,audio,plot,imagen,puntuacion,titulos,tipo
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
  });
};

//Formulario Guardar

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

//Constantes de Imagenes
  const ref=firebase.storage().ref()
  const photo=document.querySelector("#imagen").files[0]
  const imagen = photo.name
  const metadata={
    contentType:photo.type
  }

  const task=ref.child(imagen).put(photo,metadata)

  const Mensaje= document.querySelector('.Mensajes');

  let error="";

  if (titulo=="") {
    error+="<p class='alert alert-danger text-center'>EL Campo Titulo no puede Quedar Vacio</p>"
  } 
  if (genero=="") {
    error+="<p class='alert alert-danger text-center'>EL Campo Genero no puede Quedar Vacio</p>"
  } 
  if (audio=="") {
    error+="<p class='alert alert-danger text-center'>EL Campo Audio no puede Quedar Vacio</p>"
  } 
  if (elenco=="") {
    error+="<p class='alert alert-danger text-center'>EL Campo Elenco no puede Quedar Vacio</p>"
  } 
  if (plot=="") {
    error+="<p class='alert alert-danger text-center'>EL Campo Plot no puede Quedar Vacio</p>"
  } 
  if (puntuacion=="") {
    error+="<p class='alert alert-danger text-center'>EL Campo Puntuacion no puede Quedar Vacio</p>"
  } 
  if (titulos=="") {
    error+="<p class='alert alert-danger text-center'>EL Campo Titulos no puede Quedar Vacio</p>"
  } 
  if (imagen=="") {
    error+="<p class='alert alert-danger text-center'>EL Campo Imagen no puede Quedar Vacio</p>"
  } 
  if (tipo=="") {
    error+="<p class='alert alert-danger text-center'>EL Campo tipo no puede Quedar Vacio</p>"
  } 


  
  task
    .then(snapshot=>snapshot.ref.getDownloadURL())
    .then(async(url)=>{
      const imagen=url
      Mensaje.innerHTML=error
      console.log(url)
      if(!error){
        
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
          tipo
        );
        Mensaje.innerHTML="<p class='alert alert-success text-center'>Pelicula Agregada Con exito</p>"
      }

    })

});

