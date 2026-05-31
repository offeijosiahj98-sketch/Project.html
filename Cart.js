window.onload = function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let container = document.getElementById("cart-items");
    let totalElement = document.getElementById("total");

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty</h3>";
        totalElement.textContent = "";
        return;
    }

    cart.forEach((item, index) => {

        total += item.price;

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p class="price">$${item.price.toFixed(2)}</p>
            <button onclick="removeItem(${index})">Remove</button>
        `;

        container.appendChild(card);
    });

    totalElement.textContent = "Total: $" + total.toFixed(2);
};

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}