'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * identity: Function that returns whatever is put into it. Pretty simple.
 * @param {Any data type} anything: Any value works here, we're just returning
 * it.
*/
function identity(anything) {
    return anything;
}
module.exports.identity = identity;


/**
 * typeOf: Function that returns the datatype of an input. Measures are put in
 * place to make sure that arrays, null, and dates return their respective data
 * types instead of object
 * @param {Any data type} value: The value to be evaluated.
*/
function typeOf(value) {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    if (value instanceof Date) return "date";
    return typeof value;
}
module.exports.typeOf = typeOf;



/**
 * first: Function that returns a new array containing all elements of the 
 * original array up to and including the nth number. If the input is not an 
 * array, will return an empty array. If n is not defined or not a number, will 
 * return the first element in the array. If the number provided is greater than 
 * the length of the array, returns the full array.
 * @param {Array} array: An array to pull values from.
 * @param {number} n: How many elements to pull from the array.
*/
function first(array, n){
    if (!Array.isArray(array) || n < 0) return [];  
    if (n === undefined || isNaN(n)) return array[0];
    if (n > array.length) return array;
    return array.slice(0 , n);
}
module.exports.first = first;



/**
 * last: Function that returns a new array containing all elements of the 
 * original array up to and including the nth number from the END of the array. 
 * If the input is not an array, will return an empty array. If n is not defined 
 * or not a number, will return the first element in the array. If the number 
 * provided is greater than the length of the array, returns the full array.
 * @param {Array} array: An array to pull values from.
 * @param {number} n: How many elements to pull from the array from the end.
*/
function last(array, n){ 
    if (!Array.isArray(array) || n < 0) return [];
    if (n === undefined || isNaN(n)) return array[array.length-1];
    if (n > array.length) return array;
    return array.slice(-n);
}
module.exports.last = last;



/**
 * indexOf: Loops over an array, returns the index of the first occurence of a
 * specified value. If the value does not occur anywhere in the array, returns
 * -1 instead.A
 * @param {Array} array: An array to loop through.
 * @param {Any data type} value: A value to search through the array for.
*/
function indexOf(array, value) {
    for (var i = 0; i < array.length; i ++) {
        if (array[i] === value) return i;
    }   
    return -1;
}
module.exports.last = last;



/**
 * filter: Performs an action on each element in the array, returns a new array
 * containing all the elements which returned true.
 * @param {Array} array: array to call function on
 * @param {Function} action: function to run on each element in array. Should
 * pass the arguments: element, index, and array. Should return a Boolean value.
*/
function filter(array, action) {
    var areTrue = [];
    each(array, function(value, index, array){
        if (action(value, index, array)) {
            areTrue.push(value);
        }
    });
    return areTrue;
}



/**
 * reject: Permorms action on each element in an array, returns a new array
 * containing all the elements which returned false
 * @param {Array} array: array to call function on.
 * @param {Function} action: function to run on each element in array. Should
 * pass the arguments: element, index, and array. Should return a boolean value.
*/
function reject(array, action) {
    var areFalse = [];
    filter(array, function(value, index, array){
        if (!(action(value, index, array))) {
            areFalse.push(value);
        }
    });
    return areFalse;
}



/**
 * partition: Calls function on each element in an array, returns an array with
 * two sub arrays. The first contains all values that returned truth, the second
 * contains all values that returned falsy.
 * @param {Array} array: array to call function on.
 * @param {Function} action: function to run on each element in array. Should
 * pass the arguments: element, index, and array. Should return a boolean value.
*/
function partition(array, action){
    var areTrue = [];
    var areFalse = [];
    var partitioned= [];
    filter(array, function(value, index, array){
        if (action(value, index, array)) {
            areTrue.push(value);
        }
        else if (!(action(value, index, array))) {
            areFalse.push(value);
        }
    });
    partitioned.push(areTrue);
    partitioned.push(areFalse);
    return partitioned;
}



/**
 * unique: Loops through an array, returns a new array with all duplicates 
 * removed
 * @param {Array} array: a starting array to remove duplicates from.
*/
function unique(array){
	var uniqueArray = [];
    each(array, function(value, index, array) {
        if (indexOf(array, value) === index) {
            uniqueArray.push(value);
        }
    });
    return uniqueArray;
}



/**
 * map: Similar to each, except it actually returns something. Performs an 
 * action on each element in a collection, returns a new array containing the 
 * return values of each element.
 * @param {Array or Object} collection: a collection to be looped through.
 * @param {Function} action: function to be performed on each element in the
 * collection
*/ 
function map(collection, action) {
    var mapResults = [];
    each(collection, function(value, index, collection){
        mapResults.push(action(value, index, collection));
    });
    return mapResults;
}



/**
 * pluck: Loops through an array of objects, returns an array with the value of
 * <property> for each object.
 * @param {Array of Objects} array: collection to be searched through
 * @param {any value} property: The key in each array to return a value for.
*/ 
function pluck(array, property) {
//check if object
//empty array
//loop through array of objects
//return property for each object
    return map(array, function(value, index, array){
        return (array[index][property]);
    });
}




/**
 * contains: Searches through <array> for a particular value. Returns true if
 * <value> exists in the array, false if it does not.
 * @param{Array} array: an array to search through.
 * @param{Any data type} value: a value to search for in the array
*/
function contains(array, value){
    return indexOf(array, value)  > -1 ? true : false;
}



/**
 * every: Runs <test> on each element in <collection>. If ALL elements return
 * true, returns true.
 * @param {Object or Array} collection: An object or array. <test> will be 
 * called on each element in <collection>
 * @param {Function} test: A function to  be run on each element in <collection>.
 * <test> should return a boolean value.
*/
function every(collection, test){
    var result = true;
    each(collection, function (value, index, collection){
        if (typeof test != "function"){
        if (!collection[index]) {
        result = false;
    }
  }else if (!test(value, index, collection)) {
        result = false;
  }
});
  return result;
}



/**
 * some: Runs <test> on each element in <collection>. If ANY elements return
 * true, returns true.
 * @param {Object or Array} collection: An object or array. <test> will be 
 * called on each element in <collection>
 * @param {Function} test: A function to  be run on each element in <collection>.
 * <test> should return a boolean value.
*/
function some(collection, test){
    var result = false;
    each(collection, function (value, index, collection){
    if (typeof test != "function"){
    if (collection[index]) {
        result = true;
    }
  }else if (test(value, index, collection)) {
        result = true;
  }
});
  return result;
}



/**
 * reduce: returns a combined value of all elements in an array after being 
 * called by <action> starting with <seed>
 * @param {Object or Array} collection: a collection to run a function on
 * @param {Function} action: a function to perform on each element in the array
 * @param {Value} seed: The starting point and accumulator. If seed has no 
 * starting, it will start at the first index of the <collection>
*/
function reduce(collection, action, seed) {
// for first iteration set seed as prev result
// if seed doesnt exist, set equal to first value in array
// run function, establish prev result
// run function on rest of loop
// return final value
    each(collection, function(element, index, collection){
    if(seed === undefined) seed = collection[0];
    else seed = action(seed, element, index);
});
  return seed;
}