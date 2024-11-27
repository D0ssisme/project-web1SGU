 // Hàm tìm người dùng qua số điện thoại (sdt)
 const phoneNum = localStorage.getItem('sdt'); // Lấy số điện thoại từ localStorage
 console.log('Sdt', phoneNum);
 function findUserByPhone(phoneNumber) {
     fetch('user.json')
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
                 document.getElementById('email').value = user.email || ''; // Giả sử có email hoặc để trống
                 document.getElementById('address').value = user.address || ''; // Hiển thị địa chỉ

                 console.log('Thông tin người dùng:', user); // In ra để kiểm tra thông tin người dùng

                 const billUser = document.getElementById('billUsername');
                 billUser.innerHTML = document.getElementById('username').value;
                 const billEmail = document.getElementById('billEmail');
                 billEmail.innerHTML = document.getElementById('email').value;
                 const billAddress = document.getElementById('billAddress');
                 billAddress.innerHTML = document.getElementById('address').value;

                 // Lắng nghe sự kiện thay đổi giá trị email và phone và cập nhật thông tin hóa đơn
                 document.getElementById('email').addEventListener('input', function () {
                     billEmail.innerHTML = document.getElementById('email').value;
                 });

                 document.getElementById('address').addEventListener('input', function () {
                     billAddress.innerHTML = document.getElementById('address').value;
                 });
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


 //Xác nhận thanh toán bằng tiền mặt
 document.getElementById('confirmPayment').addEventListener('click', function () {
     // Lấy hóa đơn modal (billDiv)
     const billDiv = document.getElementById('billDiv');
     const billProducts = document.getElementById('billProducts');

     // Tạo danh sách sản phẩm từ giỏ hàng
     let currentInvoice = {};
     if (cart.length === 0) {
         billProducts.innerHTML = '<p>Không có sản phẩm nào trong hóa đơn.</p>';
     } else {
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
     }

     document.getElementById('billTotal').textContent = `${currentInvoice.total?.toLocaleString()} VNĐ`;

     // Đóng modal nhập thông tin và mở modal hóa đơn
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


 //Xác nhận thanh toán bằng chuyển khoản
 document.getElementById('confirmPayment2').addEventListener('click', function () {
     // Lấy hóa đơn modal (billDiv)
     const billDiv = document.getElementById('billDiv');
     const billProducts = document.getElementById('billProducts');

     // Tạo danh sách sản phẩm từ giỏ hàng
     let currentInvoice = {};
     if (cart.length === 0) {
         billProducts.innerHTML = '<p>Không có sản phẩm nào trong hóa đơn.</p>';
     } else {
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
     }

     document.getElementById('billTotal').textContent = `${currentInvoice.total?.toLocaleString()} VNĐ`;

     // Đóng modal nhập thông tin và mở modal hóa đơn
     const cashModal = bootstrap.Modal.getInstance(document.getElementById('cashBanking'));
     cashModal.hide();
     const qrImage = new bootstrap.Modal(document.getElementById('qr-image'));
     qrImage.show();
 });


 document.getElementById("finalConfirm").addEventListener('click', function () {
     const qrImage = bootstrap.Modal.getInstance(document.getElementById('qr-image'));
     qrImage.hide();
     const billModal = new bootstrap.Modal(document.getElementById('billModal'));
     billModal.show();

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
 document.getElementById('finalConfirm').addEventListener('click', function () {
     const checkbox = document.getElementById('termsCheckbox');
 
     if (!checkbox.checked) {
         alert('Vui lòng đồng ý với các chính sách và điều khoản trước khi tiếp tục.');
         return;
     }
 
     // Tiếp tục xử lý khi checkbox được chọn
     console.log('Người dùng đã xác nhận điều khoản.');
 });
 
 