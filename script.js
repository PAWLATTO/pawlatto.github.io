// =========================
// CART VARIABLES
// =========================

const cartBtn = document.querySelector(".cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");
const overlay = document.getElementById("overlay");

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

const cartItemsContainer = document.querySelector(".cart-items");

const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const checkoutBtn = document.querySelector(".checkout-btn");

// =========================
// CART DATA
// =========================

let cart = [];

// =========================
// OPEN CART
// =========================

cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
});

// =========================
// CLOSE CART
// =========================

closeCartBtn.addEventListener("click", closeCart);

overlay.addEventListener("click", closeCart);

function closeCart() {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// =========================
// ADD PRODUCTS TO CART
// =========================

addToCartButtons.forEach((button, index) => {

  button.addEventListener("click", () => {

    const productCard =
      button.closest(".product-card");

    const productName =
      productCard.querySelector("h3").innerText;

    const productPriceText =
      productCard.querySelector(".product-price").innerText;

    const productPrice =
      parseInt(
        productPriceText.replace("R", "")
      );

    const productImage =
      productCard.querySelector("img").src;

    addToCart(
      productName,
      productPrice,
      productImage
    );

  });

});

// =========================
// ADD TO CART FUNCTION
// =========================

function addToCart(name, price, image) {

  const existingProduct =
    cart.find(item => item.name === name);

  if(existingProduct){

    existingProduct.quantity += 1;

  } else {

    cart.push({
      name,
      price,
      image,
      quantity: 1
    });

  }

  updateCartUI();

  openCartAfterAdd();

}

// =========================
// OPEN CART AFTER ADD
// =========================

function openCartAfterAdd(){

  cartSidebar.classList.add("active");
  overlay.classList.add("active");

}

// =========================
// UPDATE CART UI
// =========================

function updateCartUI(){

  cartItemsContainer.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    totalItems += item.quantity;

    const cartItem = document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `

      <div class="cart-product">

        <img
          src="${item.image}"
          alt="${item.name}"
          class="cart-product-image"
        >

        <div class="cart-product-info">

          <h4>${item.name}</h4>

          <p>R${item.price}</p>

          <div class="quantity-controls">

            <button
              class="quantity-btn decrease"
              data-index="${index}"
            >
              -
            </button>

            <span>${item.quantity}</span>

            <button
              class="quantity-btn increase"
              data-index="${index}"
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove-btn"
          data-index="${index}"
        >
          ✕
        </button>

      </div>

    `;

    cartItemsContainer.appendChild(cartItem);

  });

  cartTotal.innerText = total;

  cartCount.innerText = totalItems;

  activateCartButtons();

}

// =========================
// ACTIVATE BUTTONS
// =========================

function activateCartButtons(){

  // REMOVE BUTTONS

  const removeButtons =
    document.querySelectorAll(".remove-btn");

  removeButtons.forEach(button => {

    button.addEventListener("click", () => {

      const index =
        button.getAttribute("data-index");

      removeFromCart(index);

    });

  });

  // INCREASE BUTTONS

  const increaseButtons =
    document.querySelectorAll(".increase");

  increaseButtons.forEach(button => {

    button.addEventListener("click", () => {

      const index =
        button.getAttribute("data-index");

      cart[index].quantity += 1;

      updateCartUI();

    });

  });

  // DECREASE BUTTONS

  const decreaseButtons =
    document.querySelectorAll(".decrease");

  decreaseButtons.forEach(button => {

    button.addEventListener("click", () => {

      const index =
        button.getAttribute("data-index");

      if(cart[index].quantity > 1){

        cart[index].quantity -= 1;

      } else {

        cart.splice(index, 1);

      }

      updateCartUI();

    });

  });

}

// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index){

  cart.splice(index, 1);

  updateCartUI();

}

// =========================
// CHECKOUT BUTTON
// =========================

checkoutBtn.addEventListener("click", () => {

  if(cart.length === 0){

    alert("Your cart is empty.");

    return;

  }

  alert(
    "Checkout system coming soon with PayFast integration."
  );

});

// =========================
// SAVE CART TO LOCAL STORAGE
// =========================

function saveCart(){

  localStorage.setItem(
    "pawlattoCart",
    JSON.stringify(cart)
  );

}

// =========================
// LOAD CART FROM LOCAL STORAGE
// =========================

function loadCart(){

  const savedCart =
    localStorage.getItem("pawlattoCart");

  if(savedCart){

    cart = JSON.parse(savedCart);

    updateCartUI();

  }

}

// =========================
// AUTO SAVE WHEN CART UPDATES
// =========================

const originalUpdateCartUI = updateCartUI;

updateCartUI = function(){

  originalUpdateCartUI();

  saveCart();

};

// =========================
// LOAD CART ON PAGE LOAD
// =========================

loadCart();

// =========================
// MOBILE NAVIGATION
// =========================

const navLinks =
  document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    closeCart();

  });

});

// =========================
// SMOOTH PRODUCT BUTTON ANIMATION
// =========================

addToCartButtons.forEach(button => {

  button.addEventListener("click", () => {

    button.innerText = "Added ✓";

    setTimeout(() => {

      button.innerText = "Add to Cart";

    }, 1500);

  });

});

// =========================
// SCROLL NAVBAR EFFECT
// =========================

window.addEventListener("scroll", () => {

  const navbar =
    document.querySelector(".navbar");

  if(window.scrollY > 50){

    navbar.style.boxShadow =
      "0 4px 20px rgba(0,0,0,0.1)";

  } else {

    navbar.style.boxShadow =
      "0 2px 10px rgba(0,0,0,0.05)";

  }

});
