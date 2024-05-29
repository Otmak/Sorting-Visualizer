//By Otuma.
const wMax = window.innerWidth; // Window width.
let wSub = (wMax * 10)/100 // Get 10% of window width.
mainCanvas.width = wMax - wSub; // Remove 10% from window width.
mainCanvas.height = 500;
const selectedBtn = document.getElementById('algorithms');
let numberOfColumsValue = document.getElementById('rangeNumber').value;
let framesPerSecondSelected = document.getElementById('seconds-selected');

let numberOfColums = numberOfColumsValue;
let arr = [];
let obj = {};
const margin = 30;

let cols = [];
let spacing = (mainCanvas.width - margin*2)/numberOfColums;
const ctx = mainCanvas.getContext('2d');
let operations = [];
let chosenAlgorithm = '';
let isOkayToRun = false;
let framesPerSecond;


// Create array of random numbers between 0 and 1.
initiateArray();
function initiateArray(){
    for(let i=0; i<numberOfColums; i++){
        const randomNum =  Math.random()
        arr[i] = randomNum;
        obj[randomNum] = i;
    }
    paint();
    requestAnimationFrame(animate);
};


// Adjust the number of Columns.
function addColumnsToArray(){
    let text = document.getElementById('rangeValue');
    let newNumberOfColums = document.getElementById('rangeNumber').value;
    text.innerHTML = newNumberOfColums;
    numberOfColums = Number(newNumberOfColums);
    cols = [];
    arr = [];
    obj = [];
    spacing = (mainCanvas.width - margin*2)/numberOfColums;
    initiateArray();
}


// Generate Columns.
function paint(){
    operations = [];
    for(let i=0; i<arr.length; i++){
        const x = i*spacing+spacing/2 + margin;
        const y = mainCanvas.height - margin;
        const width = spacing -4;
        const height = (mainCanvas.height - margin*2)*arr[i];
        cols[i] = new Column(x,y,width,height);
    }
}


//Algorithm selection
const selectAgorithm = (arg, i) =>{
    const array = [...arg];
    const object = {
        a: bubbleSort(array),
        b: insertionSort(array),
        c: mergeSort(array),
        d: quickSort(array),
        e: heapSort(array)
    }
    console.log('RUNNING OBJECT',object[i])
    return object[i];

}


// Algorithm selection event listener.
selectedBtn.addEventListener('click', (e)=>{
    if(e.target.nodeName === 'SPAN'){
        paint();
        chosenAlgorithm = e.target.id;
        isOkayToRun = true;
    }
});


// Change the animation speed.
framesPerSecondSelected.addEventListener('change', (e)=>{
    framesPerSecond = Number(e.srcElement.value);
})


// Run the Algorithm.
function runAlgorithm(){
    // operations = []; // to pause or stop the animation when it's running
    if(isOkayToRun){
        paint();
        operations = selectAgorithm(arr, chosenAlgorithm);
        requestAnimationFrame(animate);
    }
}


//Linear interpolation.
function linearInterpolate(a, b, t){
    return a + (b - a) * t;
};


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
            framesPerSecond ? cols[i].moveTo( cols[j], framesPerSecond) : cols[i].moveTo( cols[j] );
            framesPerSecond ? cols[j].moveTo( cols[i], framesPerSecond) : cols[j].moveTo( cols[i] );
            [ cols[i], cols[j] ] = [ cols[j], cols[i] ]; //Swap
        }
    }
    if(operations.length > 0){
        isOkayToRun = false;
        requestAnimationFrame(animate);
    }else{
        isOkayToRun = true;
    }
};


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
    const mainArray = [...arg];
    const test = [...arg];
    let actions = [];

    //DIVIDE AND SORT
    function divide(array){
        if(array.length === 1){
            return array
        };
        let middle = Math.floor(array.length/2);
        let left = divide(array.slice(0, middle));
        let right = divide(array.slice(middle));
        let merged = merge(left, right);
        // console.log('Merged ====>', merged)

        return merged;
    };

    //MERGE ITEMS
    function merge (array1, array2) {
        let merged = [];
        let i = 0, j = 0;
        // console.log('Original array', test)
        // console.log('Comparing', array1[i], array2[j] )
        while (i <array1.length && j <array2.length) {
            if (array1[i] < array2[j]){
                // console.log('left is less', array1[i])
                merged.push(array1[i]);
                // actions.push({index:[ obj[ array1[i] ] , obj[ array2[j] ] ] ,swap:false})//test
                actions.push({index:[ i, j ] ,swap:false})//test
                i++;
            }else{
                // console.log('Not less need Swap', array2[i])
                // actions.push({index:[ obj[ array1[i] ] , obj[ array2[j] ] ] ,swap:true})// ..
                actions.push({index:[ i, j ] ,swap:true})// ..
                merged.push(array2[j]);
                j++;
            }
        };
        while (i <array1.length ){
            // console.log('leftover in array 1', array1[i])
            merged.push(array1[i]);
            i++;
        };
        while (j <array2.length){
            // console.log('leftover in array 2',array2[j])
            merged.push( array2[j] );
            j++;
        };
        return merged;
    };
    divide(mainArray);
    return actions;

};


// QUICK SORT.
function quickSort(arg){
    const mainArray = [...arg];
    let actions = [];

    function sort(array, left=0, right=array.length-1){
        let pivotIndex = pivot(array, left, right);
        if(left < right){
            sort(array, left, pivotIndex-1);
            sort(array, pivotIndex+1, right);
        }
        return array;
    };

    function pivot(array, pivotIndex=0, endIndex=array.length-1){
      let swapIndex = pivotIndex;
      for (let i = pivotIndex +1; i<= endIndex; i++) {
        if(array[i] < array[pivotIndex]) {
          swapIndex++;
          [array[i], array[swapIndex]] = [array[swapIndex], array[i]];
          actions.push({index:[i, swapIndex] ,swap:true});
        }else{
            actions.push({index:[i, swapIndex] ,swap:false});
        }
      }
      [array[pivotIndex], array[swapIndex]] = [array[swapIndex], array[pivotIndex]];
      actions.push({index:[pivotIndex, swapIndex] ,swap:true});
      return swapIndex;
    };
    sort(mainArray);
    return actions;
};


// HEAP SORT.
function heapSort(arg){
    const mainArray = [...arg];
    let actions = [];
    function sort(array){
        let heapSize = array.length;
        // Build heap
        for(let i = Math.floor(heapSize/2) -1; i>=0; i--){
            maxHeap(array, heapSize, i);
        };
      // Swap max element with last element
        for(let i = heapSize -1; i >0; i--){
            [array[0], array[i]] = [array[i], array[0]];
            actions.push({index:[0, i], swap:true})
            maxHeap(array, i, 0);
        };
    };

    function maxHeap(array, heapSize, i){
        let left = 2*i +1;
        let right = 2*i +2;
        let maxElement = i;
        if(left < heapSize && array[left] > array[maxElement]){
            maxElement = left;
        }
        if(right < heapSize && array[right] > array[maxElement]){
            maxElement = right;
        }
        if(maxElement != i){
            [array[i], array[maxElement]] = [array[maxElement], array[i]];
            actions.push({index: [i, maxElement], swap:true});
            maxHeap(array, heapSize, maxElement);
        }else{
            actions.push({index:[i, maxElement], swap:false})
        }
    }
    sort(mainArray);
    return actions;

};


