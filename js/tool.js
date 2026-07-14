export default class Tool {
    constructor(game, elements, color, size, shape, sharpness = 0, canDraw = false) {
        this.game = game;
        this.traySprite = elements.traySprite;
        this.heldSprite = elements.heldSprite;
        this.color = color;
        this.size = size;
        this.shape = shape;
        this.sharpness = sharpness;
        this.canDraw = canDraw;
    }

    init() { }
}