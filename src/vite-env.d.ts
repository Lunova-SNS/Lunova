/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv{
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_PUBLIC_SUPABASE_KEY: string;
  readonly VITE_SUPABASE_SERVICE_ROLE: string;
  readonly VITE_SUPABASE_DB_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}