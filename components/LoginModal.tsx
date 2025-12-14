import React, { useState } from 'react';
import { X, Lock, ArrowRight, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, pass: string) => void;
  onSignUp: (email: string, pass: string, name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onSignUp }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      onSignUp(email, password, name);
    } else {
      onLogin(email, password);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Reset fields usually, but keeping them might be user friendly if they misclicked
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8 md:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
              {isSignUp ? 'Join the Club' : 'Member Access'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isSignUp ? 'Create your account to start collecting.' : 'Enter your credentials to access your account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required={isSignUp}
                    className="w-full border border-gray-300 p-4 pl-10 text-sm outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full border border-gray-300 p-4 text-sm outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  className="w-full border border-gray-300 p-4 pl-10 text-sm outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {!isSignUp && (
              <div className="bg-gray-100 p-4 text-xs text-gray-500 border-l-2 border-red-600">
                <p className="font-bold text-black mb-1">Demo Credentials:</p>
                <p>User: user@kicks.com / user</p>
                <p>Admin: admin@kicks.com / admin</p>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-red-600 text-white py-4 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center group"
            >
              {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
             {!isSignUp && (
               <a href="#" className="block text-xs text-gray-400 hover:text-black underline">Forgot your password?</a>
             )}
             <div className="pt-4 border-t border-gray-100">
               <span className="text-xs text-gray-500">{isSignUp ? 'Already a member?' : 'Not a member?'} </span>
               <button 
                 onClick={toggleMode} 
                 className="text-xs font-bold text-black uppercase tracking-wide hover:text-red-600 underline"
               >
                 {isSignUp ? 'Sign In' : 'Join Us'}
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};