"use client"

import { useState } from "react"

interface CollectionDetailModalProps {
  collection: any
  isOpen: boolean
  onClose: () => void
}

export default function CollectionDetailModal({ collection, isOpen, onClose }: CollectionDetailModalProps) {
  const [activeFilter, setActiveFilter] = useState("all")

  if (!isOpen || !collection) return null

  const filters = [
    { id: "all", name: "Tất cả" },
    { id: "new", name: "Mới nhất" },
    { id: "popular", name: "Phổ biến" },
    { id: "sale", name: "Giảm giá" },
  ]

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in">
        {/* Header */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={collection.image || "/vay-cuoi.jpg"}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300"
          >
            ✕
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-4xl font-bold text-white mb-2">{collection.name}</h1>
            <p className="text-gray-300 text-lg">{collection.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-purple-400 font-semibold">{collection.itemCount} sản phẩm</span>
              <div className="flex gap-2">
                {collection.colors?.map((color: string, i: number) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border-2 border-white/50"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={`/placeholder.svg?height=200&width=200&text=Product${index + 1}`}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">Sản phẩm {index + 1}</h3>
                  <p className="text-purple-400 font-bold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format((index + 1) * 500000)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
