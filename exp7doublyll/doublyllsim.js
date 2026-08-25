// --- Doubly Linked List Node ---
class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

// --- Doubly Linked List Class ---
class LinkedList {
    constructor() {
        this.head = null; // Start pointer always refers to head
        this.logEntriesContainer = null; // Initialize later
        this.nodeWidth = 160; // Default node width from CSS (update if CSS changes)
        this.nodeMargin = 10; // Default node margin from CSS
        this.diagramPaddingLeft = 15; // Default diagram padding
    }

    // Ensure log container is available (call before logging)
    ensureLogContainer() {
        if (!this.logEntriesContainer) {
            this.logEntriesContainer = document.querySelector('#operationLog .log-entries');
        }
    }

    // Logs operation message
    addLog(message) {
        this.ensureLogContainer(); // Make sure container is selected
        if (!this.logEntriesContainer) {
            console.error("Log container not found!");
            return; // Exit if container still not found
        }
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        // Prepend new log entries so latest is at the top
        this.logEntriesContainer.insertBefore(logEntry, this.logEntriesContainer.firstChild);

        // Limit the number of log entries
        const maxLogEntries = 50;
        while (this.logEntriesContainer.childElementCount > maxLogEntries) {
             this.logEntriesContainer.removeChild(this.logEntriesContainer.lastChild);
        }
         // Scroll to top to show the latest message
         this.logEntriesContainer.scrollTop = 0;
    }

    highlightNode(nodeIndex, duration = 1000) {
        // Use a more specific selector if possible
        const nodes = document.querySelectorAll('.diagram .node');
        if (nodeIndex < 0 || nodeIndex >= nodes.length) {
            // console.warn(`HighlightNode: Index ${nodeIndex} out of bounds.`);
            return;
        }

        const nodeElement = nodes[nodeIndex];
        if (!nodeElement) return; // Node might have been removed

        nodeElement.classList.add('node-highlight');
        // Optionally keep direct style for immediate visual feedback
        // nodeElement.style.borderColor = '#dc3545';
        // nodeElement.style.boxShadow = '0 0 12px 2px #dc3545';

        setTimeout(() => {
            // Check if node still exists in the DOM before removing class/styles
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

        for (let i = 0; i < indices.length; i++) {
            // Get current nodes inside the loop in case list changes during delay
            const diagramNodes = document.querySelectorAll('.diagram .node');
            const nodeIndex = indices[i];

            if(nodeIndex >= 0 && nodeIndex < diagramNodes.length && diagramNodes[nodeIndex]) {
               // Highlight slightly longer than the delay between steps
               this.highlightNode(nodeIndex, stepDelay + 100);
            }
            // Wait for the step delay regardless
            await this.delay(stepDelay);
        }
    }


    // --- Insertion Operations ---
    async insertAtBeginning(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        if (this.head !== null) {
            this.head.prev = newNode; // Link old head back to new node
        }
        this.head = newNode; // Update head
        this.render(); // Update display
        this.highlightNode(0); // Highlight the new first node
        await this.delay(200); // Pause for visual feedback
        this.addLog(`Inserted ${data} at beginning.`);
    }

    async insertAtEnd(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            // If list is empty, use insertAtBeginning logic
            await this.insertAtBeginning(data); // This handles render, highlight, log
            return;
        }

        let current = this.head;
        let index = 0;
        let pathIndices = [];
        // Traverse to the *last* node
        while (current.next !== null) {
            pathIndices.push(index);
            current = current.next;
            index++;
        }
        pathIndices.push(index); // Add index of the current last node

        await this.highlightPath(pathIndices); // Highlight traversal

        // Link the new node
        current.next = newNode;
        newNode.prev = current;

        this.render(); // Update display
        this.highlightNode(index + 1); // Highlight the new last node
        await this.delay(200);
        this.addLog(`Inserted ${data} at end (index ${index + 1}).`);
    }

    async insertAfterIndex(data, index) {
        // Validation is done in the calling function
        if (index < 0) { // Double check index validity although checked before
             this.addLog(`Error: Index cannot be negative.`);
             return;
        }

        // Handle insertion at beginning if index is -1 (or adjust logic if index must be >= 0)
        // Current logic assumes index >= 0 for "after index"
        if (index === -1) { // Or handle this case specifically if needed
            this.addLog(`Error: Cannot insert after index -1. Use Insert at Beginning.`);
            return;
        }


        let current = this.head;
        let currentIndex = 0;
        let pathIndices = [];

        // Traverse to the node AT the specified index
        while (currentIndex < index && current !== null) {
            pathIndices.push(currentIndex);
            current = current.next;
            currentIndex++;
        }

        // Check if index is valid (current should not be null)
        if (current === null) {
            this.addLog(`Error: Index ${index} is out of bounds.`);
            return;
        }

        pathIndices.push(currentIndex); // Add the target index node to path
        await this.highlightPath(pathIndices); // Highlight path

        const newNode = new Node(data);
        const nodeAfter = current.next;

        // Link newNode between current and nodeAfter
        newNode.next = nodeAfter;
        newNode.prev = current;
        current.next = newNode;
        if (nodeAfter !== null) {
            nodeAfter.prev = newNode; // Link nodeAfter back to newNode
        }

        this.render(); // Update display
        this.highlightNode(index + 1); // Highlight the newly inserted node
        await this.delay(200);
        this.addLog(`Inserted ${data} after index ${index}.`);
    }

    // --- Deletion Operations ---
    async deleteAtBeginning() {
         if (!this.head) {
             this.addLog("Error: List is empty. Cannot delete from beginning.");
             return;
         }
         const deletedValue = this.head.data;
         this.highlightNode(0, 1100); // Highlight longer for deletion
         await this.delay(1100); // Wait for highlight

         this.head = this.head.next; // Move head forward
         if (this.head !== null) {
             this.head.prev = null; // Remove backward link from new head
         }
         this.render(); // Update display
         this.addLog(`Deleted node ${deletedValue} from beginning.`);
     }

    async deleteAtEnd() {
         if (!this.head) {
             this.addLog("Error: List is empty. Cannot delete from end.");
             return;
         }
         if (!this.head.next) { // Only one node in the list
             await this.deleteAtBeginning(); // Reuse beginning deletion logic
             return;
         }

         let current = this.head;
         let index = 0;
         let pathIndices = [];
         // Traverse to the last node
         while (current.next !== null) {
             pathIndices.push(index);
             current = current.next;
             index++;
         }
         pathIndices.push(index); // Add index of last node

         const deletedValue = current.data;
         await this.highlightPath(pathIndices); // Highlight traversal
         this.highlightNode(index, 1100); // Highlight last node longer
         await this.delay(1100);

         const nodeBefore = current.prev;
         if (nodeBefore !== null) { // Should exist if not deleting head
            nodeBefore.next = null; // Unlink last node
         } else {
             // This case shouldn't be reached due to the head.next check above
             // but as a safeguard:
             this.head = null;
         }

         this.render(); // Update display
         this.addLog(`Deleted node ${deletedValue} from end.`);
    }

    async deleteAfterIndex(index) {
        // Validation in calling function
        if (index < 0) {
            this.addLog(`Error: Index cannot be negative for delete after.`);
            return;
        }

        let current = this.head;
        let currentIndex = 0;
        let pathIndices = [];

        // Traverse to the node AT the specified index
        while (currentIndex < index && current !== null) {
            pathIndices.push(currentIndex);
            current = current.next;
            currentIndex++;
        }

        // Check if index is valid
        if (current === null) {
            this.addLog(`Error: Index ${index} is out of bounds.`);
            return;
        }

        const nodeToDelete = current.next;

        // Check if there is a node *after* the specified index
        if (nodeToDelete === null) {
            this.addLog(`Error: No node exists after index ${index} to delete.`);
            return;
        }

        pathIndices.push(currentIndex);       // Node *at* index
        pathIndices.push(currentIndex + 1); // Node *to be deleted*

        const deletedValue = nodeToDelete.data;
        const nodeAfterDeleted = nodeToDelete.next;

        await this.highlightPath(pathIndices); // Highlight path including node to delete
        this.highlightNode(currentIndex + 1, 1100); // Highlight deleted node longer
        await this.delay(1100);

        // Update links to bypass nodeToDelete
        current.next = nodeAfterDeleted;
        if (nodeAfterDeleted !== null) {
            nodeAfterDeleted.prev = current; // Link back from node after deleted one
        }

        this.render(); // Update display
        this.addLog(`Deleted node ${deletedValue} (after index ${index}).`);
    }


    // --- Rendering ---
    render() {
        const diagram = document.getElementById('linkedListDiagram');
        if (!diagram) { console.error("Diagram element not found!"); return; }
        diagram.innerHTML = ''; // Clear previous content

        const pointersContainer = document.createElement('div');
        pointersContainer.className = 'pointers-container';
        diagram.appendChild(pointersContainer);

        if (!this.head) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-list-msg';
            emptyMsg.textContent = 'List is Empty';
            diagram.appendChild(emptyMsg);
            return; // Exit if list is empty
        }

        // Add Start pointer
        const startPointerElement = this.createPointerElement('Start', 'start-pointer');
        // Calculate center of the data part (middle third)
        const nodeWidth = this.nodeWidth;
        const nodeMargin = this.nodeMargin;
        const diagramPaddingLeft = this.diagramPaddingLeft;
        const dataPartOffset = nodeWidth / 3;
        const dataPartWidth = nodeWidth / 3;
        const dataPartCenter = dataPartOffset + (dataPartWidth / 2);
        // Position pointer above the center of the first node's data part
        const startLeftPosition = diagramPaddingLeft + nodeMargin + dataPartCenter;
        startPointerElement.style.left = `${startLeftPosition}px`;
        pointersContainer.appendChild(startPointerElement);

        // Render nodes and arrows
        let current = this.head;
        let nodeIndex = 0;
        while (current) {
            // Create Node Element
            const nodeElement = document.createElement('div');
            nodeElement.className = 'node';
            nodeElement.setAttribute('data-index', nodeIndex);

            const prevPart = document.createElement('div');
            prevPart.className = 'prev-part';
            prevPart.textContent = current.prev ? '←' : 'null';

            const dataPart = document.createElement('div');
            dataPart.className = 'data-part';
            dataPart.textContent = current.data;

            const nextPart = document.createElement('div');
            nextPart.className = 'next-part';
            nextPart.textContent = current.next ? '→' : 'null';

            nodeElement.appendChild(prevPart);
            nodeElement.appendChild(dataPart);
            nodeElement.appendChild(nextPart);
            diagram.appendChild(nodeElement);

            // Add Arrow Container between nodes if not the last node
            if (current.next) {
                const arrowContainer = document.createElement('div');
                arrowContainer.className = 'arrow-container';
                const forwardArrow = document.createElement('div');
                forwardArrow.className = 'arrow-forward';
                arrowContainer.appendChild(forwardArrow);
                const backwardArrow = document.createElement('div');
                backwardArrow.className = 'arrow-backward';
                arrowContainer.appendChild(backwardArrow);
                diagram.appendChild(arrowContainer);
            }
            current = current.next;
            nodeIndex++;
        }
    }

    createPointerElement(labelText, className) {
        const pointerDiv = document.createElement('div');
        pointerDiv.className = `pointer ${className}`;
        const labelDiv = document.createElement('div');
        labelDiv.className = 'pointer-label';
        labelDiv.textContent = labelText;
        const arrowDiv = document.createElement('div');
        arrowDiv.className = 'pointer-arrow'; // Arrowhead added via CSS ::after
        pointerDiv.appendChild(labelDiv);
        pointerDiv.appendChild(arrowDiv);
        return pointerDiv;
    }
}

// --- Global Instance ---
const linkedList = new LinkedList();

// --- Helper Functions ---
function getInputValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : ''; // Return empty string if element not found
}

function clearInputValue(id) {
    const element = document.getElementById(id);
    if (element) {
        element.value = '';
    }
}

function getIntInput(id, allowZero = false) {
    const value = getInputValue(id);
    // Use Number() for potentially better handling of various numeric strings
    // but parseInt is fine for typical integer input.
    const number = parseInt(value);

    // Check for NaN, or if number is negative when only non-negatives are allowed
    if (isNaN(number) || (number < 0 && !allowZero)) {
        return NaN; // Indicate invalid input
    }
    // If allowZero is false, 0 is still a valid *non-negative* number.
    // The check 'number < 0' handles invalid negative indices directly.
    return number;
}

// --- Button Click Handlers (Globally Accessible) ---
async function insertAtBeginning() {
    const value = getIntInput('insertNodeValue', true); // Allow 0+ for value
    if (isNaN(value)) {
        linkedList.addLog("Error: Please enter a valid number for Value.");
        return;
    }
    await linkedList.insertAtBeginning(value);
    clearInputValue('insertNodeValue');
    clearInputValue('insertPosition'); // Clear index field too
}

async function insertAtEnd() {
    const value = getIntInput('insertNodeValue', true); // Allow 0+ for value
    if (isNaN(value)) {
        linkedList.addLog("Error: Please enter a valid number for Value.");
        return;
    }
    await linkedList.insertAtEnd(value);
    clearInputValue('insertNodeValue');
    clearInputValue('insertPosition');
}

async function insertAfterIndex() {
    const value = getIntInput('insertNodeValue', true); // Allow 0+ for value
    const index = getIntInput('insertPosition', true); // Allow 0+ for index
    if (isNaN(value)) {
        linkedList.addLog("Error: Please enter a valid number for Value.");
        return;
    }
    // Allow index 0, check specifically for NaN or negative
    if (isNaN(index) || index < 0) {
        linkedList.addLog("Error: Please enter a non-negative integer for Index.");
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
    const index = getIntInput('deletePosition', true); // Allow 0+ for index
    // Allow index 0, check specifically for NaN or negative
    if (isNaN(index) || index < 0) {
         linkedList.addLog("Error: Please enter a non-negative integer for Index.");
         return;
    }
    await linkedList.deleteAfterIndex(index);
    clearInputValue('deletePosition'); // Clear only the delete index field
}

async function createSampleList() {
    await clearList(); // Wait for list clearing
    await linkedList.delay(100); // Small pause

    const sampleValues = [10, 25, 5, 40, 18];
    linkedList.addLog(`Creating sample list with ${sampleValues.length} nodes...`);

    for (const value of sampleValues) {
        await linkedList.insertAtEnd(value); // insertAtEnd handles logging/highlight
        await linkedList.delay(600); // Visual pause between insertions
    }
     linkedList.addLog("Sample list creation complete.");
}

async function clearList() {
    linkedList.head = null;
    linkedList.render(); // Update display to empty
    linkedList.ensureLogContainer(); // Make sure log container exists
    if (linkedList.logEntriesContainer) {
        linkedList.logEntriesContainer.innerHTML = ''; // Clear visual log
    }
    linkedList.addLog("List cleared.");
    // await linkedList.delay(10); // Optional delay
}

// --- Go Back Function ---
function goBack() {
    window.history.back(); // Simple navigation back
}


// --- Initial Setup ---
// Use DOMContentLoaded to ensure HTML is ready before running script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the log container reference now that the DOM is loaded
    linkedList.ensureLogContainer();
    // Render the initial empty state
    linkedList.render();
    // Add the initial ready message
    linkedList.addLog("DLL simulator ready.");
});