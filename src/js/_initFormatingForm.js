export default function initFormatingForm() {
    const registerPage = document.querySelector(".form-page");

    if(registerPage) {
        // GERA UM ARRAY A PARTIR DO FORM, EM SEGUIDA UM OBJETO
        // ONDE KEY = ID DO INPUT | VALUE = ELEMENTO HTML DO INPUT
        const formItems = Array.from(registerPage.querySelector('form')).reduce((acc, formField) => formField.id ? { ...acc, [formField.id]: formField } : acc, {});

        function formatCPF() {
            // FORMATA O CAMPO DE CPF PARA ATENDER AO FORMATO PADRÃO
            let value = formItems['idCpf'].value.replace(/\D/g, '');

            if (value.length > 11) {
                value = value.slice(0, 11);
            };
    
            if (value.length >= 10) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
            } else if (value.length >= 7) {
                value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
            } else if (value.length >= 4) {
                value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
            };

            formItems['idCpf'].value = value;
        };
        
        function formatPhone() {
            // FORMATA O CAMPO DE TELEFONE PARA ATENDER AO FORMATO PADRÃO
            let value = formItems['idTelefone'].value.replace(/\D/g, '');

            if (value.length > 11) {
                value = value.slice(0, 11);
            };
    
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            } else if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
            } else if (value.length >= 6) {
                value = value.replace(/(\d{2})(\d{4})/, "($1) $2");
            } else if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d{1,4})/, "($1) $2");
            } else if (value.length >= 1) {
                value = value.replace(/(\d{1,2})/, "($1");
            };

            formItems['idTelefone'].value = value;
        };

        function formatCEP() {
            // FORMATA O CAMPO DE CEP PARA ATENDER AO FORMATO PADRÃO
            let value = formItems['idCep'].value.replace(/\D/g, '');
        
            if(value.length > 8) {
                value = value.slice(0, 8);
            };

            if(value.length > 5) {
                value = value.slice(0, 5) + '-' + value.slice(5, 8);
            };


            formItems['idCep'].value = value;
        };

        formItems['idCpf'].addEventListener("input", formatCPF);
        formItems['idTelefone'].addEventListener("input", formatPhone);
        formItems['idCep'].addEventListener("input", formatCEP);
    };
};