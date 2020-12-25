if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
function ready() {
  var addToCartButtons = document.getElementsByClassName('btn--buy');
  for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
  }
  updateCartIcon()
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var item = shopItem.getElementsByClassName('order-name')[0].getAttribute("data")
  var title = shopItem.getElementsByClassName('order-name')[0].innerText
  var price = shopItem.getElementsByClassName('price__current')[0].innerText
  var img = shopItem.getElementsByClassName('buy__item-img')[0].children[0].src
  var addToCartButtons = document.getElementsByClassName('btn--buy')
  //document.cookie = `${title} = 1; max-age=3600`
  var totalCount
  if (isNaN(totalCount)) {
    totalcount = 0;
  }
  totalCount = localStorage.getItem("totalCount")
  totalCount++
  var localCount
  try {
    localCount = JSON.parse(localStorage.getItem(item)).count
  }
  catch (e) {
    localCount = 0
    console.log(e);
  }
  localCount++
  localStorage.setItem(`${item}`, `{
    "title":"${title}",
    "price":"${price}",
    "img":"${img}",
    "count":"${localCount}"
  }`);
  localStorage.setItem("totalCount", totalCount)
  var str = JSON.parse(localStorage.getItem(item))
  console.log(localStorage.getItem(item));
  updateCartIcon()
}

function updateCartIcon() {
  var cartIcon = document.getElementsByClassName('cart-icon__count')[0]
  items = localStorage.getItem("totalCount")
  cartIcon.innerText = items
}
