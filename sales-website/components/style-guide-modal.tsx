"use client"

import { useState, useEffect } from "react"

interface StyleGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

const styleGuides = [
  {
    id: 1,
    title: "Phối đồ công sở chuyên nghiệp",
    description: "Hướng dẫn tạo phong cách công sở thanh lịch và chuyên nghiệp",
    image: "/docongso.jpg?height=300&width=400",
    tips: [
      "Chọn màu sắc trung tính như đen, xám, navy",
      "Kết hợp áo sơ mi với blazer hoặc vest",
      "Phụ kiện tối giản nhưng tinh tế",
      "Giày cao gót hoặc giày oxford",
    ],
    category: "office",
    difficulty: "Dễ",
    timeToStyle: "15 phút",
    products: [
      { name: "Áo blazer navy", price: 1200000, image: "/paocongso.jpg?height=150&width=150" },
      { name: "Quần âu đen", price: 800000, image: "/quanden.jpg?height=150&width=150" },
      { name: "Giày oxford", price: 1500000, image: "/giaycaogotden.jpg?height=150&width=150" },
    ],
  },
  {
    id: 2,
    title: "Phong cách dạo phố năng động",
    description: "Tạo outfit thoải mái nhưng vẫn thời trang cho ngày cuối tuần",
    image: "/daopho.jpg?height=300&width=400",
    tips: [
      "Kết hợp jeans với áo thun hoặc áo hoodie",
      "Sneakers là lựa chọn hoàn hảo",
      "Thêm jacket hoặc cardigan để tạo điểm nhấn",
      "Phụ kiện như mũ, túi đeo chéo",
    ],
    category: "casual",
    difficulty: "Dễ",
    timeToStyle: "10 phút",
    products: [
      { name: "Áo hoodie", price: 600000, image: "/aohosdi.jpg?height=150&width=150" },
      { name: "Quần jeans", price: 900000, image: "/quanjean.jpg?height=150&width=150" },
      { name: "Sneakers", price: 2200000, image: "/giayh.jpg?height=150&width=150" },
    ],
  },
  {
    id: 3,
    title: "Dạ tiệc sang trọng",
    description: "Tỏa sáng trong những buổi tiệc tối và sự kiện đặc biệt",
    image: "/vaydahoi1.jpg?height=300&width=400",
    tips: [
      "Chọn váy dài hoặc jumpsuit thanh lịch",
      "Màu sắc tối hoặc metallic",
      "Phụ kiện lấp lánh như trang sức, clutch",
      "Giày cao gót và makeup đậm",
    ],
    category: "evening",
    difficulty: "Khó",
    timeToStyle: "45 phút",
    products: [
      { name: "Váy dạ hội", price: 6500000, image: "/vaydahoi1.jpg?height=150&width=150" },
      { name: "Giày cao gót", price: 1800000, image: "/giaycaogotden1.jpg?height=150&width=150" },
      { name: "Clutch sang trọng", price: 2800000, image: "/trangsuc.jpg?height=150&width=150" },
    ],
  },
  {
    id: 4,
    title: "Phong cách bohemian tự do",
    description: "Thể hiện cá tính tự do và phóng khoáng",
    image: "/a3566d07-phoi-do-nu-ca-tinh-12.jpg?height=300&width=400",
    tips: [
      "Váy maxi với họa tiết hoa hoặc ethnic",
      "Nhiều lớp phụ kiện như vòng cổ, vòng tay",
      "Sandal hoặc boots",
      "Túi fringe hoặc túi thổ cẩm",
    ],
    category: "bohemian",
    difficulty: "Trung bình",
    timeToStyle: "25 phút",
    products: [
      { name: "Váy maxi bohemian", price: 1800000, image: "/vaychan.jpg?height=150&width=150" },
      { name: "Sandal da", price: 1200000, image: "/Sandal.jpg?height=150&width=150" },
      { name: "Túi fringe", price: 1500000, image: "/fringe.jpg?height=150&width=150" },
    ],
  },
]

export default function StyleGuideModal({ isOpen, onClose }: StyleGuideModalProps) {
  const [selectedGuide, setSelectedGuide] = useState(styleGuides[0])
  const [activeStep, setActiveStep] = useState(0)
  const [currentView, setCurrentView] = useState<"list" | "detail" | "quiz">("list")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [recommendedStyle, setRecommendedStyle] = useState<any>(null)

  const quizQuestions = [
    {
      id: "occasion",
      question: "Bạn thường xuyên tham gia sự kiện nào?",
      options: [
        { value: "office", label: "Công việc văn phòng" },
        { value: "casual", label: "Dạo phố, gặp bạn bè" },
        { value: "evening", label: "Tiệc tối, sự kiện" },
        { value: "bohemian", label: "Du lịch, nghỉ dưỡng" },
      ],
    },
    {
      id: "style",
      question: "Phong cách nào phù hợp với bạn nhất?",
      options: [
        { value: "office", label: "Thanh lịch, chuyên nghiệp" },
        { value: "casual", label: "Thoải mái, năng động" },
        { value: "evening", label: "Sang trọng, quyến rũ" },
        { value: "bohemian", label: "Tự do, cá tính" },
      ],
    },
    {
      id: "time",
      question: "Bạn có bao nhiều thời gian để chuẩn bị?",
      options: [
        { value: "casual", label: "Dưới 15 phút" },
        { value: "office", label: "15-30 phút" },
        { value: "bohemian", label: "30-45 phút" },
        { value: "evening", label: "Trên 45 phút" },
      ],
    },
  ]

  useEffect(() => {
    if (!isOpen) {
      setCurrentView("list")
      setActiveStep(0)
      setQuizAnswers({})
      setRecommendedStyle(null)
    }
  }, [isOpen])

  const handleQuizComplete = () => {
    const answers = Object.values(quizAnswers)
    const styleCount = answers.reduce(
      (acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const recommendedCategory = Object.keys(styleCount).reduce((a, b) => (styleCount[a] > styleCount[b] ? a : b))

    const recommended = styleGuides.find((guide) => guide.category === recommendedCategory)
    setRecommendedStyle(recommended)
    setCurrentView("detail")
    setSelectedGuide(recommended || styleGuides[0])
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto animate-zoom-in">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg flex justify-between items-center p-6 border-b border-gray-700 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white">
              {currentView === "quiz" ? "Tìm Phong Cách Của Bạn" : "Hướng Dẫn Phong Cách"}
            </h2>
            {recommendedStyle && (
              <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full animate-pulse">Được đề xuất</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView("quiz")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === "quiz" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              🎯 Tìm phong cách
            </button>
            <button
              onClick={onClose}
              className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-300 hover:rotate-90"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Quiz View */}
        {currentView === "quiz" && (
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Khám phá phong cách phù hợp với bạn</h3>
                <p className="text-gray-300">Trả lời một vài câu hỏi để chúng tôi gợi ý phong cách tốt nhất</p>
              </div>

              <div className="space-y-8">
                {quizQuestions.map((question, index) => (
                  <div key={question.id} className="bg-gray-800 rounded-xl p-6">
                    <h4 className="text-white font-semibold mb-4">{question.question}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {question.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [question.id]: option.value }))}
                          className={`p-4 rounded-lg text-left transition-all duration-300 ${
                            quizAnswers[question.id] === option.value
                              ? "bg-purple-600 text-white border-2 border-purple-400"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-transparent"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={handleQuizComplete}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Xem kết quả
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {currentView === "list" && (
          <div className="grid lg:grid-cols-4 gap-6 p-6">
            {/* Style Guide List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Chọn phong cách</h3>
              {styleGuides.map((guide, index) => (
                <button
                  key={guide.id}
                  onClick={() => {
                    setSelectedGuide(guide)
                    setCurrentView("detail")
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 animate-fade-in-up ${
                    selectedGuide.id === guide.id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        guide.difficulty === "Dễ"
                          ? "bg-green-500"
                          : guide.difficulty === "Trung bình"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-sm opacity-80">{guide.difficulty}</span>
                  </div>
                  <h4 className="font-semibold mb-1">{guide.title}</h4>
                  <p className="text-sm opacity-80 line-clamp-2">{guide.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs opacity-60">
                    <span>⏱️ {guide.timeToStyle}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Preview Grid */}
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold text-white mb-6">Xem trước phong cách</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {styleGuides.map((guide, index) => (
                  <div
                    key={guide.id}
                    className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer"
                    style={{ animationDelay: `${index * 150}ms` }}
                    onClick={() => {
                      setSelectedGuide(guide)
                      setCurrentView("detail")
                    }}
                  >
                    <img
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{guide.title}</h4>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            guide.difficulty === "Dễ"
                              ? "bg-green-500/20 text-green-400"
                              : guide.difficulty === "Trung bình"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {guide.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{guide.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-400">⏱️ {guide.timeToStyle}</span>
                        <span className="text-gray-400">{guide.tips.length} bước</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Detail View */}
        {currentView === "detail" && (
          <div className="p-6">
            <button
              onClick={() => setCurrentView("list")}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors duration-300"
            >
              ← Quay lại danh sách
            </button>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="relative rounded-2xl overflow-hidden mb-6 group">
                  <img
                    src={selectedGuide.image || "/placeholder.svg"}
                    alt={selectedGuide.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-4 text-white">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedGuide.difficulty === "Dễ"
                            ? "bg-green-500"
                            : selectedGuide.difficulty === "Trung bình"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      >
                        {selectedGuide.difficulty}
                      </span>
                      <span className="text-sm">⏱️ {selectedGuide.timeToStyle}</span>
                    </div>
                  </div>
                </div>

                {/* Products needed */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-4">Sản phẩm cần thiết</h4>
                  <div className="space-y-4">
                    {selectedGuide.products.map((product, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                      >
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="text-white font-medium">{product.name}</h5>
                          <p className="text-purple-400 font-semibold">{formatPrice(product.price)}</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
                          Thêm vào giỏ
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Tổng cộng:</span>
                      <span className="text-white font-bold text-lg">
                        {formatPrice(selectedGuide.products.reduce((sum, p) => sum + p.price, 0))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold text-white">{selectedGuide.title}</h3>
                  {recommendedStyle?.id === selectedGuide.id && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full animate-pulse">
                      Được đề xuất cho bạn
                    </span>
                  )}
                </div>

                <p className="text-gray-300 text-lg mb-6">{selectedGuide.description}</p>

                {/* Step by step guide */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Hướng dẫn từng bước:</h4>
                  <div className="space-y-3">
                    {selectedGuide.tips.map((tip, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                          activeStep === index
                            ? "bg-purple-600/20 border border-purple-500"
                            : "hover:bg-gray-700 border border-transparent"
                        }`}
                        onClick={() => setActiveStep(index)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            activeStep === index ? "bg-purple-500 text-white scale-110" : "bg-gray-600 text-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <span
                            className={`transition-colors duration-300 ${
                              activeStep === index ? "text-white" : "text-gray-300"
                            }`}
                          >
                            {tip}
                          </span>
                        </div>
                        {activeStep === index && <div className="text-purple-400 animate-pulse">✓</div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300">
                    Mua sắm theo phong cách này
                  </button>
                  <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors duration-300">
                    Lưu hướng dẫn
                  </button>
                  <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors duration-300">
                    Chia sẻ
                  </button>
                </div>

                {/* Tips */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <h5 className="text-blue-400 font-semibold mb-2">💡 Mẹo hay</h5>
                  <p className="text-gray-300 text-sm">
                    Hãy thử nghiệm với các phụ kiện khác nhau để tạo ra phong cách riêng của bạn. Đừng ngại mix & match
                    để tìm ra combo hoàn hảo!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
