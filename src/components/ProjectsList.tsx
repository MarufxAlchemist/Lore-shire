import { useEffect, useState } from "react";
import { getProjects } from "@/services/getProjects";
import { Project } from "@/types/project";

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProjects();
      setProjects(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Projects</h1>
      {projects.map((project) => (
        <div key={project.id} style={{ marginBottom: "2rem" }}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p><strong>Published:</strong> {project.is_published ? "Yes" : "No"}</p>
          <p><strong>Tags:</strong> {project.tags.join(", ")}</p>
          {project.image_url && (
            <img src={project.image_url} alt={project.title} width="200" />
          )}
        </div>
      ))}
    </div>
  );
}
