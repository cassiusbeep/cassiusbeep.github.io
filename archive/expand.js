const spotlightImgs = document.getElementsByClassName("artist-spotlight")

for (const spotlightImg of spotlightImgs) {
    const expandButton = spotlightImg.children[0];
    const img = spotlightImg.children[1];
    img.addEventListener('mouseenter', function () {
        for (const bar of expandButton.children) {
            bar.classList.add("hover");
        }
    })
    img.addEventListener('mouseleave', function () {
        for (const bar of expandButton.children) {
            bar.classList.remove("hover");
        }
    })
}
