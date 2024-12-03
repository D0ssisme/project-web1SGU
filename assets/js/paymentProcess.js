const phoneNum = localStorage.getItem('sdt'); // Lấy số điện thoại từ localStorage
let paymentMethod = ''; // Biến kiểm tra phương thức thanh toán

console.log('Sdt:', phoneNum);

// Hàm tìm người dùng qua số điện thoại
function findUserByPhone(phoneNumber) {
    fetch('../../user.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải file JSON');
            }
            return response.json();
        })
        .then(users => {
            const user = users.find(usr => usr.sdt === phoneNumber);

            if (user) {
                updateUserInputs(user);
                console.log('Thông tin người dùng:', user);
            } else {
                alert('Không tìm thấy người dùng này!');
            }
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu:', error);
        });
}

// Cập nhật thông tin vào các ô input
function updateUserInputs(user) {
    document.getElementById('username').value = user.sdt || '';
    // document.getElementById('username2').value = user.sdt || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('address').value = user.address || '';
    document.getElementById('billUsername').innerHTML = user.sdt || '---';
}

// Lưu thông tin người dùng vào localStorage
function saveUserInfo() {
    const userId = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (userId) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        users[userId] = { email, address };
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Tải thông tin người dùng vào modal
function loadUserInfo() {
    const userId = document.getElementById('username').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userInfo = users[userId] || {};

    document.getElementById('email').value = userInfo.email || '';
    document.getElementById('address').value = userInfo.address || '';
    document.getElementById('email2').value = userInfo.email || '';
    document.getElementById('address2').value = userInfo.address || '';
}

// Tải thông tin vào modal hóa đơn
function loadUserInfoForBillModal() {
    const userId = document.getElementById('username').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userInfo = users[userId] || {};

    document.getElementById('billEmail').textContent = userInfo.email || '---';
    document.getElementById('billAddress').textContent = userInfo.address || '---';
}

//Xử lý nhập liệu form cập nhật thông tin người dùng trước khi thanh toán
//Hàm kiểm tra định dạng email
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Hàm kiểm tra địa chỉ
function validateAddress(address) {
    return address.trim().length >= 5; // Địa chỉ tối thiểu 5 ký tự
}


// Xử lý thanh toán và hiển thị hóa đơn
function confirmPayment() {
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Kiểm tra email
    if (!validateEmail(email)) {
        alert('Vui lòng nhập email hợp lệ (ví dụ: example@gmail.com)');
        return;
    }

    // Kiểm tra địa chỉ
    if (!validateAddress(address)) {
        alert('Địa chỉ phải có ít nhất 5 ký tự!');
        return;
    }

    // Lưu thông tin và tiếp tục thanh toán
    saveUserInfo();
    createAndSaveInvoice();

    if (paymentMethod == 'bankMe') {
        const cashModal = bootstrap.Modal.getInstance(document.getElementById('cash'));
        cashModal.hide();

        const qrModal = new bootstrap.Modal(document.getElementById('qr-image'));
        qrModal.show();
    }
    else {
        const cashModal = bootstrap.Modal.getInstance(document.getElementById('cash'));
        cashModal.hide();

        const billModal = new bootstrap.Modal(document.getElementById('billModal'));
        billModal.show();

        clearCart();
        renderCart();
    }

}

//Thanh toán bằng chuyển khoản
document.getElementById('finalConfirm').addEventListener('click', function () {
    const qrModal = bootstrap.Modal.getInstance(document.getElementById('qr-image'));
    qrModal.hide();

    const billModal = new bootstrap.Modal(document.getElementById('billModal'));
    billModal.show();

    clearCart();
    renderCart();
})

// Xóa giỏ hàng
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Tạo hóa đơn và lưu trữ
function createAndSaveInvoice() {
    const billProducts = document.getElementById('billProducts');
    const userId = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const productList = cart.map(item => {
        const priceNumber = Number(item.price.toString().replace(/\./g, '')) || 0;
        const itemTotal = item.quantity * priceNumber;
        return { name: item.name, id: item.id, quantity: item.quantity, total: itemTotal };
    });

    const total = productList.reduce((sum, item) => sum + item.total, 0);

    const invoice = {
        id: `HD-${Date.now()}`,
        products: productList,
        total,
        date: new Date().toLocaleString(),
        status: 'Chưa xử lý',
        userId: userId || '---',
        email: email || '---',
        address: address || '---',
    };

    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));

    billProducts.innerHTML = productList.map(item => `
        <div class="d-flex justify-content-between my-3 bg-secondary-subtle p-4 rounded">
            <div>
                <h6>${item.name}</h6>
                <p>Mã sản phẩm: ${item.id}</p>
                <p>Số lượng: ${item.quantity}</p>
            </div>
            <p class="fw-bold">${item.total.toLocaleString()} VNĐ</p>
        </div>
    `).join('');

    document.getElementById('billTotal').textContent = `${total.toLocaleString()} VNĐ`;
}

// Sự kiện
document.getElementById('cash').addEventListener('show.bs.modal', loadUserInfo);
document.getElementById('billModal').addEventListener('show.bs.modal', loadUserInfoForBillModal);
document.getElementById('confirmPayment').addEventListener('click', confirmPayment);

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('termsCheckbox');
    const confirmButton = document.getElementById('finalConfirm');
    confirmButton.disabled = true;

    checkbox.addEventListener('change', () => {
        confirmButton.disabled = !checkbox.checked;
    });
});


//Kiểm tra phương thức thanh toán
document.getElementById('payCashBtn').addEventListener('click', function () {
    paymentMethod = 'cashMe';
});

document.getElementById('payBankBtn').addEventListener('click', function () {
    paymentMethod = 'bankMe';
})


// Tìm người dùng theo số điện thoại
findUserByPhone(phoneNum);
