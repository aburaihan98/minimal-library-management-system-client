import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useCreateBorrowMutation,
  useGetSingleBookQuery,
} from "../app/api/bookApi";

export default function Borrow() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleBookQuery(bookId!);
  const book = data?.data[0];

  const [borrowBook, { isLoading: isBorrowing }] = useCreateBorrowMutation();

  const [quantity, setQuantity] = useState<number>(1);
  const [dueDate, setDueDate] = useState<string>("");
  const [errors, setErrors] = useState<{ quantity?: string; dueDate?: string }>(
    {}
  );

  if (isLoading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found</p>;

  const validate = () => {
    const newErrors: { quantity?: string; dueDate?: string } = {};
    if (quantity < 1) newErrors.quantity = "Quantity must be at least 1";
    else if (quantity > book.copies)
      newErrors.quantity = `Quantity cannot exceed available copies (${book.copies})`;

    if (!dueDate) newErrors.dueDate = "Due date is required";
    else if (isNaN(Date.parse(dueDate))) newErrors.dueDate = "Invalid date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await borrowBook({ bookId: book?._id, quantity, dueDate }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch {
      toast.error("Failed to borrow book");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Borrow Book: <span className="text-black">{book.title}</span>
      </h1>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Quantity Input */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            min={1}
            max={book.copies}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={`Max: ${book.copies}`}
          />
          {errors.quantity && (
            <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>

        {/* Due Date Input */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.dueDate && (
            <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isBorrowing}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors duration-300 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBorrowing ? "Borrowing..." : "Borrow"}
          </button>
        </div>
      </form>
    </div>
  );
}
