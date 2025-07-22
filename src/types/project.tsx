// src/types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  created_at: string;
  image_url: string;
  tags: string[];
  is_published: boolean;
}