import React, { useState, useEffect } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import { createDonation } from "../services/donationService";
import { useAuthStore } from "../store/authStore";
import { useAiStore } from "../store/aiStore";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { downloadAsImage } from "../utils/htmlToImage";
import { motion, AnimatePresence } from "framer-motion";

export default function AddDonation() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { loadingAi, freshnessScore, suggestions, checkFreshness, getSuggestions } =
    useAiStore();

  const [form, setForm] = useState({
    title: "",
    quantity: 1,
    type: "veg",
    labels: "",
    madeAt: "",
    expiresAt: "",
    pinCode: user && user.pinCode ? user.pinCode : "",
    zone: user && user.zone ? user.zone : "A",
    imageBase64: "", 
    freshnessScore: "Fresh"
  });

  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setForm({ ...form, imageBase64: base64 });
      } catch (error) {
        toast.error("Failed to process image");
      }
    }
  };

  const handleFreshnessCheck = (e) => {
    e.preventDefault();
    if (!form.title || !form.quantity || !form.madeAt || !form.expiresAt) {
      return toast.error("Please fill in all required fields");
    }
    checkFreshness(form);
  };

  useEffect(() => {
    if (freshnessScore && freshnessScore.score) {
      setForm((p) => ({ ...p, freshnessScore: freshnessScore.score }));
    }
  }, [freshnessScore]);

  const handleGetSuggestions = async () => {
    if (!form.title) return toast.error("Please enter a title first");
    try {
      const res = await getSuggestions({ title: form.title, type: form.type });
      if (!res) return toast.error("No suggestions returned");
      toast.success("AI suggestions received!");
    } catch (err) {
      toast.error("Failed to get suggestions");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting donation data:", form);
      console.log("Image Base64 length:", form.imageBase64 ? form.imageBase64.length : 0);

      const donationData = {
        ...form,
        quantity: Number(form.quantity),
        labels: form.labels
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        madeAt: form.madeAt,
        expiresAt: form.expiresAt,
        imageBase64: form.imageBase64
      };

      console.log("Processed donation data:", donationData);

      const created = await createDonation(donationData);
      console.log("Created donation:", created);
      
      setQrData(created);
      toast.success("🎉 Donation created successfully!");
      
    } catch (err) {
      console.error("Donation creation error:", err);
      console.error("Error response:", err.response);
      
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        "Failed to create donation";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (s) => {
    if (!s || !s.labels) return;
    setForm((p) => ({
      ...p,
      labels: s.labels.join(", ")
    }));
    toast.success("Suggestion applied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card title="🍽️ Create New Donation" className="border-0 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <div className="bg-gradient-to-r from-teal-500 to-amber-500 -mx-6 -mt-6 mb-6 px-6 py-4 rounded-t-2xl">
                  <h2 className="text-2xl font-bold text-white">Share Your Surplus Food</h2>
                  <p className="text-white/90 text-sm">Help fight hunger in your community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Title *</label>
                    <input
                      className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g., Fresh Vegetable Curry"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                      <input
                        className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                        name="quantity"
                        type="number"
                        min={1}
                        value={form.quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Food Type *</label>
                      <select
                        className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                      >
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Veg</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Labels</label>
                    <input
                      className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                      name="labels"
                      value={form.labels}
                      onChange={handleChange}
                      placeholder="e.g., gluten-free, spicy, healthy (comma separated)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Made At *</label>
                      <input
                        className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                        type="datetime-local"
                        name="madeAt"
                        value={form.madeAt}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expires At *</label>
                      <input
                        className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                        type="datetime-local"
                        name="expiresAt"
                        value={form.expiresAt}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                      <input
                        className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                        name="pinCode"
                        value={form.pinCode}
                        onChange={handleChange}
                        placeholder="e.g., 400001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
                      <select
                        className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                        name="zone"
                        value={form.zone}
                        onChange={handleChange}
                      >
                        <option value="A">Zone A</option>
                        <option value="B">Zone B</option>
                        <option value="C">Zone C</option>
                        <option value="D">Zone D</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Freshness Score</label>
                      <select
                        className="input-field border-2 border-gray-300 focus:border-teal-500 rounded-xl"
                        name="freshnessScore"
                        value={form.freshnessScore}
                        onChange={handleChange}
                      >
                        <option value="Fresh">Fresh</option>
                        <option value="Consume Soon">Consume Soon</option>
                        <option value="High Risk">High Risk</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button type="button" onClick={handleFreshnessCheck} className="w-full rounded-xl">
                        AI Freshness Check
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="button" 
                      onClick={handleGetSuggestions} 
                      loading={loadingAi}
                      variant="outline"
                      className="rounded-xl border-teal-500 text-teal-500 hover:bg-teal-50"
                    >
                      Get AI Suggestions
                    </Button>
                    <Button type="submit" loading={loading} className="ml-auto rounded-xl">
                      🚀 Publish Donation
                    </Button>
                  </div>
                </form>
              </div>

              {/* Sidebar Section */}
              <div className="space-y-6">
                {/* AI Suggestions */}
                <Card title="🤖 AI Suggestions" className="border-0 shadow-lg">
                  {suggestions ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-2">Suggested Labels:</h4>
                        <p className="text-gray-700">{suggestions.labels.join(", ")}</p>
                      </div>
                      <p className="text-sm text-gray-600 italic">{suggestions.description}</p>
                      <Button
                        variant="outline"
                        onClick={() => applySuggestion(suggestions)}
                        className="w-full rounded-xl border-teal-500 text-teal-500 hover:bg-teal-50"
                      >
                        Apply Suggestions
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-3">🧠</div>
                      <p>No suggestions yet.</p>
                      <p className="text-sm">Click "Get AI Suggestions" for smart recommendations</p>
                    </div>
                  )}
                </Card>

                {/* QR Section */}
                <AnimatePresence>
                  {qrData ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card title="📱 Pickup QR Code" className="border-0 shadow-lg text-center">
                        <div
                          id="qr-container"
                          className="p-6 bg-white rounded-xl border-2 border-dashed border-teal-300 inline-block"
                        >
                          <QRCode value={`${qrData._id}:${qrData.qrToken}`} size={180} />
                        </div>
                        <p className="text-gray-600 mt-4 text-sm">
                          Share this QR code with volunteers for pickup
                        </p>
                        <div className="flex gap-3 mt-4">
                          <Button
                            className="flex-1 rounded-xl"
                            onClick={() =>
                              downloadAsImage(
                                document.getElementById("qr-container"),
                                `${qrData.title}-qr`
                              )
                            }
                          >
                            Download QR
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 rounded-xl border-teal-500 text-teal-500 hover:bg-teal-50"
                            onClick={() => setQrData(null)}
                          >
                            Done
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ) : (
                    <Card className="border-0 shadow-lg text-center">
                      <div className="text-4xl mb-3">📱</div>
                      <h3 className="font-semibold text-gray-800 mb-2">QR Code</h3>
                      <p className="text-gray-600 text-sm">
                        Your pickup QR code will appear here after creating a donation
                      </p>
                    </Card>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}