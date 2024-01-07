let operator = null;
let firstNumber = null;
let secondNumber = null;
let displayer = document.querySelector('#displayer');
let numbers = document.querySelector('.numbers');
let opDiv = document.querySelector('.operators');
let clear = document.querySelector('#clear');
let button = null;
let operators = ['plus', 'minus', 'multiply', 'divide'];
let operatorsValue = ['+', '-', 'x', '/'];
let displayLock = 1;
let dotLock = 1;

function add(a, b) {
    return Math.round((a+b) * 100000000) / 100000000;
}
function subtract(a, b) {
    return Math.round((a-b) * 100000000) / 100000000;
}
function multiply(a, b) {
    return Math.round((a*b) * 100000000) / 100000000;
}
function divide(a, b) {
    if(b === 0) {
        displayLock = -1;
        setTimeout(() => {
            displayer.value = "";
            firstNumber = null;
            secondNumber = null;
            operator = null;
            displayLock = 1;
          }, "2000");
        return 'Woops, cannot divide by 0';
          
    }
    return Math.round((a/b) * 100000000) / 100000000;
}

function operate(operator, a, b) {
    a = +a;
    b = +b;
    if (operator === '+') {
        return add(a, b);
    } else if(operator === '-') {
        return subtract(a, b);
    } else if(operator === 'x') {
        return multiply(a, b);
    } else if(operator === '/') {
        return divide(a, b);
    } else {
        return 'error';
    }
}

function handleClear(e) {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    currentDisplay =  '';
    displayer.value = currentDisplay;
}
function handleNumber(e) {
    if(displayLock<0) {
        return
    } else if(e.currentTarget.id === '.' && dotLock > 0) {
        displayer.value = displayer.value.concat(e.currentTarget.id);
        dotLock = -1;
        return
    } else if (dotLock < 0 && e.currentTarget.id === '.') {
        return
    }
    displayer.value = displayer.value.concat(e.currentTarget.id);
}
function handleOperator(e) {
    let operation = null;
    if(displayLock<0) {
        return
    }
    if(e.currentTarget) {
        operation = e.currentTarget.textContent;
    } else {
        operation = e;
    }
    if(!firstNumber) {
        console.log('no first');
        firstNumber = displayer.value;
        operator = operation;
        dotLock = 1;
        if(e.currentTarget){
            displayer.value = displayer.value.concat(operation);
        }
    } else if (firstNumber && !operator && !secondNumber) {
        console.log('no op and no second');
        operator = operation;
        if(e.currentTarget) {
            displayer.value = displayer.value.concat(operation);
        } else if(e) {
            displayer.value = currentDisplay.concat(operation);
        }
    } else if(firstNumber && operator && !secondNumber) {
        console.log('no second number');
        handleEquals();
        operator = operation;
        displayer.value = displayer.value.concat(operator);
    } else if (operator && secondNumber && firstNumber) {
        console.log('all needed for operate')
        console.log(operate(operator, firstNumber, secondNumber));
        displayer.value = operate(operator, firstNumber, secondNumber);
    }
}

function handleEquals(e) {
    if(firstNumber && secondNumber && operator) {
        displayer.value = operate(operator, firstNumber, secondNumber);
        dotLock = 1;
    } else if(firstNumber && !secondNumber && operator) {
        secondNumber = displayer.value.replace(/^.*[+\-x\/](.*?)$/, '$1');
        result = operate(operator, firstNumber, secondNumber);
        displayer.value = result;
        firstNumber = result;
        secondNumber = null;
        operator = null;
        dotLock = 1;
    } 
}

function handleInput(e) {
    e.preventDefault();
    input = e.key;
    possibleInputs = /[0-9.]|[+\-xX/]/;
    currentDisplay = displayer.value;
    operatorsValue.forEach((op) => (op === input) ? handleOperator(op) : '');
    if (currentDisplay.match(/[.]/)) {
        if (input.match(/[.]/) && !firstNumber) {
            return
        } else if(input.match(/[.]/) && firstNumber && currentDisplay.match(/^(?=(.*\.){2})/)) {
            dotLock = -1;
            return
        }
    }
    if(input === 'Enter') {
       handleEquals(e);
    } else if(input === 'Backspace') {
        operatorsValue.forEach((op) => (op === currentDisplay.slice(-1)) ? operator = null : op);
        displayer.value = currentDisplay.slice(0, currentDisplay.length-1);
    } else if(input.match(possibleInputs) && !operator) {
        displayer.value = displayer.value.concat(input);
    }
}

for(let i = 1; i <= 11; i++) {    
    button = document.createElement('button');
    if(i === 10) {
        button.id = '0';
        button.textContent = '0';
    } else if(i===11) {
        button.id = '.';
        button.textContent = '.';
    }else {
        button.id = i;
        button.textContent = i;
    }
    button.className = 'calcButton number';
    button.addEventListener("click", handleNumber);
    numbers.appendChild(button);
}

operators.forEach(op => {
    let opButton = document.createElement('button');
    opButton.id = op;
    opButton.addEventListener('click', handleOperator);
    opButton.textContent = operatorsValue[operators.indexOf(op)];
    opDiv.appendChild(opButton);
    opButton.className = 'calcButton';
});

let plus = document.querySelector('#plus');
plus.addEventListener('click', handleOperator);
let equals = document.querySelector('#equals');
equals.addEventListener('click', handleEquals);
clear.addEventListener('click', handleClear);
displayer.addEventListener('keydown', handleInput);
