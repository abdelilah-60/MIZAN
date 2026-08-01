import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by Mizan ErrorBoundary:", error, errorInfo);

    // If chunk load error (due to fresh Vercel deployment), auto-reload page once to fetch latest code
    const isChunkError =
      error?.message?.includes("Failed to fetch dynamically imported module") ||
      error?.message?.includes("Importing a module script failed") ||
      error?.name === "ChunkLoadError";

    if (isChunkError) {
      const lastReload = sessionStorage.getItem("mizan_chunk_reload_time");
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
        sessionStorage.setItem("mizan_chunk_reload_time", now.toString());
        window.location.reload();
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunkError =
        this.state.error?.message?.includes("Failed to fetch dynamically imported module") ||
        this.state.error?.message?.includes("Importing a module script failed");

      return (
        <div className="min-h-screen bg-[#16212b] flex items-center justify-center p-4 text-center font-sans">
          <div className="bg-[#1f2d3a] border border-[#8D5B4C]/30 rounded-3xl p-8 max-w-md w-full space-y-5 shadow-2xl backdrop-blur-xl">
            <div className="h-16 w-16 bg-[#8D5B4C]/20 border border-[#8D5B4C]/40 rounded-2xl flex items-center justify-center text-3xl mx-auto text-[#F9F8F6]">
              {isChunkError ? "🔄" : "⚠️"}
            </div>
            <h2 className="text-xl font-bold text-[#F9F8F6]">
              {isChunkError ? "Mise à jour détectée (تحديث جديد)" : "Une erreur inattendue est survenue"}
            </h2>
            <p className="text-xs text-[#D8D2C5] leading-relaxed">
              {isChunkError
                ? "Une nouvelle version du système ميزان est disponible. Clique ci-dessous pour recharger."
                : "حدث خطأ غير متوقع في واجهة النظام. تم التقييد التلقائي لمنع توقف باقي الخدمات."}
            </p>

            {this.state.error && (
              <div className="bg-[#16212b] p-3 rounded-xl border border-[#2e4052] font-mono text-[10px] text-rose-400 text-left overflow-x-auto max-h-24">
                {this.state.error.toString()}
              </div>
            )}

            <button
              onClick={() => {
                sessionStorage.removeItem("mizan_chunk_reload_time");
                window.location.reload();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] hover:from-[#7a4d3f] hover:to-[#8D5B4C] text-[#F9F8F6] font-extrabold text-xs rounded-xl shadow-lg shadow-[#8D5B4C]/25 transition-all active:scale-95 border border-[#B86B53]/30"
            >
              Recharger la page (إعادة تحميل الصفحة)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
