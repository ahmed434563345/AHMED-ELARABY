import React, { useState } from 'react';
import { CartItem } from '../types';
import { Lock, CreditCard, Smartphone, Banknote } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  onPlaceOrder: (details: any) => void;
  onBack: () => void;
}

type PaymentMethod = 'card' | 'instapay' | 'orangemoney' | 'cod';

export const Checkout: React.FC<CheckoutProps> = ({ cart, total, onPlaceOrder, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    walletNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder({ ...formData, paymentMethod });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black uppercase mb-4">Cart is Empty</h2>
        <button onClick={onBack} className="text-red-600 underline font-bold hover:text-red-800">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 text-center md:text-left">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Section */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Info */}
            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">Contact Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                    <input required name="email" type="email" onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none transition-colors" placeholder="you@example.com" />
                    </div>
                    <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                    <input required name="phone" type="tel" onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none transition-colors" placeholder="+1 (555) 000-0000" />
                    </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name</label>
                  <input required name="firstName" type="text" onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name</label>
                  <input required name="lastName" type="text" onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none transition-colors" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
                  <input required name="address" type="text" onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                  <input required name="city" type="text" onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ZIP / Postal Code</label>
                  <input required name="zip" type="text" onChange={handleChange} className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none transition-colors" />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-6 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Payment Method</span>
                <Lock className="h-4 w-4 text-gray-400" />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg text-left flex items-center transition-all ${paymentMethod === 'card' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <CreditCard className={`h-5 w-5 mr-3 ${paymentMethod === 'card' ? 'text-red-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-bold ${paymentMethod === 'card' ? 'text-red-900' : 'text-gray-600'}`}>Credit Card</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('instapay')}
                  className={`p-4 border rounded-lg text-left flex items-center transition-all ${paymentMethod === 'instapay' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <Smartphone className={`h-5 w-5 mr-3 ${paymentMethod === 'instapay' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-bold ${paymentMethod === 'instapay' ? 'text-purple-900' : 'text-gray-600'}`}>InstaPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('orangemoney')}
                  className={`p-4 border rounded-lg text-left flex items-center transition-all ${paymentMethod === 'orangemoney' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <Smartphone className={`h-5 w-5 mr-3 ${paymentMethod === 'orangemoney' ? 'text-orange-500' : 'text-gray-400'}`} />
                  <span className={`text-sm font-bold ${paymentMethod === 'orangemoney' ? 'text-orange-900' : 'text-gray-600'}`}>Orange Money</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 border rounded-lg text-left flex items-center transition-all ${paymentMethod === 'cod' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <Banknote className={`h-5 w-5 mr-3 ${paymentMethod === 'cod' ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className={`text-sm font-bold ${paymentMethod === 'cod' ? 'text-green-900' : 'text-gray-600'}`}>Cash on Delivery</span>
                </button>
              </div>

              {/* Conditional Payment Fields */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Number</label>
                    <input required name="cardNumber" type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none font-mono transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry Date</label>
                      <input required name="expiry" type="text" placeholder="MM/YY" className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none font-mono transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVC</label>
                      <input required name="cvc" type="text" placeholder="123" className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none font-mono transition-colors" />
                    </div>
                  </div>
                </div>
              )}

              {(paymentMethod === 'instapay' || paymentMethod === 'orangemoney') && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-gray-50 p-4 rounded text-sm text-gray-600">
                    <p className="mb-2 font-bold">Instructions:</p>
                    <p>Please send the total amount of <strong>${total.toFixed(2)}</strong> to:</p>
                    <p className="font-mono text-lg font-bold my-2 text-black">0123 456 7890</p>
                    <p>Enter your wallet number below for verification.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Wallet Number</label>
                    <input required name="walletNumber" type="text" placeholder="01xxxxxxxxx" className="w-full border border-gray-300 p-3 text-sm focus:border-red-600 outline-none font-mono transition-colors" />
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-green-50 border border-green-100 p-4 rounded text-sm text-green-800">
                    <p className="font-bold flex items-center"><CheckCircle className="h-4 w-4 mr-2" /> Pay upon delivery.</p>
                    <p className="mt-1">Please ensure you have the exact amount available when the courier arrives.</p>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-red-600 text-white py-4 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg">
              {paymentMethod === 'cod' ? 'Place Order' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 p-8 border border-gray-200 sticky top-24">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6">Order Summary</h2>
            <div className="space-y-6 mb-6 max-h-[400px] overflow-auto pr-2">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex gap-4">
                   <div className="h-16 w-16 bg-white border border-gray-200 p-1 flex-shrink-0">
                     <img src={item.images[0]} alt={item.name} className="h-full w-full object-contain" />
                   </div>
                   <div className="flex-1">
                     <h3 className="text-sm font-bold line-clamp-1">{item.name}</h3>
                     <p className="text-xs text-gray-500 uppercase">Size: {item.selectedSize}</p>
                     <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                   </div>
                   <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-4 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper icon import
function CheckCircle(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}