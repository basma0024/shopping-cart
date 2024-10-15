
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let passInput = document.getElementById('pass');
let repassInput = document.getElementById('repass');

let nameAlert = document.querySelector('.nameAlert');
let emailAlert = document.querySelector('.emailAlert');
let phoneAlert = document.querySelector('.phoneAlert');
let passAlert = document.querySelector('.passAlert');
let repassAlert = document.querySelector('.repassAlert');


function validate(inputId, regexKey, alertElement) {
    let input = document.getElementById(inputId);
    let regex = {
        name: /^[a-zA-Z ]+$/,
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    };

    let isValid = regex[regexKey].test(input.value);

    input.classList.remove('is-valid','is-invalid');


    if (isValid) {
        alertElement.classList.remove('d-block');
        alertElement.classList.add('d-none');
        input.dataset.valid = 'true'; 
        input.classList.add('is-valid');

    } else {
        alertElement.classList.remove('d-none');
        alertElement.classList.add('d-block');
        input.dataset.valid = 'false'; 
        input.classList.add('is-invalid'); 

    }



}


function repasswordValidation() {
    let passValue = passInput.value;
    let repassValue = repassInput.value;

    if (passValue === repassValue) {
        repassAlert.classList.remove('d-block');
        repassAlert.classList.add('d-none');
        repassInput.dataset.valid = 'true'; 
    } else {
        repassAlert.classList.remove('d-none');
        repassAlert.classList.add('d-block');
        repassInput.dataset.valid = 'false'; 
    }




}


function saveUserData() {
    const userData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        password: passInput.value 
    };
    localStorage.setItem('userData', JSON.stringify(userData));
}

function loadUserData() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        const userData = JSON.parse(savedData);
        nameInput.value = userData.name || '';
        emailInput.value = userData.email || '';
        phoneInput.value = userData.phone || '';
    }
}

document.querySelector('.signUp').addEventListener('click', function (e) {
    e.preventDefault(); 
    if (nameInput.dataset.valid === 'true' && emailInput.dataset.valid === 'true' && phoneInput.dataset.valid === 'true' && passInput.dataset.valid === 'true' && repassInput.dataset.valid === 'true') {
        saveUserData();
        window.location.href = '../index.html'; 
    }
});

window.onload = loadUserData;