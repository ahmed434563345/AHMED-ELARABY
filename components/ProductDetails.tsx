import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { ChevronLeft, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  products: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onProductClick: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, products, onBack, onAddToCart, onProductClick }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>(product.images[0]);

  // Reset state when product changes (i.e. clicking related product)
  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedSize(null);
    window.scrollTo(0, 0);
  }, [product]);

  // Filter related products (same category, excluding current)
  const relatedProducts = useMemo(() => {
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-red-600 mb-8 font-medium transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Shop
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-12 flex items-center justify-center border border-gray-100 rounded-lg">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-auto object-contain max-h-[500px] mix-blend-multiply hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 h-24 w-24 border-2 rounded-lg p-2 bg-white ${activeImage === img ? 'border-red-600' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{product.brand}</h2>
            <h1 className="text-3xl md:text-4xl font-black text-black mb-4 uppercase tracking-tighter leading-none">{product.name}</h1>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold font-mono">${product.price.toFixed(2)}</span>
              <div className="flex items-center text-red-600">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current text-gray-200" />
                <span className="ml-2 text-xs text-gray-500 font-bold tracking-wide text-black">(42 REVIEWS)</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wide mb-4">Select Size (EU)</h3>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-bold border rounded transition-all ${
                    selectedSize === size 
                      ? 'border-red-600 bg-red-600 text-white shadow-md' 
                      : 'border-gray-200 text-black hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-red-600 text-xs mt-2 font-medium">* Please select a size</p>}
          </div>

          <div className="mb-8">
             <button
               onClick={() => selectedSize && onAddToCart(product, selectedSize)}
               disabled={!selectedSize}
               className={`w-full py-5 text-sm font-bold uppercase tracking-widest transition-all rounded ${
                 selectedSize 
                   ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg' 
                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'
               }`}
             >
               {selectedSize ? `Add to Cart - $${product.price}` : 'Select a Size'}
             </button>
          </div>

          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
            <p>
              Designed for performance and style, this silhouette features premium materials and advanced cushioning technology.
              Authenticity guaranteed on every pair.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
            <div className="flex flex-col items-center text-center group">
              <ShieldCheck className="h-6 w-6 mb-2 text-gray-400 group-hover:text-red-600 transition-colors" />
              <span className="text-[10px] font-bold uppercase group-hover:text-red-600 transition-colors">Verified Authentic</span>
            </div>
            <div className="flex flex-col items-center text-center group">
              <Truck className="h-6 w-6 mb-2 text-gray-400 group-hover:text-red-600 transition-colors" />
              <span className="text-[10px] font-bold uppercase group-hover:text-red-600 transition-colors">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center group">
              <RefreshCw className="h-6 w-6 mb-2 text-gray-400 group-hover:text-red-600 transition-colors" />
              <span className="text-[10px] font-bold uppercase group-hover:text-red-600 transition-colors">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-16">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">You Might Also Like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(rp => (
              <div 
                key={rp.id} 
                className="group cursor-pointer"
                onClick={() => onProductClick(rp)}
              >
                <div className="relative aspect-square bg-[#f6f6f6] rounded-2xl mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <img 
                    src={rp.images[0]} 
                    alt={rp.name}
                    className="w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{rp.brand}</p>
                   <h4 className="text-sm font-bold text-black line-clamp-1 group-hover:text-red-600 transition-colors">{rp.name}</h4>
                   <p className="text-sm font-bold text-black mt-1">${rp.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};