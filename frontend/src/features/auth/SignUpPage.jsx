import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, AtSign, Github } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthApis from "../../apis/AuthApis";
import { UseData } from "../../context/MainContext";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setPopup } = UseData();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
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
      const payload = {
        email: formData.email,
        fullname: formData.fullname,
        username: formData.username,
        password: formData.password,
      };

      const res = await AuthApis.SignUpWithEmailAndPassword(payload);

      console.log("Signup success:", res.data);

      // redirect after signup
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setPopup(error?.response?.data?.errors?.password);
      console.log();
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
    <div
      className="
        w-full max-w-md rounded-xl
        bg-[#010409]
        border border-neutral-800
        p-8
      "
    >
      {/* Header */}
      <h1 className="text-2xl font-semibold text-neutral-100 text-center">
        Create account
      </h1>
      <p className="mt-2 text-center text-sm text-neutral-400">
        Sign up to get started with DPaaS
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mt-8">
        {/* Full Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleOnChange}
            placeholder="Full name"
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

        {/* Username */}
        <div className="mt-4 relative">
          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleOnChange}
            placeholder="Username"
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

        {/* Email */}
        <div className="mt-4 relative">
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

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-8 w-full rounded-md
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
            "Create account"
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
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="text-indigo-400 hover:underline"
        >
          Sign in
        </NavLink>
      </p>
    </div>
  </div>
);

}
