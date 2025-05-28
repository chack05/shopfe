// app/collections/page.tsx

'use client'

import Image from 'next/image'
import Link from 'next/link' // Import Link component từ Next.js

// Dữ liệu sản phẩm (đây là dữ liệu mẫu, trong thực tế bạn sẽ lấy từ API)
const products = [
  {
    id: 1,
    title: 'Áo Dài Truyền Thống',
    description: 'Thiết kế áo dài tinh tế mang đậm bản sắc Việt.',
    imageUrl: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '1.250.000 VNĐ',
  },
  {
    id: 2,
    title: 'Trang Phục Đường Phố',
    description: 'Phong cách trẻ trung, cá tính.',
    imageUrl: 'https://images.pexels.com/photos/2929991/pexels-photo-2929991.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '680.000 VNĐ',
  },
  {
    id: 3,
    title: 'Bộ Đồ Công Sở',
    description: 'Thanh lịch và chuyên nghiệp.',
    imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '950.000 VNĐ',
  },
  {
    id: 4,
    title: 'Trang Phục Dạo Phố',
    description: 'Thoải mái cho ngày năng động.',
    imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '490.000 VNĐ',
  },
  {
    id: 5,
    title: 'Phong Cách Hiphop',
    description: 'Cá tính và nổi bật.',
    imageUrl: 'https://images.pexels.com/photos/6311393/pexels-photo-6311393.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '720.000 VNĐ',
  },
  {
    id: 6,
    title: 'Bộ Đồ Năng Động',
    description: 'Thể thao, phù hợp vận động.',
    imageUrl: 'https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '890.000 VNĐ',
  },
  {
    id: 7,
    title: 'Thời Trang Học Sinh',
    description: 'Đơn giản và trẻ trung.',
    imageUrl: 'https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '350.000 VNĐ',
  },
  {
    id: 8,
    title: 'Bộ Váy Dự Tiệc',
    description: 'Quyến rũ và sang trọng.',
    imageUrl: 'https://images.pexels.com/photos/6311614/pexels-photo-6311614.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '1.800.000 VNĐ',
  },
  {
    id: 9,
    title: 'Set Đồ Dã Ngoại',
    description: 'Thoải mái cho ngày nghỉ cuối tuần.',
    imageUrl: 'https://images.pexels.com/photos/1677035/pexels-photo-1677035.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '780.000 VNĐ',
  },
  {
    id: 10,
    title: 'Trang Phục Trẻ Em',
    description: 'Đáng yêu và năng động.',
    imageUrl: 'https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '320.000 VNĐ',
  },
  {
    id: 11,
    title: 'Áo Khoác Dài',
    description: 'Ấm áp và thời thượng.',
    imageUrl: 'https://images.pexels.com/photos/6311607/pexels-photo-6311607.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '1.500.000 VNĐ',
  },
  {
    id: 12,
    title: 'Set Đồ Boho',
    description: 'Tự do và phóng khoáng.',
    imageUrl: 'https://images.pexels.com/photos/2060241/pexels-photo-2060241.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '850.000 VNĐ',
  },
  {
    id: 13,
    title: 'Áo Crop Top',
    description: 'Gợi cảm và trẻ trung.',
    imageUrl: 'https://images.pexels.com/photos/2531230/pexels-photo-2531230.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '280.000 VNĐ',
  },
  {
    id: 14,
    title: 'Thời Trang Mùa Hè',
    description: 'Mát mẻ và năng động.',
    imageUrl: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '550.000 VNĐ',
  },
  {
    id: 15,
    title: 'Thời Trang Vintage',
    description: 'Cổ điển và độc đáo.',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '980.000 VNĐ',
  },
  {
    id: 16,
    title: 'Áo Hoodie Unisex',
    description: 'Phù hợp cả nam và nữ.',
    imageUrl: 'https://images.pexels.com/photos/3657420/pexels-photo-3657420.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '420.000 VNĐ',
  },
  {
    id: 17,
    title: 'Thời Trang Mùa Đông',
    description: 'Ấm áp và phong cách.',
    imageUrl: 'https://images.pexels.com/photos/3535284/pexels-photo-3535284.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '1.100.000 VNĐ',
  },
  {
    id: 18,
    title: 'Bộ Đồ Dạo Biển',
    description: 'Tươi mát và trẻ trung.',
    imageUrl: 'https://images.pexels.com/photos/3568542/pexels-photo-3568542.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '650.000 VNĐ',
  },
  {
    id: 19,
    title: 'Set Đồ Thể Thao',
    description: 'Thời trang cho người yêu thể thao.',
    imageUrl: 'https://images.pexels.com/photos/4107336/pexels-photo-4107336.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '920.000 VNĐ',
  },
  {
    id: 20,
    title: 'Váy Hoa',
    description: 'Nữ tính và nhẹ nhàng.',
    imageUrl: 'https://images.pexels.com/photos/3987892/pexels-photo-3987892.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '700.000 VNĐ',
  },
  {
    id: 21,
    title: 'Set Đồ Tối Giản',
    description: 'Phong cách đơn giản, tinh tế.',
    imageUrl: 'https://images.pexels.com/photos/1070987/pexels-photo-1070987.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '800.000 VNĐ',
  },
  {
    id: 22,
    title: 'Đồ Mặc Ở Nhà',
    description: 'Thoải mái, dễ chịu.',
    imageUrl: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '380.000 VNĐ',
  },
  {
    id: 23,
    title: 'Trang Phục Dạ Hội',
    description: 'Thiết kế trang phục dạ hội sang trọng.',
    imageUrl: 'https://images.pexels.com/photos/247932/pexels-photo-247932.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '2.500.000 VNĐ',
  },
  {
    id: 24,
    title: 'Thời Trang Trung Niên',
    description: 'Lịch sự và trang nhã.',
    imageUrl: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '900.000 VNĐ',
  },
  {
    id: 25,
    title: 'Bộ Đồ Denim',
    description: 'Phong cách jean hiện đại.',
    imageUrl: 'https://images.pexels.com/photos/6311630/pexels-photo-6311630.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '1.150.000 VNĐ',
  },
  {
    id: 26,
    title: 'Váy Cưới',
    description: 'Thiết kế sang trọng cho ngày trọng đại.',
    imageUrl: 'https://images.pexels.com/photos/2567379/pexels-photo-2567379.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 'Liên hệ',
  },
  {
    id: 27,
    title: 'Trang Phục Thời Trang Cao Cấp',
    description: 'Dành cho các sự kiện quan trọng.',
    imageUrl: 'https://images.pexels.com/photos/6311661/pexels-photo-6311661.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '2.800.000 VNĐ',
  },
  {
    id: 28,
    title: 'Áo Len Mùa Đông',
    description: 'Giữ ấm và phong cách.',
    imageUrl: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '580.000 VNĐ',
  },
  {
    id: 29,
    title: 'Áo Sơ Mi Form Rộng',
    description: 'Thoáng mát, năng động.',
    imageUrl: 'https://images.pexels.com/photos/2240763/pexels-photo-2240763.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: '400.000 VNĐ',
  },
  {
    id: 30,
    title: 'Trang Phục Biểu Diễn',
    description: 'Sáng tạo và nghệ thuật.',
    imageUrl: 'https://images.pexels.com/photos/3394210/pexels-photo-3394210.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 'Liên hệ',
  },
];


export default function CollectionsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-pink-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-text">
          Bộ Sưu Tập
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-12">
          Những thiết kế thời trang đậm chất Việt Nam – hiện đại, cá tính và tinh tế
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            // Bọc toàn bộ card sản phẩm bằng Link để điều hướng đến trang chi tiết
            <Link key={product.id} href={`/collections/${product.id}`} passHref>
              <div
                className="group bg-white/10 p-4 rounded-xl shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill // Fill the parent div
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110" // Thêm hiệu ứng hover
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2 mt-auto">{product.title}</h2> {/* mt-auto để đẩy lên trên */}
                <p className="text-gray-300 text-sm mb-2 line-clamp-2">{product.description}</p> {/* line-clamp-2 giới hạn 2 dòng */}
                <p className="text-lg font-bold text-yellow-300 mt-auto">{product.price}</p> {/* mt-auto để đẩy xuống dưới */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}