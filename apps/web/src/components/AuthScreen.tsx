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
        setIsLogin(true);
        setFormData({ fullName: "", email: formData.email, password: "", farmName: "" });
        setError("Registration successful! Please log in.");
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
    <div className="min-h-screen bg-[#16212b] flex items-center justify-center p-6 text-[#F9F8F6]">
      <div className="w-full max-w-md bg-[#1f2d3a] border border-[#2e4052] rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
        <div className="text-center">
          <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-to-br from-[#8D5B4C] to-[#A0522D] flex items-center justify-center text-2xl font-black text-[#F9F8F6] shadow-xl shadow-[#8D5B4C]/25 border border-[#B86B53]/40 mb-4">
            M
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#F9F8F6]">
            {isLogin ? "Welcome Back" : "Join Mizan Platform"}
          </h1>
          <p className="text-[#A8A093] text-xs mt-1.5 font-medium">
            {isLogin ? "Mizan AgTech &middot; منصة ميزان الفلاحية (الحكيم)" : "Create an account to manage your fields"}
          </p>
        </div>

        {error && (
          <div className={`p-3.5 rounded-xl text-xs font-bold ${error.includes("successful") ? "bg-[#8D5B4C]/20 text-[#F9F8F6] border border-[#8D5B4C]/40" : "bg-red-900/30 text-red-300 border border-red-500/30"}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="space-y-1">
                <label className="text-xs text-[#A8A093] font-bold ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmed Hassan"
                  className="w-full bg-[#16212b] border border-[#2e4052] rounded-xl px-4 py-2.5 text-sm text-[#F9F8F6] focus:outline-none focus:ring-2 focus:ring-[#8D5B4C] transition-all placeholder:text-[#A8A093]/50"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#A8A093] font-bold ml-1">Nom de l'exploitation (اسم الضيعة)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Domaine de l'Olivier"
                  className="w-full bg-[#16212b] border border-[#2e4052] rounded-xl px-4 py-2.5 text-sm text-[#F9F8F6] focus:outline-none focus:ring-2 focus:ring-[#8D5B4C] transition-all placeholder:text-[#A8A093]/50"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs text-[#A8A093] font-bold ml-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. user@mizan.com"
              className="w-full bg-[#16212b] border border-[#2e4052] rounded-xl px-4 py-2.5 text-sm text-[#F9F8F6] focus:outline-none focus:ring-2 focus:ring-[#8D5B4C] transition-all placeholder:text-[#A8A093]/50"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#A8A093] font-bold ml-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-[#16212b] border border-[#2e4052] rounded-xl px-4 py-2.5 text-sm text-[#F9F8F6] focus:outline-none focus:ring-2 focus:ring-[#8D5B4C] transition-all placeholder:text-[#A8A093]/50"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] hover:from-[#7a4d3f] hover:to-[#8D5B4C] disabled:opacity-50 disabled:cursor-not-allowed text-[#F9F8F6] font-extrabold py-3.5 rounded-xl shadow-lg shadow-[#8D5B4C]/25 border border-[#B86B53]/30 transition-all active:scale-[0.98] mt-4"
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
            className="text-xs font-bold text-[#A8A093] hover:text-[#8D5B4C] transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
