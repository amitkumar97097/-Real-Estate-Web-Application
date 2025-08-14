import { useEffect, useState } from "react";
import { Properties } from "../../utils/api";
import PropertyCard from "../../components/PropertyCard";

export default function PropertiesPage() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ city: "", type: "", min: "", max: "", beds: "" });

  useEffect(() => { fetch(); }, []);
  const fetch = async () => {
    const { data } = await Properties.list(filters);
    setItems(data);
  };

  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-5 gap-2">
        <input className="border p-2 rounded" placeholder="City" value={filters.city} onChange={(e)=>setFilters({...filters, city:e.target.value})}/>
        <select className="border p-2 rounded" value={filters.type} onChange={(e)=>setFilters({...filters, type:e.target.value})}>
          <option value="">Any</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <input className="border p-2 rounded" placeholder="Min" value={filters.min} onChange={(e)=>setFilters({...filters, min:e.target.value})}/>
        <input className="border p-2 rounded" placeholder="Max" value={filters.max} onChange={(e)=>setFilters({...filters, max:e.target.value})}/>
        <select className="border p-2 rounded" value={filters.beds} onChange={(e)=>setFilters({...filters, beds:e.target.value})}>
          <option value="">Beds</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <button onClick={fetch} className="px-3 py-2 bg-blue-600 text-white rounded">Apply</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => <PropertyCard key={it._id} item={it} />)}
        {items.length === 0 && <p className="text-sm text-gray-500">No results</p>}
      </div>
    </div>
  );
}
