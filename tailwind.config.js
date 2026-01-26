/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',

        // Component colors
        card: 'var(--card)',
        primary: 'var(--primary)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        code: {
          DEFAULT: 'var(--text-code)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },

        // Sidebar colors
        sidebar: {
          active: 'var(--sidebar-active)',
          inactive: 'var(--sidebar-inactive)',
        },

        // Surface colors (semantic backgrounds)
        surface: {
          code: 'var(--surface-code)',
          'code-dark': 'var(--surface-code-dark)',
          'code-light': 'var(--surface-code-light)',
          info: 'var(--surface-info)',
          canvas: 'var(--surface-canvas)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
