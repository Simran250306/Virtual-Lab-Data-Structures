(function() {
    const quizData = [
        {
            question: 'What is a queue?',
            options: ['A linear data structure', 'A hierarchical data structure', 'A non-linear data structure', 'A random data structure'],
            correctAnswer: 'A linear data structure'
        },
        {
            question: 'Which operation adds an element to the end of the queue?',
            options: ['Enqueue', 'Dequeue', 'Peek', 'Size'],
            correctAnswer: 'Enqueue'
        },
        {
            question: 'What happens when you try to dequeue from an empty queue?',
            options: ['Queue underflow', 'Queue overflow', 'No change', 'Program crashes'],
            correctAnswer: 'Queue underflow'
        },
        {
            question: 'In a queue, the element that was added first is removed first. This is known as:',
            options: ['FIFO', 'LIFO', 'FILO', 'LILO'],
            correctAnswer: 'FIFO'
        },
        {
            question: 'Which of the following is not a standard queue operation?',
            options: ['Enqueue', 'Dequeue', 'Remove', 'Peek'],
            correctAnswer: 'Remove'
        },
        {
            question: 'What is the time complexity of the enqueue operation in a queue?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
            correctAnswer: 'O(1)'
        },
        {
            question: 'Which data structure uses the First In First Out (FIFO) principle?',
            options: ['Stack', 'Linked List', 'Queue', 'Tree'],
            correctAnswer: 'Queue'
        },
        {
            question: 'Which of the following is an example of a real-world queue?',
            options: ['Undo feature in software', 'Queue at a bus stop', 'Array in programming', 'Linked list'],
            correctAnswer: 'Queue at a bus stop'
        },
        {
            question: 'What is the space complexity of a queue?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
            correctAnswer: 'O(n)'
        },
        {
            question: 'Which of the following algorithms uses a queue?',
            options: ['Binary Search', 'Depth-First Search', 'Breadth-First Search', 'Merge Sort'],
            correctAnswer: 'Breadth-First Search'
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
