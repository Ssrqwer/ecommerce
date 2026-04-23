"use client";

import ToggleButton from "./ToggleButton";
import ChatPanel from "./ChatPanel";

/**
 * ChatWidget namespace object.
 *
 * Usage in a parent page:
 *
 *   import ChatWidget from '@/components/ChatWidget';
 *
 *   const [isChatOpen, setIsChatOpen] = useState(false);
 *
 *   <ChatWidget.ToggleButton onClick={() => setIsChatOpen(true)} />
 *   <ChatWidget.Panel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
 */
const ChatWidget = {
  ToggleButton,
  Panel: ChatPanel,
};

export default ChatWidget;

// Named exports for convenience
export { ToggleButton, ChatPanel as Panel };
