// Get cart data from localStorage or initialize as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Preload some products if the cart is empty
if (cart.length === 0) {
    // Adding sample products with images to the cart
    cart.push(
        { name: "Laptop", price: 500, quantity: 1, image: "images/product1.jpeg" }, // Laptop product with image
        { name: "Smartphone", price: 300, quantity: 2, image: "images/product2.jpeg" } // Smartphone product with image
    );
}

// Function to update the cart UI
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    // Loop through the cart and display items with images
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <div>${item.name} - $${item.price}</div>
                <div>
                    <button onclick="updateQuantity(${index}, -1)">-</button> 
                    ${item.quantity} 
                    <button onclick="updateQuantity(${index}, 1)">+</button> 
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
        
        cartItemsList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    // Update the total price
    document.getElementById('total-price').textContent = `Total: $${totalPrice}`;

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add item to cart
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }

    updateCart();
}

// Function to remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to update the quantity of an item
function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;
    if (item.quantity <= 0) cart.splice(index, 1); // Remove item if quantity is zero
    updateCart();
}

// Function to clear the entire cart
function clearCart() {
    cart = [];
    updateCart();
}

// Initial call to display the cart when the page loads
updateCart();
