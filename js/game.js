import Sharpener from "./sharpener.js";
import Cursor from "./cursor.js";
import Tool from "./tool.js";
import Notebook from "./notebook.js";

export default class Game {
    constructor() {
        this.element = document.getElementById("game");
        this.cursorElement = document.getElementById("custom-cursor");
        this.cursor = new Cursor(this, this.cursorElement);
        this.sharpener = new Sharpener(
            this,
            {
                area: document.getElementById("crank-area"),
                crankSprite: document.getElementById("crank-sprite"),
                hole: document.getElementById("sharp-hole")
            });
        this.finger = document.getElementById("secret");
        this.fingerBloodied = false;
        this.sharpenerBody = document.getElementById("sharp-back");
        this.notebook = new Notebook(this,
            {
                book: document.getElementById("notebook"),
                canvas: document.getElementById("notebook-canvas")
            }
        );
        // this.tray = new Tray(this);

        this.scale = 1;
        this.gameState = "default";
        this.allowHandSwitch = true;
        this.sharpeningTool = null;
        this.drawingTool = null;
    }

    init() {
        this.cursor.init();
        this.cursor.bindEvents();
        this.sharpener.init();
        this.notebook.init();
        // this.tray.init();

        this.resize();

        window.addEventListener("resize", () => this.resize());

        window.addEventListener(
            "keypress",
            this.handleSpaceKey.bind(this)
        );

        this.notebook.book.addEventListener(
            "mousedown",
            this.tryDrawing.bind(this)
        )
    }

    handleSpaceKey(event) {
        if (event.code === "Space") {
            event.preventDefault();
            if (this.allowHandSwitch) {
                this.requestHandSwitch();
            }
        }
    }

    resize() {
        // change game size
        this.scale = Math.min(
            1,
            window.innerWidth / 800,
            window.innerHeight / 600
        );

        const scaledWidth = 800 * this.scale;
        const scaledHeight = 600 * this.scale;

        const offsetX = (window.innerWidth - scaledWidth) / 2;
        const offsetY = (window.innerHeight - scaledHeight) / 2;

        this.element.style.transform =
            `translate(${offsetX}px, ${offsetY}px) scale(${this.scale})`;

        // this.cursor.updateBounds();
        this.sharpener.updateBounds();
        this.notebook.updateBounds();
        // this.tray.updateBounds();
    }

    getGameCoords(event) {
        const rect = game.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) / this.scale,
            y: (event.clientY - rect.top) / this.scale
        };
    }

    screenToGameRect(element) {
        const gameRect = this.element.getBoundingClientRect();
        const rect = element.getBoundingClientRect();

        return {
            x: (rect.left - gameRect.left) / this.scale,
            y: (rect.top - gameRect.top) / this.scale,
            width: rect.width / this.scale,
            height: rect.height / this.scale
        };
    }

    cancelInteraction() {
        this.sharpener.stopCranking();
    }

    // setGameState(state) {
    //     // TODO: state machine type thing here
    // }

    requestHandSwitch() {
        if (this.gameState === "fingerInserted") {
            this.finger.classList.remove("showing");
            this.sharpeningTool = null;
            this.gameState = "default";
            this.sharpener.removeTool();
        }
        this.cursor.toggleHand();
        this.cancelInteraction();
    }

    toggleHandSwitch() {
        this.allowHandSwitch = !this.allowHandSwitch;
    }

    selectDrawingTool(tool) {
        this.drawingTool = tool;
    }

    startFingerSharpen() {
        // display static finger sprite
        this.finger.classList.add("showing");
        // toggle cursor to left hand
        this.requestHandSwitch();
        // disallow hand switching
        this.toggleHandSwitch();
        this.gameState = "fingerInserted";
        this.sharpeningTool = this.finger;
    }

    jiggleTool() {
        if (this.sharpeningTool) {
            this.sharpeningTool.classList.add('jiggling');
            this.sharpeningTool.addEventListener('animationend', () => {
                this.sharpeningTool.classList.remove('jiggling');
            }, { once: true });
        }
    }

    endFingerSharpen() {
        this.toggleHandSwitch();
        this.sharpenerBody.src = "../assets/sharpener/sharpener-body-back-bloody.png";
        this.cursor.element.classList.add("cursor-bloody");
        this.cursor.setCanDraw(true);
        this.fingerBloodied = true;
    }

    tryDrawing(event) {
        // TODO: add more tool logic here later
        this.notebook.startDrawing(event);
    }

    // TODO: need to keep track of cursor status to update class list in Cursor object
}