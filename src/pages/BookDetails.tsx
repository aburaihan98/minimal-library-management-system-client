import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetSingleBookQuery } from "../app/api/bookApi";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGetSingleBookQuery(id);
  console.log(data);

  const book = data?.data[0];

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error || !book)
    return (
      <div className="text-center mt-10 text-red-500">Book not found!</div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Copies:</strong> {book.copies}
      </p>
      <p>
        <strong>Available:</strong> {book.available ? "✅ Yes" : "❌ No"}
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          to={`/edit-book/${book._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit Book
        </Link>
        <Link
          to={`/borrow/${book._id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Borrow Book
        </Link>
        <Link to="/" className="text-gray-500 underline mt-2">
          ← Back to list
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;
