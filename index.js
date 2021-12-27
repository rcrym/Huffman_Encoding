const commandLineArgs = require("command-line-args");
const fs = require("fs");
const { frequency } = require("./frequency.js");
const Heap = require("./myheap.js");
const BST = require("./bst.js");

// Get command line output/input files
const optionDefinitions = [
    {
        name: "o",
        alias: "o",
        type: String,
        multiple: true,
    },
];

const options = commandLineArgs(optionDefinitions);

var OutputFile = "/" + options.o[0],
    InputFile = "/" + options.o[1];

// Read Input
fs.readFile(__dirname + InputFile, "utf8", (error, data) => {
    if (error) {
        throw error;
    }
    encode(data);
});

function encode(data) {
    // Make frequency table
    var freqTable = frequency(data);

    // Comparator for BST
    var compare = (a, b) => {
        if (a[1] < b[1]) {
            return -1;
        }
        if (a[1] > b[1]) {
            return 1;
        } else {
            return 0;
        }
    };
    var bst = new BST(compare);
    for (let i = 0; i < freqTable.length; i++) {
        bst.add(freqTable[i]);
    }

    // (using BST) lexigraphically order frequency table before initial heap
    freqTable = bst.inOrder();
    var heap = new Heap();
    for (element of freqTable) {
        // Add HuffmanNodes to heap
        let huffmanNode = new heap.HuffmanNode();
        huffmanNode.freq = element[0];
        huffmanNode.char = element[1];
        heap.add(huffmanNode);
    }

    // Put in internal nodes
    var root;
    while (heap.size() > 1) {
        let a = heap.peek();
        heap.remove();
        let b = heap.peek();
        heap.remove();
        let c = new heap.HuffmanNode();
        c.freq = a.freq + b.freq;
        c.char = "*";
        c.left = a;
        c.right = b;
        root = c;
        heap.add(c);
    }

    // Get binary digits
    var codes = [];
    binary(root, "");
    function binary(root, s) {
        if (root.left == null && root.right == null) {
            codes.push([root.char, s]);
            return;
        }
        binary(root.left, s + "0");
        binary(root.right, s + "1");
    }

    // Reorder lexigraphically again
    var compare2 = (a, b) => {
        if (a[0] < b[0]) {
            return -1;
        }
        if (a[0] > b[0]) {
            return 1;
        } else {
            return 0;
        }
    };
    var bst2 = new BST(compare2);
    for (let i = 0; i < codes.length; i++) {
        bst2.add(codes[i]);
    }
    var dict = bst2.inOrder();

    // Prepare output
    var output = (() => {
        let str = "---------- Huffman Dictionary ----------";
        for (letter of dict) {
            let space = "        ";
            switch (letter[0]) {
                case "\t":
                    letter[0] = "(Tab)";
                    space = "    ";
                    break;
                case "\n":
                    letter[0] = "(Enter)";
                    space = "  ";
                    break;
                case " ":
                    letter[0] = "(Space)";
                    space = "  ";
                    break;
            }
            str += "\n" + letter[0] + space + letter[1];
        }
        return str;
    })();

    // Write output to file
    fs.writeFile(__dirname + OutputFile, output, (error, data) => {
        if (error) {
            throw error;
        }
    });
}
