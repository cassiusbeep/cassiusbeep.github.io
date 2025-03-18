const menuButton = document.getElementById("menu-button");
const menuSlide = document.getElementById("menu-slide");
const imgTriangle = document.getElementById("menutriangleone");
const newsTriangle = document.getElementById("menutriangletwo");
const imgMenu = document.getElementById("mobile-menu-images");
const newsMenu = document.getElementById("mobile-menu-news");

menuButton.addEventListener('click', function () {
    // if (!menuSlide.classList.contains("open")) {
    //     imgTriangle.classList.remove("open");
    //     imgMenu.classList.remove("open");
    //     newsTriangle.classList.remove("open");
    //     newsMenu.classList.remove("open");
    // }
    menuButton.children[0].classList.toggle("open");
    menuSlide.classList.toggle("open");
})

imgTriangle.addEventListener('click', function () {
    imgTriangle.classList.toggle("open");
    imgMenu.classList.toggle("open");
})

newsTriangle.addEventListener('click', function () {
    newsTriangle.classList.toggle("open");
    newsMenu.classList.toggle("open");
})

