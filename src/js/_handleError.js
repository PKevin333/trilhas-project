export function setError(inputElement, text = "") {
    const parentElement = inputElement.parentElement;
    
    if(parentElement && !isErrorActive(inputElement)) {
        if(inputElement.type === 'file') {
            // MODIFICA O INPUT ELEMENT PARA REPRESENTAR ESTADO DE ERRO
            const container = parentElement.querySelector(".upload-icon");
            const icon = parentElement.querySelector(".upload-icon img");
            const message = parentElement.querySelector(".upload-icon p");

            container.classList.add("error");
            icon.setAttribute("src", "../assets/cross.png");
            icon.setAttribute("alt", "Um X envolvido por um círculo, ambos vermelhos, indicando erro");
            message.innerText = text;
        } else if(inputElement.type === 'checkbox') {
            if(inputElement.id === 'idTermos') {
                // TORNA APARENTE O ERRO DO INPUT TERMOS
                const errorMessage = document.querySelector(".termo-error");

                errorMessage.classList.remove("hidden");
            } else {
                // CRIA O ELEMENTO DE ERRO DAS CHECKBOXES DAS TRILHAS
                const container = document.querySelector(".trilhas");
                const checkboxes = document.querySelectorAll(".trilhas .trilha-checkbox input");

                // CRIANDO OS ELEMENTOS HTML
                const errorContainer = document.createElement("div");
                const errorIcon = document.createElement("img");
                const errorMessage = document.createElement("span");
                // CRIANDO OS TEXTNODES NO HTML
                const textNode_1_1 = document.createTextNode("");
                const textNode_1_2 = document.createTextNode("");
                const textNode_1_2_1 = document.createTextNode(text);
                const textNode_1_3 = document.createTextNode("");
                // DEFININDO OS ATRIBUTOS
                errorContainer.setAttribute("class","form-error checkbox-error");
                errorIcon.setAttribute("src","../assets/icons/alert-circle.svg");
                errorIcon.setAttribute("alt","Um círculo com interrogação em tom vermelho, indicando alerta de erro.");
                // ADICIONANDO OS ELEMENTOS À PÁGINA
                container.appendChild(errorContainer);
                errorContainer.appendChild(textNode_1_1);
                errorContainer.appendChild(errorIcon);
                errorContainer.appendChild(textNode_1_2);
                errorContainer.appendChild(errorMessage);
                errorMessage.appendChild(textNode_1_2_1);
                errorContainer.appendChild(textNode_1_3);

                // MODIFICANDO O ESTADO DAS CHECKBOXES
                checkboxes.forEach(checkbox => {
                    checkbox.parentElement.classList.add("error");
                });
            };
        } else {   
            // CRIA O ELEMENTO DE ERRO DOS INPUTS COMUNS
            // CRIANDO ELEMENTOS HTML
            const errorContainer = document.createElement("div");
            const errorIcon = document.createElement("img");
            const errorMessage = document.createElement("span");
            // CRIA OS TEXTNODES NO HTML
            const textNode_1_1 = document.createTextNode("");
            const textNode_1_2 = document.createTextNode("");
            const textNode_1_2_1 = document.createTextNode(text);
            const textNode_1_3 = document.createTextNode("");
            // DEFININDO OS ATRIBUTOS
            errorContainer.setAttribute("class","form-error");
            errorIcon.setAttribute("src","../assets/icons/alert-circle.svg");
            errorIcon.setAttribute("alt","Um círculo com interrogação em tom vermelho, indicando alerta de erro.");
            // ADICIONANDO OS ELEMENTOS À PÁGINA
            parentElement.appendChild(errorContainer);
            errorContainer.appendChild(textNode_1_1);
            errorContainer.appendChild(errorIcon);
            errorContainer.appendChild(textNode_1_2);
            errorContainer.appendChild(errorMessage);
            errorMessage.appendChild(textNode_1_2_1);
            errorContainer.appendChild(textNode_1_3);
        
            // MODIFICANDO O ESTADO DOS INPUTS
            inputElement.classList.add("error");
        }
    };
};

export function removeError(inputElement) {
    const parentElement = inputElement.parentElement;
    
    if(parentElement) {
        if(inputElement.type === "file") {
            // REMOVE O ESTADO DE ERRO DOS INPUTS DE TIPO FILE
            const container = parentElement.querySelector(".upload-icon");

            container.classList.remove("error");
        } else if(inputElement.type === "checkbox") {
            if(inputElement.id === 'idTermos') {
                // REMOVE O ESTADO DE ERRO DA CHECKBOX DO TERMO
                const errorMessage = document.querySelector(".termo-error");

                errorMessage.classList.add("hidden");
            } else {
                // REMOVE O ESTADO DE ERRO DAS CHECKBOXES DAS TRILHAS
                const container = document.querySelector(".trilhas");
                const checkboxes = document.querySelectorAll(".trilhas .trilha-checkbox input");

                container.removeChild(container.querySelector(".form-error"));

                checkboxes.forEach(checkbox => {
                    checkbox.parentElement.classList.remove("error");
                });
            };
        } else {
            // REMOVE O ESTADO DE ERRO DOS DEMAIS TIPOS DE INPUT
            const errorMessage = parentElement.querySelector(".form-error");
            parentElement.removeChild(errorMessage);
            inputElement.classList.remove("error");
        };
    };
};

export function isErrorActive(inputElement) {
    const parentElement = inputElement.parentElement;
    
    if(parentElement) {
        if(inputElement.type === "file") {
            // VERIFICA SE HÁ ERRO ATIVO EM UM INPUT DO TIPO FILE
            const container = parentElement.querySelector(".upload-icon");
            
            if(container.classList.contains("error")) {
                return true;
            }
        } else if(inputElement.type === "checkbox") {
            if(inputElement.id === 'idTermos') {
                // VERIFICA SE HÁ ERRO ATIVO NO CHECKBOX DOS TERMOS
                const errorMessage = document.querySelector(".termo-error");

                if(!errorMessage.classList.contains("hidden")) {
                    return true;
                };
            } else {
                // VERIFICA SE HÁ ERRO ATIVO NAS CHECKBOXES DAS TRILHAS
                const container = document.querySelector(".trilhas");
                const errorMsg = container.querySelector(".form-error");
                
                if(errorMsg) {
                    return true;
                }
            };
        } else {
            // VERIFICA SE HÁ ERRO NOS INPUTS DOS DEMAIS TIPOS
            for(let element of parentElement.childNodes) {
                if(
                    element.className &&
                    element.className.includes('form-error')
                ) {
                    return true;
                };
            };
        };

        return false;
    };
};