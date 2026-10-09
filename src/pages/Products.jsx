import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import products from '../data/products';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  // Derive category directly from URL — no useEffect needed
  const category = searchParams.get('category') || 'All';

  const handleCategoryChange = (cat) => {
    if (cat === 'All') setSearchParams({});
    else setSearchParams({ category: cat });
  };

  const filtered = products.filter((p) => {
    const matchCat   = category === 'All' || p.category === category;
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="animate-page">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Digital Products</h1>
          <p className="text-blue-100 text-sm">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="sm:w-72">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <div className="flex-1">
            <CategoryFilter selected={category} onChange={handleCategoryChange} />
          </div>
        </div>

        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
