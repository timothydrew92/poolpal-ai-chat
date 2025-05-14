"use client";

import { useState } from "react";

export default function Chatbotwidget() {
  const [visible, setVisible] = useState(false);

  const toggleChat = () => {
    setVisible(!visible);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 16px",
          background: "#2563EB",
          color: "#fff",
          border: "none",
          borderRadius: "9999px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: 9998,
        }}
      >
        {visible ? "Close Chat" : "Chat with PoolPal"}
      </button>

      {visible && (
        <iframe
          id="poolpal-chat"
          src="https://poolpal-ai-chat.vercel.app"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "420px",
            height: "600px",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
          loading="lazy"
        ></iframe>
      )}
    </>
  );
}