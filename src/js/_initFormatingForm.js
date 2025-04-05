export default function initFormatingForm() {
    const formItems = Array.from(document.querySelector('.form-page form')).reduce((acc, formField) => formField.id ? { ...acc, [formField.id]: formField } : acc, {});

    if(formItems) {
        function formatCEP() {
            let value = formItems['idCep'].value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.slice(0, 5) + '-' + value.slice(5, 8);
            };
            formItems['idCep'].value = value;
        };

        formItems['idCep'].addEventListener("keyup", formatCEP);
    };
};