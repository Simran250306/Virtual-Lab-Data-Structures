// Circular Queue simulator logic - Circular Layout Version
let queue = [];
let maxQueueSize = 0;
let front = -1;
let rear = -1;
const queueContainer = document.querySelector('.queue-container.circular-layout'); // Target the specific container
const queueElement = document.getElementById('queue'); // Parent for bars
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

// --- Core Queue Logic (same as linear circular queue) ---
function isFull() {
    if (maxQueueSize <= 0) return false;
    return (rear + 1) % maxQueueSize === front;
}

function isEmpty() {
    return front === -1;
}

// --- NEW: Layout Calculation and Update Function ---
function updateCircularLayout() {
    if (!queueContainer || maxQueueSize <= 0) return;

    const containerWidth = queueContainer.offsetWidth;
    const containerHeight = queueContainer.offsetHeight;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    // Adjust radius multiplier (e.g., 0.8) to leave space from edge
    const radius = Math.min(centerX, centerY) * 0.8;
    const arrowRadialOffset = -40;
    const bars = queueElement.children;

    // Position Queue Bars
    for (let i = 0; i < maxQueueSize; i++) {
        if (!bars[i]) continue; // Skip if bar doesn't exist

        const angle = ((i / maxQueueSize) * 2 * Math.PI) - (Math.PI / 2); // Start from top (-90 deg)
        const barWidth = bars[i].offsetWidth;
        const barHeight = bars[i].offsetHeight;

        // Calculate position (center of the bar)
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Apply position (adjusting for bar size to center it)
        bars[i].style.left = `${x - barWidth / 2}px`;
        bars[i].style.top = `${y - barHeight / 2}px`;

        // Apply rotation (optional: make bars point outwards/tangential)
        const rotationDegrees = (angle * 180 / Math.PI) + 90; // +90 to make bottom face center
        bars[i].style.transform = `rotate(${rotationDegrees}deg)`;

        // Update content and style based on queue state
        bars[i].innerText = queue[i] !== null ? queue[i] : '';
        if (queue[i] === null) {
            bars[i].classList.add('empty-slot');
            bars[i].setAttribute('data-index', i); // Show index on empty slots
        } else {
            bars[i].classList.remove('empty-slot');
            bars[i].removeAttribute('data-index');
        }

        // Clear dequeued animation class if present
        if (!bars[i].classList.contains('dequeued-animation')) {
             bars[i].classList.remove('dequeued');
        }
    }

    // Position Arrows
    positionCircularArrow(frontArrow, front, radius, centerX, centerY, -25); // Offset front arrow slightly out
    positionCircularArrow(rearArrow, rear, radius, centerX, centerY, 5);   // Offset rear arrow slightly in (or adjust)

     // Handle arrow overlap when front === rear
     if (front !== -1 && front === rear) {
        // Overlapping case: Offset slightly by angle
        positionCircularArrow(frontArrow, front, radius, centerX, centerY, arrowRadialOffset);      // Use defined offset
        positionCircularArrow(rearArrow, rear, radius, centerX, centerY, arrowRadialOffset, 0.1); // Same radial offset, slight angle shift
    } else {
        // Standard positioning when not overlapping
        positionCircularArrow(frontArrow, front, radius, centerX, centerY, arrowRadialOffset);      // Use defined offset
        positionCircularArrow(rearArrow, rear, radius, centerX, centerY, arrowRadialOffset);      // Use defined offset
    }
}

function positionCircularArrow(arrowElement, index, radius, centerX, centerY, radiusOffset = 0, angleOffset = 0) {
    if (!arrowElement) return;

    if (index === -1) {
        arrowElement.style.display = 'none';
        return;
    }

    const arrowRadius = radius + radiusOffset; // Position arrow outside/inside the element circle
    const angle = ((index / maxQueueSize) * 2 * Math.PI) - (Math.PI / 2) + angleOffset; // Start from top + offset
    const arrowWidth = arrowElement.offsetWidth;
    const arrowHeight = arrowElement.offsetHeight;

    const x = centerX + arrowRadius * Math.cos(angle);
    const y = centerY + arrowRadius * Math.sin(angle);

    arrowElement.style.left = `${x - arrowWidth / 2}px`;
    arrowElement.style.top = `${y - arrowHeight / 2}px`;

    // Rotate arrow to point towards the center (or adjust as needed)
    const rotationDegrees = (angle * 180 / Math.PI) + 90; // +90 points 'bottom' of arrow towards center
    arrowElement.style.transform = `rotate(${rotationDegrees}deg)`;

    arrowElement.style.display = 'flex';
}


// --- UI Update Functions (Modified) ---

function createEmptyQueue() {
    queueElement.innerHTML = ''; // Clear previous bars
    queuePlaceholder.style.display = 'none'; // Hide placeholder
    queueElement.style.display = 'block'; // Ensure parent is visible

    for (let i = 0; i < maxQueueSize; i++) {
        const queueBar = document.createElement('div');
        queueBar.classList.add('queue-bar');
        // Set initial opacity for fade-in, positioning happens in updateCircularLayout
        queueBar.style.opacity = '0';
        queueElement.appendChild(queueBar); // Append to the queue div

        // Staggered fade-in animation
        setTimeout(() => {
            queueBar.style.opacity = '1';
        }, 50 * i + 100); // Delay fade-in slightly
    }

    // Enable controls
    elementInput.disabled = false;
    enqueueButton.disabled = false;
    dequeueButton.disabled = false;

    // Reset queue state
    queue = new Array(maxQueueSize).fill(null);
    front = -1;
    rear = -1;

    // Initial layout calculation
    // Use setTimeout to allow elements to render before calculating layout
    setTimeout(() => {
        updateCircularLayout();
        updateFrontRearPositions(); // Update text displays
    }, 50); // Short delay

    // Clear and add initial instruction
    instructionBox.innerHTML = '';
    addInstruction(`Circular Queue (Size ${maxQueueSize}) Ready.`);
}

// Combined update function called after operations
function updateDisplayAndLayout() {
    updateFrontRearPositions();
    updateCircularLayout(); // Recalculate and apply layout/styles
}

function addInstruction(instructionText) {
    const instructionElement = document.createElement('div');
    instructionElement.classList.add('instruction');
    instructionElement.innerText = `${instructionText}`;
    instructionBox.appendChild(instructionElement);
    instructionBox.scrollTop = instructionBox.scrollHeight;
}

function updateFrontRearPositions() {
    frontPosition.innerText = front;
    rearPosition.innerText = rear;
}

// --- Event Handler Functions (Modified for Layout Updates) ---

function setQueueSize() {
    // CHANGE: Limit max size for better visuals in circular layout
    const maxSizeLimit = 12;
    const newSize = parseInt(sizeInput.value);

    if (isNaN(newSize) || newSize <= 0 || newSize > maxSizeLimit) {
        alert(`Please enter a valid queue size (between 1 and ${maxSizeLimit}).`);
        sizeInput.value = '';
        sizeInput.focus();
        return;
    }
    maxQueueSize = newSize;
    maxQueueSizeDisplay.innerText = maxQueueSize;
    createEmptyQueue(); // Resets and creates layout
    sizeInput.value = '';
    sizeInput.style.animation = 'none';
    elementInput.focus();
}

function enqueueElement() {
    if (maxQueueSize <= 0) { /* ... (validation remains same) ... */ }
    const elementVal = elementInput.value.trim();
    if (!elementVal) { /* ... */ return; }
    if (isFull()) { /* ... */ return; }

    if (isEmpty()) {
        front = 0;
        rear = 0;
    } else {
        rear = (rear + 1) % maxQueueSize;
    }
    queue[rear] = elementVal;

    // Visual feedback - Add class, remove later
    const targetBar = queueElement.children[rear];
    if (targetBar) {
        targetBar.classList.add('enqueued');
        setTimeout(() => {
             if(targetBar) targetBar.classList.remove('enqueued'); // Check existence
        }, 800);
    }

    updateDisplayAndLayout(); // Update layout AFTER internal state change
    elementInput.value = '';
    elementInput.focus();
    addInstruction(`Enqueued "${elementVal}" at index ${rear}. Front: ${front}, Rear: ${rear}.`);
}

function dequeueElement() {
    if (maxQueueSize <= 0) { /* ... */ }
    if (isEmpty()) { /* ... */ return; }

    const dequeuedElement = queue[front];
    const oldFront = front;

    // Visual feedback
    const targetBar = queueElement.children[oldFront];
    if (targetBar) {
        targetBar.classList.add('dequeued'); // Style as dequeued
        targetBar.classList.add('dequeued-animation'); // Temp class
    }

    // Delay state update and layout recalculation
    setTimeout(() => {
        queue[oldFront] = null; // Update internal state

        let instruction = `Dequeued "${dequeuedElement}" from index ${oldFront}. `;
        if (front === rear) { // Was last element
            front = -1;
            rear = -1;
            instruction += `Queue is now empty.`;
        } else {
            front = (front + 1) % maxQueueSize; // Move front
            instruction += `New Front: ${front}, Rear: ${rear}.`;
        }

        addInstruction(instruction);
        updateDisplayAndLayout(); // Update layout AFTER state change

    }, 600); // Adjust timing as needed
}


function goBack() {
    window.history.back();
}

// --- Event Listeners Setup ---
setSizeButton.addEventListener('click', setQueueSize);
sizeInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') setQueueSize(); });
elementInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') enqueueElement(); });

// Recalculate layout on window resize
window.addEventListener('resize', () => {
    if (maxQueueSize > 0) {
        // Debounce resize event slightly
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(updateCircularLayout, 200);
    }
});

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    queuePlaceholder.style.display = 'block'; // Show placeholder initially
    queueElement.style.display = 'none'; // Hide queue elements initially
    if (maxQueueSize === 0) {
        sizeInput.style.animation = 'pulse 1.5s infinite';
    }
    sizeInput.addEventListener('focus', () => { sizeInput.style.animation = 'none'; });
    addInstruction("Welcome! Set Circular Queue size (max 12) to begin.");
});