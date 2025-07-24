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
    messagesDiv.innerHTML = "<p>הטופס נשלח בהצלחה! בהצלחה בלימוד הלחש החדש </p>";
    document.getElementById("spellRequestForm").reset();
  }
});
