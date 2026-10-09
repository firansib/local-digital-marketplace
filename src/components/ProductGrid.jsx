import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-6xl mb-4" aria-hidden="true">🔍</p>
        <h2 className="text-lg font-bold text-gray-700 mb-2">No products found</h2>
        <p className="text-gray-400 text-sm">Try a different search term or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
