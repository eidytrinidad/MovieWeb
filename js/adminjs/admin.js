//Base
const db = firebase.firestore();

import {formAgregarUI,formAgregarFunc} from './agregar.js'
import {formBorrarUI,formBorrarFunc} from './borrar.js'
import {formsEditarUI,formsEditarFunc} from './editar.js'

localStorage.getItem("admin")

const logout = document.querySelector("#logout");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
  } else {
    // No user is signed in.
    
    window.location.href = "login.html";
  }
});


logout.addEventListener("click", (e) => {

  e.preventDefault();
  firebase.auth().signOut()
  .then(() => {
  
  })
  .catch((err)=>{
    console.log(err)
  })
});


const saveTask = (
  titulo,genero,director,elenco,audio,plot,imagen,puntuacion,titulos,descarga,online,tipo
) => {
  db.collection(`${tipo}`).doc().set({titulo,genero,director,elenco,audio,plot,imagen,puntuacion,titulos,descarga,online
  });
};

const updateTask =(id, tabla, updatedTask) =>db.collection(tabla).doc(id).update(updatedTask)


const btns = document.querySelectorAll(".btn");

const AdminGrid = document.querySelector(".AdminGrid .contenedor");
let contenido = "";

window.addEventListener("load", async () => {
  // AdminGrid.innerHTML = formAgregarUI(contenido);
  // formAgregarFunc(saveTask);

  AdminGrid.innerHTML = formsEditarUI(contenido);
  formsEditarFunc(db,contenido,AdminGrid,updateTask,saveTask,db)


});

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index == 0) {
      AdminGrid.innerHTML = formAgregarUI(contenido);
      formAgregarFunc(saveTask);
    }
    if (index == 1) {
      AdminGrid.innerHTML = formsEditarUI(contenido);
     
    }
    if (index == 2) {
      AdminGrid.innerHTML = formBorrarUI(contenido);
      formBorrarFunc(db);
    }
    if (index == 3) {
    }
  });
});




