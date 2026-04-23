import { motion } from "framer-motion";

const bubbleVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

/**
 * Renders an individual chat message bubble.
 * @param {{ role: 'user' | 'model', content: string }} props
 */
export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <span
        className={`
          px-4 py-2 max-w-[80%] text-sm leading-relaxed text-white
          ${
            isUser
              ? "bg-blue-500 rounded-2xl rounded-tr-sm"
              : "bg-gray-700 rounded-2xl rounded-tl-sm"
          }
        `}
      >
        {content}
      </span>
    </motion.div>
  );
}
