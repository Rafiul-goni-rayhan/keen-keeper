import Link from "next/link";
import { FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center gap-6">
        <h2 className="text-3xl font-bold">KeenKeeper</h2>
        <p className="text-sm opacity-80 max-w-xl">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="flex flex-col items-center gap-3 mt-4">
          <span className="text-sm font-medium">Social Links</span>
          <div className="flex gap-4">
            <Link href="#" className="bg-white text-primary p-2 rounded-full hover:scale-110 transition-transform">
              <FaYoutube className="text-xl" />
            </Link>
            <Link href="#" className="bg-white text-primary p-2 rounded-full hover:scale-110 transition-transform">
              <FaFacebook className="text-xl" />
            </Link>
            <Link href="#" className="bg-white text-primary p-2 rounded-full hover:scale-110 transition-transform">
              <FaTwitter className="text-xl" />
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs opacity-70 mt-8 border-t border-white/20 pt-6">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}