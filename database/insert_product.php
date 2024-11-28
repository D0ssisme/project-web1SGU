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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ form
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $brand = $_POST['brand'];
    $type = $_POST['type'];
    $power = $_POST['power'];
    $speed = $_POST['speed'];
    $highlight = $_POST['highlight'];
    $origin = $_POST['origin'];

    // Xử lý upload ảnh
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        // Lấy thông tin ảnh
        $imageName = $_FILES['image']['name']; // Tên file gốc
        $imageTmp = $_FILES['image']['tmp_name'];

        // Đặt đường dẫn tuyệt đối cho thư mục uploads
        $imageUploadPath = $_SERVER['DOCUMENT_ROOT'] . '/project-web1sgu/assets/Images/products/' . $imageName;

        // Kiểm tra nếu thư mục uploads không tồn tại thì tạo
        if (!file_exists($_SERVER['DOCUMENT_ROOT'] . '/project-web1sgu/assets/Images/products/')) {
            mkdir($_SERVER['DOCUMENT_ROOT'] . '/project-web1sgu/assets/Images/products/', 0777, true); // Tạo thư mục với quyền ghi
        }

        // Di chuyển file ảnh từ thư mục tạm vào thư mục uploads
        if (move_uploaded_file($imageTmp, $imageUploadPath)) {
            // Lưu tên ảnh vào cơ sở dữ liệu
            $image = $imageName; // Lưu tên file gốc
        } else {
            echo "Lỗi khi tải ảnh lên: " . error_get_last()['message'] . "<br>";
            exit;
        }
    } else {
        echo "Vui lòng chọn ảnh.<br>";
        exit;
    }

    // Lấy ID lớn nhất hiện có trong cơ sở dữ liệu
    $id_sql = "SELECT MAX(id) as max_id FROM sanpham";
    $id_result = $conn->query($id_sql);
    $row = $id_result->fetch_assoc();
    $new_id = $row['max_id'] + 1; // Tạo ID mới

    // Câu lệnh SQL thêm sản phẩm vào cơ sở dữ liệu
    $sql = "INSERT INTO sanpham (id, name, description, price, image, brand, type, power, speed, highlight, origin) 
            VALUES ('$new_id', '$name', '$description', '$price', '$image', '$brand', '$type', '$power', '$speed', '$highlight', '$origin')";
    
    if ($conn->query($sql) === TRUE) {
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error . "<br>";
    }

    // Xuất dữ liệu ra file data.js
    $sql = "SELECT * FROM sanpham";
    $result = $conn->query($sql);

    $products = array();

    while ($row = $result->fetch_assoc()) {
        // Định dạng giá theo kiểu 10.000.000
        $row['price'] = number_format($row['price'], 0, '.', '.');
        $products[] = $row;
    }

    // Lưu sản phẩm vào data.js
    file_put_contents('data.js', 'var products = ' . json_encode($products, JSON_PRETTY_PRINT) . ';');
}

$conn->close();
?>