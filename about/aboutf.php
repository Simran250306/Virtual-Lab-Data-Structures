<?php
session_start();
require_once('../login/access_control.php');
requireFaculty();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="about.css">
    <title>Home | Virtual Lab</title>
</head>

<body>
    <header>
        <div id="headerContent">  <!-- Wrapper for content -->
            <div id="menuToggle">☰</div>  <!-- Menu Toggle Button -->
            <div class="logo-container"> <!-- Logo container -->
                <div class="img">
                    <img src="/media/somaiya.png" alt="Somaiya Logo"/>
                </div>
                <div class="logo-text">Virtual Lab | Data Structures</div>
            </div>
        </div>
    </header>
    <aside id="sidebar">
        <ul>
            <li><a href="../login/faculty/dashboard.php">Home</a></li>
            <li><a href="../../pdf/DATA STRUCTURES E-BOOK.pdf" target="_blank">E-Book</a></li>
            <li><a href="../../theory/theoryf.php">Theory</a></li>
            <li><a href="../../about/aboutf.php">About Us</a></li>
            <li><a href="../login/faculty/general_feedback_results.php">General Feedback</a></li>
            <li><a href="../login/faculty/experiment_feedback_results.php">Experiment Feedback</a></li>
            <li><a href="../uploads/manage_pdfs.php">Uploads</a></li>
            <li><a href="../login/logout.php">Logout</a></li>
        </ul>
    </aside>
    <main>
        <div class="content">
            <div class="content-container">
                <h2>About Somaiya Vidyavihar University</h2>
                <p>Somaiya Vidyavihar Education Trust was founded by Padmabhushan Pujya Shri
                    Karamshibhai Jethabhai Somaiya in September 1959, on his belief that
                    value-based holistic education has the power to transform society in a
                    single generation, remove children from the cycle of poverty, exploitation
                    and disease; and education is the fundamental to the quality of human
                    resource and development of the nation.Somaiya Vidyavihar is a confederation
                    of Schools, Faculties, Departments and Colleges. Each of these is governed
                    by their statutes and regulations but are integral to the make-up of Somaiya
                    Vidyavihar. It is known for its Science, Technology, Medicine, Engineering,
                    Management, Social Sciences and Commerce programs as for its programs for
                    academic studies in various faiths and cultures of India.</p>
            </div>

            <div class="content-container">
                <h2>About K. J. Somaiya Institute of Technology, Sion</h2>
                <p>
                  This second Engineering College established by the Somaiya Trust in the year 2001,
                  at Ayurvihar campus, Sion, was initiated with a first batch of 180 undergraduate
                  students and three branches in Engineering—namely Electronics and Telecommunication
                  Engineering, Computer Engineering, and Information Technology.<br>

                  Subsequently, The Electronics Department was founded in the year 2004 and since
                  then the Institute has strived towards providing the necessary dynamism to all
                  its stakeholders in the light of expanding knowledge and changing socio-economic
                  requirements of the modern society.<br>

                  KJSIT is recognized by the All India Council for Technical Education (AICTE) &
                  the Govt. of Maharashtra with a permanent affiliation to the University of Mumbai
                  (UOM). It is accredited with “A” Grade and 3.21 CGPA in its 1 st cycle for 5 years
                  duration by National Assessment and Accreditation Council (NAAC) and it’s three
                  programs - Computer Engineering, Electronics and Telecommunication Engineering
                  and Electronics Engineering - are accredited by National Board of Accreditation.
                  KJSIT is bestowed upon the “BEST COLLEGE AWARD” by the University of Mumbai in
                  urban region and “Best Engineering College Award" by CSI local chapter and also
                  from ISTE Maharashtra and Goa Section.<br>

                  Moreover, KJSIT has introduced a Post Graduate engineering program in Artificial
                  Intelligence from the Academic Year 2019-20.<br>

                  Additionally, an undergraduate engineering program - Artificial Intelligence and
                  Data Science - has been offered by KJSIT from the academic year 2020-21 with the
                  intake capacity of 60 seats leading the total intake increased to 360. KJSIT is
                  constantly identifying and developing latest and nascent technologies such as
                  Artificial Intelligence, Machine Learning, Deep Learning and Block Chain Technology,
                  etc. for enhancing student learning and growth.<br>

                  University Grants Commission has conferred Autonomous Status to, K J Somaiya Institute
                  of Technology, for a period of 10 years from the A.Y. 2021- 22 to A.Y. 2030-31 as per
                  the provisions of Clause 3.13 and Clause 6.4 (i) of UGC Regulations dated 12.02.2018
                  , whereby the Degree will be awarded by the University of Mumbai.<br></p>
            </div>

            <div class="content-container">
                <h2>About Department of Computer Engineering</h2>
                <p>The Computer Engineering department was established in the year 2001 to impart quality education.
                   The department has well qualified and motivated faculty members and support staff.
                   The laboratories are adequately equipped with state-of-the-art facilities.
                   The students are members of various professional bodies like IET, CSI, IEEE, NSS etc.
                   Various platforms are available for students, like project competition, technical & cultural
                   festivals, international conference, etc. to showcase their talent. It is a regular practice
                   of the department to organize industrial visits, expert talks, workshops and internship in
                   addition to the latest certification courses for students in the field of Computer engineering.
                   Student have won prizes in various national and international level paper presentation, competitions,
                   project exhibition etc. As the department has good industry interaction and alumni support, students
                   get several opportunities of internship, project guidance, placement and many more.<br>
                  The department is accredited by NBA in 2018 and intake has doubled to 120 from academic year 2019-20.
                  Besides offering undergraduate (B. Tech. in Computer Engineering) it also offers Post Graduation (M.Tech.)
                   in Artificial Intelligence. As the autonomous status is awarded by UGC from academic year 2021-22, curricula
                    have revised for UG and PG programs by Board of Studies. Exposure courses like Skill based, Activity based
                    and Technology based courses are added to motivate students to participate in various activities. Under Project
                     Based Learning (PBL) mini, minor and major projects are introduced from sem III to Sem VIII which help students
                      to work in a team and develop projects using latest technologies.<br>
                  The department has to its credits of maximum number of placements of the students in Infosys,
                   TCS, Accenture, Cognizant, L&T Infotech, CSC, Tech Mahindra, Mastek, ICON, Majesco, MuSigma,
                    BNP Paribas. Every year, few students opt for pursuing higher studies at prestigious universities
                     in India and abroad.<br></p>
            </div>

            <div class="content-container">
                <h2>Developed by</h2>
                <div class="cards-container">
                    <div class="card">
                        <img src="https://via.placeholder.com/120" alt="Profile Photo Simran" class="profile-photo">
                        <div class="profile-name">Simran Devrukhkar</div>
                        <div class="icons-container">
                            <a href="https://www.linkedin.com/in/simran-devrukhkar-1aaa70299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" class="linkedin-icon" title="LinkedIn">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/Simran250306" target="_blank" class="github-icon" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="mailto:simran.dd@somaiya.edu" class="email-icon" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                    <div class="card">
                        <img src="https://via.placeholder.com/120" alt="Profile Photo Mahi" class="profile-photo">
                        <div class="profile-name">Mahi Ghevariya</div>
                        <div class="icons-container">
                            <a href="https://www.linkedin.com/in/mahi-ghevariya-604b67284" target="_blank" class="linkedin-icon" title="LinkedIn"> <!-- Placeholder Link -->
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/mahighevariya0707" target="_blank" class="github-icon" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="mailto:mahi.ghevariya@somaiya.edu" class="email-icon" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                    <div class="card">
                        <img src="https://via.placeholder.com/120" alt="Profile Photo Aaryan" class="profile-photo">
                        <div class="profile-name">Aaryan Ghori</div>
                        <div class="icons-container">
                           <a href="https://www.linkedin.com/in/aaryan-ghori-0b780b290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" class="linkedin-icon" title="LinkedIn">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/Aaryan37" target="_blank" class="github-icon" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="mailto:aaryan.ghori@somaiya.edu" class="email-icon" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div class="content-container">
                <h2>Guided By</h2>
                    <div class="card">
                        <img src="https://via.placeholder.com/120" alt="Profile Photo Prof. Bhangale" class="profile-photo">
                        <div class="profile-name">
                            <a href="https://kjsit.somaiya.edu.in/en/view-member/220291/" target="_blank">Prof. Pradnya Bhangale</a>
                        </div>
                        <div class="icons-container">
                           <a href="#" target="_blank" class="linkedin-icon" title="LinkedIn"> <!-- Placeholder Link -->
                                <i class="fab fa-linkedin"></i>
                           </a>
                            <a href="mailto:pyb@somaiya.edu" class="email-icon" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                <div class="cards-container guide-cards"> <!-- Added class for potential specific styling -->
                    <div class="card">
                        <img src="https://via.placeholder.com/120" alt="Profile Photo Prof. Deshmukh" class="profile-photo">
                        <div class="profile-name">
                            <a href="https://kjsit.somaiya.edu.in/en/view-member/220292/" target="_blank">Prof. Priyanka Deshmukh</a>
                        </div>
                        <div class="icons-container">
                            <a href="#" target="_blank" class="linkedin-icon" title="LinkedIn"> <!-- Placeholder Link -->
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="mailto:p.deshmukh@somaiya.edu" class="email-icon" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div class="content-container">
                <h2><i>Special Thanks to</i></h2>
                <p>Dr. Shreya Patankar for giving valuable inputs!</p>
            </div>
        </div> <!-- End .content -->
    </main>

    <footer>
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
        const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.getElementById("sidebar");

        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("show");
        });

        document.addEventListener("click", (event) => {
            const isClickInside = sidebar.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside) {
                sidebar.classList.remove("show");
            }
        });
    </script>
</body>
</html>

