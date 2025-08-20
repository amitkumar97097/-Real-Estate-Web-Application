import { useEffect, useState } from "react";
import { Admin } from "../utils/api";

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approving, setApproving] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await Admin.pending();
      setItems(data);
    } catch (err) {
      setError("Failed to load listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    if (!confirm("Are you sure you want to approve this listing?")) return;
    setApproving(id);
    try {
      await Admin.approve(id);
      await load();
    } catch (err) {
      alert("Approval failed. Please try again.");
    } finally {
      setApproving(null);
    }
  };

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Pending Listings</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading &&
        items.map((it) => (
          <div
            key={it._id}
            className="flex items-center gap-3 border rounded-xl p-3 shadow-sm"
          >
            <img
              src={it.images?.[0] || "/placeholder.png"}
              alt={it.title}
              className="h-16 w-24 object-cover rounded"
            />
            <div className="flex-1">
              <div className="font-medium">{it.title}</div>
              <div className="text-xs text-gray-500">
                {it.location?.city}, {it.location?.state}
              </div>
            </div>
            <button
              onClick={() => approve(it._id)}
              disabled={approving === it._id}
              className={`px-3 py-1 rounded text-white ${
                approving === it._id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {approving === it._id ? "Approving..." : "Approve"}
            </button>
          </div>
        ))}

      {!loading && items.length === 0 && (
        <p className="text-sm text-gray-500">Nothing pending</p>
      )}
    </div>
  );
}
