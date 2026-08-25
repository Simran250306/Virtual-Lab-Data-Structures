(function() {
    const quizData = [
        {
            question: 'What is the primary characteristic of a singly linked list?',
            options: [
                'Each node points to the previous node',
                'Each node points to the next node and has only one pointer',
                'Nodes are stored in a contiguous block of memory',
                'Each node has two pointers: one for next and one for previous'
            ],
            correctAnswer: 'Each node points to the next node and has only one pointer'
        },
        {
            question: 'How do you insert a new node at the beginning of a singly linked list?',
            options: [
                'Update the last node to point to the new node',
                'Create a new node and make its next pointer point to the current head, then update the head to the new node',
                'Replace the head with the new node',
                'Append the new node to the end of the list'
            ],
            correctAnswer: 'Create a new node and make its next pointer point to the current head, then update the head to the new node'
        },
        {
            question: 'Which of the following operations can be performed in a singly linked list?',
            options: [
                'Searching for a node',
                'Inserting a node',
                'Deleting a node',
                'All of the above'
            ],
            correctAnswer: 'All of the above'
        },
        {
            question: 'What is the head of a singly linked list?',
            options: [
                'The last node in the list',
                'The first node in the list',
                'The middle node in the list',
                'A null reference'
            ],
            correctAnswer: 'The first node in the list'
        },
        {
            question: 'Which of the following correctly describes the structure of a node in a singly linked list?',
            options: [
                'It contains only data',
                'It contains data and a pointer to the previous node',
                'It contains data and a pointer to the next node',
                'It contains data, a pointer to the next node, and a pointer to the head'
            ],
            correctAnswer: 'It contains data and a pointer to the next node'
        },
        {
            question: 'What is the result of traversing a singly linked list starting from the head node?',
            options: [
                'You can access only the last node',
                'You can access nodes sequentially until the end of the list',
                'You can access nodes in reverse order',
                'You cannot traverse the list'
            ],
            correctAnswer: 'You can access nodes sequentially until the end of the list'
        },
        {
            question: 'How do you delete the last node in a singly linked list?',
            options: [
                'Update the head to point to null',
                'Traverse the list to find the second last node and set its next pointer to null',
                'Simply remove the last node from memory',
                'It is not possible to delete the last node'
            ],
            correctAnswer: 'Traverse the list to find the second last node and set its next pointer to null'
        },
        {
            question: 'What will happen if you try to access the next pointer of the last node in a singly linked list?',
            options: [
                'It will point to the head node',
                'It will cause an error',
                'It will point to null',
                'It will create an infinite loop'
            ],
            correctAnswer: 'It will point to null'
        },
        {
            question: 'Which of the following best describes the process of reversing a singly linked list?',
            options: [
                'Changing the data values of each node',
                'Updating each node\'s next pointer to point to the previous node',
                'Creating a new list and copying nodes in reverse order',
                'Both B and C'
            ],
            correctAnswer: 'Both B and C'
        },
        {
            question: 'What is the maximum number of nodes that a singly linked list can have?',
            options: [
                'No limit; it can grow dynamically',
                'Equal to the number of elements in an array',
                'Limited to a specific fixed size',
                'Zero nodes'
            ],
            correctAnswer: 'No limit; it can grow dynamically'
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
