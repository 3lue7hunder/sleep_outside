import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");
  const footer = document.querySelector(".list-footer");
  const totalSpan = document.querySelector(".list-total");

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    footer.classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  const total = calculateTotal(cartItems);
  totalSpan.textContent = `$${total}`;
  footer.classList.remove("hide");
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="/product/?id=${item.Id}" class="cart-card__image">
        <img
          src="${item.Image || 'placeholder.jpg'}"
          alt="${item.Name}"
        >
      </a>
      <a href="/product/?id=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}

function calculateTotal(items) {
  return items.reduce((total, item) => {
    const price = parseFloat(item.FinalPrice) || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0).toFixed(2);
}

renderCartContents();
