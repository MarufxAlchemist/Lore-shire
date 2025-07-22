import ProjectForm from "@/components/ProjectForm";

export default function CreatePage() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <ProjectForm />
    </div>
  );
}