import fetchData from "./_fetchData.js";
import { setError, removeError, isErrorActive } from "./_handleError.js";

export default function initFormValidation() {
    const registerPage = document.querySelector(".form-page");


    if(registerPage) {
        const formItems = Array.from(registerPage.querySelector('form')).reduce((acc, formField) => formField.id ? { ...acc, [formField.id]: formField } : acc, {});

        function handleBlur({ target })  {
            switch (target.id) {
                case 'idUser':
                    handleUsername();
                    break;
                case 'idPassword':
                    handlePassword();
                    break;
                case 'idName':
                    handleName();
                    break;
                case 'idNasc':
                    handleDate();
                    break;
                case 'idCpf':
                    handleCPF();
                    break;
                case 'idEmail':
                    handleEmail();
                    break;
                case 'idTelefone':
                    handleTelefone();
                    break;
                case 'idCep':
                    handleCep();
                    break;
                case 'idRua':
                    handleRua();
                    break;
                case 'idNum':
                    handleHouseNum();
                    break;
                case 'idCidade':
                    handleCidade();
                    break;
                default:
                    break;
            };
        };

        function handleUsername() {
            const usernameField = formItems['idUser'];

            if(usernameField) {
                if(
                    usernameField.value.trim() === '' ||
                    usernameField.value.trim().length <= 3
                ) {
                    setError(usernameField, "* Digite um nome de usuário, precisa ter mais que 3 digitos");
                } else {
                    if(isErrorActive(usernameField)) {
                        removeError(usernameField);
                    };
                };
            };
        };

        function handlePassword() {
            const passwordField = formItems['idPassword'];

            if(passwordField) {
                if(
                    passwordField.value.trim() === '' ||
                    passwordField.value.trim().length < 8 ||
                    !/[0-9]/.test(passwordField.value.trim())
                ) {
                    setError(passwordField, "* Digite uma senha válida, deve ter 8 ou mais caracteres e pelo menos 1 número");
                } else {
                    if(isErrorActive(passwordField)) {
                        console.log("Não entrou no if")
                        removeError(passwordField);
                    };
                };
            };
        };

        function handleName() {
            const nameField = formItems['idName'];

            if(nameField) {
                if(
                    nameField.value.trim() === '' ||
                    nameField.value.trim().length < 2 ||
                    !nameField.value.trim().includes(' ') ||
                    nameField.value.split(' ')[0].length < 2
                ) {
                    setError(nameField, "* Digite seu nome completo");
                } else {
                    if(isErrorActive(nameField)) {
                        removeError(nameField);
                    };
                };
            };
        };

        function handleDate() {
            const dateField = formItems['idNasc'];

            if(dateField) {
                if(
                    dateField.value === '' ||
                    dateField.value.length < 10
                ) {
                    if(isErrorActive(dateField)) {
                        removeError(dateField);
                    };
                    setError(dateField, "* Insira uma data válida");
                } else if (
                    Number(dateField.value.slice(0,4)) < 1940
                ) {
                    if(isErrorActive(dateField)) {
                        removeError(dateField);
                    };
                    setError(dateField, "* Insira a sua data de nascimento");
                } else if (
                    Number(dateField.value.slice(0,4)) > 2019
                ) {
                    if(isErrorActive(dateField)) {
                        removeError(dateField);
                    };
                    setError(dateField, "* Você deve ter mais de 16 anos para se registrar");
                } else {
                    if(isErrorActive(dateField)) {
                        removeError(dateField);
                    };
                };
            };
        };

        function handleCPF() {
            const CPF = formItems['idCpf'];

            if(CPF) {
                if(
                    CPF.value === '' ||
                    CPF.value.length < 14
                ) {
                    setError(CPF, "* Insira um CPF válido");
                } else {
                    if(isErrorActive(CPF)) {
                        removeError(CPF);
                    };
                };
            };
        };

        function handleEmail() {
            const emailField = formItems['idEmail'];
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if(emailField) {
                if(
                    emailField.value.trim() === '' ||
                    !emailRegex.test(emailField.value)
                ) {
                    setError(emailField, "* Insira um e-mail válido")
                } else {
                    if(isErrorActive(emailField)) {
                        removeError(emailField);
                    };
                };
            };
        };

        function handleTelefone() {
            const telField = formItems["idTelefone"];

            if(telField) {
                if(
                    telField.value === '' ||
                    telField.value.length < 14
                ) {
                    setError(telField,  "* Insira um telefone válido")
                } else {
                    if(isErrorActive(telField)) {
                        removeError(telField);
                    };
                };
            };
        };

        function handleFile({ target }) {
            const fileField = target;
            const container = fileField.parentElement.querySelector(".upload-icon");
            const icon = fileField.parentElement.querySelector(".upload-icon img");
            const text = fileField.parentElement.querySelector(".upload-icon p");
            const fileNameRegex = /[^\\/]+$/;
            
            if(fileField && container && icon && text) {
                if(
                    fileField.value === '' ||
                    (!fileField.value.endsWith(".pdf") &&
                    !fileField.value.endsWith(".jpg"))
                ) {
                    setError(fileField, "O arquivo precisa ter extensão *.jpg ou *.pdf, tente de novo");
                } else {
                    if(isErrorActive(fileField)) {
                        removeError(fileField);
                    };

                    if(fileField.value.endsWith(".pdf")) {
                        icon.setAttribute("src", "../assets/pdf.png");
                    } else {
                        icon.setAttribute("src", "../assets/jpg.png");
                    };

                    text.innerText = fileField.value.match(fileNameRegex)[0];
                }
            };
        };

        function handleHouseNum() {
            const houseNum = formItems["idNum"];

            if(houseNum) {
                if(
                    houseNum.value === ''
                ) {
                    setError(houseNum, "* Insira um número")
                } else {
                    if(isErrorActive(houseNum)) {
                        removeError(houseNum);
                    };
                };
            };
        };

        async function handleCep() {
            const CEP = formItems['idCep'];
            
            if(CEP.value.length === 9) {
                const address = await fetchData(`https://viacep.com.br/ws/${CEP.value}/json/`);
    
                formItems['idRua'].value = address.logradouro;
                formItems['idRua'].disabled = true;
                formItems['idCidade'].value = address.localidade;
                formItems['idCidade'].disabled = true;
                formItems['idEstado'].value = address.uf;
                formItems['idEstado'].disabled = true;
                handleRua();
                handleCidade(); 

                if(isErrorActive(CEP)) {
                    removeError(CEP);
                };
            } else {
                if(CEP.value === '' || CEP.value.length < 9) {
                    setError(CEP, "* Digite um CEP válido");
                };

                if(formItems['idRua'].disabled === true) {
                    formItems['idRua'].value = '';
                    formItems['idRua'].disabled = false;
                    formItems['idCidade'].value = '';
                    formItems['idCidade'].disabled = false;
                    formItems['idEstado'].value = '';
                    formItems['idEstado'].disabled = false;
                };
            };
        };

        function handleRua() {
            const streetField = formItems['idRua'];

            if(streetField) {
                if(
                    streetField.value.trim() === '' ||
                    streetField.value.trim().length < 2
                ) {
                    setError(streetField, "* Digite o nome da rua/logradouro");
                } else {
                    if(isErrorActive(streetField)) {
                        removeError(streetField);
                    };
                };
            };
        };

        function handleCidade() {
            const cityField = formItems['idCidade'];

            if(cityField) {
                if(
                    cityField.value.trim() === '' ||
                    cityField.value.trim().length < 2
                ) {
                    setError(cityField, "* Digite o nome da cidade");
                } else {
                    if(isErrorActive(cityField)) {
                        removeError(cityField);
                    };
                };
            };
        };

        function handleCheckboxes() {
            const checkboxes = document.querySelectorAll(".trilhas .trilha-checkbox input");
            const isMarked = Array.from(checkboxes).some(checkbox => checkbox.checked);

            if(checkboxes) {
                if(!isMarked) {
                    setError(checkboxes[0], "* É obrigatório marcar 1 opção");
                } else {
                    if(isErrorActive(checkboxes[0])) {
                        removeError(checkboxes[0]);
                    };
                };
            };
        };

        function handleTermo() {
            const termoField = formItems['idTermos'];

            if(termoField) {
                if(!termoField.checked) {
                    setError(termoField);
                } else {
                    if(isErrorActive(termoField)) {
                        removeError(termoField);
                    };
                };
            };
        };

        Object.values(formItems).forEach(element => {
            if(element.id === 'idDoc' || element.id === 'idResi') {
                element.addEventListener('change', handleFile);
            } else if(element.id === 'idTermos') {
                element.addEventListener('change', handleTermo);
            } else if(element.type === 'checkbox') {
                element.addEventListener('change', handleCheckboxes);
            };
            element.addEventListener('blur', handleBlur);
        });

        if(formItems['idCep'].value) {
            handleCep();
        };
    };
};