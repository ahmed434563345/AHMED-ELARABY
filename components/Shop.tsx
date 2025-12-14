import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Filter, ChevronDown, ShoppingBag } from 'lucide-react';

interface ShopProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  initialSearchQuery?: string;
}

export const Shop: React.FC<ShopProps> = ({ products, onProductClick, onAddToCart, initialSearchQuery = '' }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<{min: string, max: string}>({min: '', max: ''});
  const [sortOption, setSortOption] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [showFilters, setShowFilters] = useState(false);

  const brands: string[] = Array.from(new Set(products.map(p => p.brand)));
  const categories = ['All', 'Lifestyle', 'Basketball', 'Running', 'Custom'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      const minPrice = priceRange.min === '' ? 0 : Number(priceRange.min);
      const maxPrice = priceRange.max === '' ? Infinity : Number(priceRange.max);
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      return 0; // Default original order (newest/id)
    });
  }, [products, searchQuery, selectedBrands, selectedCategory, sortOption, priceRange]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedCategory('All');
    setPriceRange({min: '', max: ''});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Mobile Filter Toggle */}
        <button 
          className="lg:hidden flex items-center justify-between border border-black p-4 font-bold uppercase rounded-lg"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filters</span>
          <Filter className="h-4 w-4" />
        </button>

        {/* Sidebar Filters */}
        <div className={`lg:w-1/4 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          
          {/* Search */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Search</h3>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-sm outline-none focus:border-black focus:ring-0 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Price Range</h3>
            <div className="flex items-center space-x-2">
              <div className="relative w-full">
                <span className="absolute left-3 top-2.5 text-gray-400 text-xs font-bold">$</span>
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2 pl-6 text-sm outline-none focus:border-black transition-colors"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({...prev, min: e.target.value}))}
                  min="0"
                />
              </div>
              <span className="text-gray-300">-</span>
              <div className="relative w-full">
                <span className="absolute left-3 top-2.5 text-gray-400 text-xs font-bold">$</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2 pl-6 text-sm outline-none focus:border-black transition-colors"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({...prev, max: e.target.value}))}
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Category</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm hover:text-red-600 transition-colors ${selectedCategory === cat ? 'font-bold text-red-600' : 'text-gray-500'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Brands</h3>
            <ul className="space-y-2">
              {brands.map(brand => (
                <li key={brand} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="mr-2 h-4 w-4 border-gray-300 rounded text-red-600 focus:ring-red-600"
                  />
                  <label htmlFor={`brand-${brand}`} className={`text-sm cursor-pointer select-none hover:text-red-600 transition-colors ${selectedBrands.includes(brand) ? 'text-black font-medium' : 'text-gray-600'}`}>
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500 font-medium">{filteredProducts.length} Results</span>
            <div className="relative">
              <select 
                className="appearance-none bg-transparent border-none text-sm font-bold uppercase tracking-wide pr-8 focus:ring-0 cursor-pointer text-gray-500 hover:text-black transition-colors"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as 'newest' | 'price-asc' | 'price-desc')}
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl">
              <p className="text-gray-400">No products found.</p>
              <button onClick={handleClearFilters} className="mt-4 text-red-600 underline text-sm font-bold hover:text-red-800">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group cursor-pointer"
                  onClick={() => onProductClick(product)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-[#f6f6f6] rounded-2xl mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    {product.offer && (
                      <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide z-10 shadow-sm">
                        {product.offer}
                      </span>
                    )}
                    
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3 mix-blend-multiply p-6"
                    />
                    
                    {/* Floating Add Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // For Quick Add, we'll go to product page to be safe with sizes
                        onProductClick(product);
                      }}
                      className="absolute bottom-4 right-4 bg-white text-black border border-gray-100 w-10 h-10 flex items-center justify-center rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white shadow-lg"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Info */}
                  <div className="px-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{product.brand}</p>
                        <h3 className="text-sm font-bold leading-tight text-black line-clamp-1 group-hover:text-red-600 transition-colors">{product.name}</h3>
                      </div>
                      <span className="text-sm font-bold text-black">${product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};