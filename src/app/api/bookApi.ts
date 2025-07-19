import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Book"],
  endpoints: (build) => ({
    createBook: build.mutation({
      query: (newBook) => ({
        url: "create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),
    getBooks: build.query({
      query: () => "books",
      providesTags: ["Book"],
    }),
    getSingleBook: build.query({
      query: (id) => `books/${id}`,
    }),
    updateBook: build.mutation({
      query: ({ id, ...updateBook }) => ({
        url: `edit-book/${id}`,
        method: "PUT",
        body: updateBook,
      }),
      invalidatesTags: ["Book"],
    }),
    createBorrow: build.mutation({
      query: ({ bookId, quantity, dueDate }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body: { book: bookId, quantity, dueDate },
      }),
    }),
    getBorrowSummary: build.query({
      query: () => "borrow-summary",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useCreateBorrowMutation,
  useGetBorrowSummaryQuery,
} = bookApi;
