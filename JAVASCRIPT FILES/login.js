const dbName = "QuilloryDB";
const dbVersion = 1;
const objectStoreName = "users";

let db;

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
        console.log("Object store created");
      }
    };
  });
};

// Authenticate user
const authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([objectStoreName], "readonly");
    const objectStore = transaction.objectStore(objectStoreName);
    const request = objectStore.get(email);

    request.onerror = (event) => {
      console.error("Error getting user:", event.target.error);
      reject("Authentication failed");
    };

    request.onsuccess = (event) => {
      const user = event.target.result;
      if (user && user.password === password) {
        console.log("Authentication successful");
        resolve(user);
      } else {
        console.log("Authentication failed");
        reject("Invalid email or password");
      }
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

// Login form submission
document.querySelector(".login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await initializeDB();
    const user = await authenticateUser(email, password);
    showAlert("Login successful!");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 3000);
  } catch (error) {
    showAlert(error);
  }
});

