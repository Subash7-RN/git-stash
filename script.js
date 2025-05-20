const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalElement = document.getElementById('total');

let cart = [];

function formatINR(value) {
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

function updateCartUI() {
  cartItems.innerHTML = '';
  let total = 0;
  let totalQty = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-item';

    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <p><strong>${item.title}</strong></p>
        <p>${formatINR(item.price)} x <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" /></p>
        <p>Subtotal: ${formatINR(item.price * item.quantity)}</p>
      </div>
    `;

    cartItems.appendChild(li);
    total += item.price * item.quantity;
    totalQty += item.quantity;
  });

  cartCount.textContent = totalQty;
  totalElement.textContent = `Total: ${formatINR(total)}`;

  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      const qty = parseInt(e.target.value);
      const item = cart.find(i => i.id === id);
      if (item && qty > 0) {
        item.quantity = qty;
        updateCartUI();
      }
    });
  });
}

function addToCart(product) {
  const found = cart.find(item => item.id === product.id);
  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

async function fetchProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    productList.innerHTML = '<p>Failed to load products.</p>';
  }
}

function renderProducts(products) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product';
    const priceINR = product.price * 83.5;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${formatINR(priceINR)}</p>
      <button>Add to Cart</button>
    `;

    card.querySelector('button').addEventListener('click', () => {
      addToCart({
        id: product.id,
        title: product.title,
        price: priceINR,
        image: product.image
      });
    });

    productList.appendChild(card);
  });
}

fetchProducts();
