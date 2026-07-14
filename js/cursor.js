import Tool from "./tool.js";

export default class Cursor {
    constructor(game, element) {
        this.cursorSprites = [
            "../assets/sharpener/left-hand.png",
            "../assets/sharpener/left-grab.png",
            "../assets/sharpener/left-point.png"
        ];
        this.game = game;
        this.element = element;
        this.hand = "left";
        this.state = "normal";
        this.heldItem = null;
        this.tool = new Tool(this.game, { traySprite: null, heldSprite: null }, "red", "2", "round", 3, true);
        this.canDraw = false;
        this.x;
        this.y;
    }

    init() {
        this.cursorSprites.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    isRightHand() {
        return this.hand === "right";
    }

    bindEvents() {
        window.addEventListener(
            "mousemove",
            this.updatePosition.bind(this)
        );
    }

    updatePosition(event) {
        this.element.style.left = `${event.clientX}px`;
        this.element.style.top = `${event.clientY}px`;
        this.x = event.clientX;
        this.y = event.clientY;
    }

    getCoords() {
        return { x: this.x, y: this.y }
    }

    toggleHand() {
        this.hand =
            this.hand === "left"
                ? "right"
                : "left";

        this.element.classList.toggle("right-hand");
        this.setState("normal");
    }

    setState(state) {
        this.element.classList.remove(
            "cursor-pointing",
            "cursor-grabbing"
            // never get rid of "cursor-bloody" which is added in game.endFingerSharpen()
        );

        if (state !== "normal") {
            this.element.classList.add(
                `cursor-${state}`
            );
        }
        this.state = state;

        if (this.hand == "right" && this.canDraw) {
            this.game.selectDrawingTool(this.tool);
        } else {
            this.game.selectDrawingTool(null);
        }
    }

    setCanDraw(canDraw) {
        this.canDraw = canDraw;
    }
}