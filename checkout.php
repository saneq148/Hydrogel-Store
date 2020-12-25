<?php

var_dump ($_COOKIE["item-1"]);
echo "<br>";
var_dump ($_COOKIE["item-2"]);
echo "<br>";
var_dump ($_COOKIE["item-3"]);
echo "<br>";
var_dump ($_COOKIE["item-4"]);
echo "<br><a href=cart.html>Cart</a><br><a href=index.html>Home</a><br><a href=clear.php>Clear</a>";
echo '<script>console.log(localStorage.getItem(`item-1`))</script>';
echo '<script>console.log(localStorage.getItem(`item-2`))</script>';
echo '<script>console.log(localStorage.getItem(`item-3`))</script>';
echo '<script>console.log(localStorage.getItem(`item-4`))</script>';
$item =  json_decode($_COOKIE["item-4"]);
$total =  $_COOKIE["totalPrice"];
echo $total;
 ?>
 <!DOCTYPE html>
 <html lang="ua">
 <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Order</title>
   <link rel="stylesheet" href="/css/style.css">
   <link rel="preconnect" href="https://fonts.gstatic.com">
   <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet">
 </head>
 <body>
   <div class="wrapper">
     <header class="header" id="header">
       <div class="container">
         <div class="header__logo">
           <a href="/">Brand Name</a>
         </div>
         <div class="header-nav">
           <nav class="navigation">
             <ul class="nav">
               <li class="nav__item"><a href="/#how-to">Як поклеїти?</a></li>
               <li class="nav__item"><a href="/#">Інструкція</a></li>
               <li class="nav__item"><a href="/#">Доставка</a></li>
               <li class="nav__item"><a href="/#">Каталог</a></li>
               <li class="nav__item"><a href="/#">Замовити</a></li>
               <li class="nav__item social-links">
                 <div class="links__item">
                   <a href="#">
                     <img src="assets/icons/instagram.svg" alt="">
                   </a>
                 </div>
                 <div class="links__item">
                   <a href="#">
                     <img src="assets/icons/prom.png" alt="">
                   </a>
                 </div>
               </li>
             </ul>
             <div class="close-burger">
             </div>
           </nav>
           <div class="cart-icon">
             <div class="cart-icon__count"></div>
             <a href="/cart.html"><img src="assets/icons/cart.svg" alt=""></a>
           </div>
           <div class="burger">
             <span class="burger__span"></span>
           </div>
         </div>
       </div>
     </header>
     <main class="main">
       <section class="section-checkout">
         <div class="container">
             <div class="content">
               <div class="checkout">
               <h1 class="main-header">Зробити <span class="highlited-text">замовлення</span> онлайн</h1>
               <div class="items-in-cart">
                 <?php
                 for ($i=1; $i <= 4; $i++) {
                   $cookie =  json_decode($_COOKIE["item-".$i]);
                   if ($cookie != NULL) {
                     echo '
                     <div class="item-in-cart">
                       <div class="item-in-cart__img">
                         <img src='.$cookie->{"img"}.' alt="">
                       </div>
                       <div class="item-in-cart__title">
                         <p>'.$cookie->{"title"}.'</p>
                       </div>
                       <div class="item-in-cart__count">
                         <p>Кількість: '.$cookie->{"count"}.'шт.</p>
                       </div>
                     </div>';
                   }
                 }
                 echo "<div class='total-price'><p>Загальна вартість: <span>$total грн.</span></p></div>";
                 ?>
               </div>
               <form action="/order.php" method="post" class="form order-form">
                 <input type="text" name="total" value="<?=$total?>" style="display: none">
                 <label for="order-name" class="check-form__label">Ваше ім’я:</label>
                 <input class="input" type="text" name="name" id="order-name" value="" placeholder="Наприклад, Володимир" >
                 <label for="order-phone" class="check-form__label">Ваш телефон:</label>
                 <input class="input" type="phone" name="phone" id="order-phone" value="" placeholder="+380501032020" >
                 <button type="submit" class="btn--highlited btn btn--primary">Замовити</button>
               </form>
             </div>
           </div>
         </div>
       </section>
     </main>
   </div>
   <script type="text/javascript">
     var burger = document.querySelector(".burger");
     var nav = document.querySelector(".navigation");
     var body = document.querySelector("body");
     burger.onclick = function () {
       burger.classList.toggle('burger--open');
       nav.classList.toggle('navigation--open');
       body.classList.toggle('scroll-lock');
     }
   </script>
 </body>
