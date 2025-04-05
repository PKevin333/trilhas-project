import fetchData from "./_fetchData.js";
import { setError, removeError, isErrorActive } from "./_handleError.js";

export default function initFormValidation() {
    const formItems = Array.from(document.querySelector('.form-page form')).reduce((acc, formField) => formField.id ? { ...acc, [formField.id]: formField } : acc, {});


    if(formItems) {
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

        formItems['idCep'].addEventListener('blur', handleCep);

        if(formItems['idCep'].value) {
            handleCep();
        };
    };
};