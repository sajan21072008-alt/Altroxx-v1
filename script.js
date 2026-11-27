
const toast = document.getElementById("toast");

function notify(message) {
  toast.textContent = message;
  toast.style.display = "block";

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

// PAGE NAVIGATION

function showPage(page, button) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  document.getElementById(page).classList.add("active");

  document.querySelectorAll(".nav-item").forEach(b => {
    b.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  } else {
    document.querySelectorAll(".nav-item").forEach(b => {
      if (b.dataset.page === page) b.classList.add("active");
    });
  }

  const titles = {
    assistant: "Assistant",
    apps: "App launcher",
    automation: "Automations",
    memory: "Memory"
  };

  document.getElementById("pageTitle").textContent = titles[page];

  document.getElementById("sidebar").classList.remove("open");
}

// MOBILE MENU

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("open");
}

// CHAT

function sendMessage(event) {
  event.preventDefault();

  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage("YOU", text, "user");

  input.value = "";

  setTimeout(() => {
    addMessage(
      "ALTROXX",
      "I'm ready to help! My Gemini AI connection is coming in the next development phase.",
      "ai"
    );
  }, 500);
}

function addMessage(name, text, type) {
  const messages = document.getElementById("messages");

  const message = document.createElement("div");
  message.className = `message ${type}`;

  const heading = document.createElement("b");
  heading.textContent = name;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  message.appendChild(heading);
  message.appendChild(paragraph);

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function clearChat() {
  document.getElementById("messages").innerHTML = "";
  addMessage(
    "ALTROXX",
    "New conversation started. How can I help?",
    "ai"
  );
}

// VOICE UI DEMO

let listening = false;

function toggleListening() {
  listening = !listening;

  const button = document.getElementById("micButton");
  const text = document.getElementById("micText");
  const status = document.getElementById("orbStatus");

  if (listening) {
    button.classList.add("listening");
    text.textContent = "Stop listening";
    status.textContent = "Voice mode activated...";
    notify("Voice interface demo started. Deepgram is not connected yet.");
  } else {
    button.classList.remove("listening");
    text.textContent = "Start talking";
    status.textContent = "I'm listening whenever you are.";
    notify("Voice mode stopped.");
  }
}

// APP LAUNCHER

function appDemo(name) {
  notify(name + " control will be connected to Android later.");
}

function filterApps() {
  const search = document.getElementById("appSearch").value.toLowerCase();

  document.querySelectorAll(".app-card").forEach(app => {
    const name = app.dataset.name.toLowerCase();
    app.style.display = name.includes(search) ? "grid" : "none";
  });
}

// AUTOMATION

function updateCount() {
  const switches = document.querySelectorAll(".workflow input");
  let count = 0;

  switches.forEach(item => {
    if (item.checked) count++;
  });

  document.getElementById("activeCount").textContent =
    String(count).padStart(2, "0");

  notify("Demo workflow status updated.");
}

// MEMORY

function addMemory() {
  const value = prompt("What should ALTROXX remember?");

  if (!value || !value.trim()) return;

  const item = document.createElement("div");
  item.className = "memory-item";
  item.textContent = "✓ " + value.trim();

  document.getElementById("memoryList").appendChild(item);

  notify("Memory added to this demo.");
    }
