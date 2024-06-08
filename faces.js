const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const faceNames = [
  "1-4-2024",
  "1-5-2024",
  "2-5-2024",
  "3-4-2024",
  "4-4-2024",
  "4-5-2024",
  "5-4-2024",
  "6-4-2024",
  "6-5-2024",
  "7-4-2024",
  "7-5-2024",
  "8-4-2024",
  "8-5-2024",
  "9-4-2024",
  "9-5-2024",
  "10-4-2024",
  "10-5-2024",
  "11-5-2024",
  "12-4-2024",
  "12-5-2024",
  "6-6-2024",
  "13-4-2024",
  "14-4-2024",
  "15-4-2024",
  "16-4-2024",
  "17-4-2024",
  "18-4-2024",
  "19-4-2024",
  "22-4-2024",
  "23-4-2024",
  "24-4-2024",
  "26-4-2024",
  "28-4-2024",
  "29-4-2024",
  "30-4-2024",
  "31-3-2024",
  "7-6-2024",
];

function chooseFace(faceName) {
  const filename = "assets/faces/" + faceName + ".jpg";
  const facePic = document.getElementById("face-pic");
  if (facePic) {
    facePic.src = filename;
  } else {
    console.log("face choosing not going great");
  }
}

function setFaces() {
  const faceDates = document.getElementsByClassName("has-face");

  for (const facedate of faceDates) {
    const currFaceName =
      facedate.innerText + "-" + (currMonth + 1) + "-" + currYear;
    // console.log(currFaceName);
    facedate.addEventListener("click", function () {
      const activeDate = document.getElementsByClassName("active")[0];
      if (activeDate) {
        activeDate.classList.remove("active");
      }
      facedate.classList.add("active");
      chooseFace(currFaceName);
    });
  }
}

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  let numOfWeeks =
    (lastDateofMonth + firstDayofMonth - 1 + (7 - lastDayofMonth)) / 7;
  console.log(numOfWeeks);
  const buffer = document.getElementById("cal-buffer");
  if (numOfWeeks == 4) {
    buffer.classList.remove("zero");
    buffer.classList.remove("one");
    buffer.classList.add("two");
  } else if (numOfWeeks == 5) {
    buffer.classList.remove("zero");
    buffer.classList.add("one");
    buffer.classList.remove("two");
  } else {
    buffer.classList.add("zero");
    buffer.classList.remove("one");
    buffer.classList.remove("two");
  }

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    const currFaceName = i + "-" + (currMonth + 1) + "-" + currYear;
    // console.log(currFaceName);
    let hasFace = faceNames.includes(currFaceName) ? "has-face" : "";
    liTag += `<li class="${hasFace}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();
setFaces();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth =
      icon.id === "prev"
        ? currMonth - 1
        : icon.id === "next"
        ? currMonth + 1
        : 2; // march is month of first entry

    if (icon.id === "first") {
      currYear = 2024;
    } else if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
    setFaces();
    if (icon.id === "first") {
      document.getElementsByClassName("has-face")[0].classList.add("active");
      chooseFace("31-3-2024");
    }
  });
});
