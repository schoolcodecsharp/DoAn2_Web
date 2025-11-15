// Dữ liệu sản phẩm theo danh mục
const productDatabase = {
    quan: {
        bongda: [
            { id: 1, name: 'Quần Bóng Đá Nam Nike Dri-FIT', price: 450000, image: '../img/products/quan1.jpg', category: 'Quần' },
            { id: 2, name: 'Quần Bóng Đá Nam Adidas Essentials', price: 380000, image: '../img/products/quan2.jpg', category: 'Quần' },
            { id: 3, name: 'Quần Bóng Đá Nam Puma Performance', price: 420000, image: '../img/products/quan3.jpg', category: 'Quần' },
            { id: 4, name: 'Quần Bóng Đá Nam Lotto Classic', price: 320000, image: '../img/products/quan4.jpg', category: 'Quần' },
            { id: 5, name: 'Quần Bóng Đá Nam Manchester United', price: 550000, image: '../img/products/quan5.jpg', category: 'Quần' },
            { id: 6, name: 'Quần Bóng Đá Nam Futsal Pro', price: 380000, image: '../img/products/quan6.jpg', category: 'Quần' },
        ],
        bongro: [
            { id: 7, name: 'Quần Bóng Rổ Nam Nike Basketball', price: 480000, image: '../img/products/quan7.jpg', category: 'Quần' },
            { id: 8, name: 'Quần Bóng Rổ Nam Adidas Legends', price: 420000, image: '../img/products/quan8.jpg', category: 'Quần' },
            { id: 9, name: 'Quần Bóng Rổ Nam And1 Street', price: 350000, image: '../img/products/quan9.jpg', category: 'Quần' },
            { id: 10, name: 'Quần Bóng Rổ Nam Jordan Retro', price: 520000, image: '../img/products/quan10.jpg', category: 'Quần' },
            { id: 11, name: 'Quần Bóng Rổ Nam Spalding Elite', price: 440000, image: '../img/products/quan11.jpg', category: 'Quần' },
            { id: 12, name: 'Quần Bóng Rổ Nam Spalding Supreme', price: 490000, image: '../img/products/quan12.jpg', category: 'Quần' },
        ],
        chaybo: [
            { id: 13, name: 'Quần Chạy Bộ Nam Nike Running', price: 420000, image: '../img/products/quan13.jpg', category: 'Quần' },
            { id: 14, name: 'Quần Chạy Bộ Nam Adidas ClimaCool', price: 380000, image: '../img/products/quan14.jpg', category: 'Quần' },
            { id: 15, name: 'Quần Chạy Bộ Nam Puma Flex', price: 390000, image: '../img/products/quan15.jpg', category: 'Quần' },
            { id: 16, name: 'Quần Chạy Bộ Nam Skechers Performance', price: 360000, image: '../img/products/quan16.jpg', category: 'Quần' },
            { id: 17, name: 'Quần Chạy Bộ Nam Under Armour Speed', price: 440000, image: '../img/products/quan17.jpg', category: 'Quần' },
            { id: 18, name: 'Quần Chạy Bộ Nam Hoka Elite', price: 470000, image: '../img/products/quan18.jpg', category: 'Quần' },
        ],
        tapgym: [
            { id: 19, name: 'Quần Tập Gym Nam Nike Fleece', price: 380000, image: '../img/products/quan19.jpg', category: 'Quần' },
            { id: 20, name: 'Quần Tập Gym Nam Adidas Performance', price: 350000, image: '../img/products/quan20.jpg', category: 'Quần' },
            { id: 21, name: 'Quần Tập Gym Nam Under Armour Compression', price: 420000, image: '../img/products/quan21.jpg', category: 'Quần' },
            { id: 22, name: 'Quần Tập Gym Nam Puma Comfort', price: 370000, image: '../img/products/quan22.jpg', category: 'Quần' },
            { id: 23, name: 'Quần Tập Gym Nam Decathlon Essential', price: 280000, image: '../img/products/quan23.jpg', category: 'Quần' },
            { id: 24, name: 'Quần Tập Gym Nam Gymshark Pro', price: 490000, image: '../img/products/quan24.jpg', category: 'Quần' },
        ],
        dapxe: [
            { id: 25, name: 'Quần Đạp Xe Nam Cycling Pro', price: 520000, image: '../img/products/quan25.jpg', category: 'Quần' },
            { id: 26, name: 'Quần Đạp Xe Nam Shimano Performance', price: 480000, image: '../img/products/quan26.jpg', category: 'Quần' },
            { id: 27, name: 'Quần Đạp Xe Nam Trek Bontrager', price: 450000, image: '../img/products/quan27.jpg', category: 'Quần' },
            { id: 28, name: 'Quần Đạp Xe Nam Castelli Comfort', price: 550000, image: '../img/products/quan28.jpg', category: 'Quần' },
            { id: 29, name: 'Quần Đạp Xe Nam Canyon Professional', price: 490000, image: '../img/products/quan29.jpg', category: 'Quần' },
            { id: 30, name: 'Quần Đạp Xe Nam Giant Advance', price: 410000, image: '../img/products/quan30.jpg', category: 'Quần' },
        ],
        caulong: [
            { id: 31, name: 'Quần Cầu Lông Nam Yonex Precision', price: 420000, image: '../img/products/quan31.jpg', category: 'Quần' },
            { id: 32, name: 'Quần Cầu Lông Nam Victor Performance', price: 390000, image: '../img/products/quan32.jpg', category: 'Quần' },
            { id: 33, name: 'Quần Cầu Lông Nam Li-Ning Elite', price: 380000, image: '../img/products/quan33.jpg', category: 'Quần' },
            { id: 34, name: 'Quần Cầu Lông Nam Apacs Speed', price: 330000, image: '../img/products/quan34.jpg', category: 'Quần' },
            { id: 35, name: 'Quần Cầu Lông Nam Kawasaki Premium', price: 440000, image: '../img/products/quan35.jpg', category: 'Quần' },
            { id: 36, name: 'Quần Cầu Lông Nam Carlton Classic', price: 370000, image: '../img/products/quan36.jpg', category: 'Quần' },
        ],
    },
    ao: {
        bongda: [
            { id: 37, name: 'Áo Bóng Đá Nam Nike Dry-FIT', price: 520000, image: '../img/products/ao1.jpg', category: 'Áo' },
            { id: 38, name: 'Áo Bóng Đá Nam Adidas Jersey', price: 480000, image: '../img/products/ao2.jpg', category: 'Áo' },
            { id: 39, name: 'Áo Bóng Đá Nam Puma Performance', price: 450000, image: '../img/products/ao3.jpg', category: 'Áo' },
            { id: 40, name: 'Áo Bóng Đá Nam Manchester United', price: 650000, image: '../img/products/ao4.jpg', category: 'Áo' },
            { id: 41, name: 'Áo Bóng Đá Nam Liverpool FC', price: 640000, image: '../img/products/ao5.jpg', category: 'Áo' },
            { id: 42, name: 'Áo Bóng Đá Nam Real Madrid', price: 680000, image: '../img/products/ao6.jpg', category: 'Áo' },
        ],
        bongro: [
            { id: 43, name: 'Áo Bóng Rổ Nam Nike Basketball', price: 550000, image: '../img/products/ao7.jpg', category: 'Áo' },
            { id: 44, name: 'Áo Bóng Rổ Nam Adidas Legends', price: 480000, image: '../img/products/ao8.jpg', category: 'Áo' },
            { id: 45, name: 'Áo Bóng Rổ Nam Jordan Brand', price: 620000, image: '../img/products/ao9.jpg', category: 'Áo' },
            { id: 46, name: 'Áo Bóng Rổ Nam And1 Street', price: 420000, image: '../img/products/ao10.jpg', category: 'Áo' },
            { id: 47, name: 'Áo Bóng Rổ Nam Lakers', price: 580000, image: '../img/products/ao11.jpg', category: 'Áo' },
            { id: 48, name: 'Áo Bóng Rổ Nam Celtics', price: 560000, image: '../img/products/ao12.jpg', category: 'Áo' },
        ],
        tapluyen: [
            { id: 49, name: 'Áo Tập Luyện Nam Nike Training', price: 420000, image: '../img/products/ao13.jpg', category: 'Áo' },
            { id: 50, name: 'Áo Tập Luyện Nam Adidas Climacool', price: 380000, image: '../img/products/ao14.jpg', category: 'Áo' },
            { id: 51, name: 'Áo Tập Luyện Nam Under Armour', price: 450000, image: '../img/products/ao15.jpg', category: 'Áo' },
            { id: 52, name: 'Áo Tập Luyện Nam Puma Essential', price: 340000, image: '../img/products/ao16.jpg', category: 'Áo' },
            { id: 53, name: 'Áo Tập Luyện Nam Skechers Active', price: 360000, image: '../img/products/ao17.jpg', category: 'Áo' },
            { id: 54, name: 'Áo Tập Luyện Nam Gymshark', price: 480000, image: '../img/products/ao18.jpg', category: 'Áo' },
        ],
        dongphuc: [
            { id: 55, name: 'Áo Đồng Phục Nam Classic Blue', price: 280000, image: '../img/products/ao19.jpg', category: 'Áo' },
            { id: 56, name: 'Áo Đồng Phục Nam Premium White', price: 300000, image: '../img/products/ao20.jpg', category: 'Áo' },
            { id: 57, name: 'Áo Đồng Phục Nam Polo Black', price: 320000, image: '../img/products/ao21.jpg', category: 'Áo' },
            { id: 58, name: 'Áo Đồng Phục Nam Corporate Red', price: 310000, image: '../img/products/ao22.jpg', category: 'Áo' },
            { id: 59, name: 'Áo Đồng Phục Nam Team Uniform', price: 290000, image: '../img/products/ao23.jpg', category: 'Áo' },
            { id: 60, name: 'Áo Đồng Phục Nam Sports Polo', price: 330000, image: '../img/products/ao24.jpg', category: 'Áo' },
        ],
        thoitrang: [
            { id: 61, name: 'Áo Thời Trang Thể Thao Nam Street', price: 380000, image: '../img/products/ao25.jpg', category: 'Áo' },
            { id: 62, name: 'Áo Thời Trang Thể Thao Nam Urban', price: 420000, image: '../img/products/ao26.jpg', category: 'Áo' },
            { id: 63, name: 'Áo Thời Trang Thể Thao Nam Casual', price: 360000, image: '../img/products/ao27.jpg', category: 'Áo' },
            { id: 64, name: 'Áo Thời Trang Thể Thao Nam Modern', price: 440000, image: '../img/products/ao28.jpg', category: 'Áo' },
            { id: 65, name: 'Áo Thời Trang Thể Thao Nam Retro', price: 400000, image: '../img/products/ao29.jpg', category: 'Áo' },
            { id: 66, name: 'Áo Thời Trang Thể Thao Nam Vintage', price: 430000, image: '../img/products/ao30.jpg', category: 'Áo' },
        ],
        lifestyle: [
            { id: 67, name: 'Áo Lifestyle Nam Comfort Casual', price: 320000, image: '../img/products/ao31.jpg', category: 'Áo' },
            { id: 68, name: 'Áo Lifestyle Nam Premium Collection', price: 450000, image: '../img/products/ao32.jpg', category: 'Áo' },
            { id: 69, name: 'Áo Lifestyle Nam Basic Essential', price: 250000, image: '../img/products/ao33.jpg', category: 'Áo' },
            { id: 70, name: 'Áo Lifestyle Nam Trending Style', price: 380000, image: '../img/products/ao34.jpg', category: 'Áo' },
            { id: 71, name: 'Áo Lifestyle Nam Relaxed Fit', price: 340000, image: '../img/products/ao35.jpg', category: 'Áo' },
            { id: 72, name: 'Áo Lifestyle Nam Fashion Forward', price: 420000, image: '../img/products/ao36.jpg', category: 'Áo' },
        ],
    },
    giay: {
        bongda: [
            { id: 73, name: 'Giày Bóng Đá Nam Nike Mercurial', price: 2200000, image: '../img/products/giay1.jpg', category: 'Giày' },
            { id: 74, name: 'Giày Bóng Đá Nam Adidas Predator', price: 2100000, image: '../img/products/giay2.jpg', category: 'Giày' },
            { id: 75, name: 'Giày Bóng Đá Nam Puma Future', price: 1900000, image: '../img/products/giay3.jpg', category: 'Giày' },
            { id: 76, name: 'Giày Bóng Đá Nam New Balance', price: 1800000, image: '../img/products/giay4.jpg', category: 'Giày' },
            { id: 77, name: 'Giày Bóng Đá Nam Lotto Elite', price: 1600000, image: '../img/products/giay5.jpg', category: 'Giày' },
            { id: 78, name: 'Giày Bóng Đá Nam Asics DS Light', price: 1850000, image: '../img/products/giay6.jpg', category: 'Giày' },
        ],
        bongro: [
            { id: 79, name: 'Giày Bóng Rổ Nam Nike LeBron', price: 2400000, image: '../img/products/giay7.jpg', category: 'Giày' },
            { id: 80, name: 'Giày Bóng Rổ Nam Adidas Dame', price: 2200000, image: '../img/products/giay8.jpg', category: 'Giày' },
            { id: 81, name: 'Giày Bóng Rổ Nam Jordan Air', price: 2600000, image: '../img/products/giay9.jpg', category: 'Giày' },
            { id: 82, name: 'Giày Bóng Rổ Nam And1 Assault', price: 1900000, image: '../img/products/giay10.jpg', category: 'Giày' },
            { id: 83, name: 'Giày Bóng Rổ Nam Spalding Pro', price: 2000000, image: '../img/products/giay11.jpg', category: 'Giày' },
            { id: 84, name: 'Giày Bóng Rổ Nam Peak Carter', price: 1850000, image: '../img/products/giay12.jpg', category: 'Giày' },
        ],
        chaybo: [
            { id: 85, name: 'Giày Chạy Bộ Nam Nike Air Zoom', price: 2800000, image: '../img/products/giay13.jpg', category: 'Giày' },
            { id: 86, name: 'Giày Chạy Bộ Nam Adidas Ultraboost', price: 2600000, image: '../img/products/giay14.jpg', category: 'Giày' },
            { id: 87, name: 'Giày Chạy Bộ Nam Puma Velocity', price: 2200000, image: '../img/products/giay15.jpg', category: 'Giày' },
            { id: 88, name: 'Giày Chạy Bộ Nam Under Armour Hovr', price: 2100000, image: '../img/products/giay16.jpg', category: 'Giày' },
            { id: 89, name: 'Giày Chạy Bộ Nam Skechers GoRun', price: 1800000, image: '../img/products/giay17.jpg', category: 'Giày' },
            { id: 90, name: 'Giày Chạy Bộ Nam Hoka One One', price: 2400000, image: '../img/products/giay18.jpg', category: 'Giày' },
        ],
        tapgym: [
            { id: 91, name: 'Giày Tập Gym Nam Nike Training Max', price: 1900000, image: '../img/products/giay19.jpg', category: 'Giày' },
            { id: 92, name: 'Giày Tập Gym Nam Adidas Cloudfoam', price: 1600000, image: '../img/products/giay20.jpg', category: 'Giày' },
            { id: 93, name: 'Giày Tập Gym Nam Puma Rebound', price: 1500000, image: '../img/products/giay21.jpg', category: 'Giày' },
            { id: 94, name: 'Giày Tập Gym Nam New Balance 608', price: 1700000, image: '../img/products/giay22.jpg', category: 'Giày' },
            { id: 95, name: 'Giày Tập Gym Nam Reebok Nano', price: 1850000, image: '../img/products/giay23.jpg', category: 'Giày' },
            { id: 96, name: 'Giày Tập Gym Nam Asics Gel Court', price: 1750000, image: '../img/products/giay24.jpg', category: 'Giày' },
        ],
        dangoai: [
            { id: 97, name: 'Giày Dã Ngoài Nam Salomon Trail', price: 2200000, image: '../img/products/giay25.jpg', category: 'Giày' },
            { id: 98, name: 'Giày Dã Ngoài Nam Merrell Hiking', price: 1950000, image: '../img/products/giay26.jpg', category: 'Giày' },
            { id: 99, name: 'Giày Dã Ngoài Nam Columbia Mountain', price: 2100000, image: '../img/products/giay27.jpg', category: 'Giày' },
            { id: 100, name: 'Giày Dã Ngoài Nam Timberland Terrain', price: 2400000, image: '../img/products/giay28.jpg', category: 'Giày' },
            { id: 101, name: 'Giày Dã Ngoài Nam Keen Outdoor', price: 1850000, image: '../img/products/giay29.jpg', category: 'Giày' },
            { id: 102, name: 'Giày Dã Ngoài Nam Hanwag Alpine', price: 2300000, image: '../img/products/giay30.jpg', category: 'Giày' },
        ],
        casual: [
            { id: 103, name: 'Giày Casual Nam Nike Court', price: 1600000, image: '../img/products/giay31.jpg', category: 'Giày' },
            { id: 104, name: 'Giày Casual Nam Adidas Cloudfoam', price: 1400000, image: '../img/products/giay32.jpg', category: 'Giày' },
            { id: 105, name: 'Giày Casual Nam Puma Suede', price: 1200000, image: '../img/products/giay33.jpg', category: 'Giày' },
            { id: 106, name: 'Giày Casual Nam Vans Classic', price: 1100000, image: '../img/products/giay34.jpg', category: 'Giày' },
            { id: 107, name: 'Giày Casual Nam Converse Chuck', price: 900000, image: '../img/products/giay35.jpg', category: 'Giày' },
            { id: 108, name: 'Giày Casual Nam Skechers Slip-on', price: 1300000, image: '../img/products/giay36.jpg', category: 'Giày' },
        ],
    },
    phukien: {
        bongdungcu: [
            { id: 109, name: 'Bóng Đá FIFA Official', price: 650000, image: '../img/products/phukien1.jpg', category: 'Phụ Kiện' },
            { id: 110, name: 'Bóng Rổ Spalding NBA', price: 550000, image: '../img/products/phukien2.jpg', category: 'Phụ Kiện' },
            { id: 111, name: 'Vợt Cầu Lông Victor', price: 450000, image: '../img/products/phukien3.jpg', category: 'Phụ Kiện' },
            { id: 112, name: 'Vợt Tennis Yonex', price: 750000, image: '../img/products/phukien4.jpg', category: 'Phụ Kiện' },
            { id: 113, name: 'Bộ Dụng Cụ Tập Yoga', price: 350000, image: '../img/products/phukien5.jpg', category: 'Phụ Kiện' },
            { id: 114, name: 'Dụng Cụ Gym Dumbbells', price: 450000, image: '../img/products/phukien6.jpg', category: 'Phụ Kiện' },
        ],
        tuibalo: [
            { id: 115, name: 'Túi Gym Nike Large', price: 450000, image: '../img/products/phukien7.jpg', category: 'Phụ Kiện' },
            { id: 116, name: 'Balo Thể Thao Adidas', price: 520000, image: '../img/products/phukien8.jpg', category: 'Phụ Kiện' },
            { id: 117, name: 'Túi Đeo Chéo Puma', price: 380000, image: '../img/products/phukien9.jpg', category: 'Phụ Kiện' },
            { id: 118, name: 'Balo Chống Nước Outdoor', price: 680000, image: '../img/products/phukien10.jpg', category: 'Phụ Kiện' },
            { id: 119, name: 'Túi Giày Thể Thao', price: 280000, image: '../img/products/phukien11.jpg', category: 'Phụ Kiện' },
            { id: 120, name: 'Balo Gaming Laptop', price: 450000, image: '../img/products/phukien12.jpg', category: 'Phụ Kiện' },
        ],
        baoho: [
            { id: 121, name: 'Đai Lưng Hỗ Trợ Tập Gym', price: 350000, image: '../img/products/phukien13.jpg', category: 'Phụ Kiện' },
            { id: 122, name: 'Băng Hỗ Trợ Cổ Tay', price: 250000, image: '../img/products/phukien14.jpg', category: 'Phụ Kiện' },
            { id: 123, name: 'Mũ Bảo Vệ Xe Đạp', price: 450000, image: '../img/products/phukien15.jpg', category: 'Phụ Kiện' },
            { id: 124, name: 'Tấm Bảo Vệ Khuỷu Tay', price: 280000, image: '../img/products/phukien16.jpg', category: 'Phụ Kiện' },
            { id: 125, name: 'Tấm Bảo Vệ Đầu Gối', price: 320000, image: '../img/products/phukien17.jpg', category: 'Phụ Kiện' },
            { id: 126, name: 'Áo Phao Bảo Vệ Thể Thao', price: 580000, image: '../img/products/phukien18.jpg', category: 'Phụ Kiện' },
        ],
        vogang: [
            { id: 127, name: 'Vớ Gym Nike Dri-FIT', price: 180000, image: '../img/products/phukien19.jpg', category: 'Phụ Kiện' },
            { id: 128, name: 'Vớ Chạy Bộ Adidas', price: 160000, image: '../img/products/phukien20.jpg', category: 'Phụ Kiện' },
            { id: 129, name: 'Vớ Cầu Lông Yonex', price: 150000, image: '../img/products/phukien21.jpg', category: 'Phụ Kiện' },
            { id: 130, name: 'Găng Tay Tập Gym Pro', price: 280000, image: '../img/products/phukien22.jpg', category: 'Phụ Kiện' },
            { id: 131, name: 'Găng Tay Chạy Bộ Puma', price: 220000, image: '../img/products/phukien23.jpg', category: 'Phụ Kiện' },
            { id: 132, name: 'Bộ Vớ 6 Đôi Thể Thao', price: 380000, image: '../img/products/phukien24.jpg', category: 'Phụ Kiện' },
        ],
        yogafitness: [
            { id: 133, name: 'Thảm Yoga PVC 6mm', price: 380000, image: '../img/products/phukien25.jpg', category: 'Phụ Kiện' },
            { id: 134, name: 'Bóng Yoga Pilates 65cm', price: 280000, image: '../img/products/phukien26.jpg', category: 'Phụ Kiện' },
            { id: 135, name: 'Con Lăn Massage Foam', price: 350000, image: '../img/products/phukien27.jpg', category: 'Phụ Kiện' },
            { id: 136, name: 'Dây Kháng Cự Tập Gym', price: 220000, image: '../img/products/phukien28.jpg', category: 'Phụ Kiện' },
            { id: 137, name: 'Tạ Tay Hexagon 5kg', price: 280000, image: '../img/products/phukien29.jpg', category: 'Phụ Kiện' },
            { id: 138, name: 'Bộ Dụng Cụ Yoga 5in1', price: 450000, image: '../img/products/phukien30.jpg', category: 'Phụ Kiện' },
        ],
        khac: [
            { id: 139, name: 'Mũ Thể Thao Nike Cap', price: 280000, image: '../img/products/phukien31.jpg', category: 'Phụ Kiện' },
            { id: 140, name: 'Nón Bóng Chày Adidas', price: 320000, image: '../img/products/phukien32.jpg', category: 'Phụ Kiện' },
            { id: 141, name: 'Khẩu Trang Thể Thao', price: 150000, image: '../img/products/phukien33.jpg', category: 'Phụ Kiện' },
            { id: 142, name: 'Bình Nước Thể Thao 1L', price: 220000, image: '../img/products/phukien34.jpg', category: 'Phụ Kiện' },
            { id: 143, name: 'Khăn Thể Thao Absorb', price: 180000, image: '../img/products/phukien35.jpg', category: 'Phụ Kiện' },
            { id: 144, name: 'Túi Đeo Ngang Thể Thao', price: 280000, image: '../img/products/phukien36.jpg', category: 'Phụ Kiện' },
        ],
    },
};

// Hàm load sản phẩm theo danh mục
function loadCategoryProducts(type, subcategory) {
    const productsGrid = document.getElementById('productsGrid');
    let products = [];
    
    if (type === 'quan' && productDatabase.quan[subcategory]) {
        products = productDatabase.quan[subcategory];
    } else if (type === 'ao' && productDatabase.ao[subcategory]) {
        products = productDatabase.ao[subcategory];
    } else if (type === 'giay' && productDatabase.giay[subcategory]) {
        products = productDatabase.giay[subcategory];
    } else if (type === 'phukien' && productDatabase.phukien[subcategory]) {
        products = productDatabase.phukien[subcategory];
    }
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<div class="loading-message">Danh mục không có sản phẩm</div>';
        return;
    }
    
    // Render sản phẩm
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='../img/products/default.png'">
                <div class="product-badge">Mới</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${product.price.toLocaleString('vi-VN')}₫</span>
                    <span class="original-price">${(product.price * 1.2).toLocaleString('vi-VN')}₫</span>
                </div>
                <div class="product-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-count">(${Math.floor(Math.random() * 100) + 50} đánh giá)</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                    <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                </button>
            </div>
        </div>
    `).join('');
}

// Hàm thêm vào giỏ hàng
function addToCart(productId, productName, productPrice) {
    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    // Lưu giỏ hàng lên localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cập nhật số lượng trong giỏ hàng (badge)
    updateCartBadge();
    
    // Hiển thị thông báo
    alert(productName + ' đã được thêm vào giỏ hàng!');
}

// Hàm cập nhật số lượng giỏ hàng
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = totalItems;
    }
}

// Hàm lọc sản phẩm theo giá
function filterByPrice(priceRange) {
    const allProducts = document.querySelectorAll('.product-card');
    
    allProducts.forEach(card => {
        const priceText = card.querySelector('.current-price').textContent;
        const price = parseInt(priceText.replace(/\D/g, ''));
        
        let show = false;
        if (priceRange === 'all') show = true;
        else if (priceRange === '0-200000' && price < 200000) show = true;
        else if (priceRange === '200000-500000' && price >= 200000 && price <= 500000) show = true;
        else if (priceRange === '500000' && price > 500000) show = true;
        
        card.style.display = show ? 'block' : 'none';
    });
}

// Hàm sắp xếp sản phẩm
function sortProducts(sortType) {
    const productsGrid = document.getElementById('productsGrid');
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.current-price').textContent.replace(/\D/g, ''));
        const priceB = parseInt(b.querySelector('.current-price').textContent.replace(/\D/g, ''));
        
        if (sortType === 'price-low') return priceA - priceB;
        if (sortType === 'price-high') return priceB - priceA;
        return 0;
    });
    
    products.forEach(product => productsGrid.appendChild(product));
}

// Event listeners
document.getElementById('price-filter')?.addEventListener('change', (e) => {
    filterByPrice(e.target.value);
});

document.getElementById('sort-filter')?.addEventListener('change', (e) => {
    sortProducts(e.target.value);
});

// Cập nhật badge giỏ hàng khi trang load
window.addEventListener('load', updateCartBadge);
