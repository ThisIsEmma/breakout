class Sprite {
    x: number
    y: number
    width: number
    height: number
    color: string
    constructor(x:number, y:number, width:number, height:number, color:string) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    moveTo(x:number, y:number) {
        this.x = x
        this.y = y
    }

    moveBy(dx:number, dy:number) {
        this.x += dx
        this.y += dy
    }

    render(ctx: any ) {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

export default Sprite;