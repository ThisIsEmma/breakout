import Sprite from "./sprite";
import { Bricks, Brick, brick } from "./bricks";
import Background from "./background";
import Paddle from "./paddle";
import Ball from "./ball";


class GameLabel extends Sprite {
    font: string;
    text: string;
    align: string;
   
    constructor(x: number, y: number, text: string, font='16px Helvetica', color = '#e28743', align = 'left', width=0, height=0) {
        super(x, y, width, height, color);
        this.font = font;
        this.text = text;
        this.align = align;
        this.height = height;
        this.width = width;
    }

    render(ctx: any) {
        ctx.font = this.font;
        ctx.textAlign = this.align;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}



//variabled declaration
const canvas:any = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let dx = 2;
let dy = -2;
const ballRadius = 10;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
let availableColor = ['#abdbe3', '#063970'];
let score = 0;
let lives = 3;
const paddleWidth = 75;
let paddleX = (480 - 75) / 2;








function keyDownHandler(e:KeyboardEvent) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    };
}

function keyUpHandler(e:KeyboardEvent) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    };
}

function mouseMoveHandler(e:MouseEvent) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);

const scoreLabel = new GameLabel(10, 20, 'Score: 0');
const livesLabel = new GameLabel(canvas.width - 65, 20, 'Lives: 3');

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = buildBricks.bricks[c][r]
            if (b.status === 1) {
                if (
                    ball.x > b.x &&
                    ball.x < b.x + brickWidth &&
                    ball.y > b.y &&
                    ball.y < b.y + brickHeight
                ) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score++;
                    scoreLabel.text = 'Score: ' + score;
                    ball.color = availableColor[Math.floor(Math.random() * availableColor.length)];
                    if (score=== brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

const ball = new Ball(canvas.width / 2, canvas.height - 30, ballRadius, '#e28743');
const paddle = new Paddle(x, y, "#e28743", paddleWidth, 10);
const background = new Background("#eab676", canvas.height, canvas.width);
const buildBricks = new Bricks(3, 5);
console.log(buildBricks);
buildBricks.setup();

function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.render(ctx);
    ball.render(ctx);
    ball.move();
    paddle.render(ctx);

    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }

    
    buildBricks.render(ctx)
    scoreLabel.render(ctx);
    collisionDetection();
    livesLabel.render(ctx);
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

draw();

export {canvasHeight, canvasWidth, paddleWidth, paddleX, paddle, lives, livesLabel};