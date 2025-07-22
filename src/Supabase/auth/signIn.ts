// src/Supabase/auth/signIn.ts
import { supabase } from "@/Supabase/supabaseClient";

export default async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const result = {
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          aud: data.user.aud,
          created_at: data.user.created_at,
        }
      : null,
    session: data.session
      ? {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_in: data.session.expires_in,
          token_type: data.session.token_type,
        }
      : null,
  };

  return {
    result,
    error: error ? { message: error.message, code: error.code } : null,
  };
}
