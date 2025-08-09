// src/components/Contact.jsx
import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: string }
  const MESSAGE_LIMIT = 800;

  const inputBase =
    'w-full bg-white/[0.04] border border-white/10 rounded-md p-3.5 text-gray-100 placeholder-gray-500 ' +
    'outline-none transition-colors focus-visible:ring-2 focus-visible:ring-purple-500/60 focus-visible:border-transparent';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      // TODO: integrate real submission (EmailJS/Resend/Serverless API)
      await new Promise((r) => setTimeout(r, 800));
      setStatus({ type: 'success', text: "Thanks! I'll get back to you soon." });
      setMessage('');
      e.target.reset();
    } catch (err) {
      setStatus({
        type: 'error',
        text: "Couldn't send right now. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#0e1526] text-white py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2 tracking-tight">Get In Touch</h2>
          <p className="text-lg text-gray-300/90">
            Have a project in mind? Let's discuss how we can work together
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">

          {/* Left Side: Contact Information */}
          <div className="lg:w-2/5">
            <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
            <p className="text-gray-400 mb-8">
              I'm always interested in hearing about new projects and opportunities. Whether you're a company looking to hire, or a fellow developer who wants to collaborate, I'd love to hear from you.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:haleemakmal48@gmail.com"
                className="flex items-start gap-4 group"
                aria-label="Send me an email"
              >
                <div className="bg-purple-600/20 text-purple-400 w-12 h-12 flex items-center justify-center rounded-lg transition-colors group-hover:bg-purple-600/30">
                  <FiMail size={22} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    haleemakmal48@gmail.com
                  </p>
                </div>
              </a>

              <a href="tel:+94776485166" className="flex items-start gap-4 group" aria-label="Call me">
                <div className="bg-purple-600/20 text-purple-400 w-12 h-12 flex items-center justify-center rounded-lg transition-colors group-hover:bg-purple-600/30">
                  <FiPhone size={22} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-gray-300 group-hover:text-white transition-colors">+94 776485166</p>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=Batticaloa, Sri Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
                aria-label="Open location on Google Maps"
              >
                <div className="bg-purple-600/20 text-purple-400 w-12 h-12 flex items-center justify-center rounded-lg transition-colors group-hover:bg-purple-600/30">
                  <FiMapPin size={22} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-gray-300 group-hover:text-white transition-colors">Batticaloa, Sri Lanka</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:w-3/5 bg-white/[0.04] p-6 sm:p-8 rounded-lg border border-white/10">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            {/* Status message */}
            {status && (
              <div
                role="status"
                aria-live="polite"
                className={`mb-4 rounded-md border px-4 py-3 text-sm ${
                  status.type === 'success'
                    ? 'border-green-600/40 bg-green-600/10 text-green-300'
                    : 'border-red-600/40 bg-red-600/10 text-red-300'
                }`}
              >
                {status.text}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="sm:w-1/2">
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-300">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    className={inputBase}
                  />
                </div>
                <div className="sm:w-1/2">
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-300">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    className={inputBase}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  autoComplete="organization-title"
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  maxLength={MESSAGE_LIMIT}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputBase} resize-y`}
                  placeholder="Tell me about your project…"
                  aria-describedby="message-help"
                />
                <div id="message-help" className="mt-1 flex items-center justify-between text-xs text-gray-400">
                  <span>Share goals, budget range, and timeline if you can.</span>
                  <span>
                    {message.length}/{MESSAGE_LIMIT}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-md
                           hover:opacity-95 transition-opacity duration-300 flex items-center justify-center gap-2
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'} <FiSend className="motion-safe:animate-pulse" />
              </button>
              <p className="text-[11px] text-gray-500 text-center">
                Prefer email? Write to me at <a className="underline text-gray-300" href="mailto:haleemakmal48@gmail.com">haleemakmal48@gmail.com</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;