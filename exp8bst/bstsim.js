class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insertNode(node, value, operationBox) {
        if (!node) {
            operationBox.textContent += `Inserted ${value}\n`;
            this.scrollToBottom(operationBox);
            return new TreeNode(value);
        }

        if (value < node.value) {
            operationBox.textContent += `Going left from ${node.value}\n`;
            this.scrollToBottom(operationBox);
            node.left = this.insertNode(node.left, value, operationBox);
        } else if (value > node.value) {
            operationBox.textContent += `Going right from ${node.value}\n`;
            this.scrollToBottom(operationBox);
            node.right = this.insertNode(node.right, value, operationBox);
        } else {
            alert(`Error: ${value} is already in the tree`);  // Show the alert
            return node; // No duplicates allowed
        }

        return node;
    }

    insert(value, operationBox) {
        this.root = this.insertNode(this.root, value, operationBox);
    }

    findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    deleteNode(node, value, operationBox) {
        if (!node) {
            operationBox.textContent += `Value ${value} not found in the tree.\n`;
            this.scrollToBottom(operationBox);
            return null;
        }

        if (value < node.value) {
            operationBox.textContent += `Going left from ${node.value} to delete ${value}\n`;
            this.scrollToBottom(operationBox);
            node.left = this.deleteNode(node.left, value, operationBox);
        } else if (value > node.value) {
            operationBox.textContent += `Going right from ${node.value} to delete ${value}\n`;
            this.scrollToBottom(operationBox);
            node.right = this.deleteNode(node.right, value, operationBox);
        } else {
            // Node with the value found

            if (!node.left && !node.right) {
                operationBox.textContent += `Deleting leaf node ${value}\n`;
                this.scrollToBottom(operationBox);
                return null;
            } else if (!node.left) {
                operationBox.textContent += `Deleting node ${value} with only right child.\n`;
                this.scrollToBottom(operationBox);
                return node.right;
            } else if (!node.right) {
                operationBox.textContent += `Deleting node ${value} with only left child.\n`;
                this.scrollToBottom(operationBox);
                return node.left;
            }

            // Node has two children: Get the inorder successor (smallest
            // in the right subtree)
            const minRight = this.findMin(node.right);
            operationBox.textContent += `Node ${value} has two children. Replacing with successor ${minRight.value}.\n`;
            this.scrollToBottom(operationBox);
            node.value = minRight.value;
            node.right = this.deleteNode(node.right, minRight.value, operationBox); // Correct the right subtree
        }
        return node;
    }

    delete(value, operationBox) {
        this.root = this.deleteNode(this.root, value, operationBox);
    }

    searchNode(node, value, operationBox) {
        if (!node) {
            operationBox.textContent += `Value ${value} not found in the tree.\n`;
            this.scrollToBottom(operationBox);
            return null;
        }

        if (value < node.value) {
            operationBox.textContent += `Searching: Going left from ${node.value}\n`;
            this.scrollToBottom(operationBox);
            return this.searchNode(node.left, value, operationBox);
        } else if (value > node.value) {
            operationBox.textContent += `Searching: Going right from ${node.value}\n`;
            this.scrollToBottom(operationBox);
            return this.searchNode(node.right, value, operationBox);
        } else {
            operationBox.textContent += `Value ${value} found!\n`;
            this.scrollToBottom(operationBox);
            return node;
        }
    }

    search(value, operationBox) {
        return this.searchNode(this.root, value, operationBox);
    }
    scrollToBottom(element) {
      element.scrollTop = element.scrollHeight;
    }
}

const binaryTree = new BinaryTree();
const treeElement = document.getElementById('tree');
const operationBox = document.getElementById('operation-box');

function clearTreeDisplay() {
    treeElement.innerHTML = ''; // Clear previous nodes and edges
}

function updateTreeDisplay(node, x = 400, y = 50, depth = 1) {
    if (!node) return;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 20);
    circle.setAttribute('fill', '#fff');
    circle.setAttribute('stroke', '#93332e');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('class', 'node');
    treeElement.appendChild(circle);

    const text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#93332e');
    text.setAttribute('class', 'node-value');
    text.textContent = node.value;
    treeElement.appendChild(text);

    if (node.left) {
        const leftX = x - 50 * (0.5 ** (depth - 3));
        const leftY = y + 80;
        const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', y + 20);
        line.setAttribute('x2', leftX);
        line.setAttribute('y2', leftY - 20);
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke', '#93332e');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('class', 'edge');
        treeElement.appendChild(line);
        updateTreeDisplay(node.left, leftX, leftY, depth + 1);
    }

    if (node.right) {
        const rightX = x + 50 * (0.5 ** (depth - 3));
        const rightY = y + 80;
        const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', y + 20);
        line.setAttribute('x2', rightX);
        line.setAttribute('y2', rightY - 20);
        line.setAttribute('stroke', '#93332e');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('class', 'edge');
        treeElement.appendChild(line);
        updateTreeDisplay(node.right, rightX, rightY, depth + 1);
    }
}

function insert() {
    const elementInput = parseInt(document.getElementById('element-input').value);
    if (isNaN(elementInput)) {
        alert("Invalid input: Please enter a valid number.");
        return;
    }
    binaryTree.insert(elementInput, operationBox);
    clearTreeDisplay();
    updateTreeDisplay(binaryTree.root);
    document.getElementById('element-input').value = '';
}

function deleteNode() {
    const deleteInput = parseInt(document.getElementById('delete-input').value);
    if (isNaN(deleteInput)) {
        alert("Invalid input for delete: Please enter a valid number.");
        return;
    }
    binaryTree.delete(deleteInput, operationBox);
    clearTreeDisplay();
    updateTreeDisplay(binaryTree.root);
    document.getElementById('delete-input').value = '';
}

function search() {
    const searchInput = parseInt(document.getElementById('search-input').value);
    if (isNaN(searchInput)) {
        alert("Invalid input for search: Please enter a valid number.");
        return;
    }

    clearTreeDisplay(); // Clear any previous highlighting
    updateTreeDisplay(binaryTree.root);

    const foundNode = binaryTree.search(searchInput, operationBox);

    if (foundNode) {
        // Find the SVG circle for the found node and highlight it.
        const circles = treeElement.querySelectorAll('circle');
        circles.forEach(circle => {
            const text = circle.nextElementSibling; // Assuming text is immediately after circle
            if (text && parseInt(text.textContent) === foundNode.value) {
                circle.classList.add('highlighted-node');
            }
        });
    }
    document.getElementById('search-input').value = '';
}

function goBack() {
    window.history.back();
}