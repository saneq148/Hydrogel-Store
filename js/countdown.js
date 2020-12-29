var countDownDate = new Date();
countDownDate.setHours(0, 0, 0, 0);
countDownDate = countDownDate.getTime() + 604800000;

    // Update the count down every 1 second
    var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = ('0' + Math.floor(distance / (1000 * 60 * 60 * 24))).slice(-2);
    var hours = ('0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
    var minutes = ('0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
    var seconds = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);

    // Display the result in the element with id="demo"
    document.getElementsByClassName('promo-counter__days')[0].innerText = days
    document.getElementsByClassName('promo-counter__hours')[0].innerText = hours
    document.getElementsByClassName('promo-counter__minutes')[0].innerText = minutes
    document.getElementsByClassName('promo-counter__seconds')[0].innerText = seconds

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
    }
  }, 1000);
