import React, { useState, useRef } from 'react';
import { Wand2, Upload, Loader2, Download } from 'lucide-react';
import { editShoeImage } from '../services/geminiService';

export const DesignLab: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        setGeneratedImage(null); // Reset generated image
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsLoading(true);
    setError(null);

    try {
      // Extract base64 raw string (remove data:image/xyz;base64,)
      const base64Data = selectedImage.split(',')[1];
      
      const resultBase64 = await editShoeImage(base64Data, prompt);
      
      // Construct full data URL for display
      setGeneratedImage(`data:image/jpeg;base64,${resultBase64}`);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Try a different prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="border-b border-black pb-8 mb-12">
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-4">
            Creative <span className="text-red-600">Studio</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl font-light">
            Powered by Gemini Nano. Upload a base silhouette and describe your modification to generate high-fidelity concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">01. Upload Source</h3>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border border-gray-300 h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-red-600 transition-all bg-white relative overflow-hidden group"
              >
                {selectedImage ? (
                  <img src={selectedImage} alt="Original" className="h-full w-full object-contain p-4 mix-blend-multiply" />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 group-hover:text-red-600 mb-4 transition-colors" />
                    <p className="text-gray-400 text-xs uppercase tracking-wide group-hover:text-red-600 transition-colors">Select Image</p>
                  </>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">02. Design Prompt</h3>
              <textarea
                className="w-full border border-gray-300 p-4 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none resize-none h-40 text-sm font-mono bg-gray-50 transition-colors"
                placeholder="// Describe materials, colors, and textures..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedImage || !prompt || isLoading}
              className={`w-full py-4 text-sm font-bold uppercase tracking-widest flex items-center justify-center transition-all border 
                ${(!selectedImage || !prompt || isLoading) 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                  : 'bg-red-600 text-white hover:bg-red-700 border-red-600 shadow-lg'}`}
            >
              {isLoading ? (
                <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Processing</>
              ) : (
                <><Wand2 className="mr-2 h-4 w-4" /> Generate Concept</>
              )}
            </button>
            
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-xs border border-red-100">
                ERROR: {error}
              </div>
            )}
          </div>

          {/* Canvas */}
          <div className="lg:col-span-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3">03. Result</h3>
            <div className="bg-gray-50 border border-gray-200 w-full h-[600px] flex items-center justify-center relative">
              {isLoading && (
                 <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                   <div className="text-center">
                     <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                     <p className="text-red-600 text-xs font-mono uppercase animate-pulse">Rendering...</p>
                   </div>
                 </div>
              )}
              
              {generatedImage ? (
                <div className="relative w-full h-full group p-8">
                  <img src={generatedImage} alt="AI Generated" className="w-full h-full object-contain mix-blend-multiply" />
                  <a 
                    href={generatedImage} 
                    download="kicks-concept.jpg"
                    className="absolute bottom-6 right-6 bg-red-600 text-white p-3 hover:bg-red-700 transition-colors shadow-lg"
                    title="Download Image"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-300 text-sm font-mono uppercase tracking-widest">Waiting for input</p>
                </div>
              )}
            </div>
            
            {generatedImage && (
               <div className="mt-4 flex justify-end">
                 <button className="text-xs font-bold uppercase tracking-wider border-b border-red-600 text-red-600 pb-1 hover:text-red-800 transition-colors">
                   Save to Collection
                 </button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};