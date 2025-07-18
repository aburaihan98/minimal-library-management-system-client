import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link to="/">
          <h1 className="text-xl font-bold">📚 MyLibrary</h1>
        </Link>
        <div className="flex gap-6">
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
    </nav>
  );
}
