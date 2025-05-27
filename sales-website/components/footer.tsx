"use client"

import type React from "react"

import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setEmail("")
    alert("Đăng ký thành công!")
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black py-16 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  VietFashion
                </span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Thương hiệu thời trang hàng đầu Việt Nam, mang đến những sản phẩm chất lượng cao với thiết kế độc đáo và
                phong cách hiện đại.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-3">Theo dõi chúng tôi</h4>
              <div className="flex gap-3">
                {[
                  { icon: "📘", name: "Facebook", color: "hover:text-blue-500" },
                  { icon: "📷", name: "Instagram", color: "hover:text-pink-500" },
                  { icon: "🐦", name: "Twitter", color: "hover:text-blue-400" },
                  { icon: "📺", name: "YouTube", color: "hover:text-red-500" },
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`p-3 bg-gray-800 text-gray-300 rounded-full transition-all duration-300 hover:scale-110 ${social.color}`}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {["Về chúng tôi", "Sản phẩm", "Tin tức", "Liên hệ", "Tuyển dụng", "Đối tác"].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-6">Hỗ trợ khách hàng</h4>
            <ul className="space-y-3">
              {[
                "Hướng dẫn mua hàng",
                "Chính sách đổi trả",
                "Phương thức thanh toán",
                "Vận chuyển",
                "Bảo hành",
                "FAQ",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Đăng ký nhận tin</h4>
            <p className="text-gray-300 mb-4">Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
              >
                Đăng ký
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3 text-gray-300">
                <span>📞</span>
                <span>1900 1234</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span>📧</span>
                <span>hello@vietfashion.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">© 2024 VietFashion. Tất cả quyền được bảo lưu.</p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Phương thức thanh toán:</span>
              <div className="flex gap-2">
                {["VNPay", "MoMo", "ZaloPay", "Visa", "Mastercard"].map((method, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700 hover:border-purple-500 transition-colors duration-300"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            {["Điều khoản sử dụng", "Chính sách bảo mật", "Chính sách cookie", "Sitemap"].map((link, index) => (
              <a key={index} href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
