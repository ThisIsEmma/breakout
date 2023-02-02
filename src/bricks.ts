import Sprite from "./sprite";

let x = 480/ 2;
let y = 320 - 30;
const brickWidth = 75;
const brickHeight = 20;

//interface to type brick array
interface brick { 
    x: number, 
    y: number, 
    status:number 
}


// CLASS FOR SINGLE BRICK
export default class Brick extends Sprite {
    status: number;
    dx: number;
    dy: number;
    constructor(x:number, y:number, width:number, height:number, color:string) {
        super(x, y, width, height, color);
        this.color = color;
        this.width = width;
        this.height = height;
        this.status = 1;
        this.dx = 2;
        this.dy = -2;
    }
}

// CLASS FOR MULTIPLE BRICK
class Bricks {
    rows: number;
    cols: number;
    bricks: Brick[][];
    constructor(rows = 3, cols = 5) {
        this.rows = rows
        this.cols = cols
        this.bricks = []
        this.setup()
    }

    setup() {
        for (let c = 0; c < this.cols; c += 1) {
            this.bricks[c] = [];
            for (let r = 0; r < this.rows; r += 1) {
                const brick = new Brick(x, y, brickWidth, brickHeight, "#fbdaa4");
                brick.x = (c * (brick.width + 10)) + 30;
                brick.y = (r * (brick.height + 10)) + 30;
                this.bricks[c][r] = brick;
            }
        }
    }

    render(ctx:any) {
        for (let c = 0; c < this.cols; c += 1) {
            for (let r = 0; r < this.rows; r += 1) {
                if (this.bricks[c][r].status === 1) {
                    this.bricks[c][r].render(ctx);
                }
            }
        }
    }
}

export {brick, Brick, Bricks};