(function() {
    const quizData = [
        {
            question: 'What is a stack?',
            options: ['A linear data structure', 'A hierarchical data structure', 'A non-linear data structure', 'A random data structure'],
            correctAnswer: 'A linear data structure'
        },
        {
            question: 'Which operation adds an element to the top of the stack?',
            options: ['Push', 'Pop', 'Peek', 'Size'],
            correctAnswer: 'Push'
        },
        {
            question: 'What happens when you try to pop from an empty stack?',
            options: ['Stack underflow', 'Stack overflow', 'No change', 'Program crashes'],
            correctAnswer: 'Stack underflow'
        },
        {
            question: 'In a stack, the element that was added last is removed first. This is known as:',
            options: ['FIFO', 'LIFO', 'FILO', 'LILO'],
            correctAnswer: 'LIFO'
        },
        {
            question: 'Which of the following is not a standard stack operation?',
            options: ['Push', 'Pop', 'Remove', 'Peek'],
            correctAnswer: 'Remove'
        },
        {
            question: 'Which data structure is best suited for implementing function calls in recursion?',
            options: ['Queue', 'Stack', 'Heap', 'Tree'],
            correctAnswer: 'Stack'
        },
        {
            question: 'Which data structure uses the Last In First Out (LIFO) principle?',
            options: ['Queue', 'Linked List', 'Stack', 'Tree'],
            correctAnswer: 'Stack'
        },
        {
            question: 'Which of the following is an example of a real-world stack?',
            options: ['Undo feature in software', 'Queue at a bus stop', 'Array in programming', 'Linked list'],
            correctAnswer: 'Undo feature in software'
        },
        {
            question: 'Which of the following is used to reverse a string efficiently?',
            options: ['Queue', 'Stack', 'Array', 'Graph'],
            correctAnswer: 'Stack'
        },
        {
            question: 'Which data structure is used for backtracking?',
            options: ['Queue', 'Stack', 'Heap', 'Linked List'],
            correctAnswer: 'Stack'
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
