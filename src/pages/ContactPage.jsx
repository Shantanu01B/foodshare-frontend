import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            details: 'support@foodshare.org',
            description: 'Send us an email anytime'
        },
        {
            icon: '📞',
            title: 'Call Us',
            details: '1800-123-FOOD',
            description: 'We\'re here to help 24/7'
        },
        {
            icon: '🏢',
            title: 'Visit Us',
            details: 'Mumbai, India',
            description: 'Come say hello at our office'
        }
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
                        Get In Touch
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl font-light max-w-3xl mx-auto"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        We'd love to hear from you. Let's work together to fight food waste.
                    </motion.p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {contactMethods.map((method, index) => (
                            <motion.div
                                key={method.title}
                                className="text-center p-8 bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl border border-teal-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-4xl mb-4">{method.icon}</div>
                                <h3 className="text-2xl font-bold text-teal-600 mb-3">{method.title}</h3>
                                <p className="text-lg font-semibold text-gray-800 mb-2">{method.details}</p>
                                <p className="text-gray-600">{method.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Have questions about how FoodShare works? Want to partner with us? 
                                Interested in volunteering? We're here to help and would love to 
                                connect with you.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white text-xl">
                                        ⚡
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Quick Response</h4>
                                        <p className="text-gray-600">We typically reply within 24 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl">
                                        💬
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Expert Support</h4>
                                        <p className="text-gray-600">Our team is here to help you succeed</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="partnership">Partnership Inquiry</option>
                                        <option value="volunteer">Volunteer Opportunity</option>
                                        <option value="donation">Food Donation</option>
                                        <option value="support">Technical Support</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                <Button type="submit" variant="primary" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.h2 
                        className="text-4xl font-bold text-center text-gray-800 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    
                    <div className="space-y-6">
                        {[
                            {
                                question: "How does FoodShare ensure food safety?",
                                answer: "We have strict quality control measures, including temperature monitoring, freshness assessment, and proper packaging guidelines for all food donations."
                            },
                            {
                                question: "Can individuals donate food?",
                                answer: "Currently, we work primarily with registered food businesses and restaurants. However, we're working on expanding to individual donations soon."
                            },
                            {
                                question: "How can my organization partner with FoodShare?",
                                answer: "We'd love to explore partnership opportunities! Please fill out the contact form above and select 'Partnership Inquiry' as the subject."
                            },
                            {
                                question: "Is there a cost to use FoodShare?",
                                answer: "FoodShare is free for NGOs and beneficiaries. Food donors may have minimal operational costs depending on the scale of their donations."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <h3 className="text-xl font-bold text-teal-600 mb-3">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.main>
    );
}