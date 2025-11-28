import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', loading = false, ...props }) {
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out transform shadow-lg';
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-teal-500/50';
      break;
    case 'secondary':
      variantClasses = 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 shadow-amber-500/50';
      break;
    case 'outline':
      variantClasses = 'border-2 border-teal-500 text-teal-500 hover:bg-teal-50 hover:border-teal-600 hover:text-teal-600';
      break;
    case 'danger':
      variantClasses = 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/50';
      break;
    default:
      variantClasses = 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white';
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      disabled={loading || props.disabled}
      whileHover={{ scale: loading ? 1 : 1.05 }}
      whileTap={{ scale: loading ? 1 : 0.95 }}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}