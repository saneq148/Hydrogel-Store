window.onscroll = function () { stickHeader() };
const header = document.getElementById("header");
let sticky = header.offsetTop;
let mainContent = document.querySelector(".main");
function stickHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    mainContent.style.marginTop = "50px";
  }
  else {
    header.classList.remove("sticky");
    mainContent.style.marginTop = "0";
  }
}
window.addEventListener('resize', () => {
  header.classList.remove("sticky");
  sticky = header.offsetTop;
  stickHeader();
});