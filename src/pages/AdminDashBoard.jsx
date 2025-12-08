import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardStyle = {
    padding: 16,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "white",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };

  const gridStyle = {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    marginBottom: 24,
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  const { 
    totalBlogs, 
    totalPortfolio, 
    featuredBlogs, 
    featuredPortfolio, 
    latestBlog, 
    latestPortfolio 
  } = stats || {};

  const getTitle = (item) =>
    item?.translations?.en?.title ||
    item?.translations?.az?.title ||
    item?.translations?.ru?.title ||
    "Untitled";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Admin Dashboard</h1>
      <p style={{ marginBottom: 24, color: "#6b7280" }}>
        Quick overview of your Yeltu content.
      </p>

      {/* Top Stats */}
      <div style={gridStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
            Total Blogs
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>{totalBlogs ?? 0}</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
            Total Portfolio Projects
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            {totalPortfolio ?? 0}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
            Featured Blogs
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            {featuredBlogs ?? 0}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
            Featured Portfolio
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            {featuredPortfolio ?? 0}
          </div>
        </div>
      </div>

      {/* Latest Entries */}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
        {/* Latest Blog */}
        <div style={cardStyle}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Latest Blog</span>
            {latestBlog?.featured && (
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 999,
                  background: "#f97316",
                  color: "white",
                }}
              >
                Featured
              </span>
            )}
          </div>
          {latestBlog ? (
            <>
              <div style={{ fontSize: 16, marginBottom: 6 }}>
                {getTitle(latestBlog)}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Created:{" "}
                {new Date(latestBlog.createdAt).toLocaleDateString("en-GB")}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: "#9ca3af" }}>
              No blogs created yet.
            </div>
          )}
        </div>

        {/* Latest Portfolio */}
        <div style={cardStyle}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Latest Portfolio Project</span>
            {latestPortfolio?.featured && (
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 999,
                  background: "#22c55e",
                  color: "white",
                }}
              >
                Featured
              </span>
            )}
          </div>
          {latestPortfolio ? (
            <>
              <div style={{ fontSize: 16, marginBottom: 6 }}>
                {getTitle(latestPortfolio)}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                Category: {latestPortfolio.category || "—"}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Created:{" "}
                {new Date(latestPortfolio.createdAt).toLocaleDateString("en-GB")}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: "#9ca3af" }}>
              No portfolio items created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
