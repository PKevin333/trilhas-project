import { setError } from "./_handleError.js";
import showMessageModal from "./_showModal.js";
import validateForm from "./_validateForm.js";

export default function initLocalStorage() {
    const registerPage = document.querySelector(".form-page");

    const trilhaCheckboxes = document.querySelectorAll('.form-page .trilha-checkbox input');
    const saveButton = document.querySelector('.form-page .tertiary');
    const cancelButton = document.querySelector('.form-page .secondary');
    const registerButton = document.querySelector('.form-page .primary');
    window.formData = {};

    if(registerPage && trilhaCheckboxes) {
        const formItems = Array.from(registerPage.querySelector('form')).reduce((acc, formField) => formField.id ? { ...acc, [formField.id]: formField } : acc, {});

        function validJSON(str) {
            try {
                JSON.parse(str);
            } catch {
                return false;
            }
            return true;
        };

        function loadLocalStorage() {
            const localFormData = localStorage.getItem('formData');
            if(localFormData && validJSON(localFormData)) {
                const formData = JSON.parse(localFormData);
                Object.entries(formData).forEach(([key, value]) => {
                    const input = document.getElementById(key);
                    if(typeof value == 'boolean') {
                        input.checked = value;
                        window.formData[key] = value;
                    } else {
                        input.value = value;
                        window.formData[key] = value;
                    };
                });
            };
        };

        function saveFormData(event) {
            event.preventDefault();
            Object.values(formItems).forEach(element => {
                if(element.type === 'checkbox') {
                    window.formData[element.id] = element.checked;
                } else {
                    if(element.type === 'file') {
                        return;
                    }
                    window.formData[element.id] = element.value;
                };
            });
            localStorage.setItem('formData', JSON.stringify(window.formData));
            showMessageModal("Preenchimento salvo com sucesso!");
        };

        function clearLocalStorage(event) {
            event.preventDefault();
            localStorage.removeItem('formData');
            localStorage.removeItem('users');
            window.formData = {};
            Object.values(formItems).forEach(element => {
                if(element.type === 'checkbox') {
                    if(element.checked === true) {
                        element.parentElement.setAttribute("style", "border: 1px solid #D6D3D1;");
                        element.parentElement.children[0].setAttribute("style", "display: none;");
                    }
                    element.checked = false;
                } else {
                    if(element.id === 'idCep') {
                        formItems['idRua'].disabled = false;
                        formItems['idCidade'].disabled = false;
                        formItems['idEstado'].disabled = false;
                    }
                    element.value = '';
                };
            });
        };

        function userExists(username, password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const isUser = users.find(user =>
                user['idUser'] === username && user['idPassword'] === password
            );

            return isUser;
        };

        function registerUser(event) {
            event.preventDefault();
            const isValidForm = validateForm();
            let newUser = {};
            
            if(!isValidForm) {
                showMessageModal("Não é um formulário válido, corrija os erros");
                return;
            };

            Object.values(formItems).forEach(element => {
                if(element.type === 'checkbox') {
                    newUser[element.id] = element.checked;
                } else {
                    if(element.type === 'file') {
                        return;
                    }
                    newUser[element.id] = element.value;
                };
            });

            if(userExists(newUser['idUser'], newUser['idPassword'])) {
                showMessageModal("Já existe um usuário com esse nome.");
                setError(formItems['idUser'], "* Esse nome já existe, tente outro");
                return;
            };

            let users = localStorage.getItem('users');
            users = users ? JSON.parse(users) : [];
            users.push({ ...newUser });
            localStorage.setItem('users', JSON.stringify(users));
            showMessageModal("Usuário registrado com sucesso");
        };

        saveButton.addEventListener('click', saveFormData);
        cancelButton.addEventListener('click', clearLocalStorage);
        registerButton.addEventListener('click', registerUser);
        loadLocalStorage();
    };
};