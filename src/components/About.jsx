// src/components/About.jsx
import React from 'react';
import { FiCode, FiPenTool, FiZap, FiUsers, FiDownload, FiMail } from 'react-icons/fi';

const About = () => {
  const skills = [
    'React', 'Node.js', 'Firebase', 'JavaScript', 'TailwindCSS', 
    'Git', 'GitHub', 'REST APIs', 'Vite', 'Python', 'AWS', 'Docker'
  ];

  const services = [
    {
      icon: <FiCode size={24} />,
      title: 'Web Development',
      description: 'Full-stack web applications using modern technologies and best practices.'
    },
    {
      icon: <FiPenTool size={24} />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive user interfaces that provide exceptional user experiences.'
    },
    {
      icon: <FiZap size={24} />,
      title: 'Performance Optimization',
      description: 'Fast, scalable applications optimized for performance and user engagement.'
    },
    {
      icon: <FiUsers size={24} />,
      title: 'Team Collaboration',
      description: 'Experienced in agile methodologies and cross-functional team collaboration.'
    }
  ];

  // Optional: mini credibility stats
  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Shipped', value: '30+' },
    { label: 'Clients', value: '12+' },
  ];

  return (
    <section id="about" className="bg-[#0c1220] text-white py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 tracking-tight">About Me</h2>
          <p className="text-lg text-gray-300/90">
            Passionate developer with a love for creating innovative digital solutions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Main Content: Story and Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Side: My Story */}
          <div className="max-w-prose">
            <h3 className="text-2xl font-semibold mb-4 text-white">My Story</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I'm a passionate full-stack developer with over 5 years of experience in creating innovative web applications and digital solutions. My journey began with a curiosity for technology and has evolved into a deep expertise in modern web development.
              </p>
              <p>
                I specialize in React, TypeScript, Node.js, and cloud technologies, always staying current with the latest industry trends and best practices. I believe in writing clean, maintainable code and creating user experiences that make a difference.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open source projects, mentoring junior developers, or exploring new technologies that could enhance my work and the projects I'm passionate about.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/[0.06] text-gray-200 px-4 py-2.5 rounded-md
                           border border-white/10 hover:bg-white/[0.1] transition-colors
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60
                           focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1220]"
              >
                <FiDownload aria-hidden="true" /> Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-4 py-2.5 rounded-md
                           hover:opacity-95 transition-opacity
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60
                           focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1220]"
              >
                <FiMail aria-hidden="true" /> Contact Me
              </a>
            </div>
          </div>

          {/* Right Side: Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Skills & Technologies</h3>
            <ul role="list" aria-label="Skills and technologies" className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <li key={index}>
                  <span
                    className="select-none inline-flex items-center rounded-md border border-white/10 bg-white/[0.04]
                               px-3 py-1.5 text-sm text-gray-200 hover:bg-white/[0.08]
                               transition-colors"
                  >
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mini Stats */}
        {/* <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-center">
              <div className="text-3xl font-bold tracking-tight">{s.value}</div>
              <div className="text-xs uppercase tracking-wide text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div> */}

        {/* Service Cards Section with subtle glow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-6
                         transition-all duration-300 motion-safe:hover:-translate-y-1
                         hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-600/20
                         motion-reduce:transition-none"
            >
              <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 text-white w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <span aria-hidden="true">{service.icon}</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;