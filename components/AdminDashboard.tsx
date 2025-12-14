import React, { useState, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { Trash2, CheckCircle, Package, TrendingUp, DollarSign, Plus, Upload, X, Search, Image as ImageIcon, Truck } from 'lucide-react';
import { Product, Order } from '../types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: 'confirmed' | 'shipped') => void;
}

// Updated to EU Sizes
const STANDARD_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47'];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  onAddProduct,
  onRemoveProduct,
  onUpdateOrderStatus
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', 
    brand: 'Nike', 
    price: 0, 
    originalPrice: 0,
    category: 'Lifestyle', 
    images: [], 
    description: '',
    sizes: [],
    offer: ''
  });
  const [imageUrlInput, setImageUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived Analytics Data
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Mock Analytics Data for Charts
  const viewsData = [
    { name: 'Mon', views: 400, cartAdds: 24 },
    { name: 'Tue', views: 300, cartAdds: 13 },
    { name: 'Wed', views: 500, cartAdds: 98 },
    { name: 'Thu', views: 280, cartAdds: 39 },
    { name: 'Fri', views: 590, cartAdds: 48 },
    { name: 'Sat', views: 800, cartAdds: 100 },
    { name: 'Sun', views: 700, cartAdds: 80 },
  ];

  const salesData = [
    { name: 'Nike', sales: 4000 },
    { name: 'Adidas', sales: 3000 },
    { name: 'NB', sales: 2000 },
    { name: 'Jordan', sales: 5780 },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ 
          ...prev, 
          images: [...(prev.images || []), reader.result as string] 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput) {
      setNewProduct(prev => ({
        ...prev,
        images: [...(prev.images || []), imageUrlInput]
      }));
      setImageUrlInput('');
    }
  };

  const removeImage = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const toggleSize = (size: string) => {
    const currentSizes = newProduct.sizes || [];
    if (currentSizes.includes(size)) {
      setNewProduct({ ...newProduct, sizes: currentSizes.filter(s => s !== size) });
    } else {
      setNewProduct({ ...newProduct, sizes: [...currentSizes, size].sort((a, b) => Number(a) - Number(b)) });
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      onAddProduct({
        id: Date.now().toString(),
        name: newProduct.name,
        brand: newProduct.brand || 'Nike',
        price: Number(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
        category: (newProduct.category as any) || 'Lifestyle',
        images: newProduct.images && newProduct.images.length > 0 
          ? newProduct.images 
          : ['https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
        description: newProduct.description || 'New arrival',
        sizes: newProduct.sizes && newProduct.sizes.length > 0 ? newProduct.sizes : ['40', '41', '42'],
        offer: newProduct.offer
      });
      setNewProduct({ 
        name: '', 
        brand: 'Nike', 
        price: 0, 
        originalPrice: 0,
        category: 'Lifestyle', 
        images: [], 
        description: '',
        sizes: [],
        offer: ''
      });
      alert("Product added successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-black uppercase tracking-tight">Admin Dashboard</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === 'overview' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === 'products' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === 'orders' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Orders ({pendingOrders})
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center">
                <div className="p-3 bg-red-600 text-white rounded-full mr-4"><DollarSign className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Revenue</p>
                  <p className="text-2xl font-bold font-mono">${totalRevenue.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center">
                <div className="p-3 bg-black text-white rounded-full mr-4"><Package className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Orders</p>
                  <p className="text-2xl font-bold font-mono">{totalOrders}</p>
                </div>
              </div>
              <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center">
                <div className="p-3 bg-black text-white rounded-full mr-4"><TrendingUp className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Site Traffic</p>
                  <p className="text-2xl font-bold font-mono">3,452</p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold uppercase mb-6">Traffic & Conversions</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{fontSize: 12}} />
                      <YAxis tick={{fontSize: 12}} />
                      <RechartsTooltip contentStyle={{backgroundColor: '#000', color: '#fff', border: 'none'}} itemStyle={{color: '#fff'}} />
                      <Legend />
                      <Line type="monotone" dataKey="views" stroke="#000" strokeWidth={2} dot={false} name="Views" />
                      <Line type="monotone" dataKey="cartAdds" stroke="#dc2626" strokeWidth={2} dot={false} name="Adds" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold uppercase mb-6">Revenue by Brand</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{fontSize: 12}} />
                      <YAxis tick={{fontSize: 12}} />
                      <RechartsTooltip cursor={{fill: '#f5f5f5'}} contentStyle={{backgroundColor: '#000', color: '#fff', border: 'none'}} />
                      <Legend />
                      <Bar dataKey="sales" fill="#000" name="Sales ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-1 bg-white p-6 border border-gray-200 shadow-sm h-fit">
              <h3 className="text-sm font-bold uppercase mb-6 flex items-center"><Plus className="mr-2 h-4 w-4" /> Add Product</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                
                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Product Images</label>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {newProduct.images?.map((img, idx) => (
                      <div key={idx} className="relative h-16 w-16 border border-gray-200 rounded overflow-hidden group">
                        <img src={img} alt="preview" className="h-full w-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => removeImage(idx)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="h-16 w-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-red-600 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>

                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                  
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Or paste image URL..."
                      className="block w-full border border-gray-300 p-2 text-xs focus:border-red-600 outline-none transition-colors"
                      value={imageUrlInput} 
                      onChange={e => setImageUrlInput(e.target.value)} 
                    />
                    <button 
                      type="button" 
                      onClick={handleAddImageUrl}
                      className="bg-black text-white px-3 text-xs font-bold uppercase hover:bg-gray-800"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                  <input required type="text" className="block w-full border border-gray-300 p-2 text-sm focus:border-red-600 outline-none transition-colors" 
                    value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Brand</label>
                    <select className="block w-full border border-gray-300 p-2 text-sm focus:border-red-600 outline-none transition-colors"
                      value={newProduct.brand} onChange={e => setNewProduct({...newProduct, brand: e.target.value})}>
                        <option>Nike</option>
                        <option>Air Jordan</option>
                        <option>Adidas</option>
                        <option>Yeezy</option>
                        <option>New Balance</option>
                        <option>Converse</option>
                        <option>Puma</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price ($)</label>
                    <input required type="number" className="block w-full border border-gray-300 p-2 text-sm focus:border-red-600 outline-none transition-colors"
                      value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Original Price ($) <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input type="number" className="block w-full border border-gray-300 p-2 text-sm focus:border-red-600 outline-none transition-colors"
                    value={newProduct.originalPrice || ''} onChange={e => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                  <select className="block w-full border border-gray-300 p-2 text-sm focus:border-red-600 outline-none transition-colors"
                    value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}>
                      <option>Lifestyle</option>
                      <option>Running</option>
                      <option>Basketball</option>
                      <option>Custom</option>
                  </select>
                </div>

                {/* Offer Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Offer / Promotion (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 20% OFF, LIMITED EDITION"
                    className="block w-full border border-gray-300 p-2 text-sm focus:border-red-600 outline-none transition-colors"
                    value={newProduct.offer || ''} 
                    onChange={e => setNewProduct({...newProduct, offer: e.target.value})} 
                  />
                </div>

                {/* Sizes Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Available Sizes (EU)</label>
                  <div className="grid grid-cols-6 gap-2">
                    {STANDARD_SIZES.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`py-1 text-xs font-bold border transition-all ${
                          newProduct.sizes?.includes(size)
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {newProduct.sizes && newProduct.sizes.length > 0 && (
                     <p className="text-xs text-gray-400 mt-1">{newProduct.sizes.length} sizes selected</p>
                  )}
                </div>

                <button type="submit" className="w-full bg-black text-white py-3 px-4 text-sm font-bold uppercase hover:bg-gray-800 transition-colors">
                  Add Item
                </button>
              </form>
            </div>

            {/* Product List */}
            <div className="lg:col-span-2 bg-white p-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-sm font-bold uppercase">Inventory List</h3>
                <div className="relative w-full sm:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                   <input 
                     type="text" 
                     placeholder="Search name or brand..." 
                     className="w-full pl-9 pr-4 py-2 border border-gray-200 bg-gray-50 text-xs font-medium focus:border-red-600 outline-none transition-colors"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
              </div>

              <div className="overflow-auto max-h-[800px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Brand</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sizes</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-xs font-bold uppercase">No products found matching your search.</td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 border border-gray-100 p-1 bg-white">
                                <img className="h-full w-full object-contain" src={product.images[0]} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</div>
                                <div className="text-xs text-gray-400">{product.images.length} images</div>
                                {product.offer && <div className="text-[10px] text-red-600 font-bold uppercase">{product.offer}</div>}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                            ${product.price}
                            {product.originalPrice && <span className="text-xs text-gray-300 line-through ml-1">${product.originalPrice}</span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span title={product.sizes.join(', ')}>{product.sizes.length} Sizes</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => onRemoveProduct(product.id)} className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold uppercase mb-6">Recent Orders</h3>
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center py-8 text-sm uppercase tracking-wide">No pending orders.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start hover:bg-gray-50 transition-colors">
                    <div className="mb-4 md:mb-0 w-full md:w-2/3">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                         <span className="font-mono font-bold text-black">#{order.id.slice(-6)}</span>
                         <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${order.status === 'confirmed' ? 'bg-black text-white' : order.status === 'shipped' ? 'bg-green-600 text-white' : 'bg-yellow-100 text-yellow-800'}`}>
                           {order.status}
                         </span>
                         <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                             {order.paymentMethod === 'cod' ? 'COD' : order.paymentMethod}
                         </span>
                         <span className="text-xs text-gray-400 ml-auto">{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</span>
                      </div>
                      
                      {/* Customer Info Block */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Customer</p>
                          <p className="text-sm font-bold text-black">{order.customerName}</p>
                          <p className="text-xs text-gray-600">{order.customerEmail}</p>
                          <p className="text-xs text-gray-600">{order.customerPhone}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Shipping To</p>
                          <p className="text-xs text-gray-600">{order.shippingAddress?.address}</p>
                          <p className="text-xs text-gray-600">{order.shippingAddress?.city}, {order.shippingAddress?.zip}</p>
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-gray-500 border-t border-gray-100 pt-3">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between py-1">
                             <span>• {item.quantity}x {item.name} <span className="text-xs text-gray-400">(Size {item.selectedSize})</span></span>
                             <span className="font-mono text-xs">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4 w-full md:w-auto mt-4 md:mt-0">
                      <div className="text-right">
                         <p className="text-xs text-gray-400 uppercase font-bold">Total Amount</p>
                         <span className="text-2xl font-bold font-mono">${order.total.toFixed(2)}</span>
                      </div>
                      
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => onUpdateOrderStatus(order.id, 'confirmed')}
                          className="bg-black text-white px-6 py-3 text-xs font-bold uppercase hover:bg-gray-800 flex items-center shadow-sm w-full justify-center transition-colors"
                        >
                          <CheckCircle className="h-3 w-3 mr-2" /> Confirm Order
                        </button>
                      )}

                      {order.status === 'confirmed' && (
                        <button 
                          onClick={() => onUpdateOrderStatus(order.id, 'shipped')}
                          className="bg-green-600 text-white px-6 py-3 text-xs font-bold uppercase hover:bg-green-700 flex items-center shadow-sm w-full justify-center transition-colors"
                        >
                          <Truck className="h-3 w-3 mr-2" /> Mark Shipped
                        </button>
                      )}

                      {order.status === 'shipped' && (
                        <div className="bg-gray-100 text-gray-500 px-6 py-3 text-xs font-bold uppercase flex items-center justify-center cursor-default">
                           <CheckCircle className="h-3 w-3 mr-2" /> Completed
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};