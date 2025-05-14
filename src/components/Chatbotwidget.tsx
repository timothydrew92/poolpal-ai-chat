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
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "420px",
            height: "600px",
            border: "1px solid #ccc",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            color: "#555"
          }}
        >
          [ Chatbot UI coming soon ]
        </div>
      )}
    </>
  );
}