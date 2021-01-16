<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/Exception.php';
require './phpmailer/PHPMailer.php';
require './phpmailer/SMTP.php';
include 'vars.php';

$model = $_GET['model'];
$phone = $_GET['phone'];

if ($model === "" || $phone === "") {
    header("HTTP/1.0 400 Bad Request");
    exit("Error");
}

$body = "
<div class='order-model'>
    Модель: {$model}
</div>
<div class='order-phone'>
    Номер телефону: {$phone}
</div>";


$email = 'saneq148619@gmail.com';
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
$mail->Subject     = "Поле перевірте, чи є у нас плівка під ваш гаджет:";
$mail->ContentType = "text/html; charset=utf-8\r\n";
$mail->Username   = "saneq148619@gmail.com";
$mail->Password   = $pass;
$mail->setFrom('saneq148619@gmail.com');
$mail->isHTML(true);
$mail->Body = $body.'IP: '.$_SERVER['REMOTE_ADDR'];
$mail->WordWrap = 50;
$mail->AddAddress($email);
//$mail->AddAddress('Begezaaaa@gmail.com');
$mail->send();
if(!$mail->send()) {
    echo "Помилка, будь ласка, зв’яжіться з нами <a href='mailto:begezaaaa@gmail.com'>begezaaaa@gmail.com</a><br>Деталі:".$body;
    exit;
}
else {
    setcookie('cart', null, -1, '/'); 
    header('Location: /success');
    exit('Loading...');
}

