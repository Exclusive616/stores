const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', ()=> {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', ()=> {
        nav.classList.remove('active');
    })
}
















// ========== CART LOGIC ==========

// Load cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart back to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add item to cart
function addToCart(id, name, price) {
  let cart = getCart();
  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }

  saveCart(cart);
  alert(`${name} added to cart!`);
}

// Remove item from cart
function removeFromCart(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

// Change quantity (+ or -)
function changeQuantity(id, delta) {
  let cart = getCart();
  let item = cart.find(item => item.id === id);

  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart(cart);
    renderCart();
  }
}

// Update cart count in navbar
function updateCartCount() {
  let cart = getCart();
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  let el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

// Render cart page
function renderCart() {
  let cart = getCart();
  let container = document.getElementById("cart-items");
  let totalEl = document.getElementById("cart-total");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      total += item.price * item.qty;
      container.innerHTML += `
        <div class="cart-item">
          <span>${item.name}</span>
          <span>
            <button onclick="changeQuantity('${item.id}', -1)">➖</button>
            ${item.qty}
            <button onclick="changeQuantity('${item.id}', 1)">➕</button>
          </span>
          <span>$${(item.price * item.qty).toFixed(2)}</span>
          <button onclick="removeFromCart('${item.id}')">🗑 Remove</button>
        </div>
      `;
    });
  }

  totalEl.textContent = total.toFixed(2);
}

// Run on every page load
document.addEventListener("DOMContentLoaded", updateCartCount);

