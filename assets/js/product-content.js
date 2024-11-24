function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

<<<<<<< HEAD

function loadProduct() {
    const productId = getProductId();
    fetch('../dulieu/data.js')
=======
function loadProduct() {
    const productId = getProductId();
    fetch('dulieu/data.js')
>>>>>>> 3a3cdee (update code cua hoang)
        .then(response => response.text())
        .then(data => {
            const products = JSON.parse(data.replace('var products = ', '').slice(0, -1));
            const product = products.find(p => p.id == productId);
            if (product) {
                document.getElementById('productId').textContent = `MKD0${product.id}`;
                document.getElementById('productId2').textContent = `MKD0${product.id}`;
<<<<<<< HEAD
                document.getElementById('productImage').src = `../assets/Images/products/${product.image}`;
=======
                document.getElementById('productImage').src = `./assets/Images/products/${product.image}`;
>>>>>>> 3a3cdee (update code cua hoang)
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
<<<<<<< HEAD

            document.getElementById('addToCart').onclick = () => {
                const quantityInput = document.getElementById('quantity');
                const quantity = parseInt(quantityInput.value);

                if (quantity <= 0 || isNaN(quantity)) {
                    alert('Vui lòng nhập số lượng hợp lệ!');
                    return;
                }

                 // Lấy danh sách giỏ hàng từ localStorage
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                // Kiểm tra sản phẩm đã tồn tại trong giỏ
                const existingProductIndex = cart.findIndex(item => item.id === product.id);
                if (existingProductIndex !== -1) {
                    // Nếu sản phẩm đã tồn tại, tăng số lượng
                    cart[existingProductIndex].quantity += quantity;
                } else {
                    // Nếu chưa có, thêm sản phẩm mới
                    cart.push({ ...product, quantity });
                }

                // Lưu lại giỏ hàng vào localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                
                alert(`${product.name} đã được thêm vào giỏ hàng!`);
            };

=======
>>>>>>> 3a3cdee (update code cua hoang)
        })
        .catch(error => console.error('Error:', error));
}

<<<<<<< HEAD
window.onload = loadProduct;
=======

window.onload = function () {
    checkLoginStatus(); // Kiểm tra trạng thái đăng nhập khi trang tải xong
    loadProduct();
};
>>>>>>> 3a3cdee (update code cua hoang)


const searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim();
        if (query) {
<<<<<<< HEAD
            window.location.href = `product_base/search_results.html?query=${encodeURIComponent(query)}`;
=======
            window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
>>>>>>> 3a3cdee (update code cua hoang)
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
