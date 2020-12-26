if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
  ready()
}

function ready() {
  //localStorage.clear();
  //loadCartItems()
  testLoadCartItems()
  var removeCartItemButtons = document.getElementsByClassName('cart-item__remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      //button.addEventListener('click', removeCartItem)
      button.addEventListener('click', testRemoveCartItem)
  }
  var quantityInputs = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
  }
  document.getElementsByClassName('cart-icon')[0].addEventListener('click', logCart)
}

function logCart(){
  console.log(JSON.parse(localStorage.getItem('cart')));
}

function cartIsEmpty() {
  var cart = document.getElementsByClassName('cart-items')[0]
  var total = document.getElementsByClassName('cart-total')[0]
  var btn = document.getElementsByClassName('cart-order-btn')[0]
  if (cart.innerHTML === "") {
    cart.innerHTML = "<div class='cart-is-empty'>Ваша корзина пуста</div>"
    total.innerHTML = ""
    btn.innerHTML = ""
    localStorage.removeItem("totalCount")
  }
}

function testLoadCartItems() {
  let cart = new Object;
  console.log(localStorage.getItem("cart"));
  if (localStorage.getItem("cart") !== null) {
    cart = JSON.parse(localStorage.getItem("cart"))
    for (var i = 1; i <= 4; i++) {
      if (cart[`item${i}`] !== undefined) {
        let cartItem = cart[`item${i}`]
        let title = cartItem.title
        let img = cartItem.img
        let price = cartItem.price
        let count = cartItem.count
        testAddItemToCart(`item${i}`, title, img, price, count)
      }
    }
    updateCartTotal()
  }
  else {
    cartIsEmpty()
  }
}

function testRemoveCartItem() {
  var buttonClicked = event.target
  localStorage.removeItem(buttonClicked.parentElement.parentElement.dataset.item)
  buttonClicked.parentElement.parentElement.remove()
  item = buttonClicked.parentElement.parentElement.dataset.item
  let db = JSON.parse(localStorage.getItem("cart"))
  delete db[item]
  localStorage.setItem("cart", JSON.stringify(db))
  //updateCartTotal()
  updateCartTotal()
  cartIsEmpty()
}

function testUpdateDataBase(item, quantity) {
  let db = JSON.parse(localStorage.getItem("cart"))
  db[item].count = parseFloat(quantity)
  db = JSON.stringify(db)
  localStorage.setItem('cart', db)
}

function updateDataBase(item, quantity) {
  var db = JSON.parse(localStorage.getItem(item))
  db.count = quantity
  db = JSON.stringify(db)
  localStorage.setItem(item, db)
}

function loadCartItems() {
  for (var i = 0; i <= 4; i++) {
    cartItems = localStorage.getItem(`item-${i}`)
    if (cartItems !== null) {
      title = JSON.parse(cartItems).title
      img = JSON.parse(cartItems).img
      price = JSON.parse(cartItems).price
      count = JSON.parse(cartItems).count
      testAddItemToCart(`item-${i}`, title, img, price, count)
    }
  }
  updateCartTotal()
  cartIsEmpty()
}

function testAddItemToCart(item, title, img, price, count) {
  var cartRow = document.createElement('div')
  cartRow.classList.add(`cart-item`)
  cartRow.classList.add(`${item}`)
  //cartRow.setAttribute("data", `${item}`)
  cartRow.dataset.item = item
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
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
    </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
}

function addItemToCart(item, title, img, price, count) {
  try {
    var cartRow = document.createElement('div')
    cartRow.classList.add(`cart-item`)
    cartRow.classList.add(`${item}`)
    cartRow.setAttribute("data", `${item}`)
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
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
      </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
  }
  catch (e) {
    console.log(e)
  }
}

function removeCartItem() {
  var buttonClicked = event.target
  localStorage.removeItem(buttonClicked.parentElement.parentElement.dataset.item)
  buttonClicked.parentElement.parentElement.remove()
  console.log(buttonClicked.parentElement.parentElement.getAttribute('data'))
  updateCartTotal()
  cartIsEmpty()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-item')
  var total = 0
  var totalItems = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-item__price')[0]
    var quantityElement = cartRow.getElementsByClassName('quantity')[0]
    var price = parseFloat(priceElement.innerText.replace('грн', ''))
    var quantity = quantityElement.value
    var item = cartItemContainer.getElementsByClassName('cart-item')[i].dataset.item
    //updateDataBase(item, quantity)
    testUpdateDataBase(item, quantity)
    totalItems = parseFloat(quantity) + totalItems
    console.log(totalItems);
    localStorage.setItem("totalCount", totalItems)
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart__price')[0].innerText = total + "грн"
  if (localStorage.getItem("cart") !== null) {
    let db = JSON.parse(localStorage.getItem("cart"))
    db.totalCount = totalItems
    db = JSON.stringify(db)
    localStorage.setItem("cart", db)
  }
  document.cookie = `totalPrice=${total}`
}



function order() {
  if (document.getElementsByClassName('cart-total')[0].innerHTML !== "") {
    for (var i = 1; i <= 4; ++i) {
      var itemInCart = localStorage.getItem(`item-${i}`)
      var tempExp = 'Wed, 31 Oct 2012 08:50:17 GMT';
      if (itemInCart !== null) {
        document.cookie = `item-${i}=${itemInCart}`
      }
      else {
        document.cookie = `item-${i}=${itemInCart};expires = ${tempExp}`
      }
    }
    window.location.href = '/checkout.php';
  }
  else {
    alert("Корзина пуста")
  }
}
