import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

export default function Cart() {
  const { items, total, clearCart } = useCart();

  return (
    <div className="animate-page">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-extrabold">Shopping Cart</h1>
          <p className="text-blue-100 text-sm mt-1">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24">
            <p className="text-7xl mb-4" aria-hidden="true">🛒</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-8">
              You haven&apos;t added any products yet.
            </p>
            <Link to="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items list */}
            <section className="lg:col-span-2 flex flex-col gap-4" aria-label="Cart items">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <div className="flex items-center justify-between pt-2">
                <Link to="/products" className="text-sm text-blue-600 font-medium hover:underline">
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer focus:outline-none focus:underline"
                  aria-label="Remove all items from cart"
                >
                  Clear Cart
                </button>
              </div>
            </section>

            {/* Order summary */}
            <aside
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-fit sticky top-20"
              aria-label="Order summary"
            >
              <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>

              <ul className="space-y-2 mb-4">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate pr-3">
                      {item.name}
                      {item.qty > 1 && <span className="text-gray-400"> ×{item.qty}</span>}
                    </span>
                    <span className="font-semibold text-gray-800 shrink-0">
                      {item.price * item.qty} ETB
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between text-base font-extrabold text-gray-900">
                <span>Total</span>
                <span>{total} ETB</span>
              </div>

              <Link to="/checkout">
                <Button size="lg" fullWidth>Proceed to Checkout →</Button>
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
