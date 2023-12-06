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
    //! modified function -- comment to activate original function
    /* erasing confirmation screen*/
    const confirm = document.querySelector('.confirm')
    if (confirm !== null) {
      confirm.remove(confirm.innerHTML)
      let newForm = document.querySelector("#new-form")
      modal.appendChild(newForm.content)
      //TODO add event listeners to render newly generated form functional on submit
    } else {
      /* displaying form*/
      modalbg.style.display = "block";
    }
    //! original function :
    // modalbg.style.display = "block";
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
  const formEntries = modalbg.querySelectorAll("input");
  
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
    if (terms.classList[2] !== "true") {
      event.preventDefault()
      alert("Veuillez accepter les conditions d'utilisation");
    } else if (formEntries[0].value === "" || formEntries[1].value === "" || formEntries[2].value === "" || formEntries[3].value === "" || formEntries[4].value === "") {
        event.preventDefault()
        alert("Veuillez remplir tous les champs du formulaire.");
      } else if (chosenLocation === undefined) {
        event.preventDefault()
        alert("Veuillez choisir un lieu de compétition.");
      } else {
      // saving name, surname, email, birthday & particpation count
      event.preventDefault()
      /*for (let index = 0; index < 5 /*formEntries.length*/; /*index++) {
        /*signUpForm[index] = formEntries[index].value;
      }*/
      // saving name
      signUpForm.name = formEntries[0].value; //!pour une raison quelconque signUpForm est considéré comme undefined, il faut donc utiliser "this" à la place
      //this.name = formEntries[0].value;
      // saving surname
      signUpForm.surname = formEntries[1].value;
      //this.surname = formEntries[1].value;
      // saving email
      signUpForm.email = formEntries[2].value;
      //this.email = formEntries[2].value;
      // saving birthdate
      signUpForm.birthdate = formEntries[3].value;
      //this.birthdate = formEntries[3].value;
      // saving participation
      signUpForm.participationCount = formEntries[4].value;
      //this.participationCount = formEntries[4].value;
      // saving location
      signUpForm.tournamentChoice = chosenLocation;
      //this.tournamentChoice = chosenLocation;
      // saving newsletter choice
      if (newsletter.classList[2] === undefined || newsletter.classList[2] === "false") {
        signUpForm.nextEventsNewsletter = false;
      } else if (newsletter.classList[2] === "true") {
        //signUpForm.nextEventsNewsletter = formEntries[12].classList[1];
        signUpForm.nextEventsNewsletter = true;
      }
      //this.nextEventsNewsletter = formEntries[12].classList[1];
      // printing formData for checking
      console.log(signUpForm)
      confirm()
      return signUpForm;
      //console.log(this)
      //return this;
    }
    //console.log(signUpForm);
  }
  
  //* Show confirmation screen
  const modal = document.querySelector('.modal-body')
  const form = document.querySelector('.modal-body form')
  const content = document.querySelector('.content')
  let confirmation = document.querySelector("#confirm")
  const body = document.querySelector("body")
  function confirm() {
    const sectionHeight = modal.clientHeight;
    console.log("section height : ", sectionHeight);
    form.remove(form.innerHTML)
    modal.appendChild(confirmation.content)
    const closeBtn = document.querySelector('.close-modal')
    closeBtn.addEventListener("click", closeModal)
    modal.style.height = `${sectionHeight}px`
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