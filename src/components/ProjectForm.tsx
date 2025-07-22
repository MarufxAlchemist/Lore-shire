// src/components/ProjectForm.tsx
"use client";

import { useState } from "react";
import { uploadImage } from "@/services/uploadImage"; // Make sure this path is correct
import { supabase } from "@/Supabase/supabaseClient";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) setImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("Projects").insert([
      {
        title,
        description,
        tags: tags.split(",").map((tag) => tag.trim()),
        is_published: isPublished,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.error("Error submitting project:", error.message);
    } else {
      alert("Project submitted!");
      // Optionally clear form or redirect
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border p-2 w-full"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={() => setIsPublished(!isPublished)}
        />
        Publish this project
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border p-2"
      />
      {imageUrl && <img src={imageUrl} alt="Uploaded" className="w-40" />}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
