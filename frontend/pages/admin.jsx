import { useEffect, useState } from "react";
import { Admin } from "../utils/api";

export default function AdminPage(){
  const [items, setItems] = useState([]);
  const load = async () => { const {data} = await Admin.pending(); setItems(data); };
  useEffect(()=>{ load(); }, []);

  const approve = async (id) => { await Admin.approve(id); await load(); };

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Pending Listings</h1>
      {items.map((it)=> (
        <div key={it._id} className="flex items-center gap-3 border rounded-xl p-3">
          <img src={it.images?.[0]} className="h-16 w-24 object-cover rounded"/>
          <div className="flex-1">
            <div className="font-medium">{it.title}</div>
            <div className="text-xs text-gray-500">{it.location?.city}, {it.location?.state}</div>
          </div>
          <button onClick={()=>approve(it._id)} className="px-3 py-1 rounded bg-emerald-600 text-white">Approve</button>
        </div>
      ))}
      {items.length===0 && <p className="text-sm text-gray-500">Nothing pending</p>}
    </div>
  );
}

---
