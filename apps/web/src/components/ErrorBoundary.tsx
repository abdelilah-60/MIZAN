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
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-center font-sans">
          <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-8 max-w-md w-full space-y-4 shadow-2xl backdrop-blur-xl">
            <div className="h-16 w-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-3xl mx-auto text-rose-400">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-white">
              Une erreur inattendue est survenue
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              حدث خطأ غير متوقع في واجهة النظام. تم التقييد التلقائي لمنع توقف باقي الخدمات.
            </p>

            {this.state.error && (
              <div className="bg-slate-950 p-3 rounded-xl border border-white/5 font-mono text-[10px] text-rose-400/90 text-left overflow-x-auto max-h-24">
                {this.state.error.toString()}
              </div>
            )}

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all active:scale-95"
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
