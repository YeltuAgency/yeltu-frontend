import api from "./axios";

export const fetchBlogs = async ({ lang, category, search }) =>
  api.get("/blogs", {
    params: {
      category: category !== "all" ? category : undefined,
      search: search || undefined,
    },
    headers: { "Accept-Language": lang },
  });

export const fetchFeaturedBlogs = async ({ lang }) =>
  api.get("/blogs/featured", {
    headers: { "Accept-Language": lang },
  });

export const fetchBlogBySlug = async ({ slug, lang }) =>
  api.get(`/blogs/${slug}`, {
    headers: { "Accept-Language": lang },
  });
