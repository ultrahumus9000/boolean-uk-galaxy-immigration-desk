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

const infoSection = document.querySelector(".info-section");
const listSection = document.querySelector(".list-section");
const actionSection = document.querySelector(".action-section");

// {
//     "name": "Luke Skywalker",
//     "height": "172",
//     "mass": "77",
//     "hair_color": "blond",
//     "skin_color": "fair",
//     "eye_color": "blue",
//     "birth_year": "19BBY",
//     "gender": "male",
//     "homeworld": "http://swapi.dev/api/planets/1/",
//     "films": [
//         "http://swapi.dev/api/films/1/",
//         "http://swapi.dev/api/films/2/",
//         "http://swapi.dev/api/films/3/",
//         "http://swapi.dev/api/films/6/"
//     ],
//     "species": [],
//     "vehicles": [
//         "http://swapi.dev/api/vehicles/14/",
//         "http://swapi.dev/api/vehicles/30/"
//     ],
//     "starships": [
//         "http://swapi.dev/api/starships/12/",
//         "http://swapi.dev/api/starships/22/"
//     ],
//     "created": "2014-12-09T13:50:51.644000Z",
//     "edited": "2014-12-20T21:17:56.891000Z",
//     "url": "http://swapi.dev/api/people/1/"
// }

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

function renderApplicants() {
  getApplicantsinfo().then(function () {
    console.log(state.applicants);
    let applicants = state.applicants;
    applicants.map(function (applicant) {
      createListforAoolicant(applicant);
    });
  });
}
renderApplicants();

function createListforAoolicant(applicant) {
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
      let nameInfo = document.querySelector(".autoFill");
      nameInfo.innerText = applicant.name;
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

function createImigrationForm() {
  let sectionEl = document.createElement("section");
  let titelH = document.createElement("h2");
  titelH.className = "titelH";
  titelH.innerText = "Immigration Form";

  let nameH = document.createElement("h2");
  nameH.className = "nameH";
  nameH.innerText = "Applicant Name: ";

  let spanName = document.createElement("span");
  spanName.className = "autoFill";
  spanName.innerText = "";
  nameH.append(spanName);

  let formEl = document.createElement("form");

  let destinationLabel = document.createElement("label");
  destinationLabel.innerText = "Destination";
  let destinationInput = document.createElement("input");
  destinationLabel.append(destinationInput);

  let purposeLabel = document.createElement("label");
  purposeLabel.innerText = "Purpose of Travel";

  let purposeSelect = document.createElement("select");
  let purposeOptionOne = document.createElement("option");
  purposeOptionOne.innerText = "VACATION";
  let purposeOptionTWO = document.createElement("option");
  purposeOptionTWO.innerText = "BUSINESS";
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
  PreAcceptBtn.setAttribute("type", "submit");
  PreAcceptBtn.innerText = "Accept ->";

  formEl.append(
    destinationLabel,
    purposeLabel,
    activityLabel,
    confirmYesDiv,
    confirmNoDiv,
    PreAcceptBtn
  );
  PreAcceptBtn.addEventListener("click", function (eve) {
    // eve.preventDefault();
    if (yesInput.checked) {
    }
  });

  sectionEl.append(titelH, nameH, formEl);
  actionSection.append(sectionEl);
}
createImigrationForm();
