$(function () {

    let todos = [];

    const $list = $("#ft_list");
    const $btn = $("#newButton");

    /*Cookies*/

    function saveCookie() {
        document.cookie =
            "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
    }

    function loadCookie() {
        const match = document.cookie.match(/todos=([^;]+)/);
        if (match)
            todos = JSON.parse(decodeURIComponent(match[1]));
    }

    /*Render*/

    function render() {
        $list.html("");

        todos.forEach(text => {
            const $div = $("<div>").text(text);

            $div.on("click", function () {
                if (confirm("Remove this task?")) {
                    todos = todos.filter(t => t !== text);
                    saveCookie();
                    render();
                }
            });

            $list.append($div);
        });
    }

    /*Adicionar*/

    $btn.on("click", function () {
        const text = prompt("New task:");

        if (!text || !text.trim()) return;

        todos.unshift(text);
        saveCookie();
        render();
    });

    /*Init*/

    loadCookie();
    render();

});
