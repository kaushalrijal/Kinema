/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/components/api.tsx",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '/t/p/**',
            },
            {
                protocol: 'http',
                hostname: 'image.tmdb.org',
                pathname: '/t/p/**',
            },
            {
                protocol: 'https',
                hostname: 'www.themoviedb.org',
                pathname: '/t/p/**',
            },
            {
                protocol: 'http',
                hostname: 'www.themoviedb.org',
                pathname: '/t/p/**',
            }
        ],
    },
};

module.exports = nextConfig;
  
