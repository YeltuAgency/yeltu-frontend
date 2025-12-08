import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#0f172a", color: "white", padding: "1.5rem 1rem" }}>
        <h2 style={{ fontSize: 20, fontWeight: "bold", marginBottom: "2rem" }}>Yeltu Admin</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              color: isActive("/admin") && location.pathname === "/admin" ? "#38bdf8" : "#e5e7eb",
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/blogs"
            style={{
              textDecoration: "none",
              color: isActive("/admin/blogs") ? "#38bdf8" : "#e5e7eb",
            }}
          >
            Blogs
          </Link>
          <Link
            to="/admin/portfolio"
            style={{
              textDecoration: "none",
              color: isActive("/admin/portfolio") ? "#38bdf8" : "#e5e7eb",
            }}
          >
            Portfolio
          </Link>
        </nav>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, background: "#f9fafb", display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: 56,
            background: "white",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 1.5rem",
            gap: 16,
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: "white",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </header>

        <main style={{ padding: "1.5rem", flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
