let deque = []; // Changed variable name
let maxDequeSize = 0; // Changed variable name
let front = -1;
let rear = -1;
const dequeElement = document.getElementById('deque'); // Changed ID
const dequePlaceholder = document.getElementById('deque-placeholder'); // Changed ID
const instructionBox = document.getElementById('instruction-box');
const frontArrow = document.getElementById('front-arrow');
const rearArrow = document.getElementById('rear-arrow');
const frontPosition = document.getElementById('front-position');
const rearPosition = document.getElementById('rear-position');
const setSizeButton = document.getElementById('set-size-button');
const sizeInput = document.getElementById('size-input');
const maxDequeSizeDisplay = document.getElementById('max-deque-size'); // Changed ID
const elementInput = document.getElementById('element-input');

// Get Deque operation buttons
const addFrontButton = document.getElementById('add-front-button');
const addRearButton = document.getElementById('add-rear-button');
const removeFrontButton = document.getElementById('remove-front-button');
const removeRearButton = document.getElementById('remove-rear-button');

// Create empty deque boxes after setting size
function createEmptyDeque() { // Renamed function
    dequeElement.innerHTML = '';
    dequeElement.style.display = 'flex';
    dequePlaceholder.style.display = 'none';

    for (let i = 0; i < maxDequeSize; i++) {
        const dequeBar = document.createElement('div');
        dequeBar.classList.add('queue-bar'); // Reusing class name
        dequeBar.innerText = '';
        dequeElement.appendChild(dequeBar);

        // Add animation effect
        dequeBar.style.opacity = '0';
        setTimeout(() => {
            dequeBar.style.opacity = '1';
            dequeBar.style.transform = 'scale(1)';
        }, 50 * i);
    }

    // Enable input element and all operation buttons
    elementInput.disabled = false;
    addFrontButton.disabled = false;
    addRearButton.disabled = false;
    removeFrontButton.disabled = false;
    removeRearButton.disabled = false;
}

// MODIFIED: Improved arrow positioning (no logic change needed)
function updateArrowPositions() {
    if (front !== -1 && dequeElement.children[front]) {
        const frontElement = dequeElement.children[front];
        frontArrow.style.left = (frontElement.offsetLeft + frontElement.offsetWidth / 2) + 'px';
        frontArrow.style.display = 'flex';
    } else {
        frontArrow.style.display = 'none';
    }

    if (rear !== -1 && dequeElement.children[rear]) {
        const rearElement = dequeElement.children[rear];
        rearArrow.style.left = (rearElement.offsetLeft + rearElement.offsetWidth / 2) + 'px';
        rearArrow.style.display = 'flex';
    } else {
        rearArrow.style.display = 'none';
    }

    // If front and rear are at the same position, offset the text
    if (front === rear && front !== -1) {
        const frontText = frontArrow.querySelector('.front-arrow-text');
        const rearText = rearArrow.querySelector('.rear-arrow-text');
        frontText.style.left = '-25px';
        rearText.style.left = '25px';
    } else {
        const frontText = frontArrow.querySelector('.front-arrow-text');
        const rearText = rearArrow.querySelector('.rear-arrow-text');
        frontText.style.left = '0';
        rearText.style.left = '0';
    }
}


function updateDequeDisplay() { // Renamed function
    const dequeBars = dequeElement.children;

    for (let i = 0; i < maxDequeSize; i++) {
        if (i < dequeBars.length) {
            // Clear bars that are outside the current front/rear range
            dequeBars[i].innerText = '';
            dequeBars[i].style.fontWeight = 'normal'; // Reset style

            // Check if the index holds a valid element within the current deque
            // This assumes a linear representation where elements might exist outside front/rear
            // if we used shifting, but here we just assign to indices.
            // A cleaner way for linear: only fill between front and rear.
            if(front !== -1 && i >= front && i <= rear) {
                 dequeBars[i].innerText = deque[i] !== undefined ? deque[i] : ''; // Display if exists
                 dequeBars[i].style.fontWeight = 'bold';
            } else {
                 dequeBars[i].innerText = ''; // Explicitly clear others
            }
        }
    }

    updateFrontRearPositions();
    setTimeout(updateArrowPositions, 50); // Update arrows after display settles
}

// --- Deque Operation Functions ---

function addRearElement() {
    const elementVal = elementInput.value.trim();
    if (!elementVal) {
        alert('Please enter a valid element.');
        return;
    }

    // Check if deque is full at the rear
    if (rear >= maxDequeSize - 1) {
        alert('Deque is full at the rear.');
        return;
    }

    if (front === -1) { // If deque is initially empty
        front = 0;
        rear = 0;
    } else { // If deque is not empty
        rear++;
    }

    deque[rear] = elementVal;

    // Visual feedback
    if (dequeElement.children[rear]) {
        dequeElement.children[rear].classList.add('enqueued'); // Reusing class
        setTimeout(() => {
            if(dequeElement.children[rear]) { // Check if element still exists
               dequeElement.children[rear].classList.remove('enqueued');
            }
        }, 800);
    }

    updateDequeDisplay();
    elementInput.value = '';
    addInstruction(`Added "${elementVal}" at Rear (pos ${rear}).`);
}

function addFrontElement() {
    const elementVal = elementInput.value.trim();
    if (!elementVal) {
        alert('Please enter a valid element.');
        return;
    }

    if (front === -1) { // If deque is initially empty
        front = 0;
        rear = 0;
        deque[front] = elementVal;
    } else if (front > 0) { // If there is space at the beginning
        front--;
        deque[front] = elementVal;
    } else { // If front is already at 0 (and deque is not empty)
        alert('Deque is full at the front (linear array limitation).');
        return;
    }


    // Visual feedback
    if (dequeElement.children[front]) {
        dequeElement.children[front].classList.add('enqueued'); // Reusing class
        setTimeout(() => {
            if (dequeElement.children[front]) { // Check if element still exists
                dequeElement.children[front].classList.remove('enqueued');
            }
        }, 800);
    }

    updateDequeDisplay();
    elementInput.value = '';
    addInstruction(`Added "${elementVal}" at Front (pos ${front}).`);
}


function removeFrontElement() {
    if (front === -1) { // Check if deque is empty
        alert('Deque is empty. Cannot remove from front.');
        return;
    }

    const dequeuedElement = deque[front];
    const oldFront = front;
    deque[front] = undefined; // Clear the data conceptually

    // Visual feedback
     if (dequeElement.children[oldFront]) {
        dequeElement.children[oldFront].classList.add('dequeued'); // Reusing class
        // Keep the visual indication until the display updates naturally
        setTimeout(() => {
            if (dequeElement.children[oldFront]) {
                dequeElement.children[oldFront].classList.remove('dequeued');
                // updateDequeDisplay will clear the text if needed
            }
        }, 800); // Adjust timing if needed
    }


    if (front === rear) { // If it was the last element
        front = -1;
        rear = -1;
        // Optional: clear the array completely for memory
        // deque = new Array(maxDequeSize).fill(undefined);
    } else {
        front++;
    }

    updateDequeDisplay(); // Update display after changing front/rear
    addInstruction(`Removed "${dequeuedElement}" from Front (pos ${oldFront}).`);
}

function removeRearElement() {
    if (rear === -1) { // Check if deque is empty
        alert('Deque is empty. Cannot remove from rear.');
        return;
    }

    const dequeuedElement = deque[rear];
    const oldRear = rear;
    deque[rear] = undefined; // Clear the data conceptually


     // Visual feedback
     if (dequeElement.children[oldRear]) {
        dequeElement.children[oldRear].classList.add('dequeued'); // Reusing class
        setTimeout(() => {
             if (dequeElement.children[oldRear]) {
                dequeElement.children[oldRear].classList.remove('dequeued');
                 // updateDequeDisplay will clear the text if needed
             }
        }, 800); // Adjust timing if needed
    }


    if (front === rear) { // If it was the last element
        front = -1;
        rear = -1;
         // Optional: clear the array completely for memory
        // deque = new Array(maxDequeSize).fill(undefined);
    } else {
        rear--;
    }

    updateDequeDisplay(); // Update display after changing front/rear
    addInstruction(`Removed "${dequeuedElement}" from Rear (pos ${oldRear}).`);
}

// --- Helper Functions ---

function addInstruction(instruction) {
    const instructionElement = document.createElement('div');
    instructionElement.classList.add('instruction');
    instructionElement.innerText = `${instruction}`;
    instructionBox.appendChild(instructionElement);
    instructionBox.scrollTop = instructionBox.scrollHeight; // Auto-scroll
}

function updateFrontRearPositions() {
    frontPosition.innerText = front === -1 ? "-1" : front;
    rearPosition.innerText = rear === -1 ? "-1" : rear;
}

function setDequeSize() { // Renamed function
    const newSize = parseInt(sizeInput.value);
    if (isNaN(newSize) || newSize <= 0 || newSize > 20) { // Added upper limit check
        alert('Please enter a valid deque size (between 1 and 20).');
        return;
    }

    maxDequeSize = newSize;
    deque = new Array(maxDequeSize).fill(undefined); // Initialize array properly
    front = -1;
    rear = -1;
    maxDequeSizeDisplay.innerText = maxDequeSize;
    createEmptyDeque(); // Call renamed function
    updateDequeDisplay(); // Call renamed function
    sizeInput.value = '';
    addInstruction(`Deque size set to ${maxDequeSize}.`);
}

// Set up event listeners
setSizeButton.addEventListener('click', setDequeSize);
window.addEventListener('resize', updateArrowPositions);

// Add keyboard support for Enter key on element input (e.g., default to Add Rear)
elementInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !addRearButton.disabled) { // Check if button is enabled
        addRearElement();
    }
});

sizeInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        setDequeSize();
    }
});

function goBack() {
    window.history.back();
}

// Initial visual feedback setup (optional)
document.addEventListener('DOMContentLoaded', function() {
    sizeInput.style.animation = 'pulse 1.5s infinite';
    sizeInput.addEventListener('focus', function() {
        this.style.animation = 'none';
    });
});