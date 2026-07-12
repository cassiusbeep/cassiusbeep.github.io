const menuButton = document.getElementById("menu-button");
const menuSlide = document.getElementById("menu-slide");
const imgTrigger = document.getElementById("menu-imgs");
const newsTrigger = document.getElementById("menu-news");
const imgMenu = document.getElementById("mobile-menu-images");
const newsMenu = document.getElementById("mobile-menu-news");

menuButton.addEventListener('click', function () {
    menuButton.children[0].classList.toggle("open");
    menuSlide.classList.toggle("open");
})

imgTrigger.addEventListener('click', function () {
    imgTrigger.children[0].classList.toggle("open");
    imgMenu.classList.toggle("open");
})

newsTrigger.addEventListener('click', function () {
    newsTrigger.children[0].classList.toggle("open");
    newsMenu.classList.toggle("open");
})

// ------------- ACCESSIBILITY FEATURES ---------------

document.addEventListener('keyup', function (event) {
    if (event.key === 'Esc' || event.key === "Escape") {
        menuButton.children[0].classList.remove("open");
        menuSlide.classList.remove("open");
    }
})

menuButton.addEventListener('keypress', function (event) {
    if ((event.key === 'Space') || (event.key === 'Enter')) {
        menuButton.children[0].classList.toggle("open");
        menuSlide.classList.toggle("open");
    }
})

imgTrigger.addEventListener('keypress', function (event) {
    if ((event.key === 'Space') || (event.key === 'Enter')) {
        imgTrigger.children[0].classList.toggle("open");
        imgMenu.classList.toggle("open");
        imgMenu.children[0].focus();
    }
})
newsTrigger.addEventListener('keypress', function (event) {
    if ((event.key === 'Space') || (event.key === 'Enter')) {
        newsTrigger.children[0].classList.toggle("open");
        newsMenu.classList.toggle("open");
        newsMenuMenu.children[0].focus();
    }
})