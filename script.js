// ===================================
// HERO SLIDER
// ===================================

const slides =
document.querySelectorAll(".slide");

const dots =
document.querySelectorAll(".dot");

const nextBtn =
document.querySelector(".next-btn");

const prevBtn =
document.querySelector(".prev-btn");

let currentSlide = 0;

// ===================================
// SHOW SLIDE
// ===================================

function showSlide(index){

  slides.forEach((slide) => {

    slide.classList.remove("active");

  });

  dots.forEach((dot) => {

    dot.classList.remove("active-dot");

  });

  slides[index].classList.add("active");

  dots[index].classList.add("active-dot");

}

// ===================================
// NEXT SLIDE
// ===================================

function nextSlide(){

  currentSlide++;

  if(currentSlide >= slides.length){

    currentSlide = 0;

  }

  showSlide(currentSlide);

}

// ===================================
// PREVIOUS SLIDE
// ===================================

function previousSlide(){

  currentSlide--;

  if(currentSlide < 0){

    currentSlide = slides.length - 1;

  }

  showSlide(currentSlide);

}

// ===================================
// BUTTON EVENTS
// ===================================

nextBtn.addEventListener("click", () => {

  nextSlide();

});

prevBtn.addEventListener("click", () => {

  previousSlide();

});

// ===================================
// DOT EVENTS
// ===================================

dots.forEach((dot, index) => {

  dot.addEventListener("click", () => {

    currentSlide = index;

    showSlide(currentSlide);

  });

});

// ===================================
// AUTO SLIDE
// ===================================

setInterval(() => {

  nextSlide();

}, 5000);

// ===================================
// NAVBAR SCROLL
// ===================================

const navbar =
document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){

    navbar.classList.add("scrolled");

  }

  else{

    navbar.classList.remove("scrolled");

  }

});

// ===================================
// SMOOTH SCROLL
// ===================================

const navLinks =
document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {

  link.addEventListener("click", (e) => {

    e.preventDefault();

    const targetId =
    link.getAttribute("href");

    const targetSection =
    document.querySelector(targetId);

    window.scrollTo({

      top:
      targetSection.offsetTop - 80,

      behavior: "smooth"

    });

  });

});

// ===================================
// EMAIL FORM
// ===================================

const notifyForm =
document.querySelector(".notify-form");

notifyForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const emailInput =
  notifyForm.querySelector("input");

  const emailValue =
  emailInput.value.trim();

  if(emailValue === ""){

    alert(
      "Please enter your email address."
    );

    return;

  }

  alert(
    "Thank you for joining the PawLatto family!"
  );

  emailInput.value = "";

});

// ===================================
// TERMS POPUP
// ===================================

const termsPopup =
document.getElementById("termsPopup");

const acceptTerms =
document.getElementById("acceptTerms");

const learnMore =
document.getElementById("learnMore");

acceptTerms.addEventListener("click", () => {

  localStorage.setItem(
    "pawlattoTermsAccepted",
    "true"
  );

  termsPopup.style.display = "none";

});

if(
  localStorage.getItem(
    "pawlattoTermsAccepted"
  ) === "true"
){

  termsPopup.style.display = "none";

}

learnMore.addEventListener("click", () => {

  alert(

`PawLatto Terms & Conditions

• Products are subject to availability.
• Delivery times may vary.
• Payments are processed securely.
• PawLatto reserves the right to update products and pricing.
• By using this website you agree to our policies.`

  );

});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const animatedItems =
document.querySelectorAll(
  ".product-card, .feature-box, .contact-card"
);

animatedItems.forEach((item) => {

  item.style.opacity = "0";

  item.style.transform =
  "translateY(40px)";

  item.style.transition =
  "0.8s ease";

});

window.addEventListener("scroll", () => {

  animatedItems.forEach((item) => {

    const itemTop =
    item.getBoundingClientRect().top;

    if(itemTop < window.innerHeight - 100){

      item.style.opacity = "1";

      item.style.transform =
      "translateY(0px)";

    }

  });

});

// ===================================
// CART SYSTEM
// ===================================

const cartBtn =
document.getElementById("cartBtn");

const cartSidebar =
document.getElementById("cartSidebar");

const closeCart =
document.getElementById("closeCart");

const cartItemsContainer =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

const cartCount =
document.getElementById("cartCount");

// ===================================
// OPEN CART
// ===================================

cartBtn.addEventListener("click", () => {

  cartSidebar.classList.add("active");

});

// ===================================
// CLOSE CART
// ===================================

closeCart.addEventListener("click", () => {

  cartSidebar.classList.remove("active");

});

// ===================================
// CART ARRAY
// ===================================

let cart = [];

// LOAD SAVED CART

if(localStorage.getItem("pawlattoCart")){

  cart =
  JSON.parse(
    localStorage.getItem("pawlattoCart")
  );

  updateCart();

}

// ===================================
// UPDATE CART
// ===================================

function updateCart(){

  cartItemsContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {

    subtotal += item.price;

    const cartItem =
    document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>R${item.price}</p>
      </div>

      <button
        class="remove-item"
        data-index="${index}"
      >
        Remove
      </button>
    `;

    cartItemsContainer.appendChild(cartItem);

  });

  const deliveryFee =
  cart.length > 0 ? 80 : 0;

  const total =
  subtotal + deliveryFee;

  cartTotal.innerText = `R${total}`;

  cartCount.innerText = cart.length;

  localStorage.setItem(
    "pawlattoCart",
    JSON.stringify(cart)
  );

  document
    .querySelectorAll(".remove-item")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const index =
        button.dataset.index;

        cart.splice(index, 1);

        updateCart();

      });

    });

}

// ===================================
// CHECKOUT MODAL
// ===================================

const checkoutBtn =
document.getElementById("checkoutBtn");

const checkoutModal =
document.getElementById("checkoutModal");

const submitOrderBtn =
document.getElementById("submitOrderBtn");

const closeCheckoutModal =
document.getElementById("closeCheckoutModal");

// OPEN MODAL

checkoutBtn.addEventListener("click", () => {

  if(cart.length === 0){

    alert("Your cart is empty.");

    return;

  }

  checkoutModal.style.display = "flex";

});

// CLOSE MODAL

closeCheckoutModal.addEventListener("click", () => {

  checkoutModal.style.display = "none";

});

// SUBMIT ORDER

submitOrderBtn.addEventListener("click", async () => {

  const customerName =
  document.getElementById("customerName").value;

  const customerPhone =
  document.getElementById("customerPhone").value;

  const customerEmail =
  document.getElementById("customerEmail").value;

  const customerAddress =
  document.getElementById("customerAddress").value;

  if(
    !customerName ||
    !customerPhone ||
    !customerEmail ||
    !customerAddress
  ){

    alert("Please complete all fields.");

    return;

  }

  let total = 0;

  cart.forEach((item) => {

    total += item.price;

  });

  total += 80;

  const orderData = {

    customerName,
    customerPhone,
    customerEmail,
    customerAddress,

    items: cart,

    total

  };

  try{

    await fetch(
      "https://script.google.com/macros/s/AKfycbwDh-iKAlnFSXJT9Ra4vKXlNq01zDfm4fVdrWpz85D1jixH_Xi_jiLs_zjTH4q00UDC/exec",
      {
        method: "POST",
        body: JSON.stringify(orderData)
      }
    );

  }

  catch(error){

    console.log(error);

  }

  const merchantId =
  "34900767";

  const merchantKey =
  "sfvvofpzaciwk";

  const itemDescription =
  cart.map(item => item.name)
  .join(", ");

  const paymentUrl =
  `https://www.payfast.co.za/eng/process?merchant_id=${merchantId}&merchant_key=${merchantKey}&amount=${total}&item_name=PawLatto Order&item_description=${encodeURIComponent(itemDescription)}`;

localStorage.removeItem("pawlattoCart");
cart = [];

document.getElementById("customerName").value = "";
document.getElementById("customerPhone").value = "";
document.getElementById("customerEmail").value = "";
document.getElementById("customerAddress").value = "";
  
window.location.href = paymentUrl;

});

// ===================================
// FOOTER LINK EFFECTS
// ===================================

const footerLinks =
document.querySelectorAll(".footer-box a");

footerLinks.forEach((link) => {

  link.addEventListener("mouseenter", () => {

    link.style.transform =
    "translateX(5px)";

  });

  link.addEventListener("mouseleave", () => {

    link.style.transform =
    "translateX(0px)";

  });

});

// ===================================
// LOAD PRODUCTS FROM GOOGLE SHEETS
// ===================================

const productsGrid =
document.getElementById("productsGrid");

const API_URL =
"https://script.google.com/macros/s/AKfycbwDh-iKAlnFSXJT9Ra4vKXlNq01zDfm4fVdrWpz85D1jixH_Xi_jiLs_zjTH4q00UDC/exec";

let allProducts = [];

async function loadProducts(){

  try{

    const response = await fetch(API_URL);
    const products = await response.json();

    allProducts = products;

   productsGrid.innerHTML =
"<p>Products currently unavailable.</p>";

    products.forEach((product) => {

      const card = document.createElement("div");

      card.classList.add("product-card");

      card.innerHTML = `

<div class="product-badge">
⭐ Best Seller
</div>

        <img
          src="${product.image1}"
          alt="${product.name}"
          class="product-image"
        >

        <h3>${product.name}</h3>

        <div class="product-rating">
⭐⭐⭐⭐⭐
<span>
(${product.rating || "4.9"})
</span>
</div>

<p class="product-price">
R${product.price}
</p>

<button
class="add-cart-btn"
data-name="${product.name}"
data-price="${product.price}"
>
🛒 Add To Cart
</button>

<button
class="view-details-btn"
onclick="openProductDetails(${allProducts.indexOf(product)})"
>
👀 View Details
</button>

      `;

      productsGrid.appendChild(card);

    });

    initializeCartButtons();

  }

  catch(error){

    console.error("PRODUCT ERROR:", error);

  }

}
// ===================================
// DYNAMIC CART BUTTONS
// ===================================

function initializeCartButtons(){

  const buttons =
  document.querySelectorAll(".add-cart-btn");

  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      const name =
      button.dataset.name;

      const price =
      parseFloat(
        button.dataset.price
      );

      cart.push({

        name,
        price

      });

      updateCart();

    });

  });

}

// ===================================
// PAGE LOAD EFFECT
// ===================================

window.addEventListener("load", () => {

  document.body.style.opacity = "0";

  setTimeout(() => {

    document.body.style.transition =
    "1s ease";

    document.body.style.opacity = "1";

  }, 100);

});

// ===================================
// START WEBSITE
// ===================================

loadProducts();

updateCart();

const productModal =
document.getElementById("productModal");

const productModalBody =
document.getElementById("productModalBody");

const closeProductModal =
document.getElementById("closeProductModal");

closeProductModal.addEventListener("click", () => {

  productModal.classList.remove("active");

});

function openProductDetails(index){

  const product = allProducts[index];

  productModalBody.innerHTML = `

    <div class="product-main-image-container">

      <img
        src="${product.image1}"
        id="mainProductImage"
        class="main-product-image"
      >

    </div>
    
<div class="product-gallery">

  <img
    src="${product.image1}"
    class="detail-image"
    onclick="changeMainImage('${product.image1}')"
  >

  ${product.image2 ? `
    <img
      src="${product.image2}"
      class="detail-image"
      onclick="changeMainImage('${product.image2}')"
    >
  ` : ""}

  ${product.image3 ? `
    <img
      src="${product.image3}"
      class="detail-image"
      onclick="changeMainImage('${product.image3}')"
    >
  ` : ""}

</div>

    <h2 class="modal-product-title">
      ${product.name}
    </h2>

    <h3 class="modal-product-price">
      R${product.price}
    </h3>

<div class="product-rating">

⭐⭐⭐⭐⭐

<span>
(${product.rating || "4.9"})
</span>

</div>

   <div class="product-benefits">

  <p>✅ In Stock & Ready To Ship</p>

  <p>🚚 Fast Delivery Nationwide</p>

  <p>⭐ Rated ${product.rating || "4.9"}/5</p>

  <p>🔒 Secure Checkout</p>

</div>

    <div class="product-description">

      <h3>
        About This Product
      </h3>

      <p>
        ${product.details}
      </p>

      <p>
        <strong>Dimensions:</strong>
        ${product.dimensions}
      </p>

      <p>
        <strong>Material:</strong>
        ${product.material}
      </p>

    </div>

    <div class="modal-buttons">

      <button
        class="modal-add-cart-btn"
        onclick="addModalToCart(${index})"
      >
        🛒 Add To Cart
      </button>

      <button
        class="modal-buy-now-btn"
        onclick="buyNow(${index})"
      >
        ⚡ Buy Now
      </button>

    </div>

  `;

  productModal.classList.add("active");

}

function changeMainImage(image){

  document.getElementById(
    "mainProductImage"
  ).src = image;

}

function addModalToCart(index){

  const product = allProducts[index];

  cart.push({

    name: product.name,

    price: parseFloat(product.price)

  });

  updateCart();

  alert("Added to cart.");

}

function buyNow(index){

  const product = allProducts[index];

  cart.push({

    name: product.name,

    price: parseFloat(product.price)

  });

  updateCart();

  productModal.classList.remove("active");

  cartSidebar.classList.add("active");

}
