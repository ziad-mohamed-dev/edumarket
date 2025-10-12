import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-10 text-gray-600">
      {/* Upper Section */}
      <div className="max-w-7xl mx-auto py-10 px-6 grid md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-2xl font-bold text-blue-600 mb-3">EduMarket</h3>
          <p className="text-sm leading-relaxed">
            Your trusted platform to learn, grow, and master new skills online.
            Empowering your journey with expert-led courses.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="/courses" className="hover:text-blue-600 transition">Courses</a></li>
            <li><a href="/about" className="hover:text-blue-600 transition">About</a></li>
            <li><a href="/contact" className="hover:text-blue-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Stay Connected</h4>
          <p className="text-sm mb-4">Follow us on social media:</p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white shadow rounded-full hover:bg-blue-600 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-white shadow rounded-full hover:bg-pink-600 hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-white shadow rounded-full hover:bg-blue-700 hover:text-white transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="p-2 bg-white shadow rounded-full hover:bg-sky-500 hover:text-white transition">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-medium">EduMarket</span> — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
