const dbName = "QuilloryDB";
const dbVersion = 1;
const objectStoreName = "users";

// Initialize IndexedDB
const initializeDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("IndexedDB opened successfully");
      resolve();
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(objectStoreName)) {
        const objectStore = db.createObjectStore(objectStoreName, { keyPath: "email" });
        objectStore.createIndex("password", "password", { unique: false });
        objectStore.createIndex("name", "name", { unique: false });
        console.log("Object store created");
      }
    };
  });
};

// Register user
const registerUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([objectStoreName], "readwrite");
    const objectStore = transaction.objectStore(objectStoreName);
    const request = objectStore.add({ name: name, email: email, password: password });

    request.onerror = (event) => {
      console.error("Error adding user:", event.target.error);
      reject("Registration failed");
    };

    request.onsuccess = (event) => {
      console.log("User registered successfully");
      resolve();
    };
  });
};

// Custom alert function
function showAlert(message) {
  const alertBox = document.createElement("div");
  alertBox.className = "custom-alert";
  alertBox.textContent = message;

  // Style the alert box
  alertBox.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1000;
    font-family: 'Inter', sans-serif;
    font-size: 1em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `;

  document.body.appendChild(alertBox);

  // Remove the alert after 3 seconds
  setTimeout(() => {
    document.body.removeChild(alertBox);
  }, 3000);
}

// Registration form submission
document.querySelector(".login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm-password").value;

  if (password !== confirmPassword) {
    showAlert("Passwords do not match");
    return;
  }

  try {
    await initializeDB();
    await registerUser(name, email, password);
    showAlert("Registration successful! Redirecting to login page...");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 3000);
  } catch (error) {
    showAlert(error);
  }
});