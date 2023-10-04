/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                "fade-in-fwd":
                    "fade-in-fwd 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
            },
            keyframes: {
                "fade-in-fwd": {
                    "0%": {
                        transform: "translateZ(-80px)",
                        opacity: "0",
                    },
                    to: {
                        transform: "translateZ(0)",
                        opacity: "1",
                    },
                },
            },
        },
    },
    plugins: [],
};
