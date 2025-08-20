import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Properties } from "../../utils/api";
import Image from "next/image";

function toEMI(p, rate, years) {
  const r = rate / 12 / 100;
  const n = years * 12;
  if (!r) return p / n;
  return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [emiForm, setEmiForm] = useState({ principal: 0, rate: 8.5, years: 20 });

  useEffect(() => {
    if (id)
      Properties.get(id).then(({ data }) => {
        setItem(data);
        setEmiForm(f => ({
          ...f,
          principal: data.type === "rent" ? data.price * 120 : data.price
        }));
      });
  }, [id]);

  const emi = useMemo(() => Math.round(toEMI(emiForm.principal, emiForm.rate, emiForm.years)), [emiForm]);

  if (!item) return <p className="text-center py-10">Loading property details...</p>;

  return (
    <div className="max-w-6xl mx-auto grid gap-6 p-4">
      {/* Images */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2 h-72">
          <Image
            src={item.images?.[0] || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"}
            alt={item.title}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <div className="relative h-72">
          <Image
            src={item.images?.[1] || item.images?.[0] || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"}
            alt={item.title}
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Title and price */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">{item.title}</h1>
          <p className="text-sm text-gray-500">{item.location?.city}, {item.location?.state}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">
            ₹{Number(item.price).toLocaleString("en-IN")}
            {item.type === "rent" && <span className="text-sm text-gray-500"> /mo</span>}
          </div>
        </div>
      </div>

      {/* EMI Calculator */}
      <div className="grid md:grid-cols-4 gap-4 border rounded-xl p-4 bg-white shadow-sm">
        <div>
          <label className="text-xs text-gray-500">Principal (₹)</label>
          <input
            className="border p-2 rounded w-full"
            type="number"
            value={emiForm.principal}
            onChange={(e) => setEmiForm({ ...emiForm, principal: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Rate (% p.a.)</label>
          <input
            className="border p-2 rounded w-full"
            type="number"
            step="0.1"
            value={emiForm.rate}
            onChange={(e) => setEmiForm({ ...emiForm, rate: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Tenure (years)</label>
          <input
            className="border p-2 rounded w-full"
            type="number"
            value={emiForm.years}
            onChange={(e) => setEmiForm({ ...emiForm, years: Number(e.target.value) })}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-xs text-gray-500">Estimated EMI</span>
          <span className="text-2xl font-bold text-green-600">₹{emi.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-sm text-gray-700">{item.description || "Beautiful property with modern amenities and great connectivity."}</p>
      </div>
    </div>
  );
}
