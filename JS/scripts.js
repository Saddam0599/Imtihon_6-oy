const logoutButton = document.getElementById('logout-button');

logoutButton.onclick = function () {
    localStorage.removeItem('token');

    window.location = '/HTML/auth.html';
};


let productsData = []; 
let addedProducts = []; 

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        productsData = products;
        updateNameDatalist(productsData);
    })
    .catch(error => console.error('Xatolik:', error));

function updateNameDatalist(products) {
    const nameDatalist = document.getElementById('name-options');
    nameDatalist.innerHTML = '';

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.title;
        nameDatalist.appendChild(option);
    });
}

document.getElementById('product-name').addEventListener('input', function () {
    const selectedProduct = productsData.find(product => product.title === this.value);
    if (selectedProduct) {
        document.getElementById('product-price').value = selectedProduct.price;
        document.getElementById('product-description').value = selectedProduct.description;
    }
});

document.getElementById('product-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;

    addedProducts.push({
        name: name,
        price: price,
        description: description
    });

    displayProducts(addedProducts); 
    this.reset();
});

function displayProducts(products) {
    const productList = document.getElementById('products');
    productList.innerHTML = ''; 
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `Name: ${product.name}, Price: $${product.price}, Description: ${product.description}`;
        productList.appendChild(li);
    });
}

