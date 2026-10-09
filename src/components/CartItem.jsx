import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { removeItem, increaseQty, decreaseQty } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      {/* Emoji icon */}
      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shrink-0">
        <span className="text-3xl" aria-hidden="true">{item.emoji}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <span className="text-xs text-blue-600 font-medium">{item.category}</span>
        <h3 className="text-sm font-bold text-gray-900 truncate">{item.name}</h3>
        <p className="text-xs text-gray-400">By {item.creator}</p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => decreaseQty(item.id)}
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          aria-label={`Decrease quantity of ${item.name}`}
        >
          −
        </button>
        <span className="text-sm font-semibold w-5 text-center" aria-label={`Quantity: ${item.qty}`}>
          {item.qty}
        </span>
        <button
          onClick={() => increaseQty(item.id)}
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>

      {/* Subtotal + remove */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-sm font-extrabold text-gray-900">
          {item.price * item.qty} <span className="text-xs font-normal text-gray-400">ETB</span>
        </span>
        <button
          onClick={() => removeItem(item.id)}
          className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors focus:outline-none focus:underline cursor-pointer"
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
