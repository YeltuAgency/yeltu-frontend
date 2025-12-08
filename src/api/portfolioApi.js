// src/api/portfolioApi.js
import api from "./axios";

export const fetchPortfolio = async ({ lang, category }) =>
  api.get("/portfolio", {
    params: {
      category: category !== "All" ? category : undefined,
    },
    headers: { "Accept-Language": lang },
  });

export const fetchFeaturedPortfolio = async ({ lang }) =>
  api.get("/portfolio/featured", {
    headers: { "Accept-Language": lang },
  });

export const fetchPortfolioItem = async ({ slug, lang }) =>
  api.get(`/portfolio/${slug}`, {
    headers: { "Accept-Language": lang },
  });
