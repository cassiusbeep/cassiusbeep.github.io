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
  "right-clicking on the playdoh",
  "looking for clues",
  "sewing",
  "listening to techno",
  "on the notes app",
  "playing worms",
];

function statusUpdate() {
  const titleStatus = document.getElementById("title-card");
  const randInt = Math.floor(Math.random() * statusList.length);
  titleStatus.innerHTML = statusList[randInt];
}

const titleStatus = document.getElementById("title-card");
if (titleStatus) {
  titleStatus.addEventListener("click", function () {
    statusUpdate();
    titleStatus.classList.remove("wiggle");
  });
} else {
  console.log("title didnt work...");
}
