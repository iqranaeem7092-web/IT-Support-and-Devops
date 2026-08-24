const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");


// Function to add a message to the chat
function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (sender === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }

    messageDiv.textContent = message;

    chatBox.appendChild(messageDiv);

    // Automatically scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Function to send question to backend
async function sendQuestion() {

    const question = userInput.value.trim();

    // Check if question is empty
    if (question === "") {
        return;
    }

    // Display user's question
    addMessage(question, "user");

    // Clear input
    userInput.value = "";

    // Show loading message
    const loadingMessage = document.createElement("div");

    loadingMessage.classList.add("message", "bot-message");

    loadingMessage.textContent = "Thinking...";

    chatBox.appendChild(loadingMessage);

    chatBox.scrollTop = chatBox.scrollHeight;


    try {

        // Send question to FastAPI backend
        const response = await fetch(
            "http://127.0.0.1:8000/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );


        // Check if backend returned an error
        if (!response.ok) {
            throw new Error("Backend error");
        }


        // Convert backend response to JSON
        const data = await response.json();


        // Remove "Thinking..."
        loadingMessage.remove();


        // Display AI answer
        addMessage(data.answer, "bot");


    } catch (error) {

        console.error(error);

        // Remove "Thinking..."
        loadingMessage.remove();

        // Display simple error message
        addMessage(
            "Unable to connect to the chatbot backend.",
            "bot"
        );
    }
}


// Send button
sendButton.addEventListener("click", sendQuestion);


// Allow Enter key to send question
userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendQuestion();
    }

});