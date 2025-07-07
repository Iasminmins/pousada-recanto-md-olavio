/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores HSL com fallback (mantidas)
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
        popover: "hsl(var(--popover) / <alpha-value>)",
        "popover-foreground": "hsl(var(--popover-foreground) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        "secondary-foreground": "hsl(var(--secondary-foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
        destructive: "hsl(var(--destructive) / <alpha-value>)",
        "destructive-foreground": "hsl(var(--destructive-foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",

        // Cores temáticas da pousada (atualizadas)
        'pousada-brown': 'hsl(25, 75%, 30%)',
        'pousada-dark': 'hsl(25, 85%, 20%)',
        'pousada-cream': 'hsl(45, 100%, 94%)',
        'pousada-green': 'hsl(120, 45%, 35%)',
        
        // Nova paleta de azuis para a pousada
        'pousada-blue': {
          50: 'hsl(210, 100%, 98%)',  // Muito claro
          100: 'hsl(210, 100%, 96%)',
          200: 'hsl(210, 100%, 90%)',
          300: 'hsl(210, 100%, 80%)', // Azul claro
          400: 'hsl(210, 100%, 65%)',
          500: 'hsl(210, 100%, 50%)', // Azul principal
          600: 'hsl(210, 100%, 40%)',
          700: 'hsl(210, 100%, 30%)', // Azul escuro
          800: 'hsl(210, 100%, 20%)',
          900: 'hsl(210, 100%, 10%)', // Muito escuro
          DEFAULT: 'hsl(210, 100%, 50%)', // Cor padrão
          light: 'hsl(210, 100%, 80%)',   // Versão clara
          dark: 'hsl(210, 100%, 30%)',    // Versão escura
        }
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}