// ========= STATE VARIABLES =========
let currentInput = '0';
let previousInput = '';
let operator = '';
let waitingForOperand = false;

// ========= DISPLAY ELEMENTS =========
const display = document.getElementById('display');
const operationDisplay = document.getElementById('operation');

// ===============================
//  DISPLAY & UI UPDATES
// ===============================
function updateDisplay() {
  display.textContent = currentInput;
  operationDisplay.textContent = previousInput && operator
   ? '${previousInput} ${getOperatorSymbol(operator)}':'';
}

function getOperatorSymbol(op) {
  switch (op) {
    case '+': return '+';
    case '-': return '−';
    case '*': return '×';
    case '/': return '÷';
    default: return op;
  }
}

// ===============================
//  INPUT HANDLING
// ===============================
function inputNumber(num) {
  if (waitingForOperand) {
    currentInput = num;
    waitingForOperand = false;
  } else {
    currentInput = currentInput === '0' ? num : currentInput + num;
  }
  updateDisplay();
  animateButton();
}

function inputOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (previousInput === '') {
    previousInput = inputValue;
  } else if (operator) {
    const newValue = performCalculation(previousInput, inputValue, operator);
    currentInput = String(newValue);
    previousInput = newValue;
  }

  operator = nextOperator;
  waitingForOperand = true;
  updateDisplay();
  animateButton();
}

function inputDecimal() {
  if (waitingForOperand) {
    currentInput = '0.';
    waitingForOperand = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
  animateButton();
}

// ===============================
//  CLEAR & DELETE FUNCTIONS
// ===============================
function clearAll() {
  currentInput = '0';
  previousInput = '';
  operator = '';
  waitingForOperand = false;
  updateDisplay();
  animateButton();
}

function clearEntry() {
  currentInput = '0';
  updateDisplay();
  animateButton();
}

function deleteLast() {
  currentInput = currentInput.length > 1
    ? currentInput.slice(0, -1)
    : '0';
  updateDisplay();
  animateButton();
}

// ===============================
//  CALCULATION LOGIC
// ===============================
function calculate() {
  const inputValue = parseFloat(currentInput);

  if (previousInput !== '' && operator) {
    const newValue = performCalculation(previousInput, inputValue, operator);
    currentInput = String(newValue);
    previousInput = '';
    operator = '';
    waitingForOperand = true;
    updateDisplay();
  }
  animateButton();
}

function performCalculation(first, second, op) {
  switch (op) {
    case '+': return first + second;
    case '-': return first - second;
    case '*': return first * second;
    case '/': return second !== 0 ? first / second : 0;
    default:  return second;
  }
}

// ===============================
//  UI ANIMATIONS
// ===============================
function animateButton() {
  display.classList.add('pulse-animation');
  setTimeout(() => display.classList.remove('pulse-animation'), 200);
}

// ===============================
//  KEYBOARD SUPPORT
// ===============================
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if ('0123456789+-*/.='.includes(key) || ['Enter', 'Escape', 'Backspace'].includes(key)) {
    event.preventDefault();
  }

  if ('0123456789'.includes(key)) inputNumber(key);
  else if (['+', '-', '*', '/'].includes(key)) inputOperator(key);
  else if (key === '.') inputDecimal();
  else if (key === 'Enter' || key === '=') calculate();
  else if (key === 'Escape') clearAll();
  else if (key === 'Backspace') deleteLast();
});

// Initialize display
updateDisplay();