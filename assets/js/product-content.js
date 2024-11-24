function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function loadProduct() {
    const productId = getProductId();
    fetch('dulieu/data.js')
        .then(response => response.text())
        .then(data => {
            const products = JSON.parse(data.replace('var products = ', '').slice(0, -1));
            const product = products.find(p => p.id == productId);
            if (product) {
                document.getElementById('productId').textContent = `MKD0${product.id}`;
                document.getElementById('productId2').textContent = `MKD0${product.id}`;
                document.getElementById('productImage').src = `./assets/Images/products/${product.image}`;
                document.getElementById('productName1').textContent = product.name;
                document.getElementById('productName2').textContent = product.name;
                document.getElementById('productDescription').textContent = product.description;
                document.getElementById('productPrice').textContent = `${product.price} VNĐ`;
                document.getElementById('productBrand').textContent = `${product.brand}`;
                document.getElementById('productType').textContent = `${product.type}`;
                document.getElementById('productPower').textContent = `${product.power}W`;
                document.getElementById('productSpeed').textContent = `${product.speed} mức độ`;
                document.getElementById('productHighlight').textContent = `${product.highlight}`;
                document.getElementById('productOrigin').textContent = `${product.origin}`;
            }
        })
        .catch(error => console.error('Error:', error));
}


window.onload = function () {
    checkLoginStatus(); // Kiểm tra trạng thái đăng nhập khi trang tải xong
    loadProduct();
};


const searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim();
        if (query) {
            window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
        } else {
            alert('Vui lòng nhập từ khóa tìm kiếm!');
        }
    });
}

const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const quantityInput = document.getElementById('quantity');

// Tăng số lượng
increaseButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < parseInt(quantityInput.max)) {
        quantityInput.value = currentValue + 1;
    }
});

// Giảm số lượng
decreaseButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > parseInt(quantityInput.min)) {
        quantityInput.value = currentValue - 1;
    }
});
