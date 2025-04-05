export function setError(inputElement, text = "") {
    const parentElement = inputElement.parentElement;
    
    if(parentElement) {
        // Criando Elementos de HTML
        const errorContainer = document.createElement("div");
        const errorIcon = document.createElement("img");
        const errorMessage = document.createElement("span");
        // Criando TextNodes do HTML
        const textNode_1_1 = document.createTextNode("");
        const textNode_1_2 = document.createTextNode("");
        const textNode_1_2_1 = document.createTextNode(text);
        const textNode_1_3 = document.createTextNode("");
        // Configurando Atributos
        errorContainer.setAttribute("class","form-error");
        errorIcon.setAttribute("src","../assets/icons/alert-circle.svg");
        errorIcon.setAttribute("alt","Um círculo com interrogação em tom vermelho, indicando alerta de erro.");
        // Adicionando ao HTML
        parentElement.appendChild(errorContainer);
        errorContainer.appendChild(textNode_1_1);
        errorContainer.appendChild(errorIcon);
        errorContainer.appendChild(textNode_1_2);
        errorContainer.appendChild(errorMessage);
        errorMessage.appendChild(textNode_1_2_1);
        errorContainer.appendChild(textNode_1_3);
    
        // Modificando Elemento Input
        inputElement.classList.add("error");
    };
};

export function removeError(inputElement) {
    const parentElement = inputElement.parentElement;
    
    if(parentElement) {
        parentElement.childNodes.forEach(element => {
            if(element.className === 'form-error') {
                parentElement.removeChild(element);
                inputElement.classList.remove("error");
            };
        });
    };
};

export function isErrorActive(inputElement) {
    const parentElement = inputElement.parentElement;
    
    if(parentElement) {
        for(let element of parentElement.childNodes) {
            if(element.className === 'form-error') {
                return true;
            };
        };

        return false;
    };
};