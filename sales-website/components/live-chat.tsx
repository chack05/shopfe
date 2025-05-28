"use client"

import React, { useState, useEffect, useRef } from "react"

// Định nghĩa kiểu cho một tin nhắn
interface Message {
  id: number
  text: string
  isBot: boolean
  time: string
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo của Thời Trang Việt Nam. Tôi có thể giúp gì cho bạn hôm nay?",
      isBot: true,
      time: "14:30",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null) // Dùng để cuộn xuống cuối tin nhắn

  // Cuộn xuống cuối tin nhắn mỗi khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Hàm trả lời bot thông minh hơn với nhiều từ khóa và kịch bản
  function getBotReply(userMessage: string): string {
    const msg = userMessage.toLowerCase().trim()

    // --- Chào hỏi & Mở đầu ---
    if (
      /^(hi|hello|xin chào|chào bạn|alo|có đó không|bạn khỏe không|gì vậy|gì đó)/.test(msg)
    ) {
      const greetings = [
        "Xin chào bạn! Tôi có thể giúp gì cho bạn hôm nay? (Ví dụ: Bạn muốn hỏi về giá, giao hàng, đổi trả, hay sản phẩm mới?)",
        "Chào bạn! Rất vui được hỗ trợ. Bạn đang tìm kiếm thông tin gì về Thời Trang Việt Nam?",
        "Hi! Chúng tôi ở đây để giải đáp mọi thắc mắc của bạn. Hãy nói cho tôi biết điều bạn quan tâm nhé!",
        "Tôi đây! Bạn có câu hỏi gì về thời trang, sản phẩm, hoặc chính sách của chúng tôi không?",
      ]
      return greetings[Math.floor(Math.random() * greetings.length)]
    }

    // --- Hỏi về sản phẩm cụ thể ---
    if (/(sản phẩm|mẫu|áo|quần|váy|giày|túi|phụ kiện)/.test(msg) && /(mới|có không|còn không|loại nào)/.test(msg)) {
        if (/(áo khoác|bomber|hoodie)/.test(msg)) {
            return "Chúng tôi có rất nhiều mẫu áo khoác mới về đó ạ! Bạn quan tâm đến kiểu dáng nào: bomber, hoodie, blazer, hay áo khoác denim?"
        }
        if (/(quần jeans|quần âu|chân váy)/.test(msg)) {
            return "Về quần và chân váy, chúng tôi có đủ loại từ quần jeans skinny, ống rộng đến quần âu công sở và chân váy chữ A, midi. Bạn cần tìm cho dịp nào?"
        }
        if (/(váy|đầm)/.test(msg)) {
            return "Bộ sưu tập váy đầm của chúng tôi rất đa dạng từ váy dự tiệc, váy dạo phố đến đầm công sở. Bạn có muốn xem các mẫu mới nhất không?"
        }
        if (/(giày|sneaker|dép|boot)/.test(msg)) {
            return "Bạn đang tìm giày thể thao năng động, giày cao gót sang trọng, hay dép tiện dụng? Chúng tôi có đủ mẫu mã và kích cỡ."
        }
        return "Bạn muốn hỏi về loại sản phẩm nào cụ thể? Áo, Quần, Váy, Giày hay Phụ kiện?"
    }

    // --- Giá sản phẩm ---
    if (/(giá|bao nhiêu tiền|bao nhiêu|giá cả|mua bao nhiêu|đắt không|rẻ không|chi phí)/.test(msg)) {
      if (/(áo khoác|bomber|hoodie|áo ấm|vest)/.test(msg)) {
        return "Các loại áo khoác của chúng tôi có giá từ **700.000 VNĐ** đến **2.500.000 VNĐ** tùy chất liệu và kiểu dáng. Bạn có muốn xem catalog áo khoác không?"
      }
      if (/(quần jeans|quần dài|quần tây|quần kaki)/.test(msg)) {
        return "Quần jeans và quần dài có giá dao động từ **450.000 VNĐ** đến **1.500.000 VNĐ**. Bạn muốn kiểu dáng nào để tôi báo giá chính xác hơn?"
      }
      if (/(váy|đầm|chân váy)/.test(msg)) {
        return "Váy và đầm của chúng tôi có nhiều mẫu mã đa dạng, giá từ **300.000 VNĐ** đến **2.000.000 VNĐ**. Bạn có thể ghé thăm phần 'Váy & Đầm' trên website để xem chi tiết."
      }
      if (/(giày|sneaker|dép|boot|sandals)/.test(msg)) {
        return "Giày dép có giá từ **500.000 VNĐ** đến **3.000.000 VNĐ**, tùy vào thương hiệu và chất liệu. Bạn có thể cho tôi biết bạn đang tìm loại giày nào không?"
      }
      if (/(áo thun|áo phông|áo sơ mi)/.test(msg)) {
        return "Áo thun cơ bản có giá từ **180.000 VNĐ**, các mẫu thiết kế đặc biệt hoặc áo sơ mi có thể từ 350.000 VNĐ trở lên."
      }
      if (/(phụ kiện|túi xách|ví|thắt lưng|nón)/.test(msg)) {
        return "Phụ kiện của chúng tôi có giá từ **150.000 VNĐ** đến **1.000.000 VNĐ** tùy loại. Bạn quan tâm đến phụ kiện nào?"
      }
      return "Bạn muốn hỏi giá của loại sản phẩm nào cụ thể? Vui lòng cho tôi biết bạn quan tâm đến Áo, Quần, Váy, Giày dép hay Phụ kiện nhé!"
    }

    // --- Giao hàng / Ship ---
    if (/(ship|giao hàng|vận chuyển|phí ship|khi nào nhận được|gửi hàng)/.test(msg)) {
      if (/(thời gian|bao lâu|mấy ngày|khi nào)/.test(msg)) {
        return "Thời gian giao hàng dự kiến là từ **2-5 ngày làm việc** tùy khu vực. Đối với các thành phố lớn thường là 2-3 ngày, các tỉnh xa hơn có thể mất 4-5 ngày. Bạn có cần giao gấp không?"
      }
      if (/(phí ship|cước phí|bao nhiêu tiền ship|có mất phí không)/.test(msg)) {
        return "Phí giao hàng nội thành là **30.000 VNĐ**, ngoại thành và các tỉnh khác từ **40.000 VNĐ** trở lên tùy trọng lượng và địa điểm. **Đơn hàng trên 1.500.000 VNĐ sẽ được miễn phí ship**."
      }
      if (/(kiểm tra hàng|mở hàng)/.test(msg)) {
        return "Bạn hoàn toàn có thể kiểm tra hàng trước khi thanh toán. Nếu có bất kỳ vấn đề gì, vui lòng liên hệ ngay với shipper hoặc hotline của chúng tôi."
      }
      return "Chúng tôi có dịch vụ giao hàng tận nơi trên toàn quốc. Bạn muốn biết về thời gian, phí ship hay chính sách kiểm hàng?"
    }

    // --- Đổi trả / Bảo hành ---
    if (/(đổi trả|bảo hành|hoàn tiền|sản phẩm lỗi|thay mới|bị hỏng)/.test(msg)) {
      if (/(thời gian đổi trả|bao lâu được đổi|hạn đổi trả)/.test(msg)) {
        return "Bạn có thể đổi trả sản phẩm trong vòng **7 ngày** kể từ ngày nhận hàng, với điều kiện sản phẩm còn nguyên tem mác, chưa qua sử dụng và chưa giặt ủi."
      }
      if (/(điều kiện đổi trả|đổi trả như nào|làm sao để đổi)/.test(msg)) {
        return "Sản phẩm được đổi trả nếu có lỗi từ nhà sản xuất, giao sai mẫu/size, hoặc không đúng với mô tả. Vui lòng giữ hóa đơn mua hàng để được hỗ trợ. Bạn có thể ghé cửa hàng hoặc gửi hàng về trung tâm bảo hành."
      }
      if (/(chính sách bảo hành|bảo hành)/.test(msg)) {
        return "Hầu hết các sản phẩm của chúng tôi có chính sách bảo hành **1 năm** đối với lỗi kỹ thuật (đường may, khóa kéo, bung chỉ...). Đối với giày dép, chúng tôi hỗ trợ keo, chỉ trọn đời."
      }
      return "Bạn muốn tìm hiểu về chính sách đổi trả hay bảo hành sản phẩm của chúng tôi?"
    }

    // --- Hướng dẫn sử dụng / Chăm sóc sản phẩm ---
    if (/(cách dùng|hướng dẫn|giặt|bảo quản|làm sạch|vệ sinh)/.test(msg)) {
      if (/(giặt|làm sạch|vệ sinh)/.test(msg)) {
        return "Để sản phẩm bền đẹp, bạn nên đọc kỹ nhãn mác sản phẩm. Đa số sản phẩm của chúng tôi khuyến nghị giặt tay hoặc giặt máy ở chế độ nhẹ với nước lạnh, tránh sấy khô nhiệt độ cao và phơi trong bóng râm."
      }
      if (/(bảo quản)/.test(msg)) {
        return "Nên bảo quản sản phẩm ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Đối với giày dép, hãy sử dụng hộp hoặc túi bảo quản khi không dùng."
      }
      return "Bạn cần hướng dẫn sử dụng hoặc bảo quản cho loại sản phẩm nào ạ? Hoặc bạn đang gặp vấn đề gì cụ thể?"
    }

    // --- Thông tin liên hệ / Hỗ trợ khách hàng ---
    if (/(liên hệ|số điện thoại|email|tổng đài|gặp người tư vấn|hotline|facebook|zalo)/.test(msg)) {
      return "Bạn có thể liên hệ với chúng tôi qua **Hotline: 0123.456.789** (hoạt động từ 8h-20h hàng ngày). Hoặc gửi email về địa chỉ: **support@thoitrangvietnam.com**. Chúng tôi cũng có mặt trên Facebook/Zalo nếu bạn muốn nhắn tin trực tiếp."
    }

    // --- Vị trí cửa hàng / Showroom ---
    if (/(cửa hàng|showroom|địa chỉ|ở đâu|mua trực tiếp)/.test(msg)) {
      return "Chúng tôi có nhiều cửa hàng trên toàn quốc. Bạn có thể tìm địa chỉ cửa hàng gần nhất tại mục 'Hệ thống cửa hàng' trên website của chúng tôi. Bạn ở khu vực nào để tôi gợi ý?"
    }

    // --- Khuyến mãi / Ưu đãi / Voucher ---
    if (/(khuyến mãi|ưu đãi|giảm giá|sale|voucher|mã giảm giá|chương trình)/.test(msg)) {
      return "Hiện tại chúng tôi đang có chương trình **giảm giá lên đến 50%** cho các sản phẩm mùa hè và các ưu đãi đặc biệt cho khách hàng thân thiết. Bạn có thể xem chi tiết trên trang 'Khuyến mãi' của website hoặc kiểm tra mục 'Ưu đãi của bạn' trong tài khoản."
    }

    // --- Kích thước / Size ---
    if (/(size|kích thước|cỡ|chọn size|số đo)/.test(msg)) {
      return "Để chọn size phù hợp nhất, bạn vui lòng tham khảo **bảng size chi tiết** có trên mỗi trang sản phẩm. Bảng size bao gồm số đo vòng ngực, eo, mông, chiều cao... Nếu cần tư vấn thêm, bạn có thể cung cấp chiều cao và cân nặng của mình nhé."
    }

    // --- Đặt hàng / Thanh toán ---
    if (/(đặt hàng|thanh toán|mua hàng|cách mua|phương thức thanh toán|thanh toán online|COD)/.test(msg)) {
      if (/(cách đặt hàng|đặt hàng như nào)/.test(msg)) {
        return "Bạn có thể đặt hàng trực tiếp trên website của chúng tôi: chọn sản phẩm -> thêm vào giỏ hàng -> điền thông tin giao hàng -> chọn phương thức thanh toán -> xác nhận đơn hàng."
      }
      if (/(phương thức thanh toán|thanh toán như nào)/.test(msg)) {
        return "Chúng tôi chấp nhận thanh toán qua **chuyển khoản ngân hàng**, **thẻ tín dụng/ghi nợ (Visa, Mastercard)**, và **thanh toán khi nhận hàng (COD)**."
      }
      return "Bạn muốn hỏi về cách đặt hàng hay các phương thức thanh toán?"
    }
    
    // --- Tài khoản khách hàng / Đăng nhập ---
    if (/(tài khoản|đăng nhập|đăng ký|quên mật khẩu|thành viên)/.test(msg)) {
        return "Nếu bạn gặp vấn đề với tài khoản, bạn có thể sử dụng chức năng 'Quên mật khẩu' hoặc liên hệ hotline để được hỗ trợ. Đăng ký tài khoản giúp bạn theo dõi đơn hàng và nhận ưu đãi độc quyền."
    }

    // --- Chính sách bảo mật ---
    if (/(bảo mật|thông tin cá nhân|quyền riêng tư)/.test(msg)) {
        return "Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng. Mọi thông tin được mã hóa và chỉ sử dụng cho mục đích phục vụ quý khách. Bạn có thể đọc chi tiết trong Chính sách bảo mật trên website."
    }

    // --- Cảm ơn / Kết thúc cuộc trò chuyện ---
    if (/(cảm ơn|thank you|ok|xong rồi|tạm biệt|bye|kết thúc)/.test(msg)) {
      const farewells = [
        "Rất vui được hỗ trợ bạn! Nếu có bất kỳ câu hỏi nào khác, đừng ngần ngại hỏi nhé.",
        "Cảm ơn bạn đã trò chuyện với tôi! Chúc bạn một ngày tốt lành và mua sắm vui vẻ.",
        "Hẹn gặp lại bạn! Đừng ngần ngại liên hệ nếu cần thêm hỗ trợ. Tạm biệt!"
      ]
      return farewells[Math.floor(Math.random() * farewells.length)]
    }

    // --- Phản hồi chung khi không hiểu rõ hoặc cần chuyển tiếp ---
    const genericReplies = [
      "Tôi hiểu rồi. Bạn có thể nói rõ hơn yêu cầu của mình được không? Có vẻ như tôi chưa hiểu rõ ý bạn lắm.",
      "Xin lỗi, tôi chưa hiểu rõ ý bạn lắm. Bạn có thể cung cấp thêm thông tin hoặc diễn đạt lại câu hỏi không? Tôi có thể trả lời về giá, giao hàng, đổi trả, bảo hành, hoặc sản phẩm đó ạ.",
      "Cảm ơn bạn đã liên hệ! Yêu cầu của bạn có vẻ hơi phức tạp, tôi sẽ chuyển cuộc trò chuyện này cho chuyên viên tư vấn của chúng tôi. Bạn có đồng ý không ạ?",
      "Hiện tại tôi chỉ có thể trả lời các câu hỏi thường gặp về sản phẩm, chính sách và dịch vụ. Bạn có thể thử hỏi lại về các chủ đề như: **Giá sản phẩm**, **Giao hàng**, **Đổi trả**, **Bảo hành**, **Khuyến mãi**, **Cửa hàng**, hoặc **Cách đặt hàng** nhé!"
    ]
    return genericReplies[Math.floor(Math.random() * genericReplies.length)]
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedMessage = inputMessage.trim()
    if (!trimmedMessage) return

    const lastId = messages.length > 0 ? messages[messages.length - 1].id : 0

    const newMessage: Message = {
      id: lastId + 1,
      text: trimmedMessage,
      isBot: false,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Bot trả lời sau 0.5s hoặc 1s để tạo cảm giác "nghĩ"
    const botResponseText = getBotReply(trimmedMessage)
    const botResponse: Message = {
      id: lastId + 2,
      text: botResponseText,
      isBot: true,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse])
    }, Math.random() * 1000 + 500) // Thời gian phản hồi ngẫu nhiên từ 0.5s đến 1.5s
  }

  return (
    <>
      {/* Nút Chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-40"
        aria-label={isOpen ? "Đóng chat" : "Mở chat"}
      >
        <div className="text-xl">💬</div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </button>

      {/* Cửa sổ Chat */}
      {isOpen && (
        <div className="fixed bottom-24 left-8 w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl z-40 animate-fade-in-up flex flex-col">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">👨‍💼</div>
              <div>
                <h3 className="font-semibold">Trợ lý ảo</h3>
                <p className="text-xs opacity-80">Đang online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors duration-300"
              aria-label="Đóng cửa sổ chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-lg ${
                    message.isBot
                      ? "bg-gray-700 text-white rounded-bl-none"
                      : "bg-purple-600 text-white rounded-br-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">{message.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Dùng để cuộn */}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Nhập tin nhắn của bạn..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm"
                aria-label="Nhập tin nhắn"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                aria-label="Gửi tin nhắn"
              >
                📤
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Custom Scrollbar Style (có thể đặt trong global CSS hoặc thêm vào component) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  )
}