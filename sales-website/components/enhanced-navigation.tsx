"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useProduct } from "@/contexts/product-context"
import SearchModal from "./search-modal"
import WishlistModal from "./wishlist-modal"
import StyleGuideModal from "./style-guide-modal"
import SizeGuideModal from "./size-guide-modal"
import ComparisonModal from "./comparison-modal"

export default function EnhancedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isStyleGuideOpen, setIsStyleGuideOpen] = useState(false)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [megaMenuOpen, setMegaMenuOpen] = useState("")
  const { setIsCartOpen, totalItems } = useCart()
  const { wishlist } = useProduct()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position with navbar offset
      const sections = ["home", "products", "collections", "trends", "features", "testimonials", "pricing", "contact"]
      const navbarHeight = 80 // Height of navbar

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= navbarHeight + 50 && rect.bottom >= navbarHeight + 50
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
      const navbarHeight = 80 // Height of navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      setIsMobileMenuOpen(false)
      setMegaMenuOpen("")

      // Update active section immediately
      setActiveSection(sectionId)
    }
  }

  const menuItems = [
    {
      name: "Trang Chủ",
      id: "home",
      icon: "🏠",
      hasSubmenu: false,
    },
    {
      name: "Sản Phẩm",
      id: "products",
      icon: "👕",
      hasSubmenu: true,
      submenu: [
        { name: "Áo dài", icon: "👘", category: "ao-dai" },
        { name: "Giày dép", icon: "👠", category: "giay" },
        { name: "Suit", icon: "🤵", category: "suit" },
        { name: "Váy", icon: "👗", category: "vay" },
        { name: "Áo thun", icon: "👕", category: "ao-thun" },
        { name: "Quần", icon: "👖", category: "quan" },
        { name: "Túi xách", icon: "👜", category: "tui-xach" },
      ],
    },
    {
      name: "Bộ Sưu Tập",
      id: "collections",
      icon: "✨",
      hasSubmenu: false,
    },
    {
      name: "Xu Hướng",
      id: "trends",
      icon: "🔥",
      hasSubmenu: false,
    },
    {
      name: "Tính Năng",
      id: "features",
      icon: "⭐",
      hasSubmenu: false,
    },
    {
      name: "Đánh Giá",
      id: "testimonials",
      icon: "💬",
      hasSubmenu: false,
    },
    {
      name: "Gói Dịch Vụ",
      id: "pricing",
      icon: "💎",
      hasSubmenu: false,
    },
    {
      name: "Liên Hệ",
      id: "contact",
      icon: "📞",
      hasSubmenu: false,
    },
  ]

  const quickActions = [
    { name: "Tìm kiếm", icon: "🔍", action: () => setIsSearchOpen(true) },
    { name: "Yêu thích", icon: "❤️", action: () => setIsWishlistOpen(true), badge: wishlist.length },
    { name: "So sánh", icon: "⚖️", action: () => setIsComparisonOpen(true) },
    { name: "Hướng dẫn size", icon: "📏", action: () => setIsSizeGuideOpen(true) },
    { name: "Phong cách", icon: "🎨", action: () => setIsStyleGuideOpen(true) },
    { name: "Giỏ hàng", icon: "🛒", action: () => setIsCartOpen(true), badge: totalItems },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-black/95 backdrop-blur-lg shadow-2xl border-b border-gray-800" : "bg-transparent"
        }`}
        style={{ height: "80px" }}
      >
        <div className="container mx-auto px-6 py-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="text-2xl font-bold text-white cursor-pointer group" onClick={() => scrollToSection("home")}>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                VietFashion
              </span>
              <div className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500"></div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              {menuItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() =>
                      item.hasSubmenu
                        ? setMegaMenuOpen(megaMenuOpen === item.id ? "" : item.id)
                        : scrollToSection(item.id)
                    }
                    onMouseEnter={() => item.hasSubmenu && setMegaMenuOpen(item.id)}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                      activeSection === item.id
                        ? "text-purple-400 bg-purple-500/20"
                        : "text-white hover:text-purple-400"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    {item.name}
                    {item.hasSubmenu && (
                      <span
                        className={`transition-transform duration-300 ${megaMenuOpen === item.id ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    )}
                  </button>

                  {/* Mega Menu */}
                  {item.hasSubmenu && megaMenuOpen === item.id && (
                    <div
                      className="absolute top-full left-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-2xl animate-fade-in-down"
                      onMouseLeave={() => setMegaMenuOpen("")}
                    >
                      <div className="p-6">
                        <h3 className="text-white font-semibold mb-4">Danh mục sản phẩm</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {item.submenu?.map((subItem, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                scrollToSection("products")
                                setMegaMenuOpen("")
                              }}
                              className="flex items-center gap-3 p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
                            >
                              <span className="text-lg">{subItem.icon}</span>
                              <span>{subItem.name}</span>
                            </button>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <button
                            onClick={() => {
                              scrollToSection("products")
                              setMegaMenuOpen("")
                            }}
                            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                          >
                            Xem tất cả sản phẩm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-purple-500 transition-all duration-300 ${
                      activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="relative p-3 text-white hover:text-purple-400 transition-all duration-300 hover:scale-110 group"
                >
                  <div className="text-xl">{action.icon}</div>
                  {action.badge && action.badge > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                      {action.badge}
                    </div>
                  )}
                </button>
              ))}

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
              isMobileMenuOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0"
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
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </button>
              ))}

              <div className="pt-4 border-t border-gray-700">
                <div className="grid grid-cols-3 gap-3">
                  {quickActions.slice(0, 6).map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="relative p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 flex flex-col items-center gap-1"
                    >
                      <span className="text-lg">{action.icon}</span>
                      <span className="text-xs">{action.name}</span>
                      {action.badge && action.badge > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {action.badge}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
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

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <StyleGuideModal isOpen={isStyleGuideOpen} onClose={() => setIsStyleGuideOpen(false)} />
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
      <ComparisonModal isOpen={isComparisonOpen} onClose={() => setIsComparisonOpen(false)} />
    </>
  )
}
