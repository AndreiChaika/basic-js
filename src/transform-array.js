const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
 function transform(arr) {
  let newArr = {};
  let newObj = [];
  let shouldSkipNext = false;
  let isPrevSkipped = false;
 
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  newArr["--discard-next"] = function(i) {   
    shouldSkipNext = true;
  };
  newArr["--discard-prev"] = function(i) {    
    newObj.pop();    
  };
  newArr["--double-next"] = function(i) {   
    if (arr[i + 1]) {    
    newObj.push(arr[i + 1]);    
    }
  };
  newArr["--double-prev"] = function(i) {  
    if (arr[i - 1]) {
    newObj.push(arr[i - 1]);
    }   
  };
  arr.forEach((elem,i) => {
    if(shouldSkipNext) {
      shouldSkipNext = false;
      isPrevSkipped = true;
      return;
    }
    if (newArr[elem] && isPrevSkipped) {
      return;
    }
    if (newArr[elem] && !isPrevSkipped) {
        return newArr[elem](i);
    } 
    newObj.push(elem);
    isPrevSkipped = false;    
  }); 
    return newObj;
}

module.exports = {
  transform
};
