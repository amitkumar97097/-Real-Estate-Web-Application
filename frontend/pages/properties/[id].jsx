import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Properties } from "../../utils/api";

function toEMI(p, rate, years){
  const r = rate/12/100; const n = years*12; if(!r) return p/n; return (p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
}

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [emiForm, setEmiForm] = useState({ principal: 0, rate: 8.5, years: 20 });

  useEffect(() => { if(id) Properties.get(id).then(({data}) => { setItem(data); setEmiForm(f=>({...f, principal: data.type==='rent'? data.price*120 : data.price })); }); }, [id]);
  const emi = useMemo(()=> Math.round(toEMI(emiForm.principal, emiForm.rate, emiForm.years)), [emiForm]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-3 gap-2">
        <img className="rounded-xl w-full h-64 object-cover md:col-span-2" src={item.images?.[0]} />
        <img className="rounded-xl w-full h-64 object-cover" src={item.images?.[1] || item.images?.[0]} />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{item.title}</h1>
          <p className="text-sm text-gray-500">{item.location?.city}, {item.location?.state}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">₹{Number(item.price).toLocaleString("en-IN")}{item.type==='rent' && <span className="text-sm text-gray-500">/mo</span>}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3 items-end border rounded-xl p-3">
        <div>
          <label className="text-xs text-gray-500">Principal (₹)</label>
          <input className="border p-2 rounded w-full" type="number" value={emiForm.principal} onChange={(e)=>setEmiForm({...emiForm, principal:Number(e.target.value)})}/>
        </div>
        <div>
          <label className="text-xs text-gray-500">Rate (% p.a.)</label>
          <input className="border p-2 rounded w-full" type="number" step="0.1" value={emiForm.rate} onChange={(e)=>setEmiForm({...emiForm, rate:Number(e.target.value)})}/>
        </div>
        <div>
          <label className="text-xs text-gray-500">Tenure (years)</label>
          <input className="border p-2 rounded w-full" type="number" value={emiForm.years} onChange={(e)=>setEmiForm({...emiForm, years:Number(e.target.value)})}/>
        </div>
        <div>
          <div className="text-xs text-gray-500">Estimated EMI</div>
          <div className="text-2xl font-bold">₹{emi.toLocaleString("en-IN")}</div>
        </div>
      </div>

      <p className="text-sm text-gray-700">{item.description || "Beautiful property with modern amenities and great connectivity."}</p>
    </div>
  );
}
