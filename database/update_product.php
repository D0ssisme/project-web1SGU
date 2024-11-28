<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Kết nối thất bại: ' . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id = $_POST['editId'] ?? null;

    if ($id === null) {
        echo json_encode(['error' => 'ID sản phẩm không hợp lệ.']);
        exit;
    }

    // Lấy thông tin từ form
    $name = $_POST['editName'] ?? '';
    $description = $_POST['editDescription'] ?? '';
    $price = $_POST['editPrice'] ?? 0;
    $brand = $_POST['editBrand'] ?? '';
    $type = $_POST['editType'] ?? '';
    $power = $_POST['editPower'] ?? '';
    $speed = $_POST['editSpeed'] ?? '';
    $highlight = $_POST['editHighlight'] ?? '';
    $origin = $_POST['editOrigin'] ?? '';
    
    // Lấy ảnh cũ từ cơ sở dữ liệu nếu có
    $existingImage = null;
    $result = $conn->query("SELECT image FROM sanpham WHERE id = $id");

    if ($result && $row = $result->fetch_assoc()) {
        $existingImage = $row['image'];
    }

    // Xử lý upload hình ảnh nếu có ảnh mới
    $image = $existingImage;  // Mặc định sử dụng ảnh cũ

    if (isset($_FILES['editImage']) && $_FILES['editImage']['error'] == 0) {
        // Xử lý ảnh mới
        $imageName = $_FILES['editImage']['name'];
        $imageTmp = $_FILES['editImage']['tmp_name'];
        $imageUploadPath = $_SERVER['DOCUMENT_ROOT'] . '/project-web1sgu/assets/Images/products/' . basename($imageName);

        // Kiểm tra thư mục upload và tạo thư mục nếu chưa có
        if (!file_exists($_SERVER['DOCUMENT_ROOT'] . '/project-web1sgu/assets/Images/products/')) {
            mkdir($_SERVER['DOCUMENT_ROOT'] . '/project-web1sgu/assets/Images/products/', 0777, true);
        }

        // Kiểm tra loại file (chỉ cho phép ảnh)
        $imageType = mime_content_type($imageTmp);
        if (strpos($imageType, 'image/') !== 0) {
            echo json_encode(['error' => 'Vui lòng chọn một file ảnh hợp lệ.']);
            exit;
        }

        // Di chuyển ảnh vào thư mục upload
        if (move_uploaded_file($imageTmp, $imageUploadPath)) {
            $image = basename($imageName);  // Cập nhật ảnh mới
        } else {
            echo json_encode(['error' => 'Lỗi khi tải ảnh lên.']);
            exit;
        }
    }

    // Cập nhật thông tin sản phẩm
    if ($image) {
        // Nếu có ảnh mới, cập nhật ảnh
        $stmt = $conn->prepare("UPDATE sanpham SET name = ?, description = ?, price = ?, image = ?, brand = ?, type = ?, power = ?, speed = ?, highlight = ?, origin = ? WHERE id = ?");
        $stmt->bind_param("ssdsssssssi", $name, $description, $price, $image, $brand, $type, $power, $speed, $highlight, $origin, $id);
    } else {
        // Nếu không có ảnh mới, chỉ cập nhật thông tin khác
        $stmt = $conn->prepare("UPDATE sanpham SET name = ?, description = ?, price = ?, brand = ?, type = ?, power = ?, speed = ?, highlight = ?, origin = ? WHERE id = ?");
        $stmt->bind_param("ssdssssssi", $name, $description, $price, $brand, $type, $power, $speed, $highlight, $origin, $id);
    }

    // Thực hiện câu truy vấn và trả về kết quả
    if ($stmt->execute()) {
        echo json_encode(['success' => 'Sản phẩm đã được cập nhật thành công!']);
    } else {
        echo json_encode(['error' => 'Lỗi cập nhật sản phẩm: ' . $stmt->error]);
    }

    $stmt->close();

    // Cập nhật lại file data.js
    $sql = "SELECT * FROM sanpham";
    $result = $conn->query($sql);
    $products = [];

    while ($row = $result->fetch_assoc()) {
        $row['price'] = number_format($row['price'], 0, '.', '.');
        $products[] = $row;
    }

    // Ghi lại dữ liệu sản phẩm vào file data.js
    file_put_contents('data.js', 'var products = ' . json_encode($products, JSON_PRETTY_PRINT) . ';');
}

$conn->close();
?>
