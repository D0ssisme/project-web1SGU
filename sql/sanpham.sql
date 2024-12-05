-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2024 at 01:23 AM
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
(4, 'Quạt lửng Senko thế hệ mới', '- Quạt lửng thiết kế đơn giản, các chi tiết bên ngoài bằng nhựa dễ dàng vệ sinh, khối lượng 4.1 kg nhẹ nhàng khi di chuyển và tháo lắp. 3 cánh quạt đường kính 39 cm tạo luồng gió mát rộng nhanh chóng.\r\nThay đổi chiều cao trong khoảng 75.6 đến 91.5 cm phù hợp với nhu cầu và không gian sử dụng.', 390000.00, 'quattrang.png', 'Senko', 'Quạt lửng', '35', '3', 'Quạt lửng Senko L1638 thiết kế đẹp mắt, tùy chỉnh được chiều cao quạt, làm mát với 3 cánh quạt có công suất 47W, vận hành êm ái với động cơ bạc thau được làm từ chất liệu 100% dây đồng, bền bỉ, ít hao mòn.', 'Vệt Nam'),
(5, 'Quạt hơi nước Coex', 'Công suất 150W tạo lưu lượng gió 3000 m³/h, phù hợp với phòng 30-40m2.Độ ồn dưới mức 55dB tương đương tiếng văn phòng làm việc. Tấm làm mát chất liệu gỗ sồi ép, làm mát hiệu quả và bảo vệ môi trường.', 3290000.00, 'quathoinuoc_1.jpg', 'Coex', 'Quạt hơi nước', '150', '3', 'Bảng điều khiển nút nhấn và núm xoay đơn giản các chức năng tốc độ gió, làm mát, đảo gióTặng kèm 1 cục đá khô giúp giảm nhiệt độ đáng kể và tăng hiệu quả làm mátTiết kiệm điện gấp 10 lần so với điều hòa không khí', 'Trung Quốc'),
(6, 'Quạt lửng Điện cơ', 'Quạt lửng Điện cơ sẽ là một giải pháp vừa hiệu quả vừa tiết kiệm trong những ngày hè oi bức. Sản phẩm này sẽ làm không gian nhà bạn trở nên dịu mát và dễ chịu.', 469000.00, 'quattrang.jpg', 'Vinawind - Ðiện cơ', 'Quạt lửng', '48', '3', 'Phím bấm 3 tốc độ\r\nNúm rút chuyển hướng', 'Việt Nam'),
(7, 'Quạt lửng Asia Turbo One', 'Mùa hè mang đến những đợt nắng gay gắt khiến đầu óc căng thẳng, tinh thần làm việc cũng giảm sút đáng kể. Thời điểm này thì chiếc quạt điện chính là người bạn đồng hành tốt nhất cho bạn và cả gia đình.', 529000.00, 'quatlung_3.png', 'Asia', 'Quạt lửng', '54', '3', 'Lượng gió tải rộng và tốc độ gió cực nhanh lên đến 5.1 m/s,gấp 1.5 lần quạt thường\r\nMotor hoạt động bền bỉ với công nghệ Dual Cooling System (Công nghệ làm mát kép)', 'Việt Nam'),
(8, 'Quạt trần 4 cánh Panasonic', 'Nhờ được áp dụng công nghệ thiết kế tiên tiến, mô tơ và các cánh của quạt trần Panasonic F-56XPG được tối ưu hóa cho hiệu suất hoạt động cao, độ ồn thấp và tiết kiệm điện. Các cánh quạt được thiết kế đặc biệt cho lượng gió tản đều, rộng mà không chém vào không khí do đó không tạo ra tiếng ồn.', 2790000.00, 'qut-trn-4-canh-panasonic-f-56xpg-den-co-diu-khin_8c414d1e.jpg', 'Panasonic', 'Quạt trần', '59', '3', 'Dây nối an toàn, công tắc  ngắt an toàn giúp bảo vệ động cơ\r\n3 cấp độ gió, công suất 59W', 'Malaysia'),
(9, 'Quạt trần 5 cánh Panasonic', 'Công suất 57W (motor: 37W, đèn: 20W)\r\nĐộng cơ DC tiết kiệm điện\r\nTích hợp đèn LED có thể thay đổi theo 4 cấp độ màu sắc ánh sáng\r\n03 cấp độ an toàn (khóa cánh an toàn, dây an toàn, công tắc an toàn) Chức năng tạo gió tự nhiên (1/f Yuragi)', 9590000.00, 'qut-trn-5-canh-panasonic-f-60ufn-den-ledco-diu-khin---malaysia_16852b8b.jpg', 'Panasonic', 'Quạt trần', '57', '3', 'Đường kính cánh 150cm Chiều dài ti 28.8cm \r\nĐộng cơ DC tiết kiệm điện \r\nTích hợp đèn LED có thể thay đổi theo 4 cấp độ màu sắc ánh sáng \r\n03 cấp độ an toàn', 'Malaysia'),
(12, 'Quạt hơi nước Coex (Điều khiển từ xa)', 'Quạt điều hòa Coex có động cơ làm bằng đồng nguyên chất, giúp máy hoạt động bền bỉ. Thân máy làm bằng nhựa ABS bền đẹp, bề mặt sáng bóng, hạn chế bám bụi, dễ dàng vệ sinh. Sản phẩm có kiểu dáng sang trọng, kích thước nhỏ gọn, tiết kiệm diện tích, phù hợp với nhiều không gian khác nhau.', 2199999.00, 'quat-dieu-hoa-coex-ca-7124a-dieu-khien-tu-xa_6b6ef392.png', 'Coex', 'Quạt hơi nước', '100', '3', 'Công suất 100W tạo lưu lượng gió 3200 m³/h, phù hợp với diện tích làm mát 30 - 40 m2. \r\nĐa chức năng LÀM MÁT - TẠO ẨM - TẠO ION LÀM SẠCH KHÔNG KHÍ \r\n3 tốc độ gió bình thường, tự nhiên và chế độ gió nhẹ khi ngủ  \r\n3 mặt lấy gió, lưu lượng gió cực lớn  ', 'Trung Quốc'),
(13, 'Quạt trần 5 cánh Panasonic có điều khiển-ti30-Malaysia', 'Quạt Panasonic có thiết kế hiện đại, màu sắc trang nhã phù hợp với nhiều không gian lớn: phòng khách, phòng ngủ, phòng làm việc, quán ăn hay showroom,... \r\nThiết kế 5 cánh quạt có đường kính 150 cm tạo ra làn gió mát trải rộng giúp xua tan không khí oi bức trong phòng nhanh chóng. ', 4990000.00, 'qut-trn-3-canh-coex-ccf---7111_40889730.jpg', 'Panasonic', 'Quạt trần', '76', '5', 'Quạt Panasonic có thiết kế hiện đại, màu sắc trang nhã phù hợp với nhiều không gian lớn: phòng khách, phòng ngủ, phòng làm việc, quán ăn hay showroom,... ', 'Malaysia'),
(16, 'Quạt hơi nước Coex tạo ẩm-Ion', 'GIẢI PHÁP LÀM MÁT TỐI ƯU\r\nQuạt điều hòa Coex hoạt động dựa trên nguyên lý bay hơi nước tự nhiên. Không khí nóng sau khi đi qua tấm làm mát sẽ cho ra luồng gió mát . Dựa trên nguyên lý đó, sản phẩm có khả năng làm mát trên diện rộng, tiết kiệm điện năng hiệu quả hơn các sản phẩm thông thường.Đặc biệt, Quạt điều hòa Coex làm mát hiệu quả với những không gian mà quạt mát thông thường hay điều hòa không thể phát huy hiệu quả làm mát.', 2999000.00, 'qut-diu-hoa-coex-ca-7121_736c3782.jpg', 'Coex', 'Quạt hơi nước', '200', '3', 'Công suất 200W tạo lưu lượng gió 5000 m³/h, phù hợp với diện tích làm mát 35 - 50 m2.\r\nĐa chức năng LÀM MÁT - TẠO ẨM - TẠO ION LÀM SẠCH KHÔNG KHÍ\r\nĐộ ồn thấp dưới mức ≤65dB không gây tiếng ồn \r\nTấm làm mát chất liệu gỗ sồi ép, làm mát hiệu quả và bảo vệ môi trường.', 'Trung Quốc'),
(17, 'Quạt hơi nước Sunhouse', 'Máy làm mát không khí SUNHOUSE hoạt động dựa trên nguyên lý bay hơi nước tự nhiên. Không khí nóng sau khi đi qua tấm làm mát sẽ cho ra luồng gió mát . Dựa trên nguyên lý đó, sản phẩm có khả năng làm mát trên diện rộng, tiết kiệm điện năng hiệu quả hơn các sản phẩm thông thường.', 1990000.00, 'quat-dieu-hoa-sunhouse-shd7734-05I3uT.png', 'Sunhouse', 'Quạt hơi nước', '150', '3', 'Giải pháp làm mát tối ưu và tiết kiệm điện cho không gian mở (lên đến 35m2)\r\nGió mát tự nhiên, thân thiện với sức khỏe\r\n3 mặt lấy gió, lưu lượng gió cực lớn – lên đến 4.000m3/giờ', 'Trung Quốc'),
(18, 'Quạt trần 3 cánh Coex CCF', 'Quạt trần 3 cánh Coex CCF có thiết kế tinh tế với màu trắng viền vàng thời trang, phong cách vừa cổ điển, vừa hiện đại. Quạt không chỉ làm mát mà còn giúp trang trí nội thất cho căn phòng. Đặc biệt, quạt trần COEX có khuyến mại kèm MÓC TREO áp trần, thao tác lắp đặt đơn giản chỉ cần bắn thêm VÍT NỞ là sử dụng được ngay. Đây là ưu điểm hơn hẳn các nhãn khác cùng phân khúc giá thành.', 1990000.00, 'qut-trn-3-canh-coex-ccf---7112_847867da.jpg', 'Coex', 'Quạt trần', '80', '5', 'Công suât 80W luồng gió mạnh mẽ và phân bố đều.\r\nMotor 100% lõi đồng, tăng tuổi thọ, vận hành êm ái.\r\n3 cánh quạt đường kính quạt 140cm, sải cánh lớn, luồng gió lan tỏa trên phạm vi rộng và phân tán gió đều .\r\n5 tốc độ gió đáp ứng nhu cầu làm mát khác nhau.\r\nDây an toàn đề phòng cánh quạt và motor bị rơi.\r\nTự ngắt bảo vệ động cơ khi quá nhiệt, quá nóng.', 'Trung Quốc'),
(19, 'Quạt trần 3 cánh Coex CCF (Điều khiển từ xa)', 'Quạt trần 3 cánh Coex CCF  có thiết kế tinh tế với màu trắng thời trang, phong cách vừa cổ điển, vừa hiện đại. Quạt không chỉ làm mát mà còn giúp trang trí nội thất cho căn phòng. Đặc biệt, quạt trần COEX có khuyến mại kèm MÓC TREO áp trần, thao tác lắp đặt đơn giản chỉ cần bắn thêm VÍT NỞ là sử dụng được ngay. Đây là ưu điểm hơn hẳn các nhãn khác cùng phân khúc giá thành.', 2999000.00, 'quat-tran-3-canh-coex-ccf---7113a-co-dieu-khien_87629938.png', 'Coex', 'Quạt trần', '90', '5', 'Công suât 90W luồng gió mạnh mẽ và phân bố đều.\r\nMotor 100% lõi đồng, tăng tuổi thọ, vận hành êm ái.\r\n3 cánh quạt đường kính quạt 150cm, sải cánh lớn, luồng gió lan tỏa trên phạm vi rộng và phân tán gió đều .\r\n5 tốc độ gió đáp ứng nhu cầu làm mát khác nhau.', 'Trung Quốc'),
(20, 'Quạt lửng DC 360 độ Mitsubishi', 'Quạt lửng cao cấp Mitsubishi R12A-DA với 7 cánh sải rộng 30cm cho luồng gió rộng. Quạt quay trái phải và đảo chiều giúp làn gió lan tỏa ra không gian rộng nhanh chóng đem lại bầu không khí mát mẻ dễ chịu. Ngoài ra, Tính năng kép: Kết hợp với chế độ làm mát và lưu thông không khí đem đến sự thoải mái cho không gian sống của bạn.', 6890000.00, 'quat-cay-hitachi-lf-d6rcwm-mau-trang---co-dieu-khien_d81977ea.png', 'Mitsubishi', 'Quạt lửng', '30', '3', 'DC Motor hoạt động yên tĩnh và tiết kiệm năng lượng.\r\nMức tiêu thụ năng lượng tối đa chỉ 13W.\r\nĐiều chỉnh công suất gió lên tới 5 cấp.\r\nĐiều chỉnh độ cao thành 2 mức (102 cm và 58 cm).', 'Thái Lan'),
(21, 'Quạt lửng tích điện Coex', 'Quạt sạc Quạt tích điện Coex có thiết kế nhỏ gọn, sử dụng pin sạc chất lượng cao, hoạt động liên tục trong 5-16 giờ (tùy tốc độ) giúp làm mát hiệu quả cho cả gia đình bạn trong những lúc mất điện. Sản phẩm có thể tùy chỉnh độ cao linh hoạt và được trang bị đến 3 tốc độ gió THẤP/TRUNG/CAO đáp ứng nhu cầu làm mát khác nhau, sử dụng phù hợp cho cả trẻ nhỏ, người già có hệ hô hấp yếu.', 1390000.00, 'quat-tich-dien-coex---cf-7114r_eb554245.png', 'Coex', 'Quạt lửng', '24', '3', 'Quay đảo chiều, gió tản đều.Thời gian sạc đầy 12 - 15 giờ.Dung lượng pin lớn, hoạt động liên tục trong 5 - 16 giờ tùy tốc độTích hợp đèn ngủ 2 trong 1.Động cơ bền – Vận hành êm ái.Thiết kế nhỏ gọn, làm mát mọi lúc mọi nơi.', 'Trung Quốc'),
(22, 'Quạt hơi nước Coex tạo ẩm cao cấp', 'Quạt điều hoà Coex dễ dàng di chuyển với bánh xe, làm mát hiệu quả cho không gian phòng từ 45 - 55m2, dễ dàng điều chỉnh tốc độ gió bằng núm xoay, trang bị công nghệ diệt khuẩn Ag+ cho không khí tươi mát, tốt cho sức khỏe.', 1677000.00, 'qut-diu-hoa-coex-ca-7121_16194536.png', 'Coex', 'Quạt hơi nước', '175', '3', 'Thiết kế hiện đại, bình chứa nước 72 lít, có bánh xe di chuyển dễ dàng.\r\nCông suất 175W phù hợp làm mát cho phòng từ 45 - 55m2.\r\nĐi kèm 2 đá khô hỗ trợ làm mát nhanh chóng.\r\nThương hiệu Daikiosan - Việt Nam, sản xuất tại Trung Quốc.', 'Trung Quốc'),
(23, 'Quạt lửng Hatari HT-điều khiển-Thailand', 'Nổi bật bởi khả năng làm mát nhanh, tản gió mạnh, động cơ bạc động hoạt đông êm ái, bền bỉ cùng thời gian, trang bị điều khiển từ xa thông minh, sản xuất tại Thái Lan, độ bền cao, quạt lửng Hatari HT chính là sản phẩm mà bạn không thể bỏ lỡ trong mùa hè này.\r\nCùng Hatari tìm hiểu chiếc quạt lửng đáng mua này nhé!', 1299000.00, 'quat-lung-hatari-ht-s16r2-dieu-khien-thailand_f3c7dc76.png', 'Hatari', 'Quạt lửng', '50', '3', 'Điều chỉnh độ cao dễ dàng.\r\nCó đèn giúp người dùng dễ dàng sử dụng quạt vào ban đêm.\r\nAn toàn với sức khỏe người dùng, thân thiện với môi trường.', 'Thái Lan');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
