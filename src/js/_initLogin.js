import showMessageModal from "./_showModal.js";

export default function initLogin() {
    const username = document.querySelector("#idUsername");
    const password = document.querySelector("idPassword");
    const loginButton = document.querySelector("button.login");

    if(username, password, loginButton) {
        function loginUser(event) {
            event.preventDefault();
            const username = document.getElementById('idUsername').value.trim();
            const password = document.getElementById('idPassword').value.trim();
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const isUser = users.find(user =>
                user['idUser'] === username && user['idPassword'] === password
            );
        
            if (isUser) {
                showMessageModal(`Boas-vindas, ${username}!`);
            } else {
                showMessageModal("Usuário ou senha inválidos");
            };
        };

        loginButton.addEventListener("click", loginUser);
    }
}