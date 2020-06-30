function generateRandom(start, end) {
  return Math.ceil(start - 0.5 + Math.random() * (end - start + 1));
}

const random = generateRandom.bind(null, 1, 100);

console.log(insertionSort(new Array(20).fill(0).map(random)));
console.log(quickSort(new Array(20).fill(0).map(random)));
console.log(mergeSort(new Array(20).fill(0).map(random)));
console.log(heapSort(new Array(20).fill(0).map(random)))

function insertionSort(array) {
  for(let i = 1, len = array.length; i < len; i++) {
    const elem = array[i];
    let j = i;
    for (; j > 0 && array[j - 1] > elem; j--) {
      [array[j], array[j - 1]] = [array[j - 1], array[j]];
    }

    array[j] = elem;
  }
  return array;
}

function quickSort(array, left = 0, right = array.length - 1) {
  if (left >= right) return array;
  // 中位基准值移动到尾部
  dealPivot(array, left, right);
  // 根据基准值分段
  const pivot = partition(array, left, right);
  quickSort(array, left, pivot - 1);
  quickSort(array, pivot + 1, right);
  return array;
}

function dealPivot (array, left, right) {
  const mid = Math.floor((left + right) / 2);
  if (array[left] > array[mid]) [array[mid], array[left]] = [array[left], array[mid]];
  if (array[left] > array[right]) [array[right], array[left]] = [array[left], array[right]];
  if (array[mid] > array[right]) [array[right], array[mid]] = [array[mid], array[right]];
  [array[mid], array[right - 1]] = [array[right - 1], array[mid]];
}

function partition (array, left, right) {
  const pivot = array[right - 1];
  let i = left;
  let j = right - 1;
  while (true) {
    while(array[++i] < pivot) {}
    while(array[--j] > pivot) if (j === left) break;
  
    if (i >= j) break;
    [array[i], array[j]] = [array[j], array[i]];
  }
  if (i < right) {
    [array[i], array[right - 1]] = [array[right - 1], array[i]]
  }
  return i;
}


function mergeSort(array) {
  if (array.length < 2) return array;
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));
  return merge(left, right);
}

function merge (left, right) {
  const leftLength = left.length;
  const rightLength = right.length;

  const result = [];

  let i = 0;
  let j = 0;
  while(i < leftLength && j < rightLength) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  for (; i < leftLength; i++) {
    result.push(left[i]);
  }
  for (; j < rightLength; j++) {
    result.push(right[j]);
  }

  return result;
}

function heapSort (array) {
  let N = array.length;
  // 小数下沉构成堆
  for (let k = Math.floor(N / 2) - 1; k >= 0; k--) sink(array, k, N);
  // 小数移到顶部下沉
  while(N > 0) {
    --N;
    [array[0], array[N]] = [array[N], array[0]];
    sink(array, 0, N);
  }
  return array;
}

function sink (array, k, N) {
  // k - root
  // N - length
  while (2 * k + 1 < N) {
    let j = 2 * k + 1;
    if (j + 1 < N && array[j] < array[j + 1]) j++;
    if (array[k] >= array[j]) break;
    [array[k], array[j]] = [array[j], array[k]];
    k = j;
  }
}