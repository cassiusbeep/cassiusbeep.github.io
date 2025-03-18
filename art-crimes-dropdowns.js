const imgDrop = document.getElementById("images-drop");
const imgSubMenu = document.getElementById("images-submenu");
const newsDrop = document.getElementById("news-drop");
const newsSubMenu = document.getElementById("news-submenu");

imgDrop.addEventListener('click', function () {
    imgDrop.children[0].classList.toggle("open");
    imgSubMenu.classList.toggle("open");
})

imgDrop.addEventListener('mouseleave', function () {
    imgDrop.children[0].classList.remove("open");
    imgSubMenu.classList.remove("open");
})

newsDrop.addEventListener('click', function () {
    newsDrop.children[0].classList.toggle("open");
    newsSubMenu.classList.toggle("open");
})

newsDrop.addEventListener('mouseleave', function () {
    newsDrop.children[0].classList.remove("open");
    newsSubMenu.classList.remove("open");
})