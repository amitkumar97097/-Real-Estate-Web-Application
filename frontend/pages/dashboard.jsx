import { useEffect, useState } from "react";
import { Properties } from "../utils/api";
import PropertyCard from "../components/PropertyCard";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => { Properties.list().then(({data})=> setItems(data.slice(0,6))); }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Your Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => <PropertyCard key={it._id} item={it} />)}
      </div>
    </div>
  );
}

