
function addProduct(productName, productPrice, productDesc, productImg) {
    const product = {
        code: productName,
        Price: productPrice,
        Description: productDesc,
        Image: productImg 
    };

    if (isLoggedIn()) {
        plist.push(product);
        localStorage.setItem('products', JSON.stringify(plist));
        showMsg('added');
    } else {
        document.querySelector('.alert').classList.remove('d-none');
        document.querySelector('.alert').classList.add('d-block');

    }


}
let plist = []; 

if (localStorage.getItem('products') !== null) {
    plist = JSON.parse(localStorage.getItem('products'));
}


function showMsg(msg){
    var toaster=document.getElementById('toaster');
    var toasterbs = new bootstrap.Toast(toaster);
    document.getElementById('toasterMsg').innerHTML=msg;
    toasterbs.show();
    
}

let login=document.querySelector('.login')

function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

function goToCart() {
    if (isLoggedIn()) {
        window.location.href = 'cart/cart.html';
    } else {
        document.querySelector('.alert').classList.remove('d-none');
        document.querySelector('.alert').classList.add('d-block');
    }
}

function logOut() {
    localStorage.removeItem('loggedIn'); 
    window.location.href = 'login/login.html'; 
}