// src/supabase/auth/signUp.ts
'use server';

import { supabase } from "@/Supabase/supabaseClient";

export default async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  username: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
        username,
      }
    }
  });

  return { result: data, error };
}
