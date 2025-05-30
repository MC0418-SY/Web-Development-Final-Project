// Select all tab buttons and tab content elements
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// Loop through each tab button and attach a click event listener
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove the "active" class from all buttons and tab contents
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(tab => tab.classList.remove("active"));

    // Add the "active" class to the clicked button
    button.classList.add("active");

    // Show the corresponding tab content using the data-tab attribute
    document.getElementById(button.getAttribute("data-tab")).classList.add("active");
  });
});

// Wait for the DOM to be fully loaded before running the following code
document.addEventListener("DOMContentLoaded", () => {
  const profileImg = document.querySelector(".profile-img");
  const fileInput = document.querySelector(".account-settings-fileinput");
  const nameInputs = document.querySelectorAll('input[placeholder="Name"]');
  const emailInputs = document.querySelectorAll('input[placeholder="Email"]');
  const bioInput = document.querySelector(".bio-input");
  const socialInputs = document.querySelectorAll(".social-links input");

  // Track last mouse position
  let lastMouseX = 0;
  let lastMouseY = 0;

  document.addEventListener("mousemove", (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  function showFloatingReminder(message, x, y) {
    const existing = document.querySelector('.floating-reminder');
    if (existing) existing.remove();

    const reminder = document.createElement('div');
    reminder.className = 'floating-reminder';
    reminder.textContent = message;
    Object.assign(reminder.style, {
      position: 'fixed',
      top: `${Math.min(window.innerHeight - 50, y + 10)}px`,
      left: `${Math.min(window.innerWidth - 250, x + 10)}px`,
      backgroundColor: '#f87171',
      color: '#fff',
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '0.875rem',
      pointerEvents: 'none',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    });

    document.body.appendChild(reminder);

    setTimeout(() => {
      reminder.remove();
    }, 3000);
  }

  function loadProfile() {
    const savedImg = localStorage.getItem("profileImg");
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");
    const savedBio = localStorage.getItem("bio");

    if (savedImg) profileImg.src = savedImg;
    nameInputs.forEach(input => input.value = savedName || "");
    emailInputs.forEach(input => input.value = savedEmail || "");
    if (savedBio) bioInput.value = savedBio;

    socialInputs.forEach((input, index) => {
      const url = localStorage.getItem(`social${index}`);
      if (url) input.value = url;
    });
  }

  function saveProfile() {
    localStorage.setItem("name", nameInputs[0].value);
    localStorage.setItem("email", emailInputs[0].value);
    localStorage.setItem("bio", bioInput.value);

    socialInputs.forEach((input, index) => {
      localStorage.setItem(`social${index}`, input.value);
    });
  }

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        profileImg.src = reader.result;
        localStorage.setItem("profileImg", reader.result);
      };
      reader.readAsDataURL(file);
    }
  });

  [...nameInputs, ...emailInputs, bioInput, ...socialInputs].forEach(input => {
    input.addEventListener("blur", () => {
      const { value, placeholder } = input;

      if (placeholder === "Email" && value && !isValidEmail(value)) {
        input.value = "";
        showFloatingReminder("Please enter a valid email address.", lastMouseX, lastMouseY);
      }

      if (
        ["Facebook URL", "Twitter URL", "Instagram URL", "LinkedIn URL"].includes(placeholder)
        && value && !isValidURL(value)
      ) {
        input.value = "";
        showFloatingReminder("Please enter a valid URL (e.g., https://example.com)", lastMouseX, lastMouseY);
      }

      saveProfile();
    });
  });

  loadProfile();
});
