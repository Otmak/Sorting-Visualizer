// By Otuma.
class Column{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue = [];
        this.color = {
            r:159,
            g:149,
            b:173
        }
    }
    // 153,141,169.deepPurple
    //159,149,173.light

    moveTo(location, framecount=5 ){
        for(let i=0; i<=framecount; i++){
            const t = i/framecount;
            const u =  Math.sin(t*Math.PI);
            this.queue.push({
                x:linearInterpolate(this.x, location.x, t),
                y:linearInterpolate(this.y, location.y, t),
                r:linearInterpolate(159, 90, u),
                g:linearInterpolate(149, 0, u),
                b:linearInterpolate(173, 0, u)
            })
        }
    }


    draw(ctx){
        let processing = false;
        if( this.queue.length > 0 ){
            const {x,y,r,g,b} = this.queue.shift();
            this.x = x;
            this.y = y;
            this.color = {r,g,b}
            processing = true;
        }
        const left = this.x - this.width/2;
        const top = this.y - this.height;
        const right = this.x + this.width/2;
        const {r,g,b} = this.color;

        ctx.beginPath()
        ctx.fillStyle = `rgb(${r},${g},${b})`;

        ctx.moveTo(left, top);
        ctx.lineTo(left, this.y);
        ctx.ellipse(this.x, this.y, this.width/2, this.width/4, 0, Math.PI, Math.PI*2, true);

        ctx.lineTo(right,top);
        ctx.ellipse(this.x, top, this.width/2, this.width/4, 0, 0, Math.PI*2, true);

        ctx.fill();
        ctx.stroke();
        return processing;
    }
}
