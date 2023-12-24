/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#0d1b2a',
            dark: '#22223b',
            blur: 'rgba(0, 0, 0, .6)',
            smooth: '#edf2f4',
            'off-white': '#edf6f9',
         },
         boxShadow: {
            'custom-shadow':
               'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            'weight-line':
               'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
            'right-side': 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
         },
      },
   },
   plugins: [],
};
