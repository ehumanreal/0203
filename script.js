// Wyszukiwanie tematów
const searchInput = document.getElementById('searchInput');
const topics = document.querySelectorAll('#topicList li');

searchInput.addEventListener('input', function () {
  const filter = this.value.toLowerCase();
  topics.forEach(function (topic) {
    const text = topic.textContent.toLowerCase();
    topic.style.display = text.includes(filter) ? 'block' : 'none';
  });
});

// Webhook Discord – propozycje tematów
const proposalForm = document.getElementById("proposalForm");
const confirmationMessage = document.getElementById("confirmationMessage");

proposalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newTopic = document.getElementById("newTopic").value.trim();
  const webhookURL = "https://discord.com/api/webhooks/1378716046625607721/T30erwD119-jOxGw8DgYXayw-Ou-pRKG0ezD153VytysH1LU3uqaqxjt8UejR-mW6Gb4";

  if (newTopic.length > 0) {
    const payload = {
      content: `📩 Nowa propozycja tematu: **${newTopic}**`
    };

    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        confirmationMessage.style.display = "block";
        proposalForm.reset();
      } else {
        alert("Błąd podczas wysyłania do Discorda.");
      }
    })
    .catch(error => {
      console.error("Błąd:", error);
      alert("Nie udało się połączyć z Discordem.");
    });
  }
});

const toggleButton = document.getElementById("toggle-theme");

// Sprawdzenie zapamiętanego motywu
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Obsługa kliknięcia
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
