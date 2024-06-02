var playdohNums = [0];
var playdohSides = ["L"];
const imgNamesLeft = [
  "./assets/01.png",
  "./assets/02.png",
  "./assets/03.png",
  "./assets/04.png",
  "./assets/05.png",
  "./assets/06.png",
  "./assets/07.png",
  "./assets/08.png",
  "./assets/09_left.png",
  "./assets/10_left.png",
  "./assets/11_left.png",
  "./assets/12_left.png",
  "./assets/13_left.png",
];
const imgNamesRight = [
  "./assets/01.png",
  "./assets/02.png",
  "./assets/03.png",
  "./assets/04.png",
  "./assets/05.png",
  "./assets/06.png",
  "./assets/07.png",
  "./assets/08.png",
  "./assets/09_right.png",
  "./assets/10_right.png",
  "./assets/11_right.png",
  "./assets/12_right.png",
  "./assets/13_right.png",
];
const statusList = [
  "messing around",
  "having a blast",
  "getting freaky",
  "getting sleepy",
  "behind you",
  "cassius hall",
  "coding",
  "cooking",
  "reading",
  "rewatching altered carbon",
  "playing ace attorney",
  "drawing",
  "a term for money in coins or notes, as distinct from cheques, money orders, or credit",
  "undefined",
  "still playing with that play-doh",
  "chewin on a mint leaf",
];

function statusUpdate() {
  const titleStatus = document.getElementById("title-card");
  const randInt = Math.floor(Math.random() * statusList.length);
  titleStatus.innerHTML = statusList[randInt];
}

function playdohUpdate(playdohID) {
  // grab element of clicked Doh
  var arrayPlace = parseInt(playdohID.slice(7)) - 1;
  const currentDoh = document.getElementById(playdohID);

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
  } else {
    // if no new ball: just set to next image in array
    if (playdohSides[arrayPlace] == "L") {
      currentDoh.src = imgNamesLeft[playdohNums[arrayPlace]];
    } else {
      currentDoh.src = imgNamesRight[playdohNums[arrayPlace]];
    }
  }
}

window.onload = function () {
  const playdohStarter = document.getElementById("playdoh1");
  const titleStatus = document.getElementById("title-card");
  if (playdohStarter) {
    playdohStarter.addEventListener("click", function () {
      playdohUpdate("playdoh1");
    });
    playdohStarter.style.height = "100%";
  } else {
    console.log("d'oh!");
  }
  if (titleStatus) {
    titleStatus.addEventListener("click", function () {
      statusUpdate();
    });
  } else {
    console.log("title didnt work...");
  }
};

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
