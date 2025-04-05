import showMessageModal from "./_showModal.js";
import validateForm from "./_validateForm.js";

export default function initLocalStorage() {
    const formItems = Array.from(document.querySelector('.form-page form')).reduce((acc, formField) => formField.id ? { ...acc, [formField.id]: formField } : acc, {});
    const trilhaCheckboxes = document.querySelectorAll('.form-page .trilha-checkbox input');
    const saveButton = document.querySelector('.form-page .tertiary');
    const cancelButton = document.querySelector('.form-page .secondary');
    window.formData = {};
    const registerButton = document.querySelector('.form-page .primary');

    if(formItems && trilhaCheckboxes) {
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
                    window.formData[element.id] = element.value;
                };
            });
            localStorage.setItem('formData', JSON.stringify(window.formData));
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

        function registerUser(event) {
            event.preventDefault();
            const isValidForm = validateForm();
            
            if(!isValidForm) {
                showMessageModal("Não é um formulário válido, corrija os erros");
                return;
            };

            saveFormData();
            let users = localStorage.getItem('users');
            users = users ? JSON.parse(users) : [];
            users.push({ ...window.formData });
            localStorage.setItem('users', JSON.stringify(users));
            console.log("Usuário registrado com sucesso");
        }

        saveButton.addEventListener('click', saveFormData);
        cancelButton.addEventListener('click', clearLocalStorage);
        registerButton.addEventListener('click', registerUser);
        loadLocalStorage();
    };
};