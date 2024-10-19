function add(a, b) {
      return a + b;
}

function subtract(a, b) {
      return a - b;
}

function multiply(a, b) {
      return a * b;
}

function divide(a, b) {
      return a / b;
}

let firstNumber = undefined;
let secondNumber = undefined;
let operator = undefined;
let result = undefined;

function operate(operator, firstNumber, secondNumber) {
      switch(operator) {
            case "plus":
                  result = add(firstNumber, secondNumber);
                  break;
            case "minus":
                  result = subtract(firstNumber, secondNumber);
                  break;
            case "multiply":
                  result = multiply(firstNumber, secondNumber);
                  break;
            case "divide":
                  result = divide(firstNumber, secondNumber);
                  break;
      }
}