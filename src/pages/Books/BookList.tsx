import { Link, useNavigate } from "react-router-dom";
import { useDeleteBookMutation, useGetBooksQuery } from "../../app/api/bookApi";
import type { IBook } from "../../types/book";
import Swal from "sweetalert2";

function BookList() {
  const { data: books, isLoading } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook({ id }).unwrap();
        await Swal.fire("Deleted!", "Book deleted successfully.", "success");
        navigate("/books");
      } catch (error) {
        console.error(error);
        await Swal.fire("Error!", "Failed to delete the book.", "error");
      }
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-16 overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">📚 All Books</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-center">
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
              <tr key={book._id} className="border-t text-center">
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">{book.genre}</td>
                <td className="p-2">{book.isbn}</td>
                <td className="p-2">{book.copies}</td>
                <td className="p-2">{book.copies === 0 ? "❌" : "✅"}</td>
                <td className="p-2 flex flex-wrap justify-center gap-3 text-center">
                  <Link
                    to={`/books/${book._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit-book/${book._id}`}
                    className="text-green-600 hover:underline font-medium"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-600 hover:underline font-medium cursor-pointer"
                    aria-label={`Delete ${book.title}`}
                  >
                    🗑️ Delete
                  </button>

                  {book.copies > 0 ? (
                    <Link
                      to={`/borrow/${book._id}`}
                      className="text-purple-600 hover:underline font-medium"
                    >
                      Borrow
                    </Link>
                  ) : (
                    <span className="text-gray-400 cursor-not-allowed font-medium select-none">
                      Unavailable
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookList;
