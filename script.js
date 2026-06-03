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

  const deliveryFee = 80;

  const total =
  subtotal + deliveryFee;

  cartTotal.innerText =
  `R${total}`;

  cartCount.innerText =
  cart.length;

  localStorage.setItem(
    "pawlattoCart",
    JSON.stringify(cart)
  );

  const removeButtons =
  document.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {

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

  window.location.href =
  paymentUrl;

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

async function loadProducts(){

  try{

    const response =
    await fetch(API_URL);

    const products =
    await response.json();

    console.log(products);

    console.log(productsGrid);

    productsGrid.innerHTML = "";

    console.log("Products received:", products);
console.log("Products grid:", productsGrid);

    products.forEach((product) => {

      const card =
      document.createElement("div");

      card.classList.add("product-card");

      card.innerHTML = `

        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-image"
        >

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <p>Stock: ${product.quantity}</p>

        <p>R${product.price}</p>

        <button
          class="add-cart-btn"
          data-name="${product.name}"
          data-price="${product.price}"
        >
          Add To Cart
        </button>

      `;

      productsGrid.appendChild(card);

      console.log("Card added:", card);

    });

    initializeCartButtons();

  }

  catch(error){

    console.error("PRODUCT ERROR:", error);

    productsGrid.innerHTML =
    "<p>Unable to load products.</p>";

  }

}

loadProducts();

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
