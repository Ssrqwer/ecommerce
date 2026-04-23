"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

/**
 * Scrollable list of chat messages with auto-scroll on new messages.
 * @param {{ messages: Array<{ role: string, content: string }> }} props
 */
export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  // Auto-scroll to the latest message whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      {messages.length === 0 ? (
        <p className="text-gray-400 text-sm text-center mt-auto self-center">
          Start a conversation...
        </p>
      ) : (
        messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} />
        ))
      )}
      {/* Sentinel element for auto-scroll */}
      <div ref={bottomRef} />
    </div>
  );
}
