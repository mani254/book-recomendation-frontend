/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            primary: 'Pally',
            secondary: 'Author',
         },
         colors: {
            primary: ({ opacityValue }) => `rgba(var(--primary-color), ${opacityValue})`,
            secondary: ({ opacityValue }) => `rgba(var(--secondary-color), ${opacityValue})`,
            accent: ({ opacityValue }) => `rgba(var(--accent), ${opacityValue})`,
            success: ({ opacityValue }) => `rgba(var(--success), ${opacityValue})`,
            warning: ({ opacityValue }) => `rgba(var(--warning-color), ${opacityValue})`,
            bright: ({ opacityValue }) => `rgba(var(--bright), ${opacityValue})`,
            main: ({ opacityValue }) => `rgba(var(--main-1), ${opacityValue})`,
            "main-2": ({ opacityValue }) => `rgba(var(--main-2), ${opacityValue})`,
            "main-3": ({ opacityValue }) => `rgba(var(--main-3), ${opacityValue})`,
            "main-4": ({ opacityValue }) => `rgba(var(--main-4), ${opacityValue})`,
         },
         container: {
            center: true,
            padding: {
               DEFAULT: '1rem',
            },
         },
         screens: {
            '2xl': '1430px',
            '3xl': '1560px',
         },
         fontSize: {
            xxs: '14px',
            xs: '15px',
            sm: '16px',
            md: '20px',
            lg: '24px',
            xl: '28px',
            '2xl': '32px',
            '3xl': '38px',
            '4xl': '42px',
         },
         keyframes: {
            shrink: {
               '0%': { width: '100%' },
               '100%': { width: '0%' },
            },
         },
         animation: {
            shrink: 'shrink 3.5s ease-in-out forwards',
         },
      },
   },
   plugins: [],
};
