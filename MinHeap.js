class MinHeap {
  _heap = [null];

  init(values) {
    for (const num of values) {
      this.insert(num);
    }
  }

  insert(num) {
    this._heap.push(num);

    const lastIndex = this._heap.length - 1;
    this._bubbleUp(lastIndex);
  }

  extractSmallest() {
    const rootIndex = 1,
      lastIndex = this._heap.length - 1,
      smallest = this._heap[rootIndex],
      largest = this._heap[lastIndex];

    this._heap[rootIndex] = largest;
    this._heap.pop();

    this._bubbleDown(rootIndex);

    return smallest;
  }

  size() {
    return this._heap.length - 1;
  }

  sort() {
    const sortedArr = [];

    while (this._heap.length > 1) {
      const minVal = this.extractSmallest();
      sortedArr.push(minVal);
    }

    return sortedArr;
  }

  _bubbleUp(currentNodeIndex) {
    while (!this._isRoot(currentNodeIndex)) {
      const parentIndex = this._getParentIndex(currentNodeIndex),
        currentNode = this._heap[currentNodeIndex],
        parentNode = this._heap[parentIndex];

      if (currentNode >= parentNode) break;

      [this._heap[currentNodeIndex], this._heap[parentIndex]] = [parentNode, currentNode];

      currentNodeIndex = parentIndex;
    }
  }

  _bubbleDown(currentNodeIndex) {
    while (!this._isLeaf(currentNodeIndex)) {
      const leftChildIndex = this._getLeftChildIndex(currentNodeIndex),
        rightChildIndex = this._getRightChildIndex(currentNodeIndex),
        leftChild = this._heap[leftChildIndex],
        rightChild = this._heap[rightChildIndex],
        currentNode = this._heap[currentNodeIndex];

      if (
        (currentNode <= leftChild && currentNode <= rightChild) ||
        (currentNode <= leftChild && rightChild === undefined)
      )
        break;

      if (leftChild <= rightChild || rightChild === undefined) {
        [this._heap[leftChildIndex], this._heap[currentNodeIndex]] = [currentNode, leftChild];
        currentNodeIndex = leftChildIndex;
      } else {
        [this._heap[rightChildIndex], this._heap[currentNodeIndex]] = [currentNode, rightChild];
        currentNodeIndex = rightChildIndex;
      }
    }
  }

  _isLeaf(currentNodeIndex) {
    const leftChildIndex = this._getLeftChildIndex(currentNodeIndex),
      rightChildIndex = this._getRightChildIndex(currentNodeIndex),
      leftChild = this._heap[leftChildIndex],
      rightChild = this._heap[rightChildIndex];

    return leftChild === undefined && rightChild === undefined;
  }

  _isRoot(currentNodeIndex) {
    currentNodeIndex === 1;
  }

  _getLeftChildIndex(currentNodeIndex) {
    return currentNodeIndex * 2;
  }

  _getRightChildIndex(currentNodeIndex) {
    return currentNodeIndex * 2 + 1;
  }

  _getParentIndex(currentNodeIndex) {
    return Math.floor(currentNodeIndex / 2);
  }
}

const heap = new MinHeap();

heap.init([1, 4, 3, 7, 9, 4, 4, 7]);

heap.insert(10);
heap.insert(2);
heap.insert(8);

console.log('HEAP SORT --->>>', heap.sort());
console.log('CURRENT HEAP --->>>', heap._heap);
console.log('EXTRACT SMALLEST --->>>', heap.extractSmallest());
console.log('HEAP SORT --->>>', heap.sort());
console.log('EXTRACT SMALLEST --->>>', heap.extractSmallest());
console.log('CURRENT HEAP --->>>', heap._heap);
