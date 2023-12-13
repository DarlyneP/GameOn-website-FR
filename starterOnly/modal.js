//~ DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const nav = document.getElementById("myTopnav");

//~ Form elements
//^ Getting form fields & their alerts
const formEntries = modalbg.querySelectorAll("input");
const alerts = document.querySelectorAll('.alert')
//^Getting newsletter checkbox input
const newsletterInput = modalbg.querySelector("#checkbox2")
//^ Getting close button
const modalClose = document.querySelector(".close")

// activate responsive design on navigation bar
function editNav() {
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  }
}
nav.addEventListener("click", editNav)

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  //! modified function -- comment to activate original function
  /* erasing confirmation screen */
  const confirm = document.querySelector('.modal-body .confirm');
  if (confirm !== null) {
    //^ delete confirmation screen
    confirm.remove(confirm.innerHTML);
    //^ adjusting modal body size
    modal.style.height = 'fit-content';
    //^ inserting new form
    let newForm = document.querySelector("#new-form")
    let newFormClone = document.importNode(newForm, true)
    modal.appendChild(newFormClone.content);
    //^ displaying the new form
    modalbg.style.display = "block";
    //TODO add event listeners to render newly generated form functional on submit
    /* adding add event listeners on the new form */
    //* closing modal
    const modalClose = document.querySelector(".close")
    modalClose.addEventListener("click", closeModal);
    //* activating validation
    const validateForm = document.querySelector(".btn-submit");
    validateForm.addEventListener("click", updateForm);
    //* handling mandatory terms & conditions
    const terms = modalbg.querySelector(".terms")
    console.log(terms);
    terms.classList.add("true")
    console.log("Box validée par défaut : ", terms.classList[2])
    terms.addEventListener("click", checkTerms);
    //* checking newsletter
    const newsletter = modalbg.querySelector(".newsletter")
    console.log(newsletter)
    newsletter.addEventListener("click", checkNewsletter);
    //* saving location
    const locations = modalbg.querySelectorAll(".location")
    console.log(locations)
    locations.forEach(location => {
      location.addEventListener("click", saveLocation)
    });
  } else {
    /* displaying form */
    modalbg.style.display = "block";
  }
  //! original function :
  // modalbg.style.display = "block";
}

//* Close modal
//^ Creating close function
function closeModal() {
  if (modalbg.style.display == "block") {
    //? emptying form fields
    // text inputs
    for (let index = 0; index < 5; index++) {
      formEntries[index].value = "";
      formEntries[index].style.border = "none";
    }
    // radio buttons
    for (let index = 5; index < 11; index++) {
      formEntries[index].checked = false
    }
    //? removing alerts
    for(const alert of alerts) {
      alert.style.display = "none";
    }
    //? removing newsletter check
    newsletter.classList.remove("true")
    newsletterInput.checked = false
    //newsletter.style.background = "#c4c4c4";
    //? removing modal from screen
    modalbg.style.display = "none";
  }
}
//^ Setting the event on the close button
modalClose.addEventListener("click", closeModal)

//* Form entries
//^ Instanciating Form object
const signUpForm = {
  name: "",
  surname: "",
  email: "",
  birthdate: "",
  participationCount: "",
  tournamentChoice: "",
  // termsConditions: true || false,
  nextEventsNewsletter: false
}
//^ Getting form fields
// const formEntries = modalbg.querySelectorAll("input");

const locations = modalbg.querySelectorAll(".location")
console.log(locations);
let chosenLocation;
let saveLocation = (event) => {
  chosenLocation = event.target.value;
  console.log("chosen location : ", chosenLocation)
  return chosenLocation
  ////return event.target.value
}
locations.forEach(location => {
  location.addEventListener("click", saveLocation)
});
//^Activating the Terms & Conditions checkbox
//& getting the checkbox
const terms = modalbg.querySelector(".terms")
console.log(terms);
//& placing an automatic check
terms.classList.add("true")
console.log("Box validée par défaut : ", terms.classList[2]);
//& rendering it useable
function checkTerms(event) {
  console.log(event.target);
  if (event.target.classList[2] === undefined) {
    event.target.classList.add("true")
  } else if (event.target.classList[2] !== null && event.target.classList[2] == "true") {
    event.target.classList.remove("true")
    event.target.classList.add("false");
  } else if (event.target.classList[2] !== null && event.target.classList[2] == "false") {
    event.target.classList.remove("false")
    event.target.classList.add("true");
  }
  console.log("Conditions d'utilisation acceptées : ", event.target.classList[2]);
}
terms.addEventListener("click", checkTerms);

//^Activating the Newsletter checkbox
//& getting the checkbox
const newsletter = modalbg.querySelector(".newsletter")
console.log(newsletter);
//& rendering it useable
function checkNewsletter(event) {
  console.log(event.target);
  if (event.target.classList[2] === undefined) {
    event.target.classList.add("true")
  } else if (event.target.classList[2] !== null && event.target.classList[2] == "true") {
    event.target.classList.remove("true")
    event.target.classList.add("false");
  } else if (event.target.classList[2] !== null && event.target.classList[2] == "false") {
    event.target.classList.remove("false")
    event.target.classList.add("true");
  }
  console.log("Inscription à la newsletter validée : ", event.target.classList[2]);
}
newsletter.addEventListener("click", checkNewsletter);

//^ Registering form fields
//& Validating form
//? getting the validate button
const validateForm = document.querySelector(".btn-submit");

//? making it functional
validateForm.addEventListener("click", updateForm)
//validateForm.addEventListener("click", confirm)
//& Creating the validation function
//& Saving the form data
function updateForm(event/*, signUpForm*/) {
  event.preventDefault()
  const terms = modalbg.querySelector(".terms")

  //^ Getting form fields
  const formEntries = modalbg.querySelectorAll("input"); // todo : remove if global instance works

  //^ Getting newsletter choice
  //! newsletter is created again within the scope of updateForm() so that the current value can be saved instead of being blocked on the first value ever entered
  const newsletter = modalbg.querySelector(".newsletter") // todo : remove if global instance works
  console.log("newsletter choice", newsletter);

  //^Checking terms & conditions are accepted
  const termsAlert = document.querySelectorAll('.alert')[6]
  const alerts = document.querySelectorAll('.alert') // todo : remove if global instance works
  if (terms.classList[2] !== "true") {
    event.preventDefault()
    termsAlert.style.setProperty("display", "initial");
    return
    //alert("Veuillez accepter les conditions d'utilisation");
  } else if (termsAlert.style.display === 'initial') {
    termsAlert.style.setProperty("display", "none");
  }
  //^ Checking all fields of the forms are not empty before validating
  if (formEntries[0].value === "" || formEntries[1].value === "" || formEntries[2].value === "" || formEntries[3].value === "" || formEntries[4].value === "") {
    event.preventDefault()
    if (terms.classList[2] === "true" && termsAlert.style.display === "initial") {
      termsAlert.style.setProperty("display", "none");
    }
    console.log(alerts);
    console.log(alerts[1].style.display)
      for (let index = 0; index < 5/*alerts.length*/; index++) {
        if (index === 0 || index === 1) {
          if (formEntries[index].value.length < 2) {
            alerts[index].style.setProperty("display", "initial")
            formEntries[index].style.border = 'solid red 2px'
          } else if (formEntries[index].value.length >= 2 && alerts[index].style.display === "initial") {
            alerts[index].style.setProperty("display", "none")
            formEntries[index].style.border = 'none'
          }
        }
        if (index === 2) {
          if (!formEntries[2].value.match(/[a-z|0-9]*@(gmail.com|yahoo.com|yahoo.fr|hotmail.fr|free.fr|live.com|ymail.com|outlook.com|live.fr)/)) {
            alerts[2].style.setProperty("display", "initial")
            formEntries[2].style.border = 'solid red 2px'
          }
          if (formEntries[2].value.match(/[a-z|0-9]*@(gmail.com|yahoo.com|yahoo.fr|hotmail.fr|free.fr|live.com|ymail.com|outlook.com|live.fr)/) && alerts[2].style.display === "initial") {
            alerts[2].style.setProperty("display", "none")
            formEntries[2].style.border = 'none'
          }
        }
        if (!formEntries[3].value.match(/^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/)) {
          alerts[3].style.setProperty("display", "initial")
          formEntries[3].style.border = 'solid red 2px'
        }
        if (formEntries[3].value.match(/^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/) && alerts[3].style.display === "initial") {
          alerts[3].style.setProperty("display", "none")
          formEntries[3].style.border = 'none'
        }
        if (index === 4) {
          if (!formEntries[4].value.match(/^^[1-9]$|[1-9][0-9]$/)) {
            alerts[4].style.setProperty("display", "initial")
            formEntries[4].style.border = 'solid red 2px'
          } else if (formEntries[4].value.match(/^^[1-9]$|[1-9][0-9]$/) && alerts[index].style.display === "initial") {
            alerts[4].style.setProperty("display", "none")
            formEntries[4].style.border = 'none'
          }
        }
        /*if (formEntries[index].value === "") {
          //alerts[index].style.display = 'initial'; //! not working
          //console.log(window.getComputedStyle(alerts[1]).getPropertyValue("display")) //! getting the style of alerts elements
          alerts[index].style.setProperty("display", "initial")
          formEntries[index].style.border = 'solid red 2px'
        }
        if (formEntries[index].value !== "" && alerts[index].style.display === "initial") {
          alerts[index].style.setProperty("display", "none")
          formEntries[index].style.border = 'none'
        }*/
      }
      if (chosenLocation === undefined || chosenLocation === "" || chosenLocation === null) {
        alerts[5].style.setProperty("display", "initial");
        return;
      } else if (alerts[5].style.display === "initial"){
        if (chosenLocation !== undefined || chosenLocation !== "" || chosenLocation !== null) {
          alerts[5].style.setProperty("display", "none");
        }
      }
    } else {

    //^ saving name, surname, email, birthday, particpation count & location
    event.preventDefault()
    // saving location
    if (chosenLocation === undefined || chosenLocation === "" || chosenLocation === null) {
      alerts[5].style.setProperty("display", "initial");
      return;
    } else if (alerts[5].style.display === "initial"){
      if (chosenLocation !== undefined || chosenLocation !== "" || chosenLocation !== null) {
        alerts[5].style.setProperty("display", "none");
      }
    }
    if (chosenLocation !== undefined || chosenLocation !== "" || chosenLocation !== null) {
      signUpForm.tournamentChoice = chosenLocation;
    }
    // saving name
    if (formEntries[0].value.length < 2 || !formEntries[0].value.match(/^[A-z]*/)) {
      alerts[0].style.setProperty("display", "initial")
      formEntries[0].style.border = 'solid red 2px'
      return
    } else if (formEntries[0].value.length >= 2 && alerts[0].style.display === "initial") {
      alerts[0].style.setProperty("display", "none")
      formEntries[0].style.border = 'none'
    }
    if (formEntries[0].value.length >= 2 && formEntries[0].value.match(/^[A-z]*/)) {
      signUpForm.name = formEntries[0].value //!pour une raison quelconque signUpForm est considéré comme undefined, il faut donc utiliser "this" à la place 
    }

    // saving surname
    if (formEntries[1].value.length < 2 && !formEntries[1].value.match(/^[A-z]*/)) {
      alerts[1].style.setProperty("display", "initial")
      formEntries[1].style.border = 'solid red 2px'
      return
    } else if (formEntries[1].value.length >= 2 && alerts[1].style.display === "initial") {
      alerts[1].style.setProperty("display", "none")
      formEntries[1].style.border = 'none'
    }
    if (formEntries[1].value.length >= 2 && formEntries[1].value.match(/^[A-z]*/)) {
      signUpForm.surname = formEntries[1].value;
    }

    // saving email
    if (!formEntries[2].value.match(/[a-z|0-9]*@(gmail.com|yahoo.com|yahoo.fr|hotmail.fr|free.fr|live.com|ymail.com|outlook.com|live.fr)/)) {
      alerts[2].style.setProperty("display", "initial")
      formEntries[2].style.border = 'solid red 2px'
      return;
    }
    if (formEntries[2].value.match(/[a-z|0-9]*@(gmail.com|yahoo.com|yahoo.fr|hotmail.fr|free.fr|live.com|ymail.com|outlook.com|live.fr)/) && alerts[2].style.display === "initial") {
      alerts[2].style.setProperty("display", "none")
      formEntries[2].style.border = 'none';
    }
    if (formEntries[2].value.match(/[a-z|0-9]*@(gmail.com|yahoo.com|yahoo.fr|hotmail.fr|free.fr|live.com|ymail.com|outlook.com|live.fr)/)) {
      signUpForm.email = formEntries[2].value;
    }

    // saving birthdate
    if (!formEntries[3].value.match(/^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/)) {
      alerts[3].style.setProperty("display", "initial")
      formEntries[3].style.border = 'solid red 2px'
      return;
    }
    if (formEntries[3].value.match(/^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/) && alerts[3].style.display === "initial") {
      alerts[3].style.setProperty("display", "none")
      formEntries[3].style.border = 'none';
    }
    if (formEntries[3].value.match(/^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/)) {
      signUpForm.birthdate = formEntries[3].value;
    }

    // saving participation
    if (!formEntries[4].value.match(/^[1-9]$|[1-9][0-9]$/)) {
      alerts[4].style.setProperty("display", "initial")
      formEntries[4].style.border = 'solid red 2px'
      return;
    } else if (formEntries[4].value.match(/^[1-9]$|[1-9][0-9]$/) && alerts[4].style.display === "initial") {
      alerts[4].style.setProperty("display", "none")
      formEntries[4].style.border = 'none'
    }
    if (formEntries[4].value.match(/^[1-9]$|[1-9][0-9]$/)) {
      signUpForm.participationCount = formEntries[4].value
    }

    //^ saving newsletter choice
    if (newsletter.classList[2] === undefined || newsletter.classList[2] === "false") {
      signUpForm.nextEventsNewsletter = false;
    } else if (newsletter.classList[2] === "true") {
      //signUpForm.nextEventsNewsletter = formEntries[12].classList[1];
      signUpForm.nextEventsNewsletter = true;
    }
    //this.nextEventsNewsletter = formEntries[12].classList[1];
    // printing formData for checking
    console.log(signUpForm)

    formEntries[0].value = "";
    formEntries[1].value = "";
    formEntries[2].value = "";
    formEntries[3].value = "";
    formEntries[4].value = "";
    chosenLocation = "";
    confirm()
    return signUpForm;
  }
}

//* Show confirmation screen
const modal = document.querySelector('.modal-body')
//const form = document.querySelector('.modal-body form')
let content = document.querySelector('.content')
const confirmation = document.querySelector("#confirm")
const body = document.querySelector("body")
function confirm() {
  const sectionHeight = modal.clientHeight;
  console.log("section height : ", sectionHeight);
  const form = document.querySelector('.modal-body form')
  form.remove(form.innerHTML)
  let confirmationScreen = document.importNode(confirmation, true)
  modal.appendChild(confirmationScreen.content)
  const closeBtn = document.querySelector('.close-modal')
  closeBtn.addEventListener("click", closeModal)
  if (sectionHeight > '711px') {
    modal.style.height = '711px'
  } else {
    modal.style.height = `${sectionHeight}px`
  }
  if (body.clientWidth >= 375 && body.clientWidth < 400) {
    closeBtn.style.bottom = "-54%"
  } else if (body.clientWidth >= 400 && body.clientWidth < 415) {
    closeBtn.style.bottom = "-53%"
  } else if (body.clientWidth >= 415 && body.clientWidth < 445) {
    closeBtn.style.bottom = "-51%"
  } else if (body.clientWidth >= 445 && body.clientWidth < 465) {
    closeBtn.style.bottom = "-49%"
  } else if (body.clientWidth >= 465 && body.clientWidth < 500) {
    closeBtn.style.bottom = "-46%"
  } else if (body.clientWidth >= 500 && body.clientWidth < 700) {
    closeBtn.style.bottom = "-45%"
  } else if (body.clientWidth >= 700) {
    closeBtn.style.bottom = "-44%"
  } else {
    closeBtn.style.bottom = "-57%"
  }
}