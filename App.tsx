import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  User as UserIcon, 
  Package,
  LogOut,
  Settings,
  ShieldCheck,
  Check,
  Truck,
  Clock
} from 'lucide-react';

import { Product, CartItem, Order, AppView, User } from './types';
import { AdminDashboard } from './components/AdminDashboard';
import { DesignLab } from './components/DesignLab';
import { Home } from './components/Home';
import { Shop } from './components/Shop';
import { ProductDetails } from './components/ProductDetails';
import { Checkout } from './components/Checkout';
import { LoginModal } from './components/LoginModal';

// Enhanced Mock Data with Multiple Images and EU Sizes
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Air Jordan',
    price: 180,
    originalPrice: 200,
    offer: '10% OFF',
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The one that started it all. Genuine leather and classic color blocking.',
    sizes: ['40', '41', '42', '43', '44', '45']
  },
  {
    id: '2',
    name: 'Yeezy Boost 350 V2',
    brand: 'Adidas',
    price: 230,
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1587563871167-1ee797455c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617614802874-9b57b6d1316b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Featuring a re-engineered Primeknit upper and Boost cushioning.',
    sizes: ['38', '39', '40', '41', '42']
  },
  {
    id: '3',
    name: 'Dunk Low Retro "Panda"',
    brand: 'Nike',
    price: 110,
    originalPrice: 140,
    offer: 'HOT',
    category: 'Basketball',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Created for the hardwood but taken to the streets.',
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: '4',
    name: 'New Balance 550',
    brand: 'New Balance',
    price: 120,
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1620794341491-76be6eeb6946?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1623609163859-ca93c959b98a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Simple and clean, not overbuilt. The 550 pays tribute to the 90s pro ballers.',
    sizes: ['41', '42', '43', '44', '45', '46']
  },
  {
    id: '5',
    name: 'Travis Scott x Air Jordan 1',
    brand: 'Air Jordan',
    price: 1200,
    originalPrice: 1500,
    offer: 'RARE',
    category: 'Custom',
    images: [
      'https://images.unsplash.com/photo-1612452830703-9e67fdc7561d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612452830680-6925501b8979?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The collaboration that defines a generation of sneaker culture.',
    sizes: ['40', '41', '42', '43']
  },
  {
    id: '6',
    name: 'Air Max 90',
    brand: 'Nike',
    price: 130,
    category: 'Running',
    images: [
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clean lines, versatile and timeless. The people’s shoe returns.',
    sizes: ['38', '39', '40', '41', '42']
  },
  {
    id: '7',
    name: 'Forum Low',
    brand: 'Adidas',
    price: 100,
    originalPrice: 110,
    offer: 'SALE',
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'More than just a shoe, it’s a statement. The 84 Forum is back.',
    sizes: ['40', '41', '42', '43']
  },
  {
    id: '8',
    name: 'Chuck 70 High Top',
    brand: 'Converse',
    price: 90,
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494496195158-c31b430e7913?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The Chuck 70 celebrates heritage by bringing together archival-inspired details.',
    sizes: ['38', '39', '40', '41', '42', '43']
  }
];

export default function App() {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Initialize cart from localStorage with migration logic for image arrays
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('kicksai_cart');
      if (!savedCart) return [];
      const parsedCart = JSON.parse(savedCart);
      // Migration: If items have old 'image' string but no 'images' array
      return parsedCart.map((item: any) => ({
        ...item,
        images: item.images || (item.image ? [item.image] : [])
      }));
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kicksai_cart', JSON.stringify(cart));
  }, [cart]);

  const [orders, setOrders] = useState<Order[]>([]);
  
  // Navigation State
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Search Suggestions State
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  // Auth Functions
  const handleLogin = (email: string, pass: string) => {
    if (email === 'admin@kicks.com' && pass === 'admin') {
      setCurrentUser({
        email,
        name: 'Admin User',
        role: 'admin'
      });
      setShowLogin(false);
    } else {
      // Simulate normal user login
      setCurrentUser({
        email,
        name: 'Guest User',
        role: 'customer'
      });
      setShowLogin(false);
    }
  };

  const handleSignUp = (email: string, pass: string, name: string) => {
    // Simulate account creation and auto-login
    setCurrentUser({
      email,
      name: name,
      role: 'customer'
    });
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView(AppView.HOME);
  };

  const handleUserIconClick = () => {
    if (currentUser) {
      setView(AppView.PROFILE);
    } else {
      setShowLogin(true);
    }
  };

  // Cart Functions
  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      // Check if product with same id AND size exists
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.selectedSize === size) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handlePlaceOrder = (details: any) => {
    // Destructure new fields phone, firstName, lastName
    const { paymentMethod, email, phone, firstName, lastName, ...addressDetails } = details;
    
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      status: 'pending',
      paymentMethod: paymentMethod,
      customerEmail: email,
      customerPhone: phone,
      customerName: `${firstName} ${lastName}`,
      shippingAddress: addressDetails // Contains address, city, zip
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setView(AppView.PROFILE);
  };

  // Navigation Helpers
  const goToProduct = (product: Product) => {
    setActiveProduct(product);
    setView(AppView.PRODUCT_DETAILS);
    window.scrollTo(0, 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    setView(AppView.SHOP);
    // Force re-render of shop with new query handled via prop
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setGlobalSearch(query);
    
    if (query.length > 0) {
      const productMatches = products
        .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        .map(p => p.name);
        
      const brandMatches = Array.from(new Set(products.map(p => p.brand)))
        .filter(b => b.toLowerCase().includes(query.toLowerCase()));
      
      // Prioritize brands, then products, max 6 suggestions
      const suggestions = Array.from(new Set([...brandMatches, ...productMatches])).slice(0, 6);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (term: string) => {
    setGlobalSearch(term);
    setShowSuggestions(false);
    setView(AppView.SHOP);
  };
  
  const handleShopByBrand = (brand: string) => {
    setGlobalSearch(brand);
    setView(AppView.SHOP);
    window.scrollTo(0, 0);
  };

  // Admin Functions
  const handleAddProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (id: string, newStatus: 'confirmed' | 'shipped') => {
    const order = orders.find(o => o.id === id);
    if (order) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      // Simulate Email Notification
      alert(`📧 EMAIL SIMULATION\nTo: ${order.customerEmail}\nSubject: Order Status Update\n\nHi ${order.customerName},\nYour order #${order.id.slice(-6)} is now ${newStatus.toUpperCase()}.\n\nThank you for shopping with KicksAI!`);
    }
  };

  const renderContent = () => {
    switch(view) {
      case AppView.ADMIN_DASHBOARD:
        return isAdmin ? (
          <AdminDashboard 
            products={products}
            orders={orders}
            onAddProduct={handleAddProduct}
            onRemoveProduct={handleRemoveProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <ShieldCheck className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-black uppercase mb-2">Access Denied</h2>
            <p className="text-gray-500 mb-6">You do not have permission to view this page.</p>
            <button onClick={() => setView(AppView.HOME)} className="text-red-600 font-bold underline">Return Home</button>
          </div>
        );
      case AppView.DESIGN_LAB:
        return <DesignLab />;
      case AppView.SHOP:
        return (
          <Shop 
            products={products} 
            onProductClick={goToProduct} 
            onAddToCart={addToCart}
            initialSearchQuery={globalSearch}
          />
        );
      case AppView.PRODUCT_DETAILS:
        return activeProduct ? (
          <ProductDetails 
            product={activeProduct} 
            products={products}
            onBack={() => setView(AppView.SHOP)}
            onAddToCart={addToCart}
            onProductClick={goToProduct}
          />
        ) : <Shop products={products} onProductClick={goToProduct} onAddToCart={addToCart}/>;
      case AppView.CHECKOUT:
        return (
          <Checkout 
            cart={cart}
            total={cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
            onPlaceOrder={handlePlaceOrder}
            onBack={() => setView(AppView.CART)}
          />
        );
      case AppView.PROFILE:
        return (
          <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
            <div className="flex items-center justify-between mb-10 border-b border-black pb-6">
              <div>
                <h1 className="text-3xl font-black uppercase mb-1">My Account</h1>
                <p className="text-gray-500">Welcome back, {currentUser?.name}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" /> Log Out
              </button>
            </div>

            {isAdmin && (
               <div className="bg-gray-50 border border-gray-200 p-6 mb-12 flex items-center justify-between">
                 <div className="flex items-center">
                   <div className="bg-black text-white p-3 mr-4">
                     <Settings className="h-6 w-6" />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg uppercase">Admin Access</h3>
                     <p className="text-sm text-gray-500">Manage products, inventory, and orders.</p>
                   </div>
                 </div>
                 <button 
                   onClick={() => setView(AppView.ADMIN_DASHBOARD)}
                   className="bg-white border border-black px-6 py-3 font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors"
                 >
                   Open Dashboard
                 </button>
               </div>
            )}

            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-200">Order History</h2>
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200">
                <Package className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No orders found.</p>
                <button onClick={() => setView(AppView.SHOP)} className="mt-4 text-red-600 text-sm font-bold underline">Start Shopping</button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => {
                  const steps = ['pending', 'confirmed', 'shipped'];
                  const currentStepIndex = steps.indexOf(order.status);
                  
                  return (
                    <div key={order.id} className="border border-gray-200 p-6 bg-white hover:border-gray-400 transition-colors">
                      <div className="flex flex-col md:flex-row justify-between mb-6 pb-4 border-b border-gray-50">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center gap-3">
                             <span className="font-mono font-bold text-lg">#{order.id.slice(-6)}</span>
                             <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                               {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                             </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold font-mono">${order.total.toFixed(2)}</p>
                          <p className="text-xs text-gray-400 mt-1">{order.items.length} Items</p>
                        </div>
                      </div>

                      {/* Status Tracking */}
                      <div className="mb-6 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                        <div className="relative z-10 flex justify-between">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStepIndex >= 0 ? 'bg-black border-black text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                              <Clock className="h-4 w-4" />
                            </div>
                            <span className={`text-[10px] font-bold uppercase mt-2 ${currentStepIndex >= 0 ? 'text-black' : 'text-gray-300'}`}>Pending</span>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStepIndex >= 1 ? 'bg-black border-black text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                              <Check className="h-4 w-4" />
                            </div>
                            <span className={`text-[10px] font-bold uppercase mt-2 ${currentStepIndex >= 1 ? 'text-black' : 'text-gray-300'}`}>Confirmed</span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStepIndex >= 2 ? 'bg-black border-black text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                              <Truck className="h-4 w-4" />
                            </div>
                            <span className={`text-[10px] font-bold uppercase mt-2 ${currentStepIndex >= 2 ? 'text-black' : 'text-gray-300'}`}>Shipped</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <img src={item.images[0]} className="w-12 h-12 object-contain mr-4 border border-gray-100 p-1" />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                 <span className="font-bold">{item.name}</span>
                                 <span className="font-mono">${item.price}</span>
                              </div>
                              <div className="flex text-xs text-gray-500 mt-1">
                                <span className="mr-4">Size: {item.selectedSize} (EU)</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      case AppView.HOME:
      default:
        return (
          <Home 
            products={products}
            onNavigate={setView}
            onProductClick={goToProduct}
            onAddToCart={addToCart}
            onShopByBrand={handleShopByBrand}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onLogin={handleLogin} 
        onSignUp={handleSignUp}
      />

      {/* Top Notification Bar */}
      <div className="bg-red-600 text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
        Authenticity Guaranteed • Worldwide Shipping
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Left: Mobile Menu & Search */}
            <div className="flex items-center gap-4 w-1/3">
              <button className="md:hidden text-black">
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Enhanced Search Bar */}
              <div className="hidden md:block relative z-50 group">
                <form onSubmit={handleSearch} className="flex items-center">
                  <button type="submit" className="text-gray-400 group-focus-within:text-red-600 transition-colors">
                    <Search className="h-5 w-5" />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="ml-2 outline-none text-sm placeholder-gray-400 text-black w-24 focus:w-64 transition-all duration-300"
                    value={globalSearch}
                    onChange={handleSearchChange}
                    onFocus={() => { if(globalSearch.length > 0) setShowSuggestions(true); }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                </form>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 mt-3 w-64 bg-white shadow-xl border border-gray-100 rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-1">
                    <div className="py-2">
                       {searchSuggestions.map((term, i) => (
                         <button 
                           key={i}
                           onClick={() => handleSuggestionClick(term)}
                           className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between text-gray-600 hover:text-black transition-colors"
                         >
                           <span className="line-clamp-1 font-medium">{term}</span>
                           <Search className="h-3 w-3 text-gray-300" />
                         </button>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center: Logo */}
            <div className="w-1/3 flex justify-center cursor-pointer group" onClick={() => setView(AppView.HOME)}>
              <span className="font-black text-3xl tracking-tighter italic group-hover:text-red-600 transition-colors">KICKS<span className="text-gray-400">AI</span></span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-6 w-1/3">
              <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-wide">
                 <button onClick={() => setView(AppView.SHOP)} className={`hover:text-red-600 transition-colors ${view === AppView.SHOP ? 'text-red-600 underline' : 'text-gray-500'}`}>Shop</button>
                 <button onClick={() => setView(AppView.DESIGN_LAB)} className={`hover:text-red-600 transition-colors ${view === AppView.DESIGN_LAB ? 'text-red-600 underline' : 'text-gray-500'}`}>Lab</button>
                 {isAdmin && <button onClick={() => setView(AppView.ADMIN_DASHBOARD)} className="text-gray-500 hover:text-red-600">Admin</button>}
              </div>
              
              <button onClick={handleUserIconClick} className={`transition-colors ${currentUser ? 'text-black hover:text-red-600' : 'text-gray-400 hover:text-black'}`}>
                <UserIcon className="h-6 w-6" />
              </button>

              <button 
                onClick={() => setCartOpen(true)}
                className="relative text-black hover:text-red-600 transition-colors"
              >
                <ShoppingBag className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-160px)]">
        {renderContent()}
      </main>

      {/* Footer */}
      {view !== AppView.ADMIN_DASHBOARD && (
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-2xl font-black tracking-tighter text-black hover:text-red-600 transition-colors cursor-pointer">KICKSAI</div>
              <div className="flex gap-8 text-sm font-medium text-gray-500">
                <a href="#" className="hover:text-red-600 transition-colors">About</a>
                <a href="#" className="hover:text-red-600 transition-colors">Support</a>
                <a href="#" className="hover:text-red-600 transition-colors">Terms</a>
                <a href="#" className="hover:text-red-600 transition-colors">Privacy</a>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 KicksAI Inc.
              </div>
          </div>
        </footer>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
            <div className="w-full bg-white shadow-2xl flex flex-col h-full transform transition-transform animate-slide-in">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-black uppercase tracking-wide">Your Cart</h2>
                <button onClick={() => setCartOpen(false)} className="text-black hover:rotate-90 hover:text-red-600 transition-all">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-400 text-lg">Your cart is empty.</p>
                    <button 
                      onClick={() => { setCartOpen(false); setView(AppView.SHOP); }} 
                      className="mt-4 text-red-600 font-bold underline hover:text-red-800"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-8">
                    {cart.map((item) => (
                      <li key={`${item.id}-${item.selectedSize}`} className="flex py-2">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-50 p-2 border border-gray-100">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="h-full w-full object-contain mix-blend-multiply"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-bold text-black">
                              <h3 className="line-clamp-1">{item.name}</h3>
                              <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 uppercase">{item.brand} • Size {item.selectedSize} (EU)</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm mt-2">
                            <div className="flex items-center border border-gray-300">
                              <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600">-</button>
                              <span className="px-2 font-medium">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600">+</button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id, item.selectedSize)}
                              className="font-medium text-gray-400 hover:text-red-600 underline text-xs transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex justify-between text-base font-bold text-black mb-4">
                  <p>Subtotal</p>
                  <p>${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-xs text-gray-500 mb-6">
                  Tax included. Shipping calculated at checkout.
                </p>
                <button
                  onClick={() => { setCartOpen(false); setView(AppView.CHECKOUT); }}
                  disabled={cart.length === 0}
                  className="w-full flex items-center justify-center bg-red-600 px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed uppercase tracking-wide transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}