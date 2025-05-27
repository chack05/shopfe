"use client"

import { useCart } from "@/contexts/cart-context"

export default function ShoppingCart() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex justify-end">
      <div className="w-full max-w-md bg-gray-900 h-full overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Giỏ hàng</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-400 mt-2">{items.length} sản phẩm</p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-400 text-lg">Giỏ hàng trống</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="bg-gray-800 rounded-xl p-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {item.size && `Size: ${item.size}`}
                        {item.color && ` • Màu: ${item.color}`}
                      </p>
                      <p className="text-purple-400 font-semibold">{formatPrice(item.price)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-300"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                      >
                        -
                      </button>
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-white font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-semibold">Tổng cộng:</span>
              <span className="text-2xl font-bold text-purple-400">{formatPrice(totalPrice)}</span>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300">
                Thanh toán
              </button>
              <button
                onClick={clearCart}
                className="w-full py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors duration-300"
              >
                Xóa tất cả
              </button>
            </div>

            {/* Payment methods */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-2">Phương thức thanh toán:</p>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-blue-600 text-white text-xs rounded">VNPay</div>
                <div className="px-3 py-1 bg-pink-600 text-white text-xs rounded">MoMo</div>
                <div className="px-3 py-1 bg-blue-500 text-white text-xs rounded">ZaloPay</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
