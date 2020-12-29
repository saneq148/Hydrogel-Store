var popup = document.querySelector(".popup");
var video1 = document.querySelector(".video-1");
var video2 = document.querySelector(".video-2");
var popupClose = document.querySelector(".popup-close");
var body = document.querySelector("body");
var player = document.getElementById('pop-up-player')
video2.onclick = function () {
  popup.classList.toggle('animate__fadeInUp');
  popup.classList.toggle('animate__fadeOutDown');
  body.classList.toggle('scroll-lock');
  player.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/rl1VPTIt88k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
}
video1.onclick = function () {
  popup.classList.toggle('animate__fadeInUp');
  popup.classList.toggle('animate__fadeOutDown');
  body.classList.toggle('scroll-lock');
  player.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/4MLQBRfOPD4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
}
popupClose.onclick = function () {
  popup.classList.toggle('animate__fadeOutDown');
  popup.classList.toggle('animate__fadeInUp');
  body.classList.toggle('scroll-lock');
  player.innerHTML = ""
}
