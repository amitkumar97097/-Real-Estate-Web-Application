import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const onLogout = () => { localStorage.removeItem("token"); router.push("/auth/login"); };
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-semibold text-lg">EstatePro</Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/properties">Explore</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/properties/add">Add</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/chat">Chat</Link>
        </nav>
        <div className="flex-1" />
        <Link href="/auth/login" className="px-3 py-1 border rounded-lg">Sign in</Link>
        <button onClick={onLogout} className="px-3 py-1 border rounded-lg ml-2">Logout</button>
      </div>
    </header>
  );
}
