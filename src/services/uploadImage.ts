// src/services/uploadImage.ts
import { supabase } from "@/Supabase/supabaseClient";

export async function uploadImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("book-images")
    .upload(fileName, file);

  if (error) {
    console.error("Image upload failed:", error.message);
    return null;
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("book-images")
    .getPublicUrl(fileName);

  return publicUrlData?.publicUrl || null;
}
