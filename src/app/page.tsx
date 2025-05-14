'use client';

import { useState } from "react";
import ChatBot from "../components/Chatbot";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        {open ? "Close Chat" : "Chat with PoolPal"}
      </button>

      {/* Floating Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 z-40 w-80 h-[500px] bg-white border border-gray-300 shadow-xl rounded-lg overflow-hidden">
          <div className="p-4 h-full">
            <ChatBot />
          </div>
        </div>
      )}
    </div>
  );
}