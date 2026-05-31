let cart = JSON.parse(localStorage.getItem("cart")) || [];

// -------------------------------
// ADD TO CART
// -------------------------------
function add(name, price) {

    price = Number(price);

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart`);
}

// -------------------------------
// CATEGORY FILTER
// -------------------------------
function filter(category) {

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        if (category === "all") {
            card.style.display = "block";
        } else {
            if (card.classList.contains(category)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });
}

// -------------------------------
// OPTIONAL: SHOW CART COUNT (if you add a cart badge later)
// -------------------------------
function updateCartCount() {

    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    // If you later add an element like:
    // <span id="cart-count"></span>

    let el = document.getElementById("cart-count");
    if (el) {
        el.textContent = count;
    }
}

// run once on load
updateCartCount();