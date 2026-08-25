(function() {
    let postfixExpression = "";
    let stack = [];
    let evalSteps = [];
    let step = 0;

    // Get button elements
    const evaluateBtn = document.getElementById("evaluateBtn");
    const nextBtn = document.getElementById("nextBtn");
    const clearBtn = document.getElementById("clearBtn");
    const goBackButton = document.getElementById("goBackButton");

    // Attach event listeners
    evaluateBtn.addEventListener("click", startEvaluation);
    nextBtn.addEventListener("click", displayNextStep);
    clearBtn.addEventListener("click", clearEvaluation);
    goBackButton.addEventListener("click", () => window.history.back());

    function startEvaluation() {
        postfixExpression = document.getElementById("postfix-input").value.trim();

        if (!postfixExpression) {
            alert("Please enter a postfix expression.");
            return;
        }

        stack = [];
        evalSteps = [];
        step = 0;

        // Initialize and run the evaluation process
        evaluatePostfix();
    }

    function evaluatePostfix() {
        const tokens = postfixExpression.split(/\s+/);

        if (tokens.length === 0) {
            alert("Please enter a postfix expression.");
            return;
        }

        for (const token of tokens) {
            if (!isNaN(token)) {
                // Operand: push onto the stack
                stack.push(Number(token));
                evalSteps.push({
                    input: token,
                    stack: [...stack],
                    operation: ``, // No Operation when pushing operands
                });
            } else if (isOperator(token)) {
                // Operator: pop two operands, perform operation
                if (stack.length < 2) {
                    alert("Not enough operands for operator: " + token);
                    return;
                }
                const operand2 = stack.pop();
                const operand1 = stack.pop();
                let result;
                let evalString = `${operand1} ${token} ${operand2}`; //Create string to be displayed
                switch (token) {
                    case '+':
                        result = operand1 + operand2;
                        break;
                    case '-':
                        result = operand1 - operand2;
                        break;
                    case '*':
                        result = operand1 * operand2;
                        break;
                    case '/':
                        if (operand2 === 0) {
                            alert("Division by zero!");
                            return;
                        }
                        result = operand1 / operand2;
                        break;
                    default:
                        alert("Invalid operator: " + token);
                        return;
                }
                stack.push(result);
                evalSteps.push({
                    input: token,
                    stack: [...stack],
                    operation: `${evalString} = ${result}`, //String to be displayed
                });
            } else {
                alert("Invalid token: " + token);
                return;
            }
        }

        if (stack.length === 1) {
            evalSteps.push({
                input: "Result",
                stack: [...stack],
                operation: `Result = ${stack[0]}`,
            });
        } else {
            alert("Invalid postfix expression format.");
            return;
        }
        initializeTable(); // Build Table structure at this point.
    }

    function initializeTable() {
        const evaluationTable = document.getElementById("evaluation-table");
        evaluationTable.innerHTML = `
            <thead>
                <tr>
                    <th>Input</th>
                    <th>Stack</th>
                    <th>Postfix Evaluation</th>
                </tr>
            </thead>
            <tbody></tbody>`; //Clear table content

        nextBtn.disabled = false; //Enable Next Step Button
    }

    function displayNextStep() {
        if (step < evalSteps.length) {
            const stepData = evalSteps[step];
            addTableRow(stepData.input, stackToString(stepData.stack), stepData.operation);
            step++;

            if (step === evalSteps.length) {
                // Reaching the end
                nextBtn.disabled = true;
                const finalResult = evalSteps[step - 1].stack[0];

                document.getElementById("final-result").textContent = finalResult; // set final result
                showPopup("Evaluation Complete!");
            }

        }
    }

    function isOperator(token) {
        return ['+', '-', '*', '/'].includes(token);
    }
    //Function that converts Stack to Stack with a top tag
    function stackToString(stack){
        if(stack.length>0){
            return stack.join(" ") + " \u2190 top"; //Arrow unicode
        }
        return "";
    }
    function addTableRow(input, stackContent, operation) {
        const tableBody = document.querySelector("#evaluation-table tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${input}</td>
            <td>${stackContent}</td>
            <td>${operation}</td>
        `;
        tableBody.appendChild(row);
        scrollToBottom();
    }

    function showPopup(message) {
        document.getElementById("popup-message").textContent = message;
        document.getElementById("popup-container").style.display = "block";
    }

    function closePopup() {
        document.getElementById("popup-container").style.display = "none";
    }

    function scrollToBottom() {
        const evaluationBlock = document.querySelector(".evaluation-block");
        if (evaluationBlock) {
            evaluationBlock.scrollTop = evaluationBlock.scrollHeight;
        }
    }

    function clearEvaluation() {
        document.getElementById("postfix-input").value = "";
        stack = [];
        evalSteps = [];
        step = 0;

        const evaluationTable = document.getElementById("evaluation-table");
        evaluationTable.innerHTML = `
        <thead>
            <tr>
                <th>Input</th>
                <th>Stack</th>
                <th>Postfix Evaluation</th>
            </tr>
        </thead>
        <tbody>
        </tbody>`;
        document.getElementById("final-result").textContent = ""; // Clear final result
        closePopup();
        nextBtn.disabled = true;
    }
})()