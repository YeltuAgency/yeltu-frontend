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

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEdit = id && id !== "new";
  const navigate = useNavigate();

  const [translations, setTranslations] = useState(emptyTranslations);
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");

  // ⭐ NEW CATEGORY STATE
  const [category, setCategory] = useState("other");

  // ⭐ SEO STATES
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoSlug, setSeoSlug] = useState("");
  const [seoOgImage, setSeoOgImage] = useState("");

  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);

  // Load existing blog if editing
  useEffect(() => {
    const fetchBlog = async () => {
      if (!isEdit) return;
      setLoading(true);

      try {
        const res = await api.get(`/admin/blogs/${id}`);
        const blog = res.data;

        setTranslations(blog.translations || emptyTranslations);
        setFeatured(blog.featured || false);
        setImage(blog.image || "");

        // ⭐ LOAD CATEGORY
        setCategory(blog.category || "other");

        // SEO
        setSeoTitle(blog.seo?.title || "");
        setSeoDescription(blog.seo?.description || "");
        setSeoSlug(blog.seo?.slug || "");
        setSeoOgImage(blog.seo?.ogImage || "");
      } catch (err) {
        console.error(err);
        alert("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, isEdit]);

  const handleChange = (lang, field, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));

    if (lang === "en" && field === "title" && !seoSlug) {
      const generated = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSeoSlug(generated);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        translations,
        featured,
        image,

        // ⭐ INCLUDE CATEGORY
        category,

        seo: {
          title: seoTitle,
          description: seoDescription,
          slug: seoSlug,
          ogImage: seoOgImage,
        },
      };

      if (isEdit) {
        await api.put(`/admin/blogs/${id}`, payload);
      } else {
        await api.post("/admin/blogs", payload);
      }

      navigate("/admin/blogs");
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
        {isEdit ? "Edit Blog" : "New Blog"}
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
            Title ({activeLang.toUpperCase()})
          </label>
          <input
            type="text"
            value={translations[activeLang]?.title || ""}
            onChange={(e) =>
              handleChange(activeLang, "title", e.target.value)
            }
            required
            style={inputStyle}
          />
        </div>

        {/* Content */}
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>
            Content ({activeLang.toUpperCase()})
          </label>
          <RichTextEditor
            value={translations[activeLang]?.content || ""}
            onChange={(val) => handleChange(activeLang, "content", val)}
          />
        </div>

        {/* Image */}
        <ImageUpload label="Blog Image" value={image} onChange={setImage} />

        {/* Featured */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <span style={{ fontSize: 14 }}>Featured</span>
        </div>

        {/* ⭐ CATEGORY SELECT */}
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>
            Category
          </label>
          <select
            style={inputStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="design">Design</option>
            <option value="seo">SEO</option>
            <option value="marketing">Marketing</option>
            <option value="technology">Technology</option>
            <option value="development">Development</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* SEO SECTION */}
        <hr style={{ margin: "20px 0" }} />
        <h2 style={{ fontSize: 18 }}>SEO Settings</h2>

        {/* SEO Title */}
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>SEO Title</label>
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
          <label style={{ display: "block", marginBottom: 4 }}>Slug</label>
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
          <label style={{ marginBottom: 4, display: "block" }}>
            OpenGraph Image (Recommended)
          </label>
          <ImageUpload value={seoOgImage} onChange={setSeoOgImage} />
        </div>

        {/* Save Button */}
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
            width: 160,
          }}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
