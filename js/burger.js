var burger = document.querySelector(".burger");
var nav = document.querySelector(".navigation");
var body = document.querySelector("body");
burger.onclick = function () {
  burger.classList.toggle('burger--open');
  nav.classList.toggle('navigation--open');
  body.classList.toggle('scroll-lock');
}
