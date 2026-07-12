function menuToggle(x, menu) {
  x.classList.toggle("open");
  menu.classList.toggle("open");
}

const menuBut = document.getElementById("menu-button-container");
const menu = document.getElementById("menu");

function isMenuOffScreen(el) {
  const rectangle = el.getBoundingClientRect();
  return (
    rectangle.top >= (window.innerHeight || document.documentElement.clientHeight) || rectangle.bottom <= 0
  );
}

if (menuBut && menu) {
  window.addEventListener('scroll', () => {
    if (isMenuOffScreen(menuBut)) {
      console.log("menubut off screen");
      menuBut.classList.remove("open");
      menu.classList.remove("open");
    } else {
      console.log("menubut on screen");
    }
  })

  menuBut.addEventListener("click", function () {
    console.log("menu button clicked");
    menuToggle(menuBut, menu);
  });

  fetch("/menu-component.html").then(function (response) {
    if (response.ok) {
      return response.text();
    }
    throw response;
  }).then(function (text) {
    menu.innerHTML = text;
  });
} else {
  console.log("menu not working");
}