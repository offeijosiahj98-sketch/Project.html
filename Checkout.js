document.addEventListener("DOMContentLoaded", () => {

    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const deliveryFeeEl = document.getElementById("delivery-fee");
    const totalEl = document.getElementById("total");
    const form = document.getElementById("checkout-form");

    const DELIVERY_FEE = 2.00;

    // Load cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // -------------------------
    // DISPLAY CART ITEMS
    // -------------------------
    function renderCart() {

        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
            subtotalEl.textContent = "$0.00";
            deliveryFeeEl.textContent = `$${DELIVERY_FEE.toFixed(2)}`;
            totalEl.textContent = "$0.00";
            return;
        }

        let subtotal = 0;

        cart.forEach(item => {

            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;

            const itemTotal = price * quantity;
            subtotal += itemTotal;

            const div = document.createElement("div");
            div.classList.add("checkout-item");

            div.innerHTML = `
                <h4>${item.name}</h4>
                <p>Quantity: ${quantity}</p>
                <p>Price: $${price.toFixed(2)}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
            `;

            cartItemsContainer.appendChild(div);
        });

        const total = subtotal + DELIVERY_FEE;

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        deliveryFeeEl.textContent = `$${DELIVERY_FEE.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
    }

    renderCart();

    // -------------------------
    // FORM SUBMIT
    // -------------------------
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const notes = document.getElementById("notes").value.trim();

        const selectedPayment = document.querySelector('input[name="payment"]:checked');

        if (!fullname) {
            alert("Please enter your full name.");
            return;
        }

        if (!phone) {
            alert("Please enter your phone number.");
            return;
        }

        const phonePattern = /^[0-9+\s-]{7,15}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid phone number.");
            return;
        }

        if (!address) {
            alert("Please enter your delivery address.");
            return;
        }

        if (!selectedPayment) {
            alert("Please select a payment method.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const paymentMethod = selectedPayment.value;

        const orderMessage = `
QUICK FOOD ORDER CONFIRMATION

Name: ${fullname}
Phone: ${phone}
Address: ${address}

Payment Method: ${paymentMethod}

Notes: ${notes || "None"}

Total: ${totalEl.textContent}

Do you want to confirm this order?
`;

        const confirmOrder = confirm(orderMessage);

        if (confirmOrder) {

            alert("Order placed successfully!");

            const order = {
                fullname,
                phone,
                address,
                notes,
                paymentMethod,
                items: cart,
                total: totalEl.textContent,
                date: new Date().toLocaleString()
            };

            localStorage.setItem("lastOrder", JSON.stringify(order));

            localStorage.removeItem("cart");

            form.reset();

            window.location.href = "Index.html";
        }
    });

    // -------------------------
    // RESET FEEDBACK
    // -------------------------
    form.addEventListener("reset", () => {
        setTimeout(() => {
            alert("Form cleared successfully.");
        }, 100);
    });

});

const mmOverlay = document.getElementById("mm-overlay");
const mmText = document.getElementById("mm-text");

let selectedNumber = "";

document.querySelectorAll('input[name="payment"]').forEach(option => {

    option.addEventListener("change", () => {

        if (option.value === "Orange Money") {
            selectedNumber = "0761123516";
            mmText.innerHTML = `
                Orange Money Payment<br>
                Send to: <strong>0761123516</strong><br>
                Name: Quick Bite
            `;
            mmOverlay.classList.remove("hidden");
        }

        else if (option.value === "MTN Mobile Money") {
            selectedNumber = "880361427";
            mmText.innerHTML = `
                MTN Mobile Money Payment<br>
                Send to: <strong>+231 880361427</strong><br>
                Name: Quick Bite
            `;
            mmOverlay.classList.remove("hidden");
        }
    });
});

function copyNumber() {
    navigator.clipboard.writeText(selectedNumber);
    alert("Number copied successfully!");
}

function closePopup() {
    mmOverlay.classList.add("hidden");
}