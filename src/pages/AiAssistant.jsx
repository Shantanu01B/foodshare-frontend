import React, { useState } from 'react';
import Card from '../components/common/Card';
import ChatbotWidget from '../components/ai/ChatbotWidget';
import Button from '../components/common/Button';
import { useAiStore } from '../store/aiStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiAssistant() {
  const { loadingAi, freshnessScore, checkFreshness } = useAiStore();
  const [freshnessForm, setFreshnessForm] = useState({
    title: "", quantity: 1, type: "veg", madeAt: "", expiresAt: ""
  });

  const handleChange = e => setFreshnessForm({ ...freshnessForm, [e.target.name]: e.target.value });

  const handleFreshnessCheck = async (e) => {
    e.preventDefault();
    if (!freshnessForm.title || !freshnessForm.quantity || !freshnessForm.madeAt || !freshnessForm.expiresAt) {
      return alert("Please fill all required fields for freshness check.");
    }
    await checkFreshness(freshnessForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🤖 AI Food Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get smart recommendations and food safety insights powered by AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChatbotWidget />
          </div>
          
          {/* Freshness Checker - 1/3 width */}
          <div className="lg:col-span-1 space-y-8">
            <Card title="🍎 Food Freshness Checker" className="border-0 shadow-2xl">
              <div className="bg-gradient-to-r from-teal-500 to-amber-500 -mx-6 -mt-6 mb-6 px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-bold text-white">Freshness Analyzer</h3>
                <p className="text-white/90 text-sm">AI-powered food safety assessment</p>
              </div>

              <form onSubmit={handleFreshnessCheck} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Food Item Title *</label>
                  <input 
                    className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl" 
                    name="title" 
                    placeholder="e.g., Chicken Biryani" 
                    value={freshnessForm.title} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Servings) *</label>
                  <input 
                    className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl" 
                    name="quantity" 
                    type="number" 
                    min={1} 
                    placeholder="Number of servings" 
                    value={freshnessForm.quantity} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Food Type *</label>
                  <select 
                    className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl" 
                    name="type" 
                    value={freshnessForm.type} 
                    onChange={handleChange}
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Veg</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Made At *</label>
                  <input 
                    className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl" 
                    name="madeAt" 
                    type="datetime-local" 
                    value={freshnessForm.madeAt} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expires At *</label>
                  <input 
                    className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl" 
                    name="expiresAt" 
                    type="datetime-local" 
                    value={freshnessForm.expiresAt} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <Button type="submit" loading={loadingAi} className="w-full rounded-xl">
                  🧠 Get AI Freshness Score
                </Button>
              </form>

              <AnimatePresence>
                {freshnessScore && (
                  <motion.div 
                    className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">AI Assessment:</h4>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        freshnessScore.score.includes('Risk') 
                          ? 'bg-red-100 text-red-700'
                          : freshnessScore.score.includes('Soon') 
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {freshnessScore.score}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{freshnessScore.reason}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Quick Tips Card */}
            <Card title="💡 Food Safety Tips" className="border-0 shadow-xl">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Keep hot foods above 60°C and cold foods below 5°C</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Use within 2 hours of preparation for optimal freshness</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Store in airtight containers to maintain quality</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Label with preparation date and contents</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}