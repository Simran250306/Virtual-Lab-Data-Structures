(function() {
    const quizData = [
        {
            question: 'What is the time complexity to insert an element at the end of a doubly linked list?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
            correctAnswer: 'O(1)'
        },
        {
            question: 'In a doubly linked list, which pointers does each node contain?',
            options: ['Data and next pointer only', 'Data, next, and previous pointers', 'Data and previous pointer only', 'Data only'],
            correctAnswer: 'Data, next, and previous pointers'
        },
        {
            question: 'Calculate the total number of pointers in a doubly linked list with 7 nodes.',
            options: ['7', '14', '21', '3'],
            correctAnswer: '14'
        },
        {
            question: 'Which of the following operations can be performed more efficiently in a doubly linked list than a singly linked list?',
            options: ['Insertion at head', 'Deletion at tail', 'Traversal from head', 'Search operation'],
            correctAnswer: 'Deletion at tail'
        },
        {
            question: 'Write the algorithm to reverse a doubly linked list.',
            options: [
                'Traverse the list and swap next and previous pointers for each node',
                'Traverse and reverse the data values in each node',
                'Recreate the list in reverse order',
                'Swap head and tail only'
            ],
            correctAnswer: 'Traverse the list and swap next and previous pointers for each node'
        },
        
        {
            question: 'Explain why doubly linked lists use more memory than singly linked lists.',
            options: [
                'They store extra data values',
                'They use both previous and next pointers, increasing memory usage',
                'They require additional list metadata',
                'They duplicate each node data'
            ],
            correctAnswer: 'They use both previous and next pointers, increasing memory usage'
        },
        {
            question: 'Given a doubly linked list with nodes: 1 <-> 3 <-> 5 <-> 7, what is the result of deleting the node with value 5?',
            options: ['1 <-> 3 <-> 7', '1 <-> 5 <-> 7', '3 <-> 7', '1 <-> 7'],
            correctAnswer: '1 <-> 3 <-> 7'
        },
        {
            question: 'Calculate the number of comparisons needed to search for an element in the worst case in a list with 10 nodes.',
            options: ['5', '10', '9', '11'],
            correctAnswer: '10'
        },
        {
            question: 'In which scenario would a doubly linked list be preferred over a singly linked list?',
            options: [
                'When memory is constrained',
                'When only forward traversal is needed',
                'When both forward and backward traversals are needed',
                'When insertion is only at the end'
            ],
            correctAnswer: 'When both forward and backward traversals are needed'
        },
        {
            question: 'Write a function to find the middle node of a doubly linked list.',
            options: [
                'Use two pointers: one moving twice as fast as the other',
                'Count nodes and access the middle index directly',
                'Traverse from tail and count backwards',
                'Sort the list and select the median value'
            ],
            correctAnswer: 'Use two pointers: one moving twice as fast as the other'
        },
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
