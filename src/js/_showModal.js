export default function showMessageModal(message) {
    const modalButton = document.querySelector(".modal-button");
    const modalContainer = document.querySelector(".modal-container");
    const errorMessage = document.querySelector(".modal-message");

    if (modalButton && modalContainer) {
        function toggleModal() {
            // ATIVA E DESATIVA O MODAL
            modalContainer.classList.toggle('ativo');
            if(!modalContainer.classList.contains('ativo')) {
                modalButton.removeEventListener('click', toggleModal);
            };
        };

        function outclickModal(event) {
            // VERIFICA SE O CLICK DO USUÁRIO FOI FORA DO MODAL
            if (event.target === this) {
                toggleModal();
                modalContainer.removeEventListener('click', outclickModal);
            };
        };

        function showErrorMessage() {
            // MODIFICA E EXIBE A MENSAGEM PASSADA PARA FUNÇÃO
            errorMessage.textContent = message;
            toggleModal();
        };

        if(!modalContainer.classList.contains('ativo')) {
            modalButton.addEventListener('click', toggleModal);
            modalContainer.addEventListener('click', outclickModal);
            showErrorMessage();
        };
    };
};

