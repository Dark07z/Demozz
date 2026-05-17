module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        canvas: '#ffffff',
        'soft-cloud': '#f5f5f5',
        'hairline': '#cacacb',
        'hairline-soft': '#e5e5e5',
        charcoal: '#39393b',
        ash: '#4b4b4d',
        mute: '#707072',
        stone: '#9e9ea0',
        sale: '#d30005',
        'sale-deep': '#780700',
        success: '#007d48',
        'success-bright': '#1eaa52',
        info: '#1151ff',
        'info-deep': '#0034e3',
        'accent-pink': '#ed1aa0',
        'accent-pink-soft': '#ffb0dd',
        'accent-purple-soft': '#beaffd',
        'accent-purple-pale': '#d6d1ff',
        'accent-teal': '#0a7281',
        'accent-pink-deep': '#4c012d'
      },
      spacing: {
        section: '48px'
      },
      borderRadius: {
        none: '0',
        sm: '18px',
        md: '24px',
        lg: '30px',
        full: '9999px'
      },
      fontFamily: {
        display: ['Bebas Neue', 'Helvetica Now', 'Helvetica', 'Arial', 'sans-serif'],
        ui: ['Inter', 'Helvetica Now Text', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
};
