'use client';
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
      <div className="bg-white shadow-md p-4 mb-6 max-h-[500px] overflow-y-auto rounded-md">
        {messages
          .filter((m) => m.role !== "system")
          .map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 rounded-md ${
                msg.role === "user"
                  ? "bg-green-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              <b>{msg.role === "user" ? "You:" : "PoolPal:"}</b> {msg.content}
            </div>
          ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-md p-2"
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
    </>
  );
}