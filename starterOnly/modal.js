function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//* Close modal
//^ Getting close button
const modalClose = document.querySelector(".close")
//^ Creating close function
function closeModal() {
  if (modalbg.style.display == "block") {
    modalbg.style.display = "none";
  }
}
//^ Setting the event
modalClose.addEventListener("click", closeModal)
