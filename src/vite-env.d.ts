/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Variáveis padrão do Vite
  readonly MODE: string
  readonly BASE_URL: string
  readonly PROD: boolean
  readonly DEV: boolean
  readonly SSR: boolean

  // Suas variáveis específicas (baseadas no seu .env)
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME?: string
  readonly VITE_APP_VERSION?: string
  
  // Adicione aqui outras variáveis VITE_ que você usar
  // readonly VITE_WHATSAPP_NUMBER?: string
  // readonly VITE_GOOGLE_MAPS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}