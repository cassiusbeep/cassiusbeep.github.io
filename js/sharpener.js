const crankArea = document.getElementById("crank-area");
const crankSprite = document.getElementById("crank-sprite");
const pencilButton = document.getElementById("add-pencil");

const crankSprites = [
    "../assets/sharpener/crank-0.PNG",
    "../assets/sharpener/crank-1.PNG",
    "../assets/sharpener/crank-2.PNG",
    "../assets/sharpener/crank-3.PNG",
    "../assets/sharpener/crank-4.PNG",
    "../assets/sharpener/crank-5.PNG",
    "../assets/sharpener/crank-6.PNG",
    "../assets/sharpener/crank-7.PNG",
    "../assets/sharpener/crank-8.PNG",
    "../assets/sharpener/crank-9.PNG",
    "../assets/sharpener/crank-10.PNG",
    "../assets/sharpener/crank-11.PNG",
    "../assets/sharpener/crank-12.PNG",
    "../assets/sharpener/crank-13.PNG",
    "../assets/sharpener/crank-14.PNG",
    "../assets/sharpener/crank-15.PNG",
    "../assets/sharpener/crank-16.PNG",
    "../assets/sharpener/crank-17.PNG",
    "../assets/sharpener/crank-18.PNG",
    "../assets/sharpener/crank-19.PNG",
    "../assets/sharpener/crank-20.PNG",
    "../assets/sharpener/crank-21.PNG",
    "../assets/sharpener/crank-22.PNG",
    "../assets/sharpener/crank-23.PNG",
    "../assets/sharpener/crank-24.PNG",
    "../assets/sharpener/crank-25.PNG",
    "../assets/sharpener/crank-26.PNG",
    "../assets/sharpener/crank-27.PNG",
    "../assets/sharpener/crank-28.PNG",
    "../assets/sharpener/crank-29.PNG",
    "../assets/sharpener/crank-30.PNG",
    "../assets/sharpener/crank-31.PNG"
];
const NUM_FRAMES = crankSprites.length;
const ROTATION_PER_FRAME = 360 / NUM_FRAMES;
const HANDLE_RADIUS = 80;
const GRAB_RADIUS = 20;

let crankX;
let crankY;

// Get the bounding rectangle edges
let crankRect = crankArea.getBoundingClientRect();
// Calculate the center relative to the browser viewport
let centerX = crankRect.left + crankRect.width / 2;
let centerY = crankRect.top + crankRect.height / 2;

let currentAngle = 0;
let previousMouseAngle = 0;
let totalRotation = 0;
let currentFrame = 0;
let clickAccumulator = 0;
let isGrabbed = false;
let sharpenerFull = false;

// helpers to wrap angles into appropriate range
function wrapAngle(angle) {
    // convert angle to 0-360
    angle %= 360;

    if (angle < 0) {
        angle += 360;
    }

    return angle;
}

function wrapDelta(delta) {
    // convert angle DIFFERENCE into -180 to 180
    while (delta > 180) {
        delta -= 360;
    }

    while (delta <= -180) {
        delta += 360;
    }

    return delta;
}

const lightClicks = Array.from(
    { length: 16 },
    () => {
        const audio = new Audio("../assets/sharpener/light-click.mp3");
        audio.preload = "auto";
        audio.load();
        return audio;
    }
);
let nextLightClick = 0;

const heavyClicks = Array.from(
    { length: 16 },
    () => {
        const audio = new Audio("../assets/sharpener/wood-scrape.mp3");
        audio.preload = "auto";
        audio.load();
        return audio;
    }
);
let nextHeavyClick = 0;

pencilButton.addEventListener("click", () => {
    if (sharpenerFull) {
        sharpenerFull = false;
        pencilButton.textContent = "add pencil";
    } else {
        sharpenerFull = true;
        pencilButton.textContent = "remove pencil";
    }
})

function playClick() {
    let sound;

    if (sharpenerFull) {
        sound = heavyClicks[nextHeavyClick];
        nextHeavyClick = (nextHeavyClick + 1) % heavyClicks.length;
    } else {
        sound = lightClicks[nextLightClick];
        nextLightClick = (nextLightClick + 1) % lightClicks.length;
    }

    sound.currentTime = 0;

    sound.play().catch(() => { });
}

// calculate angle of mouse from crank center
function getMouseAngle(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    let xDiff = centerX - mouseX;
    let yDiff = centerY - mouseY;
    let angleRads = Math.atan2(yDiff, xDiff);
    let angleDegs = angleRads * (180 / Math.PI);
    return wrapAngle(angleDegs);
}

// double check position of sprites
function updateCrankPos() {
    crankRect = crankArea.getBoundingClientRect();
    centerX = crankRect.left + crankRect.width / 2;
    centerY = crankRect.top + crankRect.height / 2;
}

// TODO: possibly later add rotationSinceLastTick so we can add sound effects or something

// cache DOM elements, preload all sprites, set initial frame, add mouse listener to crankArea
function initCrank() {
    crankSprite.src = crankSprites[currentFrame];
    crankSprites.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    crankArea.addEventListener('mousedown', (event) => {
        // Optional: Track the very first position right as the click happens
        attemptGrab(event);
    });
}

// update crank center, calculate current knob position based on currentAngle
function attemptGrab(event) {
    // check if mouse is within certain distance range of crankArea center, and in the right range of angles
    updateCrankPos();
    const curMouseAngle = getMouseAngle(event);
    // console.log(`mouse angle = ${curMouseAngle}`);
    // console.log(`crank angle = ${currentAngle}`);

    if (Math.abs(wrapDelta(curMouseAngle - currentAngle)) < 15) {
        isGrabbed = true;
        previousMouseAngle = curMouseAngle;

        // add window listeners for movement and letting go
        window.addEventListener('mousemove', handleCranking);
        window.addEventListener('mouseup', stopCranking);
    }
}

function handleCranking(event) {
    // if not grabbed, just ignore? hopefully this shouldnt come up.
    if (!isGrabbed) {
        return;
    }

    // get mouse angle and compare to previous
    let curMouseAngle = getMouseAngle(event);
    let delta = curMouseAngle - previousMouseAngle;

    // wrap the change into -180 to 180
    delta = wrapDelta(delta);

    // update previous mouse angle
    previousMouseAngle = curMouseAngle;
    currentAngle += delta;
    currentAngle = wrapAngle(currentAngle);

    // check if movement is clockwise
    if (delta > 0) {
        totalRotation += delta;
        clickAccumulator += delta;

        if (clickAccumulator >= ROTATION_PER_FRAME) {
            playClick();
            clickAccumulator -= ROTATION_PER_FRAME;
        }
        // TODO: check progress for sharpening and other gamestate stuff
    }
    updateSprite();

}

function updateSprite() {
    if (currentFrame != Math.floor(currentAngle / ROTATION_PER_FRAME)) {
        currentFrame = Math.floor(currentAngle / ROTATION_PER_FRAME);
        crankSprite.src = crankSprites[currentFrame];
    }
}

function stopCranking() {
    isGrabbed = false;
    // remove mousemove and mouseup listeners
    window.removeEventListener('mousemove', handleCranking);
    window.removeEventListener('mouseup', stopCranking);
    // console.log(totalRotation);
}

// when mouse is within crank area and mouse is down, track rotation to move the handle
// do i care if the handle aligns with the mouse? maybe not, im not sure.
// for now ill just try and get it to register movement and mouse placement.

initCrank();

/*
gameplay flow:
maybe you press a button to switch cursors like grow my grandpa!
between left and right.
left to turn the crank
right to select an item to grab.
you can draw with the item on a page on the right half of the screen.

then you can move the item into the sharpener (its locked on y axis you can just thunk it to the left into the sharpener hole)
once the item is in you can switch back to left hand and turn the crank.
you can always remove the item with the right hand
if you click the hole with the right hand it puts your finger in
if you turn the crank it adds a bunch of blood to the shavings container
then you have like a cartoon bone or something sticking out idk
*/