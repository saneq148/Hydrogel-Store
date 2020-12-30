let countDownDate = new Date();
countDownDate.setHours(0, 0, 0, 0);
countDownDate = countDownDate.getTime() + 604800000;
let x = setInterval(function() {
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let days = ('0' + Math.floor(distance / (1000 * 60 * 60 * 24))).slice(-2);
  let hours = ('0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
  let minutes = ('0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
  let seconds = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);
  document.getElementsByClassName('promo-counter__days')[0].innerText = days
  document.getElementsByClassName('promo-counter__hours')[0].innerText = hours
  document.getElementsByClassName('promo-counter__minutes')[0].innerText = minutes
  document.getElementsByClassName('promo-counter__seconds')[0].innerText = seconds
  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);
