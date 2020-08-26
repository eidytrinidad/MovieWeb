const btns = document.querySelectorAll(".MenuBotones button")

btns.forEach((btn, index) => {

    btn.addEventListener("click", function (e) {

        // if (index===0) {
        //     e.target.parentElement.FirstElementChild.classList.add("active")
        //     e.target.parentElement.lastElementChild.classList.remove("active")
        // }
        // if (index===1) {


        // }
        // if (index===2) {

        // }
        // if (index===3) {

        // }
        // if (index===4) {

        // }
        // if (index===5) {
        //    console.log( index)
        // }
        //     console.log(index)

        if (e.target.previousElementSibling) {
            e.target.previousElementSibling.classList.remove('active')
        }
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.classList.remove('active')
        }
       // console.log(e.target.parentElement.firstElementChild)
        e.target.classList.add('active')
        //  e.target.nextElementSibling.classList.remove('active')
    })


})


// const movieInfo = document.querySelector(".movieInfo");

// window.onload = (event) => {
//     setTimeout(() => {
//         movieInfo.style.display="block"
//     }, 2000);
//   };