import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import ImageUpload from "../components/ImageUpload";
import RichTextEditor from "../components/RichTextEditor";

const emptyTranslations = {
  en: { title: "", content: "" },
  az: { title: "", content: "" },
  ru: { title: "", content: "" },
};

export default function AdminPortfolioForm() {
  const { id } = useParams();
  const isEdit = id && id !== "new";
  const navigate = useNavigate();

  const [translations, setTranslations] = useState(emptyTranslations);
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [demoUrl, setDemoUrl] = useState("");

  // ⭐ SEO Fields
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoSlug, setSeoSlug] = useState("");
  const [seoOgImage, setSeoOgImage] = useState("");

  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);

  // Load existing portfolio item
  useEffect(() => {
    const fetchItem = async () => {
      if (!isEdit) return;
      setLoading(true);

      try {
        const res = await api.get(`/admin/portfolio/${id}`);
        const item = res.data;

        setTranslations(item.translations || emptyTranslations);
        setFeatured(item.featured || false);
        setImage(item.image || "");
        setCategory(item.category || "");
        setDemoUrl(item.demoUrl || "");
        setTechnologies((item.technologies || []).join(", "));

        // ⭐ Load SEO fields
        setSeoTitle(item.seo?.title || "");
        setSeoDescription(item.seo?.description || "");
        setSeoSlug(item.seo?.slug || "");
        setSeoOgImage(item.seo?.ogImage || "");
      } catch (err) {
        console.error(err);
        alert("Failed to load portfolio item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, isEdit]);

  const handleChange = (lang, field, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));

    // ⭐ Auto-generate slug based on EN title
    if (lang === "en" && field === "title" && !seoSlug) {
      const generated = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSeoSlug(generated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const techArray = technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        translations,
        featured,
        image,
        category,
        technologies: techArray,
        demoUrl,

        // ⭐ Include SEO data
        seo: {
          title: seoTitle,
          description: seoDescription,
          slug: seoSlug,
          ogImage: seoOgImage,
        },
      };

      if (isEdit) {
        await api.put(`/admin/portfolio/${id}`, payload);
      } else {
        await api.post("/admin/portfolio", payload);
      }

      navigate("/admin/portfolio");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>
        {isEdit ? "Edit Portfolio Item" : "New Portfolio Item"}
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 16, maxWidth: 900 }}
      >
        {/* Language Tabs */}
        <div style={{ display: "flex", gap: 8 }}>
          {["en", "az", "ru"].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                background: activeLang === lang ? "#2563eb" : "white",
                color: activeLang === lang ? "white" : "#111827",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Title */}
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>
            Project Title ({activeLang.toUpperCase()})
          </label>
          <input
            type="text"
            value={translations[activeLang]?.title || ""}
            onChange={(e) => handleChange(activeLang, "title", e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>
            Project Description ({activeLang.toUpperCase()})
          </label>

          <RichTextEditor
            value={translations[activeLang]?.content || ""}
            onChange={(val) => handleChange(activeLang, "content", val)}
          />
        </div>

        {/* Category */}
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Technologies */}
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>
            Technologies (comma separated)
          </label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="React, Node.js, MongoDB..."
            style={inputStyle}
          />
        </div>

        {/* Demo URL */}
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>
            Demo URL
          </label>
          <input
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://clientproject.com"
            style={inputStyle}
          />
        </div>

        {/* Main Image */}
        <ImageUpload label="Portfolio Image" value={image} onChange={setImage} />

        {/* Featured */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <span style={{ fontSize: 14 }}>Featured</span>
        </div>

        {/* --------------------- */}
        {/* ⭐ SEO SECTION */}
        {/* --------------------- */}

        <hr style={{ margin: "20px 0" }} />
        <h2 style={{ fontSize: 18 }}>SEO Settings</h2>

        {/* SEO Title */}
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>
            SEO Title
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* SEO Description */}
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>
            SEO Description
          </label>
          <textarea
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            rows={3}
            style={inputStyle}
          />
        </div>

        {/* Slug */}
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>
            Slug
          </label>
          <input
            type="text"
            value={seoSlug}
            onChange={(e) => setSeoSlug(e.target.value)}
            placeholder="auto-generated from title"
            style={inputStyle}
          />
        </div>

        {/* OG Image */}
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>
            OpenGraph Image
          </label>
          <ImageUpload value={seoOgImage} onChange={setSeoOgImage} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "none",
            background: loading ? "#9ca3af" : "#16a34a",
            color: "white",
            cursor: loading ? "default" : "pointer",
            width: 180,
          }}
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </form>
    </div>
  );
}
