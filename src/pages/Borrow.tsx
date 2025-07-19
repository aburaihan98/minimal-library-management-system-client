import React, { useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
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
      console.log({ bookId, quantity, dueDate });

      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch {
      toast.error("Failed to borrow book");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Borrow Book: {book.title}</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Quantity</label>
          <input
            type="number"
            value={quantity}
            min={1}
            max={book.copies}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            placeholder={`Max: ${book.copies}`}
          />
          {errors.quantity && (
            <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.dueDate && (
            <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isBorrowing}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          {isBorrowing ? "Borrowing..." : "Borrow"}
        </button>
      </form>
    </div>
  );
}
