// ==========================================
// 1. Data Initialization
// ==========================================

// List of products available in the shop
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

// List of registered customers
let customers = [
    { id: 1, name: 'Kasun Perera', phone: '077-123-4567', email: 'kasun@gmail.com' },
    { id: 2, name: 'Nimali Silva', phone: '071-987-6543', email: 'nimali@gmail.com' }
];

// List of past orders
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

// Current shopping cart (empty at start)
let cart = [];
let currentOrderId = 34562;

// ==========================================
// 2. App Initialization
// ==========================================

// Runs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Render initial data
    renderProducts('all');
    renderCustomers();
    renderProductsTable();
    renderOrders();
    updateOrderId();
    updateCurrentDate();
    
    // Setup form listeners
    document.getElementById('customer-form').addEventListener('submit', handleCustomerSubmit);
    document.getElementById('product-form').addEventListener('submit', handleProductSubmit);
    document.getElementById('checkout-form').addEventListener('submit', handleCheckoutSubmit);
    
    // Setup search listener
    document.getElementById('search-product').addEventListener('input', handleSearch);
    
    // Create overlay for mobile cart
    let overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.onclick = toggleCart;
    document.body.appendChild(overlay);
});

// ==========================================
// 3. Helper Functions
// ==========================================

function toggleCart() {
    let cartSidebar = document.querySelector('.cart-sidebar');
    let overlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('open');
    } else {
        cartSidebar.classList.add('open');
        overlay.classList.add('open');
    }
}

function updateCartBadge() {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count = count + cart[i].qty;
    }
    document.getElementById('cart-count-badge').innerText = count;
}

function updateCurrentDate() {
    let dateElement = document.getElementById('current-date');
    let now = new Date();
    dateElement.innerText = now.toDateString();
}

function showSection(sectionId) {
    // Hide all sections
    let sections = document.querySelectorAll('.section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    
    // Show the selected section
    document.getElementById(sectionId + '-section').classList.add('active');
    
    // Update sidebar active state
    let navItems = document.querySelectorAll('.sidebar nav li');
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove('active');
    }
}

// ==========================================
// 4. POS & Product Logic
// ==========================================

function renderProducts(category) {
    let filtered = [];
    if (category === 'all') {
        filtered = products;
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].category === category) {
                filtered.push(products[i]);
            }
        }
    }
    renderProductGrid(filtered);
}

function renderProductGrid(items) {
    let grid = document.getElementById('product-list');
    grid.innerHTML = ''; 
    
    for (let i = 0; i < items.length; i++) {
        let product = items[i];
        let card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">LKR ${product.price}</div>
            <div class="stock">${product.stock} Available</div>
            <button class="btn-view" style="width: 100%; margin-top: 10px;" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    }
}

function handleSearch(e) {
    let searchTerm = e.target.value.toLowerCase();
    let filtered = [];
    
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].name.toLowerCase();
        if (productName.includes(searchTerm)) {
            filtered.push(products[i]);
        }
    }
    
    renderProductGrid(filtered);
    
    // Reset category buttons
    let buttons = document.querySelectorAll('.category-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
}

function filterProducts(category) {
    // Update active button style
    let buttons = document.querySelectorAll('.category-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    // Add active class to clicked button
    event.target.classList.add('active');
    
    renderProducts(category);
}

// ==========================================
// 5. Cart Logic
// ==========================================

function addToCart(productId) {
    let product = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }

    let existingItem = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            existingItem = cart[i];
            break;
        }
    }
    
    if (existingItem) {
        existingItem.qty = existingItem.qty + 1;
    } else {
        // Manual object creation
        let newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            stock: product.stock,
            qty: 1
        };
        cart.push(newItem);
    }
    updateCartUI();
}

function updateCartUI() {
    let container = document.getElementById('cart-items-container');
    container.innerHTML = '';
    let total = 0;
    
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let itemTotal = item.price * item.qty;
        total = total + itemTotal;
        
        let el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">LKR ${item.price}</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total">LKR ${itemTotal}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash"></i> Remove
            </button>
        `;
        container.appendChild(el);
    }
    
    document.getElementById('cart-total').innerText = 'LKR ' + total.toFixed(2);
    updateCartBadge();
}

function updateQty(productId, change) {
    let item = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            item = cart[i];
            break;
        }
    }
    
    if (item) {
        item.qty = item.qty + change;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    updateCartUI();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    openModal('checkout-modal');
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    let name = document.getElementById('checkout-name').value;
    let phone = document.getElementById('checkout-phone').value;
    let email = document.getElementById('checkout-email').value;
    
    if (!name || name.trim() === "") {
        alert("Customer name is required.");
        return;
    }

    // Check if customer exists
    let customerExists = false;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].name.toLowerCase() === name.toLowerCase()) {
            customerExists = true;
            if (phone) customers[i].phone = phone;
            if (email) customers[i].email = email;
            break;
        }
    }
    
    if (!customerExists) {
        let maxId = 0;
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].id > maxId) {
                maxId = customers[i].id;
            }
        }
        
        let newCustomer = {
            id: maxId + 1,
            name: name,
            phone: phone || '-',
            email: email || '-'
        };
        customers.push(newCustomer);
    }
    
    renderCustomers(); // Update customer table
    
    let total = 0;
    let totalItems = 0;
    for (let i = 0; i < cart.length; i++) {
        total = total + (cart[i].price * cart[i].qty);
        totalItems = totalItems + cart[i].qty;
    }
    
    // Create new order object
    let newOrder = {
        id: currentOrderId,
        customer: name,
        total: total,
        date: new Date().toISOString().split('T')[0],
        items: totalItems,
        orderItems: cart
    };
    
    orders.push(newOrder);
    
    // Update stock
    for (let i = 0; i < cart.length; i++) {
        let cartItem = cart[i];
        for (let j = 0; j < products.length; j++) {
            if (products[j].id === cartItem.id) {
                products[j].stock = products[j].stock - cartItem.qty;
            }
        }
    }
    
    // Refresh UI
    renderOrders();
    renderProducts('all');
    renderProductsTable();
    
    alert('Payment Successful! Order #' + currentOrderId + ' placed for ' + name + '.');
    
    // Reset cart
    cart = [];
    updateCartUI();
    
    // Increment Order ID
    currentOrderId = currentOrderId + 1;
    updateOrderId();
    
    // Close modal
    closeModal('checkout-modal');
    e.target.reset();
    
    // Close cart on mobile
    if (window.innerWidth <= 1024) {
        toggleCart();
    }
}

function updateOrderId() {
    document.getElementById('order-id-display').innerText = currentOrderId;
}

// ==========================================
// 6. Customer Management
// ==========================================

function renderCustomers() {
    let tbody = document.querySelector('#customer-table tbody');
    tbody.innerHTML = '';
    
    for (let i = 0; i < customers.length; i++) {
        let c = customers[i];
        let tr = document.createElement('tr');
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
    }
}

function editCustomer(id) {
    let customer = null;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].id === id) {
            customer = customers[i];
            break;
        }
    }
    
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
    let id = document.getElementById('customer-id').value;
    let name = document.getElementById('customer-name').value;
    let phone = document.getElementById('customer-phone').value;
    let email = document.getElementById('customer-email').value;
    
    if (id) {
        // Update existing customer
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].id == id) {
                customers[i].name = name;
                customers[i].phone = phone;
                customers[i].email = email;
            }
        }
    } else {
        // Add new customer
        let maxId = 0;
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].id > maxId) {
                maxId = customers[i].id;
            }
        }
        
        let newCustomer = {
            id: maxId + 1,
            name: name,
            phone: phone,
            email: email
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
    if(confirm('Are you sure you want to delete this customer?')) {
        let newCustomers = [];
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].id !== id) {
                newCustomers.push(customers[i]);
            }
        }
        customers = newCustomers;
        renderCustomers();
    }
}

// ==========================================
// 7. Product Management
// ==========================================

function renderProductsTable() {
    let tbody = document.querySelector('#product-table tbody');
    tbody.innerHTML = '';
    
    for (let i = 0; i < products.length; i++) {
        let p = products[i];
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.image}" width="40" height="40" style="border-radius: 50%"></td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>LKR ${p.price}</td>
            <td>
                <button class="btn-icon" onclick="editProduct(${p.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon delete" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

function editProduct(id) {
    let product = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            product = products[i];
            break;
        }
    }
    
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
    let id = document.getElementById('product-id').value;
    let name = document.getElementById('product-name').value;
    let category = document.getElementById('product-category').value;
    let price = parseFloat(document.getElementById('product-price').value);
    let stock = parseInt(document.getElementById('product-stock').value);
    let image = document.getElementById('product-image').value;
    
    if (image === '') {
        image = 'https://via.placeholder.com/150';
    }
    
    if (id) {
        // Update existing product
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].name = name;
                products[i].category = category;
                products[i].price = price;
                products[i].stock = stock;
                products[i].image = image;
            }
        }
    } else {
        // Add new product
        let maxId = 0;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id > maxId) {
                maxId = products[i].id;
            }
        }
        
        let newProduct = {
            id: maxId + 1,
            name: name,
            category: category,
            price: price,
            image: image,
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
    if(confirm('Are you sure you want to delete this product?')) {
        let newProducts = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].id !== id) {
                newProducts.push(products[i]);
            }
        }
        products = newProducts;
        renderProductsTable();
        renderProducts('all');
    }
}

// ==========================================
// 8. Order History
// ==========================================

function renderOrders() {
    let tbody = document.querySelector('#order-table tbody');
    tbody.innerHTML = '';
    
    for (let i = 0; i < orders.length; i++) {
        let o = orders[i];
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${o.id}</td>
            <td>${o.customer}</td>
            <td>LKR ${o.total.toFixed(2)}</td>
            <td>${o.date}</td>
            <td>${o.items}</td>
            <td><button class="btn-icon" onclick="viewOrder(${o.id})">View</button></td>
        `;
        tbody.appendChild(tr);
    }
}

function viewOrder(orderId) {
    let order = null;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            order = orders[i];
            break;
        }
    }
    
    if (!order) return;

    let content = document.getElementById('order-details-content');
    let itemsHtml = '';
    
    if (order.orderItems && order.orderItems.length > 0) {
        let rows = '';
        for (let i = 0; i < order.orderItems.length; i++) {
            let item = order.orderItems[i];
            rows += `
                <tr style="border-bottom:1px solid #393c49;">
                    <td style="padding:8px;">${item.name}</td>
                    <td style="padding:8px;">${item.qty}</td>
                    <td style="padding:8px;">LKR ${(item.price * item.qty).toFixed(2)}</td>
                </tr>
            `;
        }
        
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
                    ${rows}
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

// ==========================================
// 9. Modal Logic
// ==========================================

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