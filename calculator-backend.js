function precision(number, precisionNeeded) {
      let coef = 10 ** precisionNeeded;
      return Math.round(number * coef)/coef; 
}

function add(a, b) {
      result = parseFloat(a) + parseFloat(b); 
      return precision(result, 12);
}

function subtract(a, b) {
      result = parseFloat(a) - parseFloat(b);
      return precision(result, 12);
}

function multiply(a, b) {
      result = parseFloat(a) * parseFloat(b);
      return precision(result, 12);
}

function divide(a, b) {
      if (b !== "0") {
            result = parseFloat(a) / parseFloat(b);
            return precision(result, 12);
      } else {
            return "ZeroDivision error!"
      }
      
}

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";
let displayUp = "";
let displayDown = "0";
let isOperatorAgain = false;
let isOperatorBefore = false;

function operate(operator, firstNumber, secondNumber) {
      switch(operator) {
            case "add":
                  result = add(firstNumber, secondNumber);
                  return result;
                  break;
            case "subtract":
                  result = subtract(firstNumber, secondNumber);
                  return result;
                  break;
            case "multiply":
                  result = multiply(firstNumber, secondNumber);
                  return result;
                  break;
            case "divide":
                  result = divide(firstNumber, secondNumber);
                  return result;
                  break;
      }
}

let displayDownItem = document.querySelector(".display-down");
let displayUpItem = document.querySelector(".display-up");
displayDownItem.textContent = displayDown;
displayUpItem.textContent = displayUp;

let dotButton = document.getElementById("dotButton");

function populateDisplayDown(buttonValue){
      if (displayDownItem.textContent.length < 15) {
            if (displayDown == "0") {
                  displayDown = buttonValue;
                  displayDownItem.textContent = displayDown;
            } else {
                   displayDown = displayDownItem.textContent.concat(buttonValue);
                   displayDownItem.textContent = displayDown;
            }
      }
}

function clearDisplayDown() {
      displayDown = "";
      displayDownItem.textContent = displayDown;
}
function clearDisplayUp() {
      displayUp = "";
      displayUpItem.textContent = displayUp;
}

function clearAll() {
      clearDisplayDown();
      clearDisplayUp();
      firstNumber = "";
      secondNumber = "";
      operator = "";
      result = "";
      isOperatorAgain = false;
      dotButton.disabled = false;
}

function operatorToSign(operator) {
      switch (operator) {
            case "add":
                  return "+";
                  brake;
            case "subtract":
                  return "-";
                  brake;
            case "multiply":
                  return "*";
                  brake;
            case "divide":
                  return "/";
                  brake;
      }
}

function whenEqual() {
      result = String(operate(operator, firstNumber, secondNumber));
      displayDown = result;
      displayDownItem.textContent = displayDown;
      displayUp = `${firstNumber}${operatorToSign(operator)}${secondNumber}=`;
      displayUpItem.textContent = displayUp;
      isOperatorAgain = false;
      isOperatorBefore = false;
      firstNumber = "";
      secondNumber = "";
      operator = "";
      dotButton.disabled = false;
}

let buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {
      console.log(event.target.parentElement);
      if (event.target.parentElement.classList.contains("number") 
            && event.target.parentElement.id !== "dot") {
            let buttonValue = event.target.parentElement.id;
            if (isOperatorBefore == false) {
                  populateDisplayDown(buttonValue);
            } else {
                  clearDisplayDown();
                  isOperatorAgain = false;
                  populateDisplayDown(buttonValue);
                  isOperatorBefore = false;
            }
            
      } 
      // This one to make "back" button work when clicking on image as well. Image is child of button, that is child of div with target class.
      else if (event.target.parentElement.id == "back" 
            || event.target.parentElement.parentElement.id == "back") {
            if (displayDown.slice(-1) == ".") {
                  dotButton.disabled = false;
            }
            displayDown = displayDown.slice(0, -1);
            displayDownItem.textContent = displayDown;
            isOperatorBefore = false;
            isOperatorAgain = false;
      } 
      
      else if (event.target.parentElement.classList.contains("operation") 
            && event.target.parentElement.id !== 'equal') {
            if (firstNumber == "") {
                  isOperatorBefore = true;
                  if (displayDownItem.textContent == "") {
                        firstNumber = "0";
                  } else {
                        firstNumber = displayDownItem.textContent;
                  }
                  operator = event.target.parentElement.id;
                  displayUpItem.textContent = firstNumber + operatorToSign(operator);

            } else if (!isOperatorAgain) {
                  isOperatorBefore = true;
                  if (displayDown) {
                        secondNumber = displayDown;
                        isOperatorAgain = true;
                        firstNumber = String(operate(operator, firstNumber, secondNumber));
                        operator = event.target.parentElement.id;
                        displayUp = firstNumber.concat(operatorToSign(operator));
                        displayUpItem.textContent = displayUp;
                        secondNumber = "";
                        displayDown = firstNumber;
                        displayDownItem.textContent = displayDown;
                  } else {
                        isOperatorBefore = true;
                        operator = event.target.parentElement.id;
                        displayUp = displayUpItem.textContent.slice(0, -1).concat(operatorToSign(operator));
                        displayUpItem.textContent = displayUp;
                  }                     
            } else {
                  operator = event.target.parentElement.id;
                  displayUp = displayUpItem.textContent.slice(0, -1).concat(operatorToSign(operator));
                  displayUpItem.textContent = displayUp;
            }
      }
      else if (event.target.parentElement.id == 'AC') {
            clearAll();
      }
      else if (event.target.parentElement.classList.contains("operation") 
            && event.target.parentElement.id == 'equal') {
                  if (firstNumber && secondNumber) {
                        whenEqual();
                  } else if (firstNumber && !secondNumber) {
                        if (displayDown) {
                              secondNumber = displayDown;
                              whenEqual();
                        }
                  }
      }
      else if (event.target.parentElement.id == "percentage") {
            displayDown = precision(parseFloat(displayDownItem.textContent)/100, 12);
            displayDownItem.textContent = displayDown;
      }
      else if (event.target.parentElement.id == "plus-minus") {
            displayDown = displayDown * (-1);
            displayDownItem.textContent = displayDown;
      }
      else if (event.target.parentElement.id == "dot") {
            displayDown = `${displayDown}.`;
            displayDownItem.textContent = displayDown;
            event.target.disabled = true;
      }

})