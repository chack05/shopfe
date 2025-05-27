"use client"

import { useState } from "react"

interface ComparisonModalProps {
  isOpen: boolean
  onClose: () => void
}

const comparisonProducts = [
  {
    id: 1,
    name: "Áo Dài Cưới Hoàng Gia",
    price: 4500000,
    originalPrice: 5500000,
    image: "/placeholder.svg?height=300&width=250",
    rating: 4.9,
    reviews: 127,
    brand: "VietFashion Premium",
    material: "Lụa tơ tằm cao cấp",
    origin: "Việt Nam",
    colors: ["Đỏ", "Vàng", "Hồng", "Trắng"],
    sizes: ["S", "M", "L", "XL"],
    features: ["Thêu tay thủ công", "Thiết kế độc quyền", "Bảo hành 1 năm"],
    pros: ["Chất lượng cao", "Thiết kế đẹp", "Bền màu"],
    cons: ["Giá cao", "Cần bảo quản cẩn thận"],
    warranty: "12 tháng",
    shipping: "Miễn phí",
    inStock: true,
  },
  {
    id: 2,
    name: "Áo Dài Cưới Truyền Thống",
    price: 3200000,
    image: "/placeholder.svg?height=300&width=250",
    rating: 4.7,
    reviews: 89,
    brand: "Heritage Collection",
    material: "Lụa tơ tằm",
    origin: "Việt Nam",
    colors: ["Đỏ", "Vàng", "Hồng"],
    sizes: ["S", "M", "L"],
    features: ["Họa tiết truyền thống", "May thủ công", "Bảo hành 6 tháng"],
    pros: ["Giá hợp lý", "Phong cách cổ điển", "Chất lượng tốt"],
    cons: ["Ít màu sắc", "Thiết kế đơn giản"],
    warranty: "6 tháng",
    shipping: "30.000₫",
    inStock: true,
  },
  {
    id: 3,
    name: "Áo Dài Cưới Hiện Đại",
    price: 3800000,
    image: "/placeholder.svg?height=300&width=250",
    rating: 4.8,
    reviews: 156,
    brand: "Modern Elegance",
    material: "Lụa pha cotton",
    origin: "Việt Nam",
    colors: ["Trắng", "Hồng", "Tím", "Xanh"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Thiết kế hiện đại", "Dễ vận động", "Bảo hành 8 tháng"],
    pros: ["Thiết kế trẻ trung", "Thoải mái", "Nhiều size"],
    cons: ["Chất liệu không cao cấp bằng", "Ít chi tiết thêu"],
    warranty: "8 tháng",
    shipping: "Miễn phí",
    inStock: true,
  },
]

export default function ComparisonModal({ isOpen, onClose }: ComparisonModalProps) {
  const [selectedProducts, setSelectedProducts] = useState(comparisonProducts.slice(0, 2))
  const [activeTab, setActiveTab] = useState("overview")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const removeProduct = (id: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const addProduct = (product: any) => {
    if (selectedProducts.length < 3 && !selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts((prev) => [...prev, product])
    }
  }

  const tabs = [
    { id: "overview", name: "Tổng quan", icon: "📋" },
    { id: "specs", name: "Thông số", icon: "📏" },
    { id: "features", name: "Tính năng", icon: "⭐" },
    { id: "reviews", name: "Đánh giá", icon: "💬" },
    { id: "pros-cons", name: "Ưu/Nhược điểm", icon: "⚖️" },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="bg-gray-900 rounded-2xl max-w-7xl mx-auto animate-zoom-in">
          {/* Header */}
          <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg flex justify-between items-center p-6 border-b border-gray-700 z-10">
            <div>
              <h2 className="text-3xl font-bold text-white">So Sánh Sản Phẩm</h2>
              <p className="text-gray-400 mt-1">So sánh {selectedProducts.length} sản phẩm</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-300 hover:rotate-90"
            >
              ✕
            </button>
          </div>

          {/* Product Selection */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xl font-bold text-white">Sản phẩm đang so sánh</h3>
              <span className="text-gray-400">({selectedProducts.length}/3)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedProducts.map((product, index) => (
                <div key={product.id} className="relative bg-gray-800 rounded-xl p-4">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                  >
                    ✕
                  </button>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-white font-semibold text-sm line-clamp-2">{product.name}</h4>
                  <p className="text-purple-400 font-bold mt-1">{formatPrice(product.price)}</p>
                </div>
              ))}

              {selectedProducts.length < 3 && (
                <div className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="text-4xl text-gray-600 mb-2">+</div>
                  <p className="text-gray-400 text-center mb-4">Thêm sản phẩm để so sánh</p>
                  <div className="space-y-2">
                    {comparisonProducts
                      .filter((p) => !selectedProducts.find((sp) => sp.id === p.id))
                      .slice(0, 2)
                      .map((product) => (
                        <button
                          key={product.id}
                          onClick={() => addProduct(product)}
                          className="block w-full text-left p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 text-sm"
                        >
                          {product.name}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-6 py-4 text-center transition-all duration-300 ${
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
          </div>

          {/* Comparison Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-white font-semibold">Thông tin</th>
                      {selectedProducts.map((product) => (
                        <th key={product.id} className="text-center p-4 text-white font-semibold min-w-[250px]">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                          />
                          <div className="text-sm line-clamp-2">{product.name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Giá</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          <div className="text-purple-400 font-bold text-lg">{formatPrice(product.price)}</div>
                          {product.originalPrice && (
                            <div className="text-gray-500 line-through text-sm">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Đánh giá</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-600"}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                          <div className="text-white font-semibold">{product.rating}</div>
                          <div className="text-gray-400 text-sm">({product.reviews} đánh giá)</div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Thương hiệu</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center text-white">
                          {product.brand}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Tình trạng</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              product.inStock ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {product.inStock ? "Còn hàng" : "Hết hàng"}
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-white font-semibold">Thông số kỹ thuật</th>
                      {selectedProducts.map((product) => (
                        <th key={product.id} className="text-center p-4 text-white font-semibold min-w-[250px]">
                          {product.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Chất liệu</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center text-white">
                          {product.material}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Xuất xứ</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center text-white">
                          {product.origin}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Màu sắc</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {product.colors.map((color, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                                {color}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Size</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {product.sizes.map((size, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                                {size}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Bảo hành</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center text-white">
                          {product.warranty}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4 text-gray-400 font-medium">Phí vận chuyển</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="p-4 text-center text-white">
                          {product.shipping}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid gap-6">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="bg-gray-800 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">{product.name}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "pros-cons" && (
              <div className="grid gap-6">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="bg-gray-800 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-white mb-6">{product.name}</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                          <span>✅</span> Ưu điểm
                        </h5>
                        <ul className="space-y-2">
                          {product.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                              <span className="text-green-400 mt-1">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                          <span>❌</span> Nhược điểm
                        </h5>
                        <ul className="space-y-2">
                          {product.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                              <span className="text-red-400 mt-1">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="grid gap-6">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="bg-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-bold text-white">{product.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-600"}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="text-white font-semibold">{product.rating}</span>
                        <span className="text-gray-400">({product.reviews} đánh giá)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">{stars}⭐</span>
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${Math.random() * 80 + 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {selectedProducts.map((product) => (
                <button
                  key={product.id}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Mua {product.name.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>
            <div className="flex gap-4 justify-center mt-4">
              <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors duration-300">
                Lưu so sánh
              </button>
              <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors duration-300">
                Chia sẻ
              </button>
              <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors duration-300">
                In so sánh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
