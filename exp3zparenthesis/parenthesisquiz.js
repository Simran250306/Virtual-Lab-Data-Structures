(function() {
    const quizData = [
        {
            question: 'Which of the following is a balanced parenthesis expression?',
            options: ['(())', '(()', '())', '(()))'],
            correctAnswer: '(())'
        },
        {
            question: 'Which data structure is used to check for balanced parentheses?',
            options: ['Queue', 'Stack', 'Linked List', 'Array'],
            correctAnswer: 'Stack'
        },
        {
            question: 'What is the output of checking "{[()]}" for balanced parentheses?',
            options: ['Balanced', 'Unbalanced', 'Error', 'None'],
            correctAnswer: 'Balanced'
        },
        {
            question: 'Which of the following is NOT a balanced expression?',
            options: ['{[()]}', '{[(])}', '{{[[(())]]}}', '(){}[]'],
            correctAnswer: '{[(])}'
        },
        {
            question: 'What happens if you try to check a balanced expression with an empty stack?',
            options: ['It returns balanced', 'It returns unbalanced', 'It throws an error', 'It returns null'],
            correctAnswer: 'It returns unbalanced'
        },
        {
            question: 'Which of the following is an example of an unbalanced expression?',
            options: ['(a + b) * (c - d)', '((a + b) * (c - d)', '{[a + b] * (c - d)}', '[{(a + b) * (c - d)}]'],
            correctAnswer: '((a + b) * (c - d)'
        },
        {
            question: 'What should be the state of the stack after checking a balanced expression?',
            options: ['Empty', 'Partially filled', 'Completely filled', 'Unknown'],
            correctAnswer: 'Empty'
        },
        {
            question: 'Which bracket type does NOT contribute to checking balanced parentheses?',
            options: ['Round brackets ()', 'Curly brackets {}', 'Square brackets []', 'Angle brackets <>'],
            correctAnswer: 'Angle brackets <>'
        },
        {
            question: 'What is the first step when checking if an expression has balanced parentheses?',
            options: ['Push all opening brackets onto a stack', 'Push all closing brackets onto a stack', 'Check for operators first', 'Ignore the parentheses'],
            correctAnswer: 'Push all opening brackets onto a stack'
        },
        {
            question: 'What is the result of checking "[{()}]" for balanced parentheses?',
            options: ['Balanced', 'Unbalanced', 'Error', 'None'],
            correctAnswer: 'Balanced'
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
