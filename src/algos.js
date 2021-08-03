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

      await sleep(frameRate);
      draw(arr, [j, i]);
    }
    arr[j + 1] = key;
  }

  console.log(arr);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
