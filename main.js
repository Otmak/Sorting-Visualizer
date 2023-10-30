//

mainCanvas.width = 500;
mainCanvas.height = 400;

const num = 23;
const arr = [];
const margin = 20;

const cols = [];
const spacing = (mainCanvas.width - margin*2)/num;
const ctx = mainCanvas.getContext('2d');


// Create array of random numbers between 0 and 1.
for(let i=0; i<num; i++){
	arr[i] = Math.random();
}

//interpolation
function interpolate(a, b, t){
	return a + (b - a) * t;
}

// console.log(arr)
console.log(ctx, spacing )

for(let i=0; i<arr.length; i++){
	// console.log(arr[i])

	const x = i*spacing+spacing/2 + margin;
	const y = mainCanvas.height - margin;
	const width = spacing -4;
	const height = (mainCanvas.height - margin*2)*arr[i];

	cols[i] = new Column(x,y,width,height);
	// cols[i].draw(ctx);
	// console.log(cols[i])

}

animate();

function animate(){

	// ctx.clearRect(0,0, mainCanvas.width, mainCanvas.height);
	for(let i=0; i<cols.length; i++){
		cols[i].draw(ctx);
	}
	requestAnimationFrame(animate);
}

/*********** Sorting algorithms *************/

function bubbleSort(arr){

	let isSwapped = false;
	for(let i=0; i<arr.length; i++){

		isSwapped = true;
		for(let j=0; j<arr.length; j++){
			let current = arr[j];

			// Check if currrent index > index +1
			if(arr[j] > arr[j+1]){
				arr[j] = arr[j+1];
				arr[j+1] = current;
				isSwapped = true;
			}
		}
		// If swapped is false, break.
		if(!isSwapped){
			break;
		}
	}

}



