if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}
else {
  ready();
}

function ready() {
  loadCartItems();
  var removeCartItemButtons = document.getElementsByClassName('cart-item__remove');
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName('quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
}

function loadCartItems() {
  let cart = new Array;
  if (localStorage.getItem("cart") !== null) {
    cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(element => {
      let item = element.item;
      let title = element.title;
      let img = element.img;
      let price = element.price;
      let count = element.count;
      addItemToCart(item, title, img, price, count);
    })
  }
  updateCartTotal();
}

function addItemToCart(item, title, img, price, count) {
  var cartRow = document.createElement('div');
  cartRow.classList.add(`cart-item`);
  cartRow.classList.add(`${item}`);
  cartRow.dataset.item = item;
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  var cartRowContents = `
    <img class="cart-item__img" src="${img}" alt="">
    <p class="cart-item__name">${title}</p>
    <div class="cart-item__buttons">
      <div class="number-input">
        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown(); updateCartTotal()" class="minus">-</button>
        <input class="quantity" min="1" name="quantity" value="${count}" type="number">
        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp(); updateCartTotal()" class="plus">+</button>
      </div>
      <p class="cart-item__price">${price}</p>
      <div class="cart-item__remove"></div>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('cart')[0];
  let cartRows = cartItemContainer.getElementsByClassName('cart-item');
  let total = 0;
  let totalItems = 0;
  for (var i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName('cart-item__price')[0];
    let quantityElement = cartRow.getElementsByClassName('quantity')[0];
    let price = parseFloat(priceElement.innerText.replace('грн', ''));
    let quantity = quantityElement.value;
    let item = cartItemContainer.getElementsByClassName('cart-item')[i].dataset.item;
    updateDataBase(item, quantity);
    totalItems = parseFloat(quantity) + totalItems;
    total = total + (price * quantity);
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart__price')[0].innerText = total + "грн";
  cartIsEmpty();
}

function removeCartItem() {
  let buttonClicked = event.target;
  let htmlCartItem = buttonClicked.parentElement.parentElement;
  let cart = getDataBase();
  let itemToDeleteIndex = cart.findIndex(element => element.item === htmlCartItem.dataset.item);
  cart.splice(itemToDeleteIndex, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  htmlCartItem.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateDataBase(item, quantity) {
  let cart = getDataBase();
  let itemToChangeIndex = cart.findIndex(element => element.item === item);
  cart[itemToChangeIndex].count = parseFloat(quantity);
  cart = JSON.stringify(cart);
  localStorage.setItem('cart', cart);
}

function getDataBase() {
  return JSON.parse(localStorage.getItem("cart"));
}

function cartIsEmpty() {
  let cart = document.getElementsByClassName('cart-items')[0];
  let total = document.getElementsByClassName('cart-total')[0];
  let btn = document.getElementsByClassName('cart-order-btn')[0];
  if (cart.innerHTML === "") {
    cart.innerHTML = "<div class='cart-is-empty'>Ваш кошик пустий</div>";
    total.innerHTML = "";
    btn.innerHTML = "";
    if (localStorage.getItem("cart") !== null) {
      if (JSON.parse(localStorage.getItem("cart")).length == 0) {
        localStorage.removeItem('cart');
      }
    }
  }
}

function order() {
  if (JSON.parse(localStorage.getItem('cart')).length > 0) {
    document.cookie = `cart = ${localStorage.getItem('cart')}`;
    window.location.href = '/checkout';
  }
  else {
    alert("Корзина пуста");
  }
}
