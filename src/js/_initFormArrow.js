export default function initFormArrow() {
    const selectElement = document.querySelector("#idSexo");
    const selectArrow = document.querySelector(".select-arrow-field img");
    let isOpen = false;

    if(selectElement) {
        function setIsOpen(value) {
            isOpen = value;
        }

        function handleSelectBehaviour() {
            // RESPONSÁVEL POR MODIFICAR A DIREÇÃO DA SETA DO SELECT
            if(isOpen) {
                selectArrow.setAttribute("style", "transform: translate(-50%, 0) rotate(180deg) scaleX(-1)");
            } else {
                selectArrow.setAttribute("style", "transform: translate(-50%, 0)");
            }
        }

        function handleSelectClick(event) {
            // MODIFICA ESTADO DO SELECT DE ACORDO COM EVENTO DE CLICK DO MOUSE
            const rect = selectElement.getBoundingClientRect();
            const { clientX, clientY } = event;
            const IsInComponent = 
                clientX >= rect.left &&
                clientX <= rect.right &&
                clientY >= rect.top &&
                clientY <= rect.bottom
            ;
            
            if(IsInComponent === false) {
                setIsOpen(false);
            };
            handleSelectBehaviour()
        };

        function handleSelectBlur() {
            // MODIFICA O ESTADO DO SELECT DE ACORDO COM O EVENTO DE BLUR
            setIsOpen(false);
            handleSelectBehaviour()
        };

        function handleSelectKey(event) {
            // MODIFICA ESTADO DO SELECT DE ACORDO COM EVENTO DE TECLADO
            if(event.key === 'Enter' || event.keycode === 13 || event.key === ' ' || event.keycode === 32) {
                setIsOpen(true);
            };
            handleSelectBehaviour()
        };

        function handleMousePress() {
            // MODIFICA ESTADO DO SELECT DE ACORDO COM EVENTO PRESS DO MOUSE
            setIsOpen(!isOpen);
            handleSelectBehaviour();
        }

        selectElement.addEventListener("mousedown", handleMousePress);
        selectElement.addEventListener("click", handleSelectClick);
        selectElement.addEventListener("blur", handleSelectBlur);
        selectElement.addEventListener("keydown", handleSelectKey);
        selectElement.addEventListener("change", handleSelectBlur);
    }
}