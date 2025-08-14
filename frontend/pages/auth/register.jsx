import { useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "../../utils/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await Auth.register(form);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (e) {
      setError(e.response?.data?.error || "Failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto grid gap-3">
      <h1 className="text-2xl font-semibold">Create account</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}/>
      <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}/>
      <input className="border p-2 rounded" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})}/>
      <select className="border p-2 rounded" value={form.role} onChange={(e)=>setForm({...form, role:e.target.value})}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="agent">Agent</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign up</button>
    </form>
  );
}
