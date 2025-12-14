import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, ShoppingBag, Film } from 'lucide-react';
import { Product, AppView } from '../types';

interface HomeProps {
  products: Product[];
  onNavigate: (view: AppView) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onShopByBrand: (brand: string) => void;
}

export const Home: React.FC<HomeProps> = ({ products, onNavigate, onProductClick, onAddToCart, onShopByBrand }) => {
  // Display only top 8 products
  const featuredProducts = products.slice(0, 8);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="bg-white fade-in">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full bg-gray-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt="Sneaker Wall" 
          className="w-full h-full object-cover filter brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4 animate-in slide-in-from-bottom-4 duration-700">
            GRAILS & CLASSICS
          </h1>
          <p className="text-gray-200 text-lg md:text-xl font-medium mb-8 max-w-2xl animate-in slide-in-from-bottom-4 duration-700 delay-150">
            The world's premier marketplace for authentic sneakers.
          </p>
          <div className="flex gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-300">
            <button 
              onClick={() => onNavigate(AppView.SHOP)}
              className="bg-red-600 text-white px-8 py-3 font-bold uppercase tracking-wide hover:bg-red-700 transition-colors shadow-lg rounded-full"
            >
              Shop New Arrivals
            </button>
            <button 
              onClick={() => onNavigate(AppView.DESIGN_LAB)}
              className="bg-transparent border-2 border-white text-white px-8 py-3 font-bold uppercase tracking-wide hover:bg-white hover:text-red-600 transition-colors rounded-full"
            >
              AI Custom Lab
            </button>
          </div>
        </div>
      </div>

      {/* Shop By Brand Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter mb-2">SHOP BY BRAND</h2>
            <p className="text-gray-500 font-medium">Choose your favorite brand</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 md:gap-8">
            {/* Nike */}
            <div 
              onClick={() => onShopByBrand('Nike')} 
              className="group relative h-[250px] md:h-[450px] overflow-hidden cursor-pointer bg-red-600 rounded-xl md:rounded-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Nike" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-3 md:bottom-8 md:left-8 text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-80 border-l-2 border-red-600 pl-2">Just Do It</p>
                <h3 className="text-lg md:text-4xl font-black uppercase italic tracking-tighter">NIKE</h3>
              </div>
            </div>

            {/* Adidas */}
            <div 
              onClick={() => onShopByBrand('Adidas')} 
              className="group relative h-[250px] md:h-[450px] overflow-hidden cursor-pointer bg-black rounded-xl md:rounded-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1518002171953-a080ee802e11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Adidas" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-3 md:bottom-8 md:left-8 text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-80 border-l-2 border-white pl-2">Impossible Is Nothing</p>
                <h3 className="text-lg md:text-4xl font-black uppercase italic tracking-tighter">ADIDAS</h3>
              </div>
            </div>

            {/* New Balance */}
            <div 
              onClick={() => onShopByBrand('New Balance')} 
              className="group relative h-[250px] md:h-[450px] overflow-hidden cursor-pointer bg-yellow-900 rounded-xl md:rounded-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1620794341491-76be6eeb6946?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="New Balance" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-overlay opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-3 md:bottom-8 md:left-8 text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-80 border-l-2 border-yellow-500 pl-2">Fearlessly Independent</p>
                <h3 className="text-lg md:text-4xl font-black uppercase italic tracking-tighter leading-none">NEW<br className="md:block" />BALANCE</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-black uppercase tracking-tight">Just Dropped</h2>
          <button 
            onClick={() => onNavigate(AppView.SHOP)}
            className="text-sm font-bold text-gray-500 hover:text-red-600 flex items-center transition-colors uppercase tracking-wide"
          >
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="group cursor-pointer reveal"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onProductClick(product)}
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-[#f6f6f6] rounded-3xl mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                 {/* Badge */}
                 {product.offer && (
                  <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide z-10 shadow-sm">
                    {product.offer}
                  </span>
                )}
                
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply p-6 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
                />

                {/* Floating Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onProductClick(product);
                  }}
                  className="absolute bottom-4 right-4 bg-white text-black border border-gray-100 w-10 h-10 flex items-center justify-center rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white shadow-lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                </button>
              </div>

              {/* Info - Clean & Left Aligned */}
              <div className="px-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold uppercase tracking-tight text-black group-hover:text-red-600 transition-colors line-clamp-1 pr-4">{product.name}</h3>
                    <p className="text-sm font-bold text-black whitespace-nowrap">${product.price}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 font-medium">{product.category}</p>
                     {product.originalPrice && (
                         <p className="text-xs text-gray-400 line-through">${product.originalPrice}</p>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Film-Themed Section */}
      <section className="bg-neutral-950 py-24 overflow-hidden relative">
        {/* Marquee Background */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full opacity-[0.03] pointer-events-none select-none">
           <div className="whitespace-nowrap animate-marquee">
              <span className="text-[20vw] font-black uppercase text-white leading-none">Cinema • Kicks • Action • </span>
              <span className="text-[20vw] font-black uppercase text-white leading-none">Cinema • Kicks • Action • </span>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Film className="h-3 w-3" /> Now Showing
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">The Director's Cut</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              A limited series collection inspired by the golden age of cinema. Featuring widescreen silhouettes and technicolor palettes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Noir Edition",
                subtitle: "Shadows & Fog",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                tag: "Drama"
              },
              {
                title: "Sci-Fi Runner",
                subtitle: "Future Perfect",
                image: "https://images.unsplash.com/photo-1605460375648-278bcbd579a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                tag: "Sci-Fi"
              },
              {
                title: "Action Hero",
                subtitle: "Maximum Impact",
                image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                tag: "Action"
              }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden bg-black border border-gray-800 cursor-pointer">
                 <img 
                   src={item.image} 
                   alt={item.title}
                   className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                 
                 <div className="absolute top-4 right-4">
                   <span className="border border-white/30 text-white/70 px-2 py-1 text-[10px] uppercase tracking-widest font-mono backdrop-blur-sm">
                     {item.tag}
                   </span>
                 </div>

                 <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <p className="text-red-500 text-xs font-mono uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{item.subtitle}</p>
                   <h3 className="text-2xl font-black text-white uppercase italic">{item.title}</h3>
                 </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
             <button 
               onClick={() => onNavigate(AppView.SHOP)}
               className="border border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
             >
               View Full Collection
             </button>
          </div>
        </div>
      </section>

      {/* Design Lab Promo */}
      <div className="bg-black text-white py-24 my-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
               <span className="text-red-600 font-bold uppercase tracking-wider text-sm mb-4 block">Powered by Gemini Nano</span>
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">DESIGN THE<br/>IMPOSSIBLE.</h2>
               <p className="text-gray-400 text-lg mb-8 max-w-md font-light">
                 Step into our virtual studio. Upload any silhouette and let our AI engine reimagine it with your custom prompts.
               </p>
               <button 
                 onClick={() => onNavigate(AppView.DESIGN_LAB)}
                 className="bg-red-600 text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-red-700 transition-colors inline-flex items-center rounded-full"
               >
                 Enter Design Lab <ChevronRight className="ml-2 h-5 w-5" />
               </button>
             </div>
             <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-transparent opacity-30 blur-3xl rounded-full"></div>
               <img 
                 src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                 alt="Custom Shoe" 
                 className="relative z-10 w-full transform -rotate-12 grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
               />
             </div>
           </div>
         </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div className="p-6 bg-gray-50 rounded-2xl">
             <h3 className="font-bold text-lg mb-2 uppercase">100% Authentic</h3>
             <p className="text-sm text-gray-500">Every item is manually verified by our expert team.</p>
           </div>
           <div className="p-6 bg-gray-50 rounded-2xl">
             <h3 className="font-bold text-lg mb-2 uppercase">Fast Shipping</h3>
             <p className="text-sm text-gray-500">We ship to over 200 countries and regions worldwide.</p>
           </div>
           <div className="p-6 bg-gray-50 rounded-2xl">
             <h3 className="font-bold text-lg mb-2 uppercase">Secure Checkout</h3>
             <p className="text-sm text-gray-500">Your information is protected by industry-leading security.</p>
           </div>
         </div>
      </div>
    </div>
  );
};