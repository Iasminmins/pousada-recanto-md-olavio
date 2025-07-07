export default {
  plugins: {
    'postcss-import': {}, // Adiciona suporte para @import
    'tailwindcss/nesting': {}, // Permite aninhamento CSS moderno
    tailwindcss: {},
    autoprefixer: {
      // Configuração específica para autoprefixer
      grid: 'autoplace', // Adiciona suporte para grid CSS
      flexbox: 'no-2009' // Otimiza prefixos para flexbox
    },
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: { // Minifica o CSS apenas em produção
        preset: 'default'
      }
    } : {})
  }
}