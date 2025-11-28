import React, { useEffect } from 'react';
import Card from '../components/common/Card';
import ImpactCard from '../components/analytics/ImpactCard';
import { useAnalyticsStore } from '../store/analyticsStore';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { motion } from 'framer-motion';

export default function Analytics() {
  const { impact, streak, loading, fetchImpact, fetchStreak } = useAnalyticsStore();

  useEffect(() => {
    fetchImpact();
    fetchStreak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="max-w-7xl mx-auto p-8">
        <LoadingSkeleton count={3} />
      </div>
    </div>
  );

  // Sample weekly data (replace with real)
  const weekly = [
    { day: "Mon", value: 4, color: "from-teal-500 to-cyan-500" },
    { day: "Tue", value: 6, color: "from-amber-500 to-yellow-500" },
    { day: "Wed", value: 3, color: "from-blue-500 to-indigo-500" },
    { day: "Thu", value: 8, color: "from-green-500 to-emerald-500" },
    { day: "Fri", value: 5, color: "from-purple-500 to-pink-500" },
    { day: "Sat", value: 7, color: "from-orange-500 to-red-500" },
    { day: "Sun", value: 2, color: "from-indigo-500 to-purple-500" },
  ];
  const maxVal = Math.max(...weekly.map(w => w.value));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              📊 Impact Analytics
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your contribution to fighting hunger and reducing food waste
            </p>
          </div>

          {/* Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <ImpactCard 
              title="Meals Shared" 
              value={(impact && impact.mealsSaved) ? impact.mealsSaved.toLocaleString() : "0"} 
              icon="🍽️" 
              bgColor="bg-gradient-to-br from-green-500 to-emerald-500" 
              textColor="text-white" 
            />
            <ImpactCard 
              title="CO₂ Saved" 
              value={(impact && impact.co2Saved) ? `${impact.co2Saved}kg` : "0kg"} 
              icon="🌱" 
              bgColor="bg-gradient-to-br from-teal-500 to-cyan-500" 
              textColor="text-white" 
            />
            <ImpactCard 
              title="Current Streak" 
              value={streak ? `${streak} days` : "0 days"} 
              icon="🔥" 
              bgColor="bg-gradient-to-br from-amber-500 to-orange-500" 
              textColor="text-white" 
            />
          </div>

          {/* Weekly Activity Chart */}
          <Card title="📈 Weekly Activity" className="border-0 shadow-2xl mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-100 -mx-6 -mt-6 mb-6 px-6 py-4 rounded-t-2xl border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Your Weekly Contributions</h3>
              <p className="text-gray-600 text-sm">Daily donation activity overview</p>
            </div>
            
            <div className="h-48 flex items-end justify-between gap-2 px-4">
              {weekly.map((w, index) => (
                <motion.div 
                  key={w.day} 
                  className="flex-1 text-center"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className={`bg-gradient-to-t ${w.color} rounded-t-xl transition-all duration-500 hover:opacity-80 cursor-pointer`}
                    style={{ height: `${(w.value / maxVal) * 100}%` }}
                    title={`${w.value} donations`}
                  />
                  <div className="mt-3 text-sm font-medium text-gray-700">{w.day}</div>
                  <div className="text-xs text-gray-500">{w.value}</div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Badges Section */}
          <Card title="🏆 Achievement Badges" className="border-0 shadow-2xl">
            <div className="bg-gradient-to-r from-amber-50 to-orange-100 -mx-6 -mt-6 mb-6 px-6 py-4 rounded-t-2xl border-b border-amber-200">
              <h3 className="text-xl font-bold text-gray-800">Your Accomplishments</h3>
              <p className="text-gray-600 text-sm">Celebrate your food sharing journey</p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { name: "First Donor", color: "from-yellow-400 to-amber-500", icon: "🎯" },
                { name: "10 Meals Club", color: "from-green-400 to-emerald-500", icon: "🌟" },
                { name: "Eco Warrior", color: "from-teal-400 to-cyan-500", icon: "🌍" },
                { name: "Community Hero", color: "from-purple-400 to-pink-500", icon: "🦸" },
                { name: "Consistent Giver", color: "from-blue-400 to-indigo-500", icon: "📅" },
                { name: "Food Safety Pro", color: "from-red-400 to-orange-500", icon: "🧪" },
              ].map((badge, index) => (
                <motion.div
                  key={badge.name}
                  className="flex flex-col items-center p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center text-white text-2xl shadow-lg mb-2`}>
                    {badge.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">{badge.name}</span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Impact Summary */}
          <motion.div 
            className="mt-12 p-8 bg-gradient-to-r from-teal-500 to-amber-500 rounded-2xl text-center text-white shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">🌟 Making a Real Difference</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Every meal you share helps fight hunger and reduce environmental impact. 
              Together, we're building a more sustainable and compassionate community.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}