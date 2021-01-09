<?php
  session_start();
 ?>
 <!DOCTYPE html>
 <html lang="ua">
 <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Order</title>
   <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
   <link rel="icon" href="/favicon.ico" type="image/x-icon">
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
                  $cart = json_decode($_COOKIE["cart"]);
                  $totalCount = 0;
                  if ($cart !== NULL) {
                    foreach ($cart as &$value) {
                      echo '
                      <div class="item-in-cart">
                        <div class="item-in-cart__img">
                          <img src='.$value->{"img"}.' alt="">
                        </div>
                        <div class="item-in-cart__title">
                          <p>'.$value->{"title"}.'</p>
                        </div>
                        <div class="item-in-cart__count">
                          <p>Кількість: '.$value->{"count"}.'шт.</p>
                        </div>
                      </div>';
                      $cost = $value->{"count"} * $value->{"price"};
                      $totalCount = $totalCount + $cost;
                    }
                    echo "<div class='total-price'><p>Загальна вартість: <span>$totalCount грн.</span></p></div>";
                  } 
                  else {
                    http_response_code(400);
                  }
                ?>
               </div>
               <form action="/order" method="post" class="form order-form">
                 <input type="text" name="total" value="<?=$total?>" style="display: none">
                 <label for="order-name" class="check-form__label">Ваше ім’я<span class="input-required">*</span></label>
                 <input class="input" type="text" name="name" id="order-name" value="" placeholder="Наприклад, Володимир" required>
                 <label for="order-phone" class="check-form__label">Ваш телефон<span class="input-required">*</span></label>
                 <input class="input" type="tel" name="phone" id="order-phone" value="" minlength="10" maxlength="20" placeholder="+380501032020" required>
                 <label for="cityNP" class="check-form__label">Місто<span class="input-required">*</span></label>
                 <input class="input" name="gorodNp" list="goroda" id="cityNP">
                  <datalist id="goroda">
                    <option value="Naples">
                    <option value="London">
                    <option value="Berlin">
                    <option value="New York">
                    <option value="Frattamaggiore">
                  </datalist>
                 <label for="information" class="check-form__label">Коментар до замовлення:</label>
                 <textarea class="input input--textarea" name="info" id="information" minlength='0'></textarea>
                 <label class="check-form__label"><span class="input-required">*</span> — обов’язково</label>
                 <label class="check-form__label">Після замовлення з вами зв’яжеться менеджер, який уточнить модель, місто доставки та інші деталі</label>
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
