import { useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "../../utils/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await Auth.register(form);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (e) {
      setError(e.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-2xl shadow-md grid gap-4">
      <h1 className="text-2xl font-bold text-center">Create an Account</h1>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <input
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email Address"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        type="password"
        minLength={6}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <select
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="agent">Agent</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <p className="text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/auth/login")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </form>
  );
}
