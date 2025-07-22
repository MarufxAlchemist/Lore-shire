// src/services/getProjects.ts
import { supabase } from "@/Supabase/supabaseClient"; // ✅ Use correct path

export async function getProjects() {
  const { data, error } = await supabase
    .from("Projects")
    .select("id, title, description, created_at, image_url, tags, is_published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }

  return data;
}
