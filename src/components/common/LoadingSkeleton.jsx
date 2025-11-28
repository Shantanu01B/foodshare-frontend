import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSkeleton({ count = 1, className = '' }) {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <motion.div 
      key={index} 
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full animate-pulse"></div>
        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6 animate-pulse"></div>
        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6 animate-pulse"></div>
      </div>
      <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl w-full mt-4 animate-pulse"></div>
    </motion.div>
  ));

  return (
    <div className={`grid grid-cols-1 ${count > 1 ? 'lg:grid-cols-2' : ''} gap-6`}>
      {skeletons}
    </div>
  );
}