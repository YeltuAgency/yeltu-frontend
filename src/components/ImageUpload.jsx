import { useState } from "react";

export default function ImageUpload({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      if (result.secure_url) {
        onChange(result.secure_url);
      } else {
        alert("Upload failed");
        console.log(result);
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert("Upload failed");
    }

    setUploading(false);
  };

  return (
    <div>
      <label style={{ fontSize: 14, marginBottom: 4, display: "block" }}>
        {label}
      </label>

      {value && (
        <img
          src={value}
          alt="Preview"
          style={{
            width: 200,
            borderRadius: 8,
            marginBottom: 10,
            border: "1px solid #ccc",
          }}
        />
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {uploading && <p>Uploading...</p>}
    </div>
  );
}
