// Dữ liệu sản phẩm cho tất cả các trang
const productsData = {
    'quan-bong-da-nam': [
        {id: 1, name: 'Quần Bóng Đá Nike Dri-FIT', price: 450000, category: 'quan', sport: 'bongda', image: '../img/product_1.jpg'},
        {id: 2, name: 'Quần Bóng Đá Adidas Essentials', price: 380000, category: 'quan', sport: 'bongda', image: '../img/product_2.jpg'},
        {id: 3, name: 'Quần Bóng Đá Puma Performance', price: 420000, category: 'quan', sport: 'bongda', image: '../img/product_3.jpg'},
        {id: 4, name: 'Quần Bóng Đá Lotto Classic', price: 320000, category: 'quan', sport: 'bongda', image: '../img/product_4.jpg'},
        {id: 5, name: 'Quần Bóng Đá Manchester United', price: 550000, category: 'quan', sport: 'bongda', image: '../img/product_5.jpg'},
        {id: 6, name: 'Quần Bóng Đá Futsal Pro', price: 380000, category: 'quan', sport: 'bongda', image: '../img/product_6.jpg'}
    ],
    'quan-bong-ro-nam': [
        {id: 7, name: 'Quần Bóng Rổ Nike Dri-FIT', price: 480000, category: 'quan', sport: 'bongro', image: '../img/product_7.jpg'},
        {id: 8, name: 'Quần Bóng Rổ Adidas Essentials', price: 420000, category: 'quan', sport: 'bongro', image: '../img/product_8.jpg'},
        {id: 9, name: 'Quần Bóng Rổ Puma Basketball', price: 450000, category: 'quan', sport: 'bongro', image: '../img/product_9.jpg'},
        {id: 10, name: 'Quần Bóng Rổ Peak Sport', price: 380000, category: 'quan', sport: 'bongro', image: '../img/product_10.jpg'},
        {id: 11, name: 'Quần Bóng Rổ Spalding NBA', price: 520000, category: 'quan', sport: 'bongro', image: '../img/product_11.jpg'},
        {id: 12, name: 'Quần Bóng Rổ Lotto Performance', price: 350000, category: 'quan', sport: 'bongro', image: '../img/product_12.jpg'}
    ],
    'quan-chay-bo': [
        {id: 13, name: 'Quần Chạy Bộ Nike Flex', price: 420000, category: 'quan', sport: 'chaybo', image: '../img/product_13.jpg'},
        {id: 14, name: 'Quần Chạy Bộ Adidas Running', price: 380000, category: 'quan', sport: 'chaybo', image: '../img/product_14.jpg'},
        {id: 15, name: 'Quần Chạy Bộ Puma Swift', price: 400000, category: 'quan', sport: 'chaybo', image: '../img/product_15.jpg'},
        {id: 16, name: 'Quần Chạy Bộ Asics Lite', price: 450000, category: 'quan', sport: 'chaybo', image: '../img/product_16.jpg'},
        {id: 17, name: 'Quần Chạy Bộ New Balance', price: 480000, category: 'quan', sport: 'chaybo', image: '../img/product_17.jpg'},
        {id: 18, name: 'Quần Chạy Bộ Under Armour Speedpocket', price: 380000, category: 'quan', sport: 'chaybo', image: '../img/product_18.jpg'}
    ],
    'quan-tap-gym': [
        {id: 19, name: 'Quần Tập Gym Nike Flex', price: 420000, category: 'quan', sport: 'tapgym', image: '../img/product_19.jpg'},
        {id: 20, name: 'Quần Tập Gym Adidas Essentials', price: 380000, category: 'quan', sport: 'tapgym', image: '../img/product_20.jpg'},
        {id: 21, name: 'Quần Tập Gym Under Armour', price: 480000, category: 'quan', sport: 'tapgym', image: '../img/product_21.jpg'},
        {id: 22, name: 'Quần Tập Gym Puma Essential', price: 400000, category: 'quan', sport: 'tapgym', image: '../img/product_22.jpg'},
        {id: 23, name: 'Quần Tập Gym Lululemon', price: 680000, category: 'quan', sport: 'tapgym', image: '../img/product_23.jpg'},
        {id: 24, name: 'Quần Tập Gym Reebok', price: 380000, category: 'quan', sport: 'tapgym', image: '../img/product_24.jpg'}
    ],
    'quan-dap-xe': [
        {id: 25, name: 'Quần Đạp Xe Nike Pro', price: 680000, category: 'quan', sport: 'dapxe', image: '../img/product_25.jpg'},
        {id: 26, name: 'Quần Đạp Xe Adidas Performance', price: 650000, category: 'quan', sport: 'dapxe', image: '../img/product_26.jpg'},
        {id: 27, name: 'Quần Đạp Xe Shimano', price: 720000, category: 'quan', sport: 'dapxe', image: '../img/product_27.jpg'},
        {id: 28, name: 'Quần Đạp Xe Pearl Izumi', price: 700000, category: 'quan', sport: 'dapxe', image: '../img/product_28.jpg'},
        {id: 29, name: 'Quần Đạp Xe Castelli', price: 750000, category: 'quan', sport: 'dapxe', image: '../img/product_29.jpg'},
        {id: 30, name: 'Quần Đạp Xe Trek', price: 620000, category: 'quan', sport: 'dapxe', image: '../img/product_30.jpg'}
    ],
    'quan-cau-long': [
        {id: 31, name: 'Quần Cầu Lông Yonex', price: 480000, category: 'quan', sport: 'caulong', image: '../img/product_31.jpg'},
        {id: 32, name: 'Quần Cầu Lông Victor', price: 450000, category: 'quan', sport: 'caulong', image: '../img/product_32.jpg'},
        {id: 33, name: 'Quần Cầu Lông Adidas', price: 420000, category: 'quan', sport: 'caulong', image: '../img/product_33.jpg'},
        {id: 34, name: 'Quần Cầu Lông Lining', price: 520000, category: 'quan', sport: 'caulong', image: '../img/product_34.jpg'},
        {id: 35, name: 'Quần Cầu Lông Babolat', price: 380000, category: 'quan', sport: 'caulong', image: '../img/product_35.jpg'},
        {id: 36, name: 'Quần Cầu Lông Dunlop', price: 450000, category: 'quan', sport: 'caulong', image: '../img/product_36.jpg'}
    ],
    'ao-bong-da-nam': [
        {id: 37, name: 'Áo Bóng Đá Nike Breathe', price: 580000, category: 'ao', sport: 'bongda', image: '../img/product_37.jpg'},
        {id: 38, name: 'Áo Bóng Đá Adidas Entrada', price: 450000, category: 'ao', sport: 'bongda', image: '../img/product_38.jpg'},
        {id: 39, name: 'Áo Bóng Đá Puma Team', price: 480000, category: 'ao', sport: 'bongda', image: '../img/product_39.jpg'},
        {id: 40, name: 'Áo Manchester United', price: 650000, category: 'ao', sport: 'bongda', image: '../img/product_40.jpg'},
        {id: 41, name: 'Áo Liverpool', price: 680000, category: 'ao', sport: 'bongda', image: '../img/product_41.jpg'},
        {id: 42, name: 'Áo Real Madrid', price: 680000, category: 'ao', sport: 'bongda', image: '../img/product_42.jpg'}
    ],
    'ao-bong-ro-nam': [
        {id: 43, name: 'Áo Bóng Rổ Nike Dri-FIT', price: 520000, category: 'ao', sport: 'bongro', image: '../img/product_43.jpg'},
        {id: 44, name: 'Áo Bóng Rổ Adidas Basketball', price: 450000, category: 'ao', sport: 'bongro', image: '../img/product_44.jpg'},
        {id: 45, name: 'Áo Bóng Rổ Spalding Elite', price: 480000, category: 'ao', sport: 'bongro', image: '../img/product_45.jpg'},
        {id: 46, name: 'Áo Bóng Rổ Peak', price: 420000, category: 'ao', sport: 'bongro', image: '../img/product_46.jpg'},
        {id: 47, name: 'Áo Bóng Rổ Puma', price: 450000, category: 'ao', sport: 'bongro', image: '../img/product_47.jpg'},
        {id: 48, name: 'Áo Bóng Rổ Under Armour', price: 620000, category: 'ao', sport: 'bongro', image: '../img/product_48.jpg'}
    ],
    'ao-tap-luyen': [
        {id: 49, name: 'Áo Tập Luyện Nike Flex', price: 480000, category: 'ao', sport: 'taplyuen', image: '../img/product_49.jpg'},
        {id: 50, name: 'Áo Tập Luyện Adidas', price: 420000, category: 'ao', sport: 'taplyuen', image: '../img/product_50.jpg'},
        {id: 51, name: 'Áo Tập Luyện Under Armour', price: 520000, category: 'ao', sport: 'taplyuen', image: '../img/product_51.jpg'},
        {id: 52, name: 'Áo Tập Luyện Puma', price: 450000, category: 'ao', sport: 'taplyuen', image: '../img/product_52.jpg'},
        {id: 53, name: 'Áo Tập Luyện Reebok', price: 480000, category: 'ao', sport: 'taplyuen', image: '../img/product_53.jpg'},
        {id: 54, name: 'Áo Tập Luyện Lululemon', price: 680000, category: 'ao', sport: 'taplyuen', image: '../img/product_54.jpg'}
    ],
    'ao-dong-phuc': [
        {id: 55, name: 'Áo Đồng Phục Học Sinh', price: 320000, category: 'ao', sport: 'dongphuc', image: '../img/product_55.jpg'},
        {id: 56, name: 'Áo Đồng Phục Công Ty', price: 380000, category: 'ao', sport: 'dongphuc', image: '../img/product_56.jpg'},
        {id: 57, name: 'Áo Đồng Phục Bác Sĩ', price: 420000, category: 'ao', sport: 'dongphuc', image: '../img/product_57.jpg'},
        {id: 58, name: 'Áo Đồng Phục Spa', price: 350000, category: 'ao', sport: 'dongphuc', image: '../img/product_58.jpg'},
        {id: 59, name: 'Áo Đồng Phục Nhà Hàng', price: 380000, category: 'ao', sport: 'dongphuc', image: '../img/product_59.jpg'},
        {id: 60, name: 'Áo Đồng Phục Công Nhân', price: 450000, category: 'ao', sport: 'dongphuc', image: '../img/product_60.jpg'}
    ],
    'ao-thoi-trang-the-thao': [
        {id: 61, name: 'Áo Thời Trang Nike Sportswear', price: 520000, category: 'ao', sport: 'thoitrangthethao', image: '../img/product_61.jpg'},
        {id: 62, name: 'Áo Thời Trang Adidas', price: 450000, category: 'ao', sport: 'thoitrangthethao', image: '../img/product_62.jpg'},
        {id: 63, name: 'Áo Thời Trang Puma', price: 480000, category: 'ao', sport: 'thoitrangthethao', image: '../img/product_63.jpg'},
        {id: 64, name: 'Áo Thời Trang Reebok', price: 420000, category: 'ao', sport: 'thoitrangthethao', image: '../img/product_64.jpg'},
        {id: 65, name: 'Áo Thời Trang Under Armour', price: 540000, category: 'ao', sport: 'thoitrangthethao', image: '../img/product_65.jpg'},
        {id: 66, name: 'Áo Thời Trang New Balance', price: 380000, category: 'ao', sport: 'thoitrangthethao', image: '../img/product_66.jpg'}
    ],
    'ao-lifestyle': [
        {id: 67, name: 'Áo Lifestyle Nike', price: 480000, category: 'ao', sport: 'lifestyle', image: '../img/product_67.jpg'},
        {id: 68, name: 'Áo Lifestyle Adidas', price: 420000, category: 'ao', sport: 'lifestyle', image: '../img/product_68.jpg'},
        {id: 69, name: 'Áo Lifestyle Puma', price: 450000, category: 'ao', sport: 'lifestyle', image: '../img/product_69.jpg'},
        {id: 70, name: 'Áo Lifestyle Reebok', price: 380000, category: 'ao', sport: 'lifestyle', image: '../img/product_70.jpg'},
        {id: 71, name: 'Áo Lifestyle Vans', price: 520000, category: 'ao', sport: 'lifestyle', image: '../img/product_71.jpg'},
        {id: 72, name: 'Áo Lifestyle Timberland', price: 550000, category: 'ao', sport: 'lifestyle', image: '../img/product_72.jpg'}
    ],
    'giay-bong-da-nam': [
        {id: 109, name: 'Giày Bóng Đá Nike Mercurial', price: 2200000, category: 'giay', sport: 'bongda', image: '../img/product_109.jpg'},
        {id: 110, name: 'Giày Bóng Đá Adidas Predator', price: 2100000, category: 'giay', sport: 'bongda', image: '../img/product_110.jpg'},
        {id: 111, name: 'Giày Bóng Đá Puma Future', price: 1800000, category: 'giay', sport: 'bongda', image: '../img/product_111.jpg'},
        {id: 112, name: 'Giày Bóng Đá New Balance', price: 1900000, category: 'giay', sport: 'bongda', image: '../img/product_112.jpg'},
        {id: 113, name: 'Giày Bóng Đá Lotto Elite', price: 1600000, category: 'giay', sport: 'bongda', image: '../img/product_113.jpg'},
        {id: 114, name: 'Giày Bóng Đá Asics DS Light', price: 1700000, category: 'giay', sport: 'bongda', image: '../img/product_114.jpg'}
    ],
    'giay-bong-ro-nam': [
        {id: 115, name: 'Giày Bóng Rổ Nike LeBron', price: 2400000, category: 'giay', sport: 'bongro', image: '../img/product_115.jpg'},
        {id: 116, name: 'Giày Bóng Rổ Adidas Dame', price: 2200000, category: 'giay', sport: 'bongro', image: '../img/product_116.jpg'},
        {id: 117, name: 'Giày Bóng Rổ Spalding', price: 1900000, category: 'giay', sport: 'bongro', image: '../img/product_117.jpg'},
        {id: 118, name: 'Giày Bóng Rổ Puma', price: 1800000, category: 'giay', sport: 'bongro', image: '../img/product_118.jpg'},
        {id: 119, name: 'Giày Bóng Rổ Reebok', price: 1950000, category: 'giay', sport: 'bongro', image: '../img/product_119.jpg'},
        {id: 120, name: 'Giày Bóng Rổ Peak', price: 2100000, category: 'giay', sport: 'bongro', image: '../img/product_120.jpg'}
    ],
    'giay-chay-bo': [
        {id: 121, name: 'Giày Chạy Bộ Nike Pegasus', price: 2300000, category: 'giay', sport: 'chaybo', image: '../img/product_121.jpg'},
        {id: 122, name: 'Giày Chạy Bộ Adidas UltraBoost', price: 2200000, category: 'giay', sport: 'chaybo', image: '../img/product_122.jpg'},
        {id: 123, name: 'Giày Chạy Bộ Asics Gel', price: 2100000, category: 'giay', sport: 'chaybo', image: '../img/product_123.jpg'},
        {id: 124, name: 'Giày Chạy Bộ New Balance 990', price: 1900000, category: 'giay', sport: 'chaybo', image: '../img/product_124.jpg'},
        {id: 125, name: 'Giày Chạy Bộ Puma Velocity', price: 1800000, category: 'giay', sport: 'chaybo', image: '../img/product_125.jpg'},
        {id: 126, name: 'Giày Chạy Bộ Saucony', price: 2050000, category: 'giay', sport: 'chaybo', image: '../img/product_126.jpg'}
    ],
    'giay-tap-gym': [
        {id: 127, name: 'Giày Tập Gym Nike Metcon', price: 1600000, category: 'giay', sport: 'tapgym', image: '../img/product_127.jpg'},
        {id: 128, name: 'Giày Tập Gym Adidas CloudFoam', price: 1550000, category: 'giay', sport: 'tapgym', image: '../img/product_128.jpg'},
        {id: 129, name: 'Giày Tập Gym Reebok Flexagon', price: 1750000, category: 'giay', sport: 'tapgym', image: '../img/product_129.jpg'},
        {id: 130, name: 'Giày Tập Gym Puma Cali', price: 1650000, category: 'giay', sport: 'tapgym', image: '../img/product_130.jpg'},
        {id: 131, name: 'Giày Tập Gym Under Armour', price: 1900000, category: 'giay', sport: 'tapgym', image: '../img/product_131.jpg'},
        {id: 132, name: 'Giày Tập Gym Inov-8', price: 2000000, category: 'giay', sport: 'tapgym', image: '../img/product_132.jpg'}
    ],
    'giay-da-ngoai': [
        {id: 133, name: 'Giày Dã Ngoại Nike Phantom', price: 1800000, category: 'giay', sport: 'dagongoai', image: '../img/product_133.jpg'},
        {id: 134, name: 'Giày Dã Ngoại Adidas Terrex', price: 2000000, category: 'giay', sport: 'dagongoai', image: '../img/product_134.jpg'},
        {id: 135, name: 'Giày Dã Ngoại Puma', price: 1700000, category: 'giay', sport: 'dagongoai', image: '../img/product_135.jpg'},
        {id: 136, name: 'Giày Dã Ngoại Asics', price: 1900000, category: 'giay', sport: 'dagongoai', image: '../img/product_136.jpg'},
        {id: 137, name: 'Giày Dã Ngoại Lotto', price: 1600000, category: 'giay', sport: 'dagongoai', image: '../img/product_137.jpg'},
        {id: 138, name: 'Giày Dã Ngoại Joma', price: 1750000, category: 'giay', sport: 'dagongoai', image: '../img/product_138.jpg'}
    ],
    'giay-casual': [
        {id: 139, name: 'Giày Casual Nike Court', price: 1300000, category: 'giay', sport: 'casual', image: '../img/product_139.jpg'},
        {id: 140, name: 'Giày Casual Adidas Stan Smith', price: 1200000, category: 'giay', sport: 'casual', image: '../img/product_140.jpg'},
        {id: 141, name: 'Giày Casual Vans Old Skool', price: 1100000, category: 'giay', sport: 'casual', image: '../img/product_141.jpg'},
        {id: 142, name: 'Giày Casual Puma Suede', price: 1000000, category: 'giay', sport: 'casual', image: '../img/product_142.jpg'},
        {id: 143, name: 'Giày Casual New Balance 574', price: 950000, category: 'giay', sport: 'casual', image: '../img/product_143.jpg'},
        {id: 144, name: 'Giày Casual Converse Chuck Taylor', price: 1250000, category: 'giay', sport: 'casual', image: '../img/product_144.jpg'}
    ],
    'phukien-bong-dungcu': [
        {id: 145, name: 'Bóng Đá FIFA Official', price: 650000, category: 'phukien', sport: 'bongdungcu', image: '../img/product_145.jpg'},
        {id: 146, name: 'Bóng Rổ Spalding NBA', price: 550000, category: 'phukien', sport: 'bongdungcu', image: '../img/product_146.jpg'},
        {id: 147, name: 'Vợt Cầu Lông Victor', price: 450000, category: 'phukien', sport: 'bongdungcu', image: '../img/product_147.jpg'},
        {id: 148, name: 'Vợt Tennis Yonex', price: 750000, category: 'phukien', sport: 'bongdungcu', image: '../img/product_148.jpg'},
        {id: 149, name: 'Bộ Dụng Cụ Tập Yoga', price: 350000, category: 'phukien', sport: 'bongdungcu', image: '../img/product_149.jpg'},
        {id: 150, name: 'Dụng Cụ Gym Dumbbells', price: 450000, category: 'phukien', sport: 'bongdungcu', image: '../img/product_150.jpg'}
    ],
    'phukien-tui-balo': [
        {id: 151, name: 'Ba Lô Nike Brasilia', price: 580000, category: 'phukien', sport: 'tuibalo', image: '../img/product_151.jpg'},
        {id: 152, name: 'Ba Lô Adidas Power', price: 520000, category: 'phukien', sport: 'tuibalo', image: '../img/product_152.jpg'},
        {id: 153, name: 'Túi Thể Thao Gym Bag', price: 380000, category: 'phukien', sport: 'tuibalo', image: '../img/product_153.jpg'},
        {id: 154, name: 'Túi Đeo Chéo Sport', price: 320000, category: 'phukien', sport: 'tuibalo', image: '../img/product_154.jpg'},
        {id: 155, name: 'Ba Lô Du Lịch 50L', price: 750000, category: 'phukien', sport: 'tuibalo', image: '../img/product_155.jpg'},
        {id: 156, name: 'Túi Đựng Giày Shoe Bag', price: 250000, category: 'phukien', sport: 'tuibalo', image: '../img/product_156.jpg'}
    ],
    'phukien-bao-ho': [
        {id: 157, name: 'Nón Bảo Hiểm Xe Đạp', price: 450000, category: 'phukien', sport: 'baoho', image: '../img/product_157.jpg'},
        {id: 158, name: 'Bao Vệ Cổ Tay Wrist Guard', price: 220000, category: 'phukien', sport: 'baoho', image: '../img/product_158.jpg'},
        {id: 159, name: 'Bao Vệ Gối Knee Pad', price: 280000, category: 'phukien', sport: 'baoho', image: '../img/product_159.jpg'},
        {id: 160, name: 'Bao Vệ Khuỷu Tay Elbow Pad', price: 250000, category: 'phukien', sport: 'baoho', image: '../img/product_160.jpg'},
        {id: 161, name: 'Bộ Bảo Vệ 6 Trong 1', price: 480000, category: 'phukien', sport: 'baoho', image: '../img/product_161.jpg'},
        {id: 162, name: 'Bao Vệ Lưng Back Support', price: 320000, category: 'phukien', sport: 'baoho', image: '../img/product_162.jpg'}
    ],
    'phukien-vo-gang': [
        {id: 163, name: 'Vo Boxing Everlast', price: 680000, category: 'phukien', sport: 'vogang', image: '../img/product_163.jpg'},
        {id: 164, name: 'Găng Tay Đấm Bốc Venum', price: 520000, category: 'phukien', sport: 'vogang', image: '../img/product_164.jpg'},
        {id: 165, name: 'Găng Tay Bóng Đá Goalkeeper', price: 420000, category: 'phukien', sport: 'vogang', image: '../img/product_165.jpg'},
        {id: 166, name: 'Vo Võ Thuật Karate', price: 380000, category: 'phukien', sport: 'vogang', image: '../img/product_166.jpg'},
        {id: 167, name: 'Găng Tay Thể Thao Multi-Sport', price: 280000, category: 'phukien', sport: 'vogang', image: '../img/product_167.jpg'},
        {id: 168, name: 'Võ MMA Pro Training', price: 650000, category: 'phukien', sport: 'vogang', image: '../img/product_168.jpg'}
    ],
    'phukien-yoga-fitness': [
        {id: 169, name: 'Thảm Yoga 6mm TPE', price: 480000, category: 'phukien', sport: 'yogafitness', image: '../img/product_169.jpg'},
        {id: 170, name: 'Dây Kháng Lực Resistance Band', price: 280000, category: 'phukien', sport: 'yogafitness', image: '../img/product_170.jpg'},
        {id: 171, name: 'Bóng Yoga Exercise Ball 55cm', price: 380000, category: 'phukien', sport: 'yogafitness', image: '../img/product_171.jpg'},
        {id: 172, name: 'Con Lăn Massage Foam Roller', price: 420000, category: 'phukien', sport: 'yogafitness', image: '../img/product_172.jpg'},
        {id: 173, name: 'Khối Yoga Brick EVA', price: 180000, category: 'phukien', sport: 'yogafitness', image: '../img/product_173.jpg'},
        {id: 174, name: 'Dây Nhảy Jump Rope Pro', price: 220000, category: 'phukien', sport: 'yogafitness', image: '../img/product_174.jpg'}
    ],
    'phukien-khac': [
        {id: 175, name: 'Mũ Thể Thao Cap Sport', price: 280000, category: 'phukien', sport: 'khac', image: '../img/product_175.jpg'},
        {id: 176, name: 'Khăn Thể Thao Quick Dry', price: 180000, category: 'phukien', sport: 'khac', image: '../img/product_176.jpg'},
        {id: 177, name: 'Bình Nước Sports Bottle 500ml', price: 220000, category: 'phukien', sport: 'khac', image: '../img/product_177.jpg'},
        {id: 178, name: 'Tất Thể Thao Performance Socks', price: 120000, category: 'phukien', sport: 'khac', image: '../img/product_178.jpg'},
        {id: 179, name: 'Tai Nghe Bluetooth Sport', price: 650000, category: 'phukien', sport: 'khac', image: '../img/product_179.jpg'},
        {id: 180, name: 'Dây Đeo Điều Chỉnh Strap', price: 150000, category: 'phukien', sport: 'khac', image: '../img/product_180.jpg'}
    ]
};

// Hàm khởi tạo dữ liệu sản phẩm khi trang load
function initProductsData() {
    // Lấy tên trang hiện tại (không có phần .html)
    let currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    console.log('Current page:', currentPage); // Debug
    
    // Lấy dữ liệu sản phẩm cho trang hiện tại
    const products = productsData[currentPage];
    
    if (products) {
        console.log('Found products for page:', currentPage, products.length); // Debug
        // Cập nhật tất cả các product card
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            if (index < products.length) {
                const product = products[index];
                // Thêm các thuộc tính data
                card.setAttribute('data-id', product.id);
                card.setAttribute('data-name', product.name);
                card.setAttribute('data-price', product.price);
                card.setAttribute('data-category', product.category);
                card.setAttribute('data-sport', product.sport);
                card.setAttribute('data-image', product.image);
            }
        });
    } else {
        console.log('No products found for page:', currentPage); // Debug
    }
}

// Chạy khi DOM content load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductsData);
} else {
    // Nếu script load sau DOM
    initProductsData();
}
