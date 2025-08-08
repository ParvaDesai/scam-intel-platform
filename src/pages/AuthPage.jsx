import { useState } from "react";
import AuthCard from "../components/AuthCard.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/button.jsx";

export default function AuthPage() {
  const [tab, setTab] = useState("login"); // "login" | "signup"

  return (
    <div className="min-h-[70vh] grid place-items-center p-4">
      <div className="w-full max-w-md">
        {/* Tabs */}
        <div className="mb-4 flex border rounded-xl overflow-hidden bg-white">
          <button
            className={`flex-1 py-2 text-sm ${tab === "login" ? "bg-black text-white" : "hover:bg-zinc-100"}`}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-sm ${tab === "signup" ? "bg-black text-white" : "hover:bg-zinc-100"}`}
            onClick={() => setTab("signup")}
          >
            Create Account
          </button>
        </div>

        {tab === "login" ? <LoginForm /> : <SignupForm onSwitch={() => setTab("login")} />}
      </div>
    </div>
  );
}

function LoginForm() {
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.email) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Login UI submitted:\n${JSON.stringify(form, null, 2)}`);
    }, 500);
  }

  return (
    <AuthCard title="Welcome back" subtitle="Login to report scams and manage alerts">
      <form onSubmit={onSubmit} className="grid gap-3">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        <label className="grid gap-1">
          <span className="text-sm font-medium">Password</span>
          <div className="flex items-stretch gap-2">
            <input
              className="border rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500"
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              className="px-3 border rounded-md text-sm hover:bg-zinc-100"
              onClick={() => setShowPwd((v) => !v)}
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
        </label>

        <label className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => setForm({ ...form, remember: e.target.checked })}
          />
          <span className="text-sm text-zinc-700">Remember me</span>
        </label>

        <Button disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>

        <button type="button" className="text-sm text-blue-600 hover:underline justify-self-start">
          Forgot password?
        </button>
      </form>
    </AuthCard>
  );
}

function SignupForm({ onSwitch }) {
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.name) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    if (form.password && form.password.length < 8) e.password = "Min 8 characters";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Signup UI submitted:\n${JSON.stringify(form, null, 2)}`);
      onSwitch?.();
    }, 700);
  }

  return (
    <AuthCard title="Create your account" subtitle="Join the community-driven defense">
      <form onSubmit={onSubmit} className="grid gap-3">
        <Input
          label="Full Name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        <div className="grid gap-1">
          <span className="text-sm font-medium">Password</span>
          <div className="flex items-stretch gap-2">
            <input
              className="border rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500"
              type={showPwd ? "text" : "password"}
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              className="px-3 border rounded-md text-sm hover:bg-zinc-100"
              onClick={() => setShowPwd((v) => !v)}
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          error={errors.confirm}
        />

        <Button disabled={loading}>{loading ? "Creating…" : "Create account"}</Button>

        <p className="text-sm text-zinc-600 text-center">
          Already have an account?{" "}
          <button type="button" onClick={onSwitch} className="text-blue-600 hover:underline">
            Log in
          </button>
        </p>
      </form>
    </AuthCard>
  );
}
