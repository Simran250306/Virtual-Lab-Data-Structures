document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is loaded

    // --- Get DOM Elements ---
    const canvas = document.getElementById('graph-canvas');
    const ctx = canvas.getContext('2d');
    const nodeNameInput = document.getElementById('node-name');
    const deleteNodeNameInput = document.getElementById('delete-node-name');
    const connectNode1Input = document.getElementById('connect-node1');
    const connectNode2Input = document.getElementById('connect-node2');
    const addNodeButton = document.getElementById('add-node');
    const deleteNodeButton = document.getElementById('delete-node');
    const connectNodesButton = document.getElementById('connect-nodes');
    const logList = document.getElementById('log-list');

    // --- Graph Data ---
    let nodes = []; // Array of node objects: { id: 'name', x: 100, y: 100, radius: 25 }
    let edges = []; // Array of edge objects: { from: 'A', to: 'B' }

    // --- Dragging State ---
    let draggingNode = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    // --- Constants ---
    const NODE_RADIUS = 25;
    const NODE_COLOR = '#93332e'; // Match header color
    const NODE_BORDER_COLOR = '#f0f0f0';
    const NODE_TEXT_COLOR = 'white';
    const EDGE_COLOR = 'black'; // Dark grey for edges
    const EDGE_WIDTH = 2;
    const CANVAS_BG_COLOR = '#e8e8e8'; // Match CSS

    // --- Event Listeners ---
    addNodeButton.addEventListener('click', handleAddNode);
    deleteNodeButton.addEventListener('click', handleDeleteNode);
    connectNodesButton.addEventListener('click', handleConnectNodes);

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp); // Stop dragging if mouse leaves canvas

    // Allow Enter key press in input fields
    nodeNameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAddNode(); });
    deleteNodeNameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleDeleteNode(); });
    connectNode2Input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleConnectNodes(); }); // Trigger on second input

    // --- Core Functions ---

    function addNode(name) {
        if (!name) {
            logOperation(error("Error: Node name cannot be empty."), "error");
            return false;
        }
        if (nodes.some(n => n.id === name)) {
            logOperation(alert(`Error: Node "${name}" already exists.`), "error");
            return false;
        }

        // Try to place new node without overlapping existing ones (simple approach)
        let x, y, attempts = 0, overlapped;
        const maxAttempts = 50;
        do {
            overlapped = false;
            x = NODE_RADIUS + Math.random() * (canvas.width - 2 * NODE_RADIUS);
            y = NODE_RADIUS + Math.random() * (canvas.height - 2 * NODE_RADIUS);
            for (const node of nodes) {
                 const dx = x - node.x;
                 const dy = y - node.y;
                 if (dx * dx + dy * dy < (NODE_RADIUS * 2.5) * (NODE_RADIUS * 2.5)) { // Check larger radius to add spacing
                     overlapped = true;
                     break;
                 }
            }
            attempts++;
        } while (overlapped && attempts < maxAttempts);


        const newNode = {
            id: name,
            x: x,
            y: y,
            radius: NODE_RADIUS
        };
        nodes.push(newNode);
        logOperation(`Node "${name}" added.`);
        return true; // Indicate success
    }

    function deleteNode(name) {
        if (!name) {
            logOperation(alert("Error: Please enter a node name to delete."), "error");
            return false;
        }

        const nodeIndex = nodes.findIndex(n => n.id === name);
        if (nodeIndex === -1) {
            logOperation(alert(`Error: Node "${name}" not found.`), "error");
            return false;
        }

        // Remove the node
        nodes.splice(nodeIndex, 1);

        // Remove edges connected to this node
        const initialEdgeCount = edges.length;
        edges = edges.filter(edge => edge.from !== name && edge.to !== name);
        const edgesRemoved = initialEdgeCount - edges.length;

        logOperation(`Node "${name}" deleted.` + (edgesRemoved > 0 ? ` (${edgesRemoved} connection${edgesRemoved > 1 ? 's':''}) removed.` : ''));
        return true; // Indicate success
    }

    function connectNodes(name1, name2) {
        if (!name1 || !name2) {
            logOperation(alert("Error: Both node names must be provided to connect."), "error");
            return false;
        }
        if (name1 === name2) {
            logOperation(alert("Error: Cannot connect a node to itself."), "error");
            return false;
        }

        const node1 = nodes.find(n => n.id === name1);
        const node2 = nodes.find(n => n.id === name2);

        if (!node1) {
            logOperation(alert(`Error: Node "${name1}" not found.`), "error");
            return false;
        }
        if (!node2) {
            logOperation(alert(`Error: Node "${name2}" not found.`), "error");
            return false;
        }


        // Check if edge already exists (undirected)
        const edgeExists = edges.some(edge =>
            (edge.from === name1 && edge.to === name2) || (edge.from === name2 && edge.to === name1)
        );

        if (edgeExists) {
            logOperation(alert(`Nodes "${name1}" and "${name2}" are already connected.`), "info");
            return false; // Not an error, but no action taken
        }

        edges.push({ from: name1, to: name2 });
        logOperation(`Connected nodes "${name1}" and "${name2}".`);
        return true; // Indicate success
    }

    // --- Event Handlers ---

    function handleAddNode() {
        const name = nodeNameInput.value.trim();
        if (addNode(name)) {
            nodeNameInput.value = ''; // Clear input on success
            drawGraph();
        }
         nodeNameInput.focus(); // Keep focus on input
    }

    function handleDeleteNode() {
        const name = deleteNodeNameInput.value.trim();
         if (deleteNode(name)) {
            deleteNodeNameInput.value = ''; // Clear input on success
            drawGraph();
        }
        deleteNodeNameInput.focus(); // Keep focus on input
    }

    function handleConnectNodes() {
        const name1 = connectNode1Input.value.trim();
        const name2 = connectNode2Input.value.trim();
         if (connectNodes(name1, name2)) {
            connectNode1Input.value = ''; // Clear inputs on success
            connectNode2Input.value = '';
            drawGraph();
        }
        connectNode1Input.focus(); // Focus back on first input
    }


    // --- Drawing ---

    function drawGraph() {
        // Clear canvas
        ctx.fillStyle = CANVAS_BG_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 1. Draw Edges (so nodes are drawn on top)
        ctx.strokeStyle = EDGE_COLOR;
        ctx.lineWidth = EDGE_WIDTH;
        edges.forEach(edge => {
            const nodeFrom = nodes.find(n => n.id === edge.from);
            const nodeTo = nodes.find(n => n.id === edge.to);
            if (nodeFrom && nodeTo) {
                ctx.beginPath();
                ctx.moveTo(nodeFrom.x, nodeFrom.y);
                ctx.lineTo(nodeTo.x, nodeTo.y);
                ctx.stroke();
            }
        });

        // 2. Draw Nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

            // Fill
            ctx.fillStyle = NODE_COLOR;
            ctx.fill();

            // Border
            ctx.strokeStyle = NODE_BORDER_COLOR;
            ctx.lineWidth = 2; // Node border width
            ctx.stroke();

            // Text (centered)
            ctx.fillStyle = NODE_TEXT_COLOR;
            ctx.font = '14px Times New Roman'; // Use a clear font
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.id, node.x, node.y);
        });
    }

    // --- Logging ---

    function logOperation(message, type = "info") { // type can be 'info', 'error', 'success' etc.
        const li = document.createElement('li');
        li.innerHTML = `${message}`; // Use innerHTML to allow potential formatting later

        if (type === 'info') {
             li.style.color = '#933'; // Standard log color
        } // Add more types if needed

        logList.insertBefore(li, logList.firstChild); // Add new log to the top

        // Optional: Limit log size to prevent performance issues
        const maxLogItems = 50;
        while (logList.children.length > maxLogItems) {
            logList.removeChild(logList.lastChild);
        }
    }

    // --- Drag and Drop Logic ---

    function getMousePos(canvasEl, evt) {
        const rect = canvasEl.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function handleMouseDown(e) {
        const mousePos = getMousePos(canvas, e);

        // Check if click is inside any node (iterate backwards to select topmost node)
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            const dx = mousePos.x - node.x;
            const dy = mousePos.y - node.y;
            // Check if distance squared is less than radius squared
            if (dx * dx + dy * dy < node.radius * node.radius) {
                draggingNode = node;
                dragOffsetX = dx; // Store offset from node center where clicked
                dragOffsetY = dy;
                canvas.style.cursor = 'grabbing'; // Change cursor
                return; // Stop searching once a node is found
            }
        }
    }

    function handleMouseMove(e) {
        if (!draggingNode) return; // Only run if dragging

        const mousePos = getMousePos(canvas, e);
        let newX = mousePos.x - dragOffsetX;
        let newY = mousePos.y - dragOffsetY;

        // Clamp node position within canvas boundaries (considering radius)
        newX = Math.max(draggingNode.radius, Math.min(canvas.width - draggingNode.radius, newX));
        newY = Math.max(draggingNode.radius, Math.min(canvas.height - draggingNode.radius, newY));

        draggingNode.x = newX;
        draggingNode.y = newY;

        drawGraph(); // Redraw the graph continuously while dragging
    }

    function handleMouseUp(e) {
        if (draggingNode) {
            // Optional: Log move operation only if position actually changed significantly
            // logOperation(`Moved node "${draggingNode.id}" to (${Math.round(draggingNode.x)}, ${Math.round(draggingNode.y)})`);
            draggingNode = null; // Stop dragging
        }
        canvas.style.cursor = 'grab'; // Reset cursor
    }

    // --- Go Back Functionality (if button exists) ---
    window.goBack = function() { // Make it globally accessible if using inline onclick
        window.history.back();
    }

    // --- Initial Setup ---
    canvas.style.cursor = 'grab'; // Set initial cursor for canvas
    drawGraph(); // Draw the initial empty canvas
    logOperation("Graph Simulator Initialized.", "info");

}); // End DOMContentLoaded