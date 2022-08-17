
let lab = document.querySelector('label')
let colorLock = document.querySelector('#colorlock');
let lock = false
function toggleDark(){
  let element = document.body
  element.classList.toggle('dark')
  let nav = document.getElementById('mySidenav')
  nav.classList.toggle('black')
  let sum =  nav.querySelector("summary")
  sum.classList.toggle('black')
  let p =  nav.querySelectorAll("p")
  for (let i = 0; i < p.length; i++) {
    p[i].classList.toggle('black')
    
  }
}

lab.addEventListener('click', toggleDark)

function togglelab(){
  let labElement = document.getElementById("lab")
  labElement.classList.toggle('lab-dark')
}


let sidenav = document.getElementById("mySidenav");
let openBtn = document.getElementById("openBtn");
let closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sidenav.classList.remove("active");
}
function about() {
  document.querySelector('#about').style.display = "block"
  document.querySelector('#skill').style.display = "none"
  document.querySelector('#exp').style.display = "none"
  document.querySelector('#formation').style.display = "none"
  document.querySelector('#contact').style.display = "none"
}
function skill() {
  document.querySelector('#about').style.display = "none"
  document.querySelector('#skill').style.display = "block"
  document.querySelector('#exp').style.display = "none"
  document.querySelector('#formation').style.display = "none"
  document.querySelector('#contact').style.display = "none"
}
function exp() {
  document.querySelector('#about').style.display = "none"
  document.querySelector('#skill').style.display = "none"
  document.querySelector('#exp').style.display = "block"
  document.querySelector('#formation').style.display = "none"
  document.querySelector('#contact').style.display = "none"
}
function formation() {
  document.querySelector('#about').style.display = "none"
  document.querySelector('#skill').style.display = "none"
  document.querySelector('#exp').style.display = "none"
  document.querySelector('#formation').style.display ="unset"
  document.querySelector('#contact').style.display = "none"
}
function contact() {
  document.querySelector('#about').style.display = "none"
  document.querySelector('#skill').style.display = "none"
  document.querySelector('#exp').style.display = "none"
  document.querySelector('#formation').style.display = "none"
  document.querySelector('#contact').style.display = "block"
}


function lockUnlock() {
  let img = document.querySelector("#lock")
  if (lock == false) {
      img.src = "./img/lock-b.png" 
      lock = true
  }else{
    img.src = "./img/lock-w.png" 
      lock = false
  }
}




