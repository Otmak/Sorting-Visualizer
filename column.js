console.log('column online')

class Column{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

	}

	draw(ctx){
		// console.log(ctx, 'LOGGING')
		const left = this.x - this.width/2;
		const top = this.y - this.height;
		const right = this.x + this.width/2

		ctx.beginPath()
		ctx.fillStyle = "rgb(150,150,150"; //color

		ctx.moveTo(left, top);
		ctx.lineTo(left, this.y);
		ctx.ellipse(this.x, this.y, this.width/2, this.width/4,0, Math.PI, Math.PI*2, true);
		ctx.lineTo(right,top);
		ctx.ellipse(this.x, top, this.width/2, this.width/4,0,0, Math.PI*2, true);

		ctx.fill();
		ctx.stroke();
	}
}

const test_data = [0.02834765439424025, 0.8183881553877881, 0.09936735764563775, 0.7668273508305186, 0.2683846473416487, 0.7575406139157632, 0.5916076983142846, 0.8490645362796045, 0.31259919617416276, 0.4348695157260942, 0.7247660788111807, 0.6562734240874126, 0.9575548044695865, 0.6970626038116183, 0.7319716197428108, 0.5586451916380464, 0.6539324014614021, 0.058825153574591615, 0.4102331108341193, 0.6809742191658419, 0.8285101741931249, 0.0028626299295688717, 0.5611391491331559]


console.log('BEGIN sorting',test_data);
let isSwapped = false;
for (let i=0; i<test_data.length; i++){

	isSwapped = false;
	for(let j=0; j<test_data.length; j++){

		if(test_data[j] > test_data[j+1]){
			let current = test_data[j];
			test_data[j] = test_data[j+1];
			test_data[j+1] = current;
			isSwapped = true;

		}
	}
	if(!isSwapped){
		break;
	}

}
console.log('DONE SORTING', test_data)
