import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * Fixed-position circular button that opens the chat panel.
 * @param {{ onClick: () => void }} props
 */
export default function ChatToggle({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-emerald-500 hover:bg-emerald-600
        shadow-lg
        flex items-center justify-center
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900
      "
      aria-label="Open chat"
    >
      <MessageCircle className="size-6 text-white" />
    </motion.button>
  );
}
