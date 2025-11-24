let products = [
    { id: 1, name: 'Cheese Burger', price: 1650, category: 'Burger', image: 'https://www.sargento.com/assets/Uploads/Recipe/Image/burgercampNachos_07__FocusFillWyIwLjAwIiwiMC4wMCIsODAwLDQ3OF0_CompressedW10.jpg', stock: 20 },
    { id: 2, name: 'SAustralian Burger', price: 1750, category: 'Burger', image: 'https://cdn.tasteatlas.com/images/dishes/d867d86275fe45b2af4a33c11d09b916.jpg?w=600', stock: 11 },
    { id: 3, name: 'Jucy Lucy Burger', price: 1850, category: 'Burger', image: 'https://sundaysuppermovement.com/wp-content/uploads/2024/08/juicy-lucy-burger-featured.jpg', stock: 16 },
    { id: 4, name: 'Green Chille Burger', price: 1950, category: 'Burger', image: 'https://arcticzone.com/cdn/shop/articles/sgc-smash-burger.webp?v=1727442331', stock: 22 },
    { id: 5, name: 'French Fries', price: 1050, category: 'Fries', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', stock: 50 },
    { id: 6, name: 'Coca Cola', price: 250, category: 'Drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', stock: 100 }
];

let customers = [
    { id: 1, name: 'Kasun Perera', phone: '077-123-4567', email: 'kasun@gmail.com' },
    { id: 2, name: 'Nimali Silva', phone: '071-987-6543', email: 'nimali@gmail.com' }
];

let orders = [
    { id: 34560, customer: 'Kasun Perera', total: 3500, date: '2021-02-01', items: 3 },
    { id: 34561, customer: 'Nimali Silva', total: 2450, date: '2021-02-02', items: 2 }
];

let cart = [];
let currentOrderId = 34562;

document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    renderCustomers();
    renderProductsTable();
    renderOrders();
    updateOrderId();
    updateCurrentDate();
    
    document.getElementById('customer-form').addEventListener('submit', handleCustomerSubmit);
    document.getElementById('product-form').addEventListener('submit', handleProductSubmit);
    
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.onclick = toggleCart;
    document.body.appendChild(overlay);
});

function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

function updateCartBadge() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count-badge').innerText = count;
}

function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    dateElement.innerText = now.toLocaleDateString('en-US', options);
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${sectionId}-section`).classList.add('active');
    
    document.querySelectorAll('.sidebar nav li').forEach(li => li.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function renderProducts(category) {
    const grid = document.getElementById('product-list');
    grid.innerHTML = '';
    
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => addToCart(product.id);
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">LKR ${product.price.toFixed(2)}</div>
            <div class="stock">${product.stock} Available</div>
        `;
        grid.appendChild(card);
    });
}

function filterProducts(category) {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts(category);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    renderCart();
    updateCartBadge();
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">LKR ${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total">LKR ${itemTotal.toFixed(2)}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash"></i> Remove
            </button>
        `;
        container.appendChild(el);
    });
    
    document.getElementById('cart-total').innerText = `LKR ${total.toFixed(2)}`;
    updateCartBadge();
}

function updateCartQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

function processPayment() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const newOrder = {
        id: currentOrderId,
        customer: 'Walk-in Customer',
        total: total,
        date: new Date().toISOString().split('T')[0],
        items: cart.reduce((sum, item) => sum + item.qty, 0)
    };
    
    orders.push(newOrder);
    
    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
            product.stock -= cartItem.qty;
        }
    });
    
    renderOrders();
    renderProducts('all');
    renderProductsTable();
    
    alert(`Payment Successful! Order #${currentOrderId} placed.`);
    cart = [];
    renderCart();
    updateCartBadge();
    currentOrderId++;
    updateOrderId();
    
    if (window.innerWidth <= 1024) {
        toggleCart();
    }
}

function updateOrderId() {
    document.getElementById('order-id-display').innerText = currentOrderId;
}

function renderCustomers() {
    const tbody = document.querySelector('#customer-table tbody');
    tbody.innerHTML = '';
    customers.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.phone}</td>
            <td>${c.email}</td>
            <td>
                <button class="btn-icon" onclick="editCustomer(${c.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon delete" onclick="deleteCustomer(${c.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (customer) {
        document.getElementById('customer-id').value = customer.id;
        document.getElementById('customer-name').value = customer.name;
        document.getElementById('customer-phone').value = customer.phone;
        document.getElementById('customer-email').value = customer.email;
        document.getElementById('customer-modal-title').innerText = 'Edit Customer';
        openModal('customer-modal');
    }
}

function handleCustomerSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('customer-id').value;
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const email = document.getElementById('customer-email').value;
    
    if (id) {
        const index = customers.findIndex(c => c.id == id);
        if (index !== -1) {
            customers[index] = { id: parseInt(id), name, phone, email };
        }
    } else {
        const newCustomer = {
            id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
            name,
            phone,
            email
        };
        customers.push(newCustomer);
    }
    
    renderCustomers();
    closeModal('customer-modal');
    e.target.reset();
    document.getElementById('customer-id').value = '';
    document.getElementById('customer-modal-title').innerText = 'Add Customer';
}

function deleteCustomer(id) {
    if(confirm('Are you sure?')) {
        customers = customers.filter(c => c.id !== id);
        renderCustomers();
    }
}

function renderProductsTable() {
    const tbody = document.querySelector('#product-table tbody');
    tbody.innerHTML = '';
    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.image}" width="40" height="40" style="border-radius: 50%"></td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>LKR ${p.price.toFixed(2)}</td>
            <td>
                <button class="btn-icon" onclick="editProduct(${p.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon delete" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-modal-title').innerText = 'Edit Product';
        openModal('product-modal');
    }
}

function handleProductSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const image = document.getElementById('product-image').value || 'https://via.placeholder.com/150';
    
    if (id) {
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            products[index] = { ...products[index], name, category, price, stock, image };
        }
    } else {
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name,
            category,
            price,
            image,
            stock: stock
        };
        products.push(newProduct);
    }
    
    renderProductsTable();
    renderProducts('all');
    closeModal('product-modal');
    e.target.reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-modal-title').innerText = 'Add Product';
}

function deleteProduct(id) {
    if(confirm('Are you sure?')) {
        products = products.filter(p => p.id !== id);
        renderProductsTable();
        renderProducts('all');
    }
}

function renderOrders() {
    const tbody = document.querySelector('#order-table tbody');
    tbody.innerHTML = '';
    orders.forEach(o => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${o.id}</td>
            <td>${o.customer}</td>
            <td>LKR ${o.total.toFixed(2)}</td>
            <td>${o.date}</td>
            <td>${o.items}</td>
            <td><button class="btn-icon">View</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function openAddCustomerModal() {
    document.getElementById('customer-form').reset();
    document.getElementById('customer-id').value = '';
    document.getElementById('customer-modal-title').innerText = 'Add Customer';
    openModal('customer-modal');
}

function openAddProductModal() {
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-stock').value = '20';
    document.getElementById('product-modal-title').innerText = 'Add Product';
    openModal('product-modal');
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}