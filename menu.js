function menuToggle(x, menu) {
  x.classList.toggle("open");
  menu.classList.toggle("open");
}

const menuBut = document.getElementById("menu-button-container");
const menu = document.getElementById("menu");
if (menuBut && menu) {
  menuBut.addEventListener("click", function () {
    menuToggle(menuBut, menu);
  });
  fetch("/menu-component.html").then(function (response) {
    if (response.ok) {
      return response.text();
    }
    throw response;
  }).then(function (text) {
    console.log(text);
    menu.innerHTML = text;
  });
} else {
  console.log("menu not working");
}
