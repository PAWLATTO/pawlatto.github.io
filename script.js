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

const customerProvince =
document.getElementById("customerProvince");

const customerCity =
document.getElementById("customerCity");

const deliveryFeeDisplay =
document.getElementById("deliveryFeeDisplay");

const deliveryFeeElement =
document.getElementById("deliveryFee");

function calculateDeliveryFee(subtotal){

  const province =
  customerProvince.value;

  const city =
  customerCity.value.trim().toLowerCase();

  if(!province || !city){

    return null;

  }

  // CENTURION

  if(
    province === "Gauteng" &&
    city === "centurion"
  ){

    if(subtotal >= 499) return 0;

    if(subtotal >= 150) return 29;

    return 39;

  }

  // REST OF GAUTENG

  if(province === "Gauteng"){

    if(subtotal >= 499) return 0;

    if(subtotal >= 150) return 59;

    return 69;

  }

  // NATIONAL

  if(subtotal >= 499) return 0;

  if(subtotal >= 150) return 89;

  return 99;

}

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

    subtotal += item.price * item.quantity;

    const cartItem =
    document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>

R${item.price} each

</p>

<div class="quantity-controls">

<button
class="decrease-qty"
data-index="${index}"
>

−

</button>

<span>

${item.quantity}

</span>

<button
class="increase-qty"
data-index="${index}"
>

+

</button>

</div>

<p>

Subtotal:
R${item.price * item.quantity}

</p>
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
calculateDeliveryFee(subtotal);

const total =
subtotal + (deliveryFee === null ? 0 : deliveryFee);

  cartTotal.innerText = `R${total}`;

  let totalItems = 0;

cart.forEach(item => {

    totalItems += item.quantity;

});

cartCount.innerText = totalItems;

updateDeliveryDisplay();
  
  localStorage.setItem(
    "pawlattoCart",
    JSON.stringify(cart)
  );

  // Increase Quantity

document
.querySelectorAll(".increase-qty")
.forEach((button) => {

button.addEventListener("click", () => {

const item =
cart[button.dataset.index];

item.quantity++;

updateCart();

});

});

// Decrease Quantity

document
.querySelectorAll(".decrease-qty")
.forEach((button) => {

button.addEventListener("click", () => {

const item =
cart[button.dataset.index];

item.quantity--;

if(item.quantity <= 0){

cart.splice(button.dataset.index,1);

}

updateCart();

});

  });

document
.querySelectorAll(".remove-item")
.forEach((button) => {

    button.addEventListener("click", () => {

        cart.splice(button.dataset.index, 1);

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
document.getElementById("streetAddress").value;

 if(
  !customerName ||
  !customerPhone ||
  !customerEmail ||
  !customerAddress ||
  !customerProvince.value ||
  !customerCity.value
)
{
  alert(
    "Please complete all fields."
  );

  return;
}

 let subtotal = 0;

cart.forEach((item) => {

  subtotal += item.price * item.quantity;

});

const deliveryFee =
calculateDeliveryFee(subtotal);

const total =
subtotal + (deliveryFee === null ? 0 : deliveryFee);

if (subtotal < 150) {

  alert(
    "Minimum order value is R150 (excluding delivery). Please add more items before placing your order."
  );

  return;

}
  
const customerProvinceValue =
customerProvince.value;

const customerCityValue =
customerCity.value;

  const orderData = {

customerName,
customerPhone,
customerEmail,
customerAddress,

province: customerProvinceValue,
city: customerCityValue,

items: cart,

subtotal,
deliveryFee,
total

};
  
  try{

    await fetch(
  "https://script.google.com/macros/s/AKfycbzWtEsPubhMfh0OR8n-v4LH1fkoWSYI7piWa38fU5iTdzKaDxiguGKVvLZPBmdkglGP/exec",
      {
        method: "POST",
        body: JSON.stringify(orderData)
      }
    );

  }

  catch(error){

    console.log(error);

  }

  // Redirect to Apps Script instead of PayFast

window.location.href =
`${API_URL}?action=pay&orderId=${orderId}`;

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
"https://script.google.com/macros/s/AKfycbz5OsVXPwzsV1lBqH8BHorpdWZ20TeWbtlV9bbZaNr_UIHODF2YKFBz132oGMshFdzg/exec";

let allProducts = [];

const searchInput =
document.getElementById("searchInput");

const animalFilter =
document.getElementById("animalFilter");

const categoryFilter =
document.getElementById("categoryFilter");

const sortProducts =
document.getElementById("sortProducts");

async function loadProducts(){

  try{

    const response = await fetch(API_URL);
    const products = await response.json();

    allProducts = products;

    // Populate Animal Filter

const animals = [
...new Set(
products.map(p => p.animal_type)
)
];

animals.sort();

animals.forEach(animal => {

if(animal){

animalFilter.innerHTML += `
<option value="${animal}">
${animal}
</option>`;

}

});

// Populate Category Filter

const categories = [
...new Set(
products.map(p => p.category)
)
];

categories.sort();

categories.forEach(category => {

if(category){

categoryFilter.innerHTML += `
<option value="${category}">
${category}
</option>`;

}

});

  displayProducts(products);

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

      const existingItem = cart.find(
  item => item.name === name
);

if(existingItem){

  existingItem.quantity++;

}

else{

  cart.push({

    name,
    price,
    quantity: 1

  });

}

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

function displayProducts(products){

productsGrid.innerHTML = "";

products.forEach((product) => {

const card = document.createElement("div");

card.classList.add("product-card");

card.innerHTML = `

<div class="product-animal">

${product.animal_type}

</div>

${product.featured === "Yes"
? `<div class="featured-badge">⭐ Featured</div>`
: ""}

<img
src="${product.image1}"
alt="${product.image_alt_text || product.name}"
class="product-image"
loading="lazy"
>

<h3>${product.name}</h3>

<p class="product-category">

${product.category}

</p>

${
Number(product.sale_price) > 0

?

`<p class="product-price">

<span class="old-price">

R${product.price}

</span>

<span class="sale-price">

R${product.sale_price}

</span>

</p>`

:

`<p class="product-price">

R${product.price}

</p>`

}

<p class="stock-status">

${
Number(product.stock_quantity) > 0

?

`✅ ${product.stock_quantity} In Stock`

:

`❌ Out of Stock`

}

</p>

<button
class="add-cart-btn"
data-name="${product.name}"
data-price="${Number(product.sale_price) > 0 ? product.sale_price : product.price}"
${product.stock_quantity <= 0 ? "disabled" : ""}
>
${product.stock_quantity <= 0 ? "Out of Stock" : "🛒 Add To Cart"}
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

loadProducts();

function filterProducts(){

let filtered = [...allProducts];

// SEARCH

const search =
searchInput.value.toLowerCase();

filtered = filtered.filter(product =>

product.name
.toLowerCase()
.includes(search)

);

// ANIMAL

if(animalFilter.value !== "all"){

filtered = filtered.filter(product =>

product.animal_type ===
animalFilter.value

);

}

// CATEGORY

if(categoryFilter.value !== "all"){

filtered = filtered.filter(product =>

product.category ===
categoryFilter.value

);

}

// SORT

switch(sortProducts.value){

case "priceLow":

filtered.sort(
(a,b)=>
Number(a.price)-Number(b.price)
);

break;

case "priceHigh":

filtered.sort(
(a,b)=>
Number(b.price)-Number(a.price)
);

break;

case "az":

filtered.sort(
(a,b)=>
a.name.localeCompare(b.name)
);

break;

case "za":

filtered.sort(
(a,b)=>
b.name.localeCompare(a.name)
);

break;

}

displayProducts(filtered);

}

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

productModal.addEventListener("click", (e) => {

  if(e.target === productModal){

    productModal.classList.remove("active");

  }

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

    ${
Number(product.sale_price) > 0

?

`<h3 class="modal-product-price">

<span class="old-price">
R${product.price}
</span>

<span class="sale-price">
R${product.sale_price}
</span>

</h3>`

:

`<h3 class="modal-product-price">
R${product.price}
</h3>`
}

   <div class="product-benefits">

  <p>✅ In Stock & Ready To Ship</p>

  <p>🚚 Fast Delivery Nationwide</p>

  <p>🔒 Secure Checkout</p>

</div>

    <div class="product-description">

      <h3>
        About This Product
      </h3>

      <p>
        ${product.description}
      </p>

      <div class="product-specs">

<p><strong>Animal:</strong> ${product.animal_type}</p>

<p><strong>Category:</strong> ${product.category}</p>

${product.subcategory ? `
<p><strong>Subcategory:</strong> ${product.subcategory}</p>
` : ""}

<p><strong>SKU:</strong> ${product.sku}</p>

<p><strong>Weight:</strong> ${product.weight}</p>

<p><strong>Dimensions:</strong> ${product.dimensions}</p>

<p><strong>Material:</strong> ${product.material}</p>

<p><strong>Delivery:</strong> ${product.delivery}</p>

<p><strong>Warranty:</strong> ${product.warranty}</p>

<p><strong>Guarantee:</strong> ${product.guarantee}</p>

<p>

<strong>Availability:</strong>

${
product.stock_quantity > 0

? `✅ ${product.stock_quantity} In Stock`

: `❌ Out of Stock`
}

</p>

</div>

<div class="modal-buttons">

<button
class="modal-add-cart-btn"
onclick="addModalToCart(${index})"
${product.stock_quantity <= 0 ? "disabled" : ""}
>

🛒 Add To Cart

</button>

<button
class="modal-buy-now-btn"
onclick="buyNow(${index})"
${product.stock_quantity <= 0 ? "disabled" : ""}
>

⚡ Buy Now

</button>

</div>

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

    const price = parseFloat(
        Number(product.sale_price) > 0
        ? product.sale_price
        : product.price
    );

    const existingItem = cart.find(
        item => item.name === product.name
    );

    if(existingItem){

        existingItem.quantity++;

    }else{

        cart.push({
            name: product.name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert("Added to cart.");

}

function buyNow(index){

    const product = allProducts[index];

    const price = parseFloat(
        Number(product.sale_price) > 0
        ? product.sale_price
        : product.price
    );

    const existingItem = cart.find(
        item => item.name === product.name
    );

    if(existingItem){

        existingItem.quantity++;

    }else{

        cart.push({
            name: product.name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    productModal.classList.remove("active");

    cartSidebar.classList.add("active");

}

function updateDeliveryDisplay(){

  let subtotal = 0;

  cart.forEach((item) => {

    subtotal += item.price * item.quantity;

  });

  const fee =
  calculateDeliveryFee(subtotal);

  if(fee === null){

  deliveryFeeDisplay.innerText =
  "Select Province & City";

  deliveryFeeElement.innerText =
  "--";

}

else if(fee === 0){

  deliveryFeeDisplay.innerText =
  "Delivery Fee: FREE";

  deliveryFeeElement.innerText =
  "FREE";

}

else{

  deliveryFeeDisplay.innerText =
  `Delivery Fee: R${fee}`;

  deliveryFeeElement.innerText =
  `R${fee}`;

}

}

customerProvince.addEventListener("change", () => {

  updateCart();

});

customerCity.addEventListener("change", () => {

  updateCart();
  
});

searchInput.addEventListener("input", filterProducts);

animalFilter.addEventListener("change", filterProducts);

categoryFilter.addEventListener("change", filterProducts);

sortProducts.addEventListener("change", filterProducts);
