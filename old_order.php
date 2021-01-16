<?php
require_once('class.phpmailer.php');
require 'class.smtp.php';
include 'vars.php';


for ($i=1; $i <= 4; $i++) {
  $cookie = json_decode($_COOKIE["item-".$i]);
  if ($cookie !== NULL) {
    $test = '
    <div class="item-in-cart">
      <div class="item-in-cart__img">
        <img src='.$cookie->{"img"}.' width="50" height="50" alt="">
      </div>
      <div class="item-in-cart__title">
        <p>'.$cookie->{"title"}.'</p>
      </div>
      <div class="item-in-cart__count">
        <p>Кількість: '.$cookie->{"count"}.'шт.</p>
      </div>
    </div>'.$test;
  }
}

$total = $_POST['total'];
$name = $_POST['name'];
$phone = $_POST['phone'];

$body = "<br>Info: <br>{$test}<br> Загальна вартість: {$total} <br> Ім’я: {$name} <br>Тел.: {$phone}";

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
    $mail->Body = $body;
    $mail->WordWrap = 50;
    $mail->AddAddress($email);
    //$mail->AddAddress('Begezaaaa@gmail.com');
    $mail->AddAddress('saneq148619@gmail.com');
    //if($_COOKIE['item-1'] === NULL){
    //  echo "<script>alert('123')</script>";
    //}
if ($total > 0 & $name !== "" & $phone !== "") {
  if(!$mail->send()) {
    echo $mail->Body;
    exit;
  }
  else {
     echo "<!DOCTYPE html>
     <html lang='ua'>
     <head>
       <meta charset='UTF-8'>
       <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no'>
       <meta http-equiv='X-UA-Compatible' content='ie=edge'>
       <title>Замовлення прийнято</title>
       <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon'>
       <link rel='icon' href='/favicon.ico' type='image/x-icon'>
       <link rel='stylesheet' href='/css/style.css'>
       <link rel='preconnect' href='https://fonts.gstatic.com'>
       <link href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap' rel='stylesheet'>
     </head>
     <body>
       <div class='wrapper'>
         <header class='header' id='header'>
           <div class='container'>
             <div class='header__logo'>
               <a href='/'>Brand Name</a>
             </div>
             <div class='header-nav'>
               <nav class='navigation'>
                 <ul class='nav'>
                   <li class='nav__item'><a href='/#how-to'>Як поклеїти?</a></li>
                   <li class='nav__item'><a href='/#'>Інструкція</a></li>
                   <li class='nav__item'><a href='/#'>Доставка</a></li>
                   <li class='nav__item'><a href='/#'>Каталог</a></li>
                   <li class='nav__item'><a href='/#'>Замовити</a></li>
                   <li class='nav__item social-links'>
                     <div class='links__item'>
                       <a href='#'>
                         <img src='assets/icons/instagram.svg' alt=''>
                       </a>
                     </div>
                     <div class='links__item'>
                       <a href='#'>
                         <img src='assets/icons/prom.png' alt=''>
                       </a>
                     </div>
                   </li>
                 </ul>
                 <div class='close-burger'>
                 </div>
               </nav>
               <div class='cart-icon'>
                 <div class='cart-icon__count'></div>
                 <a><img src='assets/icons/cart.svg' alt=''></a>
               </div>
               <div class='burger'>
                 <span class='burger__span'></span>
               </div>
             </div>
           </div>
         </header>
         <main class='main'>
           <section class='order-page'>
             <div class='container'>
               <div class='content'>
                  <h6 class='main-header'>Замовлення прийнято</h6>
                  <div class='sub-header'>Наш менеджер зв’яжеться з вами у найближчий час, щоб уточнити замовлення</div>
                  <div class='order-details'>
                    <div>
                      <label class='order-details__label'>Ім’я:</label>
                      <p class='order-details__text'>{$name}</p>
                    </div>
                    <div>
                      <label class='order-details__label'>Номер телефону:</label>
                      <p class='order-details__text'>{$phone}</p>
                    </div>
                  </div>
                  <div class='items-in-cart'>
                    {$test}
                  </div>
                  <div class='total-price'>
                    <p>До оплати: {$total}грн.</p>
                  </div>
                </div>
                <a href='/' class='btn--transparent btn--black-text btn btn--primary btn--center btn-a'>На головну</a>
              </div>
            </section>
          </main>
        </div>
      </body>
       ";
   }
 }
else {
  //http_response_code(400);
  header("HTTP/1.0 404 Not Found");
}
for ($i = 1; $i <= 4; $i++) {
  unset($_COOKIE['item-'.$i]);
}


?>
  <script type='text/javascript'>
   localStorage.clear();
  </script>
 </body>
</html>
