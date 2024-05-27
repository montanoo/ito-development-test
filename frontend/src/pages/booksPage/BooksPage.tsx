import React from "react";
import { useLoaderData } from "react-router-dom";
import { IBook } from "../../hooks/useBooksFetch";

export default function BooksPage() {
  const book: IBook = useLoaderData();
  console.log(book);
  return (
    <section className="max-w-[1300px] mx-auto px-4">
      <div className="flex items-center w-full">{book.title}</div>
    </section>
  );
}
