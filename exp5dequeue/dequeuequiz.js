(function() {
    const quizData = [
        {
            question: 'What is a double-ended queue (Deque)?',
            options: [
                'A queue where elements can be added or removed from both ends',
                'A queue where elements can only be added at the rear',
                'A stack where elements can be removed from the top only',
                'A queue where elements follow LIFO order'
            ],
            correctAnswer: 'A queue where elements can be added or removed from both ends'
        },
        {
            question: 'Which of the following operations are allowed in a deque?',
            options: [
                'Insertion and deletion only from the front',
                'Insertion and deletion only from the rear',
                'Insertion and deletion from both front and rear',
                'Only deletion from the front'
            ],
            correctAnswer: 'Insertion and deletion from both front and rear'
        },
        {
            question: 'Which type of deque allows insertion only at the rear and deletion only from the front?',
            options: [
                'Input-restricted deque',
                'Output-restricted deque',
                'Circular queue',
                'Priority queue'
            ],
            correctAnswer: 'Input-restricted deque'
        },
        {
            question: 'Which type of deque allows insertion only at the front and deletion only from the rear?',
            options: [
                'Input-restricted deque',
                'Output-restricted deque',
                'Priority queue',
                'Circular queue'
            ],
            correctAnswer: 'Output-restricted deque'
        },
        {
            question: 'What happens when you try to remove an element from an empty deque?',
            options: [
                'Deque underflow occurs',
                'Deque overflow occurs',
                'The element is removed successfully',
                'The program continues without any issue'
            ],
            correctAnswer: 'Deque underflow occurs'
        },
        {
            question: 'Which real-world scenario can be represented using a deque?',
            options: [
                'A call center queue where customers are served in order',
                'A text editor’s undo-redo functionality',
                'A stack of plates',
                'A tree structure in a database'
            ],
            correctAnswer: 'A text editor’s undo-redo functionality'
        },
        {
            question: 'What is the difference between a deque and a normal queue?',
            options: [
                'A deque allows insertion and deletion from both ends, while a queue allows only rear insertion and front deletion',
                'A queue allows insertion from both ends, while a deque allows only rear insertion',
                'A deque always follows LIFO order, whereas a queue follows FIFO',
                'There is no difference'
            ],
            correctAnswer: 'A deque allows insertion and deletion from both ends, while a queue allows only rear insertion and front deletion'
        },
        {
            question: 'Which of the following is NOT a deque operation?',
            options: [
                'InsertFront',
                'InsertRear',
                'DeleteMiddle',
                'DeleteRear'
            ],
            correctAnswer: 'DeleteMiddle'
        },
        {
            question: 'Which of the following can be efficiently implemented using a deque?',
            options: [
                'Palindromic checking of a string',
                'Binary search',
                'Depth-first search',
                'Sorting an array'
            ],
            correctAnswer: 'Palindromic checking of a string'
        },
        {
            question: 'Which data structure can be used to efficiently implement a deque?',
            options: [
                'Array',
                'Doubly linked list',
                'Single linked list',
                'Binary tree'
            ],
            correctAnswer: 'Doubly linked list'
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
