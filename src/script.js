const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const blockSize = 8;
const margin = 1;
const arrSize = 185;
const height = 95;
let running = false;
let frameRate = 50;

const sortTypes = {
  bubble: (arr) => {
    bubbleSort(arr);
  },
  insertion: (arr) => {
    insertionSort(arr, arr.length);
  },
  merge: (arr) => {
    mergeSort(arr, 0, arr.length - 1);
  },
  quick: (arr) => {
    quickSort(arr, 0, arr.length - 1);
  },
  heap: (arr) => {
    heapSort(arr);
  },
  selection: (arr) => {
    selectionSort(arr, arr.length);
  },
};

start();

function start() {
  running = true;
  const type = document.getElementById("sortType").value;
  initSort(arrSize, type);
}

function stop() {
  running = false;
}

function initSort(size, type) {
  let arr = randomNumbers(size, height);
  console.log(arr);

  draw(arr, []);

  try {
    sortTypes[`${type}`](arr);
  } catch (error) {
    console.error(error);
  }
}

function randomNumbers(size, heightCap) {
  let arr = new Array(size);

  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(Math.random() * heightCap);
  }

  return arr;
}

function draw(arr, hl) {
  //reset
  ctx.fillStyle = "#202124";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let i = -1;
  ctx.fillStyle = "#bbb";

  arr.forEach((ele) => {
    i++;

    //draw the rect
    ctx.fillRect(i * blockSize, 0, blockSize - margin, blockSize * ele + 1);
  });

  //higjlighting
  hl.forEach((index) => {
    ctx.fillStyle = "red";
    ctx.fillRect(
      index * blockSize,
      0,
      blockSize - margin,
      blockSize * arr[index] + 1
    );
    //  base size of block , marign , y movement , width , hieght
  });
}

function showOptions() {
  console.log("showing");

  document.getElementById("options-wrapper").style.display = "flex";
  document.getElementById("showLessButton").style.display = "block";
  document.getElementById("showMoreButton").style.display = "none";
}

function hideOptions() {
  console.log("hiding");

  document.getElementById("options-wrapper").style.display = "none";
  document.getElementById("showLessButton").style.display = "none";
  document.getElementById("showMoreButton").style.display = "block";
}

function changeFrameRate(value) {
  frameRate = value * 10;
}
