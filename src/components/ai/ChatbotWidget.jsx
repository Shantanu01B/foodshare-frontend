import React, { useState, useRef, useEffect } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { useAiStore } from "../../store/aiStore";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatbotWidget() {
  const [input, setInput] = useState("");

  const chatHistory = useAiStore((s) => s.chatHistory) || [];
  const loadingChat = useAiStore((s) => s.loadingChat);
  const sendChatMessage = useAiStore((s) => s.sendChatMessage);

  const messagesEndRef = useRef(null);

  const prevCountRef = useRef(chatHistory.length);

  useEffect(() => {
    if (chatHistory.length > prevCountRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    prevCountRef.current = chatHistory.length;
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!input.trim()) return;

    if (typeof sendChatMessage !== "function") {
      console.error("sendChatMessage is not available");
      return;
    }

    sendChatMessage(input.trim());
    setInput("");
  };

  return (
    <Card className="flex flex-col border-0 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-amber-500 -mx-6 -mt-6 mb-4 px-6 py-3 rounded-t-2xl">
        <h3 className="text-xl font-bold text-white">AI Food Assistant</h3>
        <p className="text-white/90 text-sm">Ask me anything about food donation & safety</p>
      </div>

      {/* Chat area */}
      <div className="grow overflow-y-auto mb-3 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl space-y-3 min-h-[200px]">
        
        {/* Empty State */}
        {(chatHistory.length === 0) && !loadingChat && (
          <motion.div 
            className="text-center text-gray-500 mt-4 p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-4xl mb-2">🍽️</div>
            <p className="text-lg font-medium mb-1">Welcome to FoodShare AI!</p>
            <p className="text-sm">Ask about food safety, donations, or logistics</p>
          </motion.div>
        )}

        {/* Chat messages */}
        <AnimatePresence>
          {chatHistory.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-lg ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing bubbles */}
        {loadingChat && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-white border border-gray-200 text-gray-600 rounded-tl-none flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
              <span className="text-sm">AI is thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <input
          type="text"
          className="input-field grow border-2 border-gray-300 focus:border-teal-500 rounded-xl text-base py-2"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loadingChat}
        />
        <Button
          type="submit"
          loading={loadingChat}
          disabled={loadingChat}
          className="px-6 rounded-xl py-2 text-base"
        >
          Send
        </Button>
      </form>
    </Card>
  );
}