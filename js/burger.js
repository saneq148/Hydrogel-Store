let burger = document.querySelector(".burger");
let nav = document.querySelector(".navigation");
burger.onclick = toggleBurger;
let navItemsMobile = document.getElementsByClassName('nav__item');
for (let i = 0; i < navItemsMobile.length; ++i) {
      let li = navItemsMobile[i];
      li.addEventListener('click', toggleBurger);
}
function toggleBurger() {
  burger.classList.toggle('burger--open');
  nav.classList.toggle('navigation--open');
}
