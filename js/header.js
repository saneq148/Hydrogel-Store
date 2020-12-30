window.onscroll = function() {stickHeader()};
var header = document.getElementById("header");
header.classList.remove("sticky");
var sticky = header.offsetTop;
function stickHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  }
  else {
    header.classList.remove("sticky");
  }
}
window.addEventListener('resize', () => {
  header.classList.remove("sticky");
  sticky = header.offsetTop;
  stickHeader();
});
