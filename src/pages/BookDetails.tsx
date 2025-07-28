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
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        {book.title}
      </h1>

      <div className="space-y-3 text-gray-700 text-base">
        <p>
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p>
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>
        <p>
          <span className="font-semibold">ISBN:</span> {book.isbn}
        </p>
        <p>
          <span className="font-semibold">Copies:</span> {book.copies}
        </p>
        <p>
          <span className="font-semibold">Available:</span>{" "}
          {book.available ? (
            <span className="text-green-600 font-semibold">✅ Yes</span>
          ) : (
            <span className="text-red-500 font-semibold">❌ No</span>
          )}
        </p>
      </div>

      <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-4">
        <Link
          to={`/edit-book/${book._id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md transition-colors duration-200"
        >
          ✏️ Edit Book
        </Link>
        <Link
          to={`/borrow/${book._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-colors duration-200"
        >
          📖 Borrow Book
        </Link>
        <Link to="/" className="text-gray-600 hover:underline mt-2 md:mt-0">
          ← Back to list
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;
