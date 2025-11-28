import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.footer 
            className="bg-gray-900 text-white px-8 py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerVariants}
        >
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <Link to="/" className="text-3xl font-extrabold text-teal-400 mb-4 block">
                            Food<span className="text-white">Share</span>
                        </Link>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                            Empowering communities with a transparent, efficient, and digital food sharing platform 
                            for a better tomorrow.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-xl font-bold text-teal-400 mb-6">Quick Links</h4>
                        <div className="space-y-3">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Contact', path: '/contact' },
                                { name: 'Login', path: '/login' }
                            ].map((link) => (
                                <motion.div key={link.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                                    <Link 
                                        to={link.path} 
                                        className="text-gray-300 hover:text-teal-400 transition text-lg block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-xl font-bold text-teal-400 mb-6">Contact Info</h4>
                        <div className="space-y-4 text-lg text-gray-300">
                            <div>
                                <p className="font-semibold">1800-123-FOOD</p>
                                <p className="text-sm text-gray-400">(1800-123-3663)</p>
                            </div>
                            <div>
                                <p>support@foodshare.org</p>
                            </div>
                            <div>
                                <p>Mumbai, India</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div 
                    className="border-t border-gray-700 pt-8"
                    variants={itemVariants}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-lg">
                            © {currentYear} FoodShare Initiative. All rights reserved.
                        </p>
                        <p className="text-teal-400 font-semibold text-lg">
                            Making food distribution fair and transparent
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
}