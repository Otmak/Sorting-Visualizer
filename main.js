//

mainCanvas.width = 500;
mainCanvas.height = 400;

const num = 30;
const arr = [];
const obj = {};
const margin = 30;

const cols = [];
const spacing = (mainCanvas.width - margin*2)/num;
const ctx = mainCanvas.getContext('2d');


// Create array of random numbers between 0 and 1.
for(let i=0; i<num; i++){
	const randomNum =  Math.random()
	arr[i] = randomNum;
	obj[randomNum] = i;

}

// TEST copy array.
const test_Array = [...arr];
console.log(arr)

//linear interpolation
function lInterpolate(a, b, t){
	return a + (b - a) * t;
}

// console.log(arr)
// console.log(ctx, spacing )

for(let i=0; i<arr.length; i++){

	const x = i*spacing+spacing/2 + margin;
	const y = mainCanvas.height - margin;
	const width = spacing -4;
	const height = (mainCanvas.height - margin*2)*arr[i];
	cols[i] = new Column(x,y,width,height);// Create colums
	// cols[i].draw(ctx);
	// console.log(cols[i])
}

// let operations = bubbleSort_2(arr);
// let operations = insertionSort(arr);
let operations = mergeSort(arr);


animate();

function animate(){

	ctx.clearRect(0,0, mainCanvas.width, mainCanvas.height);
	let processing = false;
	for( let i=0; i<cols.length; i++ ){
		processing = cols[i].draw(ctx) || processing;
	}
	console.log(operations)
	if( !processing && operations.length >0 ){
		const action = operations.shift();
		const [i,j] = action.index;
		if( action.swap ){
			cols[i].moveTo( cols[j] );
			cols[j].moveTo( cols[i] );
			[ cols[i], cols[j] ] = [ cols[j], cols[i] ]; //Swap
		}
	}
	requestAnimationFrame(animate);
}

/*********** Sorting algorithms *************/


// BUBBLE SORT.
function bubbleSort_2(arr){
	const operations = [];
	// let isSwapped = false;
	do{
		var isSwapped = false;
		for(let i=0; i<arr.length; i++){
			let current = arr[i];
			if(arr[i] > arr[i+1]){
				isSwapped = true;
				[ arr[i], arr[i+1]] = [ arr[i+1], arr[i]];
				operations.push({ index: [i, i+1], swap: true})
			}else{
				operations.push({ index: [i, i+1], swap: false})
			}
		}
	}while(isSwapped);
	return operations;
}


// INSERTION SORT.
function insertionSort(array){

	let operations = [];
	for ( let i=1; i<array.length; i++){
		let key = array[i];
		let j = i -1;

		while ( j >=0 && array[j] > key ) { 
			array[j +1] = array[j];
			operations.push({index:[j+1, j] ,swap:true});
			j = j -1;
		}
		array[j+1] = key;
		operations.push({index:[j+1, j] ,swap:false});
	}
	return operations;
};


// MERGE SORT.
function mergeSort(array){

	if(array.length === 1){ return array };
	let middle = Math.floor(array.length/2);
	let left = mergeSort(array.slice(0, middle));
	let right = mergeSort(array.slice(middle));

	return merge(left, right);
};

function merge (array1, array2) {
	console.log(array1, array2)
	let merged = [];
	let i = 0, j = 0;
	while (i <array1.length && j <array2.length) {
		if (array1[i] < array2[j]){
			merged.push(array1[i]);
			i++;
		}else{
			merged.push(array2[j]);
			j++;
		}
	};
	while (i <array1.length ){
		merged.push(array1[i]);
		i++;
	};
	while (j <array2.length){
		merged.push( array2[j] );
		j++;
	};
	return merged;
	// return operations;
};


// QUICK SORT
function quickSort(){};


// HEAP SORT
function heapSort(){};
