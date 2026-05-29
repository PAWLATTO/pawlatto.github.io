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

const addCartButtons =
document.querySelectorAll(".add-cart-btn");

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
// ADD TO CART
// ===================================

addCartButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const productCard =
    button.parentElement;

    const name =
    productCard.dataset.name;

    const price =
    parseInt(productCard.dataset.price);

    cart.push({

      name,
      price

    });

    updateCart();

  });

});

// ===================================
// UPDATE CART
// ===================================

function updateCart(){

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

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

  cartTotal.innerText =
  `R${total}`;

  cartCount.innerText =
  cart.length;

  localStorage.setItem(
    "pawlattoCart",
    JSON.stringify(cart)
  );

  // REMOVE BUTTONS

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
// PAYFAST CHECKOUT
// ===================================

const checkoutBtn =
document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {

  if(cart.length === 0){

    alert(
      "Your cart is empty."
    );

    return;

  }

  let total = 0;

  cart.forEach((item) => {

    total += item.price;

  });

  // PAYFAST DETAILS

  const merchantId =
  "34900767";

  const merchantKey =
  "sfvvofpzaciwk";

  // PRODUCT DESCRIPTION

  let itemDescription =
  cart.map((item) => item.name)
  .join(", ");

  // PAYFAST URL

  const paymentUrl =
  `https://www.payfast.co.za/eng/process?merchant_id=${merchantId}&merchant_key=${merchantKey}&amount=${total}&item_name=PawLatto Order&item_description=${encodeURIComponent(itemDescription)}`;

  // REDIRECT

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
