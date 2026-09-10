import {formatCurrency} from '../scripts/utils/money.js';
console.log('Test suite : formatCurrency function');
console.log('converts cents to dollars and formats with two decimal places');
if(formatCurrency(2095) === '20.95') {
  console.log('Test passed');
} else {
  console.log('Test failed');
}
console.log('converts 0 cents to dollars and formats with two decimal places');

if(formatCurrency(0) === '0.00') {
  console.log('Test passed');
} else {
  console.log('Test failed');
}
console.log('converts negative cents to dollars and formats with two decimal places');
if(formatCurrency(-500) === '-5.00') {
  console.log('Test passed');
} else {
  console.log('Test failed');
}
console.log('converts decimal cents to dollars and formats with two decimal places');
if(formatCurrency(2000.5) === '20.01') {
  console.log('Test passed');
} else {
  console.log('Test failed');
}