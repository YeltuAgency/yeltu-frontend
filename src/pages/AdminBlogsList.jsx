import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminBlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ NEW STATES
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/blogs");
      const list = res.data || [];
      setBlogs(list);
      setFiltered(list);
    } catch (err) {
      console.error(err);
      alert("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ⭐ FILTERING LOGIC
  useEffect(() => {
    let result = blogs;

    // Search filter by EN title
    if (search.trim()) {
      result = result.filter((b) =>
        b.translations?.en?.title
          ?.toLowerCase()
          .includes(search.trim().toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((b) => b.category === categoryFilter);
    }

    setFiltered(result);
  }, [search, categoryFilter, blogs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await api.delete(`/admin/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleToggleFeatured = async (id, currentValue) => {
    try {
      await api.patch(`/admin/blogs/${id}/featured`, {
        featured: !currentValue,
      });

      setBlogs((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, featured: !currentValue } : b
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update featured");
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: 22 }}>Blogs</h1>
        <button
          onClick={() => navigate("/admin/blogs/new")}
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
          + New Blog
        </button>
      </div>

      {/* ⭐ SEARCH + CATEGORY FILTER */}
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 10px",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            width: 250,
          }}
        />

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: "8px 10px",
            border: "1px solid #d1d5db",
            borderRadius: 6,
          }}
        >
          <option value="all">All Categories</option>
          <option value="design">Design</option>
          <option value="seo">SEO</option>
          <option value="marketing">Marketing</option>
          <option value="technology">Technology</option>
          <option value="development">Development</option>
          <option value="other">Other</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No blogs found.</p>
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
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((blog) => (
                <tr key={blog._id}>
                  
                  {/* Title */}
                  <td style={tdStyle}>
                    {blog.translations?.en?.title || "(no title)"}
                  </td>

                  {/* ⭐ CATEGORY */}
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 20,
                        background: "#eef2ff",
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    >
                      {blog.category || "other"}
                    </span>
                  </td>

                  {/* Featured */}
                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        handleToggleFeatured(blog._id, blog.featured)
                      }
                      style={{
                        padding: "4px 8px",
                        borderRadius: 999,
                        border: "none",
                        background: blog.featured ? "#16a34a" : "#e5e7eb",
                        color: blog.featured ? "white" : "#111827",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      {blog.featured ? "Yes" : "No"}
                    </button>
                  </td>

                  {/* Image */}
                  <td style={tdStyle}>
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt="blog"
                        style={{
                          width: 70,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* Actions */}
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() =>
                          navigate(`/admin/blogs/${blog._id}/edit`)
                        }
                        style={btnSmall("#2563eb")}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(blog._id)}
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
