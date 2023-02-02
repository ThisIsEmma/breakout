// CLASS FOR PADDLE 

//let paddleX = (480 - 75) / 2;
import { paddleX } from "./main";
export default class Paddle {
    x: number;
    y: number;
    color: string;
    width: number;
    height: number;
    constructor(x:number, y:number, color:string, width:number, heigth:number) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = heigth;
    }

    render(ctx:any) {
        ctx.beginPath();
        ctx.rect(paddleX, 320- this.height, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
