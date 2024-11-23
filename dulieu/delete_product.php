<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydatabase";

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

// Kiểm tra dữ liệu ID có được gửi và hợp lệ hay không
if (isset($data['id']) && !empty($data['id'])) {
    $id = $data['id'];

    // Kiểm tra ID có phải là chuỗi và không phải là chuỗi rỗng
    if (is_string($id) && !empty($id)) {
        // Sử dụng Prepared Statements để tránh SQL Injection
        $stmt = $conn->prepare("DELETE FROM sanpham WHERE id = ?");
        $stmt->bind_param("s", $id);

        if ($stmt->execute()) {
            echo "Sản phẩm đã xóa thành công";

            // Cập nhật lại data.js sau khi xóa
            $sql = "SELECT * FROM sanpham";
            $result = $conn->query($sql);

            $products = array();

            while($row = $result->fetch_assoc()) {
                $products[] = $row;
            }

            // Cập nhật lại nội dung trong file data.js
            if (file_put_contents('data.js', 'var products = ' . json_encode($products, JSON_PRETTY_PRINT) . ';')) {
            } else {
                echo "Lỗi khi cập nhật file data.js.<br>";
            }

        } else {
            echo "Lỗi xóa sản phẩm: " . $stmt->error . "<br>";
        }

        $stmt->close();
    } else {
        echo "ID không hợp lệ: $id<br>";  // Hiển thị ID nhận được
    }
} else {
    echo "Không có ID sản phẩm để xóa.<br>";
}

$conn->close();
?>
