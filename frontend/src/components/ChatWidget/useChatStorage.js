const STORAGE_KEY = "chatbot_history";
const MAX_MESSAGES = 10;

/**
 * Retrieves all stored messages from localStorage.
 * @returns {Array} Array of message objects.
 */
export function getMessages() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Adds a user/bot message pair to localStorage, trimming to MAX_MESSAGES.
 * @param {string} userMsg - The user's message text.
 * @param {string} botMsg  - The bot's reply text.
 * @returns {Array} The updated messages array.
 */
export function addPair(userMsg, botMsg) {
  const messages = getMessages();

  messages.push({ role: "user", content: userMsg });
  messages.push({ role: "model", content: botMsg });

  // Keep only the last MAX_MESSAGES entries
  const trimmed = messages.slice(-MAX_MESSAGES);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Silently ignore storage quota errors
  }

  return trimmed;
}

/**
 * Returns the last MAX_MESSAGES messages for use as API context.
 * @returns {Array} Recent message history.
 */
export function getRecentContext() {
  return getMessages().slice(-MAX_MESSAGES);
}

/**
 * Clears all chat history from localStorage.
 */
export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
