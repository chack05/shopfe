"use client"

import { useState } from "react"
import { useProduct } from "@/contexts/product-context"
import { useCart } from "@/contexts/cart-context"

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
}

const wishlistProducts = [
  {
    id: 1,
    name: "Áo Dài Cưới Hoàng Gia",
    price: 4500000,
    originalPrice: 5500000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 127,
    inStock: true,
    isNew: true,
    isSale: true,
    addedDate: "2024-01-15",
    category: "Áo dài",
  },
  {
    id: 2,
    name: "Giày Sneaker Việt Premium",
    price: 2200000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isNew: true,
    addedDate: "2024-01-10",
    category: "Giày",
  },
  {
    id: 3,
    name: "Túi Xách Nữ Cao Cấp",
    price: 2800000,
    originalPrice: 3200000,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviews: 145,
    inStock: false,
    isSale: true,
    addedDate: "2024-01-05",
    category: "Túi xách",
  },
]

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const { addToCart } = useCart()
  const { setSelectedProduct, setIsProductModalOpen } = useProduct()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === wishlistProducts.length ? [] : wishlistProducts.map((p) => p.id))
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "M",
      color: "Đỏ",
    })
  }

  const handleAddAllToCart = () => {
    selectedItems.forEach((id) => {
      const product = wishlistProducts.find((p) => p.id === id)
      if (product && product.inStock) {
        handleAddToCart(product)
      }
    })
    setSelectedItems([])
  }

  const handleRemoveSelected = () => {
    // Remove selected items from wishlist
    setSelectedItems([])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg flex justify-between items-center p-6 border-b border-gray-700 z-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Danh sách yêu thích</h2>
            <p className="text-gray-400 mt-1">{wishlistProducts.length} sản phẩm</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-300 hover:rotate-90"
          >
            ✕
          </button>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.length === wishlistProducts.length}
                  onChange={handleSelectAll}
                  className="rounded"
                />
                Chọn tất cả
              </button>

              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddAllToCart}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  >
                    Thêm vào giỏ ({selectedItems.length})
                  </button>
                  <button
                    onClick={handleRemoveSelected}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                    Xóa ({selectedItems.length})
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none"
              >
                <option value="all">Tất cả</option>
                <option value="inStock">Còn hàng</option>
                <option value="sale">Đang giảm giá</option>
                <option value="new">Mới nhất</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="p-6">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💝</div>
              <h3 className="text-2xl font-bold text-white mb-2">Danh sách yêu thích trống</h3>
              <p className="text-gray-400 mb-6">Hãy thêm những sản phẩm bạn yêu thích để dễ dàng tìm lại sau này</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300"
              >
                Khám phá sản phẩm
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Selection checkbox */}
                  <div className="absolute top-4 left-4 z-20">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => handleSelectItem(product.id)}
                      className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                    />
                  </div>

                  {/* Product badges */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    {product.isSale && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                        SALE
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">MỚI</span>
                    )}
                    {!product.inStock && (
                      <span className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        HẾT HÀNG
                      </span>
                    )}
                  </div>

                  {/* Product image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Quick actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => {
                          setSelectedProduct({
                            ...product,
                            description: `${product.name} - Sản phẩm cao cấp`,
                            features: ["Chất liệu cao cấp", "Thiết kế độc quyền", "Bảo hành chính hãng"],
                            images: [product.image, product.image],
                            category: product.category,
                            sizes: ["S", "M", "L", "XL"],
                            colors: ["Đỏ", "Xanh", "Đen"],
                          })
                          setIsProductModalOpen(true)
                        }}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:scale-110 transition-all duration-300"
                      >
                        👁️
                      </button>
                      {product.inStock && (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-3 bg-purple-600 rounded-full text-white hover:scale-110 transition-all duration-300"
                        >
                          🛒
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
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
                      <span className="text-gray-400 text-sm">({product.reviews})</span>
                    </div>

                    <h3 className="text-white font-semibold mb-2 line-clamp-2">{product.name}</h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-purple-400 font-bold">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>Thêm: {new Date(product.addedDate).toLocaleDateString("vi-VN")}</span>
                      <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">{product.category}</span>
                    </div>

                    <div className="flex gap-2">
                      {product.inStock ? (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                        >
                          Thêm vào giỏ
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex-1 py-2 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
                        >
                          Hết hàng
                        </button>
                      )}
                      <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-gray-400">
              Tổng cộng: {wishlistProducts.length} sản phẩm • Còn hàng:{" "}
              {wishlistProducts.filter((p) => p.inStock).length} • Hết hàng:{" "}
              {wishlistProducts.filter((p) => !p.inStock).length}
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors duration-300">
                Chia sẻ danh sách
              </button>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300">
                Tạo bộ sưu tập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
