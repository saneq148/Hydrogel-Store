<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/Exception.php';
require './phpmailer/PHPMailer.php';
require './phpmailer/SMTP.php';
include 'vars.php';


$cookie = json_decode($_COOKIE["cart"]);

if (!isset($_COOKIE["cart"]) || !isset($_GET['model']) || !isset($_GET['name']) || !isset($_GET['phone']) || !isset($_GET['region']) || !isset($_GET['gorodNp'])) {
    header("HTTP/1.0 404 Not Found");
    echo "Error";
    exit;
}

$model = $_GET['model'];
$name = $_GET['name'];
$phone = $_GET['phone'];
$region = $_GET['region'];
$city = $_GET['gorodNp'];
$warehouse = $_GET['warehouse'];
$info = $_GET['info'];
$body = $cookie[0];
echo $body->title;


$email = 'saneq148619@gmail.com';//фильтруем
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Host       = "smtp.gmail.com";
    $mail->SMTPDebug  = 0;
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = "ssl";
    $mail->Port       = 465;
    $mail->Priority    = 3;
    $mail->CharSet     = 'UTF-8';
    $mail->Encoding    = '8bit';
    $mail->Subject     = "Тест php mailer";
    $mail->ContentType = "text/html; charset=utf-8\r\n";
    $mail->Username   = "saneq148619@gmail.com";
    $mail->Password   = $pass;
    $mail->setFrom('saneq148619@gmail.com');
    $mail->isHTML(true);
    $mail->Body = "тест";
    $mail->WordWrap = 50;
    //$mail->AddAddress($email);
    //$mail->AddAddress('Begezaaaa@gmail.com');
    //$mail->AddAddress('saneq148619@gmail.com');
    $mail->send();
if(!$mail->send()) {
    echo $mail->Body;
    exit;
}
else {
    echo "123";
}