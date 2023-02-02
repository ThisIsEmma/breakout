// CHALLENGE 4 - DEFINE A CLASS FOR BACKGROUND
const  backgroundColor = 'Yellow'
const number = 20;

class Background {
    color;
    height;
    width;
    constructor(color: string, height: number, width: number){
        this.color = color;
        this.height = height;
        this.width = width;
    }

    render(ctx:any) {
        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export default Background;
export {backgroundColor, number};
