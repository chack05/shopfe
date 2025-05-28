"use client"
// bình luận khách hàng 
import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Nguyễn Thị Lan",
    role: "Giám đốc Marketing, Hà Nội",
    content:
      "Chất lượng sản phẩm tuyệt vời! Áo dài tôi mua ở đây được nhiều người khen ngợi. Sẽ tiếp tục ủng hộ DSA.",
    avatar: "/lan.jpg?holder.svg?height=80&width=80",
    rating: 5,
  },
  {
    name: "Trần Minh Hoàng",
    role: "Doanh nhân, TP.HCM",
    content: "Bộ suit ở đây rất đẹp và vừa vặn. Dịch vụ tư vấn nhiệt tình, giao hàng nhanh chóng.",
    avatar: "/hoang.jpg?height=80&width=80",
    rating: 5,
  },
  {
    name: "Lê Thị Mai",
    role: "Blogger thời trang, Đà Nẵng",
    content:
      "DSA là nơi tôi tìm thấy những món đồ độc đáo nhất. Thiết kế hiện đại mà vẫn giữ được nét truyền thống.",
    avatar: "/mai.jpg?height=80&width=80",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-20 px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30"></div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Khách Hàng Nói Gì
            </span>
          </h2>
          <p className="text-xl text-gray-300">Những phản hồi chân thực từ khách hàng yêu thích DSA</p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Quote icon */}
                  <div className="text-6xl text-purple-400/30 mb-6">"</div>

                  {/* Content */}
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">{testimonial.content}</p>

                  {/* Rating */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div
                        key={i}
                        className="text-yellow-400 text-2xl animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500/50"
                    />
                    <div>
                      <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-purple-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-purple-500 scale-125" : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
