"use client"

import type React from "react"

import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 px-6 relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Liên Hệ Với Chúng Tôi
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hãy để VietFashion đồng hành cùng bạn trong hành trình khám phá phong cách thời trang độc đáo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="group">
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-purple-400 transition-colors duration-300">
                Kết Nối Với Chúng Tôi
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Đội ngũ tư vấn viên chuyên nghiệp của VietFashion luôn sẵn sàng hỗ trợ bạn tìm kiếm những sản phẩm thời
                trang hoàn hảo nhất.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-6">
              {[
                { icon: "📧", label: "Email", value: "hello@vietfashion.vn" },
                { icon: "📞", label: "Hotline", value: "1900 1234 (miễn phí)" },
                { icon: "📍", label: "Địa chỉ", value: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM" },
                { icon: "🕒", label: "Giờ làm việc", value: "8:00 - 22:00 (Thứ 2 - Chủ nhật)" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <div className="text-purple-400 font-semibold">{item.label}</div>
                    <div className="text-gray-300">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
                    placeholder="Họ và tên"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
                    placeholder="Email của bạn"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="relative group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
                  placeholder="Số điện thoại"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Bạn muốn tìm kiếm sản phẩm gì? Hãy chia sẻ với chúng tôi..."
                ></textarea>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Đang gửi...</span>
                  </div>
                ) : submitted ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span>✓</span>
                    <span>Đã gửi thành công!</span>
                  </div>
                ) : (
                  "Gửi Tin Nhắn"
                )}
              </button>
            </form>

            {/* Success animation */}
            {submitted && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-xl">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">🎉</div>
                  <div className="text-white text-xl font-semibold">Cảm ơn bạn!</div>
                  <div className="text-gray-300">Chúng tôi sẽ liên hệ lại sớm nhất.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
