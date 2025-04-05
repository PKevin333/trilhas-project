import { setError } from "./_handleError.js";

export default function validateForm() {
    const formItems = Array.from(document.querySelector('.form-page form')).reduce((acc, formField) => formField.id ? { ...acc, [formField.id]: formField } : acc, {});
    let isValid = true;

    function validate()  {
        // ITERA SOBRE O FORMULÁRIO, VERIFICANDO A VALIDADE DOS DADOS
        Object.values(formItems).forEach(element => {
            switch (element.id) {
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
                case 'idDoc':
                    handleFile(element);
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
                case 'idResi':
                    handleFile(element);
                    break;
                case 'idTermos':
                    handleTermo();
                    break;
                default:
                    break;
            };
        });

        handleCheckboxes();

        return isValid;
    };

    function handleUsername() {
        // VERIFICA SE O CAMPO DE USERNAME SEGUE OS CRITÉRIOS ESTABELECIDOS
        const usernameField = formItems['idUser'];

        if(usernameField) {
            if(
                usernameField.value.trim() === '' ||
                usernameField.value.trim().length <= 3
            ) {
                setError(usernameField, "* Digite um nome de usuário, precisa ter mais que 3 digitos");
            };
        };
    };

    function handlePassword() {
        // VERIFICA SE O CAMPO DE PASSWORD SEGUE OS CRITÉRIOS ESTABELECIDOS
        const passwordField = formItems['idPassword'];

        if(passwordField) {
            if(
                passwordField.value.trim() === '' ||
                passwordField.value.trim().length < 8 ||
                !/[0-9]/.test(passwordField.value.trim())
            ) {
                setError(passwordField, "* Digite uma senha válida, deve ter 8 ou mais caracteres e pelo menos 1 número");
            };
        };
    };

    function handleName() {
        // VERIFICA SE O CAMPO DE NOME SEGUE OS CRITÉRIOS ESTABELECIDOS
        const nameField = formItems['idName'];

        if(nameField) {
            if(
                nameField.value.trim() === '' ||
                nameField.value.trim().length < 2 ||
                !nameField.value.trim().includes(' ') ||
                nameField.value.split(' ')[0].length < 2
            ) {
                setError(nameField, "* Digite seu nome completo");
                isValid = false;
            };
        };
    };

    function handleDate() {
        // VERIFICA SE O CAMPO DE DATA SEGUE OS CRITÉRIOS ESTABELECIDOS
        const dateField = formItems['idNasc'];

        if(dateField) {
            if(
                dateField.value === '' ||
                dateField.value.length < 10
            ) {
                setError(dateField, "* Insira uma data válida");
                isValid = false;
            } else if (
                Number(dateField.value.slice(0,4)) < 1940
            ) {
                setError(dateField, "* Insira a sua data de nascimento");
                isValid = false;
            } else if (
                Number(dateField.value.slice(0,4)) > 2019
            ) {
                setError(dateField, "* Você deve ter mais de 16 anos para se registrar");
                isValid = false;
            };
        };
    };

    function handleCPF() {
        // VERIFICA SE O CAMPO DE CPF SEGUE OS CRITÉRIOS ESTABELECIDOS
        const CPF = formItems['idCpf'];

        if(CPF) {
            if(
                CPF.value === '' ||
                CPF.value.length < 14
            ) {
                setError(CPF, "* Insira um CPF válido");
                isValid = false;
            };
        };
    };

    function handleEmail() {
        // VERIFICA SE O CAMPO DE EMAIL SEGUE OS CRITÉRIOS ESTABELECIDOS
        const emailField = formItems['idEmail'];
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(emailField) {
            if(
                emailField.value.trim() === '' ||
                !emailRegex.test(emailField.value)
            ) {
                setError(emailField, "* Insira um e-mail válido")
                isValid = false;
            };
        };
    };

    function handleTelefone() {
        // VERIFICA SE O CAMPO DE TELEFONE SEGUE OS CRITÉRIOS ESTABELECIDOS
        const telField = formItems["idTelefone"];

        if(telField) {
            if(
                telField.value === '' ||
                telField.value.length < 14
            ) {
                setError(telField,  "* Insira um telefone válido");
                isValid = false;
            };
        };
    };

    function handleFile(element) {
        // VERIFICA SE O CAMPO DE ARQUIVO SEGUE OS CRITÉRIOS ESTABELECIDOS
        const fileField = element;
        
        if(fileField) {
            if(
                fileField.value === '' ||
                (!fileField.value.endsWith(".pdf") &&
                !fileField.value.endsWith(".jpg"))
            ) {
                setError(fileField, "O arquivo precisa ter extensão *.jpg ou *.pdf, tente de novo");
                isValid = false;
            };
        };
    };

    function handleHouseNum() {
        // VERIFICA SE O CAMPO DE NÚMERO SEGUE OS CRITÉRIOS ESTABELECIDOS
        const houseNum = formItems["idNum"];

        if(houseNum) {
            if(
                houseNum.value === ''
            ) {
                setError(houseNum, "* Insira um número")
                isValid = false;
            }
        };
    };

    function handleCep() {
        // VERIFICA SE O CAMPO DE CEP SEGUE OS CRITÉRIOS ESTABELECIDOS
        const CEP = formItems['idCep'];
        
        if(CEP.value === '' || CEP.value.length < 9) {
            setError(CEP, "* Digite um CEP válido");
            isValid = false;
        };
    };

    function handleRua() {
        // VERIFICA SE O CAMPO DE RUA SEGUE OS CRITÉRIOS ESTABELECIDOS
        const streetField = formItems['idRua'];

        if(streetField) {
            if(
                streetField.value.trim() === '' ||
                streetField.value.trim().length < 2
            ) {
                setError(streetField, "* Digite o nome da rua/logradouro");
                isValid = false;
            };
        };
    };

    function handleCidade() {
        // VERIFICA SE O CAMPO DE CIDADE SEGUE OS CRITÉRIOS ESTABELECIDOS
        const cityField = formItems['idCidade'];

        if(cityField) {
            if(
                cityField.value.trim() === '' ||
                cityField.value.trim().length < 2
            ) {
                setError(cityField, "* Digite o nome da cidade");
                isValid = false;
            };
        };
    };

    function handleCheckboxes() {
        // VERIFICA SE HÁ CHECKBOX MARCADA E ESTABELECE OBRIGATORIEDADE
        const checkboxes = document.querySelectorAll(".trilha-checkbox input");
        const isMarked = Array.from(checkboxes).some(checkbox => checkbox.checked);

        if (!isMarked) {
            setError(checkboxes[0], "* É obrigatório marcar 1 opção");
            isValid = false;
        }
    };

    function handleTermo() {
        // VERIFICA SE O CAMPO DE TERMOS FOI SELECIONADO
        const termoField = formItems['idTermos'];

        if(termoField) {
            if(!termoField.checked) {
                setError(termoField);
                isValid = false;
            };
        };
    };

    return validate();
};