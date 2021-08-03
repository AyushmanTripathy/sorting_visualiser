async function bubbleSort(arr) {
  let time = 0;

  for (let i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j] > arr[j + 1]) {
        // If the condition is true then swap them
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }

      //draw the canvas
      if (!running) return;
      await sleep(frameRate);
      draw(arr, [j, i]);
    }
  }
  console.log("done");
}

async function merge(arr, l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;

  // Create temp arrays
  let L = new Array(n1);
  let R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) L[i] = arr[l + i];
  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = l;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
async function mergeSort(arr, l, r) {
  if (l >= r) {
    return; //returns recursively
  }

  if (!running) return;
  let m = l + parseInt((r - l) / 2);

  await mergeSort(arr, l, m);
  await sleep(frameRate);
  draw(arr, [l, r]);

  await mergeSort(arr, m + 1, r);
  await sleep(frameRate);
  draw(arr, [l, r]);

  await merge(arr, l, m, r);
  await sleep(frameRate);
  draw(arr, [l, r]);

  console.log(arr);
}

//insertion
async function insertionSort(arr, n) {
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;

    /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;

      if (!running) return;
      await sleep(frameRate);
      draw(arr, [j, i]);
    }
    arr[j + 1] = key;
  }
  console.log(arr);
}

function swap(items, leftIndex, rightIndex) {
  let temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

async function partition(items, left, right) {
  let pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
    await sleep(frameRate);
    draw(items, [j, i]);
  }
  if (!running) return;
  return i;
}

async function quickSort(items, left, right) {
  let index;
  if (!running) return;
  if (items.length > 1) {
    await sleep(frameRate);
    draw(items, [left, right]);

    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right);
    }
  }

  if (!running) return;
  console.log(items);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
