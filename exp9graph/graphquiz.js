(function() {
    const quizData = [
        {
            question: 'What is a graph in data structures?',
            options: [
                'A linear data structure',
                'A collection of nodes and edges',
                'A type of stack',
                'A tree with a fixed depth'
            ],
            correctAnswer: 'A collection of nodes and edges'
        },
        {
            question: 'Which of the following represents an undirected graph?',
            options: [
                'Edges have direction',
                'Edges do not have direction',
                'Nodes are connected in a hierarchical manner',
                'Edges connect only to the root node'
            ],
            correctAnswer: 'Edges do not have direction'
        },
        {
            question: 'Which representation is better for sparse graphs?',
            options: [
                'Adjacency Matrix',
                'Adjacency List',
                'Edge Matrix',
                'Node Tree'
            ],
            correctAnswer: 'Adjacency List'
        },
        {
            question: 'What is a self-loop in a graph?',
            options: [
                'An edge connecting a vertex to itself',
                'A loop in a function',
                'A circular linked list',
                'An edge with no weight'
            ],
            correctAnswer: 'An edge connecting a vertex to itself'
        },
        {
            question: 'Which of the following is true for a tree?',
            options: [
                'It is a type of graph with cycles',
                'It is an undirected graph with no cycles',
                'It is a graph with loops',
                'It is a complete graph'
            ],
            correctAnswer: 'It is an undirected graph with no cycles'
        },
        {
            question: 'What is the minimum number of edges a connected graph with n vertices must have?',
            options: [
                'n',
                'n - 1',
                'n + 1',
                '2n'
            ],
            correctAnswer: 'n - 1'
        },
        {
            question: 'Which of the following is used to represent a graph in memory?',
            options: [
                'Arrays only',
                'Adjacency matrix or adjacency list',
                'Linked list only',
                'Stacks and queues'
            ],
            correctAnswer: 'Adjacency matrix or adjacency list'
        },
        {
            question: 'What is a complete graph?',
            options: [
                'A graph with isolated nodes',
                'A graph where all vertices are connected to each other',
                'A graph with no edges',
                'A graph with only one node'
            ],
            correctAnswer: 'A graph where all vertices are connected to each other'
        },
        {
            question: 'Which of these graphs contains no cycles and is directed?',
            options: [
                'Undirected graph',
                'DAG (Directed Acyclic Graph)',
                'Weighted graph',
                'Tree'
            ],
            correctAnswer: 'DAG (Directed Acyclic Graph)'
        },
        {
            question: 'In a simple graph, how many edges can exist between two vertices?',
            options: [
                'One',
                'Two',
                'Any number',
                'Zero'
            ],
            correctAnswer: 'One'
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
    let timeLeft = 30;
    let timerInterval;
    const timerDisplay = document.getElementById('timer');
    

    nextButton.addEventListener('click', nextQuestion);
    attemptAgainButton.addEventListener('click', attemptQuizAgain);
    goBackButton.addEventListener('click', goBack);

    function displayQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        quizContainer.textContent = `Q${currentQuestionIndex + 1}. ${currentQuestion.question}`;
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
