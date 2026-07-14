export default class Notebook {
    constructor(game, elements) {
        this.game = game;
        this.book = elements.book;
        this.canvas = elements.canvas;
        this.rect;
        this.ctx;
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.startDrawing = this.startDrawing.bind(this);
        this.draw = this.draw.bind(this);
        this.stopDrawing = this.stopDrawing.bind(this);
        this.bloodDropInterval = null;
        this.bloodDropChance = 0.25;
    }

    init() {
        this.rect = this.canvas.getBoundingClientRect();
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 1;

        this.canvas.addEventListener(
            "mouseenter",
            () => this.handleMouseEnter()
        );

        this.canvas.addEventListener(
            "mouseleave",
            () => this.handleMouseLeave()
        );
    }

    screenToCanvas(event) {
        this.updateBounds();
        return {
            x: Math.floor(
                (event.clientX - this.rect.left) *
                this.canvas.width /
                this.rect.width
            ),

            y: Math.floor(
                (event.clientY - this.rect.top) *
                this.canvas.height /
                this.rect.height
            )
        };
    }

    isInsidePage(event) {
        const point = this.screenToCanvas(event);
        return (
            point.x >= 0 &&
            point.x < this.canvas.width &&
            point.y >= 0 &&
            point.y < this.canvas.height
        );
    }

    updateBounds() {
        this.rect = this.canvas.getBoundingClientRect();
    }

    startDrawing(event) {
        if (!this.game.drawingTool) {
            return;
        }
        if (!this.game.drawingTool.canDraw) {
            return;
        }

        this.isDrawing = true;

        this.canvas.addEventListener("mousemove",
            this.draw
        );

        window.addEventListener("mouseup",
            this.stopDrawing
        )

        const coords = this.screenToCanvas(event);
        this.lastX = coords.x;
        this.lastY = coords.y;

        // todo: add ctx details (style, color, size) based on tool info.
        this.ctx.strokeStyle = this.game.drawingTool.color;
        this.ctx.lineWidth = this.game.drawingTool.size;
    }

    draw(event) {
        if (!this.isDrawing) return;

        const coords = this.screenToCanvas(event);

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(coords.x, coords.y);
        this.ctx.stroke();

        this.lastX = coords.x;
        this.lastY = coords.y;
    }

    handleMouseEnter() {
        if (this.game.cursor.canDraw) {
            if (!this.game.cursor.heldItem) {
                this.game.cursor.setState("pointing");
            }
            this.startBloodDrops();
        }
    }

    handleMouseLeave() {
        if (!this.isDrawing) {
            this.game.cursor.setState("normal");
        }
        this.stopBloodDrops();
    }

    stopDrawing(event) {
        this.isDrawing = false;

        if (!this.isInsidePage(event)) {
            this.game.cursor.setState("normal");
        }

        this.canvas.removeEventListener(
            "mousemove",
            this.draw
        );

        window.removeEventListener(
            "mouseup",
            this.stopDrawing
        );
    }

    inkDrop(event, color, size) {
        const point = this.screenToCanvas(event);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(point.x, point.y, size, size);
    }

    startBloodDrops() {
        if (this.bloodDropInterval) {
            return; // already running
        }

        this.bloodDropInterval = setInterval(() => {
            this.tryBloodDrop();
        }, 500)
    }

    stopBloodDrops() {
        if (this.bloodDropInterval) {
            clearInterval(this.bloodDropInterval);
            this.bloodDropInterval = null;
        }
    }

    tryBloodDrop() {
        if (!this.game.fingerBloodied) {
            return;
        }

        if (Math.random() > this.bloodDropChance) {
            return;
        }

        const bloodColors = ["#420000", "#99180f", "#c40000"];
        const bloodColor = bloodColors[Math.floor(Math.random() * bloodColors.length)];
        this.inkDrop({ clientX: this.game.cursor.x, clientY: this.game.cursor.y }, bloodColor, Math.floor(Math.random() * 3));
    }

    clear() { }
}