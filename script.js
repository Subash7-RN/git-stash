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

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.title} - ${formatINR(item.price)} x ${item.quantity}`;
    total += item.price * item.quantity;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  totalElement.textContent = `Total: ${formatINR(total)}`;
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
    const data = await res.json();
    renderProducts(data);
  } catch (err) {
    productList.innerHTML = '<p>Failed to load products.</p>';
  }
}

function renderProducts(products) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${formatINR(product.price * 83.5)}</p> <!-- approx USD to INR -->
      <button>Add to Cart</button>
    `;

    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price * 83.5, // Convert to INR
      });
    });

    productList.appendChild(card);
  });
}

fetchProducts();
