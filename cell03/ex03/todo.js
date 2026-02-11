const list = document.getElementById("ft_list");
const btn = document.getElementById("newButton");

let todos = [];


function saveCookie() {
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

function loadCookie() {
    const match = document.cookie.match(/todos=([^;]+)/);
    if (!match) return;

    try {
        todos = JSON.parse(decodeURIComponent(match[1]));
    } catch {
        todos = [];
    }
}

function render() {
    list.innerHTML = "";

    todos.forEach(text => {
        const div = createTodoElement(text);
        list.appendChild(div);
    });
}

function createTodoElement(text) {
    const div = document.createElement("div");
    div.textContent = text;

    div.onclick = () => {
        if (confirm("Remove this task?")) {
            todos = todos.filter(t => t !== text);
            saveCookie();
            render();
        }
    };

    return div;
}

btn.onclick = () => {
    const text = prompt("New task:");

    if (!text || text.trim() === "") return;

    todos.unshift(text);
    saveCookie();
    render();
};


loadCookie();
render();
