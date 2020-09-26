    

const player= document.querySelector("#player")

let content ="";

console.log(player)
// let mulan="KK8FHdFluOQ";
// let quiet="XEMwSdne6UE"
window.addEventListener('load', (event) => {
  changeTrailer("Rhf8qyYtq60")

});
 

const changeTrailer=(trailerId)=>{
  content=`
  <iframe id="ytplayer" type="text/html" 
  src="http://www.youtube.com/embed/${trailerId}?&origin=http://example.com"
  frameborder="0" allowfullscreen/> 
  `

  player.innerHTML=content
}


