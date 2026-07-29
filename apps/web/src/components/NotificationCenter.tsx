import { useState, useEffect, useRef } from "react";

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
  isRead: boolean;
  createdAt: string;
  metadata?: any;
}

interface NotificationCenterProps {
  token?: string;
}

export function NotificationCenter({ token }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = () => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;

    setLoading(true);
    fetch("/api/notifications", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setNotifications(data.notifications || []);
          setUnreadCount(data.unreadCount || 0);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [token]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    const authToken = token || localStorage.getItem("token");
    fetch("/api/notifications/read-all", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    });
  };

  const handleMarkSingleRead = (id: string) => {
    const authToken = token || localStorage.getItem("token");
    fetch(`/api/notifications/${id}/read`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then(() => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    });
  };

  const priorityStyles: Record<string, { badge: string; border: string }> = {
    CRITICAL: {
      badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      border: "border-r-4 border-r-rose-500",
    },
    HIGH: {
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      border: "border-r-4 border-r-amber-500",
    },
    NORMAL: {
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      border: "border-r-4 border-r-emerald-500",
    },
    LOW: {
      badge: "bg-slate-500/20 text-slate-400 border-slate-500/30",
      border: "border-r-4 border-r-slate-500",
    },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button with Pulse Badge */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchNotifications();
        }}
        className="relative p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
        title="Centre de notifications / الإشعارات"
      >
        <span className="text-lg">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse">
            {unreadCount > 9 ? "+9" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-white/15 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-right">
          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              تحديد الكل كمقروء ✓
            </button>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">الإشعارات والتنبيهات</h4>
              {unreadCount > 0 && (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {unreadCount} جديد
                </span>
              )}
            </div>
          </div>

          {/* List Content */}
          <div className="max-h-80 overflow-y-auto divide-y divide-white/5 scrollbar-thin scrollbar-thumb-slate-700">
            {loading && notifications.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 animate-pulse font-bold">
                جاري تحميل التنبيهات...
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => !item.isRead && handleMarkSingleRead(item.id)}
                  className={`p-4 transition-all cursor-pointer hover:bg-white/5 ${
                    item.isRead ? "opacity-60 bg-transparent" : "bg-slate-950/40"
                  } ${priorityStyles[item.priority]?.border || ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(item.createdAt).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
                        priorityStyles[item.priority]?.badge || ""
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white leading-snug">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-slate-500 space-y-1">
                <span className="text-2xl block">🔕</span>
                <span>لا توجد تنبيهات حالياً. جميع الحقول في حالة ممتازة.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
