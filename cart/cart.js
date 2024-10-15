let cartItemsContainer = document.getElementById('cart-items');
let totalPriceElement = document.getElementById('total-price'); 


let plist = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];

function displayCartProducts() {
    if (plist.length === 0) {
        cartItemsContainer.innerHTML = '<h3 class="text-center">Your cart is empty.</h3>';
        totalPriceElement.innerHTML = 'Total: $0.00';
        return;
    }

    let box = '';
    plist.forEach((item, index) => {
        box += `
        <div class="row mb-4 d-flex justify-content-between align-items-center p-5">
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${item.Image}" class="img-fluid rounded-3" alt="${item.code}">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="t-color fw-bold fs-5">${item.code}</h6>
                <h6 class="mb-0 text-dark">${item.Description}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-1" onclick="changeQuantity(${index}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <input min="0" name="quantity" value="${item.quantity || 1}" type="number" class="form-control form-control-sm" onchange="updateQuantity(${index}, this.value)" />
                <button class="btn btn-link px-0" onclick="changeQuantity(${index}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0">${(item.Price * (item.quantity || 1)).toFixed(2)}$</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <button class="btn btn-danger" onclick="removeProduct(${index})">Remove</button>
            </div>
        </div>
        `;
    });
    cartItemsContainer.innerHTML = box;
    updateSummary();
}

function updateSummary() {
    const totalItems = plist.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = calculateTotal();
    
    totalPriceElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
    document.querySelector('.mb-0.text-muted').innerText = `${totalItems} items`; 
}

function changeQuantity(index, change) {
    if (!plist[index].quantity) {
        plist[index].quantity = 1;
    }
    plist[index].quantity += change;
    if (plist[index].quantity < 0) plist[index].quantity = 0;
    localStorage.setItem('products', JSON.stringify(plist));
    displayCartProducts();
}

function updateQuantity(index, quantity) {
    plist[index].quantity = parseInt(quantity) || 0;
    localStorage.setItem('products', JSON.stringify(plist));
    displayCartProducts();
}

function removeProduct(index) {
    plist.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(plist));
    displayCartProducts();
    showMsg('removed');

}

function calculateTotal() {
    return plist.reduce((sum, item) => sum + (item.Price * (item.quantity || 1)), 0);
}


function showMsg(msg){
    var toaster=document.getElementById('toaster');
    var toasterbs = new bootstrap.Toast(toaster);
    document.getElementById('toasterMsg').innerHTML=msg;
    toasterbs.show();
    
}


displayCartProducts();
