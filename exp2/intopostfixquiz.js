(function() {
    const quizData = [
        {
            question: 'When an operand is read, which of the following is done?',
            options: ['It is placed on to the output', 'It is placed in operator stack', 'It is ignored', 'Operator stack is emptied'],
            correctAnswer: 'It is placed on to the output'
        },
        {
            question: 'Which of the following is an infix expression?',
            options: ['(a+b)*(c+d)', 'ab+c*', '+ab', 'abc+*'],
            correctAnswer: '(a+b)*(c+d)'
        },
        {
            question: 'Which of the following data structure is used to convert postfix expression to infix expression?',
            options: ['Queue', 'Linked List', 'Stack', 'Heap'],
            correctAnswer: 'Stack'
        },
        {
            question: 'Parentheses are simply ignored in the conversion of infix to postfix expression.',
            options: ['True', 'False'],
            correctAnswer: 'False'
        },
        {
            question: 'What is the postfix expression for the following infix expression?<br> a/b^c-d',
            options: ['abcd^/-', 'ab/cd^-', 'ab/^cd-', 'abc^/d-'],
            correctAnswer: 'abc^/d-'
        },
        {
            question: 'Which of the following statement is incorrect with respect to infix to postfix conversion algorithm?',
            options: ['operand is always placed in the output', 'operator is placed in the stack when the stack operator has lower precedence','parenthesis are included in the output', 'higher and equal priority operators follow the same condition'],
            correctAnswer: 'parenthesis are included in the output'
        },
        {
            question: 'In infix to postfix conversion algorithm, the operators are associated from?',
            options: ['right to left','left to right', 'centre to left', 'centre to right'],
            correctAnswer: 'left to right'
        },
        {
            question: 'What is the postfix expression for the infix expression?a-b-c',
            options: ['abc--', '-ab-c', 'ab – c –', '– -abc'],
            correctAnswer: 'ab –c –'
        },
        {
            question: 'Which of the following is valid reverse polish expression?',
            options: ['a op b', ' op a b', 'a b op', 'both op a b and a b op'],
            correctAnswer: 'a b op'
        },
        {
            question: 'It is easier for a computer to process a postfix expression than an infix expression.',
            options: ['True', 'False'],
            correctAnswer: 'True'
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
