<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "virtual_lab_db";  // Replace with your DB name

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
