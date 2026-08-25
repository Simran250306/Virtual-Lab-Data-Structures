let infixInput = "";
let stack = [];
let postfixExpression = [];
let step = 0;

function stackToString(stack){
    if(stack.length>0){
        return stack.join(" ") + " \u2190 top"; //Arrow unicode
    }
    return "";
}

function convertToPostfix() {
  infixInput = document.getElementById("infix-input").value;
  stack = [];
  postfixExpression = [];
  step = 0;
  
  // Set up the table header with an extra "Operation" column.
  document.getElementById("conversion-table").innerHTML = `
    <tr>
      <th>Input</th>
      <th>Stack</th>
      <th>Postfix Expression</th>
      <th>Operation</th>
    </tr>
    <tr>
      <td>${infixInput}</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  `;
  
  // Keep the original input in the input field
  document.getElementById("infix-input").value = infixInput;
}

function nextStep() {
  if (step < infixInput.length) {
    applyLogic();
  } else {
    let operation = "";
    // After processing all characters, pop remaining operators from the stack.
    while (stack.length > 0) {
      let operator = stack.pop();
      postfixExpression.push(operator);
      operation += `Popped ${operator} from stack; `;
      addTableRow(infixInput, stackToString(stack), postfixExpression.join(" "), operation);
    }
    showPopup("Conversion complete!");
  }
}

function applyLogic() {
  let currentChar = infixInput[step];
  if (currentChar === "") {
    showPopup("Invalid input");
    return;
  }
  // Highlight the current character (for visualization)
  highlightCurrentChar(step);
  let operation = "";
  
  if (isOperator(currentChar)) {
    // While the top of the stack is an operator with higher or equal precedence:
    while (
      stack.length > 0 &&
      isOperator(stack[stack.length - 1]) &&
      getPrecedence(stack[stack.length - 1]) >= getPrecedence(currentChar)
    ) {
      let operator = stack.pop();
      postfixExpression.push(operator);
      operation += `Popped ${operator} from stack; `;
      // Log the intermediate state after each pop
      addTableRow(infixInput.substring(0, step + 1), stackToString(stack), postfixExpression.join(" "), operation);
    }
    stack.push(currentChar);
    operation += `Pushed ${currentChar} to stack; `;
  } else if (currentChar === "(") {
    stack.push(currentChar);
    operation += `Pushed ( to stack; `;
  } else if (currentChar === ")") {
    // Pop until the matching '(' is found
    while (stack[stack.length - 1] !== "(") {
      let operator = stack.pop();
      postfixExpression.push(operator);
      operation += `Popped ${operator} from stack; `;
      addTableRow(infixInput.substring(0, step + 1), stackToString(stack), postfixExpression.join(" "), operation);
    }
    stack.pop(); // Remove the "("
    operation += `Popped ( from stack; `;
  } else {
    // Operand: add it directly to the postfix expression
    postfixExpression.push(currentChar);
    operation += `Added ${currentChar} to postfix expression; `;
  }
  
  // Log the state after processing the current character.
  addTableRow(infixInput.substring(0, step + 1), stackToString(stack), postfixExpression.join(" "), operation);
  step++;
  // Update the input field to show progress (optional)
  document.getElementById("infix-input").value = infixInput.substring(0, step);
}

function isOperator(char) {
  return char === "+" || char === "-" || char === "*" || char === "/";
}

function getPrecedence(char) {
  if (char === "+" || char === "-") {
    return 1;
  } else if (char === "*" || char === "/") {
    return 2;
  }
  return 0;
}

function addTableRow(input, stackContent, postfix, operation) {
  let tableRow = document.createElement("tr");
  tableRow.id = `step-${step}`;
  
  let inputCell = document.createElement("td");
  inputCell.id = `input-${step}`;
  inputCell.textContent = input;
  tableRow.appendChild(inputCell);
  
  let stackCell = document.createElement("td");
  stackCell.id = `stack-${step}`;
  stackCell.textContent = stackContent;
  tableRow.appendChild(stackCell);
  
  let postfixCell = document.createElement("td");
  postfixCell.id = `postfix-${step}`;
  postfixCell.textContent = postfix;
  tableRow.appendChild(postfixCell);
  
  let operationCell = document.createElement("td");
  operationCell.id = `operation-${step}`;
  operationCell.textContent = operation;
  tableRow.appendChild(operationCell);
  
  document.getElementById("conversion-table").appendChild(tableRow);
  scrollToBottom();   
}

function highlightCurrentChar(index) {
  let infixDisplayElement = document.getElementById("infix-input");
  let infixArray = infixInput.split("");
  let highlightedArray = infixArray.map((char, i) => {
    if (i === index) {
      return `<span style="background-color: #C6F7D0;">${char}</span>`;
    } else {
      return char;
    }
  });
  // If your input element cannot display HTML, consider using a separate display element (like a div)
  infixDisplayElement.innerHTML = highlightedArray.join("");
}

function showPopup(message) {
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup-container").style.display = "block";
  document.getElementById("final-postfix").textContent = postfixExpression.join(" ");
}

function closePopup() {
  document.getElementById("popup-container").style.display = "none";
}

function scrollToBottom() {
    const conversionBlock = document.querySelector(".conversion-block");
    if (conversionBlock) {
      conversionBlock.scrollTop = conversionBlock.scrollHeight;
    }
}

function clearConversion() {
    // Clear the input field
    const infixInput = document.getElementById("infix-input");
    if (infixInput) infixInput.value = "";

    // Clear the stack and postfix expression (assuming these are global)
    stack = [];
    postfixExpression = [];
    step = 0; // Reset step too!

    // Clear the table content
    const conversionTable = document.getElementById("conversion-table");
    if (conversionTable) {
        conversionTable.innerHTML = `
          <tr>
            <th>Input</th>
            <th>Stack</th>
            <th>Postfix Expression</th>
            <th>Operation</th>
          </tr>
        `;
    }

    // Clear the final postfix expression
    const finalPostfix = document.getElementById("final-postfix");
    if (finalPostfix) finalPostfix.textContent = ""; // Ensure final postfix is cleared

    // Also, clear the popup message and hide the popup container
    document.getElementById("popup-message").textContent = "";
    document.getElementById("popup-container").style.display = "none";

    // Call scrollToBottom if it exists (defensive check)
    if (typeof scrollToBottom === 'function') {
        scrollToBottom();
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const pushbtn = document.getElementById("pushbtn");
    if (pushbtn) {
        pushbtn.addEventListener("click", function() {
            window.history.back();
        });
    } else {
        console.error("Go Back button not found.");
    }

    const clearbtn = document.getElementById("clearbtn");
    if (clearbtn) {
        clearbtn.addEventListener("click", clearConversion);
    } else {
        console.error("Clear button not found.");
    }
});

function goBack() {
  window.history.back();
}