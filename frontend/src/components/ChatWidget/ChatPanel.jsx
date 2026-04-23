import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import MessageList from "./MessageList";
import InputArea from "./InputArea";
import {
  getMessages,
  addPair,
  getRecentContext,
  clearHistory,
} from "./useChatStorage";

// ─── Framer-motion variants ────────────────────────────────────────────────
const panelVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 28, stiffness: 260 },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

// ─── API helper ───────────────────────────────────────────────────────────
async function sendMessage(message) {
  const history = getRecentContext();

  const res = await fetch("/api/chat/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.reply;
}

// ─── Component ────────────────────────────────────────────────────────────
/**
 * Slide-in chat panel with full message flow and API integration.
 * @param {{ isOpen: boolean, onClose: () => void }} props
 */
export default function ChatPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState(() => getMessages());
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef(null);

  // ── Close helpers ──────────────────────────────────────────────────────
  const handleClose = () => {
    clearHistory();
    setMessages([]);
    onClose();
  };

  // ── Escape key ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Click outside ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        handleClose();
      }
    };

    // Delay so the open-click itself doesn't immediately close the panel
    const timer = setTimeout(
      () => document.addEventListener("mousedown", handleClickOutside),
      100
    );

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Send flow ─────────────────────────────────────────────────────────
  const handleSend = async (userText) => {
    // 1. Optimistically add the user message to UI
    const userMsg = { role: "user", content: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 2. Call the API
      const reply = await sendMessage(userText);

      // 3. Persist pair and update UI
      const updated = addPair(userText, reply);
      setMessages(updated);
    } catch (err) {
      // Show a user-facing error bubble on failure
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          key="chat-panel"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed left-0 top-0 h-full w-96 z-40 bg-gray-900 flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700 shrink-0">
            <h2 className="text-lg font-semibold text-white">Chat Assistant</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors duration-150 focus:outline-none"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Message list takes all remaining space */}
            <div className="flex-1 overflow-hidden">
              <MessageList messages={messages} />
            </div>

            {/* Loading indicator */}
            {isLoading && (
              <p className="px-4 pb-1 text-xs text-gray-400 animate-pulse">
                Assistant is typing…
              </p>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-700 shrink-0">
              <InputArea onSend={handleSend} isLoading={isLoading} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
