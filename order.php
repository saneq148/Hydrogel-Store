<?php
require_once('class.phpmailer.php');
require 'class.smtp.php';


for ($i=1; $i <= 4; $i++) {
  $cookie =  json_decode($_COOKIE["item-".$i]);
  if ($cookie != NULL) {
    $item += $cookie;
  }

}

$total = $_POST['total'];
$name = $_POST['name'];
$phone = $_POST['phone'];

$body = "<br>Info: <br>{$_COOKIE['item-1']} <br> {$_COOKIE['item-2']} <br> {$_COOKIE['item-3']} <br> {$_COOKIE['item-4']} <br> Total Price: {$total} <br> Ім’я {$name} <br>Номер тел. {$phone}";

$email = 'gidrogellutsk@gmail.com';//фильтруем
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
    $mail->Username   = "gidrogellutsk@gmail.com";
    $mail->Password   = "180699112870Cs";
    $mail->isHTML(true);
    $mail->Body = $body;
    $mail->WordWrap = 50;
    //$mail->AddAddress($email);
    //$mail->AddAddress('Begezaaaa@gmail.com');
    if($_COOKIE['item-1'] === NULL){
      echo "<script>alert('123')</script>";
    }
if ($total > 0 & $name !== "" & $phone !== "") {
  if(!$mail->send()) {
    echo $mail->Body;
    exit;
  }
  else {
     echo "
     <!DOCTYPE html>
     <html lang='uk' dir='tr'>
       <head>
         <meta charset='utf-8'>
         <link rel='stylesheet' href='css/main.css'>
         <title></title>
         <meta name='viewport' content='width=420, user-scalable=no'>
       </head>
       <body class='t-body'>
       <div class='wrapper'>
       <div class='black-block'>
       <div class='block-content'>
         <div class='block-content-title'>
           <strong class='text-header'>Замовлення прийнято</strong>
         </div>
         <div class='paragraph'>
           Деталі: <br>
           {$body}
         </div>
       </div>
       </div>
       </div>
       ";
   }
 }
else {
   http_response_code(400);
   echo "<h1>400 BAD REQUEST ERROR</h1>";
}
$_POST['total'] = "";
$_POST['name'] = "";
$_POST['phone'] = "";


?>
  <script type='text/javascript'>
   localStorage.clear();
   for (var i = 1; i <= 4; ++i) {
     var itemInCart = localStorage.getItem(`item-${i}`)
     var tempExp = 'Wed, 31 Oct 2012 08:50:17 GMT';
     document.cookie = `item-${i}=${itemInCart};expires = ${tempExp}`
     console.log(itemInCart);
   }
  </script>
 </body>
</html>
