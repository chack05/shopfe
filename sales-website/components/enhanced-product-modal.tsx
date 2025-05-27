"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useProduct } from "@/contexts/product-context"
import { useCart } from "@/contexts/cart-context"

const relatedProducts = [
  {
    id: 9,
    name: "Áo Dài Truyền Thống",
    price: 3200000,
    image: "/tryenthong.jpg?height=200&width=200",
    rating: 4.8,
  },
  {
    id: 10,
    name: "Giày Cao Gót Sang Trọng",
    price: 1800000,
    image: "/caogot.jpg?height=200&width=200",
    rating: 4.6,
  },
  {
    id: 11,
    name: "Túi Xách Da Thật",
    price: 2500000,
    image: "/tuisach.jpg?height=200&width=200",
    rating: 4.9,
  },
]

const customerReviews = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    rating: 5,
    comment: "Sản phẩm rất đẹp và chất lượng tốt. Tôi rất hài lòng với việc mua hàng này.",
    date: "15/12/2024",
    avatar: "/lan.jpg?height=40&width=40",
    verified: true,
  },
  {
    id: 2,
    name: "Trần Minh Hoàng",
    rating: 4,
    comment: "Chất lượng ổn, giao hàng nhanh. Sẽ ủng hộ shop tiếp.",
    date: "12/12/2024",
    avatar: "/hoang.jpg?height=40&width=40",
    verified: true,
  },
  {
    id: 3,
    name: "Lê Thị Mai",
    rating: 5,
    comment: "Thiết kế đẹp, form dáng chuẩn. Rất đáng tiền!",
    date: "10/12/2024",
    avatar: "/mai.jpg?height=40&width=40",
    verified: false,
  },
]

export default function EnhancedProductModal() {
  const { selectedProduct, isProductModalOpen, setIsProductModalOpen } = useProduct()
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("details")
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [is360View, setIs360View] = useState(false)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.sizes[0] || "")
      setSelectedColor(selectedProduct.colors[0] || "")
      setCurrentImageIndex(0)
      setActiveTab("details")
    }
  }, [selectedProduct])

  if (!isProductModalOpen || !selectedProduct) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleAddToCart = () => {
    if (selectedProduct.sizes.length > 0 && !selectedSize) {
      alert("Vui lòng chọn size")
      return
    }
    if (selectedProduct.colors.length > 0 && !selectedColor) {
      alert("Vui lòng chọn màu")
      return
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        size: selectedSize,
        color: selectedColor,
      })
    }

    setIsProductModalOpen(false)
  }

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const handle360Drag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (is360View) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const newRotation = (x / rect.width) * 360
      setRotation(newRotation)
    }
  }

  const tabs = [
    { id: "details", name: "Chi tiết", icon: "📋" },
    { id: "specs", name: "Thông số", icon: "📏" },
    { id: "reviews", name: "Đánh giá", icon: "⭐" },
    { id: "shipping", name: "Vận chuyển", icon: "🚚" },
  ]

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto animate-zoom-in">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg flex justify-between items-center p-6 border-b border-gray-700 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Chi tiết sản phẩm</h2>
            {selectedProduct.isNew && (
              <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full animate-pulse">MỚI</span>
            )}
            {selectedProduct.isSale && (
              <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full animate-bounce">SALE</span>
            )}
          </div>
          <button
            onClick={() => setIsProductModalOpen(false)}
            className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-300 hover:rotate-90"
          >
            ✕
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div
                className="relative overflow-hidden rounded-xl bg-gray-800 cursor-zoom-in"
                onMouseMove={handleImageZoom}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseDown={handle360Drag}
                onMouseMove={is360View ? handle360Drag : handleImageZoom}
              >
                <img
                  src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className={`w-full h-96 object-cover transition-all duration-500 ${
                    isZoomed ? "scale-150" : "scale-100"
                  } ${is360View ? "cursor-grab" : "cursor-zoom-in"}`}
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: is360View ? `rotateY(${rotation}deg)` : undefined,
                  }}
                />

                {/* 360 View Indicator */}
                {is360View && (
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                    360° View - Kéo để xoay
                  </div>
                )}

                {/* Image Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIs360View(!is360View)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      is360View ? "bg-purple-600 text-white" : "bg-black/50 text-white hover:bg-black/70"
                    }`}
                  >
                    🔄
                  </button>
                  <button className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300">
                    🔍
                  </button>
                </div>

                {/* Image Navigation */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) => (prev === 0 ? selectedProduct.images!.length - 1 : prev - 1))
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110"
                    >
                      ←
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) => (prev === selectedProduct.images!.length - 1 ? 0 : prev + 1))
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Zoom Lens */}
              {isZoomed && (
                <div className="absolute top-0 right-0 w-64 h-64 border-2 border-purple-500 rounded-xl overflow-hidden bg-gray-800 animate-fade-in-right">
                  <img
                    src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image}
                    alt="Zoomed view"
                    className="w-full h-full object-cover scale-300"
                    style={{
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {selectedProduct.images && selectedProduct.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      currentImageIndex === index ? "border-purple-500 ring-2 ring-purple-500/50" : "border-gray-600"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Image Actions */}
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300">
                📷 Xem tất cả ảnh
              </button>
              <button className="flex-1 py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300">
                📹 Video sản phẩm
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg transition-all duration-300 hover:scale-125 ${
                      i < Math.floor(selectedProduct.rating) ? "text-yellow-400" : "text-gray-600"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-gray-400">
                {selectedProduct.rating} ({selectedProduct.reviews} đánh giá)
              </span>
              <button className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                Xem tất cả →
              </button>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-white leading-tight">{selectedProduct.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-purple-400">{formatPrice(selectedProduct.price)}</span>
              {selectedProduct.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-gray-500 line-through text-xl">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                  <span className="text-green-400 text-sm font-semibold">
                    Tiết kiệm {formatPrice(selectedProduct.originalPrice - selectedProduct.price)}
                  </span>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${selectedProduct.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className={`font-semibold ${selectedProduct.inStock ? "text-green-400" : "text-red-400"}`}>
                {selectedProduct.inStock ? "Còn hàng" : "Hết hàng"}
              </span>
              {selectedProduct.inStock && <span className="text-gray-400">• Còn lại 15 sản phẩm</span>}
            </div>

            {/* Quick Description */}
            <p className="text-gray-300 text-lg leading-relaxed">{selectedProduct.description}</p>

            {/* Size Selection */}
            {selectedProduct.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">Chọn size:</h3>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm">
                    📏 Hướng dẫn chọn size
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-3 border rounded-lg transition-all duration-300 hover:scale-105 ${
                        selectedSize === size
                          ? "border-purple-500 bg-purple-500/20 text-purple-400 ring-2 ring-purple-500/50"
                          : "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {selectedProduct.colors.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Chọn màu:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-3 border rounded-lg transition-all duration-300 hover:scale-105 ${
                        selectedColor === color
                          ? "border-purple-500 bg-purple-500/20 text-purple-400 ring-2 ring-purple-500/50"
                          : "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-white font-semibold mb-3">Số lượng:</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-white hover:bg-gray-700 transition-colors duration-300 rounded-l-lg"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 text-white font-semibold bg-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-white hover:bg-gray-700 transition-colors duration-300 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-400">Tối đa 10 sản phẩm</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className="py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
              >
                🛒 Thêm vào giỏ
              </button>
              <button className="py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50">
                ⚡ Mua ngay
              </button>
            </div>

            {/* Additional Actions */}
            <div className="grid grid-cols-3 gap-2">
              <button className="py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                ❤️ Yêu thích
              </button>
              <button className="py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                📊 So sánh
              </button>
              <button className="py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                📤 Chia sẻ
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2 text-green-400">
                <span>✅</span>
                <span className="text-sm">Bảo hành chính hãng</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <span>🚚</span>
                <span className="text-sm">Miễn phí vận chuyển</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <span>🔄</span>
                <span className="text-sm">Đổi trả 30 ngày</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <span>⭐</span>
                <span className="text-sm">Chất lượng cao cấp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="border-t border-gray-700">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-center transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-purple-400 border-b-2 border-purple-500 bg-purple-500/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "details" && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Đặc điểm nổi bật</h3>
                  <ul className="space-y-3">
                    {selectedProduct.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-300 animate-fade-in-left"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-4"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Mô tả chi tiết</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProduct.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Hướng dẫn bảo quản</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Giặt tay bằng nước lạnh</li>
                    <li>• Không sử dụng chất tẩy</li>
                    <li>• Phơi khô tự nhiên, tránh ánh nắng trực tiếp</li>
                    <li>• Ủi ở nhiệt độ thấp</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="text-xl font-bold text-white mb-4">Thông số kỹ thuật</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Chất liệu:</span>
                      <span className="text-white">Cotton 100%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Xuất xứ:</span>
                      <span className="text-white">Việt Nam</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Thương hiệu:</span>
                      <span className="text-white">DSA</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Màu sắc:</span>
                      <span className="text-white">{selectedProduct.colors.join(", ")}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Size:</span>
                      <span className="text-white">{selectedProduct.sizes.join(", ")}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Bảo hành:</span>
                      <span className="text-white">12 tháng</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Đánh giá khách hàng</h3>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
                    Viết đánh giá
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-400 mb-2">{selectedProduct.rating}</div>
                      <div className="flex justify-center text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </div>
                      <div className="text-gray-400">{selectedProduct.reviews} đánh giá</div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-gray-400 w-8">{stars}⭐</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.random() * 80 + 10}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-400 w-8 text-sm">{Math.floor(Math.random() * 50)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {customerReviews.map((review, index) => (
                    <div
                      key={review.id}
                      className="bg-gray-800 rounded-xl p-6 animate-fade-in-up"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          className="w-12 h-12 rounded-full border-2 border-purple-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-white font-semibold">{review.name}</h4>
                            {review.verified && (
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                ✓ Đã mua hàng
                              </span>
                            )}
                            <span className="text-gray-400 text-sm">{review.date}</span>
                          </div>
                          <div className="flex text-yellow-400 mb-3">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i}>⭐</span>
                            ))}
                          </div>
                          <p className="text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="text-xl font-bold text-white mb-4">Thông tin vận chuyển</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">🚚 Giao hàng tiêu chuẩn</h4>
                      <p className="text-gray-300 text-sm">3-5 ngày làm việc</p>
                      <p className="text-green-400 font-semibold">Miễn phí</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">⚡ Giao hàng nhanh</h4>
                      <p className="text-gray-300 text-sm">1-2 ngày làm việc</p>
                      <p className="text-purple-400 font-semibold">30.000₫</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">🏪 Nhận tại cửa hàng</h4>
                      <p className="text-gray-300 text-sm">Sẵn sàng trong 2 giờ</p>
                      <p className="text-green-400 font-semibold">Miễn phí</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">🔄 Đổi trả</h4>
                      <p className="text-gray-300 text-sm">30 ngày đổi trả miễn phí</p>
                      <p className="text-blue-400 font-semibold">Không điều kiện</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-gray-700 p-6">
          <h3 className="text-2xl font-bold text-white mb-6">Sản phẩm liên quan</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="text-white font-semibold mb-2">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-bold">{formatPrice(product.price)}</span>
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(Math.floor(product.rating))].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
