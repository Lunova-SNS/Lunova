import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
const supabase = createClient(
  import.meta.env.
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;