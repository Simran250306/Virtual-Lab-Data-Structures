// --- Singly Linked List Node ---
class Node {
    constructor(data) {
        this.data = data;
        this.next = null; // Only next pointer
    }
}

// --- Singly Linked List Class ---
class LinkedList {
    constructor() {
        this.head = null; // Start pointer always refers to head
        // Get container reference later in case DOM isn't ready yet
        this.logEntriesContainer = null;
        this.nodeWidth = 140; // Default node width from CSS
        this.nodeMargin = 10; // Default node margin from CSS
        this.diagramPaddingLeft = 15; // Default diagram padding
        // Update sizes based on media queries if needed, maybe on resize event
    }

    // Ensure log container is available
    ensureLogContainer() {
        if (!this.logEntriesContainer) {
            this.logEntriesContainer = document.querySelector('#operationLog .log-entries');
        }
    }

    // Logs operation message
    addLog(message) {
        this.ensureLogContainer();
        if (!this.logEntriesContainer) {
            console.error("Log container not found!");
            return; // Exit if container still not found
        }
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        // Prepend new log entries
        this.logEntriesContainer.insertBefore(logEntry, this.logEntriesContainer.firstChild);

        const maxLogEntries = 50; // Keep log size manageable
        while (this.logEntriesContainer.childElementCount > maxLogEntries) {
             this.logEntriesContainer.removeChild(this.logEntriesContainer.lastChild);
        }
         // Scroll to top might not be needed if prepending
         // this.logEntriesContainer.scrollTop = 0;
    }

    highlightNode(nodeIndex, duration = 1000) {
        const nodes = document.querySelectorAll('.diagram .node'); // Be more specific
        if (nodeIndex < 0 || nodeIndex >= nodes.length) return;

        const nodeElement = nodes[nodeIndex];
        nodeElement.classList.add('node-highlight');
        // Styles applied by the class now, direct style manipulation removed
        // nodeElement.style.borderColor = '#dc3545';
        // nodeElement.style.boxShadow = '0 0 12px 2px #dc3545';

        setTimeout(() => {
            // Check if node still exists before removing class
            if (nodeElement && nodeElement.parentNode) {
                nodeElement.classList.remove('node-highlight');
                // nodeElement.style.borderColor = ''; // Reset by class removal
                // nodeElement.style.boxShadow = '';
            }
        }, duration);
    }

    // Async helper for delays
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Async function to highlight path sequentially
    async highlightPath(indices, stepDelay = 350) {
        if (!indices || indices.length === 0) return;
        const diagramNodes = document.querySelectorAll('.diagram .node'); // Get nodes once

        for (let i = 0; i < indices.length; i++) {
            const nodeIndex = indices[i];
            if(nodeIndex >= 0 && nodeIndex < diagramNodes.length) {
               // Use the highlight function which uses CSS class
               this.highlightNode(nodeIndex, stepDelay + 100); // Highlight a bit longer than delay
            }
            // Add delay even if node wasn't found to maintain timing
            await this.delay(stepDelay);
        }
    }


    // --- Simplified Insertion Operations (Singly) ---
    async insertAtBeginning(data) {
        const newNode = new Node(data);
        newNode.next = this.head; // New node points to old head
        this.head = newNode;      // Head points to new node
        this.render();
        this.highlightNode(0); // Highlight the new first node
        await this.delay(200); // Small delay after render/highlight
        this.addLog(`Inserted ${data} at beginning.`);
    }

    async insertAtEnd(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            await this.insertAtBeginning(data); // Use existing async method
            return; // Important to return here
        }

        let current = this.head;
        let index = 0;
        let pathIndices = [];
        while (current.next !== null) { // Traverse to the second-to-last node
             pathIndices.push(index);
             current = current.next;
             index++;
        }
        pathIndices.push(index); // Add index of the last node before insertion

        await this.highlightPath(pathIndices); // Highlight path to last node

        current.next = newNode; // Link last node to new node
        this.render(); // Re-render the list
        this.highlightNode(index + 1); // Highlight the newly added node
        await this.delay(200);
        this.addLog(`Inserted ${data} at end (index ${index + 1}).`);
    }

    async insertAfterIndex(data, index) {
         // Index validation happens in the calling function now
         let current = this.head;
         let currentIndex = 0;
         let pathIndices = [];

         // Traverse to the node AT the specified index
         while (currentIndex < index && current !== null) {
             pathIndices.push(currentIndex);
             current = current.next;
             currentIndex++;
         }

         // Check if index is valid or list is too short
         if (current === null) {
             this.addLog(`Error: Index ${index} out of bounds.`);
             return;
         }

         pathIndices.push(currentIndex); // Add index of the node we are inserting after
         await this.highlightPath(pathIndices); // Highlight path up to insertion point

         const newNode = new Node(data);
         newNode.next = current.next; // New node points to what current was pointing to
         current.next = newNode;      // Current node points to new node

         this.render();
         this.highlightNode(index + 1); // Highlight the new node
         await this.delay(200);
         this.addLog(`Inserted ${data} after index ${index}.`);
    }

    // --- Simplified Deletion Operations (Singly) ---
    async deleteAtBeginning() {
         if (!this.head) {
             this.addLog("Error: List is empty. Cannot delete from beginning.");
             return;
         }
         const deletedValue = this.head.data;
         this.highlightNode(0, 1100); // Highlight the node being deleted
         await this.delay(1100); // Wait for highlight animation

         this.head = this.head.next; // Simply move head pointer
         this.render(); // Re-render the list
         this.addLog(`Deleted node ${deletedValue} from beginning.`);
     }

    async deleteAtEnd() {
         if (!this.head) {
             this.addLog("Error: List is empty. Cannot delete from end.");
             return;
         }
         if (!this.head.next) { // Only one node in the list
             await this.deleteAtBeginning(); // Use the beginning deletion logic
             return;
         }

         let current = this.head;
         let previous = null;
         let index = 0;
         let pathIndices = [];

         // Traverse to find the second-to-last node
         while (current.next !== null) {
             pathIndices.push(index);
             previous = current;
             current = current.next;
             index++;
         }
         // `current` is now the last node, `previous` is the second-to-last
         pathIndices.push(index); // Add index of last node to path

         const deletedValue = current.data;
         await this.highlightPath(pathIndices); // Highlight path to last node
         // No need to highlight the last node separately if path highlights it
         this.highlightNode(index, 1100); // Explicitly highlight node to be deleted
         await this.delay(1100); // Wait for highlight

         previous.next = null; // Unlink the last node
         this.render(); // Re-render the list
         this.addLog(`Deleted node ${deletedValue} from end.`);
    }

    async deleteAfterIndex(index) {
        // Index validation in calling function
        let current = this.head;
        let currentIndex = 0;
        let pathIndices = [];

        // Traverse to the node AT the specified index (the node *before* the one to delete)
        while (currentIndex < index && current !== null) {
             pathIndices.push(currentIndex);
             current = current.next;
             currentIndex++;
        }

        // Check if index is valid or if there's no node after it
        if (current === null) {
            this.addLog(`Error: Index ${index} out of bounds.`);
            return;
        }
        const nodeToDelete = current.next;
        if (nodeToDelete === null) {
            this.addLog(`Error: No node exists after index ${index} to delete.`);
            return;
        }

        pathIndices.push(currentIndex); // Add index of the node BEFORE deletion target
        pathIndices.push(currentIndex + 1); // Add index of the node TO BE deleted

        const deletedValue = nodeToDelete.data;
        await this.highlightPath(pathIndices); // Highlight up to and including the node to delete
        // Optional: Explicit longer highlight on the node being deleted
        this.highlightNode(currentIndex + 1, 1100);
        await this.delay(1100); // Wait for highlight

        current.next = nodeToDelete.next; // Link current node to the node after the deleted one
        this.render(); // Re-render the list
        this.addLog(`Deleted node ${deletedValue} (after index ${index}).`);
    }


    // --- Rendering (Singly) ---
    render() {
        const diagram = document.getElementById('linkedListDiagram');
        if (!diagram) return; // Exit if diagram element not found
        diagram.innerHTML = ''; // Clear previous content

        // Create pointers container (needed even if list is empty for structure)
        const pointersContainer = document.createElement('div');
        pointersContainer.className = 'pointers-container';
        diagram.appendChild(pointersContainer);

        if (!this.head) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-list-msg';
            emptyMsg.textContent = 'List is Empty';
            diagram.appendChild(emptyMsg); // Append message inside diagram
            // No need to render pointers if empty
            return;
        }

        // Add Start pointer only if head exists
        const startPointerElement = this.createPointerElement('Start', 'start-pointer');
        // --- Calculate Start Pointer Position ---
        // Get node width/margin dynamically or use CSS defaults
        const nodeStyle = getComputedStyle(document.documentElement); // Or a sample node
        const currentWidth = parseInt(nodeStyle.getPropertyValue('--node-width') || this.nodeWidth);
        const currentMargin = parseInt(nodeStyle.getPropertyValue('--node-margin') || this.nodeMargin);
        const dataPartWidthRatio = 0.6; // 60%
        const dataPartCenter = (currentWidth * dataPartWidthRatio) / 2;
        const startLeftPosition = this.diagramPaddingLeft + currentMargin + dataPartCenter;
        startPointerElement.style.left = `${startLeftPosition}px`;
        pointersContainer.appendChild(startPointerElement);
        // --- End Pointer Position ---

        // Render nodes and arrows
        let current = this.head;
        let nodeIndex = 0;
        while (current) {
            // Create Node Element
            const nodeElement = document.createElement('div');
            nodeElement.className = 'node';
            nodeElement.setAttribute('data-index', nodeIndex); // Add index for potential use

            const dataPart = document.createElement('div');
            dataPart.className = 'data-part';
            dataPart.textContent = current.data;

            const nextPart = document.createElement('div');
            nextPart.className = 'next-part';
            // Use arrow symbol or 'null'
            nextPart.textContent = current.next ? '→' : 'null';

            nodeElement.appendChild(dataPart);
            nodeElement.appendChild(nextPart);
            diagram.appendChild(nodeElement);

            // Add Arrow (forward only) if not the last node
            if (current.next) {
                const arrowElement = document.createElement('div');
                arrowElement.className = 'arrow';
                diagram.appendChild(arrowElement);
            }
            current = current.next;
            nodeIndex++;
        }
    }

    createPointerElement(labelText, className) {
        const pointerDiv = document.createElement('div');
        pointerDiv.className = `pointer ${className}`; // Add base and specific class

        const labelDiv = document.createElement('div');
        labelDiv.className = 'pointer-label';
        labelDiv.textContent = labelText;

        const arrowDiv = document.createElement('div');
        arrowDiv.className = 'pointer-arrow';
        // Arrowhead is added via ::after pseudo-element in CSS

        pointerDiv.appendChild(labelDiv);
        pointerDiv.appendChild(arrowDiv);
        return pointerDiv;
    }
}

// --- Global Instance and Event Handlers ---
const linkedList = new LinkedList();

// Helper functions for input values
function getInputValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}
function clearInputValue(id) {
    const element = document.getElementById(id);
    if (element) {
        element.value = '';
    }
}
function getIntInput(id, allowZero = false) { // Allow zero as valid input
    const value = getInputValue(id);
    const number = parseInt(value);
    // Check if NaN or if not allowing zero and value is 0
    if (isNaN(number) || (!allowZero && number < 0)) {
        return NaN; // Return NaN for invalid input
    }
    return number;
}


// --- Button Click Handlers (Globally Accessible) ---
async function insertAtBeginning() {
    const value = getIntInput('insertNodeValue', true); // Allow 0
    if (isNaN(value)) {
        linkedList.addLog("Error: Please enter a valid number for Value.");
        return;
    }
    await linkedList.insertAtBeginning(value);
    clearInputValue('insertNodeValue');
    clearInputValue('insertPosition'); // Clear both inputs
}

async function insertAtEnd() {
    const value = getIntInput('insertNodeValue', true); // Allow 0
    if (isNaN(value)) {
        linkedList.addLog("Error: Please enter a valid number for Value.");
        return;
    }
    await linkedList.insertAtEnd(value);
    clearInputValue('insertNodeValue');
    clearInputValue('insertPosition');
}

async function insertAfterIndex() {
    const value = getIntInput('insertNodeValue', true); // Allow 0
    const index = getIntInput('insertPosition'); // Index must be >= 0
    if (isNaN(value)) {
        linkedList.addLog("Error: Please enter a valid number for Value.");
        return;
    }
    if (isNaN(index)) {
        linkedList.addLog("Error: Please enter a non-negative number for Index.");
        return;
    }
    await linkedList.insertAfterIndex(value, index);
    clearInputValue('insertNodeValue');
    clearInputValue('insertPosition');
}

async function deleteAtBeginning() {
    await linkedList.deleteAtBeginning();
}

async function deleteAtEnd() {
    await linkedList.deleteAtEnd();
}

async function deleteAfterIndex() {
    const index = getIntInput('deletePosition'); // Index must be >= 0
    if (isNaN(index)) {
         linkedList.addLog("Error: Please enter a non-negative number for Index.");
         return;
    }
    await linkedList.deleteAfterIndex(index);
    clearInputValue('deletePosition');
}

async function createSampleList() {
    // Clear existing list first, wait for it to finish
    await clearList();
    await linkedList.delay(100); // Small pause after clearing

    const sampleValues = [10, 25, 5, 40, 18];
    linkedList.addLog(`Creating sample list with ${sampleValues.length} nodes...`);

    // Use insertAtEnd for proper animation and linking, adding delays
    for (let i = 0; i < sampleValues.length; i++) {
        // insertAtEnd handles its own logging now
        await linkedList.insertAtEnd(sampleValues[i]);
        await linkedList.delay(600); // Pause between insertions for visual effect
    }
    linkedList.addLog("Sample list creation complete.");
}

async function clearList() {
    linkedList.head = null;
    linkedList.render(); // Update display to show empty list
    linkedList.ensureLogContainer(); // Make sure container exists
    if (linkedList.logEntriesContainer) {
        linkedList.logEntriesContainer.innerHTML=''; // Clear log entries
    }
    linkedList.addLog("List cleared.");
    // No real need for delay here, but keep if preferred
    // await linkedList.delay(10);
}

// --- Go Back Function ---
function goBack() {
    window.history.back(); // Navigates to the previous page in history
}


// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    linkedList.render(); // Render initial empty state
    linkedList.addLog("SLL simulator ready.");
    // Could add event listener for window resize here to update nodeWidth/Margin if needed
});