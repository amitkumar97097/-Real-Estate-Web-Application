import { useState, useRef } from "react";
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
  const fileInputRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await Properties.createFormData(payload, files);
      setMsg("✅ Submitted for approval");

      // reset form after success
      setPayload({
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
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setMsg(
        "❌ Failed: " +
          (error.response?.data?.error || error.message || "Unknown error")
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-4 max-w-2xl p-6 border rounded-xl shadow bg-white"
    >
      <h1 className="text-2xl font-semibold mb-2">Add Property Listing</h1>

      {msg && (
        <p
          className={`text-sm font-medium ${
            msg.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {msg}
        </p>
      )}

      {/* Title */}
      <label className="grid gap-1">
        <span className="font-medium">Title</span>
        <input
          className="border p-2 rounded"
          placeholder="Property Title"
          value={payload.title}
          onChange={(e) => setPayload({ ...payload, title: e.target.value })}
          required
        />
      </label>

      {/* Description */}
      <label className="grid gap-1">
        <span className="font-medium">Description</span>
        <textarea
          className="border p-2 rounded"
          placeholder="Property Description"
          value={payload.description}
          onChange={(e) =>
            setPayload({ ...payload, description: e.target.value })
          }
          rows={3}
        />
      </label>

      {/* Price, Type, Area */}
      <div className="grid grid-cols-3 gap-3">
        <label className="grid gap-1">
          <span className="font-medium">Price</span>
          <input
            className="border p-2 rounded"
            type="number"
            value={payload.price}
            onChange={(e) =>
              setPayload({ ...payload, price: Number(e.target.value) })
            }
            required
          />
        </label>

        <label className="grid gap-1">
          <span className="font-medium">Type</span>
          <select
            className="border p-2 rounded"
            value={payload.type}
            onChange={(e) => setPayload({ ...payload, type: e.target.value })}
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </label>

        <label className="grid gap-1">
          <span className="font-medium">Area (sqft)</span>
          <input
            className="border p-2 rounded"
            type="number"
            value={payload.area}
            onChange={(e) =>
              setPayload({ ...payload, area: Number(e.target.value) })
            }
          />
        </label>
      </div>

      {/* Bedrooms, Bathrooms, Amenities */}
      <div className="grid grid-cols-3 gap-3">
        <label className="grid gap-1">
          <span className="font-medium">Bedrooms</span>
          <input
            className="border p-2 rounded"
            type="number"
            value={payload.bedrooms}
            onChange={(e) =>
              setPayload({ ...payload, bedrooms: Number(e.target.value) })
            }
          />
        </label>

        <label className="grid gap-1">
          <span className="font-medium">Bathrooms</span>
          <input
            className="border p-2 rounded"
            type="number"
            value={payload.bathrooms}
            onChange={(e) =>
              setPayload({ ...payload, bathrooms: Number(e.target.value) })
            }
          />
        </label>

        <label className="grid gap-1">
          <span className="font-medium">Amenities</span>
          <input
            className="border p-2 rounded"
            placeholder="Comma separated"
            value={payload.amenities.join(", ")}
            onChange={(e) =>
              setPayload({
                ...payload,
                amenities: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </label>
      </div>

      {/* Location */}
      <div className="grid grid-cols-3 gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Address"
          value={payload.location.address}
          onChange={(e) =>
            setPayload({
              ...payload,
              location: { ...payload.location, address: e.target.value },
            })
          }
        />
        <input
          className="border p-2 rounded"
          placeholder="City"
          value={payload.location.city}
          onChange={(e) =>
            setPayload({
              ...payload,
              location: { ...payload.location, city: e.target.value },
            })
          }
        />
        <input
          className="border p-2 rounded"
          placeholder="State"
          value={payload.location.state}
          onChange={(e) =>
            setPayload({
              ...payload,
              location: { ...payload.location, state: e.target.value },
            })
          }
        />
      </div>

      {/* File Upload with Preview */}
      <label className="grid gap-1">
        <span className="font-medium">Upload Images</span>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="p-2 border rounded"
        />
      </label>
      {files.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-2">
          {files.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-24 object-cover rounded border"
            />
          ))}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow mt-2"
      >
        Submit
      </button>
    </form>
  );
}
