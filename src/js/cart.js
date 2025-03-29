import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = qs(".product-list");

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems
    .map((item, index) => cartItemTemplate(item, index))
    .join("");

  productList.innerHTML = htmlItems;
}

function cartItemTemplate(item, index) {
  if (!item) {
    return "";
  }
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No Color"}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice?.toFixed(2) || "0.00"}</p>
    <span class="remove-item" data-index="${index}" title="Remove item">❌</span>
  </li>`;
}

function removeFromCart(itemIndex) {
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems.splice(itemIndex, 1);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

qs(".product-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    const itemIndex = parseInt(event.target.dataset.index, 10);
    removeFromCart(itemIndex);
    location.reload();
  }
});

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    return ;
  }

  let total = 0;
  cartItems.forEach((item) => {
    if (item != null) {
      total += item.FinalPrice;
    }
  });
  return total;
}

const cartTotal = calculateCartTotal();
if (cartTotal !== 0) {
  document.querySelector(".cart-total").innerHTML =
    `<p>Total: $${cartTotal.toFixed(2)}</p>`;
}

renderCartContents();
