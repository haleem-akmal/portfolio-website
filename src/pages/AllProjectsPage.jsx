// src/pages/AllProjectsPage.jsx
import React, { useMemo, useState } from 'react';
import { FiGithub, FiExternalLink, FiSearch } from 'react-icons/fi';

const allProjects = [
  { id: 1, image: 'https://images.pexels.com/photos/38519/macbook-laptop-ipad-apple-38519.jpeg', title: 'E-Commerce Platform', description: 'Full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.', tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'], category: 'Web App' },
  { id: 2, image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg', title: 'Task Management App', description: 'Collaborative task management app with realtime updates and team features.', tags: ['React', 'Firebase', 'Material-UI'], category: 'Web App' },
  { id: 3, image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg', title: 'Weather Dashboard', description: 'Location-based forecasts and interactive charts.', tags: ['Vue.js', 'Chart.js', 'OpenWeather API'], category: 'Dashboard' },
  { id: 4, image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg', title: 'AI Chatbot', description: 'Context-aware chatbot with retrieval and analytics.', tags: ['Python', 'FastAPI', 'AI/ML'], category: 'AI/ML' },
  { id: 5, image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg', title: 'Company Website', description: 'Fast, accessible marketing website with CMS.', tags: ['HTML', 'CSS', 'Netlify CMS'], category: 'Website' },
  { id: 6, image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg', title: 'Mobile Fitness App', description: 'Workout tracking with offline support and charts.', tags: ['React Native', 'Expo'], category: 'Mobile App' },
];

const categories = ['All', 'Web App', 'Dashboard', 'Mobile App', 'Website', 'AI/ML'];

const AllProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return allProjects.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.tags.join(' ').toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className=" min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-100px,#141a2a,transparent)] bg-[#04060b] text-white pt-28 pb-24 px-4">
      <div className="container mx-auto max-w-7xl ">
        {/* Header */}
        <header className="text-center mb-12 ">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">My Projects</h1>
          <p className="text-lg text-gray-300/90 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web development, mobile apps, and more
          </p>
        </header>

        {/* Search + Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b0f1a] border border-white/10 rounded-md py-3.5 pl-12 pr-4 text-gray-100 placeholder-gray-500
                         focus:ring-2 focus:ring-purple-500/60 focus:border-transparent outline-none shadow-inner"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-semibold transition-colors
                              border ${active ? 'bg-purple-600 text-white border-transparent' : 'bg-black/40 text-gray-200 border-white/10 hover:bg-black/50'}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-sm
                         transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={`${project.image}?auto=compress&cs=tinysrgb&w=1200`}
                  alt={`${project.title} — screenshot`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                {/* Corner round match */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                  <span className="shrink-0 text-[11px] uppercase tracking-wide text-gray-300 bg-white/[0.06] border border-white/10 rounded-full px-2 py-1">
                    {project.category}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-300/90 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-gray-200 bg-white/[0.06] border border-white/10 rounded-md px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href="#"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-4 py-2.5
                               text-gray-200 hover:bg-white/[0.1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
                    aria-label={`${project.title} code on GitHub`}
                  >
                    <FiGithub aria-hidden="true" /> Code
                  </a>
                  <a
                    href="#"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 px-4 py-2.5
                               text-white hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
                    aria-label={`Open live demo of ${project.title}`}
                  >
                    <FiExternalLink aria-hidden="true" /> Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-400 mt-12">
            No projects found. Try a different search or filter!
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProjectsPage;