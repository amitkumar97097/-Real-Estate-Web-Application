import { useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "../../utils/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await Auth.login(form);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (e) {
      setError(e.response?.data?.error || "Failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto grid gap-3">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}/>
      <input className="border p-2 rounded" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})}/>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Continue</button>
    </form>
  );
}

---
