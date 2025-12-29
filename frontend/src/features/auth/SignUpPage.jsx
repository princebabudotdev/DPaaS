import { useState } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    AtSign,
    Github,
} from "lucide-react";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-xl p-8">

                {/* Header */}
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white text-center">
                    Create account
                </h1>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                    Sign up to get started
                </p>

                {/* Full Name */}
                <div className="mt-8 relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Full name"
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Username */}
                <div className="mt-4 relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Email */}
                <div className="mt-4 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Password */}
                <div className="mt-4 relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent py-3 pl-10 pr-10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* Sign Up Button */}
                <button className="mt-8 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition">
                    Create account
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                    <div className="h-px w-full bg-slate-200 dark:bg-slate-700" />
                    <span className="text-xs text-slate-500">OR</span>
                    <div className="h-px w-full bg-slate-200 dark:bg-slate-700" />
                </div>

                {/* Google */}
                <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 dark:border-slate-700 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="h-5 w-5"
                    />
                    Continue with Google
                </button>

                {/* GitHub */}
                <button className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 transition">
                    <Github size={18} />
                    Continue with GitHub
                </button>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-slate-500">
                    Already have an account?{" "}
                    <span className="text-indigo-600 hover:underline cursor-pointer">
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
}