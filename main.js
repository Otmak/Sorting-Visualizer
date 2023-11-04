//

mainCanvas.width = 500;
mainCanvas.height = 400;
const selectedBtn = document.getElementById('algorithms');

const num = 14;
const arr = [];
const obj = {};
const margin = 30;

let cols = [];
const spacing = (mainCanvas.width - margin*2)/num;
const ctx = mainCanvas.getContext('2d');
let operations = [];
let theChosenOne = '';


// Create array of random numbers between 0 and 1.
initiateArray();

function initiateArray(){

	for(let i=0; i<num; i++){
		const randomNum =  Math.random()
		arr[i] = randomNum;
		obj[randomNum] = i;
	}
	paint();
	requestAnimationFrame(animate);
};

function paint(){
	operations = [];
	for(let i=0; i<arr.length; i++){
		const x = i*spacing+spacing/2 + margin;
		const y = mainCanvas.height - margin;
		const width = spacing -4;
		const height = (mainCanvas.height - margin*2)*arr[i];
		cols[i] = new Column(x,y,width,height);// Create colums
	}
}


const selectAgorithm = (arg, i) =>{
	const dup = [...arg];
	const object = {
		a: bubbleSort(dup),
		b: insertionSort(dup),
		c: mergeSort(dup),
	}
		// 	c: mergeSort(arg),
		// d: heapSort(arg),
		// e: quickSort(arg)
	return object[i];
}


selectedBtn.addEventListener('click', (e)=>{
	if(e.target.nodeName === 'SPAN'){
		paint();
		theChosenOne = e.target.id;
	}
})


// Run the Algorithm.
function begin(){
	operations = [];
	operations = selectAgorithm(arr, theChosenOne)
	requestAnimationFrame(animate);
	// animate();
}

// TEST copy array.
// const test_Array = [...arr];
//linear interpolation
function lInterpolate(a, b, t){
	return a + (b - a) * t;
}


animate();
function animate(){
	let counter = 0;

	ctx.clearRect(0,0, mainCanvas.width, mainCanvas.height);
	let processing = false;
	for( let i=0; i<cols.length; i++ ){
		processing = cols[i].draw(ctx) || processing;
		counter++
	}

	// if undifined or something give an alert;
	if( !processing && operations.length >0 ){
		const action = operations.shift();
		const [i,j] = action.index;
		if( action.swap ){
			cols[i].moveTo( cols[j] );
			cols[j].moveTo( cols[i] );
			[ cols[i], cols[j] ] = [ cols[j], cols[i] ]; //Swap
		}
	}
	if(operations.length > 0){
		requestAnimationFrame(animate);
	}
}


/*********** Sorting algorithms *************/


// BUBBLE SORT.
function bubbleSort(arg){
	const array = [...arg];
	const actions = [];
	// let isSwapped = false;
	do{
		var isSwapped = false;
		for(let i=0; i<array.length; i++){
			let current = array[i];
			if(array[i] > array[i+1]){
				isSwapped = true;
				[ array[i], array[i+1]] = [ array[i+1], array[i]];
				actions.push({ index: [i, i+1], swap: true})
			}else{
				actions.push({ index: [i, i+1], swap: false})
			}
		}
	}while(isSwapped);
	return actions;
}


// INSERTION SORT.
function insertionSort(arg){
	const array = [...arg];
	let actions = [];
	for ( let i=1; i<array.length; i++){
		let key = array[i];
		let j = i -1;

		while ( j >=0 && array[j] > key ) { 
			array[j +1] = array[j];
			actions.push({index:[j+1, j] ,swap:true});
			j = j -1;
		}
		array[j+1] = key;
		actions.push({index:[j+1, j] ,swap:false});
	}
	return actions;
};


// MERGE SORT.
function mergeSort(arg){
	const array = [...arg];
	let actions = [];

	//DIVIDE AND SORT
	function divide(parameter){
		if(parameter.length === 1){
			return parameter
		};
		let middle = Math.floor(parameter.length/2);
		let left = divide(parameter.slice(0, middle));
		let right = divide(parameter.slice(middle));
		let merged = merge(left, right);

		return merged;
	};

	//MERGE ITEMS
	function merge (array1, array2) {
		let merged = [];
		let i = 0, j = 0;

		while (i <array1.length && j <array2.length) {
			if (array1[i] < array2[j]){
				merged.push(array1[i]);
				// actions.push({index:[ obj[ array1[i] ] , obj[ array2[j] ] ] ,swap:false})//test
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
	};
	divide(array);
	return actions;

};


// QUICK SORT.
function quickSort(arg){};

// HEAP SORT.
function heapSort(arg){};

// COUNTING SORT.
function countingSort(arg){};

// RADIX SORT
function radixSort(arg){};
