const form = document.getElementById("chatForm");
const input = document.getElementById("question");
const messages = document.getElementById("messages");

function createAICard(data) {

    return `

<div class="ai-card">

    <div class="card-header">

        <div class="ai-title">

            <i class="fa-solid fa-robot"></i>

            AI Assistant

        </div>

        <button
            class="copy-btn"
            onclick="copyAnswer(this)">

            <i class="fa-regular fa-copy"></i>

        </button>

    </div>

    ${data.image
            ?
            `
<img
src="${data.image}"
class="wiki-image">
`
            :
            ""
        }

    <h2 class="wiki-title">

        ${data.title}

    </h2>

    <div class="markdown">

        ${marked.parse(data.answer)}

    </div>

    ${data.source
            ?
            `
<a
href="${data.source}"
target="_blank"
class="wiki-link">

📖 Read on Wikipedia

</a>
`
            :
            ""
        }

</div>

`;

}

function copyAnswer(button) {

    const text =button.parentElement.parentElement.querySelector(".markdown").innerText;

    navigator.clipboard.writeText(text);

    button.innerHTML = "✓";

    setTimeout(() => {

        button.innerHTML =
            '<i class="fa-regular fa-copy"></i>';

    }, 1500);

}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const question = input.value.trim();

    if (!question) return;

    // User Message
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = question;

    messages.appendChild(userMessage);

    // AI Thinking
    const thinking = document.createElement("div");
    thinking.className = "message ai";
    thinking.textContent = "Thinking...";

    messages.appendChild(thinking);

    messages.scrollTop = messages.scrollHeight;

    input.value = "";

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question
        })
    });

    const data = await response.json();

    thinking.outerHTML = createAICard(data);
    messages.scrollTop = messages.scrollHeight;
});