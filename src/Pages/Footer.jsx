import { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <footer className="footer footer-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white py-6">
      <aside className="w-full flex flex-col items-center gap-2">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-2 text-lg font-bold">
          <img
            src="https://i.ibb.co/Wff1shd/download-1.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-roboto uppercase tracking-wide">
            Tri<span className="text-primary font-lato">N</span>et Software Ltd.
          </span>
        </div>

        {/* Copyright Information */}
        <p className="text-sm font-medium tracking-wide">
          Copyright &copy; {year} - All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-4 mt-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition duration-300"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition duration-300"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition duration-300"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition duration-300"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </aside>
    </footer>
  );
};

export default Footer;
