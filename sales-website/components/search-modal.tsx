"use client"
// tìm kiếm
import { useState, useEffect } from "react"
import { useProduct } from "@/contexts/product-context"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const searchSuggestions = [
  "Áo dài",
  "Giày sneaker",
  "Suit công sở",
  "Váy dạ hội",
  "Áo thun",
  "Quần jeans",
  "Giày cao gót",
  "Túi xách",
  "Phụ kiện",
  "Đồ thể thao",
]

const trendingSearches = ["Áo dài cưới", "Giày thể thao", "Vest nam", "Váy công sở", "Áo khoác"]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { setSearchQuery } = useProduct()

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm)
    onClose()
    // Scroll to products section
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-start justify-center pt-20">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl mx-4 animate-fade-in-up">
        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            ✕
          </button>
        </div>

        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Gợi ý tìm kiếm</h3>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-3"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-purple-400">🔍</span>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches */}
        <div>
          <h3 className="text-white font-semibold mb-3">Tìm kiếm phổ biến</h3>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((trend, index) => (
              <button
                key={index}
                onClick={() => handleSearch(trend)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {trend}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-all duration-300 hover:scale-105">
              <div className="text-2xl mb-2">👕</div>
              <div>Quần áo</div>
            </button>
            <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-all duration-300 hover:scale-105">
              <div className="text-2xl mb-2">👠</div>
              <div>Giày dép</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
