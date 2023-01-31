import Sprite from "./sprite";

class GameLabel extends Sprite {
    constructor(x, y, text, font='16px Helvetica', color = 'red', align = 'left') {
        // call super with properties as you would initialize sprite
        super(x, y, color='red')
        // define the new properties here on this: this.text and this.font
        this.font = font;
        //this.width = 0;
        this.text = text;
        this.align = align;
    }

    render(ctx) {
        // Add the code here to draw your text label
        // set the font: with ctx.font = this.font
        // Align the text with ctx.textAlign = this.align
        // ...
        ctx.font = this.font;
        ctx.textAlign = this.align;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}



//variabled declaration
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let ballColor = 'black';
let availableColor = ['red', 'green'];
let score = 0;
let lives = 3;

// CHALLENGE 4 - DEFINE A CLASS FOR BACKGROUND
class Background {
    constructor(color, height, width){
        this.color = color;
        this.height = height;
        this.width = width;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// CHALLENGE 5 - DEFINE A CLASS FOR SCORE

class Score {
    constructor(x, y, color, score, font) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.score = score;
        this.font = font;
    }

    render(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(`Score: ${this.score}`, 8, 20);
    }

    update(points){
        this.score += points;
    }

    reset() {
        this.score = 0;
    }
}




const livesLabel = new GameLabel(canvas.width - 65, 20, 'Lives: 3');

// DEFINE A CLASS FOR BALL, INHERITS SPRITE CLASS 
class Ball extends Sprite{
    constructor(x, y, radius, color) {
        super(x, y, radius * 2, radius * 2, color)

        this.radius = radius;
        this.dx = 2
        this.dy = -2
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > canvas.height - this.radius) {
            if (this.x > paddleX && this.x < paddleX + paddleWidth) {
                this.dy = -this.dy * 1.25;  //Made the ball move faster after hitting the paddle
            } else {
                lives--;
                livesLabel.text = 'Lives: ' + lives;
                if (!lives) {
                    alert("GAME OVER, NO MORE LIVES");
                    document.location.reload();
                } else {
                    this.x = canvas.width / 2;
                    this.y = canvas.height - 30;
                    this.dx = 2;
                    this.dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }
    }
}

let bricksArr = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricksArr[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricksArr[c][r] = { x: 0, y: 0, status: 1 };
    }
}
// DEFINE A CLASS FOR BRICK INHERITS SPRITE CLASS
class Brick extends Sprite {
    constructor(x, y, width, height,color) {
        super(x, y, width, height, color);
        this.color = color;
        this.width = width;
        this.height = height;
        this.status = 1;
        this.dx = 2;
        this.dy = -2;
    }

    render(ctx) {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricksArr[c][r].status === 1) {
                    const brickX = c * (this.width + brickPadding) + brickOffsetLeft;
                    const brickY = r * (this.height + brickPadding) + brickOffsetTop;
                    bricksArr[c][r].x = brickX;
                    bricksArr[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.width, this.height);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
        
    }
}

class Bricks {
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
                const brick = new Brick(x, y, brickWidth, brickHeight, "white");
                brick.x = (c * (brick.width + 10)) + 30;
                brick.y = (r * (brick.height + 10)) + 30;
                this.bricks[c][r] = brick;
            }
        }
    }

    render(ctx) {
        for (let c = 0; c < this.cols; c += 1) {
            for (let r = 0; r < this.rows; r += 1) {
                if (this.bricks[c][r].status === 1) {
                    this.bricks[c][r].render(ctx);
                }
            }
        }
    }
}

// CLASS FOR PADDLE 
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

class Paddle {
    constructor(x, y, color, width, heigth) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = heigth;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    };
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    };
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);

const scoreLabel = new GameLabel(10, 20, 'Score: 0');


function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricksArr[c][r];
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

const ball = new Ball(canvas.width / 2, canvas.height - 30, ballRadius, 'orange');
const paddle = new Paddle(x, y, "#0095DD", paddleWidth, paddleHeight);
const background = new Background("gray", canvas.height, canvas.width);
const buildBricks = new Bricks(3, 5);
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