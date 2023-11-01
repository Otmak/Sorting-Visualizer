console.log('column online')

class Column{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.queue = [];

	}

	moveTo(location, framecount=5 ){ //assign the moving values to queue
		for(let i=0; i<=framecount; i++){
			const t = i/framecount;
			this.queue.push({
				x:lInterpolate(this.x, location.x, t),
				y:lInterpolate(this.y, location.y, t)
			})
		}
	}

	draw(ctx){

		let processing = false;
		if( this.queue.length > 0 ){
	
			const {x,y} = this.queue.shift();
			this.x = x;
			this.y = y;
			processing = true;
			
		}
		// console.log(ctx, 'LOGGING')
		const left = this.x - this.width/2;
		const top = this.y - this.height;
		const right = this.x + this.width/2

		ctx.beginPath()
		ctx.fillStyle = "rgb(150,150,150"; //color

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
