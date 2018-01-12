<?php

$target_dir = "Uploads";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$XMLFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = mime_content_type($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
          echo "File is an: " . mime_content_type($_FILES["fileToUpload"]["tmp_name"]) . " file. ";
        $uploadOk = 1;
    } else {
        echo "File is not an appropriate file format. ";
        echo
        $uploadOk = 0;
    }
}

if (file_exists($target_file)) {
    echo "Sorry, file already exists. ";
    $uploadOk = 0;
}

if($XMLFileType != "xml") {
    echo "Sorry, only XML files are allowed. ";
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded. ";

} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

echo "<br />Please wait to be redirected, if not please follow this link:";
echo "<br /> <a href='http://localhost/sky/home.html'>Moodslider</a>";
header("refresh:5; url=http://localhost/sky/home.html");

?>
