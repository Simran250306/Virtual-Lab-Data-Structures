<?php
session_start();
include '../login/access_control.php';
requireStudent();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback - Linear Queue</title>
    <link rel="stylesheet" href="fb.css">
</head>
<body>
<header>
        <div id="headerContent">
            <div class="logo-container">
                <div class="img">
                    <img src="../media/somaiya.png" alt="Somaiya Logo"/>
                </div>
                <!-- Update Title -->
                <div class="logo-text">Virtual Lab | Data Structures | Linear Queue Feedback</div>
            </div>
        </div>
    </header>
    <main>
        <div class="container" id="stackFormContainer">
            <h2>Linear Queue Feedback Form</h2>
            <form id="stackFeedbackForm" onsubmit="submitStackFeedback(event); return false;">
                <fieldset class="form-section">
                    <div class="feedback-question">
                        <label class="question-text">1. How well do you understand the FIFO (First-In, First-Out) principle of a linear queue?</label>
                        <div class="radio-options-vertical">
                            <label><input type="radio" name="q1" value="1" required> 1 - Not at all</label><br>
                            <label><input type="radio" name="q1" value="2"> 2</label><br>
                            <label><input type="radio" name="q1" value="3"> 3</label><br>
                            <label><input type="radio" name="q1" value="4"> 4</label><br>
                            <label><input type="radio" name="q1" value="5"> 5 - Very well</label>
                        </div>
                    </div>
                    <div class="feedback-question">
                        <label class="question-text">2. How confident are you in implementing enqueue and dequeue operations for a linear queue?</label>
                        <div class="radio-options-vertical">
                            <label><input type="radio" name="q2" value="1" required> 1 - Not confident</label><br>
                            <label><input type="radio" name="q2" value="2"> 2</label><br>
                            <label><input type="radio" name="q2" value="3"> 3</label><br>
                            <label><input type="radio" name="q2" value="4"> 4</label><br>
                            <label><input type="radio" name="q2" value="5"> 5 - Very confident</label>
                        </div>
                    </div>
                    <div class="feedback-question">
                        <label class="question-text">3. How clear was the concept of using front and rear pointers to manage the queue?</label>
                        <div class="radio-options-vertical">
                            <label><input type="radio" name="q3" value="1" required> 1 - Not clear</label><br>
                            <label><input type="radio" name="q3" value="2"> 2</label><br>
                            <label><input type="radio" name="q3" value="3"> 3</label><br>
                            <label><input type="radio" name="q3" value="4"> 4</label><br>
                            <label><input type="radio" name="q3" value="5"> 5 - Very clear</label>
                        </div>
                    </div>
                    <div class="feedback-question">
                        <label class="question-text">4. How well did the simulation help you visualize the movement of the front and rear pointers?</label>
                        <div class="radio-options-vertical">
                            <label><input type="radio" name="q4" value="1" required> 1 - Not well</label><br>
                            <label><input type="radio" name="q4" value="2"> 2</label><br>
                            <label><input type="radio" name="q4" value="3"> 3</label><br>
                            <label><input type="radio" name="q4" value="4"> 4</label><br>
                            <label><input type="radio" name="q4" value="5"> 5 - Very well</label>
                        </div>
                    </div>
                    <div class="feedback-question">
                        <label class="question-text">5. How would you rate the clarity of the explanation on queue overflow and underflow conditions?</label>
                        <div class="radio-options-vertical">
                            <label><input type="radio" name="q5" value="1" required> 1 - Poor</label><br>
                            <label><input type="radio" name="q5" value="2"> 2</label><br>
                            <label><input type="radio" name="q5" value="3"> 3</label><br>
                            <label><input type="radio" name="q5" value="4"> 4</label><br>
                            <label><input type="radio" name="q5" value="5"> 5 - Excellent</label>
                        </div>
                    </div>
                </fieldset>
                <div style="display: flex; justify-content: center; margin-top: 20px;">
                    <button type="submit">Submit Feedback</button>
                </div>
            </form> <!-- Moved closing form tag here -->

            <!-- Go Back Button (Outside the form) -->
            <!-- Modify the onclick if you want it to go to a specific stack page -->
            <button class="pushbtn" onclick="goBack()" style="display: block; margin: 20px auto;">Go Back</button>
        </div> 

    </main>

    <footer>
        <!-- Footer remains the same -->
        <div class="dept">
            <p>Department of Computer Engineering, KJSIT
                <br>
                Developed by : Simran Devrukhkar, Mahi Ghevariya, Aaryan Ghori
                <br>
                Guided by : <a href="https://kjsit.somaiya.edu.in/en/view-member/220291/">Prof. Pradnya Bhangale</a>, <a href="https://kjsit.somaiya.edu.in/en/view-member/220292/">Prof. Priyanka Deshmukh</a>
            </p>
        </div>
    </footer>

    <script>
        function goBack() {
             window.history.back();
        }

        function submitStackFeedback(event) {
           event.preventDefault();
           
           const form = document.getElementById('stackFeedbackForm');
           const formData = new FormData(form);
           let isValid = true;
           let firstErrorElement = null;

           // --- Validation (from your original code) ---
           form.querySelectorAll('.error-highlight, .feedback-question.error-highlight').forEach(el => el.classList.remove('error-highlight'));
           const radioGroups = [
               'q1', 'q2', 'q3', 'q4', 'q5'
           ];

           radioGroups.forEach(groupName => {
               const firstRadio = form.querySelector(`input[name="${groupName}"]`);
               if (!formData.has(groupName) && firstRadio) {
                   isValid = false;
                   const questionDiv = firstRadio.closest('.feedback-question');
                   if (questionDiv) {
                       questionDiv.classList.add('error-highlight');
                       if (!firstErrorElement) firstErrorElement = questionDiv;
                   }
               }
           });

           if (!isValid) {
               alert("Please answer all questions before submitting.");
               if (firstErrorElement) firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
               return;
           }

           // --- Data Submission to Database ---
           const promises = [];
           let questionNumber = 1;
           for (const groupName of radioGroups) {
               const feedbackValue = formData.get(groupName);
               const promise = fetch('submit_experiment_feedback.php', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                   body: `experiment_identifier=linearqueue&question_number=${questionNumber}&feedback=${encodeURIComponent(feedbackValue)}`
               });
               promises.push(promise);
               questionNumber++;
           }

           Promise.all(promises)
               .then(responses => {
                   const allOk = responses.every(res => res.ok);
                   if (allOk) {
                       const formContainer = document.getElementById('stackFormContainer');
                       formContainer.innerHTML = `
                           <h2 style="text-align: center; width: 100%;">Thank You!</h2>
                           <p style="text-align: center; width: 100%; margin-bottom: 20px;">Your feedback has been submitted successfully.</p>
                           <button class="pushbtn" onclick="window.location.href='feedbackpg.php'" style="display: block; margin: 20px auto;">Back to Feedback Menu</button>
                       `;
                   } else {
                       throw new Error('An error occurred during submission.');
                   }
               })
               .catch(error => {
                   console.error('Feedback submission error:', error);
                   alert('There was an error submitting your feedback. Please try again.');
               });
        }

    </script>
</body>
</html>
