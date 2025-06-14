
import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Udemy Business</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="#" className="hover:text-white">Teach on Udemy</Link></li>
              <li><Link to="#" className="hover:text-white">Get the app</Link></li>
              <li><Link to="#" className="hover:text-white">About us</Link></li>
              <li><Link to="#" className="hover:text-white">Contact us</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Careers</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="#" className="hover:text-white">Blog</Link></li>
              <li><Link to="#" className="hover:text-white">Help and Support</Link></li>
              <li><Link to="#" className="hover:text-white">Affiliate</Link></li>
              <li><Link to="#" className="hover:text-white">Investors</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Terms</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="#" className="hover:text-white">Privacy policy</Link></li>
              <li><Link to="#" className="hover:text-white">Cookie settings</Link></li>
              <li><Link to="#" className="hover:text-white">Sitemap</Link></li>
              <li><Link to="#" className="hover:text-white">Accessibility statement</Link></li>
            </ul>
          </div>

          {/* Column 4 - Language Selector */}
          <div className="space-y-4">
            <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-800">
              <Globe className="w-4 h-4 mr-2" />
              English
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-purple-600 rounded"></div>
            <span className="text-xl font-bold">Udemy</span>
          </Link>
          <p className="text-gray-400 text-sm">© 2025 Udemy, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
