import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Send } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-[#E4E5E8] px-18 pt-14 pb-8">
      <div className="grid grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-[#1D1F23] font-bold text-lg">Evently</h3>
          <p className="text-neutral-500 text-sm leading-6 mt-3 max-w-xs">
            Your premium destination for seamless event booking, from live music
            to sports and theatre. Experience entertainment, simplified.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-[#1D1F23] font-bold text-lg">Explore</h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm text-neutral-500">
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              Concerts
            </li>
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              Sports
            </li>
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              Theatre
            </li>
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              Comedy Shows
            </li>
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              Upcoming Events
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-[#1D1F23] font-bold text-lg">Company</h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm text-neutral-500">
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              About Us
            </li>
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              Help Center
            </li>
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              Terms of Service
            </li>
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              Privacy Policy
            </li>
            <li className="hover:text-[#6365f1] cursor-pointer transition-colors">
              Careers
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-[#1D1F23] font-bold text-lg">Stay Updated</h3>
          <p className="text-neutral-500 text-sm leading-6 mt-3">
            Join our newsletter for the latest event drops.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-10 flex-1 px-3 text-sm rounded-lg border border-neutral-300 bg-white outline-none text-neutral-700 placeholder:text-neutral-400 focus:border-[#6365f1]"
            />
            <button
              aria-label="Subscribe"
              className="h-10 w-10 shrink-0 flex items-center justify-center bg-[#6365f1] hover:bg-[#4f51e9] rounded-lg transition-colors"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-14 pt-6 text-sm text-neutral-500">
        <p>© 2026 Evently. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-[#6365f1] transition-colors"
          >
            <FaFacebookF size={16} />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-[#6365f1] transition-colors"
          >
            <FaTwitter size={16} />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-[#6365f1] transition-colors"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href="#"
            aria-label="Youtube"
            className="hover:text-[#6365f1] transition-colors"
          >
            <FaYoutube size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
