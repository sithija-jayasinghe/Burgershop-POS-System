let products = [
    { id: 1, name: 'Cheese Burger', price: 1650, category: 'Burger', image: 'https://www.sargento.com/assets/Uploads/Recipe/Image/burgercampNachos_07__FocusFillWyIwLjAwIiwiMC4wMCIsODAwLDQ3OF0_CompressedW10.jpg', stock: 20 },
    { id: 2, name: 'SAustralian Burger', price: 1750, category: 'Burger', image: 'https://cdn.tasteatlas.com/images/dishes/d867d86275fe45b2af4a33c11d09b916.jpg?w=600', stock: 11 },
    { id: 3, name: 'Jucy Lucy Burger', price: 1850, category: 'Burger', image: 'https://sundaysuppermovement.com/wp-content/uploads/2024/08/juicy-lucy-burger-featured.jpg', stock: 16 },
    { id: 4, name: 'Green Chille Burger', price: 1950, category: 'Burger', image: 'https://arcticzone.com/cdn/shop/articles/sgc-smash-burger.webp?v=1727442331', stock: 22 },
    { id: 5, name: 'nutburger', price: 1650, category: 'Burger', image: 'https://www.veganricha.com/wp-content/uploads/2016/03/vegan-lentil-walnut-burgers-2912.jpg', stock: 22 },
    { id: 6, name: 'Turkey Burger', price: 1700, category: 'Burger', image: 'https://shadybrookfarms.com/wp-content/uploads/2020/09/HSW_Recipe_Square_0006_CaliforniaTurkeyBurger-768x768.jpg', stock: 20 },
    { id: 7, name: 'French Fries', price: 1050, category: 'Fries', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', stock: 50 },
    { id: 8, name: 'Waffle Fries', price: 1050, category: 'Fries', image: 'https://sundaytable.co/wp-content/uploads/2024/02/the-best-cheese-fries-1.jpg', stock: 50 },
    { id: 8, name: 'Cheese Fries', price: 1050, category: 'Fries', image: 'https://www.emborg.com/app/uploads/2023/07/1200x900px_French_Fries_Overload.png', stock: 50 },
    { id: 9, name: 'Curley Fries', price: 1050, category: 'Fries', image: 'https://media.istockphoto.com/id/483530333/photo/spicy-seasoned-curly-fries.jpg?s=612x612&w=0&k=20&c=dKJRWettRAnzg6BVfTDKzfd5AM66F9gRqIr_njGiF8E=', stock: 50 },
    { id: 10, name: 'Coca Cola', price: 250, category: 'Drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', stock: 100 },
    { id: 11, name: 'Sprite', price: 250, category: 'Drink', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuwfyPonH0cPvqO_SELhyYHAZUmRYluj5n2w&s', stock: 100 },
    { id: 12, name: 'Fanta', price: 250, category: 'Drink', image: 'https://marketing-interactive-assets.b-cdn.net/images/sg/content-images/tiktok/fanta_old_logo_refresh.jpg', stock: 100 },
    { id: 13, name: 'Virgin Mojito', price: 250, category: 'Drink', image: 'https://fullofplants.com/wp-content/uploads/2021/05/easy-virgin-mojito-alcohol-free-kid-friendly-refreshing-drink-thumb.jpg', stock: 100 },
    { id: 14, name: 'Passion Mojito', price: 250, category: 'Drink', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTrtrf_6SsG-r2Pts8_XQ7fAN5z-TW2Natmw&s', stock: 100 },
];

let customers = [
    { id: 1, name: 'Kasun Perera', phone: '077-123-4567', email: 'kasun@gmail.com' },
    { id: 2, name: 'Nimali Silva', phone: '071-987-6543', email: 'nimali@gmail.com' }
];

let orders = [
    { 
        id: 34560, 
        customer: 'Kasun Perera', 
        total: 3500, 
        date: '2021-02-01', 
        items: 3,
        orderItems: [
            { name: 'Cheese Burger', price: 1650, qty: 1 },
            { name: 'Jucy Lucy Burger', price: 1850, qty: 1 }
        ]
    },
    { 
        id: 34561, 
        customer: 'Nimali Silva', 
        total: 2450, 
        date: '2021-02-02', 
        items: 2,
        orderItems: [
            { name: 'French Fries', price: 1050, qty: 1 },
            { name: 'Coca Cola', price: 250, qty: 1 },
            { name: 'Cheese Burger', price: 1650, qty: 1 }
        ]
    }
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
    
    // Search Listener
    document.getElementById('search-product').addEventListener('input', handleSearch);
    
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
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    renderProductGrid(filtered);
}

function renderProductGrid(items) {
    const grid = document.getElementById('product-list');
    grid.innerHTML = '';
    
    items.forEach(product => {
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

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
    renderProductGrid(filtered);
    
    if (searchTerm) {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    } else {
        document.querySelector('.category-btn').classList.add('active');
        renderProducts('all');
    }
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
        items: cart.reduce((sum, item) => sum + item.qty, 0),
        orderItems: [...cart]
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
            <td><button class="btn-icon" onclick="viewOrder(${o.id})">View</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const content = document.getElementById('order-details-content');
    let itemsHtml = '';
    
    if (order.orderItems && order.orderItems.length > 0) {
        itemsHtml = `
            <table style="width:100%; margin-top:15px; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom:1px solid #393c49; text-align:left;">
                        <th style="padding:8px; color: #abbbc2;">Item</th>
                        <th style="padding:8px; color: #abbbc2;">Qty</th>
                        <th style="padding:8px; color: #abbbc2;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.orderItems.map(item => `
                        <tr style="border-bottom:1px solid #393c49;">
                            <td style="padding:8px;">${item.name}</td>
                            <td style="padding:8px;">${item.qty}</td>
                            <td style="padding:8px;">LKR ${(item.price * item.qty).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } else {
        itemsHtml = '<p style="margin-top: 15px; color: #abbbc2;">No item details available.</p>';
    }

    content.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
            <div>
                <p style="color: #abbbc2; font-size: 14px;">Order ID</p>
                <p style="font-weight: bold;">#${order.id}</p>
            </div>
            <div>
                <p style="color: #abbbc2; font-size: 14px;">Date</p>
                <p style="font-weight: bold;">${order.date}</p>
            </div>
            <div>
                <p style="color: #abbbc2; font-size: 14px;">Customer</p>
                <p style="font-weight: bold;">${order.customer}</p>
            </div>
            <div>
                <p style="color: #abbbc2; font-size: 14px;">Total Amount</p>
                <p style="font-weight: bold; color: #ea7c69;">LKR ${order.total.toFixed(2)}</p>
            </div>
        </div>
        <h3 style="font-size: 16px; margin-top: 20px; border-top: 1px solid #393c49; padding-top: 15px;">Order Items</h3>
        ${itemsHtml}
    `;
    
    openModal('order-modal');
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