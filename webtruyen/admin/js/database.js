// File: js/database.js

// Đây là "kho" chứa toàn bộ dữ liệu truyện ban đầu của chúng ta.
const initialStoriesData = [
    {
        id: new Date('2025-08-01').getTime(), // Dùng ngày cụ thể để ID cố định
        title: "Gachi Akuta",
        author: "Kei Urana", // Bạn có thể sửa lại
        coverImage: "/webtruyen/Home/img/img_truyen/Gachi Akuta/gachiakuta_1663074350.jpg",
        description: "Rudo sống trong khu ổ chuột của những hậu duệ của tội phạm. Cậu căm ghét tầng lớp thượng lưu...",
        status: "Đang tiến hành",
        chapters: [
            { name: "1", pageCount: 72 }, 
            { name: "2", pageCount: 41 },
            { name: "3", pageCount: 47 },
            { name: "4", pageCount: 26 },
            { name: "5", pageCount: 19 },
            { name: "6", pageCount: 20 },
            { name: "7", pageCount: 20 },
            { name: "8", pageCount: 19 },
            { name: "9", pageCount: 21 },
            { name: "10", pageCount: 19 }

        ]
    },
    {
        id: new Date('2025-08-02').getTime(),
        title: "Hôm Nay - Tôi Hóa Kaiju",
        author: "Đang cập nhật",
        coverImage: "/webtruyen/Home/img/img_truyen/Hôm Nay - Tôi Hóa Kaiju/hom-nay-toi-hoa-kaiju_1595055488.jpg",
        description: "Một ngày nọ, tôi bỗng nhiên có khả năng biến thành Kaiju...",
        status: "Đang tiến hành",
        chapters: [
            { name: "1.1", pageCount: 25 },
            { name: "1.2", pageCount: 25 },
            { name: "3", pageCount: 21 },
            { name: "5", pageCount: 15 },
            { name: "6", pageCount: 22 },
            { name: "7", pageCount: 18 },
            { name: "8", pageCount: 15 },
            { name: "9", pageCount: 13 },
            { name: "10", pageCount: 18 },
        ]
    },
    {
        id: new Date('2025-08-03').getTime(),
        title: "Gacha Vô Hạn",
        author: "Đang cập nhật",
        coverImage: "/webtruyen/Home/img/img_truyen/Gacha Vô Hạn/gacha-vo-han_1672285600.jpg",
        description: "Hibino Kafka một thanh niên vốn bất mãn với việc làm tại công ty ...",
        status: "Đang tiến hành",
        chapters: [
            { name: "1", pageCount: 133 },
            { name: "2", pageCount: 150 },

        ]
    },
    {
        id: new Date('2025-08-04').getTime(),
        title: "Lúc Đó, Tôi Đã Chuyển Sinh Thành Slime",
        author: "Đang cập nhật",
        coverImage: "/webtruyen/Home/img/img_truyen/Lúc Đó, Tôi Đã Chuyển Sinh Thành Slime/tensei-shitara-slime-datta-ken_1447076423.jpg",
        description: "Một manga khác chuyển thể từ light novel đang hot ở nhật. Một anh chàng bị tên cướp đâm chết khi  ...",
        status: "Đang tiến hành",
        chapters: [
            { name: "1.1", pageCount: 25 }

        ]
    },
    {
        id: new Date('2025-08-05').getTime(),
        title: "Rebuild World",
        author: "Đang cập nhật",
        coverImage: "/webtruyen/Home/img/img_truyen/Rebuild World/rebuild-world_1565070595.jpg",
        description: "ái tên nói lên tất cả, thế giới bị hủy diệt bởi công nghệ hay cái...",
        status: "Đang tiến hành",
        chapters: [
            { name: "1.1", pageCount: 53 }

        ]
    },
    {
        id: new Date('2025-08-06').getTime(),
        title: "Tao Muốn Trở Thành Chúa Tể Bóng Tối!!",
        author: "Đang cập nhật",
        coverImage: "/webtruyen/Home/img/img_truyen/Tao Muốn Trở Thành Chúa Tể Bóng Tối!!/tao-muon-tro-thanh-chua-te-bong-toi_1546992987.jpg",
        description: "Truyện tranh Gacha Vô Hạn được cập nhật nhanh và đầy đủ nhất tại BOCAPTRUYEN...",
        status: "Đang tiến hành",
        chapters: [
            { name: "1", pageCount: 38 },
            { name: "2", pageCount: 39 },
            { name: "3", pageCount: 38 },

        ]
    }

];