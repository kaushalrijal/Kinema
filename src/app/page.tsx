import Hero from "@/components/carousel/hero";
import CardGrid from "@/components/grid/cardsGrids";
import HorizontalCardCarousel from "@/components/carousel/HorizontalCardCarousel";
import { getTrendingMovies, getTrendingSeries } from "@/utils/request";

export default async function Home() {
  const trendingMovies = await getTrendingMovies();
  const trendingSeries = await getTrendingSeries();

  // Combine trending movies and series, marking their type
  const popularNowItems = [
    ...(trendingMovies || []).map(item => ({ ...item, media_type: 'movie' })),
    ...(trendingSeries || []).map(item => ({ ...item, media_type: 'series' })),
  ];

  // Optionally shuffle the combined list for more variety
  for (let i = popularNowItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [popularNowItems[i], popularNowItems[j]] = [popularNowItems[j], popularNowItems[i]];
  }

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section (Featured Content) */}
      <section className="container">
        <Hero />
      </section>

      {/* Popular Now Section (Combined Trending Movies and Series) */}
      {popularNowItems.length > 0 && (
        <section className="container">
          <HorizontalCardCarousel title="Popular Now" items={popularNowItems} />
        </section>
      )}

      {/* Main Content */}
      <section className="container space-y-12">
        <CardGrid />
      </section>
    </div>
  );
}
