var playdohNums = [0];
var playdohSides = ["L"];
var colour = "ORANGE";
const bluemodethreshold = 7;
const imgNamesLeft = [
  "./assets/01.webp",
  "./assets/02.webp",
  "./assets/03.webp",
  "./assets/04.webp",
  "./assets/05.webp",
  "./assets/06.webp",
  "./assets/07.webp",
  "./assets/08.webp",
  "./assets/09_left.webp",
  "./assets/10_left.webp",
  "./assets/11_left.webp",
  "./assets/12_left.webp",
  "./assets/13_left.webp",
];
const imgNamesRight = [
  "./assets/01.webp",
  "./assets/02.webp",
  "./assets/03.webp",
  "./assets/04.webp",
  "./assets/05.webp",
  "./assets/06.webp",
  "./assets/07.webp",
  "./assets/08.webp",
  "./assets/09_right.webp",
  "./assets/10_right.webp",
  "./assets/11_right.webp",
  "./assets/12_right.webp",
  "./assets/13_right.webp",
];
const blueNames = [];
const clickAudio = new Audio("assets/click4.mp3");

let playClick = () => clickAudio.play();

function blueMode() {
  if (playdohNums.length >= bluemodethreshold) {
    for (const dohball of playdohNums) {
      if (dohball != 0) {
        return;
      }
    }
    console.log("going blue mode");
    document.getElementById("blue-alert").classList.add("visible");
    // time to turn blue!
    colour = "BLUE";
    new Audio("assets/blue-alert.mp3").play();
    document.getElementById("playdoh-container").classList.add("hueshift");
    const dohballs = document.getElementById("playdoh-container").children;
    for (let i = 0; i < dohballs.length; i++) {
      dohballs[i].src = "./assets/bluedoh/01blue.webp";
      playdohNums[i] = 0;
    }
    setTimeout(() => {
      document.getElementById("blue-alert").classList.remove("visible");
      document.getElementById("playdoh-container").classList.remove("hueshift");
    }, 5950);
  }
}

function orangeMode() {
  const dohballs = document.getElementById("playdoh-container").children;
  for (let i = 0; i < playdohNums.length; i++) {
    const arrayPlace = parseInt(dohballs[i].id.slice(7)) - 1;
    if (i < 33 && playdohNums[arrayPlace] != i) {
      return;
    }
  }
  console.log("back to orange!");
  colour = "ORANGE";
  let j = 0;
  const int = setInterval(() => {
    if (j < dohballs.length) {
      dohballs[j].src = "./assets/01.webp";
      playClick();
      playdohNums[j] = 0;
      j++;
    } else {
      clearInterval(int);
    }
  }, 200);
}

function playdohUpdate(playdohID) {
  // grab element of clicked Doh
  var arrayPlace = parseInt(playdohID.slice(7)) - 1;
  const currentDoh = document.getElementById(playdohID);

  if (colour == "ORANGE") {
    // increment clicked Doh's place in image array
    if (playdohNums[arrayPlace] == 12) {
      playdohNums[arrayPlace] = 0;
    } else {
      playdohNums[arrayPlace]++;
    }

    if (playdohNums[arrayPlace] == 8) {
      // playdoh splits, so create new elt for right side
      playdohNums.push(8);
      playdohSides.push("R");
      playdohSides[arrayPlace] = "L"; // set current to left side
      var newDoh = document.createElement("img");
      // set image sources
      currentDoh.src = imgNamesLeft[8];
      newDoh.src = imgNamesRight[8];
      // set new elt's properties
      newDoh.id = "playdoh" + playdohNums.length;
      newDoh.alt = "play-doh ball";
      // decrease size of new half-balls
      const newHeight = parseInt(currentDoh.style.height) * 0.9 + "%";
      newDoh.style.height = newHeight;
      currentDoh.style.height = newHeight;
      // insert new element to right of current and add click event listener
      document
        .getElementById("playdoh-container")
        .insertBefore(newDoh, currentDoh.nextSibling);
      document.getElementById(newDoh.id).addEventListener("click", function () {
        playdohUpdate(newDoh.id);
      });
      document
        .getElementById(newDoh.id)
        .addEventListener("contextmenu", function (e) {
          e.preventDefault();
          playdohReverse(newDoh.id);
        });
    } else {
      // if no new ball: just set to next image in array
      if (playdohSides[arrayPlace] == "L") {
        currentDoh.src = imgNamesLeft[playdohNums[arrayPlace]];
      } else {
        currentDoh.src = imgNamesRight[playdohNums[arrayPlace]];
      }
    }
    blueMode();
  } else if (colour == "BLUE") {
    // increment clicked Doh's place in image array
    if (playdohNums[arrayPlace] == 32) {
      playdohNums[arrayPlace] = 0;
    } else {
      playdohNums[arrayPlace]++;
    }

    let blueFileName = "./assets/bluedoh/";
    if (playdohNums[arrayPlace] + 1 <= 9) {
      blueFileName += "0";
    }
    blueFileName += playdohNums[arrayPlace] + 1 + "blue.webp";
    currentDoh.src = blueFileName;
    orangeMode();
  }
}

function playdohReverse(playdohID) {
  // grab element of clicked Doh
  var arrayPlace = parseInt(playdohID.slice(7)) - 1;
  const currentDoh = document.getElementById(playdohID);

  if (colour == "ORANGE") {
    // decrement clicked Doh's place in image array
    // but dont let balls rejoin. that's too far
    if (playdohNums[arrayPlace] == 8) {
      playClick();
      return;
    } else if (playdohNums[arrayPlace] == 0) {
      playdohNums[arrayPlace] = 12;
    } else {
      playdohNums[arrayPlace]--;
    }
    // set image to match!
    if (playdohSides[arrayPlace] == "L") {
      currentDoh.src = imgNamesLeft[playdohNums[arrayPlace]];
    } else {
      currentDoh.src = imgNamesRight[playdohNums[arrayPlace]];
    }
    blueMode();
  } else if (colour == "BLUE") {
    // increment clicked Doh's place in image array
    if (playdohNums[arrayPlace] == 0) {
      playdohNums[arrayPlace] = 32;
    } else {
      playdohNums[arrayPlace]--;
    }

    let blueFileName = "./assets/bluedoh/";
    if (playdohNums[arrayPlace] + 1 <= 9) {
      blueFileName += "0";
    }
    blueFileName += playdohNums[arrayPlace] + 1 + "blue.webp";
    currentDoh.src = blueFileName;
    orangeMode();
  }
}

const playdohStarter = document.getElementById("playdoh1");
if (playdohStarter) {
  playdohStarter.addEventListener("click", function () {
    playdohUpdate("playdoh1");
  });
  playdohStarter.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    playdohReverse("playdoh1");
  });
  playdohStarter.style.height = "100%";
} else {
  console.log("d'oh!");
}

/**
 * start with 01
 * click: 02
 * click: 03
 * click: 04
 * click: 05
 * click: 06
 * click: 07
 * click: 08
 * click: 09_left and 09_right, maybe 10% smaller.
 * (now should have separate listeners for these)
 * for both left and right:
 * click: 10_...
 * click: 11_...
 * click: 12_...
 * click: 13_...
 * click: back to 01.
 */
