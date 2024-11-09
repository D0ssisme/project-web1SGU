const gioithieu = document.querySelector(".gioithieu");
const thongso = document.querySelector(".thongso");
const noibat = document.querySelector(".noibat");

if (gioithieu) {
    gioithieu.addEventListener("click", function() {
        document.querySelector(".container__product-right-Thongso").style.display = "none";
        document.querySelector(".container__product-right-uudiem").style.display = "none";
        document.querySelector(".container__product-right-gioithieu").style.display = "block";
    });
}

if (thongso) {
    thongso.addEventListener("click", function() {
        document.querySelector(".container__product-right-Thongso").style.display = "block";
        document.querySelector(".container__product-right-uudiem").style.display = "none";
        document.querySelector(".container__product-right-gioithieu").style.display = "none";
    });
}

if (noibat) {
    noibat.addEventListener("click", function() {
        document.querySelector(".container__product-right-Thongso").style.display = "none";
        document.querySelector(".container__product-right-uudiem").style.display = "block";
        document.querySelector(".container__product-right-gioithieu").style.display = "none";
    });
}
