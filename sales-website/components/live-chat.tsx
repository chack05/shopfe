"use client"

import React, { useState } from "react"

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn?", isBot: true, time: "14:30" },
  ])
  const [inputMessage, setInputMessage] = useState("")

  // Hàm trả lời bot dựa trên từ khóa
  function getBotReply(userMessage: string): string {
    const msg = userMessage.toLowerCase()

    if (msg.includes("giá") || msg.includes("bao nhiêu")) {
      return "Giá sản phẩm dao động từ 100k đến 1 triệu đồng tùy mẫu bạn nhé!"
    }

    if (msg.includes("ship") || msg.includes("giao hàng")) {
      return "Chúng tôi có dịch vụ giao hàng tận nơi, thời gian từ 2-5 ngày làm việc."
    }

    if (msg.includes("đổi trả") || msg.includes("bảo hành")) {
      return "Bạn có thể đổi trả trong vòng 7 ngày nếu sản phẩm lỗi, hoặc bảo hành theo chính sách của chúng tôi."
    }

    if (msg.includes("xin chào") || msg.includes("hello") || msg.includes("hi")) {
      return "Xin chào bạn! Tôi có thể giúp gì cho bạn hôm nay?"
    }

    return "Cảm ơn bạn đã liên hệ! Tôi sẽ chuyển cho chuyên viên tư vấn ngay."
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedMessage = inputMessage.trim()
    if (!trimmedMessage) return

    const lastId = messages.length > 0 ? messages[messages.length - 1].id : 0

    const newMessage = {
      id: lastId + 1,
      text: trimmedMessage,
      isBot: false,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Bot trả lời sau 0.5s
    const botResponse = {
      id: lastId + 2,
      text: getBotReply(trimmedMessage),
      isBot: true,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse])
    }, 500)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-40"
      >
        <div className="text-xl">💬</div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-8 w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl z-40 animate-fade-in-up flex flex-col">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">👨‍💼</div>
              <div>
                <h3 className="font-semibold">Tư vấn viên</h3>
                <p className="text-xs opacity-80">Đang online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isBot ? "bg-gray-700 text-white" : "bg-purple-600 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                📤
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
