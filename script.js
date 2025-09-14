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
function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: Date.now().toString(),
      name,
      price: Number(price),   // ✅ always store as number
      quantity: 1
    });
  }
  saveCart();
  renderCart();
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".pro");
      addToCart(product.dataset.name, product.dataset.price);
    });
  });

  renderCart();
  updateCartCount();
});
const subtotal = item.price * item.quantity;
tr.innerHTML = `
  <td>${item.name}</td>
  <td>$${item.price.toFixed(2)}</td>
  <td>
    <button class="qty-decrease">-</button>
    <input class="qty-input" type="number" min="1" value="${item.quantity}">
    <button class="qty-increase">+</button>
  </td>
  <td>$${subtotal.toFixed(2)}</td>
  <td><button class="remove-row">Remove</button></td>
`;
function calculateTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
}
