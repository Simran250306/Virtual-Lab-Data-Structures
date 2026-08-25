(function() {
    const quizData = [
        {
            question: 'What is a Binary Search Tree (BST)?',
            options: ['A tree where each node has at most two children', 'A tree where left subtree has smaller values and right subtree has larger values', 'A tree with only one child per node', 'A tree that does not allow duplicate values'],
            correctAnswer: 'A tree where left subtree has smaller values and right subtree has larger values'
        },
        {
            question: 'What happens if a Binary Search Tree is unbalanced?',
            options: ['It becomes a linked list', 'It retains its search efficiency', 'It will automatically balance itself', 'None of the above'],
            correctAnswer: 'It becomes a linked list'
        },
        {
            question: 'Which of the following operations can be efficiently performed in a Binary Search Tree?',
            options: ['Searching for an element', 'Insertion of an element', 'Deletion of an element', 'All of the above'],
            correctAnswer: 'All of the above'
        },
        {
            question: 'How is the structure of a node in a Binary Search Tree defined?',
            options: ['It contains only data', 'It contains data, a left pointer, and a right pointer', 'It contains data and two children', 'It contains only left and right pointers'],
            correctAnswer: 'It contains data, a left pointer, and a right pointer'
        },
        {
            question: 'What is the traversal order for the In-order traversal of a Binary Search Tree?',
            options: ['Root, Left, Right', 'Left, Root, Right', 'Right, Left, Root', 'Left, Right, Root'],
            correctAnswer: 'Left, Root, Right'
        },
        {
            question: 'Which of the following is a correct property of a Binary Search Tree?',
            options: ['The left child is always smaller than the parent node, and the right child is always larger than the parent node', 'All nodes are leaf nodes', 'The tree must be balanced', 'Each node has at least one child'],
            correctAnswer: 'The left child is always smaller than the parent node, and the right child is always larger than the parent node'
        },
        {
            question: 'Which traversal method would you use to print the values of a Binary Search Tree in sorted order?',
            options: ['Pre-order traversal', 'Post-order traversal', 'In-order traversal', 'Level-order traversal'],
            correctAnswer: 'In-order traversal'
        },
        {
            question: 'What is the minimum number of nodes in a Binary Search Tree with a height of 3?',
            options: ['3', '7', '15', '31'],
            correctAnswer: '7'
        },
        {
            question: 'Which of the following is NOT a valid operation in a Binary Search Tree?',
            options: ['Inserting a node', 'Searching for a node', 'Removing a node', 'Sorting nodes'],
            correctAnswer: 'Sorting nodes'
        },
        {
            question: 'What does the root node in a Binary Search Tree represent?',
            options: ['The smallest value in the tree', 'The largest value in the tree', 'A random value in the tree', 'The middle value in the tree'],
            correctAnswer: 'A random value in the tree'
        }
    ];
    

    let currentQuestionIndex = 0;
    let score = 0;
    const quizContainer = document.getElementById('quiz');
    const optionsContainer = document.getElementById('quiz-options');
    const resultContainer = document.getElementById('result');
    const nextButton = document.getElementById('nextBtn');
    const attemptAgainButton = document.getElementById('attemptAgainBtn');
    const goBackButton = document.getElementById('goBackBtn');
    let myChart;

    nextButton.addEventListener('click', nextQuestion);
    attemptAgainButton.addEventListener('click', attemptQuizAgain);
    goBackButton.addEventListener('click', goBack);

    function displayQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        quizContainer.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(optionButton);
        });
    }

    function checkAnswer(selectedOption) {
        const currentQuestion = quizData[currentQuestionIndex];
        const options = optionsContainer.getElementsByTagName('button');

        for (let i = 0; i < options.length; i++) {
            options[i].disabled = true;
            options[i].setAttribute('aria-disabled', 'true'); // For accessibility
            if (options[i].textContent === currentQuestion.correctAnswer) {
                options[i].classList.add('highlight-correct');
            } else if (options[i].textContent === selectedOption) {
                options[i].classList.add('highlight-wrong');
            }
        }

        if (selectedOption === currentQuestion.correctAnswer) {
            score++;
        }

        nextButton.style.display = 'block';
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            resetOptions();
            displayQuestion();
            nextButton.style.display = 'none';
        } else {
            showResult();
        }
    }

    function showResult() {
        resultContainer.textContent = `Quiz completed! Your Score: ${score}/${quizData.length}`;
        const ctx = document.getElementById('myChart').getContext('2d');
        
        myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Correct', 'Incorrect'],
                datasets: [{
                    label: 'Quiz Result',
                    data: [score, quizData.length - score],
                    backgroundColor: ['#8FEE8F', '#FF8F8F']
                }]
            }
        });
        document.getElementById('myChart').style.display = 'block';
        attemptAgainButton.style.display = 'block';
        goBackButton.style.display = 'block';
        nextButton.style.display = 'none';
    }

    function resetOptions() {
        optionsContainer.innerHTML = '';
    }

    function attemptQuizAgain() {
        score = 0;
        currentQuestionIndex = 0;
        resultContainer.textContent = '';
        if (myChart) {
          myChart.destroy();
        }
        document.getElementById('myChart').style.display = 'none';
        attemptAgainButton.style.display = 'none';
        goBackButton.style.display = 'none';
        displayQuestion();
    }

    function goBack() {
        window.history.back();
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            resetOptions();
            displayQuestion();
            nextButton.style.display = 'none';
        } else {
            showResult();
        }
    }

    // Initial load
    displayQuestion();
})();
