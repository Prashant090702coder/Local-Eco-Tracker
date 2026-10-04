import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="text-emerald-400 text-xl"><FaLeaf /></span>
              <span>Local Eco Tracker</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Small eco-friendly actions today create a greener tomorrow. Empowering individuals to build sustainable habits and track tangible community impact.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/activities" className="hover:text-emerald-400 transition">
                  Activities History
                </Link>
              </li>
              <li>
                <Link to="/report-waste" className="hover:text-emerald-400 transition">
                  Report Waste
                </Link>
              </li>
              <li>
                <Link to="/recycling-centers" className="hover:text-emerald-400 transition">
                  Recycling Centers
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Details */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-3">
              Academic Context
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Developed as a 3rd-year B.Sc. Computer Science Mini Project. Engineered with React, Node.js, Express, and MongoDB Atlas.
            </p>
            <div className="mt-3 inline-block px-3 py-1 bg-emerald-950/70 border border-emerald-800 text-emerald-300 rounded-lg text-xs font-medium">
              🌱 Clean Full-Stack Architecture
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 Local Eco Tracker. All rights reserved.</p>
          <p>B.Sc. Computer Science Mini Project</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
