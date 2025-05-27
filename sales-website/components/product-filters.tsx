"use client"

import { useState } from "react"
import { useProduct } from "@/contexts/product-context"

const categories = [
  { id: "all", name: "Tất cả", icon: "🏷️" },
  { id: "ao-dai", name: "Áo dài", icon: "👘" },
  { id: "giay", name: "Giày dép", icon: "👠" },
  { id: "suit", name: "Suit", icon: "🤵" },
  { id: "vay", name: "Váy", icon: "👗" },
  { id: "ao-thun", name: "Áo thun", icon: "👕" },
  { id: "quan", name: "Quần", icon: "👖" },
  { id: "tui-xach", name: "Túi xách", icon: "👜" },
]

const sortOptions = [
  { id: "newest", name: "Mới nhất" },
  { id: "price-low", name: "Giá thấp đến cao" },
  { id: "price-high", name: "Giá cao đến thấp" },
  { id: "rating", name: "Đánh giá cao nhất" },
]

export default function ProductFilters() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const { selectedCategory, setSelectedCategory, sortBy, setSortBy } = useProduct()

  return (
    <div className="mb-8">
      {/* Mobile filter toggle */}
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="lg:hidden w-full mb-4 p-4 bg-gray-800 text-white rounded-xl flex items-center justify-between"
      >
        <span>Bộ lọc & Sắp xếp</span>
        <span className={`transform transition-transform duration-300 ${isFiltersOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {/* Filters */}
      <div className={`lg:block ${isFiltersOpen ? "block" : "hidden"}`}>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Danh mục</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white scale-105"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-white font-semibold mb-4">Sắp xếp theo</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-6">
          <h3 className="text-white font-semibold mb-4">Khoảng giá</h3>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Từ"
              className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Đến"
              className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300">
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
