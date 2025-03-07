document.getElementById("blunts").addEventListener("dragstart", function (e) {
    var img = document.createElement("img");
    img.src = "assets/personas/draggable_blunts.png";
    e.dataTransfer.setDragImage(img, 100, 50);
}, false);