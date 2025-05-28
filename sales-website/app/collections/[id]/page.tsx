// app/collections/[id]/page.tsx

'use client'

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'; // Import React to use React.use()

// Dữ liệu sản phẩm (PHẢI GIỐNG VỚI DỮ LIỆU TRONG COLLECTIONS/PAGE.TSX HOẶC LẤY TỪ API)
const products = [
  {
    id: 1,
    title: 'Áo Dài Truyền Thống',
    description: 'Thiết kế áo dài tinh tế mang đậm bản sắc Việt, mang đến vẻ đẹp duyên dáng, thanh lịch cho người mặc.',
    imageUrl: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '1.250.000 VNĐ',
    details: 'Chất liệu: Lụa tơ tằm cao cấp.\nHọa tiết: Thêu tay truyền thống.\nKích cỡ: S, M, L, XL.\nPhong cách: Sang trọng, duyên dáng.',
  },
  {
    id: 2,
    title: 'Trang Phục Đường Phố',
    description: 'Phong cách trẻ trung, cá tính và năng động, phù hợp cho mọi hoạt động thường ngày.',
    imageUrl: 'https://images.pexels.com/photos/2929991/pexels-photo-2929991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '680.000 VNĐ',
    details: 'Chất liệu: Cotton co giãn 4 chiều.\nMàu sắc: Đen, Trắng, Xám.\nKích cỡ: S, M, L.\nPhong cách: Năng động, thoải mái.',
  },
  {
    id: 3,
    title: 'Bộ Đồ Công Sở',
    description: 'Thanh lịch và chuyên nghiệp, giúp bạn tự tin trong môi trường làm việc.',
    imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '950.000 VNĐ',
    details: 'Chất liệu: Vải Tuyết mưa cao cấp.\nKiểu dáng: Áo blazer và quần âu ống đứng.\nKích cỡ: S, M, L, XL.\nPhong cách: Lịch sự, hiện đại.',
  },
  {
    id: 4,
    title: 'Trang Phục Dạo Phố',
    description: 'Thoải mái cho ngày năng động, dễ dàng phối hợp với nhiều phụ kiện.',
    imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '490.000 VNĐ',
    details: 'Chất liệu: Linen thoáng mát.\nKiểu dáng: Áo phông oversized và quần short.\nMàu sắc: Be, Xanh mint.\nKích cỡ: Freesize.',
  },
  {
    id: 5,
    title: 'Phong Cách Hiphop',
    description: 'Cá tính và nổi bật, thể hiện phong cách riêng của bạn.',
    imageUrl: 'https://images.pexels.com/photos/6311393/pexels-photo-6311393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '720.000 VNĐ',
    details: 'Chất liệu: Nỉ bông dày dặn.\nKiểu dáng: Hoodie rộng và quần jogger.\nĐặc điểm: In họa tiết graffiti.\nKích cỡ: M, L, XL.',
  },
  {
    id: 6,
    title: 'Bộ Đồ Năng Động',
    description: 'Thể thao, phù hợp vận động và các hoạt động ngoài trời.',
    imageUrl: 'https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '890.000 VNĐ',
    details: 'Chất liệu: Vải dù chống thấm nước.\nKiểu dáng: Áo khoác bomber và quần thể thao.\nMàu sắc: Đen, Xám.\nKích cỡ: S, M, L.',
  },
  {
    id: 7,
    title: 'Thời Trang Học Sinh',
    description: 'Đơn giản và trẻ trung, phù hợp với lứa tuổi học đường.',
    imageUrl: 'https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '350.000 VNĐ',
    details: 'Chất liệu: Kate thoáng mát.\nKiểu dáng: Áo sơ mi trắng và chân váy xếp ly.\nMàu sắc: Trắng, Xanh navy.\nKích cỡ: XS, S, M.',
  },
  {
    id: 8,
    title: 'Bộ Váy Dự Tiệc',
    description: 'Quyến rũ và sang trọng, lý tưởng cho các sự kiện đặc biệt.',
    imageUrl: 'https://images.pexels.com/photos/6311614/pexels-photo-6311614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '1.800.000 VNĐ',
    details: 'Chất liệu: Voan, ren.\nKiểu dáng: Đầm bodycon xẻ tà.\nMàu sắc: Đỏ, Đen.\nKích cỡ: S, M, L.\nĐặc điểm: Đính sequin thủ công.',
  },
  {
    id: 9,
    title: 'Set Đồ Dã Ngoại',
    description: 'Thoải mái cho ngày nghỉ cuối tuần, tiện lợi và thời trang.',
    imageUrl: 'https://images.pexels.com/photos/1677035/pexels-photo-1677035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '780.000 VNĐ',
    details: 'Chất liệu: Kaki thô.\nKiểu dáng: Áo polo và quần short túi hộp.\nMàu sắc: Xanh rêu, Nâu đất.\nKích cỡ: S, M, L, XL.',
  },
  {
    id: 10,
    title: 'Trang Phục Trẻ Em',
    description: 'Đáng yêu và năng động, với chất liệu an toàn cho bé.',
    imageUrl: 'https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '320.000 VNĐ',
    details: 'Chất liệu: Cotton mềm mại.\nKiểu dáng: Bộ liền thân hình thú.\nĐặc điểm: An toàn cho da nhạy cảm của bé.\nKích cỡ: Cho bé từ 1-5 tuổi.',
  },
  {
    id: 11,
    title: 'Áo Khoác Dài Thanh Lịch',
    description: 'Ấm áp và thời thượng, thích hợp cho những ngày se lạnh.',
    imageUrl: 'https://images.pexels.com/photos/6311607/pexels-photo-6311607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '1.500.000 VNĐ',
    details: 'Chất liệu: Dạ len cao cấp.\nKiểu dáng: Trench coat dáng dài.\nMàu sắc: Xám, Be.\nKích cỡ: S, M, L.',
  },
  {
    id: 12,
    title: 'Set Đồ Boho Phóng Khoáng',
    description: 'Tự do và phóng khoáng, mang đến vẻ đẹp cá tính, lãng mạn.',
    imageUrl: 'https://images.pexels.com/photos/2060241/pexels-photo-2060241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '850.000 VNĐ',
    details: 'Chất liệu: Voan cotton.\nKiểu dáng: Áo croptop và chân váy maxi họa tiết.\nĐặc điểm: Tua rua và thêu tay.\nKích cỡ: Freesize.',
  },
  {
    id: 13,
    title: 'Áo Crop Top Gợi Cảm',
    description: 'Gợi cảm và trẻ trung, khoe trọn vòng eo thon gọn.',
    imageUrl: 'https://images.pexels.com/photos/2531230/pexels-photo-2531230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '280.000 VNĐ',
    details: 'Chất liệu: Len tăm co giãn.\nMàu sắc: Đen, Trắng, Nude.\nKích cỡ: S, M, L.\nPhong cách: Sexy, năng động.',
  },
  {
    id: 14,
    title: 'Thời Trang Mùa Hè Năng Động',
    description: 'Mát mẻ và năng động, lý tưởng cho những ngày nắng nóng.',
    imageUrl: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '550.000 VNĐ',
    details: 'Chất liệu: Lanh, cotton mỏng.\nKiểu dáng: Áo hai dây và quần short.\nMàu sắc: Hoa văn nhiệt đới.\nKích cỡ: S, M, L.',
  },
  {
    id: 15,
    title: 'Thời Trang Vintage Cổ Điển',
    description: 'Cổ điển và độc đáo, mang đến nét hoài niệm và phong cách riêng.',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '980.000 VNĐ',
    details: 'Chất liệu: Voan lụa.\nKiểu dáng: Váy midi hoa nhí.\nĐặc điểm: Cổ Peter Pan, tay phồng.\nKích cỡ: S, M.',
  },
  {
    id: 16,
    title: 'Áo Hoodie Unisex Cá Tính',
    description: 'Phù hợp cả nam và nữ, thoải mái và phong cách cho mọi lứa tuổi.',
    imageUrl: 'https://images.pexels.com/photos/3657420/pexels-photo-3657420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '420.000 VNĐ',
    details: 'Chất liệu: Nỉ bông.\nMàu sắc: Đen, Trắng, Xám.\nKích cỡ: M, L, XL.\nĐặc điểm: Logo thêu nổi.',
  },
  {
    id: 17,
    title: 'Thời Trang Mùa Đông Ấm Áp',
    description: 'Ấm áp và phong cách, không sợ cái lạnh mùa đông.',
    imageUrl: 'https://images.pexels.com/photos/3535284/pexels-photo-3535284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '1.100.000 VNĐ',
    details: 'Chất liệu: Len lông cừu.\nKiểu dáng: Áo len cổ lọ và quần nỉ.\nMàu sắc: Nâu, Kem.\nKích cỡ: Freesize.',
  },
  {
    id: 18,
    title: 'Bộ Đồ Dạo Biển Tươi Mát',
    description: 'Tươi mát và trẻ trung, cho những ngày nghỉ dưỡng trên bãi biển.',
    imageUrl: 'https://images.pexels.com/photos/3568542/pexels-photo-3568542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '650.000 VNĐ',
    details: 'Chất liệu: Voan lụa.\nKiểu dáng: Áo kimono và quần short.\nĐặc điểm: Họa tiết cây cọ.\nKích cỡ: Freesize.',
  },
  {
    id: 19,
    title: 'Set Đồ Thể Thao Chuyên Nghiệp',
    description: 'Thời trang cho người yêu thể thao, chất liệu co giãn tốt.',
    imageUrl: 'https://images.pexels.com/photos/4107336/pexels-photo-4107336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '920.000 VNĐ',
    details: 'Chất liệu: Spandex cao cấp.\nKiểu dáng: Áo bra thể thao và quần legging.\nĐặc điểm: Thoáng khí, thấm hút mồ hôi.\nKích cỡ: S, M, L.',
  },
  {
    id: 20,
    title: 'Váy Hoa Nữ Tính',
    description: 'Nữ tính và nhẹ nhàng, mang đến vẻ đẹp bay bổng.',
    imageUrl: 'https://images.pexels.com/photos/3987892/pexels-photo-3987892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '700.000 VNĐ',
    details: 'Chất liệu: Voan.\nKiểu dáng: Váy xòe dài.\nĐặc điểm: In hoa nhí, cổ V.\nKích cỡ: S, M, L.',
  },
  {
    id: 21,
    title: 'Set Đồ Tối Giản Thanh Lịch',
    description: 'Phong cách đơn giản, tinh tế, dễ dàng phối hợp.',
    imageUrl: 'https://images.pexels.com/photos/1070987/pexels-photo-1070987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '800.000 VNĐ',
    details: 'Chất liệu: Cotton lụa.\nKiểu dáng: Áo sơ mi và quần ống rộng.\nMàu sắc: Trắng, Đen, Be.\nKích cỡ: Freesize.',
  },
  {
    id: 22,
    title: 'Đồ Mặc Ở Nhà Thoải Mái',
    description: 'Thoải mái, dễ chịu, lý tưởng cho những giây phút thư giãn tại nhà.',
    imageUrl: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '380.000 VNĐ',
    details: 'Chất liệu: Thun cotton.\nKiểu dáng: Áo phông và quần short.\nĐặc điểm: Mềm mại, thấm hút mồ hôi.\nKích cỡ: S, M, L.',
  },
  {
    id: 23,
    title: 'Trang Phục Dạ Hội Đẳng Cấp',
    description: 'Thiết kế trang phục dạ hội sang trọng, giúp bạn tỏa sáng.',
    imageUrl: 'https://images.pexels.com/photos/247932/pexels-photo-247932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '2.500.000 VNĐ',
    details: 'Chất liệu: Lụa satin, đính kết pha lê.\nKiểu dáng: Đầm đuôi cá.\nMàu sắc: Vàng đồng, Bạc.\nKích cỡ: S, M.',
  },
  {
    id: 24,
    title: 'Thời Trang Trung Niên Thanh Lịch',
    description: 'Lịch sự và trang nhã, phù hợp với phụ nữ trung niên.',
    imageUrl: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '900.000 VNĐ',
    details: 'Chất liệu: Len cashmere.\nKiểu dáng: Áo khoác cardigan và quần tây.\nMàu sắc: Nâu, Kem.\nKích cỡ: L, XL, XXL.',
  },
  {
    id: 25,
    title: 'Bộ Đồ Denim Phong Cách',
    description: 'Phong cách jean hiện đại, cá tính và bền bỉ.',
    imageUrl: 'https://images.pexels.com/photos/6311630/pexels-photo-6311630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '1.150.000 VNĐ',
    details: 'Chất liệu: Denim cao cấp.\nKiểu dáng: Áo khoác jean và quần jean ống rộng.\nĐặc điểm: Rách nhẹ, washed.\nKích cỡ: S, M, L.',
  },
  {
    id: 26,
    title: 'Váy Cưới Tinh Khôi',
    description: 'Thiết kế sang trọng cho ngày trọng đại, biến giấc mơ thành hiện thực.',
    imageUrl: 'https://images.pexels.com/photos/2567379/pexels-photo-2567379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Liên hệ',
    details: 'Chất liệu: Ren, satin, voan.\nKiểu dáng: Công chúa, A-line, đuôi cá.\nĐặc điểm: Đính kết pha lê thủ công.\nKích cỡ: Đặt may theo số đo.',
  },
  {
    id: 27,
    title: 'Trang Phục Thời Trang Cao Cấp',
    description: 'Dành cho các sự kiện quan trọng, thiết kế độc quyền.',
    imageUrl: 'https://images.pexels.com/photos/6311661/pexels-photo-6311661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '2.800.000 VNĐ',
    details: 'Chất liệu: Cashmere, lụa tơ tằm.\nKiểu dáng: Haute Couture.\nĐặc điểm: Thiết kế độc bản, sản xuất giới hạn.\nKích cỡ: S, M.',
  },
  {
    id: 28,
    title: 'Áo Len Mùa Đông Ấm Áp',
    description: 'Giữ ấm và phong cách, không thể thiếu trong tủ đồ mùa đông.',
    imageUrl: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '580.000 VNĐ',
    details: 'Chất liệu: Len lông cừu pha cashmere.\nKiểu dáng: Cổ tròn, tay dài.\nMàu sắc: Đỏ đô, Xanh navy.\nKích cỡ: Freesize.',
  },
  {
    id: 29,
    title: 'Áo Sơ Mi Form Rộng',
    description: 'Thoáng mát, năng động, dễ dàng tạo nhiều phong cách.',
    imageUrl: 'https://images.pexels.com/photos/2240763/pexels-photo-2240763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: '400.000 VNĐ',
    details: 'Chất liệu: Cotton poplin.\nKiểu dáng: Oversized.\nMàu sắc: Sọc xanh trắng, Trắng.\nKích cỡ: Freesize.',
  },
  {
    id: 30,
    title: 'Trang Phục Biểu Diễn Nghệ Thuật',
    description: 'Sáng tạo và nghệ thuật, thiết kế đặc biệt cho sân khấu.',
    imageUrl: 'https://images.pexels.com/photos/3394210/pexels-photo-3394210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Liên hệ',
    details: 'Chất liệu: Lụa, satin, pha lê.\nKiểu dáng: Thiết kế độc quyền.\nĐặc điểm: Từng chi tiết được may thủ công.\nKích cỡ: Đặt may theo yêu cầu.',
  },
];


// Định nghĩa props cho trang chi tiết sản phẩm
interface ProductDetailPageProps {
  params: {
    id: string; // id sẽ là string vì nó được lấy từ URL
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = React.use(Promise.resolve(params));
  const productId = parseInt(resolvedParams.id, 10);

  // Tìm sản phẩm trong mảng dữ liệu
  const product = products.find(p => p.id === productId);

  // Nếu không tìm thấy sản phẩm, hiển thị trang 404
  if (!product) {
    notFound(); // Dùng notFound của Next.js cho App Router
  }

  // Lấy các sản phẩm khác (không phải sản phẩm hiện tại)
  const otherProducts = products.filter(p => p.id !== productId);

  // Chọn ngẫu nhiên 4 sản phẩm để hiển thị (hoặc ít hơn nếu không đủ)
  const shuffled = otherProducts.sort(() => 0.5 - Math.random());
  const relatedProducts = shuffled.slice(0, 4); // Lấy 4 sản phẩm đầu tiên sau khi xáo trộn

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-pink-950 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-center relative">
        {/* Nút Quay về Trang Chủ */}
        <Link href="/" passHref className="absolute top-4 left-4 z-30">
          <button className="px-6 py-2 bg-white/10 text-white rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Về Trang Chủ
          </button>
        </Link>
        {/* Nút Quay về Trang Bộ Sưu Tập (tùy chọn, nếu bạn muốn quay lại trang danh sách sản phẩm) */}
        <Link href="/collections" passHref className="absolute top-4 right-4 z-30 md:left-auto md:right-4">
          <button className="px-6 py-2 bg-white/10 text-white rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Về Bộ Sưu Tập
          </button>
        </Link>


        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-96 md:h-[500px] rounded-xl shadow-2xl overflow-hidden mt-16 md:mt-0">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-text">
            {product.title}
          </h1>
          <p className="text-gray-300 text-xl mb-6">{product.description}</p>

          <div className="mb-6">
            <p className="text-3xl font-bold text-yellow-300 mb-2">{product.price}</p>
            <p className="text-gray-400 text-sm">Giá đã bao gồm VAT (nếu có).</p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg shadow-inner mb-8">
            <h3 className="text-2xl font-semibold mb-3">Chi tiết sản phẩm</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{product.details}</p>
          </div>

          {/* Call to Action Buttons - Only "Liên hệ tư vấn" button remains */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:bg-white/10 hover:scale-105">
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </div>

      ---

      {/* --- Section sản phẩm liên quan --- */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto mt-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent animate-gradient-text">
            Khám Phá Thêm
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/collections/${p.id}`} passHref>
                <div
                  className="group bg-white/10 p-4 rounded-xl shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col h-full"
                >
                  <div className="relative w-full h-48 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 mt-auto">{p.title}</h3>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">{p.description}</p>
                  <p className="text-md font-bold text-yellow-300 mt-auto">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}