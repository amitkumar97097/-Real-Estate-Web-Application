import Link from "next/link";

export default function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center py-12">
      {/* Left Content */}
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Find your <span className="text-blue-600">next home</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-md">
          Search, list, and manage properties for rent and sale with ease.  
          Start exploring today!
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/properties"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
          >
            Explore
          </Link>
          <Link
            href="/properties/add"
            className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:border-blue-600 hover:text-blue-600 transition"
          >
            List a Property
          </Link>
        </div>
      </div>

      {/* Right Content (Hero Image / Map placeholder) */}
      <div className="rounded-2xl border h-80 bg-gradient-to-br from-slate-100 to-slate-200 grid place-items-center text-gray-500 text-lg shadow-inner">
        Map / Hero Image
      </div>
    </section>
  );
}
