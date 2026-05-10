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

  // REMOVE ACTIVE CLASSES

  slides.forEach((slide) => {

    slide.classList.remove("active");

  });

  dots.forEach((dot) => {

    dot.classList.remove("active-dot");

  });

  // ADD ACTIVE CLASSES

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

  // VALIDATION

  if(emailValue === ""){

    alert(
      "Please enter your email address."
    );

    return;

  }

  // SUCCESS MESSAGE

  alert(
    "Thank you for joining the PawLatto family!"
  );

  // CLEAR INPUT

  emailInput.value = "";

});

// ===================================
// HERO FADE EFFECT
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
// FEATURE BOX ANIMATION
// ===================================

const featureBoxes =
document.querySelectorAll(".feature-box");

featureBoxes.forEach((box) => {

  box.style.opacity = "0";

  box.style.transform =
  "translateY(40px)";

  box.style.transition =
  "0.8s ease";

});

window.addEventListener("scroll", () => {

  featureBoxes.forEach((box) => {

    const boxTop =
    box.getBoundingClientRect().top;

    if(boxTop < window.innerHeight - 100){

      box.style.opacity = "1";

      box.style.transform =
      "translateY(0px)";

    }

  });

});

// ===================================
// TERMS SECTION ANIMATION
// ===================================

const termsBoxes =
document.querySelectorAll(".terms-box");

termsBoxes.forEach((box, index) => {

  box.style.opacity = "0";

  box.style.transform =
  "translateY(40px)";

  box.style.transition =
  `0.8s ease ${index * 0.15}s`;

});

window.addEventListener("scroll", () => {

  termsBoxes.forEach((box) => {

    const boxTop =
    box.getBoundingClientRect().top;

    if(boxTop < window.innerHeight - 100){

      box.style.opacity = "1";

      box.style.transform =
      "translateY(0px)";

    }

  });

});

// ===================================
// CONTACT CARD ANIMATION
// ===================================

const contactCards =
document.querySelectorAll(".contact-card");

contactCards.forEach((card, index) => {

  card.style.opacity = "0";

  card.style.transform =
  "translateY(40px)";

  card.style.transition =
  `0.8s ease ${index * 0.2}s`;

});

window.addEventListener("scroll", () => {

  contactCards.forEach((card) => {

    const cardTop =
    card.getBoundingClientRect().top;

    if(cardTop < window.innerHeight - 100){

      card.style.opacity = "1";

      card.style.transform =
      "translateY(0px)";

    }

  });

});

// ===================================
// COMING SOON HOVER EFFECT
// ===================================

const comingCards =
document.querySelectorAll(".coming-card");

comingCards.forEach((card) => {

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
// FOOTER LINK EFFECT
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
