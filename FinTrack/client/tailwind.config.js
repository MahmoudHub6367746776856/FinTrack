/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6', // Vibrant purple
          hover: '#7c3aed',
          light: '#a78bfa',
        },
        accent: '#10b981', // Neon green
        danger: '#ef4444',
        warning: '#f59e0b',
        background: '#0B0F19', // Deep dark space
        card: 'rgba(255, 255, 255, 0.05)', // Glassmorphism base
        'text-primary': '#f3f4f6', // Light gray text
        'text-secondary': '#9ca3af',
        border: 'rgba(255, 255, 255, 0.1)', // Subtle border for glass
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 15px -3px rgba(139, 92, 246, 0.2), 0 4px 6px -2px rgba(139, 92, 246, 0.1)',
        'glow': '0 0 15px rgba(16, 185, 129, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
