function add(a, b) {
      return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
      return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
      return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
      if (b !== "0") {
            return parseFloat(a) / parseFloat(b);
      } else {
            return "ZeroDivision error!"
      }
      
}

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";
let display = 0;
let check = false;

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

let displayItem = document.querySelector(".display");
displayItem.textContent = display;

function populateDisplay(buttonValue){
      if (displayItem.textContent.length < 9) {
            if (display == "0") {
                  display = buttonValue;
                  displayItem.textContent = display;
            } else {
                  displayItem.textContent = displayItem.textContent.concat(buttonValue);
                  display = buttonValue;
            }
      }
}

function clearDisplay() {
      display = "";
      displayItem.textContent = display;
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

let buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {

      if (event.target.parentElement.classList.contains("number")) {
            let buttonValue = event.target.parentElement.id;
            if (check == false) {
                  populateDisplay(buttonValue);
            } else {
                  clearDisplay();
                  check = false;
                  populateDisplay(buttonValue);
            }
            
      } 
      // This one to make "back" button work when clicking on image as well. Image is child of button, that is child of div with target class.
      else if (event.target.parentElement.id == "back" || event.target.parentElement.parentElement.id == "back") {
            display = display.slice(0, -1);
            displayItem.textContent = display;
      } 
      
      else if (event.target.parentElement.classList.contains("operation") && event.target.parentElement.id !== 'equal') {
            if (firstNumber == "") {
                  firstNumber = display;
                  operator = event.target.parentElement.id;
                  displayItem.textContent = display + operatorToSign(operator);
                  console.log("event: 1");
                  console.log(display);
                  console.log(firstNumber);
                  console.log(secondNumber);
                  console.log(operator);
                  console.log(check);
            } else {
                  secondNumber = display;
                  check = true;
                  console.log("event: 2a");
                  console.log(display);
                  console.log(firstNumber);
                  console.log(secondNumber);
                  console.log(operator);   
                  firstNumber = operate(operator, firstNumber, secondNumber);
                  display = firstNumber;
                  secondNumber = "";
                  operator = event.target.parentElement.id;
                  displayItem.textContent = display + operatorToSign(operator);
                  console.log("event: 2b");
                  console.log(display);
                  console.log(firstNumber);
                  console.log(secondNumber);
                  console.log(operator);   
                  }                     
      }
})