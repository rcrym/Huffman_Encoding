/**
 * A Binary Search Tree 
 * Implemented by Rileyc2022
 * Uses a comparator function to determine data equality
 */
module.exports = class BST {

    static Node = class {
        constructor(data = null) {
            this.data = data;
            this.left = null;
            this.right = null;
        }
    }

    /**
     * Build a BST using a comparing function if the form:
     *   comparator(A,B)
     * @param comparator a function which returns -1 if A < B, 0 if A === B, or 1 if A > B
     */
    constructor(comparator) {
        this._root = null;
        this._comparator = comparator;
    }

    /**
     * Add data the the Binary Search tree via the ordering done
     * by the comparator
     * @param data the data to add
     */


    add(data) {
        var newNode = new BST.Node(data);
        var comparator = this._comparator
        var insertNode = function (node, newNode) {
            if (comparator(newNode.data, node.data) < 0) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    insertNode(node.right, newNode);
                }
            }
        };
        if (this._root === null) {
            this._root = newNode;
        } else {
            insertNode(this._root, newNode);
        }
    }

    /**
     * Removes the first element equal to data when using the comparator function
     * @param data the element to compare with
     * @return the exact data removed from the BST
     */
    remove(data) {
        var comparator = this._comparator;
        var removeNode = function (node, data) {
            if (node === null) {
                return null;
            }
            if (comparator(data, node.data) < 0) {
                node.left = removeNode(node.left, data);
                return node;
            } else if (comparator(data, node.data) > 0) {
                node.right = removeNode(node.right, data);
                return node;
            } else {
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                }
                if (node.left === null) {
                    node = node.right;
                    return node;
                } else if (node.right === null) {
                    node = node.left;
                    return node;
                }
                var minRight = findMinNode(node.right);
                node.data = minRight.data;
                node.right = removeNode(node.right, minRight.data);
                return node;
            }
        };
        var findMinNode = function (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node;
        };
        this._root = removeNode(this._root, data);
    }

    /**
     * Completes an inOrder traversal of the BST
     * @param currNode the node to start at (null = root)
     * @param startOver true if we should start at the root, false otherwise
     * 
     * @return Starting at currNode, a list of the resulting inOrder traversal 
     */
    inOrder(currNode = null, startOver = true) {
        var stack = [];
        var rtn = [];
        if (currNode === null || startOver) {
            currNode = this._root;
        }
        if (this._root == null) {
            return null;
        }
        while (currNode != null || stack.length > 0) {
            while (currNode != null) {
                stack.push(currNode);
                currNode = currNode.left;
            }
            currNode = stack.pop();
            rtn.push(currNode.data)
            currNode = currNode.right
        }
        return rtn;
    }
}