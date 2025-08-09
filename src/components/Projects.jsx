// src/components/Projects.jsx

import React from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Dummy data - namma 3 projects vechirukkom
const featuredProjects = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/38519/macbook-laptop-ipad-apple-38519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates and team collaboration features.',
    tags: ['React', 'Firebase', 'Material-UI'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Developer Portfolio',
    description: 'A personal portfolio to showcase skills and projects, built with a modern tech stack and clean design.',
    tags: ['React', 'TailwindCSS', 'Vite'],
    liveLink: '#',
    githubLink: '#',
  }

];

const Projects = () => {
  return (
    <section id="projects" className="bg-[#0D0D0D] text-white py-24 px-4">
      <div className="container mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">Featured Projects</h2>
          <p className="text-lg text-gray-400">Here are some of my recent projects that showcase my skills and experience.</p>
        </div>

        {/* !! ITHULA THAAN LAYOUT & HOVER MAGIC IRUKKU !! */}
<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {/* ... */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {featuredProjects.map((project) => (
      <article
        key={project.id}
        className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]
                   flex flex-col shadow-sm transition-all duration-300 motion-safe:transform-gpu
                   hover:-translate-y-1 hover:shadow-lg focus-within:ring-1 focus-within:ring-white/20"
      >
        {/* Image with overlay + consistent ratio */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} — screenshot`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent
                          opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-gray-300/90 text-sm mb-4 flex-grow leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="text-[11px] uppercase tracking-wide text-gray-300
                           border border-white/10 bg-white/[0.04] rounded-md px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 mt-auto">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} code on GitHub`}
              className="flex-1 text-center bg-white/[0.04] text-gray-200 py-2.5 px-4 rounded-md
                         hover:bg-white/[0.08] transition-colors duration-300
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60
                         focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]
                         flex items-center justify-center gap-2"
            >
              <FiGithub aria-hidden="true" /> Code
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo of ${project.title}`}
              className="flex-1 text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 px-4 rounded-md
                         hover:opacity-95 transition-opacity duration-300
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60
                         focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]
                         flex items-center justify-center gap-2"
            >
              <FiExternalLink aria-hidden="true" /> Demo
            </a>
          </div>
        </div>
      </article>
    ))}
  </div>

  {/* CTA */}
  <div className="text-center mt-16">
    <Link
      to="/projects"
      className="bg-white/[0.03] border border-white/10 text-gray-200 px-6 py-2.5 rounded-md
                 hover:bg-white/[0.07] hover:text-white transition-colors duration-300
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60
                 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]"
    >
      View All Projects
    </Link>
  </div>
</div>
        
        
        

       

      </div>
    </section>
  );
};

export default Projects;