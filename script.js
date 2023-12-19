let operator = null;
let firstNumber = null;
let secondNumber = null;
let displayer = document.querySelector('#displayer');
let numbers = document.querySelector('.numbers');
let button = null;

function add(a, b) {
    return a+b;
}
function subtract(a, b) {
    return a-b;
}
function multiply(a, b) {
    return a*b;
}
function divide(a, b) {
    return a/b;
}

function operate(operator, a, b) {
    a = +a;
    b = +b;
    if (operator === '+') {
        return add(a, b);
    } else if(operator === '-') {
        subtract(a, b);
    } else if(operator === '*') {
        return multiply(a, b);
    } else if(operator === '/') {
        return divide(a, b);
    } else {
        return 'error';
    }
}

function handleNumber(e) {
    displayer.value = displayer.value.concat(e.currentTarget.id);
}
function handleOperator(e) {
    let operation = e.currentTarget.textContent;
    if(!firstNumber) {
        firstNumber = displayer.value;
        console.log(firstNumber);
        operator = operation;
        console.log(operation);
        displayer.value = displayer.value.concat(operation);
    } else if (firstNumber && !operator && !secondNumber) {
        operator = operation;
        displayer.value = displayer.value.concat(operation);
    } else if (operator && secondNumber && firstNumber) {
        displayer.value = operate(operator, firstNumber, secondNumber);
    }
}

function handleEquals(e) {
    if(firstNumber && secondNumber && operator) {
        displayer.value = operate(operator, firstNumber, secondNumber);
    } else if(firstNumber && !secondNumber && operator) {
        secondNumber = displayer.value.replace(/^.*\+(.*?)$/, '$1');
        console.log(secondNumber);
        result = operate(operator, firstNumber, secondNumber);
        displayer.value = result;
        firstNumber = result;
        secondNumber = null;
        operator = null;
    } 
}

for(let i = 1; i <= 10; i++) {    
    button = document.createElement('div');
    if(i === 10) {
        button.id = '0';
        button.textContent = '0';
    } else {
        button.id = i;
        button.textContent = i;
    }
    button.className = 'calcButton number';
    button.addEventListener("click", handleNumber);
    numbers.appendChild(button);
}

let plus = document.querySelector('#plus');
plus.addEventListener('click', handleOperator);
let equals = document.querySelector('#equals');
equals.addEventListener('click', handleEquals);
