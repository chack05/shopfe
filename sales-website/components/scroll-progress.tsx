"use client"

import { useState, useEffect } from "react"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      >
        <div className="absolute right-0 top-0 w-4 h-4 bg-white rounded-full transform -translate-y-1.5 shadow-lg animate-pulse"></div>
      </div>
    </div>
  )
}
