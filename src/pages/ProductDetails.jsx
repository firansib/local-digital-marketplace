import { useParams, Link, useNavigate } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { addItem, isInCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="animate-page max-w-6xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4" aria-hidden="true">😕</p>
        <h1 className="text-xl font-bold text-gray-800 mb-4">Product not found</h1>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const inCart  = isInCart(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="animate-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl min-h-64 md:min-h-80 flex items-center justify-center">
            <span className="text-9xl select-none" aria-hidden="true">{product.emoji}</span>
            {product.badge && (
              <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full self-start">
              {product.category}
            </span>

            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
              <span>By <span className="font-semibold text-gray-700">{product.creator}</span></span>
              <span aria-hidden="true">·</span>
              <span
                className="flex items-center gap-1"
                aria-label={`Rated ${product.rating} out of 5 — ${product.reviews} reviews`}
              >
                <span className="text-orange-400" aria-hidden="true">★</span>
                <span className="font-semibold text-gray-700">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

            {/* Product info box */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-sm text-gray-500 space-y-1">
              <p className="font-semibold text-gray-700 mb-2">📋 Product Information</p>
              <p>📁 Format: Digital download (PDF / PPTX / ZIP)</p>
              <p>🌐 Language: English / Amharic</p>
              <p>⚡ Delivery: Instant access after checkout</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">{product.price}</span>
              <span className="text-gray-400 text-sm">ETB</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                variant={inCart ? 'secondary' : 'primary'}
                disabled={inCart}
                onClick={() => addItem(product)}
                fullWidth
                aria-label={inCart ? 'Already in cart' : `Add ${product.name} to cart`}
              >
                {inCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </Button>
              {inCart && (
                <Link to="/cart" className="flex-1">
                  <Button size="lg" variant="outline" fullWidth>View Cart →</Button>
                </Link>
              )}
            </div>

            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors self-start flex items-center gap-1 cursor-pointer focus:outline-none focus:underline"
            >
              ← Back to Products
            </button>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold text-gray-900 mb-4">More in {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
