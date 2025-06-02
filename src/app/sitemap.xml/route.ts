import { getTrendingMovies, getTrendingSeries } from "@/utils/request";

export async function GET() {
  const baseUrl = 'https://kinematv.vercel.app';
  
  // Get trending movies and series
  const movies = await getTrendingMovies();
  const series = await getTrendingSeries();

  // Create URLs for static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shows`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Create URLs for movies
  const movieUrls = movies?.map((movie) => ({
    url: `${baseUrl}/watch/movie/${movie.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  })) || [];

  // Create URLs for series
  const seriesUrls = series?.map((show) => ({
    url: `${baseUrl}/watch/series/${show.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  })) || [];

  const allUrls = [...staticPages, ...movieUrls, ...seriesUrls];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls.map(({ url, lastModified, changeFrequency, priority }) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${lastModified}</lastmod>
          <changefreq>${changeFrequency}</changefreq>
          <priority>${priority}</priority>
        </url>
      `).join('')}
    </urlset>`;

  // Return the XML with proper headers
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 