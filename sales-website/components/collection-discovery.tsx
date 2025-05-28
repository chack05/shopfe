"use client"
// Khám phá bộ sưu tập.
import type React from "react"

import { useState, useEffect } from "react"
import CollectionViewModal from "./collection-view-modal"

const collections = [
  {
    id: 1,
    name: "Bộ Sưu Tập Cưới",
    description: "Những thiết kế áo dài cưới sang trọng và tinh tế",
    image: "/vay-cuoi.jpg?height=400&width=600",
    itemCount: 24,
    category: "wedding",
    featured: true,
    colors: ["#ff6b9d", "#ffd93d", "#6bcf7f"],
    tags: ["Áo dài", "Cưới hỏi", "Sang trọng"],
  },
  {
    id: 2,
    name: "Thời Trang Công Sở",
    description: "Phong cách chuyên nghiệp cho môi trường làm việc",
    image: "/thoitrangcongso.jpg?height=400&width=600",
    itemCount: 36,
    category: "office",
    featured: false,
    colors: ["#4a90e2", "#7b68ee", "#50c878"],
    tags: ["Suit", "Công sở", "Chuyên nghiệp"],
  },
  {
    id: 3,
    name: "Xuân Hè 2024",
    description: "Bộ sưu tập tươi mới cho mùa xuân hè",
    image: "/xuanhe2024.jpg?height=400&width=600",
    itemCount: 42,
    category: "summer",
    featured: true,
    colors: ["#ff7f50", "#98fb98", "#87ceeb"],
    tags: ["Xuân hè", "Tươi mới", "Năng động"],
  },
  {
    id: 4,
    name: "Dạ Hội Sang Trọng",
    description: "Những thiết kế lộng lẫy cho các sự kiện đặc biệt",
    image: "/dahoi.jpg?height=400&width=600",
    itemCount: 18,
    category: "evening",
    featured: false,
    colors: ["#8b008b", "#ffd700", "#dc143c"],
    tags: ["Dạ hội", "Sang trọng", "Lộng lẫy"],
  },
  {
    id: 5,
    name: "Thể Thao Năng Động",
    description: "Trang phục thể thao hiện đại và thoải mái",
    image: "/aothethao.jpg?height=100&width=600",
    itemCount: 28,
    category: "sport",
    featured: false,
    colors: ["#ff4500", "#32cd32", "#1e90ff"],
    tags: ["Thể thao", "Năng động", "Thoải mái"],
  },
  {
    id: 6,
    name: "Thu Đông Ấm Áp",
    description: "Bộ sưu tập ấm áp cho mùa thu đông",
    image: "/thudong.jpg?height=400&width=600",
    itemCount: 31,
    category: "winter",
    featured: true,
    colors: ["#8b4513", "#cd853f", "#daa520"],
    tags: ["Thu đông", "Ấm áp", "Cổ điển"],
  },
]

const trendingStyles = [
  {
    id: 1,
    name: "Minimalist Chic",
    description: "Phong cách tối giản nhưng tinh tế",
    image: "/toigian.jpg?height=300&width=300",
    popularity: 95,
  },
  {
    id: 2,
    name: "Vintage Romance",
    description: "Nét cổ điển kết hợp hiện đại",
    image: "/codien.jpg?height=300&width=300",
    popularity: 88,
  },
  {
    id: 3,
    name: "Urban Street",
    description: "Phong cách đường phố năng động",
    image: "/dungpho.jpg?height=300&width=300",
    popularity: 92,
  },
  {
    id: 4,
    name: "Bohemian Dream",
    description: "Tự do và phóng khoáng",
    image: "/phongkhoan.jpg?height=300&width=300",
    popularity: 85,
  },
]

export default function CollectionDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [selectedCollection, setSelectedCollection] = useState<any>(null)
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false)

  const categories = [
    { id: "all", name: "Tất cả", icon: "🏷️" },
    { id: "wedding", name: "Cưới hỏi", icon: "💒" },
    { id: "office", name: "Công sở", icon: "💼" },
    { id: "summer", name: "Xuân hè", icon: "🌸" },
    { id: "evening", name: "Dạ hội", icon: "🌙" },
    { id: "sport", name: "Thể thao", icon: "⚽" },
    { id: "winter", name: "Thu đông", icon: "❄️" },
  ]

  const filteredCollections = collections.filter(
    (collection) => selectedCategory === "all" || collection.category === selectedCategory,
  )

  const featuredCollections = collections.filter((c) => c.featured)

  useEffect(() => {
    if (isAutoPlay && featuredCollections.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredCollections.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, featuredCollections.length])

  const handleViewCollection = (collection: any, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    setSelectedCollection(collection)
    setIsCollectionModalOpen(true)
  }

  const handleCarouselNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentSlide((prev) => (prev === 0 ? featuredCollections.length - 1 : prev - 1))
    } else {
      setCurrentSlide((prev) => (prev + 1) % featuredCollections.length)
    }
  }

  return (
    <>
      <section id="collections" className="py-20 px-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-48 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Khám Phá Bộ Sưu Tập
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Những bộ sưu tập được tuyển chọn kỹ lưỡng, mang đến phong cách thời trang độc đáo cho từng dịp đặc biệt
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
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

          {/* Featured collections carousel */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-white">✨ Bộ Sưu Tập Nổi Bật</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    isAutoPlay
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  {isAutoPlay ? "⏸️ Tạm dừng" : "▶️ Tự động"}
                </button>
                <div className="text-gray-400 text-sm">
                  {currentSlide + 1} / {featuredCollections.length}
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredCollections.map((collection, index) => (
                    <div key={collection.id} className="w-full flex-shrink-0 relative">
                      <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden group/slide">
                        <img
                          src={collection.image || "/codien.jpg"}
                          alt={collection.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover/slide:scale-110"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                        {/* Animated particles overlay */}
                        <div className="absolute inset-0">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                              }}
                            ></div>
                          ))}
                        </div>

                        {/* Collection info overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                          {/* Color palette */}
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-white/80 text-sm font-medium">Bảng màu:</span>
                            {collection.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full border-2 border-white/50 shadow-lg hover:scale-125 transition-transform duration-300 cursor-pointer"
                                style={{ backgroundColor: color }}
                                title={`Màu ${i + 1}`}
                              ></div>
                            ))}
                          </div>

                          <h4 className="text-4xl font-bold text-white mb-3 animate-fade-in-up">{collection.name}</h4>
                          <p
                            className="text-gray-200 text-lg mb-6 max-w-2xl animate-fade-in-up"
                            style={{ animationDelay: "0.2s" }}
                          >
                            {collection.description}
                          </p>

                          <div
                            className="flex items-center justify-between animate-fade-in-up"
                            style={{ animationDelay: "0.4s" }}
                          >
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2">
                                <span className="text-purple-400 font-bold text-xl">{collection.itemCount}</span>
                                <span className="text-white/80">sản phẩm</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-yellow-400">⭐</span>
                                <span className="text-white/80">Nổi bật</span>
                              </div>
                            </div>

                            {/* Main CTA Button */}
                            <button
                              onClick={(e) => handleViewCollection(collection, e)}
                              className="group/btn relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95"
                            >
                              {/* Button background animation */}
                              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

                              {/* Button content */}
                              <div className="relative flex items-center gap-3">
                                <span>Khám phá ngay</span>
                                <div className="transform group-hover/btn:translate-x-1 transition-transform duration-300">
                                  →
                                </div>
                              </div>

                              {/* Ripple effect */}
                              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </button>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                          {collection.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 hover:bg-black/80 transition-all duration-300 animate-fade-in-down"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Featured badge */}
                        <div className="absolute top-6 right-6 z-10">
                          <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold rounded-full animate-pulse shadow-lg">
                            🌟 NỔI BẬT
                          </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="absolute bottom-6 right-6 z-10">
                          <div className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-full">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            <span className="text-white text-sm">
                              {index + 1}/{featuredCollections.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => handleCarouselNavigation("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleCarouselNavigation("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Carousel indicators */}
              <div className="flex justify-center mt-8 gap-3">
                {featuredCollections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative transition-all duration-300 ${
                      currentSlide === index
                        ? "w-12 h-3 bg-purple-500 rounded-full"
                        : "w-3 h-3 bg-gray-600 rounded-full hover:bg-gray-500"
                    }`}
                  >
                    {currentSlide === index && (
                      <div className="absolute inset-0 bg-purple-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Quick preview thumbnails */}
              <div className="flex justify-center mt-6 gap-4">
                {featuredCollections.map((collection, index) => (
                  <button
                    key={collection.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                      currentSlide === index
                        ? "border-purple-500 scale-110 shadow-lg shadow-purple-500/50"
                        : "border-gray-600 hover:border-gray-400 hover:scale-105"
                    }`}
                  >
                    <img
                      src={collection.image || "/codien.jpg"}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">{index + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Collections grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredCollections.map((collection, index) => (
              <div
                key={collection.id}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up"
                onMouseEnter={() => setHoveredCollection(collection.id)}
                onMouseLeave={() => setHoveredCollection(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Collection image */}
               <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-md">
<img
  src={collection.image || "/placeholder.svg"}
  alt={collection.name}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 transition-opacity duration-500 ${
                      hoveredCollection === collection.id ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>

                  {/* Featured badge */}
                  {collection.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold rounded-full animate-pulse">
                      Nổi bật
                    </div>
                  )}

                  {/* Item count */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
                    {collection.itemCount} items
                  </div>
                </div>

                {/* Collection info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {collection.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-gray-600 hover:scale-125 transition-transform duration-300"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {collection.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{collection.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {collection.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action button */}
                  <button
                    onClick={() => handleViewCollection(collection)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
                  >
                    Xem bộ sưu tập
                  </button>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-2xl transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Trending styles section */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Xu Hướng Thời Trang</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingStyles.map((style, index) => (
                <div
                  key={style.id}
                  className="group relative bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-700/50 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">

                    <img
                      src={style.image || "/placeholder.svg"}
                      alt={style.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    {/* Popularity indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
                      <span>🔥</span>
                      {style.popularity}%
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {style.name}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">{style.description}</p>

                    {/* Popularity bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${style.popularity}%` }}
                      ></div>
                    </div>

                    <button className="w-full py-2 text-purple-400 hover:text-white hover:bg-purple-600 rounded-lg transition-all duration-300 text-sm">
                      Khám phá phong cách
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Style guide CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">Cần tư vấn phong cách?</h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Đội ngũ stylist chuyên nghiệp của chúng tôi sẽ giúp bạn tìm ra phong cách phù hợp nhất
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                    Tư vấn miễn phí
                  </button>
                  <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105">
                    Xem lookbook
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
              <div
                className="absolute bottom-4 right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection View Modal */}
      <CollectionViewModal
        collection={selectedCollection}
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
      />
    </>
  )
}
