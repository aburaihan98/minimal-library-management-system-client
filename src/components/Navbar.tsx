import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white py-4 px-4 md:px-8 lg:px-16 shadow-md">
      <div className="flex items-center justify-between">
        <Link to="/">
          <h1 className="text-xl font-bold">📚 MyLibrary</h1>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/books" className="hover:underline">
            All Books
          </Link>
          <Link to="/create-book" className="hover:underline">
            Add Book
          </Link>
          <Link to="/borrow-summary" className="hover:underline">
            Borrow Summary
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 py-1">
          <Link
            to="/books"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            All Books
          </Link>
          <Link
            to="/create-book"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Add Book
          </Link>
          <Link
            to="/borrow-summary"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Borrow Summary
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
