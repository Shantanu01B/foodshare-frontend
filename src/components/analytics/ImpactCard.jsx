import React, { useRef } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { downloadAsImage } from '../../utils/htmlToImage';
import { motion } from 'framer-motion';

export default function ImpactCard({ title, value, icon, bgColor = 'bg-gradient-to-br from-teal-500 to-amber-500', textColor = 'text-white' }) {
  const cardRef = useRef(null);

  const handleDownload = () => {
    downloadAsImage(cardRef.current, `${title.toLowerCase().replace(/\s/g, '-')}-impact`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex flex-col items-center p-6 border-0 shadow-xl hover:shadow-2xl cursor-pointer">
        <div ref={cardRef} className={`p-8 rounded-2xl w-full text-center ${bgColor} ${textColor} shadow-inner`}>
          <motion.span 
            className="text-6xl mb-4 block"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.span>
          <div className="text-4xl font-extrabold mb-2">{value}</div>
          <div className="text-lg font-medium opacity-90">{title}</div>
        </div>
        <Button variant="outline" className="mt-4 text-sm rounded-xl border-teal-500 text-teal-500 hover:bg-teal-50" onClick={handleDownload}>
          📥 Download Card
        </Button>
      </Card>
    </motion.div>
  );
}