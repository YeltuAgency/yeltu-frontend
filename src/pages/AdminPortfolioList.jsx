import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminPortfolioList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/portfolio");
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load portfolio items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await api.delete(`/admin/portfolio/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleToggleFeatured = async (id, currentValue) => {
    try {
      await api.patch(`/admin/portfolio/${id}/featured`, {
        featured: !currentValue,
      });
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, featured: !currentValue } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update featured status");
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: 22 }}>Portfolio Items</h1>
        <button
          onClick={() => navigate("/admin/portfolio/new")}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          + New Project
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No portfolio items yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Title (EN)</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Featured</th>
                <th style={thStyle}>Demo URL</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td style={tdStyle}>{item.translations?.en?.title}</td>
                  <td style={tdStyle}>{item.category || "-"}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        handleToggleFeatured(item._id, item.featured)
                      }
                      style={{
                        padding: "4px 8px",
                        borderRadius: 999,
                        border: "none",
                        background: item.featured ? "#16a34a" : "#e5e7eb",
                        color: item.featured ? "white" : "#111827",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      {item.featured ? "Yes" : "No"}
                    </button>
                  </td>
                  <td style={tdStyle}>
                    {item.demoUrl ? (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#2563eb" }}
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() =>
                          navigate(`/admin/portfolio/${item._id}/edit`)
                        }
                        style={btnSmall("#2563eb")}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={btnSmall("#dc2626")}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "8px 10px",
  borderBottom: "1px solid #e5e7eb",
  fontWeight: 600,
};

const tdStyle = {
  padding: "8px 10px",
  borderBottom: "1px solid #f3f4f6",
};

const btnSmall = (bg) => ({
  padding: "4px 10px",
  borderRadius: 6,
  border: "none",
  background: bg,
  color: "white",
  cursor: "pointer",
  fontSize: 12,
});
