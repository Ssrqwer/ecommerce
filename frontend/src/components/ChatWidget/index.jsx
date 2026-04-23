import ChatToggle from "./ChatToggle";
import ChatPanel from "./ChatPanel";

/**
 * ChatWidget namespace object.
 *
 * Usage in a parent page:
 *
 *   import ChatWidget from '@/components/ChatWidget';
 *   // or named:
 *   import { ChatToggle, ChatPanel } from '@/components/ChatWidget';
 *
 *   const [isChatOpen, setIsChatOpen] = useState(false);
 *
 *   <ChatWidget.Toggle onClick={() => setIsChatOpen(true)} />
 *   <ChatWidget.Panel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
 */
const ChatWidget = {
  Toggle: ChatToggle,
  Panel: ChatPanel,
};

export default ChatWidget;

// Named exports for convenience
export { ChatToggle, ChatPanel };
