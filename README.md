# Virtual Lab for Data Structures

## Overview
`VLDS` is a browser-based virtual lab for learning Data Structures. It combines theory notes, an e-book, interactive simulations, quizzes, feedback forms, and classroom utilities into one learning portal.

The project is built for two user roles:
- **Students** explore the lab content, practice experiments, and submit feedback.
- **Faculty** manage learning materials, uploads, and feedback results.

## Problem Statement
Traditional data structures labs often depend on fixed classroom time, limited lab machines, and static explanations. Students may find it difficult to visualize how stacks, queues, trees, and graphs change step by step.

This project solves that problem by providing:
- self-paced access to lab material,
- interactive visual simulations,
- guided theory resources,
- quizzes for practice and assessment,
- and a feedback flow for continuous improvement.

## Provided Solution
The solution is a full virtual lab portal that supports the complete learning journey:
1. **Start at the landing page** and sign in as a student or faculty member.
2. **Read theory content** from module notes and the bundled data structures e-book.
3. **Run experiments** through interactive simulations and quizzes.
5. **Collect feedback** from experiments and general use.

## Main Features
- Role-based login for students and faculty
- Home page with lab navigation and quick access
- Theory section with module PDFs and faculty uploads
- 13 lab experiments covering core data structures and algorithms
- Quiz pages paired with experiments
- Feedback collection for individual experiments and general usage
- File upload and PDF management for learning content

## Lab Coverage
The lab menu includes these experiments and topics:
- Stacks
- Infix to Postfix conversion
- Applications of Stack
- Postfix Evaluation
- Parenthesis Checker
- Linear Queue
- Circular Queue
- Double Ended Queue
- Singly Linked List
- Doubly Linked List
- Binary Search Tree
- AVL Tree
- Graph

## Theory Content
The theory section is organized into modules:
- Module 1: Introduction to Data Structures
- Module 2: Stacks and Queues
- Module 3: Linked List
- Module 4: Trees
- Module 5: Graphs
- Module 6: Searching Techniques

The `pdf/` folder also includes the main e-book and supporting notes.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP
- **Database:** MySQL
- **Local server stack:** XAMPP-style setup
- **Libraries used in pages:** Font Awesome, Google Fonts, Typed.js

## Project Structure
- `index.html` — landing page for the virtual lab
- `home/` — student home dashboard
- `about/` — institute, department, and project credits
- `theory/` — module notes and faculty-uploaded PDFs
- `exp1stack/` to `exp9graph/` — interactive experiments and quizzes
- `feedback/` — experiment and general feedback forms/results
- `login/` — student/faculty authentication, email verification, password reset
- `uploads/` — faculty PDF upload management
- `pdf/` — theory notes and e-book
- `media/` — images and visual assets

## Database
The project uses a MySQL database named `virtual_lab_db`.

## Setup
1. Install XAMPP or another PHP + MySQL stack.
2. Copy the project folder into your web server root, such as `htdocs`.
3. Create a MySQL database named `virtual_lab_db`.
4. Configure database credentials in:
   - `login/connection.php`
   - `theory/connection.php`
   - `uploads/connection.php`
5. Make sure the `pdf/`, `media/`, `uploads/` folders are writable where needed.
6. Open `index.html` or the appropriate local URL in your browser.

## Authentication and Access
- `login/access_control.php` enforces student and faculty access rules.
- Students are redirected away from faculty-only pages.
- Faculty pages are protected similarly.
- Email verification, password reset, and Google login support are implemented in `login/`.

## Notes
- If you want Google sign-in, update `login/google-config.php`.
- The application expects the bundled PDFs to remain in `pdf/`.
- The UI is heavily file-based, so page links matter; keep folder names unchanged unless you update the references too.

## Credits
Developed by:
- Simran Devrukhkar
- Mahi Ghevariya
- Aaryan Ghori

Guided by:
- Prof. Priyanka Deshmukh
- Prof. Pradnya Bhangale

