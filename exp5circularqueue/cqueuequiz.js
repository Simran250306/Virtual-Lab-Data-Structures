(function() {
    const quizData = [
        {
            question: 'What is a circular queue?',
            options: ['A queue in which elements are added at the front and removed from the rear', 
                     'A queue in which the rear pointer points to the front when the queue is full', 
                     'A queue where elements can be added or removed from both ends', 
                     'A queue that supports only enqueue operations'],
            correctAnswer: 'A queue in which the rear pointer points to the front when the queue is full'
        },
        {
            question: 'Which of the following is a primary advantage of using a circular queue?',
            options: ['Reduces memory usage by avoiding unused spaces in the queue', 
                     'Increases the size of the queue', 
                     'Allows enqueue and dequeue operations at both ends', 
                     'Makes the queue more flexible in terms of resizing'],
            correctAnswer: 'Reduces memory usage by avoiding unused spaces in the queue'
        },
        {
            question: 'In a circular queue, what happens when the rear pointer reaches the last position in the array?',
            options: ['It resets to the front of the queue if there is space', 
                     'The queue overflows', 
                     'The queue becomes empty', 
                     'The rear pointer stops moving'],
            correctAnswer: 'It resets to the front of the queue if there is space'
        },
        {
            question: 'Which operation in a circular queue is performed to add an element?',
            options: ['Enqueue', 'Dequeue', 'Peek', 'Rotate'],
            correctAnswer: 'Enqueue'
        },
        {
            question: 'What is the condition to check if a circular queue is full?',
            options: ['Front == Rear', 
                     '(Rear + 1) % size == Front', 
                     'Front == size', 
                     'Rear == size'],
            correctAnswer: '(Rear + 1) % size == Front'
        },
        {
            question: 'Which operation removes an element from a circular queue?',
            options: ['Enqueue', 'Dequeue', 'Rotate', 'Peek'],
            correctAnswer: 'Dequeue'
        },
        {
            question: 'What happens if you try to dequeue from an empty circular queue?',
            options: ['Queue underflow occurs', 'Nothing happens', 'Program crashes', 'An error message is displayed'],
            correctAnswer: 'Queue underflow occurs'
        },
        {
            question: 'When is the circular queue considered empty?',
            options: ['When Front == Rear', 
                     'When Rear == Front', 
                     'When Front == -1', 
                     'When Rear == -1'],
            correctAnswer: 'When Front == Rear'
        },
        {
            question: 'Which of the following is a disadvantage of a circular queue?',
            options: ['The queue size is fixed', 
                     'It supports constant time enqueue and dequeue operations', 
                     'It reduces memory overhead', 
                     'It allows multiple access from both ends'],
            correctAnswer: 'The queue size is fixed'
        },
        {
            question: 'How can we implement a circular queue in memory?',
            options: ['By using a linked list', 
                     'By using a dynamic array', 
                     'By using a static array and adjusting the pointers with modulus operations', 
                     'By using a stack data structure'],
            correctAnswer: 'By using a static array and adjusting the pointers with modulus operations'
        }
    ]
    
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
