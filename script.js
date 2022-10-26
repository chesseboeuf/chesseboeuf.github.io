// chargement des pages en mode smartphone 
const mmenuHamburger = document.querySelector(".menu-hamburger")
const nnavLinks = document.querySelector(".navlinks")
const lllogo = document.querySelector(".logo")

window.addEventListener('load',()=>{nnavLinks.classList.toggle('mobile-menu')})
window.addEventListener('load',()=>{lllogo.classList.toggle('mobile-menu')})
window.addEventListener('load',()=>{mmenuHamburger.classList.toggle('mobile-menu')})

// fonction du bouton hamburger en mode smartphone
const menuHamburger = document.querySelector(".menu-hamburger")
const navLinks = document.querySelector(".navlinks")
const llogo = document.querySelector(".logo")
const bbody = document.querySelector("body")

menuHamburger.addEventListener('click',()=>{navLinks.classList.toggle('mobile-menu')})
menuHamburger.addEventListener('click',()=>{llogo.classList.toggle('mobile-menu')})
menuHamburger.addEventListener('click',()=>{menuHamburger.classList.toggle('mobile-menu')})
menuHamburger.addEventListener('click',()=>{bbody.classList.toggle('mobile-menu')})


