<?php
session_start();
include '../login/access_control.php';
requireStudent(); // Ensure user is logged in
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stack Feedback</title>
    <link rel="stylesheet" href="fb.css"> <!-- Link to your COMMON feedback CSS file -->
    <style>
        .form-section {
            border-top: 1px solid #ccc;
            padding-top: 20px;
            margin-top: 30px;
        }
        .form-section h3 {
            margin-bottom: 20px;
            color: #555;
        }
        textarea {
            width: 100%;
            min-height: 80px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-family: inherit;
            font-size: 1em;
            box-sizing: border-box;
            margin-top: 5px;
        }
        /* Added rule for radio button error highlighting */
       .feedback-question.error-highlight label.question-text {
             color: #e74c3c; /* Make question text red */
        }
       .feedback-question.error-highlight .radio-options-vertical {
             background-color: #fff0f0;
             border: 1px solid #d8a0a0;
             padding: 10px;
             margin-top: 5px; /* Add some space from the label */
             border-radius: 4px;
       }
        /* Highlight for standard inputs (though none are in this specific form) */
        input.error-highlight, select.error-highlight, textarea.error-highlight {
             border-color: #e74c3c;
             background-color: #fdd;
        }
        pre {
            text-align: left; background-color: #f0f0f0; padding: 15px;
            border: 1px solid #ddd; border-radius: 4px; width: 90%;
            margin: 15px auto; overflow-x: auto; font-size: 0.9em;
            line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;
        }
         /* Ensure main container can center content for thank you message */
         .container {
            display: flex;
            flex-direction: column;
            align-items: stretch; /* Default: stretch children */
         }
    </style>
</head>
<body>
    <header>
        <div id="headerContent">
            <div class="logo-container">
                <div class="img">
                    <img src="../media/somaiya.png" alt="Somaiya Logo"/>
                </div>
                <!-- Update Title -->
                <div class="logo-text">Virtual Lab | Data Structures | Stack Feedback</div>
            </div>
        </div>
    </header>

    <main>
        <!-- Combined Form Container -->
        <div class="container" id="stackFormContainer"> <!-- Changed ID -->
            <h2>Stack Feedback Form</h2> <!-- Changed Title -->
            <form id="stackFeedbackForm" onsubmit="submitStackFeedback(event); return false;"> <!-- Changed ID and function -->

                <!-- Feedback Questions Section -->
                <fieldset class="form-section">
                  
                     <!-- Q1: Basic Concept -->
                     <div class="feedback-question" style="width: 100%; max-width: 600px; margin: 15px 0;">
                        <label class="question-text">1. How confident are you in your understanding of the stack data structure and its basic concepts?</label>
                        <div class="radio-options-vertical" style="text-align: center;">
                            <label><input type="radio" name="q1_concept_understanding" value="1" required> 1 - Not at all confident</label><br>
                            <label><input type="radio" name="q1_concept_understanding" value="2"> 2</label><br>
                            <label><input type="radio" name="q1_concept_understanding" value="3"> 3</label><br>
                            <label><input type="radio" name="q1_concept_understanding" value="4"> 4</label><br>
                            <label><input type="radio" name="q1_concept_understanding" value="5"> 5 - Very confident</label>
                        </div>
                    </div>

                    <!-- Q2 -->
                    <div class="feedback-question" style="width: 100%; max-width: 600px; margin: 15px 0;">
                        <label class="question-text">2. How well do you understand how push and pop operations work in a stack?</label>
                        <div class="radio-options-vertical" style="text-align: center;">
                            <label><input type="radio" name="q2_push_understanding" value="1" required> 1 - Not at all</label><br>
                            <label><input type="radio" name="q2_push_understanding" value="2"> 2</label><br>
                            <label><input type="radio" name="q2_push_understanding" value="3"> 3</label><br>
                            <label><input type="radio" name="q2_push_understanding" value="4"> 4</label><br>
                            <label><input type="radio" name="q2_push_understanding" value="5"> 5 - Completely</label>
                        </div>
                    </div>

                    <!-- Q3 -->
                    <div class="feedback-question" style="width: 100%; max-width: 600px; margin: 15px 0;">
                        <label class="question-text">3. How familiar are you with implementing a stack using arrays and linked lists?</label>
                        <div class="radio-options-vertical" style="text-align: center;">
                            <label><input type="radio" name="q3_pop_understanding" value="1" required> 1 - Not familiar</label><br> <!-- Changed name to q3_implementation_familiarity -->
                            <label><input type="radio" name="q3_pop_understanding" value="2"> 2</label><br> <!-- Changed name to q3_implementation_familiarity -->
                            <label><input type="radio" name="q3_pop_understanding" value="3"> 3</label><br> <!-- Changed name to q3_implementation_familiarity -->
                            <label><input type="radio" name="q3_pop_understanding" value="4"> 4</label><br> <!-- Changed name to q3_implementation_familiarity -->
                            <label><input type="radio" name="q3_pop_understanding" value="5"> 5 - Very familiar</label> <!-- Changed name to q3_implementation_familiarity -->
                        </div>
                    </div>

                    <!-- Q4 -->
                    <div class="feedback-question" style="width: 100%; max-width: 600px; margin: 15px 0;">
                        <label class="question-text">4. How confident are you in tracing the behavior of a stack during the execution of an algorithm?</label>
                        <div class="radio-options-vertical" style="text-align: center;">
                            <label><input type="radio" name="q4_overflow_understanding" value="1" required> 1 - Not at all confident</label><br> <!-- Changed name to q4_tracing_confidence -->
                            <label><input type="radio" name="q4_overflow_understanding" value="2"> 2</label><br> <!-- Changed name to q4_tracing_confidence -->
                            <label><input type="radio" name="q4_overflow_understanding" value="3"> 3</label><br> <!-- Changed name to q4_tracing_confidence -->
                            <label><input type="radio" name="q4_overflow_understanding" value="4"> 4</label><br> <!-- Changed name to q4_tracing_confidence -->
                            <label><input type="radio" name="q4_overflow_understanding" value="5"> 5 - Very confident</label> <!-- Changed name to q4_tracing_confidence -->
                        </div>
                    </div>

                    <!-- Q5 -->
                    <div class="feedback-question" style="width: 100%; max-width: 600px; margin: 15px 0;">
                        <label class="question-text">5. How well do you understand stack-related issues such as overflow and underflow conditions?</label>
                        <div class="radio-options-vertical" style="text-align: center;">
                            <label><input type="radio" name="q5_underflow_understanding" value="1" required> 1 - Not at all</label><br> <!-- Changed name to q5_issues_understanding -->
                            <label><input type="radio" name="q5_underflow_understanding" value="2"> 2</label><br> <!-- Changed name to q5_issues_understanding -->
                            <label><input type="radio" name="q5_underflow_understanding" value="3"> 3</label><br> <!-- Changed name to q5_issues_understanding -->
                            <label><input type="radio" name="q5_underflow_understanding" value="4"> 4</label><br> <!-- Changed name to q5_issues_understanding -->
                            <label><input type="radio" name="q5_underflow_understanding" value="5"> 5 - Very well</label> <!-- Changed name to q5_issues_understanding -->
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
                Guided by : <a href="https://kjsit.somaiya.edu.in/en/view-member/220291/">Prof. Pradnya Bhangale</a>, 
                <a href="https://kjsit.somaiya.edu.in/en/view-member/220292/">Prof. Priyanka Deshmukh</a>
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
               'q1_concept_understanding', 'q2_push_understanding', 'q3_pop_understanding',
               'q4_overflow_understanding', 'q5_underflow_understanding'
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
                   body: `experiment_identifier=stack&question_number=${questionNumber}&feedback=${encodeURIComponent(feedbackValue)}`
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
