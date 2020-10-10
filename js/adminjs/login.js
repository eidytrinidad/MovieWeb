// Validar datos para entrar al sistema
const form = document.querySelector(".form");
const test= document.querySelector("#test");


form.addEventListener("submit",  (e)=> {
  e.preventDefault();
  const email = form["email"].value;
  const password = form["password"].value;

 
  // Authenticate the User
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(({user})=>{
    console.log(user.email)
  }).catch((error)=> {
    // Handle Errors here.
   
    swal({
      title: "Usuario y/o contraseña incorrecta",
      icon:"error"
    });
   
    // ...
  });
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    window.location.href = "Admin.html";
  } else {
    
  }
});
  


