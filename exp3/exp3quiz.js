(function() {
    const quizData = [
        {
            question: 'Which data structure is best suited for reversing a string?',
            options: ['Queue', 'Stack', 'Linked List', 'Graph'],
            correctAnswer: 'Stack'
        },
        {
            question: 'What is the first step in reversing a string using a stack?',
            options: ['Pop all characters', 'Push all characters onto the stack', 'Sort the characters', 'Reverse the characters manually'],
            correctAnswer: 'Push all characters onto the stack'
        },
        {
            question: 'After pushing all characters of a string onto a stack, how is the reversed string obtained?',
            options: ['By popping characters one by one', 'By rearranging the stack', 'By sorting the stack', 'By converting the stack into an array'],
            correctAnswer: 'By popping characters one by one'
        },
        {
            question: 'Which application of stacks helps in checking whether a given string is a palindrome?',
            options: ['Sorting', 'Searching', 'Reversing a string', 'Graph traversal'],
            correctAnswer: 'Reversing a string'
        },
        {
            question: 'How many stacks are required for reversing a string using stack operations?',
            options: ['One', 'Two', 'Three', 'Four'],
            correctAnswer: 'One'
        },
        {
            question: 'Which data structure is used for converting a decimal number to binary?',
            options: ['Queue', 'Stack', 'Linked List', 'Graph'],
            correctAnswer: 'Stack'
        },
        {
            question: 'What is the process of converting a decimal number to binary using a stack?',
            options: ['Divide by 2 and store remainders in a stack', 'Multiply by 2 and store results', 'Subtract 2 continuously', 'Use direct binary conversion'],
            correctAnswer: 'Divide by 2 and store remainders in a stack'
        },
        {
            question: 'In decimal to binary conversion using a stack, how is the final binary number obtained?',
            options: ['By reading remainders from top to bottom', 'By reading remainders from bottom to top', 'By adding all remainders', 'By sorting remainders'],
            correctAnswer: 'By reading remainders from bottom to top'
        },
        {
            question: 'What is the binary representation of 13 using stack-based conversion?',
            options: ['1101', '1011', '1110', '1001'],
            correctAnswer: '1101'
        },
        {
            question: 'If the number 18 is converted to binary using a stack, what will be the correct binary representation?',
            options: ['10010', '11000', '10110', '10011'],
            correctAnswer: '10010'
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
