import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ item }) {
  const imageUrl =
    item?.images?.[0] ||
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85";

  return (
    <Link
      href={`/properties/${item._id}`}
      className="rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition bg-white flex flex-col"
    >
      {/* Property Image */}
      <div className="relative h-44 w-full">
        <Image
          src={imageUrl}
          alt={item?.title || "Property"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
          priority={false}
        />
      </div>

      {/* Property Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        {/* Title */}
        <h3 className="font-semibold text-base text-gray-800 line-clamp-1">
          {item?.title || "Untitled Property"}
        </h3>

        {/* Location */}
        <p className="text-xs text-gray-500">
          {item?.location?.city || "Unknown City"},{" "}
          {item?.location?.state || "Unknown State"}
        </p>

        {/* Price */}
        <p className="text-blue-600 font-bold mt-1">
          ₹{Number(item?.price || 0).toLocaleString("en-IN")}
          {item?.type === "rent" && (
            <span className="text-xs text-gray-500">/mo</span>
          )}
        </p>

        {/* Details */}
        <p className="text-xs text-gray-600 mt-auto">
          {item?.bedrooms || "?"} bed · {item?.bathrooms || "?"} bath ·{" "}
          {item?.area || "?"} sqft
        </p>
      </div>
    </Link>
  );
}
