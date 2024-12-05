const phoneNum = localStorage.getItem('sdt'); // Lấy số điện thoại từ localStorage
let paymentMethod = ''; // Biến kiểm tra phương thức thanh toán
let notification = document.getElementById('notification');
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


//Xử lý thông tin trước đó của người dùng
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
}

// Tải thông tin vào modal hóa đơn
function loadUserInfoForBillModal() {
    const userId = document.getElementById('username').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userInfo = users[userId] || {};

    document.getElementById('billEmail').textContent = userInfo.email || '---';
    document.getElementById('billAddress').textContent = userInfo.address || '---';
}



// Kiểm tra địa chỉ với gợi ý
const hcmAddressData = [
    "Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    "Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
    "Phường Nguyễn Cư Trinh, Quận 1, TP. Hồ Chí Minh",
    "Phường 2, Quận 3, TP. Hồ Chí Minh",
    "Phường 4, Quận 4, TP. Hồ Chí Minh",
    "Phường 15, Quận Tân Bình, TP. Hồ Chí Minh",
    "Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh",
    "Phường Bình An, Quận 2, TP. Hồ Chí Minh",
    "Phường Thảo Điền, Quận 2, TP. Hồ Chí Minh",
    "Phường Phước Long B, TP. Thủ Đức, TP. Hồ Chí Minh",
];

// Xử lý nhập liệu form địa chỉ
document.getElementById('address').addEventListener('input', function (event) {
    const addressInput = event.target;
    const value = addressInput.value.trim();
    const suggestionBox = document.getElementById('addressSuggestions');

    suggestionBox.innerHTML = ''; // Xóa gợi ý cũ

    // Kiểm tra nếu có dấu phẩy (',') trong chuỗi nhập
    const lastCommaIndex = value.lastIndexOf(',');

    // Nếu chưa nhập dấu phẩy, không hiển thị gợi ý
    if (lastCommaIndex === -1) {
        return;
    }

    // Phần sau dấu phẩy
    const query = value.substring(lastCommaIndex + 1).trim().toLowerCase();

    if (query.length > 0) {
        // Lọc các gợi ý từ danh sách địa chỉ có chứa chuỗi nhập sau dấu phẩy
        const filteredSuggestions = hcmAddressData.filter(item =>
            item.toLowerCase().includes(query)
        );

        filteredSuggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestion;

            suggestionItem.addEventListener('click', () => {
                // Khi người dùng chọn gợi ý, thay thế phần địa chỉ đã nhập với gợi ý
                addressInput.value = `${value.substring(0, lastCommaIndex + 1)} ${suggestion}`;
                suggestionBox.innerHTML = ''; // Ẩn gợi ý sau khi chọn
            });

            suggestionBox.appendChild(suggestionItem);
        });
    }
});

// CSS cho suggestion box
const style = document.createElement('style');
style.innerHTML = `
    #addressSuggestions {
        border: 1px solid #ccc;
        max-height: 150px;
        overflow-y: auto;
        position: absolute;
        background: white;
        z-index: 1000;
        width: 100%;
        margin-top: 25px;
    }
    .suggestion-item {
        padding: 8px;
        cursor: pointer;
    }
    .suggestion-item:hover {
        background-color: #f0f0f0;
    }
`;
document.head.appendChild(style);

// Hàm hiển thị thông báo
function showNotification(message, type = 'error') {
    const notification = document.getElementById('notification');
    notification.textContent = message;

    // Xóa các lớp trước
    notification.classList.remove('notification-success', 'notification-error');

    // Thêm lớp phù hợp theo loại thông báo
    if (type === 'success') {
        notification.classList.add('notification-success');
    } else {
        notification.classList.add('notification-error');
    }

    notification.style.display = 'block';

    // Ẩn thông báo sau 3 giây
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}



//Xử lý nhập liệu form cập nhật thông tin người dùng trước khi thanh toán
// Kiểm tra email và địa chỉ
function validateEmail(email) {
    const atIndex = email.indexOf('@');
    if (atIndex === -1 || !email.slice(atIndex).toLowerCase().includes('@gmail.com')) {
        showNotification('Vui lòng nhập email hợp lệ (ví dụ: example@gmail.com)');
        return false; // Không phải email có đuôi @gmail.com
    }
    return true;
}

// Kiểm tra địa chỉ hợp lệ trước khi xác nhận
function validateAddress(address) {
    const lastCommaIndex = address.lastIndexOf(',');

    console.log(address.length);

    // Kiểm tra phần sau dấu phẩy, xem có khớp với gợi ý không
    const query = address.substring(lastCommaIndex + 1).trim().toLowerCase();

    //  // Kiểm tra độ dài chuỗi nhập vào sau dấu phẩy
    //  if (query.length < 5) {
    //     showNotification('Địa chỉ không đúng lắm!.');
    //     return false; // Không hợp lệ nếu chuỗi quá ngắn
    // }

    // Kiểm tra độ dài tổng thể của địa chỉ
    if (address.length < 30) {
        showNotification('Địa chỉ quá ngắn, vui lòng nhập thêm.');
        return false; // Không hợp lệ nếu địa chỉ quá ngắn
    }

    if (query.length > 0) {
        const isValidAddress = hcmAddressData.some(item =>
            item.toLowerCase().includes(query)
        );

        // Nếu không khớp, hiển thị thông báo lỗi
        if (!isValidAddress) {
            showNotification('Địa chỉ không hợp lệ! Vui lòng chọn một trong các địa chỉ gợi ý.');
            return false;
        }
    }
    return true;
}



// Xử lý thanh toán và hiển thị hóa đơn
function confirmPayment() {
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Kiểm tra email
    if (!validateEmail(email)) {
        // alert('Vui lòng nhập email hợp lệ (ví dụ: example@gmail.com)');
        return;
    }

    // Kiểm tra địa chỉ
    if (!validateAddress(address)) {
        // alert('Địa chỉ phải có ít nhất 5 ký tự!');
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
