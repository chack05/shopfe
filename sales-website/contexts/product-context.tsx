"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  features: string[]
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
}

interface ProductContextType {
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  isProductModalOpen: boolean
  setIsProductModalOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  wishlist: number[]
  addToWishlist: (id: number) => void
  removeFromWishlist: (id: number) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [wishlist, setWishlist] = useState<number[]>([])

  const addToWishlist = (id: number) => {
    setWishlist((prev) => [...prev, id])
  }

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item !== id))
  }

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        isProductModalOpen,
        setIsProductModalOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider")
  }
  return context
}
