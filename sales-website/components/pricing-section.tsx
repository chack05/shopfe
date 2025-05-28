"use client"
// thẻ thành viên cho khách hàng
import { useState } from "react"

const plans = [
  {
    name: "Thành Viên Bạc",
    price: "0₫",
    period: "/tháng",
    description: "Dành cho khách hàng mới bắt đầu",
    features: ["Giảm giá 5%", "Giao hàng tiêu chuẩn", "Hỗ trợ online", "Đổi trả trong 7 ngày", "Catalog sản phẩm"],
    popular: false,
    color: "from-gray-500 to-gray-600",
  },
  {
    name: "Thành Viên Vàng",
    price: "299.000₫",
    period: "/tháng",
    description: "Lý tưởng cho người yêu thời trang",
    features: [
      "Giảm giá 15%",
      "Giao hàng nhanh miễn phí",
      "Tư vấn stylist",
      "Đổi trả trong 15 ngày",
      "Ưu tiên sản phẩm mới",
      "Sinh nhật đặc biệt",
    ],
    popular: true,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Thành Viên Kim Cương",
    price: "599.000₫",
    period: "/tháng",
    description: "Dành cho tín đồ thời trang cao cấp",
    features: [
      "Giảm giá 25%",
      "Giao hàng VIP 2h",
      "Stylist riêng 24/7",
      "Đổi trả không giới hạn",
      "Thiết kế riêng",
      "Event độc quyền",
      "Quà tặng hàng tháng",
    ],
    popular: false,
    color: "from-blue-500 to-purple-500",
  },
]

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <section id="pricing" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Gói Thành Viên
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Chọn gói thành viên phù hợp để tận hưởng những ưu đãi đặc biệt từ DSA
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-500 hover:scale-105 ${
                plan.popular ? "scale-105 z-10" : ""
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold animate-pulse">
                    Phổ Biến Nhất
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border-2 transition-all duration-500 ${
                  plan.popular
                    ? "border-yellow-500 shadow-2xl shadow-yellow-500/20"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                {/* Animated background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                ></div>

                {/* Plan name */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-lg">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-300 transform transition-all duration-300"
                      style={{
                        transitionDelay: hoveredPlan === index ? `${i * 50}ms` : "0ms",
                        transform: hoveredPlan === index ? "translateX(10px)" : "translateX(0)",
                      }}
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${plan.color} rounded-full mr-3 animate-pulse`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:shadow-lg hover:shadow-yellow-500/50"
                      : "border-2 border-gray-600 text-white hover:border-gray-500 hover:bg-gray-800"
                  } transform hover:scale-105`}
                >
                  {plan.popular ? "Đăng Ký Ngay" : "Chọn Gói"}
                </button>

                {/* Floating particles */}
                {hoveredPlan === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${plan.color} rounded-full animate-ping`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
