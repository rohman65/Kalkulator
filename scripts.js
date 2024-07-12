const screen = document.getElementById('screen');
let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let operator = null;
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyId = key.id;

        if (keyId === 'AC') {
            clearAll();
        } else if (keyId === 'C') {
           deleteLastDigit();
        } else if (keyId === '+-' && currentInput !== '+-') {
            toggleSign();
        } else if (keyId === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(keyId)) {
            setOperator(keyId);
        } else {
            inputDigit(keyId);
        }
        updateScreen();
    });
});

function clearAll() {
    currentInput = '';
    firstOperand = null;
    secondOperand = null;
    operator = null;
}

function deleteLastDigit() {
    currentInput = currentInput.slice(0, -1);
}

function toggleSign() {
    currentInput = String(parseFloat(currentInput) * -1);
}

function setOperator(op) {
    if (currentInput !== '') {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            secondOperand = parseFloat(currentInput);
            firstOperand = performCalculation();
            secondOperand = null;
        }
    }
    operator = op;
    currentInput = '';
}

function inputDigit(digit) {
    if (currentInput === '' && digit === '.') {
        currentInput = '0.';
    } else {
        currentInput += digit;
    }
}

function calculate() {
    if (operator && currentInput !== '') {
        secondOperand = parseFloat(currentInput);
        currentInput = String(performCalculation());
        operator = null;
    }
}

function performCalculation() {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
    }
}

function updateScreen() {
    screen.value = currentInput;
}