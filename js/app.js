const btns = document.querySelectorAll(".MenuBotones button")




//console.log(botones[0])


// btns.forEach(button => {
//     button.addEventListener("click",(e)=>{
//         btns.forEach(btn=>btn.classList.remove('active'))
//         e.target.classList.add("active")
//     })
// });

btns.forEach((btn, index) => {

    btn.addEventListener("click", function (e) {
        btns.forEach(btn=>btn.classList.remove('active'))
        e.target.classList.add("active")
        console.log(index)

        if (index === 0) {


        } else if (index === 1) {

        } else if (index === 2) {


        } else if (index === 3) {


        } else if (index === 4) {


        } else if (index === 5) {
   
        }



    })

})