import "../styles/globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "My App",
  description: "Next.js application with Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
