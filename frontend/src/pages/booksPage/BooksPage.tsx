import { useLoaderData } from "react-router-dom";
import { IBook } from "../../hooks/useBooksFetch";

export default function BooksPage() {
  const book = useLoaderData() as IBook;
  return (
    <section className="flex-1">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="flex items-center w-full">{book.title}</div>
      </div>
    </section>
  );
}
