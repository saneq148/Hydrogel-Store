<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/Exception.php';
require './phpmailer/PHPMailer.php';
require './phpmailer/SMTP.php';
include 'vars.php';


$cookie = json_decode($_COOKIE["cart"]);
$model = $_GET['model'];
$name = $_GET['name'];
$phone = $_GET['phone'];
$region = $_GET['region'];
$city = $_GET['gorodNp'];
$warehouse = $_GET['warehouse'];
$info = $_GET['info'];

if (!isset($_COOKIE["cart"]) || !isset($_GET['model']) || !isset($_GET['name']) || !isset($_GET['phone']) || !isset($_GET['region']) || !isset($_GET['gorodNp'])) {
    header("HTTP/1.0 405 Method Not Allowed");
    exit("Error");
}
if ($model === "" || $name === "" || $phone === "" || $region === "" || $city === "") {
    header("HTTP/1.0 400 Bad Request");
    exit("Error");
}

foreach ($cookie as $key => $value) {
    $cartBody .= '
    <div class="item-in-cart">
      <div class="item-in-cart__img">
        <img src='.$value->{"img"}.' width="50" height="50" alt="">
      </div>
      <div class="item-in-cart__title">
        <p>'.$value->{"title"}.'</p>
      </div>
      <div class="item-in-cart__count">
        <p>Кількість: '.$value->{"count"}.'шт.</p>
      </div>
    </div>';
}
$cartInfo = "
<div class='order-model'>
    Модель: {$model}
</div>
<div class='order-name'>
    Ім’я: {$name}
</div>
<div class='order-phone'>
    Телефон: {$phone}
</div>
<div class='order-region'>
    Область: {$region}
</div>
<div class='order-city'>
    Місто: {$city}
</div>
<div class='order-warehouse'>
    {$warehouse}
</div>
<div class='order-info'>
    Коментар: {$info}
</div>";

if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}

$body = $cartBody.$cartInfo.$ip;
echo $body;


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
$mail->Body = "";
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