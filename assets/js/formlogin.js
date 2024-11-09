function showForm(formType) {
    if (formType === 'register') {
        document.getElementById('registerForm').style.display = 'flex';
        document.getElementById('loginForm').style.display = 'none';
    } else if (formType === 'login') {
        document.getElementById('loginForm').style.display = 'flex';
        document.getElementById('registerForm').style.display = 'none';
    }
}

function closeForm(formType) {
    if (formType === 'register') {
        document.getElementById('registerForm').style.display = 'none';
    } else if (formType === 'login') {
        document.getElementById('loginForm').style.display = 'none';
    }
}
