let wholePart = 0;
let fractionPart = 0;
let stack = [];
let currentStep = 0;
let isConversionComplete = false;
let binaryResult = "";

function startConversion() {
    const decimalInput = parseFloat(document.getElementById("decimal-input").value);
    if (isNaN(decimalInput)) {
        alert("Please enter a valid decimal number");
        return;
    }

    wholePart = Math.floor(decimalInput);
    fractionPart = decimalInput - wholePart;

    // Reset all fields and variables
    stack = [];
    currentStep = 0;
    binaryResult = "";
    isConversionComplete = false;
    document.getElementById("operation-log").innerHTML = "";
    document.getElementById("division-visualization").innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Divisor</th>
                    <th>Dividend</th>
                    <th>Remainder</th>
                </tr>
            </thead>
            <tbody id="division-body">
            </tbody>
        </table>`;
    document.getElementById("binary-result").innerHTML = "";
    document.getElementById("stack-display").innerHTML = "";
    document.getElementById("pop-button").disabled = true;  // Disable pop button initially

    // Initialize operation log
    document.getElementById("operation-log").innerHTML += "Starting conversion...<br>";
}

function performNextStep() {
    if (wholePart > 0) {
        let remainder = wholePart % 2;
        stack.push(remainder);
        updateStackDisplay(stack);

        // Log operation and append to division-visualization table
        document.getElementById("operation-log").innerHTML += `Divide ${wholePart} by 2: remainder = ${remainder}<br>`;

        // Add row to the division process table with fixed divisor and dynamic dividend, remainder
        let divisionRow = `
            <tr>
                <td>2</td>
                <td>${wholePart}</td>
                <td>${remainder}</td>
            </tr>`;
        document.getElementById("division-body").innerHTML += divisionRow;

        // Update the whole part for the next step
        wholePart = Math.floor(wholePart / 2);
        currentStep++;
    } else if (currentStep > 0 && !isConversionComplete) {
        document.getElementById("operation-log").innerHTML += "Conversion complete! Click 'Pop' to retrieve the answer from the stack.<br>";
        isConversionComplete = true;
        document.getElementById("pop-button").disabled = false;  // Enable pop button after completion
    } else {
        alert("Please start the conversion by clicking the 'Convert' button.");
    }
}

function popStack() {
    if (stack.length > 0) {
        const poppedValue = stack.pop();
        binaryResult += poppedValue;  // Append the popped value to the end of the result
        document.getElementById("binary-result").innerHTML = `Binary Number: ${binaryResult}`;
        updateStackDisplay(stack);

        // If stack becomes empty, disable the Pop button
        if (stack.length === 0) {
            document.getElementById("pop-button").disabled = true;
            document.getElementById("operation-log").innerHTML += "Stack is empty. All elements popped.<br>";
        }
    } else {
        document.getElementById("operation-log").innerHTML += "Stack is empty. All elements popped.<br>";
    }
}

function updateStackDisplay(stack) {
    const stackDisplay = document.getElementById("stack-display");
    stackDisplay.innerHTML = "";  // Clear stack display
    // Display elements in stack (top to bottom)
    for (let i = stack.length - 1; i >= 0; i--) {
        stackDisplay.innerHTML += `<div class="stack-element">${stack[i]}</div>`;
    }
}

function goBack() {
    window.history.back();
}