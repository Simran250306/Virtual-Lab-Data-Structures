(function() {
    const quizData = [
        {
            question: 'What is the result of the postfix expression "5 6 +"?',
            options: ['11', '30', '1', '12'],
            correctAnswer: '11'
        },
        {
            question: 'What does the postfix expression "3 4 5 * +" evaluate to?',
            options: ['12', '35', '8', '23'],
            correctAnswer: '23'
        },
        {
            question: 'In postfix evaluation, what does "2 3 +" mean?',
            options: ['5', '6', '1', '0'],
            correctAnswer: '5'
        },
        {
            question: 'What is the result of "4 5 6 * +"?',
            options: ['34', '30', '29', '26'],
            correctAnswer: '34'
        },
        {
            question: 'Evaluate the postfix expression "7 8 + 3 -".',
            options: ['12', '10', '8', '5'],
            correctAnswer: '12'
        },
        {
            question: 'What is the result of "10 2 8 * + 3 -" in postfix?',
            options: ['20', '23', '18', '15'],
            correctAnswer: '23'
        },
        {
            question: 'What does the postfix expression "6 2 / 3 +" evaluate to?',
            options: ['6', '5', '4', '3'],
            correctAnswer: '6'
        },
        {
            question: 'What is the result of "5 1 2 + 4 * + 3 -"?',
            options: ['14', '13', '15', '12'],
            correctAnswer: '14'
        },
        {
            question: 'Evaluate the postfix expression "2 3 + 5 *".',
            options: ['25', '40', '15', '20'],
            correctAnswer: '25'
        },
        {
            question: 'What is the result of "3 4 + 2 * 7 -"?',
            options: ['5', '6', '7', '8'],
            correctAnswer: '5'
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
