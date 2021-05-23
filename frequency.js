module.exports = {
    frequency: function (text) {
        var freqTable = [];
        for (let i = 0; i < text.length; i++) {
            // if letter already is in array, increase its frequency number
            if (text[i] in freqTable) {
                freqTable[text[i]]++;
            } else {
            // if letter already is not in array, start its frequency number at 1
                freqTable[text[i]] = 1;
            }
        }
        // make it an array of arrays
        var freqArray = [];
        for (var char in freqTable) {
            freqArray.push([freqTable[char], char]);
        }
        return freqArray
    }
}