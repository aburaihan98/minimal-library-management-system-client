import { useGetBorrowSummaryQuery } from "../app/api/bookApi";

export default function BorrowSummary() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading summary...</p>;
  if (error) return <p>Failed to load summary</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border">Title</th>
            <th className="text-left p-2 border">ISBN</th>
            <th className="text-left p-2 border">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item: any, index: number) => (
            <tr key={index} className="border-t">
              <td className="p-2 border">{item.book.title}</td>
              <td className="p-2 border">{item.book.isbn}</td>
              <td className="p-2 border">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
