function menuToggle(x, menu) {
  x.classList.toggle("open");
  menu.classList.toggle("open");
  if (menu.classList.contains("open")) {
    for (child of menu.children[0].children) {
      child.children[0].tabIndex = 2;
    }
  } else {
    for (child of menu.children[0].children) {
      child.children[0].tabIndex = -1;
    }
  }
}

const menuBut = document.getElementById("menu-button-container");
const menu = document.getElementById("menu");

const menuFloat = document.getElementById("menu-float-container");

function isMenuOffScreen(el) {
  const rectangle = el.getBoundingClientRect();
  return (
    rectangle.top >= (window.innerHeight || document.documentElement.clientHeight) || rectangle.bottom <= 0
  );
}

if (menuBut && menu) {
  window.addEventListener('scroll', () => {
    if (isMenuOffScreen(menuBut)) {
      menuBut.classList.remove("open");
      menu.classList.remove("open");
      menuFloat.classList.add("visible");
    } else {
      if (menuFloat) {
        menuFloat.classList.remove("visible");
      }
    }
  })

  menuBut.addEventListener("click", function () {
    menuToggle(menuBut, menu);
  });

  menuBut.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      menuToggle(menuBut, menu);
    }
  });

  menuFloat.addEventListener("click", function () {
    menuToggle(menuFloat, menu);
  });

  menuFloat.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      menuToggle(menuFloat, menu);
    }
  });

  fetch("/port-menu-component.html").then(function (response) {
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
