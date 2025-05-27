"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10000) // Show after 10 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 2000)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full animate-fade-in-up">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-2xl font-bold text-white mb-2">Đăng ký nhận tin</h3>
              <p className="text-gray-300">Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
              >
                Đăng ký ngay
              </button>
            </form>

            <p className="text-gray-400 text-sm text-center mt-4">Bạn có thể hủy đăng ký bất cứ lúc nào</p>
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">Cảm ơn bạn!</h3>
            <p className="text-gray-300">Chúng tôi sẽ gửi những ưu đãi tốt nhất đến email của bạn</p>
          </div>
        )}
      </div>
    </div>
  )
}
