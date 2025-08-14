import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ item }) {
  return (
    <Link href={`/properties/${item._id}`} className="rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      <div className="relative h-44">
        <Image src={item.images?.[0] || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"} alt={item.title} fill className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-semibold line-clamp-1">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.location?.city}, {item.location?.state}</p>
        <p className="text-blue-600 font-bold">₹{Number(item.price).toLocaleString("en-IN")}{item.type === 'rent' && <span className="text-xs text-gray-500">/mo</span>}</p>
        <p className="text-xs text-gray-600">{item.bedrooms} bed · {item.bathrooms} bath · {item.area} sqft</p>
      </div>
    </Link>
  );
}
