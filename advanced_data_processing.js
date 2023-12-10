// filename: advanced_data_processing.js

/***********************************************
 * Advanced Data Processing
 * 
 * This script demonstrates advanced data processing techniques
 * using JavaScript. It includes various functions for working
 * with arrays, objects, and manipulating data.
 ************************************************/

// Utility function to calculate factorial recursively
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

// Function to expand an array by duplicating each element
function expandArray(arr) {
  const expandedArr = [];
  
  arr.forEach((elem) => {
    expandedArr.push(elem, elem);
  });
  
  return expandedArr;
}

// Function to capitalize the first letter of each word in a string
function capitalizeString(str) {
  const words = str.split(' ');
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  
  return capitalizedWords.join(' ');
}

// Function to calculate the product of all elements in an array
function calculateProduct(arr) {
  return arr.reduce((acc, curr) => acc * curr);
}

// Function to filter out duplicates from an array
function filterDuplicates(arr) {
  return [...new Set(arr)];
}

// Function to generate a random number between a given range
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Object with various utility functions
const Utils = {
  factorial,
  expandArray,
  capitalizeString,
  calculateProduct,
  filterDuplicates,
  generateRandomNumber
};

// Example usage of the utility functions
console.log(Utils.factorial(5)); // Output: 120

const arr = [1, 2, 3];
console.log(Utils.expandArray(arr)); // Output: [1, 1, 2, 2, 3, 3]

const str = "hello world";
console.log(Utils.capitalizeString(str)); // Output: "Hello World"

console.log(Utils.calculateProduct([2, 3, 4])); // Output: 24

const arrWithDuplicates = [1, 2, 2, 3, 3, 4, 5];
console.log(Utils.filterDuplicates(arrWithDuplicates)); // Output: [1, 2, 3, 4, 5]

console.log(Utils.generateRandomNumber(1, 10)); // Output: Random number between 1 and 10

/***********************************************
 * Additional lines of complex code can be added
 * here to demonstrate more advanced functionality
 ************************************************/

// End of code