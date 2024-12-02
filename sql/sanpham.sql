-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2024 at 02:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `power` varchar(100) DEFAULT NULL,
  `speed` varchar(100) DEFAULT NULL,
  `highlight` text DEFAULT NULL,
  `origin` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`id`, `name`, `description`, `price`, `image`, `brand`, `type`, `power`, `speed`, `highlight`, `origin`) VALUES
(1, 'Quạt lửng Senko', 'Quạt lửng Senko L1638 thiết kế đẹp mắt, tùy chỉnh được chiều cao quạt, làm mát với 3 cánh quạt có công suất 47W, vận hành êm ái với động cơ bạc thau được làm từ chất liệu 100% dây đồng, bền bỉ, ít hao mòn.', 299000.00, 'quatlung_2.png', 'Senko', 'Quạt lửng', '47', '3', 'Quạt lửng Senko L1638 thiết kế đẹp mắt, tùy chỉnh được chiều cao quạt, làm mát với 3 cánh quạt có công suất 47W, vận hành êm ái với động cơ bạc thau được làm từ chất liệu 100% dây đồng, bền bỉ, ít hao mòn.', 'Việt Nam'),
(2, 'Quạt hơi nước Coex cao cấp', 'Công suất 130W tạo lưu lượng gió 5000 m³/h, phù hợp với diện tích làm mát 35 - 50 m2.\r\nĐa chức năng LÀM MÁT - TẠO ẨM - TẠO ION LÀM SẠCH KHÔNG KHÍ\r\n3 tốc độ gió bình thường, tự nhiên và chế độ gió nhẹ khi ngủ ', 2390000.00, 'hoinuoc_2.png', 'Coex', 'Quạt hơi nước', '139', '3', 'Thang đo mực nước, tiện cho bạn theo dõi lượng nước trong bình\r\nTrang bị 2 cục đá khô giúp giảm nhiệt độ đáng kể và tăng hiệu quả làm mát\r\nTiết kiệm điện gấp 10 lần so với điều hòa không khí', 'Trung Quốc'),
(4, 'Quạt lửng Senko thế hệ mới', '- Quạt lửng thiết kế đơn giản, các chi tiết bên ngoài bằng nhựa dễ dàng vệ sinh, khối lượng 4.1 kg nhẹ nhàng khi di chuyển và tháo lắp. 3 cánh quạt đường kính 39 cm tạo luồng gió mát rộng nhanh chóng.\r\nThay đổi chiều cao trong khoảng 75.6 đến 91.5 cm phù hợp với nhu cầu và không gian sử dụng.', 39000000.00, 'quattrang.png', 'Senko', 'Quạt lửng', '35', '3', 'Chất lượng', 'Vệt Nam'),
(5, 'Quạt hơi nước Coex', 'Công suất 150W tạo lưu lượng gió 3000 m³/h, phù hợp với phòng 30-40m2.Độ ồn dưới mức 55dB tương đương tiếng văn phòng làm việc. Tấm làm mát chất liệu gỗ sồi ép, làm mát hiệu quả và bảo vệ môi trường.', 3290000.00, 'quathoinuoc_1.jpg', 'Coex', 'Quạt hơi nước', '150', '3', 'Bảng điều khiển nút nhấn và núm xoay đơn giản các chức năng tốc độ gió, làm mát, đảo gióTặng kèm 1 cục đá khô giúp giảm nhiệt độ đáng kể và tăng hiệu quả làm mátTiết kiệm điện gấp 10 lần so với điều hòa không khí', 'Trung Quốc'),
(6, 'Quạt lửng Điện cơ', 'Quạt lửng Điện cơ sẽ là một giải pháp vừa hiệu quả vừa tiết kiệm trong những ngày hè oi bức. Sản phẩm này sẽ làm không gian nhà bạn trở nên dịu mát và dễ chịu.', 469000.00, 'quattrang.jpg', 'Vinawind - Ðiện cơ', 'Quạt lửng', '48', '3', 'Phím bấm 3 tốc độ\r\nNúm rút chuyển hướng', 'Việt Nam'),
(7, 'Quạt lửng Asia Turbo One', 'Mùa hè mang đến những đợt nắng gay gắt khiến đầu óc căng thẳng, tinh thần làm việc cũng giảm sút đáng kể. Thời điểm này thì chiếc quạt điện chính là người bạn đồng hành tốt nhất cho bạn và cả gia đình.', 529000.00, 'quatlung_3.png', 'Asia', 'Quạt lửng', '54', '3', 'Lượng gió tải rộng và tốc độ gió cực nhanh lên đến 5.1 m/s,gấp 1.5 lần quạt thường\r\nMotor hoạt động bền bỉ với công nghệ Dual Cooling System (Công nghệ làm mát kép)', 'Việt Nam'),
(8, 'Quạt trần 4 cánh Panasonic', 'Nhờ được áp dụng công nghệ thiết kế tiên tiến, mô tơ và các cánh của quạt trần Panasonic F-56XPG được tối ưu hóa cho hiệu suất hoạt động cao, độ ồn thấp và tiết kiệm điện. Các cánh quạt được thiết kế đặc biệt cho lượng gió tản đều, rộng mà không chém vào không khí do đó không tạo ra tiếng ồn.', 2790000.00, 'qut-trn-4-canh-panasonic-f-56xpg-den-co-diu-khin_8c414d1e.jpg', 'Panasonic', 'Quạt trần', '59', '3', 'Dây nối an toàn, công tắc  ngắt an toàn giúp bảo vệ động cơ\r\n3 cấp độ gió, công suất 59W', 'Malaysia'),
(9, 'Quạt trần 5 cánh Panasonic', 'Công suất 57W (motor: 37W, đèn: 20W)\r\nĐộng cơ DC tiết kiệm điện\r\nTích hợp đèn LED có thể thay đổi theo 4 cấp độ màu sắc ánh sáng\r\n03 cấp độ an toàn (khóa cánh an toàn, dây an toàn, công tắc an toàn) Chức năng tạo gió tự nhiên (1/f Yuragi)', 9590000.00, 'qut-trn-5-canh-panasonic-f-60ufn-den-ledco-diu-khin---malaysia_16852b8b.jpg', 'Panasonic', 'Quạt trần', '57', '3', 'Đường kính cánh 150cm Chiều dài ti 28.8cm \r\nĐộng cơ DC tiết kiệm điện \r\nTích hợp đèn LED có thể thay đổi theo 4 cấp độ màu sắc ánh sáng \r\n03 cấp độ an toàn', 'Malaysia'),
(12, 'Quạt hơi nước Coex (Điều khiển từ xa)', 'Quạt điều hòa Coex có động cơ làm bằng đồng nguyên chất, giúp máy hoạt động bền bỉ. Thân máy làm bằng nhựa ABS bền đẹp, bề mặt sáng bóng, hạn chế bám bụi, dễ dàng vệ sinh. Sản phẩm có kiểu dáng sang trọng, kích thước nhỏ gọn, tiết kiệm diện tích, phù hợp với nhiều không gian khác nhau.', 2199999.00, 'quat-dieu-hoa-coex-ca-7124a-dieu-khien-tu-xa_6b6ef392.png', 'Coex', 'Quạt hơi nước', '100', '3', 'Công suất 100W tạo lưu lượng gió 3200 m³/h, phù hợp với diện tích làm mát 30 - 40 m2. \r\nĐa chức năng LÀM MÁT - TẠO ẨM - TẠO ION LÀM SẠCH KHÔNG KHÍ \r\n3 tốc độ gió bình thường, tự nhiên và chế độ gió nhẹ khi ngủ  \r\n3 mặt lấy gió, lưu lượng gió cực lớn  ', 'Trung Quốc'),
(13, 'Quạt trần 5 cánh Panasonic có điều khiển-ti30-Malaysia', 'Quạt Panasonic có thiết kế hiện đại, màu sắc trang nhã phù hợp với nhiều không gian lớn: phòng khách, phòng ngủ, phòng làm việc, quán ăn hay showroom,... \r\nThiết kế 5 cánh quạt có đường kính 150 cm tạo ra làn gió mát trải rộng giúp xua tan không khí oi bức trong phòng nhanh chóng. ', 4990000.00, 'qut-trn-3-canh-coex-ccf---7111_40889730.jpg', 'Panasonic', 'Quạt trần', '76', '5', 'Quạt Panasonic có thiết kế hiện đại, màu sắc trang nhã phù hợp với nhiều không gian lớn: phòng khách, phòng ngủ, phòng làm việc, quán ăn hay showroom,... ', 'Malaysia'),
(15, 'Quạt Trần Luxuryfan Minka Arie Uchiwa', 'Dòng quạt Uchiwa là những mẫu quạt trần đặc biệt nhất của thương hiệu Minka Aire – thương hiệu của Mỹ đi đầu trong sản xuất và phân phối các mẫu quạt trần hàng đầu thế giới. Trong gần 50 năm qua, công ty của George Kovacs luôn mang đến cho thị trường những sản phẩm đậm chất sáng tạo và thơ mộng.', 14280000.00, 'qut-trn-luxuryfan-minka-arie-uchiwa-f824-25d-orbtb_b5b71fb5.jpg', 'LuxuryFan', 'Quạt trần', '38', '5', 'Phong cách Hiện đại, Thân quạt Màu nâu tối (Oil Rubbed Bronze/Toned Brass)\r\nCánh quạt Cánh Composite. \r\nSải cánh 142 cm\r\nĐộng cơ DC Motor 38WLưu lượng gió 5996 CFM\r\nĐèn G9 Max 60WĐiều khiển Remote chính hãng', 'Trung Quốc'),
(16, 'Quạt hơi nước Coex tạo ẩm-Ion', 'GIẢI PHÁP LÀM MÁT TỐI ƯU\r\nQuạt điều hòa Coex hoạt động dựa trên nguyên lý bay hơi nước tự nhiên. Không khí nóng sau khi đi qua tấm làm mát sẽ cho ra luồng gió mát . Dựa trên nguyên lý đó, sản phẩm có khả năng làm mát trên diện rộng, tiết kiệm điện năng hiệu quả hơn các sản phẩm thông thường.Đặc biệt, Quạt điều hòa Coex làm mát hiệu quả với những không gian mà quạt mát thông thường hay điều hòa không thể phát huy hiệu quả làm mát.', 2999000.00, 'qut-diu-hoa-coex-ca-7121_736c3782.jpg', 'Coex', 'Quạt hơi nước', '200', '3', 'Công suất 200W tạo lưu lượng gió 5000 m³/h, phù hợp với diện tích làm mát 35 - 50 m2.\r\nĐa chức năng LÀM MÁT - TẠO ẨM - TẠO ION LÀM SẠCH KHÔNG KHÍ\r\nĐộ ồn thấp dưới mức ≤65dB không gây tiếng ồn \r\nTấm làm mát chất liệu gỗ sồi ép, làm mát hiệu quả và bảo vệ môi trường.', 'Trung Quốc'),
(17, 'Quạt hơi nước Sunhouse', 'Máy làm mát không khí SUNHOUSE hoạt động dựa trên nguyên lý bay hơi nước tự nhiên. Không khí nóng sau khi đi qua tấm làm mát sẽ cho ra luồng gió mát . Dựa trên nguyên lý đó, sản phẩm có khả năng làm mát trên diện rộng, tiết kiệm điện năng hiệu quả hơn các sản phẩm thông thường.', 1990000.00, 'quat-dieu-hoa-sunhouse-shd7734-05I3uT.png', 'Sunhouse', 'Quạt hơi nước', '150', '3', 'Giải pháp làm mát tối ưu và tiết kiệm điện cho không gian mở (lên đến 35m2)\r\nGió mát tự nhiên, thân thiện với sức khỏe\r\n3 mặt lấy gió, lưu lượng gió cực lớn – lên đến 4.000m3/giờ', 'Trung Quốc');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
