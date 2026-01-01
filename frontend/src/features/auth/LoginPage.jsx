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
  <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
    <div className="
      w-full max-w-md rounded-xl
      bg-[#010409]
      border border-neutral-800
      p-8
    ">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-neutral-100 text-center">
        Welcome back
      </h1>
      <p className="mt-2 text-center text-sm text-neutral-400">
        Sign in to your DPaaS account
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mt-8">
        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Email address"
            required
            className="
              w-full rounded-md
              border border-neutral-800
              bg-[#0D1117]
              py-3 pl-10 pr-4 text-sm
              text-neutral-100
              placeholder:text-neutral-500
              focus:outline-none
              focus:ring-2 focus:ring-indigo-500/40
            "
          />
        </div>

        {/* Password */}
        <div className="mt-4 relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Password"
            required
            className="
              w-full rounded-md
              border border-neutral-800
              bg-[#0D1117]
              py-3 pl-10 pr-10 text-sm
              text-neutral-100
              placeholder:text-neutral-500
              focus:outline-none
              focus:ring-2 focus:ring-indigo-500/40
            "
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-neutral-500 hover:text-neutral-300
            "
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="mt-3 flex justify-end">
          <NavLink
            to="/forgot-password"
            className="text-xs font-medium text-indigo-400 hover:underline"
          >
            Forgot password?
          </NavLink>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-6 w-full rounded-md
            bg-indigo-600 py-3
            text-sm font-semibold text-white
            hover:bg-indigo-500
            transition disabled:opacity-60
          "
        >
          {loading ? (
            <div className="flex justify-center">
              <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            </div>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px w-full bg-neutral-800" />
        <span className="text-xs text-neutral-500">OR</span>
        <div className="h-px w-full bg-neutral-800" />
      </div>

      {/* Google */}
      <button
        onClick={AuthApis.LoginWithGoogle}
        className="
          flex w-full items-center justify-center gap-3
          rounded-md border border-neutral-800
          py-3 text-sm font-medium
          text-neutral-200
          hover:bg-neutral-900 transition
        "
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
        className="
          mt-3 flex w-full items-center justify-center gap-3
          rounded-md bg-neutral-900
          py-3 text-sm font-medium
          text-neutral-100
          hover:bg-neutral-800 transition
        "
      >
        <Github size={18} />
        Continue with GitHub
      </button>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-neutral-500">
        Don’t have an account?{" "}
        <NavLink
          to="/signup"
          className="text-indigo-400 hover:underline"
        >
          Sign up
        </NavLink>
      </p>
    </div>
  </div>
);

}
