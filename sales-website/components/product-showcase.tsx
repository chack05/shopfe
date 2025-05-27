"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useProduct } from "@/contexts/product-context"
import ProductFilters from "./product-filters"

const products = [
  {
    id: 1,
    name: "Áo Dài Cưới Hoàng Gia",
    description: "Áo dài cưới cao cấp với họa tiết thêu tay tinh xảo",
    price: 4500000,
    originalPrice: 5500000,
    image: "/anhhoanggia.jpg?height=400&width=300",
    images: ["/anhhoanggia.jpg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
    category: "ao-dai",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Đỏ", "Vàng", "Hồng", "Trắng"],
    features: ["Lụa tơ tằm cao cấp", "Thêu tay thủ công", "Thiết kế độc quyền", "Bảo hành 1 năm"],
    rating: 4.9,
    reviews: 127,
    inStock: true,
    isNew: true,
    isSale: true,
  },
  {
    id: 2,
    name: "Giày Sneaker Việt Premium",
    description: "Giày thể thao cao cấp thiết kế Việt Nam",
    price: 2200000,
    image: "/giay.jpg?height=400&width=300",
    images: ["/giay.jpg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
    category: "giay",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Đen", "Trắng", "Xanh", "Đỏ"],
    features: ["Đế cao su chống trượt", "Chất liệu thoáng khí", "Thiết kế ergonomic", "Bảo hành 6 tháng"],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isNew: true,
  },
  {
    id: 3,
    name: "Bộ Suit Nam Công Sở",
    description: "Bộ vest nam thanh lịch cho môi trường công sở",
    price: 3800000,
    image: "/namcongso.jpg?height=400&width=300",
    images: ["/namcongso.jpg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
    category: "suit",
    sizes: ["46", "48", "50", "52", "54"],
    colors: ["Đen", "Xám", "Navy"],
    features: ["Vải wool Ý", "May đo theo yêu cầu", "Lót lụa cao cấp", "Bảo hành 2 năm"],
    rating: 4.8,
    reviews: 156,
    inStock: true,
  },
  {
    id: 4,
    name: "Váy Dạ Hội Sang Trọng",
    description: "Váy dạ hội thiết kế haute couture",
    price: 6500000,
    originalPrice: 8000000,
    image: "/vaydahoi.jpg?height=400&width=300",
    images: ["/vaydahoi.jpg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
    category: "vay",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Đen", "Đỏ", "Xanh Navy", "Vàng"],
    features: ["Chiffon cao cấp", "Đính sequin thủ công", "Thiết kế độc quyền", "Tặng kèm phụ kiện"],
    rating: 4.9,
    reviews: 73,
    inStock: true,
    isSale: true,
  },
  {
    id: 5,
    name: "Áo Thun Nam Cao Cấp",
    description: "Áo thun cotton organic thoáng mát",
    price: 450000,
    image: "/ao-thun-trang-129595.jpg?height=400&width=300",
    images: ["/ao-thun-trang-129595.jpg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
    category: "ao-thun",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Trắng", "Đen", "Xám", "Navy", "Xanh lá"],
    features: ["Cotton organic", "Kháng khuẩn", "Thấm hút mồ hôi", "Form dáng chuẩn"],
    rating: 4.6,
    reviews: 234,
    inStock: true,
  },
  {
    id: 6,
    name: "Quần Jeans Nữ Skinny",
    description: "Quần jeans nữ co giãn tôn dáng",
    price: 890000,
    image: "/Jeans.jpg?height=400&width=300",
    images: ["/Jeans.jpg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
    category: "quan",
    sizes: ["25", "26", "27", "28", "29", "30"],
    colors: ["Xanh đậm", "Xanh nhạt", "Đen", "Trắng"],
    features: ["Denim co giãn", "Tôn dáng", "Bền màu", "Dễ phối đồ"],
    rating: 4.5,
    reviews: 189,
    inStock: true,
    isNew: true,
  },
  {
    id: 7,
    name: "Giày Cao Gót Nữ",
    description: "Giày cao gót da thật sang trọng",
    price: 1650000,
    image: "/giay-cao-got-nu-tmxs20-lich-lam.jpg?height=400&width=300",
    images: ["/giay-cao-got-nu-tmxs20-lich-lam.jpg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
    category: "giay",
    sizes: ["35", "36", "37", "38", "39"],
    colors: ["Đen", "Nude", "Đỏ", "Nâu"],
    features: ["Da thật 100%", "Đế chống trượt", "Đệm êm chân", "Thiết kế thanh lịch"],
    rating: 4.7,
    reviews: 98,
    inStock: true,
  },
  {
    id: 8,
    name: "Túi Xách Nữ Cao Cấp",
    description: "Túi xách da thật thiết kế hiện đại",
    price: 2800000,
    originalPrice: 3200000,
    image: "/tui-xach-nu-cao-cap-da-that-elly-et172-28.jpg?height=400&width=300",
    images: ["/tui-xach-nu-cao-cap-da-that-elly-et172-28.jpg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
    category: "tui-xach",
    sizes: ["One Size"],
    colors: ["Đen", "Nâu", "Trắng", "Xanh"],
    features: ["Da bò thật", "Nhiều ngăn tiện lợi", "Dây đeo có thể tháo", "Bảo hành 1 năm"],
    rating: 4.8,
    reviews: 145,
    inStock: true,
    isSale: true,
  },
]

export default function ProductShowcase() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { addToCart } = useCart()
  const {
    setSelectedProduct,
    setIsProductModalOpen,
    searchQuery,
    selectedCategory,
    sortBy,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useProduct()

  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

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
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, sortBy])

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

  const handleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <section id="products" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Bộ Sưu Tập Thời Trang
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Khám phá những sản phẩm thời trang cao cấp được thiết kế đặc biệt cho người Việt Nam
          </p>
        </div>

        {/* Filters and Controls */}
        <ProductFilters />

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-300">Hiển thị {filteredProducts.length} sản phẩm</div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "list" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Products grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                viewMode === "list" ? "flex gap-6 p-6" : ""
              }`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Sale/New badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {product.isSale && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    SALE
                  </div>
                )}
                {product.isNew && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">MỚI</div>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => handleWishlist(product.id)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:scale-110 transition-all duration-300"
              >
                <span className={wishlist.includes(product.id) ? "text-red-500" : "text-gray-400"}>❤️</span>
              </button>

              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-border"></div>
              <div className="absolute inset-0.5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl"></div>

              <div className={`relative ${viewMode === "list" ? "flex gap-6 w-full" : "p-6"}`}>
                {/* Product image */}
                <div
                  className={`relative overflow-hidden rounded-xl ${
                    viewMode === "list" ? "w-48 h-48 flex-shrink-0" : "mb-6"
                  }`}
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Quick action buttons */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      hoveredProduct === product.id ? "translate-y-0" : "translate-y-4"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsProductModalOpen(true)
                      }}
                      className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:scale-110 transition-all duration-300"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="p-3 bg-purple-600 rounded-full text-white hover:scale-110 transition-all duration-300"
                    >
                      🛒
                    </button>
                  </div>
                </div>

                {/* Product info */}
                <div className={viewMode === "list" ? "flex-1" : ""}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-600"}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews})</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>

                  {/* Features */}
                  {viewMode === "list" && (
                    <ul className="space-y-1 mb-4">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-300 text-sm">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-purple-400">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>

                  {/* Stock status */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span className={`text-sm ${product.inStock ? "text-green-400" : "text-red-400"}`}>
                      {product.inStock ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more button */}
        {filteredProducts.length > 8 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
              Xem thêm sản phẩm
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
