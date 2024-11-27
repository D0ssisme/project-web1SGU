document.addEventListener('DOMContentLoaded', function () {
    const invoiceTableBody = document.getElementById('invoiceTableBody');
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    let filteredInvoices = invoices; // Khởi tạo danh sách đơn hàng đã lọc ban đầu

    // Kiểm tra trang hiện tại và lọc đơn hàng theo trạng thái
    const currentPage = window.location.pathname.split('/').pop(); // Lấy tên file hiện tại
    if (currentPage === 'donhangchuaxuli.html') {
        filteredInvoices = invoices.filter(invoice => invoice.status === 'Chưa xử lý');
    } else if (currentPage === 'donhangdaxuli.html') {
        filteredInvoices = invoices.filter(invoice => invoice.status === 'Đã xử lý');
    }

    // Sắp xếp đơn hàng theo thời gian (ngày tạo) mặc định, đơn hàng mới hơn sẽ ở trên
    filteredInvoices.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sắp xếp giảm dần theo ngày

    // Hàm lọc đơn hàng theo ngày
    const filterByDate = () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        if (!startDate && !endDate) {
            filteredInvoices = invoices; // Nếu không có khoảng thời gian thì hiện tất cả
        } else {
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            filteredInvoices = invoices.filter(invoice => {
                const invoiceDate = new Date(invoice.date);
                let isInRange = true;
                if (start && invoiceDate < start) isInRange = false;
                if (end && invoiceDate > end) isInRange = false;
                return isInRange;
            });
        }
        renderTable(filteredInvoices); // Render lại bảng sau khi lọc
    };

    // Hàm render bảng
    const renderTable = (sortedInvoices) => {
        invoiceTableBody.innerHTML = ''; // Reset bảng trước khi render lại

        if (sortedInvoices.length === 0) {
            invoiceTableBody.innerHTML = '<tr><td colspan="7" class="text-center">Không có đơn hàng nào.</td></tr>';
        } else {
            sortedInvoices.forEach(invoice => {
                const productDetails = invoice.products.map(item => `
                    <p>${item.name} (x${item.quantity}) - ${item.total.toLocaleString()} VNĐ</p>
                `).join('');

                invoiceTableBody.innerHTML += `
                    <tr data-id="${invoice.id}">
                        <td>${invoice.id}</td>
                        <td>${invoice.date}</td>
                        <td>${productDetails}</td>
                        <td>${invoice.total.toLocaleString()} VNĐ</td>
                        <td class="status-cell">${invoice.status}</td>
                        <td>
                            ${invoice.status === 'Chưa xử lý' ? 
                                `<button class="btn btn-success btn-confirm" data-id="${invoice.id}">Xác nhận</button>` : 
                                `<button class="btn btn-danger btn-cancel" data-id="${invoice.id}">Hủy</button>`
                            }
                        </td>
                        <td>
                            <button class="btn btn-info btn-view-details" data-bs-toggle="modal" data-bs-target="#billModal" data-id="${invoice.id}">Xem chi tiết</button>
                        </td>
                    </tr>
                `;
            });
        }
    };

    // Render lại bảng sau khi load
    renderTable(filteredInvoices);

    // Xử lý xác nhận và hủy trạng thái đơn hàng
    invoiceTableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-confirm')) {
            const invoiceId = e.target.getAttribute('data-id');
            const invoice = invoices.find(item => item.id === invoiceId);

            // Vô hiệu hóa nút xác nhận để tránh click nhiều lần
            e.target.disabled = true;
            e.target.textContent = 'Đang xử lý...';

            // Cập nhật trạng thái đơn hàng và lưu vào localStorage
            invoice.status = 'Đã xử lý'; 
            localStorage.setItem('invoices', JSON.stringify(invoices)); 

            // Cập nhật trạng thái trên giao diện
            e.target.closest('tr').querySelector('.status-cell').textContent = 'Đã xử lý';
            e.target.closest('tr').querySelector('.btn-confirm').classList.replace('btn-success', 'btn-danger');
            e.target.closest('tr').querySelector('.btn-confirm').textContent = 'Hủy';

            // Sau khi thay đổi trạng thái, tải lại trang
            setTimeout(() => {
                location.reload(); // Tải lại trang sau khi xác nhận
            }, 1000); // Đợi 1 giây trước khi tải lại để cập nhật UI
        } else if (e.target.classList.contains('btn-cancel')) {
            const invoiceId = e.target.getAttribute('data-id');
            const invoice = invoices.find(item => item.id === invoiceId);
            invoice.status = 'Chưa xử lý'; // Cập nhật trạng thái về "Chưa xử lý"
            localStorage.setItem('invoices', JSON.stringify(invoices)); // Lưu vào localStorage

            // Cập nhật giao diện
            e.target.closest('tr').querySelector('.status-cell').textContent = 'Chưa xử lý';
            e.target.closest('tr').querySelector('.btn-cancel').classList.replace('btn-danger', 'btn-success');
            e.target.closest('tr').querySelector('.btn-cancel').textContent = 'Xác nhận';

            // Tải lại trang sau khi hủy
            setTimeout(() => {
                location.reload(); // Tải lại trang sau khi hủy trạng thái
            }, 1000); // Đợi 1 giây trước khi tải lại để cập nhật UI
        } else if (e.target.classList.contains('btn-view-details')) {
            const invoiceId = e.target.getAttribute('data-id');
            const invoice = invoices.find(item => item.id === invoiceId);
            showInvoiceDetails(invoice);
        }
    });

    // Hàm hiển thị chi tiết đơn hàng trong modal
    const showInvoiceDetails = (invoice) => {
        const modalContent = document.getElementById('modalContent');
        const productHtml = invoice.products.map(item => `
            <div class="d-flex justify-content-between my-3">
                <div>
                    <h6>${item.name}</h6>
                    <p>Mã sản phẩm: ${item.id}</p>
                    <p>Số lượng: ${item.quantity}</p>
                </div>
                <p class="fw-bold">${item.total.toLocaleString()} VNĐ</p>
            </div>
        `).join('');

        modalContent.innerHTML = `
            <h5>Mã đơn hàng: ${invoice.id}</h5>
            <p>Tài khoản: ${invoice.userId || '---'}</p>
            <p>Email: ${invoice.email || '---'}</p>
            <p>Địa chỉ: ${invoice.address || '---'}</p>
            <p>Ngày: ${invoice.date}</p>
            <h6>Tổng tiền: ${invoice.total.toLocaleString()} VNĐ</h6>
            <h4 class="text-primary">Chi tiết sản phẩm</h4>
            ${productHtml}
        `;
    };

    // Lọc đơn hàng theo ngày
    document.getElementById('filterDate').addEventListener('click', filterByDate);

    // Sắp xếp các đơn hàng khi nhấn vào tiêu đề
    const headers = document.querySelectorAll('.sortable');
    headers.forEach(header => {
        header.addEventListener('click', function () {
            const column = header.getAttribute('data-column');
            const order = header.getAttribute('data-order') === 'asc' ? 'desc' : 'asc';
            header.setAttribute('data-order', order);
            sortTable(column, order);
        });
    });

    // Hàm sắp xếp bảng theo cột
    const sortTable = (column, order) => {
        filteredInvoices.sort((a, b) => {
            let valueA = a[column];
            let valueB = b[column];

            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (order === 'asc') {
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            } else {
                return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
            }
        });
        renderTable(filteredInvoices);
    };

    // Đặt sắp xếp mặc định cho cột
    document.querySelectorAll('th.sortable').forEach(th => {
        th.setAttribute('data-order', 'asc'); // Mặc định là tăng dần
    });
});
