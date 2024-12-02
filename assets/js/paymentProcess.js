// Hàm tìm người dùng qua số điện thoại (sdt)
const phoneNum = localStorage.getItem('sdt'); // Lấy số điện thoại từ localStorage
console.log('Sdt', phoneNum);
function findUserByPhone(phoneNumber) {
    fetch('../../user.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải file JSON');
            }
            return response.json();
        })
        .then(users => {
            // Tìm người dùng với số điện thoại chính xác
            const user = users.find(usr => usr.sdt === phoneNumber);

            if (user) {
                // Nếu tìm thấy người dùng, hiển thị thông tin vào các ô input
                document.getElementById('username').value = user.sdt; // Hiển thị số điện thoại
                document.getElementById('username2').value = user.sdt; // Hiển thị số điện thoại
                document.getElementById('email').value = user.email || ''; // Giả sử có email hoặc để trống
                document.getElementById('address').value = user.address || ''; // Hiển thị địa chỉ

                console.log('Thông tin người dùng:', user); // In ra để kiểm tra thông tin người dùng

                const billUser = document.getElementById('billUsername');
                billUser.innerHTML = document.getElementById('username').value;


                //  // Lắng nghe sự kiện thay đổi giá trị email và phone và cập nhật thông tin hóa đơn
                //  document.getElementById('email').addEventListener('input', function () {
                //      billEmail.innerHTML = document.getElementById('email').value;
                //  });

                //  document.getElementById('address').addEventListener('input', function () {
                //      billAddress.innerHTML = document.getElementById('address').value;
                //  });
            } else {
                alert('Không tìm thấy người dùng này!');
            }
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu:', error);
        });
}

// Giả sử người dùng đã đăng nhập và bạn có số điện thoại
findUserByPhone(phoneNum); // Tìm người dùng theo số điện thoại và cập nhật thông tin

// Lưu thông tin người dùng vào localStorage
function saveUserInfo() {
    const userId = document.getElementById('username').value;  // Lấy userId
    const email = document.getElementById('email').value || document.getElementById('email2').value;  // Lấy email từ cả 2 modal
    const address = document.getElementById('address2').value || document.getElementById('address').value;  // Lấy địa chỉ từ cả 2 modal

    // Lấy dữ liệu người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {}; 

    if (userId) {
        // Lưu email và address vào localStorage
        users[userId] = { email, address };
        localStorage.setItem('users', JSON.stringify(users));  // Cập nhật localStorage
    }
}


// Tải dữ liệu người dùng vào các modal khi mở
function loadUserInfo() {
    const userId = document.getElementById('username').value;  // Lấy userId từ input
    const users = JSON.parse(localStorage.getItem('users')) || {};  // Lấy dữ liệu người dùng từ localStorage
    const userInfo = users[userId] || {};  // Lấy thông tin người dùng từ localStorage, nếu không có thì sử dụng giá trị mặc định

    // Điền thông tin vào ô input của cả 2 modal
    document.getElementById('email').value = userInfo.email || '';
    document.getElementById('address').value = userInfo.address || '';
    document.getElementById('email2').value = userInfo.email || '';
    document.getElementById('address2').value = userInfo.address || '';
}

// Khi modal được mở, tải dữ liệu người dùng
document.getElementById('cash').addEventListener('show.bs.modal', loadUserInfo);
document.getElementById('cashBanking').addEventListener('show.bs.modal', loadUserInfo);


// Lấy dữ liệu người dùng từ localStorage và hiển thị ở billModal
function loadUserInfoForBillModal() {
    const userId = document.getElementById('username').value;  // Lấy userId từ input
    const users = JSON.parse(localStorage.getItem('users')) || {};  // Lấy dữ liệu người dùng từ localStorage
    const userInfo = users[userId] || {};  // Lấy thông tin người dùng từ localStorage, nếu không có thì sử dụng giá trị mặc định

    // Hiển thị thông tin vào div hóa đơn (billModal)
    document.getElementById('billEmail').textContent = userInfo.email || '---';
    document.getElementById('billAddress').textContent = userInfo.address || '---';
}

// Khi modal hóa đơn được mở, tải thông tin người dùng
document.getElementById('billModal').addEventListener('show.bs.modal', loadUserInfoForBillModal);



// Xác nhận thanh toán bằng tiền mặt
document.getElementById('confirmPayment').addEventListener('click', function () {
    saveUserInfo();  // Lưu thông tin người dùng
    createAndSaveInvoice();  // Xử lý hóa đơn

    // Đóng modal và hiển thị modal hóa đơn
    const cashModal = bootstrap.Modal.getInstance(document.getElementById('cash'));
    cashModal.hide();
    const billModal = new bootstrap.Modal(document.getElementById('billModal'));
    billModal.show();

    
    // Xóa giỏ hàng sau khi xác nhận
    cart = []; // Làm rỗng mảng giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật localStorage

    // Làm mới giao diện giỏ hàng
    renderCart();
});

// Xác nhận thanh toán bằng chuyển khoản
document.getElementById('confirmPayment2').addEventListener('click', function () {
    saveUserInfo();  // Lưu thông tin người dùng
    createAndSaveInvoice();  // Xử lý hóa đơn

    // Đóng modal và hiển thị QR modal
    const cashModal = bootstrap.Modal.getInstance(document.getElementById('cashBanking'));
    cashModal.hide();
    const qrImage = new bootstrap.Modal(document.getElementById('qr-image'));
    qrImage.show();
});




function createAndSaveInvoice() {
    const billProducts = document.getElementById('billProducts');
    const userId = document.getElementById('username').value; // Lấy user id
    const emailInput = document.getElementById('email').value; // Lấy email
    const addressInput = document.getElementById('address').value; // Lấy địa chỉ

    // Tạo danh sách sản phẩm từ giỏ hàng
    let currentInvoice = {};
    const productList = cart.map(item => {
        const priceNumber = Number(item.price.toString().replace(/\./g, '')) || 0;
        const itemTotal = item.quantity * priceNumber;
        return {
            name: item.name,
            id: item.id,
            quantity: item.quantity,
            total: itemTotal,
        };
    });

    // Tạo hóa đơn hiện tại
    const total = cart.reduce((sum, item) => {
        const priceNumber = Number(item.price.toString().replace(/\./g, '')) || 0;
        return sum + item.quantity * priceNumber;
    }, 0);

    currentInvoice = {
        id: `HD-${Date.now()}`, // Tạo mã hóa đơn duy nhất
        products: productList,
        total: total,
        date: new Date().toLocaleString(), // Thời gian tạo hóa đơn
        status: 'Chưa xử lý', // Trạng thái hóa đơn mới là "Chưa xử lý"
        userId: userId || '---', // Thêm user id
        email: emailInput || '---', // Thêm email
        address: addressInput || '---', // Thêm địa chỉ
    };

    // Lưu hóa đơn vào localStorage
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.push(currentInvoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Hiển thị danh sách sản phẩm vào `billProducts`
    const productHtml = productList.map(item => `
        <div class="d-flex justify-content-between my-3 bg-secondary-subtle p-4 rounded">
            <div>
                <h6>${item.name}</h6>
                <p>Mã sản phẩm: ${item.id}</p>
                <p>Số lượng: ${item.quantity}</p>
            </div>
            <p class="fw-bold">${item.total.toLocaleString()} VNĐ</p>
        </div>
    `).join('');

    billProducts.innerHTML = `
        <div>
            <h4 class="text-primary mb-3">Danh sách sản phẩm</h4>
            ${productHtml}
        </div>
    `;

    // Hiển thị tổng tiền
    document.getElementById('billTotal').textContent = currentInvoice.total ? `${currentInvoice.total.toLocaleString()} VNĐ` : '0 VND';

}





document.getElementById("finalConfirm").addEventListener('click', function () {
    const qrImage = bootstrap.Modal.getInstance(document.getElementById('qr-image'));
    qrImage.hide();
    const billModal = new bootstrap.Modal(document.getElementById('billModal'));
    billModal.show();
    const checkbox = document.getElementById('termsCheckbox');

    if (!checkbox.checked) {
        alert('Vui lòng đồng ý với các chính sách và điều khoản trước khi tiếp tục.');
        return;
    }

    // Tiếp tục xử lý khi checkbox được chọn
    console.log('Người dùng đã xác nhận điều khoản.');

    // Xóa giỏ hàng sau khi xác nhận
    cart = []; // Làm rỗng mảng giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật localStorage

    // Làm mới giao diện giỏ hàng
    renderCart();
});

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('termsCheckbox');
    const confirmButton = document.getElementById('finalConfirm');

    // Theo dõi sự kiện thay đổi trạng thái checkbox
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            confirmButton.disabled = false; // Bật nút
        } else {
            confirmButton.disabled = true; // Tắt nút
        }
    });
});


// Lắng nghe sự kiện khi modal cash được mở
const cashModal = document.getElementById('cash');
cashModal.addEventListener('shown.bs.modal', function () {
    const userId = document.getElementById('username').value; // Lấy user ID từ input

    if (!userId) {
        // Nếu không có userId, xóa các trường nhập
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
        return;
    }

    // Lấy thông tin người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[userId]) {
        // Nếu có thông tin người dùng, hiển thị vào các trường input
        document.getElementById('email').value = users[userId].email || '';
        document.getElementById('address').value = users[userId].address || '';
    } else {
        // Nếu không có thông tin, để trống các trường input
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
    }
});
