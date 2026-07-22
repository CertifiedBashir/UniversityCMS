/* ================================================================
   api.js — Tazkiyah CMS API Helper
   All calls go through TazkiyahAPI namespace
   ================================================================ */

const TazkiyahAPI = (() => {
  // const BASE = 'http://localhost:5000/api'; // Development
  const BASE = '/api'; // Live

  const get = async (endpoint) => {
    const res = await fetch(BASE + endpoint);
    if (!res.ok) throw new Error(`API ${res.status}: ${endpoint}`);
    return res.json();
  };

  return {
    fetchMenus: () => get('/menus'),
    fetchCarousel: () => get('/carousel'),
    fetchPages: () => get('/pages'),
    fetchPage: (slug) => get(`/pages/${slug}`)
  };
})();
