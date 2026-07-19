import { useState } from "react";

interface AuthScreenProps {
  onLoginSuccess: (token: string, user: { id: string; fullName: string; email: string }) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    farmName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          farmName: formData.farmName,
        };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMsg = "Authentication failed";
        if (data.error) {
          errorMsg = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
        } else if (data.message) {
          errorMsg = data.message;
        }
        throw new Error(errorMsg);
      }

      if (isLogin) {
        onLoginSuccess(data.token, data.user);
      } else {
        // Auto-switch to login after register
        setIsLogin(true);
        setFormData({ fullName: "", email: formData.email, password: "", farmName: "" }); // clear password/name
        setError("Registration successful! Please log in."); // not an error, just using the state to show msg
      }
    } catch (err: any) {
      let errorMsg = "حدث خطأ أثناء الاتصال بالخادم";
      
      if (err.message) {
        try {
          const parsed = JSON.parse(err.message);
          errorMsg = parsed.message || parsed.error || err.message;
        } catch {
          errorMsg = err.message;
        }
      }
      
      if (err.response?.data) {
        const data = err.response.data;
        if (data.message) errorMsg = data.message;
        else if (data.error) errorMsg = data.error;
        else if (typeof data === 'string') {
           try { errorMsg = JSON.parse(data).message; } 
           catch { errorMsg = data; }
        }
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-500/20 mb-4">
            M
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {isLogin ? "Welcome Back" : "Join Mizan Platform"}
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            {isLogin ? "Sign in to access your dashboard" : "Create an account to manage your fields"}
          </p>
        </div>

        {error && (
          <div className={`p-3 rounded-xl text-sm mb-6 ${error.includes("successful") ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="space-y-1">
                <label className="text-xs text-slate-400 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmed Hassan"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 ml-1">Nom de l'exploitation (اسم الضيعة)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Domaine de l'Olivier"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs text-slate-400 ml-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. user@mizan.com"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 ml-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98] mt-4"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
