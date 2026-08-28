document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const question = inputField.value.trim();
    if (!question) return;

    appendMessage("user", question);
    inputField.value = "";

    try {
        const response = await fetch("https://it-support-and-devops-production.up.railway.app/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question })
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        appendMessage("bot", data.answer);
    } catch (error) {
        console.error("Error:", error);
        appendMessage("bot", "Unable to connect to the chatbot backend.");
    }
}

function appendMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}