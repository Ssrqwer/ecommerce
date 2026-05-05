// CRMToggle.jsx - With loading state
import { useState } from "react";
import { Building2, Loader2 } from "lucide-react";

export default function CRMToggle({ onClick }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    // Reset after a short delay
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="
        fixed bottom-6 left-6 z-50
        h-12 px-4 rounded-full
        bg-blue-600 hover:bg-blue-700
        disabled:opacity-70 disabled:cursor-wait
        shadow-lg
        flex items-center gap-2
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
      "
      aria-label="Open CRM"
      title="Business CRM Portal"
    >
      {isLoading ? (
        <Loader2 className="size-5 text-white shrink-0 animate-spin" />
      ) : (
        <Building2 className="size-5 text-white shrink-0" />
      )}
      <span className="text-white text-sm font-semibold tracking-wide">
        {isLoading ? "Loading..." : "CRM Portal"}
      </span>
    </button>
  );
}
