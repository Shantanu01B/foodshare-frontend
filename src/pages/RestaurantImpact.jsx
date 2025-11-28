import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRestaurantStats } from '../api/statsApi';
import { getUserDonations } from '../api/donationApi';

export default function RestaurantImpact() {
    const [stats, setStats] = useState(null);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsResponse, donationsResponse] = await Promise.all([
                    getRestaurantStats(),
                    getUserDonations()
                ]);
                
                console.log('Stats Response:', statsResponse.data);
                console.log('Donations Response:', donationsResponse.data);
                
                setStats(statsResponse.data);
                
                if (Array.isArray(donationsResponse.data)) {
                    setDonations(donationsResponse.data);
                } else if (donationsResponse.data && Array.isArray(donationsResponse.data.donations)) {
                    setDonations(donationsResponse.data.donations);
                } else if (donationsResponse.data && donationsResponse.data.data) {
                    setDonations(donationsResponse.data.data);
                } else {
                    console.warn('Unexpected donations response format:', donationsResponse.data);
                    setDonations([]);
                }
            } catch (err) {
                console.error('Error fetching impact data:', err);
                setError('Failed to load impact data');
                setDonations([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading your impact data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    // Ensure donations is always an array before using array methods
    const safeDonations = Array.isArray(donations) ? donations : [];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h1 
                    className="text-4xl font-bold text-center text-gray-800 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Your Impact Dashboard
                </motion.h1>
                
                {/* Impact Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-3xl text-teal-600 font-bold">{stats?.mealsShared || 0}</div>
                        <div className="text-gray-600">Meals Shared</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-3xl text-green-600 font-bold">{stats?.co2Saved || '0kg'}</div>
                        <div className="text-gray-600">CO₂ Emissions Saved</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-3xl text-amber-600 font-bold">{stats?.completionRate || '0%'}</div>
                        <div className="text-gray-600">Completion Rate</div>
                    </div>
                </div>

                {/* Recent Donations */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Recent Donations ({safeDonations.length})
                    </h2>
                    
                    {safeDonations.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-4">📭</div>
                            <p>No donations found yet.</p>
                            <p className="text-sm">Start by creating your first donation!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {safeDonations.slice(0, 5).map((donation, index) => (
                                <motion.div
                                    key={donation._id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                                >
                                    <div>
                                        <h3 className="font-semibold">{donation.title || 'Untitled Donation'}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {donation.quantity || 0} meals • {donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : 'Unknown date'}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        donation.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {donation.status || 'unknown'}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}