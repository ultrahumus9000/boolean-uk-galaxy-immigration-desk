// Description
// In this exercise we explore a single-page application with various sections that interact with each other.

// Deliverables
// - A user can see a list of applicants waiting to be accepted into the space station
// - A user can see an immigration form with the following:
//     - A section for the applicant's name
//     - An input for the applicant's destination
//     - A select input for the applicant's purpose of travel
//     - A radio input for the applicant's response to terrorist activity
//     - An button to accept applicants
//         - The button is disabled if an applicant has not been selected
// - From the list of applicants, a user can:
//     - See an applicants name
//     - Click a button to:
//         - View an applicant's details in the info section which includes:
//             - Gender
//             - DOB - date of birth
//             - Height
//             - Mass
//             - Homeworld (must have)
//         - And, select the applicant for the immigration form
//             - If the applicant has already been accepted, the form is replaced with a notification of acceptance
// - From the immigration form, a user can:
//     - Fill out the details for the applicant
//     - And, accept the applicant and store the details in the state
// @here

// Instructions
// - Grab the starting template here: https://codesandbox.io/s/js-exercise-galaxy-immigration-desk-starter-template-yf277
// - Read the "Star Wars API" documentation: https://swapi.dev/documentation
// - Think about which resources you are going to use
// - Create a state object
// - Create fetch functions to get data
// - Create render functions that read from state

// Tips
// - Start with the logic first, use console.log(state) to check your logic is working; when the logic is working as expected move onto styling
// - Notice the url to other SWAPI resources in the data; think about what you need and make multiple fetch requests before adding data to state

// Challenge (extra day of work)
// Create the "Starship Hangar" page, not another HTML page, where:
//     - A user can view a list of starships that belong to the accepted immigration applicants
//     - From the list of starships, a user can:
//         - View info on the starship in the info section
//         - And, view the crew of the starship in the action section
//     - From the action section, a user can:
//         - Launch a ship from the space station
//         - And, remove the starship from the list of starships
//         - And, remove the crew from the applicant section on the "Crew Deck" page
const state = {
  applicants: [],
  homeWorld: [],
  approvedApplicants: [],
  rejectApplicants: [],
};

function getApplicantsinfo() {
  return fetch("https://swapi.dev/api/people/?page=1")
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      //   console.log(data);
      state.applicants = data.results;
      //   console.log(state.applicants);
      return state.applicants;
    });
}
getApplicantsinfo().then(function () {
  render();
});
const infoSection = document.querySelector(".info-section");
const listSection = document.querySelector(".list-section");
const actionSection = document.querySelector(".action-section");
let applicant = "";
function render() {
  let sectionList = document.querySelector(".list-section");
  sectionList.innerHTML = "";
  let h2el = document.createElement("h2");
  h2el.innerText = "Applicants";
  sectionList.prepend(h2el);
  renderPendingApplicants();
  renderApprovedApplicants();
  renderRejectApplicants();
}

function fecthHome(applicant) {
  return fetch(applicant.homeworld)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (address) {
      let index = state.homeWorld.findIndex(function (home) {
        return home.name === address.name;
      });
      address.url = applicant.homeworld;
      if (index === -1) {
        state.homeWorld.push(address);
      }
      //   console.log(address);
      console.log(state.homeWorld);
      return address;
    });
}

function renderApprovedApplicants() {
  let approvedApplicants = state.approvedApplicants;
  approvedApplicants.map(function (approvedApplicant) {
    createListforApprovedApplicant(approvedApplicant);
  });
}

function createListforApprovedApplicant(approvedApplicant) {
  let listEl = document.createElement("li");
  listEl.className = "approvedapplicantlist";

  listEl.innerText = approvedApplicant.name;
  let viewBtn = document.createElement("button");
  viewBtn.innerText = "VIEW";

  viewBtn.addEventListener("click", function () {
    // console.log(approvedApplicant);
    let viewaddress = state.homeWorld.find(function (home) {
      //   console.log(home.url);
      return home.url === approvedApplicant.homeworld;
    });
    // console.log(approvedApplicant.url);
    viewaddress = viewaddress.name;
    // console.log(viewaddress);
    createViewcard(approvedApplicant, viewaddress);

    let sectionEl = document.querySelector("immigration_section");
    let formel = document.querySelector(".immigration_form");
    formel.innerHTML = "";
    let spantext = document.querySelector(".autoFill");
    spantext.innerText = approvedApplicant.name;

    let buttonBig = document.createElement("button");
    buttonBig.className = "greenbig ";
    buttonBig.innerText = "Accept";
    formel.append(buttonBig);
  });
  listEl.append(viewBtn);
  listSection.append(listEl);
}

function renderRejectApplicants() {
  let rejectApplicants = state.rejectApplicants;
  rejectApplicants.map(function (rejectApplicant) {
    createListforRejectApplicant(rejectApplicant);
  });
}

function createListforRejectApplicant(rejectApplicant) {
  let listEl = document.createElement("li");
  listEl.className = "rejectapplicantlist";
  listEl.innerText = rejectApplicant.name;
  let viewBtn = document.createElement("button");
  viewBtn.innerText = "VIEW";

  viewBtn.addEventListener("click", function () {
    let viewaddress = state.homeWorld.find(function (home) {
      //   console.log(home.url);
      return home.url === rejectApplicant.homeworld;
    });
    // console.log(approvedApplicant.url);
    viewaddress = viewaddress.name;
    // console.log(viewaddress);
    createViewcard(rejectApplicant, viewaddress);
    let sectionEl = document.querySelector("immigration_section");
    let formel = document.querySelector(".immigration_form");
    formel.innerHTML = "";
    let spantext = document.querySelector(".autoFill");
    spantext.innerText = rejectApplicant.name;

    let buttonBig = document.createElement("button");
    buttonBig.className = "rejecbigbutton";
    buttonBig.innerText = "REJECT!";
    formel.append(buttonBig);
  });
  listEl.append(viewBtn);
  listSection.append(listEl);
}

function renderPendingApplicants() {
  console.log(state.applicants);
  let applicants = state.applicants;
  applicants.map(function (applicant) {
    createListforPendingApplicant(applicant);
  });
}

function createListforPendingApplicant(applicant) {
  let listEl = document.createElement("li");
  listEl.className = "applicantlist";
  listEl.innerText = applicant.name;
  let viewBtn = document.createElement("button");
  viewBtn.innerText = "VIEW";

  viewBtn.addEventListener("click", function () {
    fecthHome(applicant).then(function (address) {
      let viewaddress = state.homeWorld.find(function (home) {
        return home.url === address.url;
      });
      viewaddress = viewaddress.name;
      console.log(viewaddress);
      createViewcard(applicant, viewaddress);

      console.log(applicant);

      let formSection = document.querySelector(".action-section");
      formSection.innerHTML = "";
      createImigrationForm(applicant);
      let prebtn = document.querySelector(".prebtn");
      prebtn.classList.add("greensmall");
    });
  });
  listEl.append(viewBtn);
  listSection.append(listEl);
}

function createViewcard(applicant, viewaddress) {
  infoSection.innerHTML = "";
  let viewCard = document.createElement("section");
  viewCard.className = "viewcard";

  let viewH = document.createElement("h2");
  viewH.className = "viewH";
  viewH.innerText = applicant.name;

  let genderP = document.createElement("p");
  genderP.className = "viewP";
  genderP.innerText = "Gender";
  let genderS = document.createElement("span");
  genderS.innerText = applicant.gender;
  genderP.append(genderS);

  let dobP = document.createElement("p");
  dobP.className = "viewP";
  dobP.innerText = "D.O.B";
  let dobS = document.createElement("span");
  dobS.innerText = applicant.birth_year;
  dobP.append(dobS);

  let heightP = document.createElement("p");
  heightP.className = "viewP";
  heightP.innerText = "Height";
  let heightS = document.createElement("span");
  heightS.innerText = applicant.height;
  heightP.append(heightS);

  let massP = document.createElement("p");
  massP.className = "viewP";
  massP.innerText = " mass";
  let massS = document.createElement("span");
  massS.innerText = applicant.mass;
  massP.append(massS);

  let homeP = document.createElement("p");
  homeP.className = "viewP";
  homeP.innerText = "HomeWorld";
  let homeS = document.createElement("span");
  homeS.innerText = viewaddress;
  homeP.append(homeS);

  viewCard.append(viewH, genderP, dobP, heightP, massP, homeP);
  infoSection.append(viewCard);
}

function createImigrationForm(applicant) {
  let sectionEl = document.createElement("section");
  sectionEl.className = "immigration_section";

  let titelH = document.createElement("h2");
  titelH.className = "titelH";
  titelH.innerText = "Immigration Form";

  let nameH = document.createElement("h2");
  nameH.className = "nameH";
  nameH.innerText = "Applicant Name: ";

  let spanName = document.createElement("span");
  spanName.className = "autoFill";
  let defaultName = "";
  if (applicant === "") {
    defaultName = "";
  } else {
    defaultName = applicant.name;
  }

  spanName.innerText = defaultName;
  nameH.append(spanName);

  let formEl = document.createElement("form");
  formEl.className = "immigration_form";

  let destinationLabel = document.createElement("label");
  destinationLabel.innerText = "Destination";
  let destinationInput = document.createElement("input");
  destinationInput.setAttribute("name", "destination");
  destinationLabel.append(destinationInput);

  let purposeLabel = document.createElement("label");
  purposeLabel.innerText = "Purpose of Travel";

  let purposeSelect = document.createElement("select");
  purposeSelect.setAttribute("name", "purpose");

  let purposeOptionOne = document.createElement("option");
  purposeOptionOne.setAttribute("name", "vacation");
  purposeOptionOne.innerText = "VACATION";

  let purposeOptionTWO = document.createElement("option");
  purposeOptionTWO.innerText = "BUSINESS";
  purposeOptionTWO.setAttribute("name", "business");
  purposeSelect.append(purposeOptionOne, purposeOptionTWO);
  purposeLabel.append(purposeSelect);

  let activityLabel = document.createElement("label");
  activityLabel.innerText = "Terrorist Activity:";

  let confirmYesDiv = document.createElement("div");
  let yesInput = document.createElement("input");
  yesInput.setAttribute("type", "radio");
  yesInput.setAttribute("name", "radio");
  yesInput.setAttribute("value", "Yes");

  let yesLabel = document.createElement("label");
  yesLabel.innerText = "YES";
  yesLabel.prepend(yesInput);
  confirmYesDiv.append(yesLabel);

  let confirmNoDiv = document.createElement("div");
  let noInput = document.createElement("input");
  noInput.setAttribute("type", "radio");
  noInput.setAttribute("name", "radio");
  noInput.setAttribute("value", "No");

  let noLabel = document.createElement("label");
  noLabel.innerText = "NO";
  noLabel.prepend(noInput);
  confirmNoDiv.append(noLabel);

  let PreAcceptBtn = document.createElement("button");
  PreAcceptBtn.setAttribute("class", "prebtn");

  PreAcceptBtn.innerText = "Accept ->";

  let rejectBtn = document.createElement("button");
  rejectBtn.setAttribute("class", "rejectbtn");
  rejectBtn.innerText = "Reject ->";

  formEl.append(
    destinationLabel,
    purposeLabel,
    activityLabel,
    confirmYesDiv,
    confirmNoDiv,
    PreAcceptBtn,
    rejectBtn
  );
  rejectBtn.addEventListener("click", function (eve) {
    eve.preventDefault();
    getDataforRejecte(formEl, applicant);
    render();
    spanName.innerText = "";
    formEl.reset();
  });
  if (yesInput.checked === false && noInput.checked === false) {
    PreAcceptBtn.disabled = true;
    rejectBtn.disabled = true;
    rejectBtn.className = "disablebtn";
  }

  yesInput.addEventListener("click", function () {
    PreAcceptBtn.disabled = false;
    rejectBtn.disabled = false;
    rejectBtn.className = "rejectbtn";
  });
  noInput.addEventListener("click", function () {
    PreAcceptBtn.disabled = false;
    rejectBtn.disabled = false;
    rejectBtn.className = "rejectbtn";
  });

  PreAcceptBtn.addEventListener("click", function (eve) {
    eve.preventDefault();
    PreAcceptBtn.className = "prebtn";
    getDataforAppoved(formEl, applicant);
    render();
    spanName.innerText = "";
    formEl.reset();
  });

  sectionEl.append(titelH, nameH, formEl);
  actionSection.append(sectionEl);
}
createImigrationForm(applicant);

function getDataforAppoved(form, applicant) {
  let spantext = document.querySelector(".autoFill");
  let approvedApplicant = spantext.innerText;
  state.applicants = state.applicants.filter(function (applicant) {
    return applicant.name !== approvedApplicant;
  });

  let approvedApplicantInfo = {
    Destination: form.destination.value,
    Purpose: form.purpose.value,
    GoodCitizen: true,
    ...applicant,
  };
  state.approvedApplicants.push(approvedApplicantInfo);
  console.log(state);
}

function getDataforRejecte(form, applicant) {
  let spantext = document.querySelector(".autoFill");
  let rejectApplicant = spantext.innerText;
  state.applicants = state.applicants.filter(function (applicant) {
    return applicant.name !== rejectApplicant;
  });

  let rejectApplicantInfo = {
    Destination: form.destination.value,
    Purpose: form.purpose.value,
    GoodCitizen: false,
    ...applicant,
  };
  state.rejectApplicants.push(rejectApplicantInfo);
  console.log(state);
}
