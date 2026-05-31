// WELCOME MESSAGE
window.onload = () => {
    console.log("Quick Bite App Loaded Successfully");
};

// SEARCH FUNCTION
const searchInput = document.querySelector(".search input");

searchInput.addEventListener("keyup", () => {

    let filter = searchInput.value.toLowerCase();

    let cards = document.querySelectorAll(".card, .Drinks");

    cards.forEach(card => {

        let text = card.textContent.toLowerCase();

        if(text.includes(filter)){
            card.style.display = "block";
        } else{
            card.style.display = "none";
        }

    });

});

// CATEGORY CLICK EFFECT
const categories = document.querySelectorAll(".card, .Drinks");

categories.forEach(category => {

    category.addEventListener("click", () => {

        alert(category.textContent + " Selected");

    });

});

// DARK MODE TOGGLE
const darkBtn = document.createElement("button");

darkBtn.innerHTML = "Dark Mode";

darkBtn.style.position = "fixed";
darkBtn.style.bottom = "20px";
darkBtn.style.right = "20px";
darkBtn.style.padding = "12px 18px";
darkBtn.style.border = "none";
darkBtn.style.borderRadius = "30px";
darkBtn.style.background = "#ff6b00";
darkBtn.style.color = "white";
darkBtn.style.cursor = "pointer";

document.body.appendChild(darkBtn);

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});

// DARK MODE STYLES
const style = document.createElement("style");

style.innerHTML = `
.dark-mode{
    background:#1e1e1e;
    color:white;
}

.dark-mode nav{
    background:#2c2c2c;
}

.dark-mode .card,
.dark-mode .Drinks{
    background:#333;
    color:white;
}

.dark-mode .search input{
    background:#333;
    color:white;
}
`;

document.head.appendChild(style);

