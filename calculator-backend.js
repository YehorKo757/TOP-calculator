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
let display = 0;

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

let displayItem = document.querySelector(".display");
displayItem.textContent = display;

function populateDisplay(buttonValue){
      if (displayItem.textContent.length < 9) {
            if (display == "0") {
                  display = buttonValue;
                  displayItem.textContent = display;
            } else {
                  display = displayItem.textContent.concat(buttonValue);
                  displayItem.textContent = display;
            }
      }
      
}

let buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {
      if (event.target.parentElement.classList.contains("number")) {
            let buttonValue = event.target.parentElement.id;
            populateDisplay(buttonValue);
      }
})