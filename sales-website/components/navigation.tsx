"use client"
// thanh navbar
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useProduct } from "@/contexts/product-context"
import SearchModal from "./search-modal"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { setIsCartOpen, totalItems } = useCart()
  const { wishlist } = useProduct()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["home", "products", "features", "testimonials", "pricing", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const menuItems = [
    { name: "Trang Chủ", id: "home", icon: "🏠" },
    { name: "Sản Phẩm", id: "products", icon: "👕" },
    { name: "Tính Năng", id: "features", icon: "⭐" },
    { name: "Đánh Giá", id: "testimonials", icon: "💬" },
    { name: "Gói Dịch Vụ", id: "pricing", icon: "💎" },
    { name: "Liên Hệ", id: "contact", icon: "📞" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-black/90 backdrop-blur-lg shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-white cursor-pointer group" onClick={() => scrollToSection("home")}>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse group-hover:scale-110 transition-transform duration-300">
                DSA
              </span>
              <div className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500"></div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.id ? "text-purple-400 bg-purple-500/20" : "text-white hover:text-purple-400"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{item.icon}</span>
                    {item.name}
                  </span>
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-purple-500 transition-all duration-300 ${
                      activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative p-3 text-white hover:text-purple-400 transition-all duration-300 hover:scale-110 group"
              >
                <div className="text-xl">🔍</div>
                <div className="absolute inset-0 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              </button>

              {/* Wishlist Button */}
              <button className="relative p-3 text-white hover:text-pink-400 transition-all duration-300 hover:scale-110 group">
                <div className="text-xl">❤️</div>
                {wishlist.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {wishlist.length}
                  </div>
                )}
                <div className="absolute inset-0 bg-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 text-white hover:text-green-400 transition-all duration-300 hover:scale-110 group"
              >
                <div className="text-xl">🛒</div>
                {totalItems > 0 && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </div>
                )}
                <div className="absolute inset-0 bg-green-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <div className="space-y-1">
                  <div
                    className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  ></div>
                  <div
                    className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                  ></div>
                  <div
                    className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></div>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-500 overflow-hidden ${
              isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-6 space-y-4">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    activeSection === item.id
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-white hover:bg-white/10 hover:text-purple-400"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{
              width: `${((menuItems.findIndex((item) => item.id === activeSection) + 1) / menuItems.length) * 100}%`,
            }}
          ></div>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
