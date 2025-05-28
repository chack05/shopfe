"use client"
// tìm kich thước
import { useState } from "react"

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
  productType?: string
}

const sizeCharts = {
  clothing: {
    name: "Quần áo",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    measurements: [
      { size: "XS", chest: "80-84", waist: "60-64", hip: "86-90", height: "155-160" },
      { size: "S", chest: "84-88", waist: "64-68", hip: "90-94", height: "160-165" },
      { size: "M", chest: "88-92", waist: "68-72", hip: "94-98", height: "165-170" },
      { size: "L", chest: "92-96", waist: "72-76", hip: "98-102", height: "170-175" },
      { size: "XL", chest: "96-100", waist: "76-80", hip: "102-106", height: "175-180" },
      { size: "XXL", chest: "100-104", waist: "80-84", hip: "106-110", height: "180-185" },
    ],
  },
  shoes: {
    name: "Giày dép",
    sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
    measurements: [
      { size: "35", length: "22.5", width: "8.5" },
      { size: "36", length: "23.0", width: "8.7" },
      { size: "37", length: "23.5", width: "8.9" },
      { size: "38", length: "24.0", width: "9.1" },
      { size: "39", length: "24.5", width: "9.3" },
      { size: "40", length: "25.0", width: "9.5" },
      { size: "41", length: "25.5", width: "9.7" },
      { size: "42", length: "26.0", width: "9.9" },
      { size: "43", length: "26.5", width: "10.1" },
    ],
  },
  accessories: {
    name: "Phụ kiện",
    sizes: ["One Size", "S", "M", "L"],
    measurements: [
      { size: "One Size", description: "Phù hợp với hầu hết kích cỡ" },
      { size: "S", description: "Nhỏ - Phù hợp với người nhỏ con" },
      { size: "M", description: "Trung bình - Kích cỡ phổ biến nhất" },
      { size: "L", description: "Lớn - Phù hợp với người cao to" },
    ],
  },
}

export default function SizeGuideModal({ isOpen, onClose, productType = "clothing" }: SizeGuideModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(productType)
  const [userMeasurements, setUserMeasurements] = useState({
    chest: "",
    waist: "",
    hip: "",
    height: "",
    footLength: "",
  })
  const [recommendedSize, setRecommendedSize] = useState("")

  const currentChart = sizeCharts[selectedCategory as keyof typeof sizeCharts]

  const calculateRecommendedSize = () => {
    if (selectedCategory === "clothing") {
      const chest = Number.parseFloat(userMeasurements.chest)
      const waist = Number.parseFloat(userMeasurements.waist)
      const hip = Number.parseFloat(userMeasurements.hip)

      if (chest && waist && hip) {
        for (const measurement of currentChart.measurements) {
          // Type guard to ensure we're working with clothing measurements
          if ("chest" in measurement && "waist" in measurement && "hip" in measurement) {
            const chestRange = measurement.chest.split("-").map(Number)
            const waistRange = measurement.waist.split("-").map(Number)
            const hipRange = measurement.hip.split("-").map(Number)

            if (
                chest >= chestRange[0] &&
                chest <= chestRange[1] &&
                waist >= waistRange[0] &&
                waist <= waistRange[1] &&
                hip >= hipRange[0] &&
                hip <= hipRange[1]
            ) {
              setRecommendedSize(measurement.size)
              return
            }
          }
        }
      }
    } else if (selectedCategory === "shoes") {
      const footLength = Number.parseFloat(userMeasurements.footLength)
      if (footLength) {
        for (const measurement of currentChart.measurements) {
          // Type guard to ensure we're working with shoe measurements
          if ("length" in measurement) {
            const length = Number.parseFloat(measurement.length)
            if (Math.abs(footLength - length) <= 0.3) {
              setRecommendedSize(measurement.size)
              return
            }
          }
        }
      }
    }
    setRecommendedSize("")
  }

  if (!isOpen) return null

  return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in">
          {/* Header */}
          <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg flex justify-between items-center p-6 border-b border-gray-700 z-10">
            <h2 className="text-3xl font-bold text-white">Hướng Dẫn Chọn Size</h2>
            <button
                onClick={onClose}
                className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-300 hover:rotate-90"
            >
              ✕
            </button>
          </div>

          <div className="p-6">
            {/* Category Selection */}
            <div className="flex gap-4 mb-8">
              {Object.entries(sizeCharts).map(([key, chart]) => (
                  <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                          selectedCategory === key ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                  >
                    {chart.name}
                  </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Size Chart */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Bảng Size {currentChart.name}</h3>

                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-white font-semibold">Size</th>
                      {selectedCategory === "clothing" && (
                          <>
                            <th className="px-4 py-3 text-left text-white font-semibold">Ngực (cm)</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Eo (cm)</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Hông (cm)</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Chiều cao (cm)</th>
                          </>
                      )}
                      {selectedCategory === "shoes" && (
                          <>
                            <th className="px-4 py-3 text-left text-white font-semibold">Dài chân (cm)</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Rộng chân (cm)</th>
                          </>
                      )}
                      {selectedCategory === "accessories" && (
                          <th className="px-4 py-3 text-left text-white font-semibold">Mô tả</th>
                      )}
                    </tr>
                    </thead>
                    <tbody>
                    {currentChart.measurements.map((measurement, index) => (
                        <tr
                            key={index}
                            className={`border-t border-gray-700 hover:bg-gray-700/50 transition-colors duration-300 ${
                                recommendedSize === measurement.size ? "bg-purple-600/20 border-purple-500" : ""
                            }`}
                        >
                          <td className="px-4 py-3 text-white font-semibold">
                            {measurement.size}
                            {recommendedSize === measurement.size && (
                                <span className="ml-2 text-green-400">✓ Được đề xuất</span>
                            )}
                          </td>
                          {selectedCategory === "clothing" && "chest" in measurement && (
                              <>
                                <td className="px-4 py-3 text-gray-300">{measurement.chest}</td>
                                <td className="px-4 py-3 text-gray-300">{measurement.waist}</td>
                                <td className="px-4 py-3 text-gray-300">{measurement.hip}</td>
                                <td className="px-4 py-3 text-gray-300">{measurement.height}</td>
                              </>
                          )}
                          {selectedCategory === "shoes" && "length" in measurement && (
                              <>
                                <td className="px-4 py-3 text-gray-300">{measurement.length}</td>
                                <td className="px-4 py-3 text-gray-300">{measurement.width}</td>
                              </>
                          )}
                          {selectedCategory === "accessories" && "description" in measurement && (
                              <td className="px-4 py-3 text-gray-300">{measurement.description}</td>
                          )}
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                {/* Measurement Tips */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <h4 className="text-blue-400 font-semibold mb-3">💡 Cách đo chính xác</h4>
                  {selectedCategory === "clothing" && (
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>
                          • <strong>Ngực:</strong> Đo quanh phần rộng nhất của ngực
                        </li>
                        <li>
                          • <strong>Eo:</strong> Đo quanh phần nhỏ nhất của eo
                        </li>
                        <li>
                          • <strong>Hông:</strong> Đo quanh phần rộng nhất của hông
                        </li>
                        <li>
                          • <strong>Chiều cao:</strong> Đo từ đỉnh đầu đến chân
                        </li>
                      </ul>
                  )}
                  {selectedCategory === "shoes" && (
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>
                          • <strong>Dài chân:</strong> Đo từ gót đến ngón chân dài nhất
                        </li>
                        <li>
                          • <strong>Rộng chân:</strong> Đo phần rộng nhất của bàn chân
                        </li>
                        <li>• Nên đo chân vào buổi chiều khi chân hơi phù</li>
                      </ul>
                  )}
                </div>
              </div>

              {/* Size Calculator */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Tính Size Phù Hợp</h3>

                <div className="bg-gray-800 rounded-xl p-6">
                  <p className="text-gray-300 mb-6">Nhập số đo của bạn để chúng tôi gợi ý size phù hợp nhất</p>

                  {selectedCategory === "clothing" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Vòng ngực (cm)</label>
                          <input
                              type="number"
                              value={userMeasurements.chest}
                              onChange={(e) => setUserMeasurements((prev) => ({ ...prev, chest: e.target.value }))}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                              placeholder="Ví dụ: 88"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Vòng eo (cm)</label>
                          <input
                              type="number"
                              value={userMeasurements.waist}
                              onChange={(e) => setUserMeasurements((prev) => ({ ...prev, waist: e.target.value }))}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                              placeholder="Ví dụ: 68"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Vòng hông (cm)</label>
                          <input
                              type="number"
                              value={userMeasurements.hip}
                              onChange={(e) => setUserMeasurements((prev) => ({ ...prev, hip: e.target.value }))}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                              placeholder="Ví dụ: 94"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Chiều cao (cm)</label>
                          <input
                              type="number"
                              value={userMeasurements.height}
                              onChange={(e) => setUserMeasurements((prev) => ({ ...prev, height: e.target.value }))}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                              placeholder="Ví dụ: 165"
                          />
                        </div>
                      </div>
                  )}

                  {selectedCategory === "shoes" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Chiều dài chân (cm)</label>
                          <input
                              type="number"
                              step="0.1"
                              value={userMeasurements.footLength}
                              onChange={(e) => setUserMeasurements((prev) => ({ ...prev, footLength: e.target.value }))}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                              placeholder="Ví dụ: 24.5"
                          />
                        </div>
                      </div>
                  )}

                  <button
                      onClick={calculateRecommendedSize}
                      className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Tính size phù hợp
                  </button>

                  {recommendedSize && (
                      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <h4 className="text-green-400 font-semibold mb-2">🎯 Kết quả</h4>
                        <p className="text-white">
                          Size được đề xuất cho bạn: <strong className="text-green-400 text-xl">{recommendedSize}</strong>
                        </p>
                        <p className="text-gray-300 text-sm mt-2">Đây là size phù hợp nhất dựa trên số đo bạn cung cấp</p>
                      </div>
                  )}
                </div>

                {/* Additional Tips */}
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <h4 className="text-yellow-400 font-semibold mb-2">⚠️ Lưu ý quan trọng</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Mỗi thương hiệu có thể có size khác nhau</li>
                      <li>• Nên thử trước khi mua nếu có thể</li>
                      <li>• Chọn size lớn hơn nếu bạn thích mặc rộng</li>
                      <li>• Liên hệ tư vấn viên nếu còn thắc mắc</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors duration-300">
                      Lưu số đo
                    </button>
                    <button className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300">
                      Tư vấn trực tiếp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
