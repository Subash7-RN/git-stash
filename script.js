const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalElement = document.getElementById('total');
const categorySelect = document.getElementById('category-select');
const searchBar = document.getElementById('search-bar');

let cart = [];
let allProducts = [];

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
          <p>Price: ₹${item.price.toFixed(2) * 88}</p>
          <p>Quantity: 
            <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" />
          </p>
          <p>Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `;
  
      cartItems.appendChild(li);
      total += item.price * item.quantity;
      totalQty += item.quantity;
    });
  
    cartCount.textContent = totalQty;
    totalElement.textContent = `Total: ₹${total.toFixed(2)}`;
  
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

function renderProducts(products) {
    productList.innerHTML = '';
  
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product';
  
      const discountedPrice = (product.price * 88) * (1 - product.discount / 100);
      const displayPrice = product.discount > 0
        ? `<p><s>₹${product.price * 88}</s> <strong>₹${discountedPrice.toFixed(2)}</strong> <span style="color:green;">(${product.discount}% OFF)</span></p>`
        : `<p>₹${product.price * 88}</p>`;
  
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p><strong>Brand:</strong> ${product.brand || 'N/A'}</p>
        <p><strong>Model:</strong> ${product.model || 'N/A'}</p>
        <p><strong>Color:</strong> ${product.color || 'N/A'}</p>
        ${displayPrice}
        <button>Add to Cart</button>
      `;
  
      card.querySelector('button').addEventListener('click', () => {
        addToCart({
          id: product.id,
          title: product.title,
          price: discountedPrice,
          image: product.image
        });
      });
  
      productList.appendChild(card);
    });
  }
  

async function fetchCategories() {
  const res = await fetch('https://fakestoreapi.in/api/products/category');
  const categories = await res.json();
  categories.categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  });
}

async function fetchAllProducts() {
    const res = await fetch('https://fakestoreapi.in/api/products?limit=150');
    const data = await res.json();
  
    allProducts = data.products.map(p => ({
      id: p.id,
      title: p.title,
      image: p.image,
      price: p.price,
      description: p.description,
      brand: p.brand,
      model: p.model,
      color: p.color,
      category: p.category,
      discount: p.discount || 0
    }));
  
    renderProducts(allProducts);
  }

function filterProducts() {
  const selectedCategory = categorySelect.value;
  const searchTerm = searchBar.value.toLowerCase();

  const filtered = allProducts.filter(product => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchSearch = product.title.toLowerCase().includes(searchTerm);
    return matchCategory && matchSearch;
  });

  renderProducts(filtered);
}

categorySelect.addEventListener('change', filterProducts);
searchBar.addEventListener('input', filterProducts);

fetchAllProducts();
fetchCategories();
