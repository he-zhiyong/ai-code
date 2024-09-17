let displayValue = '0';
let formula = '';
let firstOperand = null;
let secondOperand = false;
let operator = null;

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const { key } = event;
    if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        inputOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

function inputNumber(num) {
    if (secondOperand) {
        displayValue = String(num);
        secondOperand = false;
    } else {
        displayValue = displayValue === '0' ? String(num) : displayValue + num;
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && secondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculateResult(firstOperand, inputValue, operator);
        displayValue = String(result);
        firstOperand = result;
    }

    formula += ` ${displayValue} ${nextOperator}`;
    secondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calculateResult(first, second, operator) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return first / second;
    if (operator === '%') return first % second;
    return second;
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    formula = '';
    firstOperand = null;
    secondOperand = false;
    operator = null;
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1) || '0';
    updateDisplay();
}

function calculate() {
    if (operator && !secondOperand) {
        const inputValue = parseFloat(displayValue);
        displayValue = String(calculateResult(firstOperand, inputValue, operator));
        formula += ` ${inputValue} =`;
        firstOperand = null;
        secondOperand = true;
        operator = null;
        updateDisplay();
    }
}

function updateDisplay() {
    const displayFormula = document.getElementById('formula');
    const displayCurrent = document.getElementById('current');
    displayFormula.innerText = formula;
    displayCurrent.innerText = displayValue;
}
