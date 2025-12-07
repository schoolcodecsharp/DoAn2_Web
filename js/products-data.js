// Dữ liệu sản phẩm cho tất cả các trang
// ID Ranges: Áo (37-72), Quần (73-108), Giày (109-144), Phụ Kiện (145-180)
// Sản phẩm Admin dùng ID >= 1000
const productsData = [
    // ===== ÁO BÓNG ĐÁ (37-42) =====
    {id: 37, name: 'Áo Bóng Đá Nike Breathe', price: 580000, category: 'ao', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 38, name: 'Áo Bóng Đá Adidas Entrada', price: 450000, category: 'ao', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 39, name: 'Áo Bóng Đá Puma Team', price: 480000, category: 'ao', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 40, name: 'Áo Manchester United', price: 650000, category: 'ao', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 41, name: 'Áo Liverpool', price: 680000, category: 'ao', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 42, name: 'Áo Real Madrid', price: 680000, category: 'ao', sport: 'bongda', image: '../img/tk1.jpg'},
    
    // ===== ÁO BÓNG RỔ (43-48) =====
    {id: 43, name: 'Áo Bóng Rổ Nike Dri-FIT', price: 420000, category: 'ao', sport: 'bongro', image: '../img/aobongro.jpeg'},
    {id: 44, name: 'Áo Bóng Rổ Adidas Basketball', price: 350000, category: 'ao', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 45, name: 'Áo Bóng Rổ Spalding Elite', price: 380000, category: 'ao', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 46, name: 'Áo Lakers', price: 680000, category: 'ao', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 47, name: 'Áo Bulls', price: 700000, category: 'ao', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 48, name: 'Áo Warriors', price: 720000, category: 'ao', sport: 'bongro', image: '../img/tk1.jpg'},
    
    // ===== ÁO TẬP LUYỆN (49-54) =====
    {id: 49, name: 'Áo Tập Luyện Nike Flex', price: 380000, category: 'ao', sport: 'taplyuen', image: '../img/tk1.jpg'},
    {id: 50, name: 'Áo Tập Luyện Adidas', price: 320000, category: 'ao', sport: 'taplyuen', image: '../img/tk1.jpg'},
    {id: 51, name: 'Áo Tập Luyện Under Armour', price: 420000, category: 'ao', sport: 'taplyuen', image: '../img/tk1.jpg'},
    {id: 52, name: 'Áo Tập Luyện Puma', price: 350000, category: 'ao', sport: 'taplyuen', image: '../img/tk1.jpg'},
    {id: 53, name: 'Áo Tập Luyện Reebok', price: 380000, category: 'ao', sport: 'taplyuen', image: '../img/tk1.jpg'},
    {id: 54, name: 'Áo Tập Luyện Lululemon', price: 580000, category: 'ao', sport: 'taplyuen', image: '../img/tk1.jpg'},
    
    // ===== ÁO ĐỒNG PHỤC (55-60) =====
    {id: 55, name: 'Áo Đồng Phục Học Sinh', price: 220000, category: 'ao', sport: 'dongphuc', image: '../img/tk1.jpg'},
    {id: 56, name: 'Áo Đồng Phục Công Ty', price: 280000, category: 'ao', sport: 'dongphuc', image: '../img/tk1.jpg'},
    {id: 57, name: 'Áo Đồng Phục Bác Sĩ', price: 320000, category: 'ao', sport: 'dongphuc', image: '../img/tk1.jpg'},
    {id: 58, name: 'Áo Đồng Phục Spa', price: 250000, category: 'ao', sport: 'dongphuc', image: '../img/tk1.jpg'},
    {id: 59, name: 'Áo Đồng Phục Nhà Hàng', price: 280000, category: 'ao', sport: 'dongphuc', image: '../img/tk1.jpg'},
    {id: 60, name: 'Áo Đồng Phục Công Nhân', price: 350000, category: 'ao', sport: 'dongphuc', image: '../img/tk1.jpg'},
    
    // ===== ÁO THỜI TRANG THỂ THAO (61-66) =====
    {id: 61, name: 'Áo Thời Trang Nike Sportswear', price: 420000, category: 'ao', sport: 'thoitrangthethao', image: '../img/product_7.webp'},
    {id: 62, name: 'Áo Thời Trang Adidas', price: 350000, category: 'ao', sport: 'thoitrangthethao', image: '../img/tk1.jpg'},
    {id: 63, name: 'Áo Thời Trang Puma', price: 380000, category: 'ao', sport: 'thoitrangthethao', image: '../img/tk1.jpg'},
    {id: 64, name: 'Áo Thời Trang Reebok', price: 320000, category: 'ao', sport: 'thoitrangthethao', image: '../img/tk1.jpg'},
    {id: 65, name: 'Áo Thời Trang Under Armour', price: 440000, category: 'ao', sport: 'thoitrangthethao', image: '../img/tk1.jpg'},
    {id: 66, name: 'Áo Thời Trang New Balance', price: 280000, category: 'ao', sport: 'thoitrangthethao', image: '../img/tk1.jpg'},
    
    // ===== ÁO LIFESTYLE (67-72) =====
    {id: 67, name: 'Áo Lifestyle Nike', price: 380000, category: 'ao', sport: 'lifestyle', image: '../img/tk1.jpg'},
    {id: 68, name: 'Áo Lifestyle Adidas', price: 320000, category: 'ao', sport: 'lifestyle', image: '../img/tk1.jpg'},
    {id: 69, name: 'Áo Lifestyle Puma', price: 350000, category: 'ao', sport: 'lifestyle', image: '../img/tk1.jpg'},
    {id: 70, name: 'Áo Lifestyle Reebok', price: 280000, category: 'ao', sport: 'lifestyle', image: '../img/tk1.jpg'},
    {id: 71, name: 'Áo Lifestyle Vans', price: 420000, category: 'ao', sport: 'lifestyle', image: '../img/tk1.jpg'},
    {id: 72, name: 'Áo Lifestyle Timberland', price: 450000, category: 'ao', sport: 'lifestyle', image: '../img/tk1.jpg'},
    
    // ===== QUẦN BÓNG ĐÁ (73-78) =====
    {id: 73, name: 'Quần Bóng Đá Nike', price: 350000, category: 'quan', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 74, name: 'Quần Bóng Đá Adidas', price: 320000, category: 'quan', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 75, name: 'Quần Bóng Đá Puma', price: 330000, category: 'quan', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 76, name: 'Quần Manchester United', price: 480000, category: 'quan', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 77, name: 'Quần Liverpool', price: 490000, category: 'quan', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 78, name: 'Quần Real Madrid', price: 490000, category: 'quan', sport: 'bongda', image: '../img/tk1.jpg'},
    // ===== QUẦN BÓNG RỔ (79-84) =====
    {id: 79, name: 'Quần Bóng Rổ Nike', price: 360000, category: 'quan', sport: 'bongro', image: '../img/product_11.webp'},
    {id: 80, name: 'Quần Bóng Rổ Adidas', price: 340000, category: 'quan', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 81, name: 'Quần Bóng Rổ Spalding', price: 370000, category: 'quan', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 82, name: 'Quần Lakers', price: 500000, category: 'quan', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 83, name: 'Quần Bulls', price: 510000, category: 'quan', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 84, name: 'Quần Warriors', price: 520000, category: 'quan', sport: 'bongro', image: '../img/tk1.jpg'},
    
    // ===== QUẦN CHẠY BỘ (85-90) =====
    {id: 85, name: 'Quần Chạy Bộ Nike', price: 310000, category: 'quan', sport: 'chaybo', image: '../img/product_5.webp'},
    {id: 86, name: 'Quần Chạy Bộ Adidas', price: 290000, category: 'quan', sport: 'chaybo', image: '../img/tk1.jpg'},
    {id: 87, name: 'Quần Chạy Bộ Puma', price: 300000, category: 'quan', sport: 'chaybo', image: '../img/tk1.jpg'},
    {id: 88, name: 'Quần Chạy Bộ Asics', price: 340000, category: 'quan', sport: 'chaybo', image: '../img/tk1.jpg'},
    {id: 89, name: 'Quần Chạy Bộ New Balance', price: 350000, category: 'quan', sport: 'chaybo', image: '../img/tk1.jpg'},
    {id: 90, name: 'Quần Chạy Bộ Saucony', price: 330000, category: 'quan', sport: 'chaybo', image: '../img/tk1.jpg'},
    
    // ===== QUẦN TẬP GYM (91-96) =====
    {id: 91, name: 'Quần Tập Gym Nike', price: 340000, category: 'quan', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 92, name: 'Quần Tập Gym Adidas', price: 320000, category: 'quan', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 93, name: 'Quần Tập Gym Puma', price: 330000, category: 'quan', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 94, name: 'Quần Tập Gym Under Armour', price: 360000, category: 'quan', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 95, name: 'Quần Tập Gym Reebok', price: 310000, category: 'quan', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 96, name: 'Quần Tập Gym Lululemon', price: 420000, category: 'quan', sport: 'tapgym', image: '../img/tk1.jpg'},
    
    // ===== QUẦN ĐẠP XE (97-102) =====
    {id: 97, name: 'Quần Đạp Xe Nike', price: 450000, category: 'quan', sport: 'dapxe', image: '../img/tk1.jpg'},
    {id: 98, name: 'Quần Đạp Xe Adidas', price: 420000, category: 'quan', sport: 'dapxe', image: '../img/tk1.jpg'},
    {id: 99, name: 'Quần Đạp Xe Shimano', price: 480000, category: 'quan', sport: 'dapxe', image: '../img/tk1.jpg'},
    {id: 100, name: 'Quần Đạp Xe Puma', price: 440000, category: 'quan', sport: 'dapxe', image: '../img/tk1.jpg'},
    {id: 101, name: 'Quần Đạp Xe Trek', price: 460000, category: 'quan', sport: 'dapxe', image: '../img/tk1.jpg'},
    {id: 102, name: 'Quần Đạp Xe Giant', price: 470000, category: 'quan', sport: 'dapxe', image: '../img/tk1.jpg'},
    
    // ===== QUẦN CẦU LÔNG (103-108) =====
    {id: 103, name: 'Quần Cầu Lông Yonex', price: 380000, category: 'quan', sport: 'caulong', image: '../img/tk1.jpg'},
    {id: 104, name: 'Quần Cầu Lông Victor', price: 360000, category: 'quan', sport: 'caulong', image: '../img/tk1.jpg'},
    {id: 105, name: 'Quần Cầu Lông Li-Ning', price: 340000, category: 'quan', sport: 'caulong', image: '../img/tk1.jpg'},
    {id: 106, name: 'Quần Cầu Lông Apacs', price: 320000, category: 'quan', sport: 'caulong', image: '../img/tk1.jpg'},
    {id: 107, name: 'Quần Cầu Lông Kawasaki', price: 400000, category: 'quan', sport: 'caulong', image: '../img/tk1.jpg'},
    {id: 108, name: 'Quần Cầu Lông Carlton', price: 380000, category: 'quan', sport: 'caulong', image: '../img/tk1.jpg'},
    
    // ===== GIÀY BÓNG ĐÁ (109-114) =====
    {id: 109, name: 'Giày Nike', price: 650000, category: 'giay', sport: 'bongda', image: '../img/tk1.webp'},
    {id: 110, name: 'Giày Adidas', price: 680000, category: 'giay', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 111, name: 'Giày Puma', price: 620000, category: 'giay', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 112, name: 'Giày Mercurial', price: 710000, category: 'giay', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 113, name: 'Giày Copa', price: 690000, category: 'giay', sport: 'bongda', image: '../img/tk1.jpg'},
    {id: 114, name: 'Giày Nemeziz', price: 700000, category: 'giay', sport: 'bongda', image: '../img/tk1.jpg'},
    
    // ===== GIÀY BÓNG RỔ (115-120) =====
    {id: 115, name: 'Giày Bóng Rổ Nike', price: 550000, category: 'giay', sport: 'bongro', image: '../img/product_8.webp'},
    {id: 116, name: 'Giày Bóng Rổ Adidas', price: 520000, category: 'giay', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 117, name: 'Giày Bóng Rổ Jordan', price: 850000, category: 'giay', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 118, name: 'Giày Lakers', price: 800000, category: 'giay', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 119, name: 'Giày Bulls', price: 820000, category: 'giay', sport: 'bongro', image: '../img/tk1.jpg'},
    {id: 120, name: 'Giày Warriors', price: 810000, category: 'giay', sport: 'bongro', image: '../img/tk1.jpg'},
    
    // ===== GIÀY CHẠY BỘ (121-126) =====
    {id: 121, name: 'Giày Chạy Bộ Nike', price: 450000, category: 'giay', sport: 'chaybo', image: '../img/tk1.jpg'},
    {id: 122, name: 'Giày Chạy Bộ Adidas', price: 420000, category: 'giay', sport: 'chaybo', image: '../img/tk1.jpg'},
    {id: 123, name: 'Giày Chạy Bộ Puma', price: 400000, category: 'giay', sport: 'chaybo', image: '../img/tk1.jpg'},
    {id: 124, name: 'Giày Chạy Bộ Asics', price: 480000, category: 'giay', sport: 'chaybo', image: '../img/tk1.jpg'},
    {id: 125, name: 'Giày Chạy Bộ New Balance', price: 500000, category: 'giay', sport: 'chaybo', image: '../img/tk1.jpg'},
    {id: 126, name: 'Giày Chạy Bộ Saucony', price: 460000, category: 'giay', sport: 'chaybo', image: '../img/tk1.jpg'},
    
    // ===== GIÀY TẬP GYM (127-132) =====
    {id: 127, name: 'Giày Tập Gym Nike', price: 380000, category: 'giay', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 128, name: 'Giày Tập Gym Adidas', price: 350000, category: 'giay', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 129, name: 'Giày Tập Gym Puma', price: 360000, category: 'giay', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 130, name: 'Giày Tập Gym Reebok', price: 340000, category: 'giay', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 131, name: 'Giày Tập Gym New Balance', price: 400000, category: 'giay', sport: 'tapgym', image: '../img/tk1.jpg'},
    {id: 132, name: 'Giày Tập Gym Saucony', price: 370000, category: 'giay', sport: 'tapgym', image: '../img/tk1.jpg'},
    
    // ===== GIÀY DÃ NGOÀI (133-138) =====
    {id: 133, name: 'Giày Dã Ngoài Nike', price: 580000, category: 'giay', sport: 'dangoai', image: '../img/tk1.jpg'},
    {id: 134, name: 'Giày Dã Ngoài Adidas', price: 560000, category: 'giay', sport: 'dangoai', image: '../img/tk1.jpg'},
    {id: 135, name: 'Giày Dã Ngoài Salomon', price: 650000, category: 'giay', sport: 'dangoai', image: '../img/tk1.jpg'},
    {id: 136, name: 'Giày Dã Ngoài Merrell', price: 620000, category: 'giay', sport: 'dangoai', image: '../img/tk1.jpg'},
    {id: 137, name: 'Giày Dã Ngoài Keen', price: 600000, category: 'giay', sport: 'dangoai', image: '../img/tk1.jpg'},
    {id: 138, name: 'Giày Dã Ngoài Columbia', price: 580000, category: 'giay', sport: 'dangoai', image: '../img/tk1.jpg'},
    
    // ===== GIÀY CASUAL (139-144) =====
    {id: 139, name: 'Giày Casual Vans', price: 380000, category: 'giay', sport: 'casual', image: '../img/tk1.jpg'},
    {id: 140, name: 'Giày Casual Converse', price: 350000, category: 'giay', sport: 'casual', image: '../img/tk1.jpg'},
    {id: 141, name: 'Giày Casual Nike', price: 420000, category: 'giay', sport: 'casual', image: '../img/tk1.jpg'},
    {id: 142, name: 'Giày Casual Adidas', price: 400000, category: 'giay', sport: 'casual', image: '../img/tk1.jpg'},
    {id: 143, name: 'Giày Casual Puma', price: 380000, category: 'giay', sport: 'casual', image: '../img/tk1.jpg'},
    {id: 144, name: 'Giày Casual Timberland', price: 450000, category: 'giay', sport: 'casual', image: '../img/tk1.jpg'},
    
    // ===== PHỤ KIỆN (145-180) =====
    {id: 145, name: 'Bóng Đá FIFA', price: 280000, category: 'phukien', sport: 'bong', image: '../img/bct1.webp'},
    {id: 146, name: 'Bóng Chuyền', price: 320000, category: 'phukien', sport: 'bong', image: '../img/product_12.webp'},
    {id: 147, name: 'Bóng Rổ', price: 300000, category: 'phukien', sport: 'bong', image: '../img/tk1.jpg'},
    {id: 148, name: 'Vợt Cầu Lông', price: 650000, category: 'phukien', sport: 'bong', image: '../img/tk1.jpg'},
    {id: 149, name: 'Vợt Tennis', price: 600000, category: 'phukien', sport: 'bong', image: '../img/tk1.jpg'},
    {id: 150, name: 'Gậy Golf', price: 800000, category: 'phukien', sport: 'bong', image: '../img/tk1.jpg'},
    {id: 151, name: 'Balo Nike', price: 450000, category: 'phukien', sport: 'tui', image: '../img/product_6.jpg'},
    {id: 152, name: 'Balo Adidas', price: 440000, category: 'phukien', sport: 'tui', image: '../img/tk1.jpg'},
    {id: 153, name: 'Túi Thể Thao', price: 380000, category: 'phukien', sport: 'tui', image: '../img/tk1.jpg'},
    {id: 154, name: 'Balo Puma', price: 460000, category: 'phukien', sport: 'tui', image: '../img/tk1.jpg'},
    {id: 155, name: 'Balo The North Face', price: 520000, category: 'phukien', sport: 'tui', image: '../img/tk1.jpg'},
    {id: 156, name: 'Túi Xách Thể Thao', price: 390000, category: 'phukien', sport: 'tui', image: '../img/tk1.jpg'},
    {id: 157, name: 'Băng Cuốn Tay', price: 120000, category: 'phukien', sport: 'baoho', image: '../img/tk1.jpg'},
    {id: 158, name: 'Bảo Vệ Cổ Chân', price: 150000, category: 'phukien', sport: 'baoho', image: '../img/tk1.jpg'},
    {id: 159, name: 'Băng Gối', price: 130000, category: 'phukien', sport: 'baoho', image: '../img/product_10.webp'},
    {id: 160, name: 'Bảo Vệ Khuỷu Tay', price: 140000, category: 'phukien', sport: 'baoho', image: '../img/tk1.jpg'},
    {id: 161, name: 'Băng Lưng', price: 160000, category: 'phukien', sport: 'baoho', image: '../img/tk1.jpg'},
    {id: 162, name: 'Quần Vớ Kín', price: 170000, category: 'phukien', sport: 'baoho', image: '../img/tk1.jpg'},
    {id: 163, name: 'Vớ Cotton', price: 80000, category: 'phukien', sport: 'vo', image: '../img/tk1.jpg'},
    {id: 164, name: 'Vớ Chạy Bộ', price: 100000, category: 'phukien', sport: 'vo', image: '../img/tk1.jpg'},
    {id: 165, name: 'Vớ Nén Lực', price: 120000, category: 'phukien', sport: 'vo', image: '../img/tk1.jpg'},
    {id: 166, name: 'Găng Tay Gym', price: 140000, category: 'phukien', sport: 'vo', image: '../img/tk1.jpg'},
    {id: 167, name: 'Găng Tay Bóng Đá', price: 180000, category: 'phukien', sport: 'vo', image: '../img/tk1.jpg'},
    {id: 168, name: 'Găng Tay Ấm', price: 160000, category: 'phukien', sport: 'vo', image: '../img/tk1.jpg'},
    
    // ===== PHỤ KIỆN: YOGA & FITNESS (169-174) =====
    {id: 169, name: 'Thảm Yoga', price: 350000, category: 'phukien', sport: 'yoga', image: '../img/product_9.webp'},
    {id: 170, name: 'Dây Kéo Yoga', price: 200000, category: 'phukien', sport: 'yoga', image: '../img/tk1.jpg'},
    {id: 171, name: 'Tạ Tay', price: 300000, category: 'phukien', sport: 'yoga', image: '../img/tk1.jpg'},
    {id: 172, name: 'Tạ Kettlebell', price: 400000, category: 'phukien', sport: 'yoga', image: '../img/tk1.jpg'},
    {id: 173, name: 'Con Lăn Foam', price: 280000, category: 'phukien', sport: 'yoga', image: '../img/tk1.jpg'},
    {id: 174, name: 'Khối Yoga', price: 220000, category: 'phukien', sport: 'yoga', image: '../img/tk1.jpg'},
    
    // ===== PHỤ KIỆN: KHÁC (175-180) =====
    {id: 175, name: 'Khăn Thể Thao', price: 80000, category: 'phukien', sport: 'khac', image: '../img/tk1.jpg'},
    {id: 176, name: 'Bình Nước', price: 150000, category: 'phukien', sport: 'khac', image: '../img/tk1.jpg'},
    {id: 177, name: 'Đồng Hồ Thể Thao', price: 600000, category: 'phukien', sport: 'khac', image: '../img/tk1.jpg'},
    {id: 178, name: 'Tai Nghe Bluetooth', price: 400000, category: 'phukien', sport: 'khac', image: '../img/tk1.jpg'},
    {id: 179, name: 'Túi Đựng Giày', price: 180000, category: 'phukien', sport: 'khac', image: '../img/tk1.jpg'},
    {id: 180, name: 'Bóp Tiền Thể Thao', price: 120000, category: 'phukien', sport: 'khac', image: '../img/tk1.jpg'}
];

// ===== Helper functions =====
function findProductById(id) {
    const numId = parseInt(id);
    
    // 1. Tìm từ productsData (tĩnh, ID 37-180)
    if (typeof productsData !== 'undefined' && Array.isArray(productsData)) {
        const found = productsData.find(p => p.id == numId);
        if (found) return found;
    }
    
    // 2. Tìm từ localStorage (admin, ID >= 1000)
    const adminProducts = JSON.parse(localStorage.getItem('products')) || [];
    const adminFound = adminProducts.find(p => p.id == numId);
    if (adminFound) return adminFound;
    
    return null;
}

function getProductById(id) {
    return findProductById(id);
}

function getAllProducts() {
    const adminProducts = JSON.parse(localStorage.getItem('products')) || [];
    return [...productsData, ...adminProducts];
}
