import { useGetBorrowSummaryQuery } from "../app/api/bookApi";

export default function BorrowSummary() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading summary...</p>;
  if (error) return <p>Failed to load summary</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        📚 Borrow Summary
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">ISBN</th>
              <th className="text-left px-4 py-3">Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any, index: number) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                }
              >
                <td className="px-4 py-3 border-b border-gray-200">
                  {item.book.title}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {item.book.isbn}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {item.totalQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
