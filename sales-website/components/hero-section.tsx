"use client"
// màn hình mới vào
import { useState, useEffect } from "react"
import Link from 'next/link'; // Import component Link từ Next.js

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Simplified background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 animate-gradient-shift"></div>

      {/* Reduced floating shapes */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Simplified mouse follower */}
      <div
        className="fixed w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none z-10"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          transition: "all 0.5s ease",
        }}
      ></div>

      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-text">
            Thời Trang
          </span>
          <br />
          <span className="text-white animate-bounce-slow">Việt Nam</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fade-in-up">
          Khám phá bộ sưu tập quần áo và giày dép thời trang cao cấp với phong cách Việt Nam hiện đại
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
          {/* Nút "Mua Ngay" */}
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <span className="relative z-10">Mua Ngay</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Nút "Xem Bộ Sưu Tập" - Đã thêm Link Next.js */}
          <Link href="/collections" passHref> {/* Thay đổi '/collections' nếu đường dẫn trang của bạn khác */}
            <button className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:border-purple-400 hover:bg-white/10 hover:scale-105">
              <span className="flex items-center gap-2">
                Xem Bộ Sưu Tập
                <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent group-hover:animate-pulse"></div>
              </span>
            </button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}