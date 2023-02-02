import Sprite from "./sprite";
import { canvasHeight, canvasWidth, paddleX, livesLabel, paddleWidth } from "./main";


// DEFINE A CLASS FOR BALL, INHERITS SPRITE CLASS 

let lives = 3
//let paddleX = (480 - 75) / 2

export default class Ball extends Sprite{
    radius: number;
    dx: number;
    dy: number;
    constructor(x:number, y:number, radius:number, color:string) {
        super(x, y, radius * 2, radius * 2, color)

        this.radius = radius;
        this.dx = 2
        this.dy = -2
    }

    render(ctx:any) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.dx > canvasWidth - this.radius || this.x + this.dx < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > canvasHeight - this.radius) {
            if (this.x > paddleX && this.x < paddleX + paddleWidth) {
                this.dy = -this.dy * 1.25;  //Made the ball move faster after hitting the paddle
            } else {
                lives--;
                livesLabel.text = 'Lives: ' + lives;
                if (!lives) {
                    alert("GAME OVER, NO MORE LIVES");
                    document.location.reload();
                } else {
                    this.x = canvasWidth / 2;
                    this.y = canvasHeight - 30;
                    this.dx = 2;
                    this.dy = -2;
                }
            }
        }
    }
}