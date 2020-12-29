if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
function ready() {
  let addToCartButtons = document.getElementsByClassName('btn--buy');
  for (let i = 0; i < addToCartButtons.length; ++i) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
  }
  getTotalCount()
}

function updateCartIcon(totalCount) {
  const cartIcon = document.getElementsByClassName('cart-icon')[0]
  cartIcon.classList.add('animate__animated')
  cartIcon.classList.add('animate__tada')
  cartIcon.children[0].innerText = totalCount
}

function addToCartClicked(event) {
  let cart = new Object
  let cartItem = new Object
  const button = event.target
  const shopItem = button.parentElement.parentElement
  const item = shopItem.getElementsByClassName('order-name')[0].dataset.item
  const title = shopItem.getElementsByClassName('order-name')[0].innerText
  const price = shopItem.getElementsByClassName('price__current')[0].innerText
  const img = shopItem.getElementsByClassName('buy__item-img')[0].children[0].src
  const addToCartButtons = document.getElementsByClassName('btn--buy')
  let itemCount
  cart = JSON.parse(localStorage.getItem("cart"))
  if (cart === null)
    cart = {}
  try {
    itemCount = cart[item].count
  }
  catch(e) {
    console.log(e);
    itemCount = 0
  }
  if (cart["totalCount"] !== undefined)
    totalCount = cart["totalCount"]
  else
    totalCount = 0
  itemCount++
  totalCount ++
  cartItem["title"] = title
  cartItem["price"] = price
  cartItem["img"] = img
  cartItem["count"] = itemCount
  cart[item] = cartItem
  cart["totalCount"] = totalCount
  localStorage.setItem("cart", JSON.stringify(cart))
  getTotalCount()
}
function getTotalCount() {
  if (localStorage.getItem("cart") !== null) {
    updateCartIcon(JSON.parse(localStorage.getItem("cart")).totalCount)
  }
}
