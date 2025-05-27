"use client"

import { useState, useEffect, useRef } from "react"

const fashionTrends = [
  {
    id: 1,
    title: "Minimalist Chic 2024",
    description: "Phong cách tối giản với những đường nét tinh tế và màu sắc trung tính",
    image: "/toigian.jpg?height=400&width=600",
    popularity: 95,
    growth: "+15%",
    category: "minimalist",
    colors: ["#f5f5f5", "#e0e0e0", "#9e9e9e", "#424242"],
    tags: ["Tối giản", "Thanh lịch", "Hiện đại"],
    influencers: ["@minimalist_vn", "@clean_style", "@simple_fashion"],
    trending: true,
    season: "Cả năm",
  },
  {
    id: 2,
    title: "Y2K Revival",
    description: "Sự trở lại của phong cách những năm 2000 với màu sắc neon và chất liệu metallic",
    image: "/Y2K.jpg?height=400&width=600",
    popularity: 88,
    growth: "+25%",
    category: "retro",
    colors: ["#ff00ff", "#00ffff", "#ffff00", "#ff6600"],
    tags: ["Retro", "Neon", "Metallic"],
    influencers: ["@y2k_queen", "@neon_style", "@retro_vibes"],
    trending: true,
    season: "Xuân hè",
  },
  {
    id: 3,
    title: "Sustainable Fashion",
    description: "Thời trang bền vững với chất liệu thân thiện môi trường",
    image: "/Sustainable.jpg?height=400&width=600",
    popularity: 92,
    growth: "+30%",
    category: "sustainable",
    colors: ["#8bc34a", "#4caf50", "#2e7d32", "#1b5e20"],
    tags: ["Bền vững", "Eco-friendly", "Organic"],
    influencers: ["@eco_fashion", "@green_style", "@sustainable_vn"],
    trending: true,
    season: "Cả năm",
  },
  {
    id: 4,
    title: "Cottagecore Aesthetic",
    description: "Phong cách đồng quê lãng mạn với họa tiết hoa và chất liệu tự nhiên",
    image: "/Cottagecore.jpg?height=400&width=600",
    popularity: 76,
    growth: "+12%",
    category: "romantic",
    colors: ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9"],
    tags: ["Đồng quê", "Lãng mạn", "Vintage"],
    influencers: ["@cottage_style", "@romantic_fashion", "@vintage_love"],
    trending: false,
    season: "Thu đông",
  },
  {
    id: 5,
    title: "Tech Wear",
    description: "Thời trang công nghệ với chất liệu hiện đại và thiết kế futuristic",
    image: "/Tech.jpg?height=400&width=600",
    popularity: 84,
    growth: "+20%",
    category: "futuristic",
    colors: ["#000000", "#333333", "#666666", "#999999"],
    tags: ["Công nghệ", "Futuristic", "Urban"],
    influencers: ["@tech_fashion", "@future_style", "@urban_tech"],
    trending: true,
    season: "Cả năm",
  },
  {
    id: 6,
    title: "Maximalist Expression",
    description: "Phong cách tối đa với màu sắc rực rỡ và họa tiết phức tạp",
    image: "/sacso.jpg?height=400&width=600",
    popularity: 71,
    growth: "+8%",
    category: "maximalist",
    colors: ["#e91e63", "#9c27b0", "#3f51b5", "#ff9800"],
    tags: ["Tối đa", "Rực rỡ", "Phức tạp"],
    influencers: ["@max_style", "@bold_fashion", "@colorful_life"],
    trending: false,
    season: "Xuân hè",
  },
  {
    id: 7,
    title: "Gender Neutral",
    description: "Thời trang không giới tính với thiết kế unisex hiện đại",
    image: "/hiendaiunisex.jpg?height=400&width=600",
    popularity: 89,
    growth: "+18%",
    category: "unisex",
    colors: ["#795548", "#607d8b", "#9e9e9e", "#424242"],
    tags: ["Unisex", "Hiện đại", "Linh hoạt"],
    influencers: ["@gender_free", "@unisex_style", "@neutral_fashion"],
    trending: true,
    season: "Cả năm",
  },
  {
    id: 8,
    title: "Neo-Gothic",
    description: "Phong cách gothic hiện đại với màu đen và chi tiết kim loại",
    image: "/kimloai.jpg?height=400&width=600",
    popularity: 67,
    growth: "+5%",
    category: "gothic",
    colors: ["#000000", "#1a1a1a", "#333333", "#800080"],
    tags: ["Gothic", "Tối", "Bí ẩn"],
    influencers: ["@dark_fashion", "@gothic_style", "@mysterious_look"],
    trending: false,
    season: "Thu đông",
  },
]

const trendCategories = [
  { id: "all", name: "Tất cả", icon: "🌟" },
  { id: "minimalist", name: "Tối giản", icon: "⚪" },
  { id: "retro", name: "Retro", icon: "🕺" },
  { id: "sustainable", name: "Bền vững", icon: "🌱" },
  { id: "romantic", name: "Lãng mạn", icon: "🌸" },
  { id: "futuristic", name: "Tương lai", icon: "🚀" },
  { id: "maximalist", name: "Tối đa", icon: "🎨" },
  { id: "unisex", name: "Unisex", icon: "⚖️" },
  { id: "gothic", name: "Gothic", icon: "🖤" },
]

export default function FashionTrends() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTrend, setSelectedTrend] = useState(fashionTrends[0])
  const [hoveredTrend, setHoveredTrend] = useState<number | null>(null)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  const filteredTrends = fashionTrends.filter(
    (trend) => selectedCategory === "all" || trend.category === selectedCategory,
  )

  const trendingTrends = fashionTrends.filter((trend) => trend.trending)

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % trendingTrends.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, trendingTrends.length])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
      return () => section.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section ref={sectionRef} id="trends" className="py-20 px-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30"></div>

      {/* Mouse Follower */}
      <div
        className="fixed w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-300"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-float opacity-30"
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-text">
              Xu Hướng Thời Trang
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Khám phá những xu hướng thời trang mới nhất và hot nhất năm 2024
          </p>
        </div>

        {/* Trending Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-white">🔥 Đang Hot</h3>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              {isAutoPlay ? "⏸️ Tạm dừng" : "▶️ Tự động"}
            </button>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {trendingTrends.map((trend) => (
                  <div key={trend.id} className="w-full flex-shrink-0 relative group">
                    <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
                      <img
                        src={trend.image || "/placeholder.svg"}
                        alt={trend.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Trend Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full animate-pulse">
                            HOT
                          </span>
                          <span className="text-green-400 font-semibold">{trend.growth}</span>
                        </div>

                        <h4 className="text-3xl font-bold text-white mb-2">{trend.title}</h4>
                        <p className="text-gray-300 mb-4">{trend.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex gap-1">
                              {trend.colors.map((color, i) => (
                                <div
                                  key={i}
                                  className="w-4 h-4 rounded-full border-2 border-white/50"
                                  style={{ backgroundColor: color }}
                                ></div>
                              ))}
                            </div>
                            <span className="text-purple-400 font-semibold">{trend.popularity}% phổ biến</span>
                          </div>
                          <button
                            onClick={() => setSelectedTrend(trend)}
                            className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105"
                          >
                            Khám phá →
                          </button>
                        </div>
                      </div>

                      {/* Popularity Bar */}
                      <div className="absolute top-4 left-4 right-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                          <div className="flex items-center justify-between text-white text-sm mb-1">
                            <span>Độ phổ biến</span>
                            <span>{trend.popularity}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${trend.popularity}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {trendingTrends.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-purple-500 scale-125" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {trendCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105 shadow-lg shadow-purple-500/50"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Trends Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredTrends.map((trend, index) => (
            <div
              key={trend.id}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredTrend(trend.id)}
              onMouseLeave={() => setHoveredTrend(null)}
              onClick={() => setSelectedTrend(trend)}
            >
              {/* Trend Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={trend.image || "/placeholder.svg"}
                  alt={trend.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Trending Badge */}
                {trend.trending && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-full animate-pulse">
                    🔥 Trending
                  </div>
                )}

                {/* Growth Indicator */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  {trend.growth}
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 transition-opacity duration-500 ${
                    hoveredTrend === trend.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>

              {/* Trend Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {trend.title}
                  </h3>
                  <span className="text-gray-400 text-sm">{trend.season}</span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{trend.description}</p>

                {/* Color Palette */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400 text-xs">Màu sắc:</span>
                  <div className="flex gap-1">
                    {trend.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-600 hover:scale-125 transition-transform duration-300"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {trend.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Popularity Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>Độ phổ biến</span>
                    <span>{trend.popularity}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${trend.popularity}%` }}
                    ></div>
                  </div>
                </div>

                {/* Influencers */}
                <div className="text-xs text-gray-400">
                  <span>Influencers: </span>
                  {trend.influencers.slice(0, 2).map((influencer, i) => (
                    <span key={i} className="text-purple-400 hover:text-purple-300 cursor-pointer">
                      {influencer}
                      {i < 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-2xl transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Selected Trend Detail */}
        {selectedTrend && (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 mb-16">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <img
                    src={selectedTrend.image || "/vaydai.jpg"}
                    alt={selectedTrend.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Color Palette Large */}
                <div className="grid grid-cols-4 gap-4">
                  {selectedTrend.colors.map((color, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl border-2 border-gray-600 hover:scale-105 transition-transform duration-300 cursor-pointer"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold text-white">{selectedTrend.title}</h3>
                  {selectedTrend.trending && (
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full animate-pulse">
                      🔥 HOT
                    </span>
                  )}
                </div>

                <p className="text-gray-300 text-lg mb-6">{selectedTrend.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{selectedTrend.popularity}%</div>
                    <div className="text-gray-400 text-sm">Độ phổ biến</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-400 mb-1">{selectedTrend.growth}</div>
                    <div className="text-gray-400 text-sm">Tăng trưởng</div>
                  </div>
                </div>

                {/* Influencers */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Top Influencers</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrend.influencers.map((influencer, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300 cursor-pointer"
                      >
                        {influencer}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300">
                    Mua sắm theo xu hướng
                  </button>
                  <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors duration-300">
                    Lưu xu hướng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trend Prediction */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">🔮 Dự đoán xu hướng 2025</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              AI của chúng tôi dự đoán những xu hướng thời trang sẽ bùng nổ trong năm tới
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { name: "Neo-Vintage", probability: "85%" },
                { name: "Digital Fashion", probability: "78%" },
                { name: "Biophilic Design", probability: "92%" },
              ].map((prediction, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white font-semibold mb-2">{prediction.name}</div>
                  <div className="text-yellow-300 text-2xl font-bold">{prediction.probability}</div>
                </div>
              ))}
            </div>
            <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Xem chi tiết dự đoán
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-4 right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </section>
  )
}
