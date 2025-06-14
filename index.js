// Typing effect for hero section
const typingTexts = ["Solutions", "Protection", "Security", "Pentesting"];
let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");
const terminalCursor = document.getElementById("terminal-cursor");

function type() {
  const currentText = typingTexts[currentTextIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 150);
  }
}

// Start typing effect
setTimeout(type, 1000);

// Terminal cursor blink effect
setInterval(() => {
  terminalCursor.style.opacity =
    terminalCursor.style.opacity === "0" ? "1" : "0";
}, 700);

// Matrix background effect
const matrix = document.getElementById("matrix");
const chars = "01";
const fontSize = 14;
const columns = Math.floor(window.innerWidth / fontSize);
const rows = Math.floor(window.innerHeight / fontSize);

for (let i = 0; i < columns; i++) {
  const column = document.createElement("div");
  column.className = "matrix-column absolute top-0";
  column.style.left = `${i * fontSize}px`;
  column.style.width = `${fontSize}px`;
  column.dataset.column = i;

  let delay = Math.random() * 5000;
  setTimeout(() => {
    animateColumn(column);
  }, delay);

  matrix.appendChild(column);
}

function animateColumn(column) {
  let content = "";
  const length = Math.floor(Math.random() * rows) + 5;
  const startPos = -length * fontSize;

  column.style.top = `${startPos}px`;

  // Create the characters
  for (let i = 0; i < length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const span = document.createElement("span");
    span.textContent = char;
    span.style.color = i === length - 1 ? "#fff" : "#0af20a";
    span.style.opacity = (i + 1) / length;
    column.appendChild(span);
  }

  // Animate the column
  let pos = startPos;
  const fallSpeed = 50 + Math.random() * 50;
  const interval = setInterval(() => {
    pos += 2;
    column.style.top = `${pos}px`;

    if (pos > window.innerHeight) {
      clearInterval(interval);
      column.innerHTML = "";
      setTimeout(() => {
        animateColumn(column);
      }, Math.random() * 5000);
    }
  }, fallSpeed);
}
// Threat monitoring dashboard functionality
const threatData = [
  {
    type: "DDoS",
    count: "1,243",
    level: "high",
    icon: "fa-network-wired",
  },
  {
    type: "Phishing",
    count: "3,891",
    level: "critical",
    icon: "fa-fish",
  },
  { type: "Ransomware", count: "587", level: "high", icon: "fa-lock" },
  { type: "SQLi", count: "2,456", level: "medium", icon: "fa-database" },
  { type: "XSS", count: "4,129", level: "medium", icon: "fa-code" },
  { type: "Zero-Day", count: "38", level: "critical", icon: "fa-bug" },
];

function updateThreatDashboard() {
  const dashboard = document.getElementById("threat-dashboard");
  dashboard.innerHTML = "";

  // Shuffle and get random counts to simulate live data
  const shuffled = [...threatData].sort(() => 0.5 - Math.random());

  shuffled.forEach((threat) => {
    const randomFactor = Math.floor(Math.random() * 500) - 250;
    const newCount = Math.max(
      100,
      parseInt(threat.count.replace(/,/g, "")) + randomFactor
    );
    const formattedCount = newCount.toLocaleString();

    const threatLevelColor =
      threat.level === "critical"
        ? "text-red-500"
        : threat.level === "high"
        ? "text-orange-500"
        : "text-yellow-500";

    const card = document.createElement("div");
    card.className = `bg-gray-800 p-4 rounded-lg border-l-4 ${threatLevelColor.replace(
      "text",
      "border"
    )}`;
    card.innerHTML = `
          <div class="flex items-center mb-2">
              <i class="fas ${
                threat.icon
              } ${threatLevelColor} text-xl mr-3"></i>
              <h3 class="font-bold">${threat.type}</h3>
          </div>
          <div class="flex justify-between items-center">
              <span class="text-gray-400 text-sm">Attacks detected:</span>
              <span class="${threatLevelColor} font-mono">${formattedCount}</span>
          </div>
          <div class="mt-2">
              <div class="w-full bg-gray-700 rounded-full h-2">
                  <div class="${threatLevelColor.replace(
                    "text",
                    "bg"
                  )} h-2 rounded-full" 
                       style="width: ${Math.min(
                         100,
                         (newCount / 5000) * 100
                       )}%"></div>
              </div>
          </div>
      `;
    dashboard.appendChild(card);
  });
}

document
  .getElementById("refresh-threats")
  .addEventListener("click", updateThreatDashboard);
updateThreatDashboard(); // Initial load

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Message sent! We will contact you soon.");
  this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
