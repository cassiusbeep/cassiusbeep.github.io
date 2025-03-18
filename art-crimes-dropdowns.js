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

// ------------- ACCESSIBILITY FEATURES ---------------

imgDrop.addEventListener('keypress', function (event) {
    if ((event.key === 'Space') || (event.key === 'Enter')) {
        imgDrop.children[0].classList.add("open");
        imgSubMenu.classList.add("open");
        imgSubMenu.children[0].focus();
    }
})

imgSubMenu.addEventListener('blur', function () {
    imgDrop.children[0].classList.remove("open");
    imgSubMenu.classList.remove("open");
    console.log("blurring!");
})

newsDrop.addEventListener('keypress', function (event) {
    if ((event.key === 'Space') || (event.key === 'Enter')) {
        newsDrop.children[0].classList.toggle("open");
        newsSubMenu.classList.toggle("open");
        newsSubMenu.children[0].focus();
    }
})

newsSubMenu.addEventListener('blur', function () {
    newsDrop.children[0].classList.remove("open");
    newsSubMenu.classList.remove("open");
    console.log("blurring!");
})