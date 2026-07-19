import type { Toast } from "../hooks/useToast";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

const typeStyles: Record<string, string> = {
  success: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
  error: "bg-red-500/20 border-red-500/40 text-red-300",
  warning: "bg-amber-500/20 border-amber-500/40 text-amber-300",
  info: "bg-blue-500/20 border-blue-500/40 text-blue-300",
};

const typeIcons: Record<string, string> = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-20 right-4 z-[3000] flex flex-col gap-2 max-w-sm"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg animate-in slide-in-from-right fade-in duration-300 ${typeStyles[toast.type]}`}
          role="alert"
        >
          <span className="text-lg">{typeIcons[toast.type]}</span>
          <span className="text-sm font-medium flex-1">{toast.message}</span>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-xs opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
