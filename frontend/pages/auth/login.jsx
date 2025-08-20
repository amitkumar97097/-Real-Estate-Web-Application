import { useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "../../utils/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await Auth.login(form);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (e) {
      setError(e.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Sign in to your account
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>
        )}

        {/* Email */}
        <input
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Password */}
        <input
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Continue"}
        </button>

        {/* Extra Links */}
        <p className="text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
