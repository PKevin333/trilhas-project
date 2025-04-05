export default function initLocalStorage() {
    const inputs = document.querySelectorAll('.form-page input');
    const trilhaCheckboxes = document.querySelectorAll('.form-page .trilha-checkbox input');
    const selects = document.querySelectorAll('.form-page select');
    window.formData = {};

    if(inputs && trilhaCheckboxes && selects) {
        function validJSON(str) {
            try {
                JSON.parse(str);
            } catch {
                return false;
            }
            return true;
        };

        function loadLocalStorage() {
            const localFormData = localStorage.getItem('formData');
            if(localFormData && validJSON(localFormData)) {
                const formData = JSON.parse(localFormData);
                Object.entries(formData).forEach(([key, value]) => {
                    const input = document.getElementById(key);
                    if(typeof value == 'boolean') {
                        input.checked = value;
                        window.formData[key] = value;
                    } else {
                        input.value = value;
                        window.formData[key] = value;
                    };
                });
            };
        };

        function handleInput({ target }) {
            if(target.type === 'checkbox') {
                if([...trilhaCheckboxes].includes(target)) {
                    trilhaCheckboxes.forEach(checkbox => {
                        window.formData[checkbox.id] = checkbox.checked;
                    })
                };
                localStorage.setItem('formData', JSON.stringify(window.formData));
            } else {
                window.formData[target.id] = target.value;
                localStorage.setItem('formData', JSON.stringify(window.formData));
            };
        };

        document.querySelector('.form-page form').addEventListener('change', handleInput);
        loadLocalStorage();
    };
};