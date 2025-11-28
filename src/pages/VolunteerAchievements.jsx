import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getVolunteerStats } from '../api/statsApi';
import { getVolunteerTasks } from '../api/volunteerApi';

export default function VolunteerAchievements() {
    const [stats, setStats] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsResponse, tasksResponse] = await Promise.all([
                    getVolunteerStats(),
                    getVolunteerTasks()
                ]);
                
                console.log('Volunteer Stats Response:', statsResponse.data);
                console.log('Volunteer Tasks Response:', tasksResponse.data);
                
                setStats(statsResponse.data);
                
                // Handle different response formats
                let tasksData = [];
                if (Array.isArray(tasksResponse.data)) {
                    tasksData = tasksResponse.data;
                } else if (tasksResponse.data && Array.isArray(tasksResponse.data.tasks)) {
                    tasksData = tasksResponse.data.tasks;
                } else if (tasksResponse.data && tasksResponse.data.data) {
                    tasksData = tasksResponse.data.data;
                }
                
                setTasks(tasksData);
            } catch (err) {
                console.error('Error fetching volunteer achievements:', err);
                setError('Failed to load achievements data');
                setTasks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

    const safeTasks = Array.isArray(tasks) ? tasks : [];

    // Achievement badges based on performance
    const achievements = [
        { 
            name: 'First Delivery', 
            earned: stats?.deliveriesMade >= 1,
            icon: '🚗',
            description: 'Complete your first food delivery'
        },
        { 
            name: 'Community Hero', 
            earned: stats?.deliveriesMade >= 10,
            icon: '🦸',
            description: 'Complete 10+ deliveries'
        },
        { 
            name: 'Efficiency Expert', 
            earned: parseFloat(stats?.performanceRating) >= 4.5,
            icon: '⚡',
            description: 'Maintain 4.5★ rating'
        },
        { 
            name: 'Dedicated Volunteer', 
            earned: stats?.hoursServed >= 20,
            icon: '⏱️',
            description: 'Serve 20+ hours'
        },
        { 
            name: 'Meal Master', 
            earned: stats?.mealsDelivered >= 500,
            icon: '🍛',
            description: 'Deliver 500+ meals'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h1 
                    className="text-4xl font-bold text-center text-gray-800 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Your Achievements
                </motion.h1>
                
                {/* Performance Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl text-orange-600 font-bold">{stats?.deliveriesMade || 0}</div>
                        <div className="text-gray-600 text-sm">Total Deliveries</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl text-blue-600 font-bold">{stats?.hoursServed || 0}</div>
                        <div className="text-gray-600 text-sm">Hours Served</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl text-green-600 font-bold">{stats?.mealsDelivered || 0}</div>
                        <div className="text-gray-600 text-sm">Meals Delivered</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl text-purple-600 font-bold">{stats?.performanceRating || '0.0★'}</div>
                        <div className="text-gray-600 text-sm">Performance</div>
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Badges & Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-6 rounded-xl border-2 text-center ${
                                    achievement.earned 
                                        ? 'border-amber-500 bg-amber-50' 
                                        : 'border-gray-300 bg-gray-100 opacity-50'
                                }`}
                            >
                                <div className="text-4xl mb-3">{achievement.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{achievement.name}</h3>
                                <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    achievement.earned 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {achievement.earned ? 'Earned' : 'Locked'}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Recent Activity ({safeTasks.length})
                    </h2>
                    
                    {safeTasks.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-4">📝</div>
                            <p>No tasks found yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {safeTasks.slice(0, 5).map((task, index) => (
                                <motion.div
                                    key={task._id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex justify-between items-center p-3 border-l-4 border-orange-500 bg-orange-50 rounded"
                                >
                                    <div>
                                        <h3 className="font-semibold">{task.title || 'Untitled Task'}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {task.quantity || 0} meals • {task.pinCode || 'Unknown location'}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        task.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {task.status || 'unknown'}
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