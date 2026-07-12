var playdohNums = [0];
var playdohSides = ["L"];
var colour = "ORANGE";
const bluemodethreshold = 13;
const greenmodethreshold = 5;
const imgNamesLeft = [
  "./assets/orangedoh/01.webp",
  "./assets/orangedoh/02.webp",
  "./assets/orangedoh/03.webp",
  "./assets/orangedoh/04.webp",
  "./assets/orangedoh/05.webp",
  "./assets/orangedoh/06.webp",
  "./assets/orangedoh/07.webp",
  "./assets/orangedoh/08.webp",
  "./assets/orangedoh/09_left.webp",
  "./assets/orangedoh/10_left.webp",
  "./assets/orangedoh/11_left.webp",
  "./assets/orangedoh/12_left.webp",
  "./assets/orangedoh/13_left.webp",
];
const imgNamesRight = [
  "./assets/orangedoh/01.webp",
  "./assets/orangedoh/02.webp",
  "./assets/orangedoh/03.webp",
  "./assets/orangedoh/04.webp",
  "./assets/orangedoh/05.webp",
  "./assets/orangedoh/06.webp",
  "./assets/orangedoh/07.webp",
  "./assets/orangedoh/08.webp",
  "./assets/orangedoh/09_right.webp",
  "./assets/orangedoh/10_right.webp",
  "./assets/orangedoh/11_right.webp",
  "./assets/orangedoh/12_right.webp",
  "./assets/orangedoh/13_right.webp",
];
const blueNames = [];
const clickAudio = new Audio("assets/click4.mp3");
const blueAlert = new Audio("assets/blue-alert.mp3");
let timeSinceInteract = 0;

let playClick = () => clickAudio.play();

function allOrangeBall() {
  // get all playdoh pics
  const dohballs = document.getElementById("playdoh-container").children;
  // set up array of interval IDs
  const intervalArray = [];
  // for each pic, check if it's before after the split in the image array
  for (let i = 0; i < dohballs.length; i++) {
    const playdohID = dohballs[i].id;
    const arrayPlace = parseInt(playdohID.slice(7)) - 1;
    if (playdohNums[arrayPlace] == 0) {
      continue;
    } else if (playdohNums[arrayPlace] >= 8) {
      // we're past a split so go forward til ball
      let j = playdohNums[arrayPlace];
      intervalArray[i] = setInterval(() => {
        if (j == 13) {
          clearInterval(intervalArray[i]);
        } else {
          playdohUpdate(playdohID);
        }
        j++;
      }, 250);
    } else {
      // we're before a split so go backwards til ball
      let j = playdohNums[arrayPlace];
      intervalArray[i] = setInterval(() => {
        if (j == 0) {
          clearInterval(intervalArray[i]);
        } else {
          playdohReverse(playdohID);
        }
        j--;
      }, 250);
    }
  }
}

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
    blueAlert.play();
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
      dohballs[j].src = "./assets/orangedoh/01.webp";
      playClick();
      playdohNums[j] = 0;
      j++;
    } else {
      clearInterval(int);
    }
  }, 200);
}

function greenMode() {
  console.log("im going ten dollar mode");
  const dohballs = document.getElementById("playdoh-container").children;
  // hueshift all balls to green
  for (let i = 0; i < dohballs.length; i++) {
    dohballs[i].classList.add("orangetogreen");
  }
  // get each ball to a ball shape!
  allOrangeBall();
  // set new source to green ball and remove orange-green hue shift
  setTimeout(() => {
    for (let i = 0; i < dohballs.length; i++) {
      dohballs[i].src = "./assets/greendoh/01green.webp";
      dohballs[i].classList.remove("orangetogreen");
    }
  }, 4000);
  colour = "GREEN";
}

function playdohUpdate(playdohID) {
  // grab element of clicked Doh
  const arrayPlace = parseInt(playdohID.slice(7)) - 1;
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
      // if (parseFloat(newHeight) < greenmodethreshold) {
      //   console.log(parseFloat(newHeight));
      //   greenMode();
      // }
    } else {
      // if no new ball: just set to next image in array
      if (playdohSides[arrayPlace] == "L") {
        currentDoh.src = imgNamesLeft[playdohNums[arrayPlace]];
      } else {
        currentDoh.src = imgNamesRight[playdohNums[arrayPlace]];
      }
      blueMode();
    }
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
  } else if (colour == "GREEN") {
    console.log("to implement green mode!");
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

function inactivityTime() {
  var time;
  var idleBall = 0;
  window.onload = resetTimer;
  // DOM Events
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;
  document.onclick = resetTimer;

  function idleAnim() {
    const dohballs = document.getElementById("playdoh-container");
    const randInt = Math.floor(Math.random() * dohballs.children.length);
    dohballs.children[randInt].classList.add("invisible");
    const animBall = document.createElement("img");
    animBall.src = dohballs.children[randInt].src;
    animBall.width = dohballs.children[randInt].width;
    animBall.style.position = "absolute";
    animBall.id = "idle-anim";
    document.getElementsByTagName("main")[0].appendChild(animBall);
    console.log("tried to add animBall");
    idleBall = randInt;
  }

  function resetTimer() {
    clearTimeout(time);
    document
      .getElementById("playdoh-container")
      .children[idleBall].classList.remove("invisible");
    const animBall = document.getElementById("idle-anim");
    if (animBall) {
      animBall.remove();
    }
    time = setTimeout(idleAnim, 1000);
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

// window.onload = function () {
//   inactivityTime();
// };
