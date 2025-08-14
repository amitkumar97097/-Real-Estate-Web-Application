import { useState } from "react";
import { Properties } from "../../utils/api";

export default function AddProperty() {
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    price: 0,
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    amenities: [],
    location: { address: "", city: "", state: "" },
  });
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setMsg("");
    try {
      await Properties.createFormData(payload, files);
      setMsg("Submitted for approval");
    } catch (e) {
      setMsg("Failed: " + (e.response?.data?.error || "Unknown"));
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-3 max-w-2xl">
      <h1 className="text-2xl font-semibold">Add Listing</h1>
      {msg && <p className="text-sm text-gray-600">{msg}</p>}
      <input className="border p-2 rounded" placeholder="Title" value={payload.title} onChange={(e)=>setPayload({...payload, title:e.target.value})}/>
      <textarea className="border p-2 rounded" placeholder="Description" value={payload.description} onChange={(e)=>setPayload({...payload, description:e.target.value})}/>

      <div className="grid grid-cols-3 gap-2">
        <input className="border p-2 rounded" type="number" placeholder="Price" value={payload.price} onChange={(e)=>setPayload({...payload, price:Number(e.target.value)})}/>
        <select className="border p-2 rounded" value={payload.type} onChange={(e)=>setPayload({...payload, type:e.target.value})}>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <input className="border p-2 rounded" type="number" placeholder="Area (sqft)" value={payload.area} onChange={(e)=>setPayload({...payload, area:Number(e.target.value)})}/>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <input className="border p-2 rounded" type="number" placeholder="Bedrooms" value={payload.bedrooms} onChange={(e)=>setPayload({...payload, bedrooms:Number(e.target.value)})}/>
        <input className="border p-2 rounded" type="number" placeholder="Bathrooms" value={payload.bathrooms} onChange={(e)=>setPayload({...payload, bathrooms:Number(e.target.value)})}/>
        <input className="border p-2 rounded" placeholder="Amenities (comma)" onChange={(e)=>setPayload({...payload, amenities:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})}/>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <input className="border p-2 rounded" placeholder="Address" value={payload.location.address} onChange={(e)=>setPayload({...payload, location:{...payload.location, address:e.target.value}})}/>
        <input className="border p-2 rounded" placeholder="City" value={payload.location.city} onChange={(e)=>setPayload({...payload, location:{...payload.location, city:e.target.value}})}/>
        <input className="border p-2 rounded" placeholder="State" value={payload.location.state} onChange={(e)=>setPayload({...payload, location:{...payload.location, state:e.target.value}})}/>
      </div>

      <input type="file" multiple onChange={(e)=>setFiles(Array.from(e.target.files||[]))}/>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
    </form>
  );
}

