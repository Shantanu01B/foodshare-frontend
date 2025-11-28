// frontend/src/components/donation/QRScanner.jsx
import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QR_READER_ID } from "../../utils/qrReader";
import Card from "../common/Card";
import toast from "react-hot-toast";
import Button from "../common/Button";
import { motion, AnimatePresence } from "framer-motion";

let scannerInstance = null;

export default function QRScanner({ onScan, onStop, compact = false, className = "" }) {
  const [scanning, setScanning] = useState(false);
  const [expectingDonationId, setExpectingDonationId] = useState(null);
  const containerRef = useRef(null);
  const [showFullScanner, setShowFullScanner] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const donationId = e?.detail?.donationId;
      setExpectingDonationId(donationId || null);
      setScanning(true);
      setShowFullScanner(true);
    };
    window.addEventListener("start-qr-scan", handler);

    return () => {
      window.removeEventListener("start-qr-scan", handler);
    };
  }, []);

  useEffect(() => {
    if (!scanning) {
      if (scannerInstance) {
        scannerInstance
          .clear()
          .catch((err) => console.warn("Failed to clear QR scanner:", err))
          .finally(() => {
            scannerInstance = null;
            onStop && onStop();
          });
      }
      return;
    }

    // Check if the scanner container exists
    const scannerContainer = document.getElementById(QR_READER_ID);
    if (!scannerContainer) {
      console.error(`Scanner container with id '${QR_READER_ID}' not found`);
      toast.error("Scanner container not found. Please try again.");
      setScanning(false);
      return;
    }

    // create and render scanner
    scannerInstance = new Html5QrcodeScanner(
      QR_READER_ID,
      { fps: 10, qrbox: { width: 300, height: 300 } }, 
      false
    );

    const successHandler = (decodedText) => {
      try {
        scannerInstance
          .clear()
          .catch(() => {})
          .finally(() => {
            setScanning(false);
            setShowFullScanner(false);
            setExpectingDonationId(null);
            onScan && onScan(decodedText);
          });
      } catch (err) {
        console.error("Error handling scan result:", err);
        toast.error("Scan failed to process.");
      }
    };

    const errorHandler = (err) => {
    };

    try {
      scannerInstance.render(successHandler, errorHandler);
      toast.success("QR scanner active — point camera at the QR.");
    } catch (err) {
      console.error("Failed to start QR scanner:", err);
      toast.error("Failed to start camera / QR scanner. Check permissions.");
      setScanning(false);
      setShowFullScanner(false);
    }

    return () => {
    };
  }, [scanning, showFullScanner]);

  const handleStartStop = () => {
    if (scanning) {
      setScanning(false);
      setShowFullScanner(false);
    } else {
      if (compact) {
        setShowFullScanner(true);
      }
      setScanning(true);
    }
  };

  const handleCloseFullScanner = () => {
    setScanning(false);
    setShowFullScanner(false);
    setExpectingDonationId(null);
  };

  if (compact && !showFullScanner) {
    return (
      <Button 
        onClick={handleStartStop} 
        variant="primary" 
        className="w-full rounded-xl"
      >
        📷 Start QR Scan
      </Button>
    );
  }

  if (showFullScanner) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4" 
        >
          <div className="p-1"> {/* Reduced padding */}
            <div className="flex justify-between items-center mb-4 px-4 pt-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">QR Code Scanner</h3>
                <p className="text-gray-600 text-sm">Scan donation QR codes for pickup verification</p>
              </div>
              <button
                onClick={handleCloseFullScanner}
                className="text-gray-500 hover:text-gray-700 text-2xl bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 px-4 pb-4">
              <Button 
                onClick={handleStartStop} 
                variant={scanning ? "danger" : "primary"} 
                className="w-full rounded-xl"
              >
                {scanning ? "🛑 Stop Scanning" : "📷 Start QR Scan"}
              </Button>

              <AnimatePresence>
                {scanning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div 
                      ref={containerRef} 
                      id={QR_READER_ID} 
                      className="border-2 border-dashed border-teal-300 rounded-xl bg-gray-50 p-2 min-h-[400px] flex items-center justify-center" // Increased min height
                    >
                      <div className="text-gray-500 text-center">
                        <div className="text-4xl mb-2">📷</div>
                        <p>Camera loading...</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!scanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
                >
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-gray-700 font-medium">
                    Click <strong>Start QR Scan</strong> to activate your camera
                  </p>
                </motion.div>
              )}

              {scanning && expectingDonationId && (
                <motion.div 
                  className="p-3 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg border border-teal-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-sm text-teal-800 font-medium">
                    🔍 Scanning for donation: <span className="font-mono bg-teal-100 px-2 py-1 rounded">{expectingDonationId}</span>
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <Card title="📱 QR Scanner for Pickup" className={`border-0 shadow-xl ${className}`}>
      <div className="bg-gradient-to-r from-blue-50 to-cyan-100 -mx-6 -mt-6 mb-6 px-6 py-4 rounded-t-2xl border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">QR Code Scanner</h3>
        <p className="text-gray-600 text-sm">Scan donation QR codes for pickup verification</p>
      </div>

      <div className="space-y-4">
        <Button 
          onClick={handleStartStop} 
          variant={scanning ? "danger" : "primary"} 
          className="w-full rounded-xl"
        >
          {scanning ? "🛑 Stop Scanning" : "📷 Start QR Scan"}
        </Button>

        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div ref={containerRef} id={QR_READER_ID} className="border-2 border-dashed border-teal-300 rounded-xl bg-gray-50 p-4 min-h-[400px] flex items-center justify-center" />
            </motion.div>
          )}
        </AnimatePresence>

        {!scanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
          >
            <div className="text-4xl mb-3">📱</div>
            <p className="text-gray-700 font-medium">
              Click <strong>Start QR Scan</strong> to activate your camera
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Or click "Scan QR" on any donation card to scan for that specific donation
            </p>
          </motion.div>
        )}

        {scanning && expectingDonationId && (
          <motion.div 
            className="p-3 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg border border-teal-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-sm text-teal-800 font-medium">
              🔍 Scanning for donation: <span className="font-mono bg-teal-100 px-2 py-1 rounded">{expectingDonationId}</span>
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  );
}