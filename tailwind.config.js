/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            },
            colors: {
                neutral: {
                    100: '#FFFFFF',
                },
                primary: {
                    normal: '#3E7BFA',
                    dark: '#3040DC',
                    bright: '#3A42FF',
                    light: '#B1C5FF',
                },
                violet: {
                    normal: '#553285',
                    dark: '#36175E',
                    bright: '#7B52AB',
                    light: '#E5CFFC',
                },
                secondary: {
                    danger: '#CB3A31',
                    warning: '#F1A025',
                    success: '#18AF5E',
                    star: '#FFD43A',
                }
            },
        },
    },
    plugins: [],
};
