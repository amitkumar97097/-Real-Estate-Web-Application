import Link from "next/link";

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-3xl font-bold">Find your next home</h1>
        <p className="text-gray-600 mt-2">Search, list, and manage properties for rent and sale.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/properties" className="px-4 py-2 rounded-xl bg-blue-600 text-white">Explore</Link>
          <Link href="/properties/add" className="px-4 py-2 rounded-xl border">List a Property</Link>
        </div>
      </div>
      <div className="rounded-2xl border h-72 grid place-items-center text-gray-500">Map / Hero Image</div>
    </div>
  );
}
