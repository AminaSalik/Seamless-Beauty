import { Link } from 'react-router-dom';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">
              BOOKING<span className="text-pink-500">PRO</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevating business efficiency through smart automation. The world's most elegant booking solution for professionals.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-dark-brown transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:stroke-dark-brown">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-dark-brown transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:stroke-dark-brown">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-all duration-300 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white group-hover:stroke-[#3b2323] transition-colors"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
                  <path d="M17.4 14.6c-.3-.2-.7-.4-1.1-.4-.3 0-.5.1-.7.2l-.4.4c-.2.2-.4.2-.7.1a5.6 5.6 0 0 1-2.4-1.5 5.6 5.6 0 0 1-1.5-2.4c-.1-.3-.1-.5.1-.7l.4-.4c.1-.2.2-.4.2-.7s-.1-.8-.4-1.1c-.3-.3-.6-.3-.9-.3-.3 0-.6.1-.8.3l-.5.5c-.5.5-.6 1.2-.4 1.8.5 1.5 1.4 2.8 2.6 3.9a10.4 10.4 0 0 0 3.9 2.6c.6.2 1.3.1 1.8-.4l.5-.5c.2-.2.3-.5.3-.8s-.1-.6-.3-.9z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-pink-500 font-semibold mb-6 uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-pink-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/solutions" className="hover:text-pink-500 transition-colors">Solutions</Link></li>
              <li><Link to="/services" className="hover:text-pink-500 transition-colors">Services</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-pink-500 font-semibold mb-6 uppercase tracking-widest text-xs">Contact Us</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start">
                <span className="text-pink-500 mr-3 mt-1"><i className="fas fa-map-marker-alt"></i></span>
                123 Business Way, El Jadida, Morocco
              </li>
              <li className="flex items-center">
                <span className="text-pink-500 mr-3"><i className="fas fa-phone-alt"></i></span>
                +212 600-000000
              </li>
              <li className="flex items-center">
                <span className="text-pink-500 mr-3"><i className="fas fa-envelope"></i></span>
                support@bookingpro.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-pink-500 font-semibold mb-6 uppercase tracking-widest text-xs">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest features and updates.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-2 top-1.5 bg-gold text-dark-brown p-1.5 rounded-full hover:scale-105 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© {currentYear} BookingPro. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}