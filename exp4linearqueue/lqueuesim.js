let queue = [];
let maxQueueSize = 0;
let front = -1;
let rear = -1;
const queueElement = document.getElementById('queue');
const queuePlaceholder = document.getElementById('queue-placeholder');
const instructionBox = document.getElementById('instruction-box');
const frontArrow = document.getElementById('front-arrow');
const rearArrow = document.getElementById('rear-arrow');
const frontPosition = document.getElementById('front-position');
const rearPosition = document.getElementById('rear-position');
const setSizeButton = document.getElementById('set-size-button');
const sizeInput = document.getElementById('size-input');
const maxQueueSizeDisplay = document.getElementById('max-queue-size');
const elementInput = document.getElementById('element-input');
const enqueueButton = document.getElementById('enqueue-button');
const dequeueButton = document.getElementById('dequeue-button');

// Create empty queue boxes after setting size
function createEmptyQueue() {
    queueElement.innerHTML = '';
    queueElement.style.display = 'flex';
    queuePlaceholder.style.display = 'none';
    
    for (let i = 0; i < maxQueueSize; i++) {
        const queueBar = document.createElement('div');
        queueBar.classList.add('queue-bar');
        queueBar.innerText = '';
        queueElement.appendChild(queueBar);
        
        // Add animation effect
        queueBar.style.opacity = '0';
        setTimeout(() => {
            queueBar.style.opacity = '1';
            queueBar.style.transform = 'scale(1)';
        }, 50 * i);
    }

    // Enable input elements
    elementInput.disabled = false;
    enqueueButton.disabled = false;
    dequeueButton.disabled = false;
}

// MODIFIED: Improved arrow positioning to prevent overlap
function updateArrowPositions() {
    if (front !== -1 && queueElement.children[front]) {
        const frontElement = queueElement.children[front];
        const rect = frontElement.getBoundingClientRect();
        const queueRect = queueElement.getBoundingClientRect();
        
        // Center the front arrow over the element
        frontArrow.style.left = (frontElement.offsetLeft + frontElement.offsetWidth / 2) + 'px';
        frontArrow.style.display = 'flex';
    } else {
        frontArrow.style.display = 'none';
    }

    if (rear !== -1 && queueElement.children[rear]) {
        const rearElement = queueElement.children[rear];
        
        // Center the rear arrow under the element
        rearArrow.style.left = (rearElement.offsetLeft + rearElement.offsetWidth / 2) + 'px';
        rearArrow.style.display = 'flex';
    } else {
        rearArrow.style.display = 'none';
    }

    // If front and rear are at the same position, offset the text to prevent overlap
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

function updateQueueDisplay() {
    // Update queue content
    const queueBars = queueElement.children;
    
    for (let i = 0; i < maxQueueSize; i++) {
        if (i < queueBars.length) {
            if (i >= front && i <= rear && front !== -1) {
                queueBars[i].innerText = queue[i];
                queueBars[i].style.fontWeight = 'bold';
            } else {
                queueBars[i].innerText = '';
            }
        }
    }
    
    updateFrontRearPositions();
    
    // Delay the arrow update slightly to ensure smooth animation
    setTimeout(updateArrowPositions, 50);
}

function enqueueElement() {
    const elementVal = elementInput.value.trim();
    if (!elementVal) {
        alert('Please enter a valid element.');
        return;
    }

    if (rear >= maxQueueSize - 1) {
        alert('Queue is full. Dequeue an element first.');
        return;
    }

    if (front === -1) {
        front = 0;
    }

    rear++;
    queue[rear] = elementVal;
    
    // Visual feedback for enqueue
    if (queueElement.children[rear]) {
        queueElement.children[rear].classList.add('enqueued');
        setTimeout(() => {
            queueElement.children[rear].classList.remove('enqueued');
        }, 800);
    }
    
    updateQueueDisplay();
    elementInput.value = '';
    addInstruction(`Enqueued "${elementVal}" at position ${rear}.`);
}

function dequeueElement() {
    if (front === -1 || front > rear) {
        alert('Queue is empty. Cannot dequeue.');
        return;
    }

    const dequeuedElement = queue[front];
    const oldFront = front;
    
    // Visual feedback for dequeue
    if (queueElement.children[front]) {
        queueElement.children[front].classList.add('dequeued');
        setTimeout(() => {
            if (queueElement.children[oldFront]) {
                queueElement.children[oldFront].classList.remove('dequeued');
            }
        }, 800);
    }

    if (front === rear) {
        // Last element in the queue
        front = rear = -1;
        queue = [];
    } else {
        front++;
    }

    updateQueueDisplay();
    addInstruction(`Dequeued "${dequeuedElement}" from position ${oldFront}.`);
}

function addInstruction(instruction) {
    const instructionElement = document.createElement('div');
    instructionElement.classList.add('instruction');
    instructionElement.innerText = `${instruction}`;
    instructionBox.appendChild(instructionElement);
    
    // Auto-scroll to the latest instruction
    instructionBox.scrollTop = instructionBox.scrollHeight;
}

function updateFrontRearPositions() {
    frontPosition.innerText = front === -1 ? "-1" : front;
    rearPosition.innerText = rear === -1 ? "-1" : rear;
}

function setQueueSize() {
    const newSize = parseInt(sizeInput.value);
    if (isNaN(newSize) || newSize <= 0) {
        alert('Please enter a valid queue size (greater than 0).');
        return;
    }

    maxQueueSize = newSize;
    queue = [];
    front = -1;
    rear = -1;
    maxQueueSizeDisplay.innerText = maxQueueSize;
    createEmptyQueue();
    updateQueueDisplay();
    sizeInput.value = '';
    addInstruction(`Queue size set to ${maxQueueSize}.`);
}

// Set up event listeners
setSizeButton.addEventListener('click', setQueueSize);
window.addEventListener('resize', updateArrowPositions);

// Add keyboard support
elementInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        enqueueElement();
    }
});

sizeInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        setQueueSize();
    }
});

function goBack() {
    window.history.back();
}

// Add some visual feedback animations
document.addEventListener('DOMContentLoaded', function() {
    // Pulse the size input to draw attention
    sizeInput.style.animation = 'pulse 1.5s infinite';
    
    // Remove animation when focused
    sizeInput.addEventListener('focus', function() {
        this.style.animation = 'none';
    });
});