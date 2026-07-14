import { wrapAngle, wrapDelta } from "./util.js";
export default class Sharpener {
    constructor(game, elements) {
        this.game = game;
        this.crankArea = elements.area;
        this.crankSprite = elements.crankSprite;
        this.hole = elements.hole;
        this.crankSprites = [
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
        this.lightClicks = Array.from(
            { length: 16 },
            () => {
                const audio = new Audio("../assets/sharpener/light-click.mp3");
                audio.preload = "auto";
                audio.load();
                return audio;
            }
        );
        this.heavyClicks = Array.from(
            { length: 16 },
            () => {
                const audio = new Audio("../assets/sharpener/wood-scrape.mp3");
                audio.preload = "auto";
                audio.load();
                return audio;
            }
        );
        this.nextLightClick = 0;
        this.nextHeavyClick = 0;

        this.numFrames = this.crankSprites.length;
        this.rotationPerFrame = 360 / this.numFrames;
        this.handleRadius = 80;
        this.grabRadius = 20;

        this.centerX = 0;
        this.centerY = 0;

        this.currentAngle = 0;
        this.previousMouseAngle = 0;
        this.totalRotation = 0;
        this.rotationOnTool = 0;
        this.currentFrame = 0;
        this.clickAccumulator = 0;

        this.isGrabbed = false;
        this.insertedTool = null;

        this.handleCranking = this.handleCranking.bind(this);
        this.stopCranking = this.stopCranking.bind(this);
        this.handleHoleClick = this.handleHoleClick.bind(this);
    }

    init() {
        this.crankSprite.src = this.crankSprites[this.currentFrame];
        this.crankSprites.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        this.crankArea.addEventListener('mousedown', (event) => {
            this.attemptGrab(event);
        });
        this.hole.addEventListener('click', this.handleHoleClick);
    }

    handleHoleClick() {
        if (this.game.cursor.isRightHand()) {
            switch (this.game.cursor.state) {
                case "normal":
                    this.game.cursor.setState("pointing");
                    this.hole.addEventListener('mouseout',
                        () => this.game.cursor.setState("normal"),
                        { once: true }
                    );
                    break;
                case "pointing":
                    this.insertTool("finger");
                    // display finger in hole, pick left hand, disallow switching
                    this.game.startFingerSharpen();
                    break;
                // TODO wait for like 3 full rotations of the crank and then release the right hand
                // TODO: figure out how best to switch back to the right hand. user should have to remove it from the sharpener to see what it looks like, but i cant snap the user's cursor back to the hand for them...
                // TODO: re-allow hand switching
                // TODO: now enable user to draw directly on page without holding a tool (blood ink!)
            }

        }
    }

    insertTool(tool) {
        this.insertedTool = tool;
        this.rotationOnTool = 0;
    }

    removeTool() {
        this.insertedTool = null;
    }

    hasTool() {
        return this.insertedTool !== null;
    }

    playClick() {
        let sound;
        if (this.insertedTool) {
            sound = this.heavyClicks[this.nextHeavyClick];
            this.nextHeavyClick = (this.nextHeavyClick + 1) % this.heavyClicks.length;
        } else {
            sound = this.lightClicks[this.nextLightClick];
            this.nextLightClick = (this.nextLightClick + 1) % this.lightClicks.length;
        }
        sound.currentTime = 0;
        sound.play().catch(() => { });
    }

    // TODO: might need to add a way to get the tool ID

    getMouseAngle(mouse) {
        const xDiff = this.centerX - mouse.x;
        const yDiff = this.centerY - mouse.y;

        const angleRads = Math.atan2(yDiff, xDiff);
        const angleDegs = angleRads * (180 / Math.PI);

        return wrapAngle(angleDegs);
    }

    updateBounds() {
        const rect = this.game.screenToGameRect(this.crankArea);

        this.centerX = rect.x + rect.width / 2;
        this.centerY = rect.y + rect.height / 2;
    }

    attemptGrab(event) {
        // event is a mouse click.
        this.updateBounds();

        // convert browser mouse pos to game coords
        const mouse = this.game.getGameCoords(event);
        // check angle relative to crank center
        const curMouseAngle = this.getMouseAngle(mouse);

        // is cursor near handle?
        if (Math.abs(wrapDelta(curMouseAngle - this.currentAngle)) < 25) {
            // only left hand can crank
            if (!this.game.cursor.isRightHand()) {
                this.isGrabbed = true;
                this.previousMouseAngle = curMouseAngle;

                this.game.cursor.setState("grabbing");

                // add window listeners for movement and letting go
                window.addEventListener('mousemove', this.handleCranking);
                window.addEventListener('mouseup', this.stopCranking);
            }
        }
    }

    handleCranking(event) {
        // ignore if we're not grabber
        if (!this.isGrabbed) {
            return;
        }

        // get mouse angle and compare to previous
        const mouse = this.game.getGameCoords(event);
        const curMouseAngle = this.getMouseAngle(mouse);
        let delta = curMouseAngle - this.previousMouseAngle;
        delta = wrapDelta(delta);

        // store mouse angle
        this.previousMouseAngle = curMouseAngle;

        // update visual rotation
        this.currentAngle += delta;
        this.currentAngle = wrapAngle(this.currentAngle);

        // check if movement is clockwise
        if (delta > 0) {
            this.totalRotation += delta;
            this.rotationOnTool += delta;
            this.clickAccumulator += delta;

            if (this.clickAccumulator >= this.rotationPerFrame) {
                this.playClick();
                this.clickAccumulator -= this.rotationPerFrame;
                if (this.insertedTool) {
                    this.game.jiggleTool();
                }
            }
            if (this.insertedTool === "finger" && this.rotationOnTool >= 1080) {
                this.game.endFingerSharpen();
            }
            // TODO: check progress for sharpening and other gamestate stuff
        }
        this.updateSprite();
    }

    updateSprite() {
        const newFrame = Math.floor(this.currentAngle / this.rotationPerFrame);
        if (this.currentFrame != newFrame) {
            this.currentFrame = newFrame;
            this.crankSprite.src = this.crankSprites[this.currentFrame];
        }
    }

    stopCranking() {
        this.isGrabbed = false;
        this.game.cursor.setState("normal");
        // remove mousemove and mouseup listeners
        window.removeEventListener('mousemove', this.handleCranking);
        window.removeEventListener('mouseup', this.stopCranking);
    }
}

// pencilImg.addEventListener('click', (e) => {
//     if (cursor.classList.contains("right-hand")) {
//         cursor.classList.toggle("cursor-pointing");
//     }
// })

// TODO: bandage to stop bleeding
// TODO: window view?
// TODO: 

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