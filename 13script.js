// LOAD CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// UPDATE CART COUNT
function updateCartCount() {

    const cartIcon = document.querySelector(".icons span");

    if (cartIcon) {
        cartIcon.innerText = `🛒 (${cart.length})`;
    }
}

// SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ADD TO CART
function addToCart(name, price) {

    const product = {
        name,
        price
    };

    cart.push(product);

    saveCart();

    updateCartCount();

    console.log("Product Added:");
    console.log(product);

    alert(name + " added to cart ✅");
}

// REMOVE ITEM
function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();
}

// DISPLAY CART ITEMS
function displayCart() {

    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = "<h2>Your cart is empty</h2>";

        document.getElementById("total").innerText = "";

        return;
    }

    cart.forEach((item, index) => {

        const div = document.createElement("div");

        div.classList.add("product-card");

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>

            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartContainer.appendChild(div);
    });

    updateTotal();
}

// TOTAL PRICE
function updateTotal() {

    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    const totalElement = document.getElementById("total");

    if (totalElement) {
        totalElement.innerText = "Total Price: ₹" + total;
    }
}
// SEARCH PRODUCTS
function setupSearch() {

    const searchBox = document.querySelector(".search-box");

    // STOP IF SEARCH BOX DOESN'T EXIST
    if (!searchBox) return;

    searchBox.addEventListener("keyup", function () {

        const searchValue = this.value.toLowerCase();

        // SELECT ALL PRODUCTS
        const products = document.querySelectorAll(".product-card");

        products.forEach(product => {

            const productName =
                product.querySelector("h3").innerText.toLowerCase();

            // MATCH SEARCH
            if (productName.includes(searchValue)) {

                product.style.display = "block";

            } else {

                product.style.display = "none";
            }
        });
    });
}

// ORDER FORM

// ORDER FORM
function setupOrderForm() {

    // SELECT FORM
    const form = document.querySelector("#order-form");

    // STOP IF FORM NOT FOUND
    if (!form) return;

    // FORM SUBMIT
    form.addEventListener("submit", function(event) {

        // STOP PAGE REFRESH
        event.preventDefault();

        // SUCCESS MESSAGE
        alert("🎉 Order Placed Successfully!");

        // CLEAR LOCAL STORAGE
        localStorage.removeItem("cart");

        // EMPTY CART ARRAY
        cart = [];

        // UPDATE CART ICON
        updateCartCount();

        // REDIRECT AFTER 1 SECOND
        setTimeout(function() {

            window.location.href = "index.html";

        }, 1000);
    });
}

// LOGIN FORM
// LOGIN FORM
function setupLoginForm() {

    const form = document.getElementById("login-form");

    // STOP IF FORM NOT FOUND
    if (!form) return;

    form.addEventListener("submit", function(e) {

        // STOP PAGE REFRESH
        e.preventDefault();

        // GET USERNAME
        const username =
            document.getElementById("username").value;

        // SAVE LOGIN STATUS
        localStorage.setItem("loggedIn", "true");

        // SAVE USERNAME
        localStorage.setItem("username", username);

        // SUCCESS ALERT
        alert("✅ Welcome " + username);

        // GO TO HOME PAGE
        window.location.href = "index.html";
    });
}
// FILTER PRODUCTS
function setupFilters() {

    // GET FILTERS
    const categoryFilter =
        document.getElementById("category-filter");

    const priceFilter =
        document.getElementById("price-filter");

    // STOP IF FILTERS NOT FOUND
    if (!categoryFilter || !priceFilter) return;

    // PRODUCT GRID
    const productGrid =
        document.querySelector(".product-grid");

    // FILTER FUNCTION
    function filterProducts() {

        // GET VALUES
        const categoryValue =
            categoryFilter.value;

        const priceValue =
            priceFilter.value;

        // GET ALL PRODUCTS
        let products =
            Array.from(document.querySelectorAll(".product-card"));

        // CATEGORY FILTER
        products.forEach(product => {

            const category =
                product.dataset.category;

            // SHOW MATCHING PRODUCTS
            if (
                categoryValue === "all" ||
                category === categoryValue
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";
            }
        });

        // PRICE SORT
        if (priceValue !== "default") {

            products.sort((a, b) => {

                const priceA =
                    Number(a.dataset.price);

                const priceB =
                    Number(b.dataset.price);

                // LOW TO HIGH
                if (priceValue === "low") {

                    return priceA - priceB;

                }

                // HIGH TO LOW
                else {

                    return priceB - priceA;
                }
            });

            // REARRANGE PRODUCTS
            products.forEach(product => {

                productGrid.appendChild(product);
            });
        }
    }

    // CATEGORY EVENT
    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

    // PRICE EVENT
    priceFilter.addEventListener(
        "change",
        filterProducts
    );
}
// START
document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    displayCart();

    setupSearch();

    setupOrderForm();

    setupLoginForm();

    setupFilters();
});
