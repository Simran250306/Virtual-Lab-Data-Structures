(function() {
    const quizData = [
        {
            question: 'What does AVL stand for in AVL tree?',
            options: ['A Very Logical', 'Adelson-Velsky and Landis', 'Automatic Variable List', 'Advanced Vector Logic'],
            correctAnswer: 'Adelson-Velsky and Landis'
        },
        {
            question: 'What is the main property of an AVL tree?',
            options: ['It is height-balanced', 'It is a complete tree', 'It is a full binary tree', 'It is sorted in descending order'],
            correctAnswer: 'It is height-balanced'
        },
        {
            question: 'What is the maximum allowed difference in heights between the left and right subtrees of any node in an AVL tree?',
            options: ['0', '1', '2', 'No fixed limit'],
            correctAnswer: '1'
        },
        {
            question: 'Which rotations can be performed to rebalance an AVL tree?',
            options: ['Left and right rotations only', 'Left, right, left-right, and right-left rotations', 'Only left-right rotation', 'No rotations are performed'],
            correctAnswer: 'Left, right, left-right, and right-left rotations'
        },
        {
            question: 'Which case in AVL tree insertion requires a double rotation?',
            options: ['Left-Left case', 'Right-Right case', 'Left-Right case', 'No case requires double rotation'],
            correctAnswer: 'Left-Right case'
        },
        {
            question: 'How is the balance factor of a node in an AVL tree calculated?',
            options: [
                'Difference between the node value and its parent',
                'Difference in heights of the left and right subtrees',
                'Sum of heights of both subtrees',
                'Difference between the number of nodes in left and right subtrees'
            ],
            correctAnswer: 'Difference in heights of the left and right subtrees'
        },
        {
            question: 'Which rotation is applied when a node’s right subtree is heavy due to a Right-Right imbalance?',
            options: ['Right rotation', 'Left rotation', 'Left-right rotation', 'Right-left rotation'],
            correctAnswer: 'Left rotation'
        },
        {
            question: 'In an AVL tree, what does a balance factor of 0 indicate?',
            options: [
                'Both subtrees are of equal height',
                'The left subtree is taller',
                'The right subtree is taller',
                'The node is a leaf'
            ],
            correctAnswer: 'Both subtrees are of equal height'
        },
        {
            question: 'How does an AVL tree maintain its balance?',
            options: [
                'By periodically rebuilding the tree',
                'By performing rotations during insertions and deletions',
                'By inserting nodes only on one side',
                'By ignoring imbalances'
            ],
            correctAnswer: 'By performing rotations during insertions and deletions'
        },
        {
            question: 'Which of the following is a common drawback of AVL trees compared to other balanced trees like Red-Black trees?',
            options: [
                'They require frequent rotations during updates',
                'They use less memory',
                'They are simpler to implement',
                'They do not support deletion'
            ],
            correctAnswer: 'They require frequent rotations during updates'
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
