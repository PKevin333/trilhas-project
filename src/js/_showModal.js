export default function showMessageModal(message) {
    const modalButton = document.querySelector(".modal-button");
    const modalContainer = document.querySelector(".modal-container");
    const errorMessage = document.querySelector(".modal-message");

    if (modalButton && modalContainer) {
        function toggleModal() {
            modalContainer.classList.toggle('ativo');
            if(!modalContainer.classList.contains('ativo')) {
                modalButton.removeEventListener('click', toggleModal);
            };
        };

        function outclickModal(event) {
            if (event.target === this) {
                toggleModal();
                modalContainer.removeEventListener('click', outclickModal);
            };
        };

        function showErrorMessage() {
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

