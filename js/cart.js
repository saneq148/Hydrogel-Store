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
        button.addEventListener('click', testAddToCartClicked);
  }
  getTotalCount()
}

function addToCartClicked(event) {
  let button = event.target
  let shopItem = button.parentElement.parentElement
  let item = shopItem.getElementsByClassName('order-name')[0].getAttribute("data")
  let title = shopItem.getElementsByClassName('order-name')[0].innerText
  let price = shopItem.getElementsByClassName('price__current')[0].innerText
  let img = shopItem.getElementsByClassName('buy__item-img')[0].children[0].src
  //document.cookie = `${title} = 1; max-age=3600`
  let totalCount
  if (isNaN(totalCount)) {
    totalcount = 0;
  }
  totalCount = localStorage.getItem("totalCount")
  totalCount++
  let localCount
  try {
    localCount = JSON.parse(localStorage.getItem(item)).count
  }
  catch (e) {
    localCount = 0
  }
  localCount++
  localStorage.setItem(`${item}`, `{
    "title":"${title}",
    "price":"${price}",
    "img":"${img}",
    "count":"${localCount}"
  }`);
  localStorage.setItem("totalCount", totalCount)
  let str = JSON.parse(localStorage.getItem(item))
  //updateCartIcon()
  //console.log(JSON.parse(localStorage.getItem("item-4")));
}

function updateCartIcon(totalCount) {
  const cartIcon = document.getElementsByClassName('cart-icon')[0]
  cartIcon.classList.add('animate__animated')
  cartIcon.classList.add('animate__tada')
  cartIcon.children[0].innerText = totalCount
}

function testAddToCartClicked(event) {
  let cart = new Object;
  let cartItem = new Object;
  const button = event.target
  const shopItem = button.parentElement.parentElement
  const item = shopItem.getElementsByClassName('order-name')[0].getAttribute("data")
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
  catch {
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
  let totalCount = JSON.parse(localStorage.getItem("cart")).totalCount
  if (totalCount !== undefined) {
    updateCartIcon(totalCount)
  }
  console.log(totalCount);
}
