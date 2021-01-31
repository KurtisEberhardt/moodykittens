/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];

/**
 * [X] Called when submitting the new Kitten Form
 * [X] This method will pull data from the form
 * [X] use the provided generateId() function to give the data an id
 * [] you can use robohash for images https://robohash.org/<INSERTCATNAMEHERE>?set=set4 then add that data to the kittens list.
 * [X] Then reset the form
 * <img src="<img src="https://robohash.org/kat?set=set4">
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {};

  let kittenName = document.getElementById("player-name").value;
  let addKitten = true
  for (i = 0; i < kittens.length; i++) {
    if (kittens[i].name == kittenName) {
      addKitten = false
      alert("Kitten already exists!")
      break
    }
  }
  if (addKitten == true) {
    kitten.name = kittenName;
    kitten.id = generateId()
    kitten.mood = 'Tolerant';
    kitten.affection = 5;
    kittens.push(kitten)
    saveKittens()
    drawKittens()
    form.reset()
  }
}


/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))

}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"))

  if (kittenData) {
    kittens = kittenData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens()
  let pet = document.getElementById("kittens")
  let template = ''
  for (i = 0; i < kittens.length; i++) {
    template += `<div id="${kittens[i].id}"class="kitten card m-1 ${kittens[i].mood.toLowerCase()}">
     <img src="https://robohash.org/${kittens[i].name}?set=set4;size=150x150">
    <p><b>Name:</b> ${kittens[i].name}</p>
    <p><b>Mood:</b> <span id="${kittens[i].id + "mood"}">${kittens[i].mood}</span></p>
    <p><b>Affection:</b> <span id="${kittens[i].id + "affection"}">${kittens[i].affection}</span></p>
    <button id="pet" onclick="pet('${kittens[i].id}')">Pet</button>
    <button id="catNip" onclick="catnip('${kittens[i].id}')">Catnip</button>
    </div >
    `
  }
  pet.innerHTML = template
}

function drawKitten(kitten) {
  let affection = kitten.id + "affection"
  let mood = kitten.id + "mood"
  document.getElementById(mood).innerHTML = `
  ${kitten.mood}`
  document.getElementById(affection).innerHTML = `
  ${kitten.affection}`
  document.getElementById(kitten.id).className = `kitten card m-1 ${kitten.mood.toLowerCase()}`

}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let kitten = findKittenById(id)

  if (Math.random() > 0.7) {
    kitten.affection++
  } else {
    kitten.affection--
  }
  saveKittens()
  setKittenMood(kitten)
  drawKitten(kitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  if (kitten.affection < 5) {
    kitten.affection = 5
  }
  saveKittens()
  setKittenMood(kitten)
  drawKitten(kitten)
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let img = kitten.id + "img"
  if (kitten.affection <= 0) {
    kitten.mood = 'Gone'
  } else if (kitten.affection <= 3) {
    kitten.mood = 'Angry'
  } else if (kitten.affection <= 5) {
    kitten.mood = 'Tolerant'
  } else if (kitten.affection > 6) {
    kitten.mood = 'Happy'
  }
  saveKittens()
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function deleteKittens() {
  kittens = []
  alert("Kittens deleted :(")
  saveKittens()
}