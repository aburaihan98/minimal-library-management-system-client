import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../app/api/bookApi";
import type { IBook } from "../types/book";

export default function BookTable() {
  const { data: books, isLoading } = useGetBooksQuery(undefined);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">📚 All Books</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Author</th>
              <th className="p-2">Genre</th>
              <th className="p-2">ISBN</th>
              <th className="p-2">Copies</th>
              <th className="p-2">Available</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.data?.map((book: IBook) => (
              <tr key={book._id} className="border-t">
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">{book.genre}</td>
                <td className="p-2">{book.isbn}</td>
                <td className="p-2">{book.copies}</td>
                <td className="p-2">{book.available ? "✅" : "❌"}</td>
                <td className="p-2 space-x-2">
                  <Link to={`/books/${book._id}`} className="text-blue-600">
                    View
                  </Link>
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="text-green-600"
                  >
                    Edit
                  </Link>
                  <Link to={`/borrow/${book._id}`} className="text-purple-600">
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
