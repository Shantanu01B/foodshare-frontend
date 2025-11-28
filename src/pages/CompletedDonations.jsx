import React, { useEffect } from "react";
import { useDonationStore } from "../store/donationStore";
import Card from "../components/common/Card";
import DonationCard from "../components/donation/DonationCard";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import { motion } from "framer-motion";

export default function CompletedDonations() {
  const { myDonations, loading, fetchMyDonations } = useDonationStore();

  useEffect(() => {
    fetchMyDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completed = myDonations.filter(d => d.status === "completed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              ✅ Completed Donations
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrate your successful food sharing missions and their impact
            </p>
          </div>

          {loading ? (
            <LoadingSkeleton count={2} />
          ) : completed.length === 0 ? (
            <Card className="text-center py-16 border-0 shadow-xl">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Completed Donations Yet</h3>
              <p className="text-gray-600 text-lg">
                Your completed donations will appear here once they've been successfully delivered.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Keep sharing food to build your impact history!
              </p>
            </Card>
          ) : (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Summary Stats */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      🎊 Successfully Delivered!
                    </h3>
                    <p className="text-gray-600">
                      You've helped feed the community with {completed.length} completed donations
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <div className="text-3xl font-bold text-green-600">{completed.length}</div>
                    <div className="text-sm text-gray-600">Total Completed</div>
                  </div>
                </div>
              </Card>

              {/* Completed Donations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {completed.map((d, index) => (
                  <motion.div
                    key={d._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <DonationCard donation={d} />
                  </motion.div>
                ))}
              </div>

              {/* Celebration Message */}
              {completed.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-12"
                >
                  <Card className="border-0 shadow-2xl bg-gradient-to-r from-amber-50 to-orange-50">
                    <div className="text-4xl mb-4">🌟</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Amazing Work!</h3>
                    <p className="text-gray-600 text-lg">
                      Your generosity has made a real difference in people's lives. 
                      Every completed donation helps build a stronger, more caring community.
                    </p>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}