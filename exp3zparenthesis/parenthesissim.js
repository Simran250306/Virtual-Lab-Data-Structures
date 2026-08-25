let expressionInput = "";
let stack = [];
let step = 0;
let isBalanced = true;
let conversionComplete = false; // Flag to prevent further rows

function stackToString(stack) {
    if (stack.length > 0) {
        return stack.join(" ") + " \u2190 top"; //Arrow unicode
    }
    return "";
}

function checkParentheses() {
    expressionInput = document.getElementById("expression-input").value;
    stack = [];
    step = 0;
    isBalanced = true; // Reset the isBalanced flag
    conversionComplete = false; // Reset the conversionComplete flag

    // Set up the table header
    document.getElementById("checking-table").innerHTML = `
    <tr>
      <th>Input</th>
      <th>Stack</th>
      <th>Action</th>
    </tr>
    <tr>
      <td>${expressionInput}</td>
      <td></td>
      <td></td>
    </tr>
  `;

    // Keep the original input in the input field
    document.getElementById("expression-input").value = expressionInput;
}

function nextStep() {
    if (conversionComplete) return; // Prevent further steps after completion

    if (step < expressionInput.length && isBalanced) {
        applyLogic();
    } else {
        let action = "";
        if (stack.length === 0 && isBalanced) {
            action = "Parentheses are balanced.";
            showPopup("Parentheses are balanced.");
        } else {
            action = "Parentheses are not balanced.";
            showPopup("Parentheses are not balanced.");
        }
        addTableRow(expressionInput, stackToString(stack), action);
        conversionComplete = true; // Set the flag to prevent further steps
    }
}

function applyLogic() {
    if (conversionComplete) return; // Prevent further logic after completion

    let currentChar = expressionInput[step];

    let action = "";

    if (currentChar === '(' || currentChar === '{' || currentChar === '[') {
        stack.push(currentChar);
        action = `Pushed ${currentChar} onto the stack.`;
    } else if (currentChar === ')' || currentChar === '}' || currentChar === ']') {
        if (stack.length === 0) {
            isBalanced = false;
            action = `Unmatched closing parenthesis ${currentChar}.`;
        } else {
            let top = stack.pop();
            if ((currentChar === ')' && top !== '(') ||
                (currentChar === '}' && top !== '{') ||
                (currentChar === ']' && top !== '[')) {
                isBalanced = false;
                action = `Mismatched parentheses: ${top} and ${currentChar}.`;
            } else {
                action = `Matched ${top} with ${currentChar}, popped from stack.`;
            }
        }
    } else {
        action = `Ignoring character ${currentChar}.`;
    }

    addTableRow(expressionInput.substring(0, step + 1), stackToString(stack), action);
    step++;

    document.getElementById("expression-input").value = expressionInput.substring(0, step);
}

function addTableRow(input, stackContent, action) {
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

    let actionCell = document.createElement("td");
    actionCell.id = `action-${step}`;
    actionCell.textContent = action;
    tableRow.appendChild(actionCell);

    document.getElementById("checking-table").appendChild(tableRow);
    scrollToBottom();
}

function showPopup(message) {
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup-container").style.display = "block";
    document.getElementById("final-result").textContent = message;
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
    const expressionInput = document.getElementById("expression-input");
    if (expressionInput) expressionInput.value = "";

    // Clear the stack and table content (assuming these are global)
    stack = [];
    step = 0;
    isBalanced = true;
    conversionComplete = false;

    // Clear the table content
    const checkingTable = document.getElementById("checking-table");
    if (checkingTable) {
        checkingTable.innerHTML = `
          <tr>
            <th>Input</th>
            <th>Stack</th>
            <th>Action</th>
          </tr>
        `;
    }

    // Clear the final result
    const finalResult = document.getElementById("final-result");
    if (finalResult) finalResult.textContent = ""; // Ensure final result is cleared

    document.getElementById("popup-message").textContent = ""; //Ensure popup is cleared
    document.getElementById("popup-container").style.display = "none"; //Ensure popup is closed

    // Call scrollToBottom if it exists (defensive check)
    if (typeof scrollToBottom === 'function') {
        scrollToBottom();
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const pushbtn = document.getElementById("pushbtn");
    if (pushbtn) {
        pushbtn.addEventListener("click", function () {
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