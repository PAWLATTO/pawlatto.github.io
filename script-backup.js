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

  // REMOVE ACTIVE

  slides.forEach((slide) => {

    slide.classList.remove("active");

  });

  dots.forEach((dot) => {

    dot.classList.remove("active-dot");

  });

  // ADD ACTIVE

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
// NAVBAR SCROLL EFFECT
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
// EMAIL NOTIFY FORM
// ===================================

const notifyForm =
document.querySelector(".notify-form");

notifyForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const emailInput =
  notifyForm.querySelector("input");

  const emailValue =
  emailInput.value.trim();

  // VALIDATION

  if(emailValue === ""){

    alert(
      "Please enter your email address."
    );

    return;

  }

  // SUCCESS

  alert(
    "Thank you for joining the PawLatto family!"
  );

  // CLEAR INPUT

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

// ACCEPT TERMS

acceptTerms.addEventListener("click", () => {

  // SAVE ACCEPTANCE

  localStorage.setItem(
    "pawlattoTermsAccepted",
    "true"
  );

  // HIDE POPUP

  termsPopup.style.display = "none";

});

// CHECK IF ACCEPTED BEFORE

if(
  localStorage.getItem(
    "pawlattoTermsAccepted"
  ) === "true"
){

  termsPopup.style.display = "none";

}

// ===================================
// LEARN MORE BUTTON
// ===================================

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
// HERO CONTENT FADE
// ===================================

window.addEventListener("load", () => {

  const heroContent =
  document.querySelectorAll(".hero-content");

  heroContent.forEach((content) => {

    content.style.opacity = "0";

    content.style.transform =
    "translateY(30px)";

    setTimeout(() => {

      content.style.transition =
      "1s ease";

      content.style.opacity = "1";

      content.style.transform =
      "translateY(0px)";

    }, 300);

  });

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
// HOVER EFFECTS
// ===================================

const cards =
document.querySelectorAll(
  ".product-card, .feature-box, .contact-card"
);

cards.forEach((card) => {

  card.addEventListener("mouseenter", () => {

    card.style.transform =
    "translateY(-10px) scale(1.03)";

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform =
    "translateY(0px) scale(1)";

  });

});

// ===================================
// FOOTER LINKS EFFECT
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
