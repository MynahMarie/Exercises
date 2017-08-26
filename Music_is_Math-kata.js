function letsPlay(notes) {

  var chords = [];
  var chord = [notes[0]];
  var diff, idx;
  var j = 0;

  for (var i = 0; i < notes.length; i++) {
   //chord.push(notes[i]);
   console.log("chord: " + chord);
   idx = i+1;
   diff = notes[idx] - chord[j];
   console.log("diff: " + diff);
   if (diff == 3 || diff == 4 || diff == 5 || diff == 7 || diff == 8) {
     chord.push(notes[idx]);
     j++;
   }
   
   if (chord.length == 3) {
     if (Math.max(chord) - Math.min(chord) <= 12) {
       chords.push(chord);
       console.log("chord: " + chord);
     }
     chord = [];
   }
   //idx++;
  }
 console.log("Chords: " + chords);  
 return chords;

}

// ============================================================================================= //

// Version 2 //

function letsPlay(notes) {

  var chords = [];
  var chord = [];
  var diff; 
  var idx = 0;

  for (var i = 0; i < notes.length - 1; i++) {
    chord.push(notes[i]);
    console.log("chord[0]: " + chord);
    for (var j = i + 1; j < notes.length; j++) {
      
      diff = notes[j] - chord[idx];
      console.log("notes[j] = " + notes[j] + ", chord[idx] = " + chord[idx] + ", diff: " + diff);
      if (diff == 3 || diff == 4 || diff == 5 || diff == 7 || diff == 8) {
       chord.push(notes[j]);
       console.log("chord: " + chord);
       idx++;
     }
   
     if (chord.length == 3) {
       if (chord[2] - chord[0] <= 12) {
         chords.push(chord);
         console.log("chords: " + chords);
       }
     idx = 0;
     chord = [];
    }//end if 
  }//end if j
  idx = 0;
  chord = [];
 }//end of i
 
 console.log("Chords: " + chords);
 return chords;

}

// ============================================================================================== //

function letsPlay(notes) {

  var chords = [];
  var chord = [];
  var arr = [];
  var diff;
  var root;
  var idx = 0;

  function findChord(val, array) {

   //console.log("args: " + val + ", " + array);
   var ch = [];
   var ind = 0;
   ch.push(val);

   for (var i = 0; i < array.length; i++) {
   // Always compare between the note tested and the last 
   // element of the chord.
      diff = array[i] - ch[ind];
   //If the tested note matches the criteria, add it to the chord
   //and increase the chord idx.
      if (diff == 3 || diff == 4 || diff == 5 || diff == 7 || diff == 8) {
       ch.push(array[i]);
       ind++;
      }
    //If we reached a full chord matching the criteria, return.
      if (ch.length == 3 && ch[2] - ch[0] <= 12) {
       return ch;
      }
    }
 // Else we know that no valid chord was found.
   return -1;
  }
 
  arr = notes.slice();
  console.log("initial arr: " + arr);
 
  while (idx < notes.length - 1) {
    root = notes[idx];
    //No need to pass the root element in the array.
    //It is passed seperately in the function.
    console.log("root: " + root + ", arr: " + arr);
    chord = findChord(root, arr);
    console.log("chord: " + chord);
    // If a chord was found, substract an element of the chord from
    // the array and test again with the same root.
    if (chord != -1) {
      chords.push(chord);
      arr.splice(arr.indexOf(chord[1]), 1);
      console.log("arr after chord found: " + arr);
      //copy = arr.slice();
    }
    // When no mpre chords ae found, increase the idx to test 
    // with another root.
    else {
    //Restore array by making it empty and pushing back in the notes.
      arr = [];
      console.log("arr empty: " + arr);
      idx++;
      arr = notes.slice(idx);
      console.log("arr restored: " + arr);   
    }
  }
 
 console.log("Chords: " + chords);
 return chords;

}


//============================================================================ //

// "FINAL"

/*****

Let's play some music!

In Western music, we use different combinations of 12 basic values (called semi-tones) in various pitches to create chords and melodies. Why some combinations sound really well to our ears while others don't depend on basic mathematical calculations (not so basic sometimes but let's keep it simple for now :D ).

A chord is basically a combination of notes stacked on top of each other. The distance between a note and the next is called an interval. Some intervals sound "good" while others sound "bad".

Your task is this: given an array of integers, write a function that will return an array of sub-arrays representing "harmonious" chord combinations. The function should return all valid sub-arrays of 3 notes within the given array of notes. 

To put this more clearly, each sub-array contains 3 integers taken from the given array. Each sub-array represents a "chord". Your task is to return all possible "chords" that would sound "good" according to the rules below.

Here is what defines a harmonious ("good") chord combination (sub-array):

- The intervals that are accepted are:
    - minor 3rd:
      - b - a = 4
    - Major 3rd:   
      - b - a = 5
    - perfect 4th:   
      - b - a = 6
    - perfect 5th:   
      - b - a = 8
 
 
- The same numbers can be used multiple times, but not within the same sub-array.

- The difference between the highest value and lowest value in a chord can not exceed 12 (an interval of 12 is called an octave).

Here are some examples:

- letsPlay([1,2,3,4,5,6,7,8,9,10,11,12]) should return:
  - chords[[1,5,9], [1,6,10], [1,7,11], [2,6,10], [2,7,11],[2,8,12],[3,7,11], [3,8,12], [4,8,12]];


- letsPlay([1,2,3,4,5]) should return:
  - chords[];

You can assume that:

- Each notes array will be composed of unique integers.
- The notes array may or may not be sorted

If no chord combination is possible, you should return an empty array.

Hope that's clear enough and have fun!


*****/


function letsPlay(notes) {

  var chords = [];
  var chord = [];
  var arr = [];
  var idx = 0;
  var root, diff;
  
  function findChord(val, array) {
    var chord = [];
    var index = 0;
    chord.push(val);
    // Always test between 2 notes next to each other
    for (var i = 0; i < array.length; i++) {
      diff = array[i] - chord[index];
      if (diff == 4 || diff == 5 || diff == 6 || diff == 8) {
        chord.push(array[i]);
        index++;
      } // Test for valid chord.
      if (chord.length == 3 && chord[2] - chord[0] <= 12)
        return chord;
    }
    return -1;
  }
  
  // Sort the notes and make a copy.
  notes = notes.sort(function(a,b) { return a - b });
  arr = notes.slice();
  // Test for valid length.
  if (notes.length < 3)
    chords = [];
    
  else {
    while (idx < notes.length - 1) {
      root = notes[idx]; 
      if (arr.length < 3)
        break;
      // Send it to the function, if it returns a code, test again
      // with the same root until no more chords are found.
      chord = findChord(root, arr);
      if (chord != -1) {
        chords.push(chord);
        arr.splice(arr.indexOf(chord[1]), 1);
      }
      else {
        arr = [];
        idx++;
        arr = notes.slice(idx); 
      }
    }
  }
  return chords;
}


// ======================================================================================== //

// Tests

Test.describe("Should identify when no chord combination is possible.", function() {
  var notes1 = [1,2,3,4,5];
  Test.it("letsPlay([1,2,3,4,5]) should return [].", function() {
  var chords1 = letsPlay(notes1)
    Test.expect(Test.inspect(chords1) == Test.inspect([]), "letsPlay([1,5,6,9]) should return [] instead got " + letsPlay(notes1));
 });
  var notes2 = [1,5,12,22,25];
  Test.it("letsPlay([1,5,12,22,25]) should return []", function() {
  var chords2 = letsPlay(notes2);
  Test.expect(Test.inspect(chords2) == Test.inspect([]), "letsPlay([1,5,12,22,25]) should return [] instead got " + letsPlay(notes2));
 });
  var notes3 = [1,6,14,23,25];
  Test.it("letsPlay([1,6,14,23,25]) should return []", function() {
  var chords3 = letsPlay(notes3);
  Test.expect(Test.inspect(chords3) == Test.inspect([]), "letsPlay([1,6,14,23,25]) should return [] instead got " + letsPlay(notes3));
 });
});

Test.describe("Should work with small arrays.", function() {
  var notes1 = [1, 5, 6, 9];
  Test.it("letsPlay([1,5,6,9]) should return [[1, 5, 9]]", function() {
  var chords1 = letsPlay(notes1);
  Test.expect(Test.inspect(chords1) == Test.inspect([[1, 5, 9]]), "letsPlay([1,5,6,9]) should return [[1, 5, 9]] instead got " + letsPlay(notes1));
 });
  var notes2 = [5, 9, 14];
  Test.it("letsPlay([5, 9, 14]) should return [[5, 9, 14]]", function() {
  var chords2 = letsPlay(notes2);
  Test.expect(Test.inspect(chords2) == Test.inspect([[5, 9, 14]]), "letsPlay([1,5,6,9]) should return [[1, 5, 9]] instead got " + letsPlay(notes2));
 });
 var notes3 = [22,18,14];
  Test.it("letsPlay([22,18,14]) should return [[14,18,22]]", function() {
  var chords3 = letsPlay(notes3);
  Test.expect(Test.inspect(chords3) == Test.inspect([[14,18,22]]), "letsPlay([22,18,14]) should return [[14,18,22]] instead got " + letsPlay(notes3));;
 });
});

Test.describe("Should work with medium sized arrays", function() {
  var notes1 = [3,6,7,8,9,10,12,14,16,17];
  Test.it("letsPlay([3,6,7,8,9,10,12,14,16,17]) should return [[3,7,12], [3,8,12], [3,9,14], [6,10,14], [6,12,16], [7,12,16], [8,12,16]]", function() {
  var chords1 = letsPlay(notes1);
  Test.expect(Test.inspect(chords1) == Test.inspect([[3,7,12], [3,8,12], [3,9,14], [6,10,14], [6,12,16], [7,12,16], [8,12,16]]), "letsPlay([3,6,7,8,9,10,12,14,16,17]) should return [[3,7,12], [3,8,12], [3,9,14], [6,10,14], [6,12,16], [7,12,16], [8,12,16]] instead got " + letsPlay(notes1));;
 });
 var notes2 = [23,2,5,1,8,12,15];
  Test.it("letsPlay([23,2,5,1,8,12,15]) should return []", function() {
  var chords2 = letsPlay(notes2);
  Test.expect(Test.inspect(chords2) == Test.inspect([[2,8,12]]), "letsPlay([23,2,5,1,8,12,15]) should return [[2,8,12]] instead got " + letsPlay(notes2));;
 });
  var notes3 = [1,2,3,4,5,6,7,8,9,10,11,12];
  Test.it("letsPlay([1,2,3,4,5,6,7,8,9,10,11,12]) should return [[1,5,9], [1,6,10], [1,7,11], [2,6,10], [2,7,11], [2,8,12], [3,7,11], [3,8,12], [4,8,12]]", function() {
  var chords3 = letsPlay(notes3);
  Test.expect(Test.inspect(chords3) == Test.inspect([[1,5,9], [1,6,10], [1,7,11], [2,6,10], [2,7,11], [2,8,12], [3,7,11], [3,8,12], [4,8,12]]), "letsPlay([1,2,3,4,5,6,7,8,9,10,11,12]) should return [[1,5,9], [1,6,10], [1,7,11], [2,6,10], [2,7,11], [2,8,12], [3,7,11], [3,8,12], [4,8,12]] instead got " + letsPlay(notes3));
 });
  var notes4 = [36,30,31,48,22,12,6,8];
  Test.it("letsPlay([36,30,31,48,22,12,6,8]) should return []", function() {
  var chords4 = letsPlay(notes4);
  Test.expect(Test.inspect(chords2) == Test.inspect([]), "letsPlay([]) should return [] instead got " + letsPlay(notes4));
 });
});

Test.describe("Should work with edge cases", function() {
  var notes1 = [23,28];
  Test.it("letsPlay([23,28]) should return []", function() {
  var chords1 = letsPlay(notes1);
  Test.expect(Test.inspect(chords1) == Test.inspect([]), "letsPlay([23,28]) should return [] instead got " + letsPlay(notes1));;
 });
  var notes2 = [3];
  Test.it("letsPlay([3]) should return []", function() {
  var chords2 = letsPlay(notes2);
  Test.expect(Test.inspect(chords2) == Test.inspect([]), "letsPlay([]) should return [] instead got " + letsPlay(notes2));
 });
});

Test.describe("Should work with larger arrays.", function() {
  var notes1 = [2,5,6,10,4,23,12,15,14,36,32,33,25,26,27,3,9,45,60,103,100,80,46,47,48,50];
  Test.it("Should return [[2,6,10], [2,10,14], [3,9,14], [4,9,14], [4,10,14], [5,9,14], [5,10,14], [6,10,14], [15,23,27], [23,27,32], [26,32,36], [27,32,36]]", function() {
  var chords1 = letsPlay(notes1);
  Test.expect(Test.inspect(chords1) == Test.inspect([[2,6,10], [2,10,14], [3,9,14], [4,9,14], [4,10,14], [5,9,14], [5,10,14], [6,10,14], [15,23,27], [23,27,32], [26,32,36], [27,32,36]]), "letsPlay([2,5,6,10,4,23,12,15,14,36,32,33,25,26,27,3,9,45,60,103,100,80,46,47,48,50]) should return [[2,6,10], [2,10,14], [3,9,14], [4,9,14], [4,10,14], [5,9,14], [5,10,14], [6,10,14], [15,23,27], [23,27,32], [26,32,36], [27,32,36]] instead got " + letsPlay(notes1));;
 });
  var notes2 = [10,11,12,13,14,15,16,17,19,22,26,30,32,24,35,40,44,46,47,48,49,50,51,52,60,65,70,75,80];
  Test.it("Should return [[10,14,19], [10,15,19], [10,16,22], [11,15,19], [11,16,22], [11,17,22], [12,16,22], [12,17,22], [13,17,22], [13,19,24], [14,19,24], [14,22,26], [15,19,24], [16,22,26], [17,22,26], [19,24,30], [22,26,30], [24,30,35], [26,30,35], [30,35,40], [32,40,44], [35,40,44], [40,44,48], [40,46,50], [40,48,52], [44,48,52], [48,52,60], [60,65,70], [65,70,75], [70,75,80]]", function() {
  var chords2 = letsPlay(notes2);
  Test.expect(Test.inspect(chords2) == Test.inspect([[10,14,19], [10,15,19], [10,16,22], [11,15,19], [11,16,22], [11,17,22], [12,16,22], [12,17,22], [13,17,22], [13,19,24], [14,19,24], [14,22,26], [15,19,24], [16,22,26], [17,22,26], [19,24,30], [22,26,30], [24,30,35], [26,30,35], [30,35,40], [32,40,44], [35,40,44], [40,44,48], [40,46,50], [40,48,52], [44,48,52], [48,52,60], [60,65,70], [65,70,75], [70,75,80]]), "letsPlay([10,11,12,13,14,15,16,17,19,22,26,30,32,24,35,40,44,46,47,48,49,50,51,52,60,65,70,75,80]) should return [[10,14,19], [10,15,19], [10,16,22], [11,15,19], [11,16,22], [11,17,22], [12,16,22], [12,17,22], [13,17,22], [13,19,24], [14,19,24], [14,22,26], [15,19,24], [16,22,26], [17,22,26], [19,24,30], [22,26,30], [24,30,35], [26,30,35], [30,35,40], [32,40,44], [35,40,44], [40,44,48], [40,46,50], [40,48,52], [44,48,52], [48,52,60], [60,65,70], [65,70,75], [70,75,80]] instead got " + letsPlay(notes2));
 });
  var notes3 = [30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,52,54,56,58,60,61,63,65,67,69,71];
  Test.it("Should return [[30,34,38], [30,35,39], [30,36,40], [30,38,42], [31,35,39], [31,36,40], [31,37,41], [31,39,43], [32,36,40], [32,37,41], [32,38,42], [32,40,44], [33,37,41], [33,38,42], [33,39,43], [33,41,45], [34,38,42], [34,39,43], [34,40,44], [34,42,46], [35,39,43], [35,40,44], [35,41,45], [35,43,47], [36,40,44], [36,41,45], [36,42,46], [36,44,48], [37,41,45], [37,42,46], [37,43,47], [37,45,49], [38,42,46], [38,43,47], [38,44,48], [38,46,50], [39,43,47], [39,44,48], [39,45,49], [40,44,48], [40,45,49], [40,46,50], [40,48,52], [41,45,49], [41,46,50], [41,47,52], [42,46,50], [42,47,52], [42,48,52], [42,50,54], [43,47,52], [43,48,52], [43,49,54], [44,48,52], [44,49,54], [44,50,54], [44,52,56], [45,49,54], [45,50,54], [46,50,54], [46,52,56], [46,54,58], [47,52,56], [48,52,56], [48,54,58], [48,56,60], [49,54,58], [50,54,58], [50,56,60], [52,56,60], [52,58,63], [54,58,63], [54,60,65], [56,60,65], [56,61,65], [58,63,67], [60,65,69], [61,65,69], [61,67,71], [63,67,71]]", function() {
  var chords3 = letsPlay(notes3);
  Test.expect(Test.inspect(chords3) == Test.inspect([[30,34,38], [30,35,39], [30,36,40], [30,38,42], [31,35,39], [31,36,40], [31,37,41], [31,39,43], [32,36,40], [32,37,41], [32,38,42], [32,40,44], [33,37,41], [33,38,42], [33,39,43], [33,41,45], [34,38,42], [34,39,43], [34,40,44], [34,42,46], [35,39,43], [35,40,44], [35,41,45], [35,43,47], [36,40,44], [36,41,45], [36,42,46], [36,44,48], [37,41,45], [37,42,46], [37,43,47], [37,45,49], [38,42,46], [38,43,47], [38,44,48], [38,46,50], [39,43,47], [39,44,48], [39,45,49], [40,44,48], [40,45,49], [40,46,50], [40,48,52], [41,45,49], [41,46,50], [41,47,52], [42,46,50], [42,47,52], [42,48,52], [42,50,54], [43,47,52], [43,48,52], [43,49,54], [44,48,52], [44,49,54], [44,50,54], [44,52,56], [45,49,54], [45,50,54], [46,50,54], [46,52,56], [46,54,58], [47,52,56], [48,52,56], [48,54,58], [48,56,60], [49,54,58], [50,54,58], [50,56,60], [52,56,60], [52,58,63], [54,58,63], [54,60,65], [56,60,65], [56,61,65], [58,63,67], [60,65,69], [61,65,69], [61,67,71], [63,67,71]]), "letsPlay([30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,52,54,56,58,60,61,63,65,67,69,71]) should return [[30,34,38], [30,35,39], [30,36,40], [30,38,42], [31,35,39], [31,36,40], [31,37,41], [31,39,43], [32,36,40], [32,37,41], [32,38,42], [32,40,44], [33,37,41], [33,38,42], [33,39,43], [33,41,45], [34,38,42], [34,39,43], [34,40,44], [34,42,46], [35,39,43], [35,40,44], [35,41,45], [35,43,47], [36,40,44], [36,41,45], [36,42,46], [36,44,48], [37,41,45], [37,42,46], [37,43,47], [37,45,49], [38,42,46], [38,43,47], [38,44,48], [38,46,50], [39,43,47], [39,44,48], [39,45,49], [40,44,48], [40,45,49], [40,46,50], [40,48,52], [41,45,49], [41,46,50], [41,47,52], [42,46,50], [42,47,52], [42,48,52], [42,50,54], [43,47,52], [43,48,52], [43,49,54], [44,48,52], [44,49,54], [44,50,54], [44,52,56], [45,49,54], [45,50,54], [46,50,54], [46,52,56], [46,54,58], [47,52,56], [48,52,56], [48,54,58], [48,56,60], [49,54,58], [50,54,58], [50,56,60], [52,56,60], [52,58,63], [54,58,63], [54,60,65], [56,60,65], [56,61,65], [58,63,67], [60,65,69], [61,65,69], [61,67,71], [63,67,71]] instead got " + letsPlay(notes3));
 });
});


