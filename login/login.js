
let emailInput = document.getElementById('typeEmailX-2');
let passInput = document.getElementById('typePasswordX-2');



function handleLogin() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        const userData = JSON.parse(savedData);
        if (emailInput.value === userData.email && passInput.value === userData.password) {
            
            localStorage.setItem('loggedIn', 'true');

            window.location.href = '../index.html';

        } else {
            showMsg('Invalid email or password');
        }
    } 


   
}



function isLoggedIn() {

    return localStorage.getItem('loggedIn') === 'true';
}





function showMsg(msg){
    var toaster=document.getElementById('toaster');
    var toasterbs = new bootstrap.Toast(toaster);
    document.getElementById('toasterMsg').innerHTML=msg;
    toasterbs.show();
    
}
