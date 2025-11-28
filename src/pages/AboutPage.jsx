import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', onClick = () => {} }) => {
    let baseStyles = "font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out transform active:scale-95 shadow-lg";
    let variantStyles = '';

    switch (variant) {
        case 'primary':
            variantStyles = 'bg-teal-500 text-white hover:bg-teal-600 shadow-teal-500/50';
            break;
        case 'secondary':
            variantStyles = 'bg-amber-500 text-gray-900 hover:bg-amber-600 shadow-amber-500/50';
            break;
        default:
            variantStyles = 'bg-gray-700 text-white hover:bg-gray-600';
    }

    return (
        <motion.button
            className={`${baseStyles} ${variantStyles} ${className}`}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

export default function AboutPage() {
    const stats = [
        { number: '1.2M+', label: 'Meals Shared' },
        { number: '1,500+', label: 'Active Partners' },
        { number: '250K kg', label: 'CO₂ Prevented' },
        { number: '50+', label: 'Cities Covered' }
    ];

    const team = [
        { name: 'Food Donors', description: 'Restaurants, hotels, and catering services sharing surplus food', icon: '🏪' },
        { name: 'NGO Partners', description: 'Organizations distributing food to communities in need', icon: '🤝' },
        { name: 'Volunteers', description: 'Dedicated individuals ensuring food reaches its destination', icon: '🚗' },
        { name: 'Technology Team', description: 'Building smart solutions for efficient food distribution', icon: '💻' }
    ];

    return (
        <motion.main 
            className="min-h-screen bg-gray-50 text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-teal-500 to-amber-500 text-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <motion.h1 
                        className="text-5xl md:text-6xl font-bold mb-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        About FoodShare
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl font-light max-w-3xl mx-auto"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Building a future where no food goes to waste and no one goes hungry
                    </motion.p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                FoodShare was born from a simple yet powerful idea: what if we could redirect perfectly 
                                good food from going to waste and instead use it to nourish communities in need?
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                We're building India's most efficient food redistribution network, leveraging technology 
                                to connect surplus food with people who need it most. Our platform ensures that every 
                                meal reaches its destination quickly, safely, and with maximum impact.
                            </p>
                            <Link to="/contact">
                                <Button variant="primary">
                                    Get In Touch
                                </Button>
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="bg-gradient-to-br from-teal-50 to-amber-50 p-6 rounded-2xl text-center border border-teal-100"
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <div className="text-3xl font-bold text-teal-600 mb-2">{stat.number}</div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.h2 
                        className="text-4xl font-bold text-center text-gray-800 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Ecosystem
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        A collaborative network working together to fight food waste and hunger
                    </motion.p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-4xl mb-4">{member.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{member.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.h2 
                        className="text-4xl font-bold text-center text-gray-800 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Values
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Transparency',
                                description: 'Every food donation is tracked and verified, providing complete visibility into our impact.',
                                icon: '🔍'
                            },
                            {
                                title: 'Efficiency',
                                description: 'Smart technology ensures food reaches those in need quickly while maintaining quality and safety.',
                                icon: '⚡'
                            },
                            {
                                title: 'Community',
                                description: 'We believe in the power of collective action to create meaningful, lasting change.',
                                icon: '🤝'
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={value.title}
                                className="text-center p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-2xl font-bold text-teal-600 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-teal-500 to-amber-500 text-white text-center">
                <motion.div 
                    className="max-w-4xl mx-auto px-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold mb-6">Ready to Join Our Mission?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Whether you have food to share, time to volunteer, or resources to contribute, 
                        there's a place for you in our community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <Button variant="secondary" className="text-lg">
                                Join FoodShare
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" className="text-lg border-white text-white hover:bg-white/10">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </motion.main>
    );
}