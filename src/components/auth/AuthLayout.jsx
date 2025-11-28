import React from 'react';
import Card from '../common/Card';
import { motion } from 'framer-motion';

export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card title={title} className="w-full border-0 shadow-2xl overflow-hidden">
          {/* Gradient header */}
          <div className="bg-gradient-to-r from-teal-500 to-amber-500 -mx-6 -mt-6 mb-6 px-6 py-4">
            <h2 className="text-2xl font-bold text-white text-center">{title}</h2>
          </div>
          <div className="px-2">
            {children}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}