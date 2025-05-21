import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: Install with `npm i lucide-react`

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-zinc-900 shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          Blogs
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-zinc-300 font-medium">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/add-blog" className="hover:text-white">Add Blog</Link>
          <Link to="/all-subscriber-mails" className="hover:text-white">All Subscribs Mails</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-zinc-300 hover:text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2 bg-zinc-900 text-zinc-300 font-medium">
          <Link to="/" className="block hover:text-white" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/add-blog" className="block hover:text-white" onClick={() => setMobileMenuOpen(false)}>Add Blog</Link>
        </nav>
      )}
    </header>
  );
}
