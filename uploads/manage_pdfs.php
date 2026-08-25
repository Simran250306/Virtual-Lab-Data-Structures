<?php
session_start();
require_once("../login/access_control.php");
requireFaculty(); // Only faculty can access this page
include 'connection.php';
$alertMessage = ""; // Initialize an empty variable for alert messages

// Upload Logic
if (isset($_POST['upload'])) {
    $file = $_FILES['pdfFile'];

    if ($file['error'] === 0) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $filename = basename($file['name']);
        // Sanitize filename to prevent issues and potential security risks
        $safe_filename = preg_replace("/[^a-zA-Z0-9_.-]/", "_", $filename);
        $i = 1;
        $targetPath = $uploadDir . $safe_filename;
        // Prevent overwriting: if file exists, append a number
        while (file_exists($targetPath)) {
            $nameWithoutExt = pathinfo($safe_filename, PATHINFO_FILENAME);
            $extension = pathinfo($safe_filename, PATHINFO_EXTENSION);
            $targetPath = $uploadDir . $nameWithoutExt . "_" . $i++ . "." . $extension;
        }
        $finalFilenameToSave = basename($targetPath);


        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            $stmt = $conn->prepare("INSERT INTO pdfs (filename, path) VALUES (?, ?)");
            if ($stmt) {
                $stmt->bind_param("ss", $finalFilenameToSave, $targetPath);
                if ($stmt->execute()) {
                    $alertMessage = "File '{$finalFilenameToSave}' uploaded successfully!";
                } else {
                    $alertMessage = "Database error uploading file: " . $conn->error;
                }
                $stmt->close();
            } else {
                $alertMessage = "Database prepare error: " . $conn->error;
            }
        } else {
            $alertMessage = "Failed to move uploaded file.";
        }
    } else {
        // Provide more specific error messages based on $file['error'] code
        $phpFileUploadErrors = array(
            0 => 'There is no error, the file uploaded with success',
            1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
            2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
            3 => 'The uploaded file was only partially uploaded',
            4 => 'No file was uploaded',
            6 => 'Missing a temporary folder',
            7 => 'Failed to write file to disk.',
            8 => 'A PHP extension stopped the file upload.',
        );
        $errorCode = $file['error'];
        $errorMessageText = isset($phpFileUploadErrors[$errorCode]) ? $phpFileUploadErrors[$errorCode] : 'Unknown upload error';
        $alertMessage = "Error uploading file: {$errorMessageText} (Code: {$errorCode})";
    }
}

// Delete Logic
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $pathToDelete = '';

    // Fetch file path
    $stmt_select = $conn->prepare("SELECT path FROM pdfs WHERE id = ?");
    if ($stmt_select) {
        $stmt_select->bind_param("i", $id);
        $stmt_select->execute();
        $stmt_select->bind_result($pathToDelete);
        $stmt_select->fetch();
        $stmt_select->close();

        $fileDeletedFromServer = false;
        if ($pathToDelete && file_exists($pathToDelete)) {
            if (unlink($pathToDelete)) {
                $fileDeletedFromServer = true;
            }
        } elseif ($pathToDelete && !file_exists($pathToDelete)) {
             // File path in DB but not on server - still allow DB record deletion
            $fileDeletedFromServer = true; // Treat as if "deleted" for the purpose of DB record
        }


        // Delete DB record
        $stmt_delete = $conn->prepare("DELETE FROM pdfs WHERE id = ?");
        if ($stmt_delete) {
            $stmt_delete->bind_param("i", $id);
            if ($stmt_delete->execute()) {
                if ($fileDeletedFromServer) {
                    $alertMessage = "PDF deleted successfully (record and file if existed).";
                } else if ($pathToDelete) {
                     $alertMessage = "PDF record deleted, but file '{$pathToDelete}' could not be removed from server or was not found.";
                } else {
                    $alertMessage = "PDF record deleted (file path was not found in DB).";
                }
            } else {
                $alertMessage = "Database error deleting PDF record: " . $conn->error;
            }
            $stmt_delete->close();
        } else {
            $alertMessage = "Database prepare error for delete: " . $conn->error;
        }
    } else {
         $alertMessage = "Database prepare error for select: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../theory/theory.css">
    <link rel="stylesheet" href="manage.css">
    <title>Uploads | Virtual Lab</title>
</head>

<body>
    <header>
        <div id="headerContent">  <!-- Wrapper for content -->
            <div id="menuToggle">☰</div>  <!-- Menu Toggle Button -->
            <div class="logo-container"> <!-- Logo container -->
                <div class="img">
                    <img src="/media/somaiya.png" alt="Somaiya Logo"/>
                </div>
                <div class="logo-text">Virtual Lab | Data Structures | Uploads</div>
            </div>
        </div>
    </header>
    <aside id="sidebar">
        <ul>
            <li><a href="../login/faculty/dashboard.php">Home</a></li>
            <li><a href="../pdf/DATA STRUCTURES E-BOOK.pdf" target="_blank">E-Book</a></li>
            <li><a href="../theory/theoryf.php">Theory</a></li>
            <li><a href="../about/aboutf.php">About Us</a></li>
            <li><a href="../login/faculty/general_feedback_results.php">General Feedback</a></li>
            <li><a href="../login/faculty/experiment_feedback_results.php">Experiment Feedback</a></li>
            <li><a href="../uploads/manage_pdfs.php">Uploads</a></li>
            <li><a href="../login/logout.php">Logout</a></li>
        </ul>
    </aside>
    <main>
    <h2>Upload PDF</h2>
    <form method="POST" enctype="multipart/form-data">
        <input type="file" name="pdfFile" accept=".pdf" required>
        <button type="submit" name="upload">Upload</button>
    </form>

    <h2>Uploaded PDFs</h2>
    <table border="1" cellpadding="10">
        <tr>
            <th>ID</th>
            <th>Filename</th>
            <th>View</th>
            <th>Delete</th>
        </tr>
        <?php
        $result = $conn->query("SELECT * FROM pdfs ORDER BY id DESC");
        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['filename']}</td>
                <td><a href='{$row['path']}' target='_blank'>View</a></td>
                <td><a href='manage_pdfs.php?delete={$row['id']}' onclick=\"return confirm('Delete this PDF?');\">Delete</a></td>
            </tr>";
        }
        ?>
    </table>
    
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
