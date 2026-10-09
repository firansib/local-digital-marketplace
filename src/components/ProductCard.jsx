import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';

export default function ProductCard({ product }) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);

  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden group">
      {/* Visual area */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 h-36 flex items-center justify-center">
        <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
          {product.emoji}
        </span>
        {product.badge && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full self-start">
          {product.category}
        </span>

        <h2 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h2>

        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{product.shortDesc}</p>

        <p className="text-xs text-gray-400">By {product.creator}</p>

        {/* Rating */}
        <div className="flex items-center gap-1" aria-label={`Rating: ${product.rating} out of 5`}>
          <span className="text-orange-400 text-xs" aria-hidden="true">★★★★★</span>
          <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price + actions */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between gap-2">
          <span className="text-base font-extrabold text-gray-900">
            {product.price} <span className="text-xs font-normal text-gray-400">ETB</span>
          </span>
          <div className="flex gap-2 items-center">
            <Link
              to={`/products/${product.id}`}
              className="text-xs text-blue-600 font-medium hover:underline focus:outline-none focus:underline"
              aria-label={`View details for ${product.name}`}
            >
              Details
            </Link>
            <Button
              size="sm"
              variant={inCart ? 'secondary' : 'primary'}
              onClick={() => addItem(product)}
              disabled={inCart}
              aria-label={inCart ? `${product.name} is already in cart` : `Add ${product.name} to cart`}
            >
              {inCart ? '✓ Added' : '+ Cart'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
