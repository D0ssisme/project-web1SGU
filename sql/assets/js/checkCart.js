const cartLink = document.getElementById('cartIcon');
cartLink.addEventListener('click', function (event) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        event.preventDefault(); // Ngăn không cho liên kết hoạt động
       
        openModal();
    }
});
