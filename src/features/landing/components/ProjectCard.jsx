import { Card } from "@/components/ui/card";

export function ProjectCard({ project, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="group overflow-hidden border border-transparent bg-transparent p-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl"
    >
      <div className="relative overflow-hidden w-full aspect-[3/2] rounded-2xl bg-gray-100">
        <img
          src={project.thumbnail}
          alt={project.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Card>
  );
}
