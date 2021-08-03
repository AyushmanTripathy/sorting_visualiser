const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const blockSize = 30;
let frameRate = 200;

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
};

function initSort(size, type) {
  let arr = randomNumbers(size, size - 5);
  console.log(arr);

  draw(arr, []);

  sortTypes[`${type}`](arr);

  //bubbleSort(arr);
  //mergeSort(arr, 0, arr.length - 1);
  //insertionSort(arr, arr.length);
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
  ctx.fillRect(0, 0, canvas.height, canvas.width);

  const margin = 5;
  let i = -1;
  ctx.fillStyle = "#bbb";

  arr.forEach((ele) => {
    i++;

    //draw the rect
    ctx.fillRect(i * blockSize + margin, 0, 20, blockSize * ele + 1);
  });

  //higjlighting
  hl.forEach((index) => {
    ctx.fillStyle = "red";
    ctx.fillRect(index * blockSize + margin, 0, 20, blockSize * arr[index] + 1);
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
