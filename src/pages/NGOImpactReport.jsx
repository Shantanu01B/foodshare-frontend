import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getNGOStats } from '../api/statsApi';
import { getUserDonations } from '../api/donationApi';

export default function NGOImpactReport() {
    const [stats, setStats] = useState(null);
    const [distributions, setDistributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsResponse, distributionsResponse] = await Promise.all([
                    getNGOStats(),
                    getUserDonations()
                ]);
                
                console.log('NGO Stats Response:', statsResponse.data);
                console.log('NGO Distributions Response:', distributionsResponse.data);
                
                setStats(statsResponse.data);
                
                // Handle different response formats
                let distributionsData = [];
                if (Array.isArray(distributionsResponse.data)) {
                    distributionsData = distributionsResponse.data;
                } else if (distributionsResponse.data && Array.isArray(distributionsResponse.data.donations)) {
                    distributionsData = distributionsResponse.data.donations;
                } else if (distributionsResponse.data && distributionsResponse.data.data) {
                    distributionsData = distributionsResponse.data.data;
                }
                
                setDistributions(distributionsData);
            } catch (err) {
                console.error('Error fetching NGO impact data:', err);
                setError('Failed to load impact data');
                setDistributions([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

    const safeDistributions = Array.isArray(distributions) ? distributions : [];
    const completedDistributions = safeDistributions.filter(d => d.status === 'completed');

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h1 
                    className="text-4xl font-bold text-center text-gray-800 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    NGO Impact Report
                </motion.h1>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl text-green-600 font-bold">{stats?.mealsDistributed || 0}</div>
                        <div className="text-gray-600 text-sm">Total Meals</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl text-blue-600 font-bold">{stats?.familiesServed || 0}</div>
                        <div className="text-gray-600 text-sm">Families Served</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl text-purple-600 font-bold">{stats?.partnerRestaurants || 0}</div>
                        <div className="text-gray-600 text-sm">Partner Restaurants</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl text-amber-600 font-bold">{stats?.deliverySuccessRate || '0%'}</div>
                        <div className="text-gray-600 text-sm">Success Rate</div>
                    </div>
                </div>

                {/* Distribution Timeline */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Recent Distributions ({completedDistributions.length})
                    </h2>
                    
                    {completedDistributions.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-4">📊</div>
                            <p>No completed distributions yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {completedDistributions.slice(0, 10).map((distribution, index) => (
                                <motion.div
                                    key={distribution._id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex justify-between items-center p-3 border-l-4 border-green-500 bg-green-50 rounded"
                                >
                                    <div>
                                        <h3 className="font-semibold">{distribution.title || 'Untitled Distribution'}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {distribution.quantity || 0} meals • {distribution.updatedAt ? new Date(distribution.updatedAt).toLocaleDateString() : 'Unknown date'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Completed</div>
                                        <div className="text-xs text-gray-400">
                                            {distribution.updatedAt ? new Date(distribution.updatedAt).toLocaleTimeString() : ''}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Export Button */}
                <div className="text-center">
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
                        Download Full Report (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
}