<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/Exception.php';
require './phpmailer/PHPMailer.php';
require './phpmailer/SMTP.php';
include 'vars.php';


$cookie = json_decode($_COOKIE["cart"]);
$model = $_POST['model'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$region = $_POST['region'];
$city = $_POST['gorodNp'];
$warehouse = $_POST['warehouse'];
$info = $_POST['info'];

if (!isset($_COOKIE["cart"]) || !isset($_POST['model']) || !isset($_POST['name']) || !isset($_POST['phone']) || !isset($_POST['region']) || !isset($_POST['gorodNp'])) {
    header("HTTP/1.0 405 Method Not Allowed");
    exit("Error");
}
if ($name === "" || $phone === "" || $region === "" || $city === "") {
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

$body = $cartBody.$cartInfo;

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
$mail->Subject     = "Замовлення";
$mail->ContentType = "text/html; charset=utf-8\r\n";
$mail->Username   = "saneq148619@gmail.com";
$mail->Password   = $pass;
$mail->setFrom('saneq148619@gmail.com');
$mail->isHTML(true);
$mail->Body = $body.'IP: '.$_SERVER['REMOTE_ADDR'];
$mail->WordWrap = 50;
$mail->AddAddress($email);
//$mail->AddAddress('Begezaaaa@gmail.com');
if(!$mail->send()) {
    echo "Помилка, будь ласка, зв’яжіться з нами <a href='mailto:begezaaaa@gmail.com'>begezaaaa@gmail.com</a><br>Деталі:".$body;
    exit;
}
else {
    setcookie('cart', null, -1, '/'); 
    header('Location: /success');
    exit('Loading...');
}