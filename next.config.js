/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // Reduce hydration mismatches
        optimizeCss: false,
    }
}

module.exports = nextConfig