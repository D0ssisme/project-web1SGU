function showForm(formType) {
    if (formType === 'register') {
        document.getElementById('registerForm').style.display = 'flex';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('check').style.display = 'none';
        document.getElementById('dangkythanhcong').style.display = 'none';
    } else if (formType === 'login') {
        document.getElementById('loginForm').style.display = 'flex';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('check').style.display = 'none';
        document.getElementById('dangkythanhcong').style.display = 'none';
    }
}


function closeFormOutside() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";

}




function checkLoginStatus() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const sdt = localStorage.getItem('sdt'); // Lấy số điện thoại từ localStorage

        // Tải dữ liệu người dùng từ file user.json
        fetch('user.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không thể tải file JSON');
                }
                return response.json();
            })
            .then(users => {
                // Tìm người dùng trong file JSON với số điện thoại tương ứng
                const user = users.find(usr => usr.sdt === sdt);
                if (user) {
                    document.getElementById('account-link').innerHTML = `Xin chào, ${user.sdt}`;
                    document.getElementById('dropdown-menu').style.display = 'none';
                    document.getElementById('logout-button').style.display = 'block';
                    document.getElementById('account-link').removeAttribute('onclick');


                    document.getElementById('account-button').onmouseover = function () {
                        document.getElementById('dropdown-menu').style.display = 'block';
                    };
                    document.getElementById('account-button').onmouseout = function () {
                        document.getElementById('dropdown-menu').style.display = 'none';
                    };


                }
            })
            .catch(error => {
                console.error("Lỗi khi tải file JSON:", error);
            });

    } else {
        document.getElementById('account-link').innerHTML = '<a href="#" onclick="showForm(\'login\')">Tài Khoản</a>';
        document.getElementById('dropdown-menu').style.display = 'none';
        document.getElementById('logout-button').style.display = 'none';
    }
}


function logout(event) {
    event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    location.reload();
}
function logout1(event) {
    event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    location.href = 'index.html'; // Chuyển hướng về trang index.html
}



function toggleDropdown(event) {
    event.stopPropagation();
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}


document.addEventListener('click', function (event) {
    const accountButton = document.getElementById('account-button');
    const dropdown = document.getElementById('dropdown-menu');

    if (!accountButton.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Xử lý đăng xuất










function checkformlogin() {
    var sdtlogin = document.getElementById('sdtlogin').value;
    var passlogin = document.getElementById('passlogin').value;

    // Ẩn các thông báo lỗi cũ
    document.getElementById('sdt-error').style.display = 'none';
    document.getElementById('pass-error').style.display = 'none';

    // Kiểm tra các thông tin nhập vào
    if (sdtlogin === '') {
        document.getElementById('sdt-error').innerText = "Vui lòng nhập vào số điện thoại!";
        document.getElementById('sdt-error').style.display = 'block';
        document.getElementById('sdtlogin').focus();
        return false;
    } else {
        var phonePattern = /^[0-9]+$/;
        if (!phonePattern.test(sdtlogin)) {
            document.getElementById('sdt-error').innerText = "Số điện thoại không hợp lệ !";
            document.getElementById('sdt-error').style.display = 'block';
            document.getElementById('sdtlogin').focus();
            return false;
        }
    }

    if (passlogin === '') {
        document.getElementById('pass-error').style.display = 'block';
        document.getElementById('passlogin').focus();
        return false;
    }

    // Tải dữ liệu từ file JSON và kiểm tra thông tin đăng nhập
    fetch('user.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải file JSON');
            }
            return response.json();
        })
        .then(users => {
            const user = users.find(usr => usr.sdt === sdtlogin && usr.password === passlogin);
            if (user) {

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('sdt', user.sdt);
                closeFormOutside();
                checkLoginStatus();

                // Tải lại trang sau khi đăng nhập thành công
                location.reload();  // Tải lại trang để cập nhật giỏ hàng
            } else {
                document.getElementById('error').style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Lỗi khi tải file JSON:", error);

        });


}


function closeFormOutside() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('check').style.display = 'none';


}

function openModal() {
    document.getElementById("check").style.display = "flex";
}

function openModal_dangkythanhcong() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById("dangkythanhcong").style.display = "flex";

}


function closeModal_loginthanhcong() {
    document.getElementById("loginthanhcong").style.display = "none";
}
window.onload = function () {
    checkLoginStatus(); // Kiểm tra trạng thái đăng nhập khi trang tải xong
};












