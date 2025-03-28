interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export default function ProjectCard({ title, description, tech, link }: ProjectCardProps) {
  return (
    <div className="p-6 bg-[#c9d9dd] rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer h-full min-h-[280px] flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-800">{description}</p>
        <p className="mt-3 text-sm text-gray-700">Tech used: {tech.join(", ")}</p>
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-800 hover:underline"
        >
          View Project →
        </a>
      )}
    </div>
  );
}
