let stack = [];
        let maxStackSize = null; // Initialize max stack size
        let actions = [];
        let topPointerPosition = -1;

        function setStackSize() {
            const sizeInput = document.getElementById("stack-size-input");
            const size = parseInt(sizeInput.value);
            if (size > 0) {
                maxStackSize = size;
                actions.push(`Stack size set to ${maxStackSize}`);
                updateActionsBox();
                sizeInput.value = ""; // Clear input
                renderStack(); // Re-render stack to show empty boxes if any
            } else {
                actions.push("Please enter a valid stack size.");
                alert("Please enter a valid stack size.");
                updateActionsBox();
            }
        }

        function renderStack() {
            const stackContainer = document.getElementById("stack");
            stackContainer.innerHTML = '<div id="top-indicator" class="top-pointer">→</div>'; // Keep the top pointer
            let stackHeight = 0;
            if (maxStackSize !== null) {
                stackHeight = maxStackSize * 50;
            }
            stackContainer.style.height = `${stackHeight}px`

            // Create empty stack boxes
            for (let i = 0; i < maxStackSize; i++) {
                const stackBox = document.createElement("div");
                stackBox.className = "stack-box";
                stackBox.setAttribute("id", `stack-box-${i}`)
                if (stack[i]) {
                    stackBox.textContent = stack[i];
                } else {
                    stackBox.textContent = "";
                }
                stackContainer.prepend(stackBox); // Add to the beginning for bottom-up display
            }

            updateTopPointer();
        }

        function updateTopPointer() {
            const topIndicator = document.getElementById("top-indicator");

            if (stack.length > 0) {
                topIndicator.style.display = "block"; // Show the pointer
                const topElementIndex = stack.length - 1;
                // topPointerPosition = topElementIndex * 50;

                const stackBox = document.getElementById(`stack-box-${topElementIndex}`);
                topIndicator.style.top = `${stackBox.offsetTop + stackBox.offsetHeight/2}px`;
                // topIndicator.style.transform = `translateY(-${topPointerPosition}px)`; // Position the pointer

            } else {
                topIndicator.style.display = "none"; // Hide the pointer if stack is empty
            }
        }

        function pushElement() {
            if (maxStackSize === null) {
                actions.push("Please set the stack size first.");
                alert("Please set the stack size first.");
                updateActionsBox();
                return;
            }
            if (stack.length < maxStackSize) {
                const elementInput = document.getElementById("element-input");
                const element = elementInput.value;
                if (element) {
                    stack.push(element);
                    elementInput.value = "";
                    actions.push(`Pushed element ${element}`);
                    renderStack();
                    updateActionsBox();
                }
            } else {
                actions.push("Stack overflow - Cannot push more elements.");
                alert("Stack overflow - Cannot push more elements.");
                updateActionsBox();
            }
        }

        function popElement() {
            if (maxStackSize === null) {
                actions.push("Please set the stack size first.");
                alert("Please set the stack size first.");
                updateActionsBox();
                return;
            }
            if (stack.length > 0) {
                const poppedElement = stack.pop();
                actions.push(`Popped element ${poppedElement}`);
                renderStack();
                updateActionsBox();
            } else {
                actions.push("Stack underflow - Cannot pop an empty stack.");
                alert("Stack underflow - Cannot pop an empty stack.");
                updateActionsBox();
            }
        }

        function peekElement() {
            const peekBox = document.getElementById("peek-box");
            if (stack.length > 0) {
                const topElement = stack[stack.length - 1];
                peekBox.textContent = `Top element: ${topElement}`;
                peekBox.style.backgroundColor = "#fff"; // Optional: Change the background color when peeking
            } else {
                peekBox.textContent = "Stack is empty";
                peekBox.style.backgroundColor = "#f0f0f0"; // Reset the background color if stack is empty
            }
        }

        function updateActionsBox() {
            const actionsBox = document.getElementById("actions-box");
            actionsBox.textContent = actions.join(' \n ');
            actionsBox.scrollTop = actionsBox.scrollHeight;
        }

        function goBack() {
            window.history.back();
        }
        function resetStack() {
            stack.length = 0; // Clear the stack array
            actions.length = 0; // Clear the actions array
            renderStack(); // Re-render the stack
            updateActionsBox(); // Update actions display
            updateTopPointer(); // Update top pointer display
        }

        // Initialize the stack when the page loads
        window.onload = renderStack;