import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute w-72 h-72 bg-purple-600/30 rounded-full blur-3xl top-10 left-10 animate-float"></div>
      <div className="absolute w-72 h-72 bg-pink-600/30 rounded-full blur-3xl bottom-10 right-10 animate-float delay-2000"></div>

      {/* Error Card */}
      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-white/70 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition"
          >
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
