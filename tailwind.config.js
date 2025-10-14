/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'earth-brown': '#8B4513',
                'leaf-green': '#228B22',
                'sage-green': '#9CAF88',
                'soil-dark': '#3E2723',
                'sunrise-orange': '#FF6B35',
                'sky-blue': '#87CEEB',
            },
        },
    },
    plugins: [],
}