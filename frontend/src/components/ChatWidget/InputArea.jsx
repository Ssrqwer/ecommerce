"use client";

import { useState } from "react";
import { Send } from "lucide-react";

/**
 * Text input area with a send button.
 * @param {{ onSend: (msg: string) => void, isLoading: boolean }} props
 */
export default function InputArea({ onSend, isLoading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isLoading}
        className="
          flex-1 bg-gray-800 border border-gray-700 rounded-lg
          px-3 py-2 text-white placeholder-gray-400 text-sm
          focus:outline-none focus:border-emerald-500
          disabled:opacity-50 transition-colors duration-150
        "
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !input.trim()}
        className="
          bg-emerald-500 hover:bg-emerald-600
          rounded-lg px-4 py-2
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
          flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-emerald-400
        "
        aria-label="Send message"
      >
        <Send size={18} className="text-white" />
      </button>
    </div>
  );
}
