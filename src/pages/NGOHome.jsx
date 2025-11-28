import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getNGOStats } from '../api/statsApi';

const Button = ({ children, variant = 'primary', className = '', onClick = () => {} }) => {
    let baseStyles = "font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out transform active:scale-95 shadow-lg";
    let variantStyles = '';

    switch (variant) {
        case 'primary':
            variantStyles = 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/50';
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

export default function NGOHome() {
    const { user } = useAuthStore();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getNGOStats();
                setStats(response.data);
            } catch (err) {
                setError('Failed to load statistics');
                console.error('Error fetching NGO stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <div className="text-xl">Loading your statistics...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    const quickStats = [
        { number: stats?.mealsDistributed || 0, label: 'Meals Distributed', icon: '🍛' },
        { number: stats?.activeVolunteers || 0, label: 'Active Volunteers', icon: '👥' },
        { number: stats?.partnerRestaurants || 0, label: 'Partner Restaurants', icon: '🏪' },
        { number: stats?.deliverySuccessRate || '0%', label: 'Delivery Success', icon: '✅' }
    ];

    const quickActions = [
        { title: 'Available Donations', description: 'View food donations ready for distribution', path: '/donations/active', icon: '📦', color: 'from-blue-500 to-cyan-500' },
        { title: 'Volunteer Management', description: 'Coordinate your volunteer team', path: '/dashboard/ngo', icon: '👥', color: 'from-green-500 to-emerald-500' },
        { title: 'Impact Analytics', description: 'Track your distribution impact', path: '/analytics', icon: '📊', color: 'from-purple-500 to-pink-500' },
        { title: 'AI Assistant', description: 'Get help with logistics planning', path: '/assistant', icon: '🤖', color: 'from-orange-500 to-amber-500' }
    ];

    return (
        <motion.main 
            className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <section className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            Welcome, {user?.name}! 🤝
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Your NGO has distributed <span className="font-bold text-green-600">{stats?.mealsDistributed || 0} meals</span> to families in need.
                        </p>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {quickStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                                whileHover={{ y: -5, scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-green-600 mb-1">{stat.number}</div>
                                <div className="text-gray-600 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {quickActions.map((action, index) => (
                                <motion.div
                                    key={action.title}
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link to={action.path}>
                                        <div className={`bg-gradient-to-r ${action.color} rounded-2xl p-6 text-white h-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}>
                                            <div className="text-3xl mb-3">{action.icon}</div>
                                            <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                                            <p className="text-white/90 text-sm">{action.description}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Community Impact Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Amplifying Community Impact 🌍</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            You've served approximately <span className="font-bold text-green-600">{stats?.familiesServed || 0} families</span> with your distribution efforts.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your NGO's Vital Role</h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-3">✓</span>
                                    <span>Ensured food reaches the most vulnerable communities</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-3">✓</span>
                                    <span>Coordinated {stats?.acceptedDonations || 0} successful distributions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-3">✓</span>
                                    <span>Maintained {stats?.deliverySuccessRate || '0%'} delivery success rate</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-3">✓</span>
                                    <span>Partnered with {stats?.partnerRestaurants || 0} local restaurants</span>
                                </li>
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-8 text-white text-center"
                        >
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="text-2xl font-bold mb-4">Distribution Champion!</h3>
                            <p className="mb-6">
                                {stats?.completedDistributions > 20 ? 
                                    "Your NGO is a top performer in food distribution efficiency!" :
                                    "Your consistent efforts are making a real difference in the community."
                                }
                            </p>
                            <Link to="/impact/ngo">
                                <Button variant="secondary">
                                    View Impact Report
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.main>
    );
}