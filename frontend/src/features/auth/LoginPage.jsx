import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Github } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthApis from "../../apis/AuthApis";
import { UseData } from "../../context/MainContext";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setPopup} = UseData()
  // console.log(setPopup);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ handle input change
  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for backend

      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const res = await AuthApis.LoginWithEmailAndPassword(payload);

      console.log("Login success:", res.data);

      // redirect after login
      navigate("/dashboard");
    } catch (error) {
      console.log("Login error:", error.response?.data?.message || error.message);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white text-center">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Sign in to your account
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mt-8 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Email address"
              required
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="mt-4 relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Password"
              required
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

          {/* Forgot Password */}
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {loading ? <div className="h-full w-full flex items-center justify-center"> 
              <div className="h-5 w-5 rounded-full border-2 border-t-transparent animate-spin duration-1000 ease-linear"></div>
            </div> : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px w-full bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-slate-500">OR</span>
          <div className="h-px w-full bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Google */}
        <button
          onClick={AuthApis.LoginWithGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 dark:border-slate-700 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Continue with Google
        </button>

        {/* GitHub */}
        <button
          onClick={AuthApis.LoginWithGithub}
          className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 transition"
        >
          <Github size={18} />
          Continue with GitHub
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
