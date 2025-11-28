import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex flex-col items-center justify-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-8xl font-extrabold text-teal-500 mb-4"
        >
          404
        </motion.div>
        
        <motion.h2 
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-600 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Oops! The page you're looking for seems to have wandered off into the digital wilderness.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link to="/">
            <Button variant="primary" className="rounded-xl px-8 py-3 text-lg">
              🏠 Return to Homepage
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🗺️
        </motion.div>
      </motion.div>
    </div>
  );
}