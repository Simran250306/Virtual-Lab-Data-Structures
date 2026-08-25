class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            return "Underflow"; // Or throw an error
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }

    toArray() {
        return [...this.items];
    }
}

const myStack = new Stack();
const inputField = document.getElementById('inputString');
const pushBtn = document.getElementById('pushBtn');
const popBtn = document.getElementById('popBtn');
const resetBtn = document.getElementById('resetBtn');
const stackContainer = document.getElementById('stack');
const pushOperations = document.getElementById('pushOperations');
const popOperations = document.getElementById('popOperations');
const outputField = document.getElementById('output');

function updateStack() {
    stackContainer.innerHTML = '';
    myStack.toArray().forEach(item => {
        const stackItem = document.createElement('div');
        stackItem.className = 'stack-item';
        stackItem.innerText = item;
        stackContainer.appendChild(stackItem);
    });
}

async function addOperation(operationArea, message) {
    const op = document.createElement('div');
    op.innerText = message;
    operationArea.appendChild(op);

    // Wait for the DOM to update
    await new Promise(resolve => setTimeout(resolve, 0));

    operationArea.scrollTop = operationArea.scrollHeight;
    op.scrollIntoView({ behavior: 'smooth', block: 'end' });

}

pushBtn.addEventListener('click', async () => {
    const inputString = inputField.value;
    if (inputString) {
        pushBtn.disabled = true;

        for (let char of inputString) {
            myStack.push(char);
            await addOperation(pushOperations, `Pushed "${char}" onto the stack.`);
            updateStack();
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        inputField.value = '';
        popBtn.disabled = false;
    }
});

popBtn.addEventListener('click', async () => {
    if (!myStack.isEmpty()) {
        popBtn.disabled = true;
        let reversedString = '';
        while (!myStack.isEmpty()) {
            const poppedChar = myStack.pop();
            reversedString += poppedChar;
            await addOperation(popOperations, `Popped "${poppedChar}" from the stack.`);
            updateStack();
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        outputField.innerText = reversedString;
        pushBtn.disabled = false;
    }
});

resetBtn.addEventListener('click', () => {
    myStack.clear();
    outputField.innerText = '';
    pushOperations.innerHTML = '<h2>Push</h2>';
    popOperations.innerHTML = '<h2>Pop</h2>';
    updateStack();
    inputField.value = '';
    pushBtn.disabled = false;
    popBtn.disabled = true;
});

function goBack() {
    window.history.back();
}