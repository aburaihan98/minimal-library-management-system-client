import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateBookMutation } from "../app/api/bookApi";

export default function CreateBook() {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBook({ ...form, available: true });
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">➕ Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "author", "isbn", "description"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(form as any)[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="block w-full p-2 border rounded"
            required
          />
        ))}
        <select
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          className="block w-full p-2 border rounded"
          required
        >
          <option value="">Select Genre</option>
          <option value="FICTION">Fiction</option>
          <option value="NON_FICTION">Non-fiction</option>
          <option value="SCIENCE">Science</option>
          <option value="HISTORY">History</option>
          <option value="BIOGRAPHY">Biography</option>
          <option value="FANTASY">Fantasy</option>
        </select>

        <input
          type="number"
          placeholder="Copies"
          value={form.copies}
          onChange={(e) => setForm({ ...form, copies: Number(e.target.value) })}
          className="block w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
