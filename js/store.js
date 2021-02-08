if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
function ready() {
  let addToCartButtons = document.getElementsByClassName('btn--buy');
  for (let i = 0; i < addToCartButtons.length; ++i) {
    let cartButton = addToCartButtons[i];
    cartButton.addEventListener('click', () => { addToCartClicked(); location.href = "cart"; })
  }
  let buyButtons = document.getElementsByClassName('btn--buy-cart');
  for (let i = 0; i < buyButtons.length; ++i) {
    let buyButton = buyButtons[i];
    buyButton.addEventListener('click', addToCartClicked);
  }
  getTotalCount()
}

function updateCartIcon(totalCount) {
  let cartIcon = document.getElementsByClassName('cart-icon')[0];
  animateCartIcon();
  setTimeout(animateCartIcon, 1000);
  cartIcon.children[0].innerText = totalCount;
}

function animateCartIcon() {
  let cartIcon = document.getElementsByClassName('cart-icon')[0];
  cartIcon.classList.toggle('animate__animated');
  cartIcon.classList.toggle('animate__tada');
}

function addToCartClicked() {
  let cart = new Array;
  let cartItem = new Object;
  const button = event.target;
  const shopItem = button.parentElement.parentElement;
  const item = shopItem.getElementsByClassName('order-name')[0].dataset.item
  const title = shopItem.getElementsByClassName('order-name')[0].innerText
  const price = shopItem.getElementsByClassName('price__current')[0].innerText
  const img = shopItem.getElementsByClassName('buy__item-img')[0].children[0].src
  if (localStorage.getItem("cart") !== null)
    cart = JSON.parse(localStorage.getItem("cart"))
  var itemAlreadyInCart = cart.filter(function (elem, index) {
    if (elem.item === item) {
      elem.count++;
      cart.splice(index, 1, elem);
      return true;
    }
  });
  if (itemAlreadyInCart.length === 0) {
    cartItem.item = item;
    cartItem.title = title;
    cartItem.price = price;
    cartItem.img = img;
    cartItem.count = 1;
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  getTotalCount();
}
function getTotalCount() {
  if (localStorage.getItem("cart") != null) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    let totalCount = 0;
    cart.forEach(element => {
      totalCount += element.count;
    });
    updateCartIcon(totalCount);
  }
}
