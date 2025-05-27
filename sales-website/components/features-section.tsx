"use client"

import { useState, useEffect, useRef } from "react"

const features = [
  {
    icon: "👗",
    title: "Thiết Kế Độc Quyền",
    description: "Những mẫu thiết kế độc đáo chỉ có tại DSA",
  },
  {
    icon: "🚚",
    title: "Giao Hàng Nhanh",
    description: "Giao hàng miễn phí toàn quốc trong 24h",
  },
  {
    icon: "💎",
    title: "Chất Lượng Cao Cấp",
    description: "Chất liệu nhập khẩu và công nghệ may tiên tiến",
  },
  {
    icon: "📱",
    title: "Mua Sắm Dễ Dàng",
    description: "Ứng dụng mobile thân thiện và dễ sử dụng",
  },
  {
    icon: "🔄",
    title: "Đổi Trả Linh Hoạt",
    description: "Chính sách đổi trả trong 30 ngày không điều kiện",
  },
  {
    icon: "🎯",
    title: "Tư Vấn Phong Cách",
    description: "Đội ngũ stylist chuyên nghiệp tư vấn miễn phí",
  },
]

export default function FeaturesSection() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures((prev) => [...prev, index])
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="py-20 px-6 relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Tại Sao Chọn Chúng Tôi
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Những ưu điểm vượt trội giúp DSA trở thành lựa chọn hàng đầu của khách hàng
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 transition-all duration-700 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 ${
                visibleFeatures.includes(index)
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {feature.icon}
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Hover effect lines */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
            </div>
          ))}
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </section>
  )
}
