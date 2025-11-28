import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, title, className = '' }) {
  return (
    <motion.div 
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 hover:border-teal-400 transition duration-300 p-6 ${className}`}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {title && (
        <div className="mb-6 -mx-6 -mt-6 px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-100 rounded-t-2xl border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
      )}
      {children}
    </motion.div>
  );
}