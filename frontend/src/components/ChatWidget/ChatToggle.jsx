import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * Fixed-position pill button that opens the chat panel.
 * Hides itself when the panel is open (isOpen === true).
 * @param {{ onClick: () => void, isOpen: boolean }} props
 */
export default function ChatToggle({ onClick, isOpen }) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          key="chat-toggle"
          onClick={onClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            fixed bottom-6 right-6 z-50
            h-12 px-4 rounded-full
            bg-emerald-500 hover:bg-emerald-600
            shadow-lg
            flex items-center gap-2
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900
          "
          aria-label="Open chat"
        >
          <MessageCircle className="size-5 text-white shrink-0" />
          <span className="text-white text-sm font-semibold tracking-wide">Need Help?</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
