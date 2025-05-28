"use client"
//loading mới vào đầu
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative">
        {/* Animated logo */}
        <div className="w-32 h-32 relative">
          <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-blue-500 rounded-full animate-spin-reverse"></div>
          <div className="absolute inset-4 border-4 border-pink-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-white animate-pulse">Đang tải...</h2>
          <div className="flex justify-center mt-4 space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
