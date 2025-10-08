/** @type {import('next-sitemap').IConfig} */
const axios = require("axios");

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const DOMAIN_NAME = process.env.NEXT_PUBLIC_LANDING_URL || "https://appointly.logiqdev.com"

// async function fetchProviders() {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/accounts/providers`);
//         return response.data || [];
//     } catch (error) {
//         console.error("Failed to fetch providers for sitemap:", error.message);
//         return [];
//     }
// }

module.exports = {
    siteUrl: DOMAIN_NAME,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    outDir: "public",

    // additionalPaths: async (config) => {
    //     const providers = await fetchProviders();

    //     return providers.map((p) => ({
    //         loc: `/${p.slug}`,
    //         lastmod: p.updated_at,
    //         changefreq: "weekly",
    //         priority: 0.8,
    //     }));
    // },
};
