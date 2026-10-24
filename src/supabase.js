import { createClient } from "@supabase/supabase-js";

function supabase() {
    const sb = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
    )
}

export default supabase;