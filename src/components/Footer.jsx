// src/components/Footer.jsx

import React from 'react';
import { FiGithub, FiLinkedin, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#0D0D0D] text-gray-400 py-8 px-4 border-t border-white/10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright Text */}
          <div className="text-sm text-center md:text-left">
            &copy; {currentYear} Haleem Akmal. All rights reserved.
          </div>
          
          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300" aria-label="GitHub">
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
            
            {/* Back to Top Button */}
            <button 
              onClick={scrollToTop}
              className="bg-white/[0.05] p-2 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
              aria-label="Scroll back to top"
            >
              <FiArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;