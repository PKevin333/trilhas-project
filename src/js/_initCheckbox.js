export default function initCheckbox() {
    const checkboxes = document.querySelectorAll('fieldset label > input[type="checkbox"]');

    if(checkboxes) {
        function handleChecked() {
            checkboxes.forEach(checkbox => {
                if(checkbox.checked === true) {
                    checkbox.parentElement.setAttribute("style", "border: 1px solid #F3541C;");
                    checkbox.parentElement.children[0].setAttribute("style", "display: block;");
                } else {
                    checkbox.parentElement.setAttribute("style", "border: 1px solid #D6D3D1;");
                    checkbox.parentElement.children[0].setAttribute("style", "display: none;");
                };
            });
        };

        function verifyChecked(target) {
            checkboxes.forEach(checkbox => {
                if(checkbox != target && checkbox.checked === true) {
                    checkbox.checked = false;
                };
            });
        };

        function handleCheckboxBehavior(event) {
            verifyChecked(event.target);
            handleChecked();
        }

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxBehavior);
        });
        handleChecked();
    };
};