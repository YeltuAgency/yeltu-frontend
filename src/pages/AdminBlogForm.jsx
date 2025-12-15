import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import ImageUpload from "../components/ImageUpload";
import RichTextEditor from "../components/RichTextEditor";

/* --------------------------------
   DEFAULT STATES
-------------------------------- */
const emptyTranslations = {
  en: { title: "", excerpt: "", content: "" },
  az: { title: "", excerpt: "", content: "" },
  ru: { title: "", excerpt: "", content: "" },
};

const emptySeoLang = {
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  keywords: "",
};

const emptySeo = {
  slug: "",
  canonical: "",
  ogImage: "",
  meta: [],
  en: { ...emptySeoLang },
  az: { ...emptySeoLang },
  ru: { ...emptySeoLang },
};

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEdit = id && id !== "new";
  const navigate = useNavigate();

  const [translations, setTranslations] = useState(emptyTranslations);
  const [seo, setSeo] = useState(emptySeo);

  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState("other");

  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);

  /* --------------------------------
     LOAD BLOG (EDIT)
  -------------------------------- */
  useEffect(() => {
    if (!isEdit) return;

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/admin/blogs/${id}`);

        setTranslations(data.translations || emptyTranslations);
        setImage(data.image || "");
        setFeatured(!!data.featured);
        setCategory(data.category || "other");

        setSeo({
          ...emptySeo,
          ...data.seo,
          en: { ...emptySeoLang, ...data.seo?.en },
          az: { ...emptySeoLang, ...data.seo?.az },
          ru: { ...emptySeoLang, ...data.seo?.ru },
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, isEdit]);

  /* --------------------------------
     HANDLERS
  -------------------------------- */
  const handleTranslationChange = (lang, field, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));

    if (lang === "en" && field === "title" && !seo.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSeo((prev) => ({ ...prev, slug }));
    }
  };

  const handleSeoChange = (lang, field, value) => {
    setSeo((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  /* --------------------------------
     SUBMIT (🔥 FIXED PAYLOAD)
  -------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // HARD VALIDATION
      ["en", "az", "ru"].forEach((lang) => {
        if (
          !translations[lang].title ||
          !translations[lang].content ||
          !translations[lang].excerpt
        ) {
          throw new Error(`Missing ${lang.toUpperCase()} content`);
        }
      });

      const payload = {
        translations: {
          en: { ...translations.en },
          az: { ...translations.az },
          ru: { ...translations.ru },
        },

        image,
        featured,
        category,

        seo: {
          slug: seo.slug,
          canonical: seo.canonical,
          ogImage: seo.ogImage,
          meta: seo.meta || [],

          en: {
            ...seo.en,
            ...(seo.en.keywords?.trim()
              ? { keywords: seo.en.keywords }
              : {}),
            title: seo.en.title || translations.en.title,
            description: seo.en.description || translations.en.excerpt,
            ogTitle: seo.en.ogTitle || seo.en.title || translations.en.title,
            ogDescription:
              seo.en.ogDescription ||
              seo.en.description ||
              translations.en.excerpt,
          },
          az: {
            ...seo.az,
            ...(seo.az.keywords?.trim()
              ? { keywords: seo.az.keywords }
              : {}),
            title: seo.az.title || translations.az.title,
            description: seo.az.description || translations.az.excerpt,
            ogTitle: seo.az.ogTitle || seo.az.title || translations.az.title,
            ogDescription:
              seo.az.ogDescription ||
              seo.az.description ||
              translations.az.excerpt,
          },
          ru: {
            ...seo.ru,
            ...(seo.ru.keywords?.trim()
              ? { keywords: seo.ru.keywords }
              : {}),
            title: seo.ru.title || translations.ru.title,
            description: seo.ru.description || translations.ru.excerpt,
            ogTitle: seo.ru.ogTitle || seo.ru.title || translations.ru.title,
            ogDescription:
              seo.ru.ogDescription ||
              seo.ru.description ||
              translations.ru.excerpt,
          },

          // LEGACY FALLBACK (IMPORTANT)
          title: seo.en.title || translations.en.title,
          description:
            seo.en.description || translations.en.excerpt,
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
      alert(err.message || "Save failed");
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

  /* --------------------------------
     RENDER
  -------------------------------- */
  return (
    <div>
      <h1 style={{ fontSize: 22 }}>
        {isEdit ? "Edit Blog" : "New Blog"}
      </h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 900, display: "grid", gap: 16 }}>
        {/* LANGUAGE TABS */}
        <div style={{ display: "flex", gap: 8 }}>
          {["en", "az", "ru"].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                background: activeLang === lang ? "#2563eb" : "#fff",
                color: activeLang === lang ? "#fff" : "#111",
                border: "1px solid #e5e7eb",
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <input
          placeholder={`Title (${activeLang})`}
          value={translations[activeLang].title}
          onChange={(e) =>
            handleTranslationChange(activeLang, "title", e.target.value)
          }
          style={inputStyle}
          required
        />

        <textarea
          placeholder={`Excerpt (${activeLang})`}
          value={translations[activeLang].excerpt}
          onChange={(e) =>
            handleTranslationChange(activeLang, "excerpt", e.target.value)
          }
          rows={3}
          style={inputStyle}
          required
        />

        <RichTextEditor
          value={translations[activeLang].content}
          onChange={(val) =>
            handleTranslationChange(activeLang, "content", val)
          }
        />

        <ImageUpload label="Blog Image" value={image} onChange={setImage} />

        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />{" "}
          Featured
        </label>

        <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
          <option value="design">Design</option>
          <option value="seo">SEO</option>
          <option value="marketing">Marketing</option>
          <option value="technology">Technology</option>
          <option value="development">Development</option>
          <option value="other">Other</option>
        </select>

        <hr />
        <h2>SEO ({activeLang.toUpperCase()})</h2>

        {["title", "description", "ogTitle", "ogDescription", "keywords"].map(
          (field) => (
            <input
              key={field}
              placeholder={field}
              value={seo[activeLang][field]}
              onChange={(e) =>
                handleSeoChange(activeLang, field, e.target.value)
              }
              style={inputStyle}
            />
          )
        )}

        <hr />
        <h2>Global SEO</h2>

        <input
          placeholder="Slug"
          value={seo.slug}
          onChange={(e) =>
            setSeo((p) => ({ ...p, slug: e.target.value }))
          }
          style={inputStyle}
        />

        <input
          placeholder="Canonical"
          value={seo.canonical}
          onChange={(e) =>
            setSeo((p) => ({ ...p, canonical: e.target.value }))
          }
          style={inputStyle}
        />

        <ImageUpload
          label="OG Image"
          value={seo.ogImage}
          onChange={(v) =>
            setSeo((p) => ({ ...p, ogImage: v }))
          }
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 14px",
            background: loading ? "#9ca3af" : "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            width: 160,
          }}
        >
          {loading ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
