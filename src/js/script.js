import initCheckbox from './_initCheckbox.js';
import initFormArrow from './_initFormArrow.js';
import showErrorModal from './_showModal.js';

initCheckbox();
initFormArrow();
document.querySelector(".login-box button").addEventListener("click", showErrorModal);