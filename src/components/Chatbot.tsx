"use client";
import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are PoolPal, a helpful assistant for a professional pool company. Answer clearly and professionally, offering help with services, maintenance, chemical treatments, and general pool care.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false); // <- toggle state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md z-50"
      >
        {visible ? "Close Chat" : "Chat with PoolPal"}
      </button>

      {/* Chat UI */}
      <div
        className={`fixed bottom-20 right-4 w-[380px] max-h-[640px] bg-white border border-gray-300 shadow-xl rounded-md p-4 z-40 ${
          visible ? "block" : "hidden"
        }`}
      >
        <div className="overflow-y-auto max-h-[460px] mb-4">
          {messages
            .filter((m) => m.role !== "system")
            .map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded-md ${
                  msg.role === "user"
                    ? "bg-green-700 text-white text-right"
                    : "bg-gray-800 text-white text-left"
                }`}
              >
                <b>{msg.role === "user" ? "You:" : "PoolPal:"}</b> {msg.content}
              </div>
            ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-md p-2 text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about pool maintenance..."
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
}