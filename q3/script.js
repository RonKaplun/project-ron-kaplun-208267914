document.getElementById("spellRequestForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const spellType = document.getElementById("spellType").value;
  const knowledgeLevel = parseInt(document.getElementById("knowledgeLevel").value);
  const hasWand = document.querySelector("input[name='hasWand']:checked");
  const attempts = parseInt(document.getElementById("attempts").value);
  const guideSignature = document.getElementById("guideSignature").value.trim();
  const birthDate = document.getElementById("birthDate").value;
  
  const messagesDiv = document.getElementById("formMessages");
  messagesDiv.innerHTML = "";

  let errors = [];

  if (!fullName) {
    errors.push("יש להזין שם מלא.");
  }

  if (!email || !email.includes("@")) {
    errors.push("יש להזין כתובת אימייל תקינה.");
  }

  if (!spellType) {
    errors.push("יש לבחור סוג לחש.");
  }


  if (!hasWand) {
    errors.push("יש לבחור האם יש ברשותך שרביט.");
  }

  if (isNaN(attempts) || attempts < 0) {
    errors.push("מספר הניסיונות צריך להיות מספר חיובי.");
  }

  if (!guideSignature) {
    errors.push("נדרש למלא חתימת מדריך.");
  }

  const today = new Date().toISOString().split("T")[0];
  if (!birthDate || birthDate >= today) {
    errors.push("יש להזין יום לידה אסטרולוגי תקף מהעבר.");
  }

  if (errors.length > 0) {
    messagesDiv.style.color = "red";
    messagesDiv.innerHTML = errors.map(err => `<p>${err}</p>`).join("");
  } else {
  messagesDiv.style.color = "green";
  messagesDiv.innerHTML = "<p>הטופס נשלח בהצלחה! בהצלחה בלימוד הלחש החדש</p>";

  
  let spellTypeText = "";
  if (spellType === "attack") spellTypeText = "התקפי";
  else if (spellType === "defense") spellTypeText = "הגנתי";
  else if (spellType === "boost") spellTypeText = "חיזוק";

  const item = {
    fullName,
    email,
    spellType: spellTypeText,
    knowledgeLevel: isNaN(knowledgeLevel) ? '' : knowledgeLevel,
    hasWand: hasWand.value === "yes" ? "כן" : "לא",
    attempts: isNaN(attempts) ? 0 : attempts,
    guideSignature,
    birthDate
  };

  saveItem(item);  

  document.getElementById("spellRequestForm").reset();
}
});




function saveItem(item) {
  let items = JSON.parse(localStorage.getItem("spellRequests")) || [];
  items.push(item);
  localStorage.setItem("spellRequests", JSON.stringify(items));
}

function loadItems() {
  const table = document.getElementById("requestsTable");
  if (!table) return;
  const items = JSON.parse(localStorage.getItem("spellRequests")) || [];
  renderItems(items);
}

function renderItems(items) {
  const table = document.getElementById("requestsTable");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.fullName}</td>
      <td>${item.email}</td>
      <td>${item.spellType}</td>
      <td>${item.knowledgeLevel}</td>
      <td>${item.hasWand}</td>
      <td>${item.attempts}</td>
      <td>${item.guideSignature}</td>
      <td>${item.birthDate}</td>
      <td><button onclick="deleteItem(${index})">🗑️</button></td>
    `;
    tbody.appendChild(row);
  });
}

function deleteItem(index) {
  let items = JSON.parse(localStorage.getItem("spellRequests")) || [];
  items.splice(index, 1);
  localStorage.setItem("spellRequests", JSON.stringify(items));
  loadItems();
}

function filterByType(type) {
  let items = JSON.parse(localStorage.getItem("spellRequests")) || [];
  if (type !== "all") {
    items = items.filter(item => item.spellType === type);
  }
  renderItems(items);
}

document.addEventListener("DOMContentLoaded", loadItems);
