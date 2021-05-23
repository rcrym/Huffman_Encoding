/**
 * Heap
 * Implemented by Rileyc2022
 */
module.exports = class Heap {
    HuffmanNode = class {
        constructor() {
            this.freq, this.char, this.left, this.right;
        }
    };

    constructor() {
        this.heap = [];
    }

    getMin() {
        return this.heap[0];
    }
    size() {
        return this.heap.length;
    }
    add(node) {
        // add node to heap
        this.heap.push(node);
        // if heap now has more than one node
        if (this.heap.length > 0) {
            // index of current node
            let current = this.heap.length - 1;
            // while the current index is greater that 0 and the current node value is less than its parent's
            while (
                current > 0 &&
                this.heap[Math.floor((current - 1) / 2)].freq > this.heap[current].freq
            ) {
                // swap
                let tmp = this.heap[Math.floor((current - 1) / 2)];
                this.heap[Math.floor((current - 1) / 2)] = this.heap[current];
                this.heap[current] = tmp;
                // current index becomes where the current node went
                current = Math.floor((current - 1) / 2);
            }
        }
    }
    remove() {
        if (this.heap.length > 0) {
            // switch root with last
            let tmp = this.heap[0];
            this.heap[0] = this.heap[this.heap.length - 1];
            this.heap[this.heap.length - 1] = tmp;
            // pop root
            this.heap.pop(this.heap[this.heap.length - 1]);
            let current = 0;
            let left = current * 2 + 1;
            let right = current * 2 + 2;

            // white the children are not null, and the parent is greater than the child, heapify
            while (
                this.heap[left] &&
                this.heap[right] &&
                (this.heap[current].freq > this.heap[left].freq ||
                    this.heap[current].freq > this.heap[right].freq)
            ) {
                if (this.heap[left].freq < this.heap[right].freq) {
                    let tmp = this.heap[current];
                    this.heap[current] = this.heap[left];
                    this.heap[left] = tmp;
                    current = left;
                } else {
                    let tmp = this.heap[current];
                    this.heap[current] = this.heap[right];
                    this.heap[right] = tmp;
                    current = right;
                }
                left = current * 2 + 1;
                right = current * 2 + 2;
            }
            return true;
        } else {
            return false;
        }
    }
    peek() {
        // get root node
        if (this.heap.length < 1) {
            return null;
        }
        return this.heap[0];
    }
};