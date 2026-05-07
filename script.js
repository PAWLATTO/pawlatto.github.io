const form = document.getElementById("contactForm");

// 👉 PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
const scriptURL = "PASTE_YOUR_WEB_APP_URL_HERE";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = form.querySelector("button");
  submitButton.disabled = true;
  submitButton.innerText = "Sending...";

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      }
    });

    alert("Message sent successfully!");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");

  } finally {
    submitButton.disabled = false;
    submitButton.innerText = "Send Message";
  }
});
