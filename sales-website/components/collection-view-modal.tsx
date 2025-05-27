"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useProduct } from "@/contexts/product-context"

interface CollectionViewModalProps {
  collection: any
  isOpen: boolean
  onClose: () => void
}

const collectionProducts = {
  1: [
    // Wedding Collection
    {
      id: 101,
      name: "Áo Dài Cưới Hoàng Gia Deluxe",
      price: 8500000,
      originalPrice: 10000000,
      image: "/anhhoanggia.jpg?height=300&width=250",
      rating: 4.9,
      reviews: 156,
      isNew: true,
      isSale: true,
      colors: ["Đỏ", "Vàng", "Hồng"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 102,
      name: "Áo Dài Cưới Truyền Thống",
      price: 6200000,
      image: "/truyenthong.jpg?height=300&width=250",
      rating: 4.8,
      reviews: 89,
      colors: ["Đỏ", "Vàng"],
      sizes: ["S", "M", "L"],
    },
    {
      id: 103,
      name: "Áo Dài Cưới Hiện Đại",
      price: 7800000,
      originalPrice: 9000000,
      image: "/hiendai.jpg?height=300&width=250",
      rating: 4.7,
      reviews: 124,
      isSale: true,
      colors: ["Trắng", "Hồng", "Tím"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ],
  2: [
    // Office Collection
    {
      id: 201,
      name: "Bộ Suit Nữ Cao Cấp",
      price: 4200000,
      image: "/Sustainable.jpg?height=300&width=250",
      rating: 4.6,
      reviews: 78,
      isNew: true,
      colors: ["Đen", "Xám", "Navy"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 202,
      name: "Áo Sơ Mi Công Sở Thanh Lịch",
      price: 980000,
      image: "/la333-1.jpg?height=300&width=250",
      rating: 4.5,
      reviews: 54,
      colors: ["Trắng", "Xanh nhạt", "Be"],
      sizes: ["S", "M", "L"],
    },
  ],
  3: [
    // Party Collection
    {
      id: 301,
      name: "Đầm Dạ Hội Kim Tuyến",
      price: 5600000,
      image: "/dahoi.jpg?height=300&width=250",
      rating: 4.9,
      reviews: 132,
      isSale: true,
      originalPrice: 6800000,
      colors: ["Vàng đồng", "Bạc", "Đỏ đô"],
      sizes: ["S", "M", "L"],
    },
    {
      id: 302,
      name: "Đầm Dạ Hội Trễ Vai",
      price: 4900000,
      image: "/damtrevai.jpg?height=300&width=250",
      rating: 4.8,
      reviews: 101,
      isNew: true,
      colors: ["Xanh rêu", "Tím", "Đen"],
      sizes: ["S", "M", "L", "XL"],
    },
  ],
  4: [
    // Streetwear Collection
    {
      id: 401,
      name: "Áo Hoodie Local Brand",
      price: 950000,
      image: "/aohosdi.jpg?height=300&width=250",
      rating: 4.6,
      reviews: 87,
      isNew: true,
      colors: ["Đen", "Trắng", "Be"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 402,
      name: "Quần Jogger Thể Thao",
      price: 750000,
      image: "/quan-dai-the-thao-nam-jogger-sg10-3.jpg?height=300&width=250",
      rating: 4.4,
      reviews: 65,
      colors: ["Đen", "Xám"],
      sizes: ["M", "L", "XL"],
    },
  ],


}

export default function CollectionViewModal({ collection, isOpen, onClose }: CollectionViewModalProps) {
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()
  const { setSelectedProduct, setIsProductModalOpen } = useProduct()

  const itemsPerPage = 12

  useEffect(() => {
    if (collection && isOpen) {
      setIsLoading(true)
      // Simulate loading
      setTimeout(() => {
        const collectionData = collectionProducts[collection.id as keyof typeof collectionProducts] || []
        // Generate more products if needed
        const generatedProducts = []
        for (let i = 0; i < 24; i++) {
          generatedProducts.push({
            id: collection.id * 1000 + i,
            name: `${collection.name} - Sản phẩm ${i + 1}`,
            price: Math.floor(Math.random() * 5000000) + 1000000,
            originalPrice: Math.random() > 0.7 ? Math.floor(Math.random() * 2000000) + 6000000 : undefined,
            image: `/placeholder.svg?height=300&width=250&text=Product${i + 1}`,
            rating: 4 + Math.random(),
            reviews: Math.floor(Math.random() * 200) + 10,
            isNew: Math.random() > 0.8,
            isSale: Math.random() > 0.7,
            colors: ["Đen", "Trắng", "Xám", "Navy", "Đỏ"].slice(0, Math.floor(Math.random() * 3) + 2),
            sizes: ["S", "M", "L", "XL"].slice(0, Math.floor(Math.random() * 2) + 2),
          })
        }
        setProducts([...collectionData, ...generatedProducts])
        setIsLoading(false)
      }, 1000)
    }
  }, [collection, isOpen])

  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (filterBy !== "all") {
      filtered = filtered.filter((product) => {
        switch (filterBy) {
          case "new":
            return product.isNew
          case "sale":
            return product.isSale
          case "popular":
            return product.reviews > 100
          default:
            return true
        }
      })
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, sortBy, filterBy, priceRange])

  if (!isOpen || !collection) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleQuickAdd = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      color: product.colors[0],
    })
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct({
      ...product,
      description: `${product.name} - Sản phẩm cao cấp từ bộ sưu tập ${collection.name}`,
      features: ["Chất liệu cao cấp", "Thiết kế độc quyền", "Bảo hành chính hãng", "Giao hàng miễn phí"],
      images: [product.image, product.image, product.image],
      category: collection.category,
      inStock: true,
    })
    setIsProductModalOpen(true)
  }

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700 z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-300 hover:rotate-180"
                >
                  ←
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">{collection.name}</h1>
                  <p className="text-gray-400">{filteredProducts.length} sản phẩm</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    ⊞
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    ☰
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="popular">Phổ biến</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="rating">Đánh giá cao</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">Bộ lọc</h3>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Danh mục</h4>
                  <div className="space-y-2">
                    {[
                      { id: "all", name: "Tất cả" },
                      { id: "new", name: "Mới nhất" },
                      { id: "sale", name: "Giảm giá" },
                      { id: "popular", name: "Phổ biến" },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setFilterBy(filter.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                          filterBy === filter.id ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        {filter.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Khoảng giá</h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      className="w-full accent-purple-600"
                    />
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Collection Info */}
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Về bộ sưu tập</h4>
                  <p className="text-gray-300 text-sm mb-3">{collection.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {collection.tags?.map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-gray-800 rounded-xl p-4 animate-pulse">
                      <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                      <div className="bg-gray-700 h-4 rounded mb-2"></div>
                      <div className="bg-gray-700 h-4 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div
                    className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
                  >
                    {currentProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up ${
                          viewMode === "list" ? "flex gap-6 p-6" : ""
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        {/* Product Badges */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                          {product.isSale && (
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                              SALE
                            </span>
                          )}
                          {product.isNew && (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                              MỚI
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:scale-110 transition-all duration-300">
                          ❤️
                        </button>

                        {/* Animated Border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-border"></div>
                        <div className="absolute inset-0.5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl"></div>

                        <div className={`relative ${viewMode === "list" ? "flex gap-6 w-full" : "p-6"}`}>
                          {/* Product Image */}
                          <div
                            className={`relative overflow-hidden rounded-xl cursor-pointer ${
                              viewMode === "list" ? "w-48 h-48 flex-shrink-0" : "mb-6"
                            }`}
                            onClick={() => handleProductClick(product)}
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Quick Actions */}
                            <div
                              className={`absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                                hoveredProduct === product.id ? "translate-y-0" : "translate-y-4"
                              }`}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleProductClick(product)
                                }}
                                className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:scale-110 transition-all duration-300"
                              >
                                👁️
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickAdd(product)
                                }}
                                className="p-3 bg-purple-600 rounded-full text-white hover:scale-110 transition-all duration-300"
                              >
                                🛒
                              </button>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className={viewMode === "list" ? "flex-1" : ""}>
                            {/* Rating */}
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

                            <h3
                              className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300 cursor-pointer"
                              onClick={() => handleProductClick(product)}
                            >
                              {product.name}
                            </h3>

                            {/* Colors */}
                            <div className="flex gap-1 mb-3">
                              {product.colors.slice(0, 4).map((color: string, i: number) => (
                                <div
                                  key={i}
                                  className="w-4 h-4 rounded-full border border-gray-600"
                                  style={{
                                    backgroundColor:
                                      color === "Đen"
                                        ? "#000"
                                        : color === "Trắng"
                                          ? "#fff"
                                          : color === "Xám"
                                            ? "#666"
                                            : "#8b5cf6",
                                  }}
                                ></div>
                              ))}
                              {product.colors.length > 4 && (
                                <span className="text-gray-400 text-sm">+{product.colors.length - 4}</span>
                              )}
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <span className="text-2xl font-bold text-purple-400">{formatPrice(product.price)}</span>
                                {product.originalPrice && (
                                  <span className="text-gray-500 line-through ml-2">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => handleQuickAdd(product)}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
                              >
                                Thêm vào giỏ
                              </button>
                            </div>

                            {/* Sizes */}
                            {viewMode === "list" && (
                              <div className="flex gap-2">
                                {product.sizes.map((size: string, i: number) => (
                                  <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                    {size}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        ← Trước
                      </button>

                      <div className="flex gap-2">
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                          const pageNum = i + 1
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                                currentPage === pageNum
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                              }`}
                            >
                              {pageNum}
                            </button>
                          )
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Sau →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
