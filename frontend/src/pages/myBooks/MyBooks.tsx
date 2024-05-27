import { useLoaderData } from "react-router-dom";
import BookCard from "../../components/book/BookCard";
import { IBook } from "../../hooks/useBooksFetch";

export interface IInformation {
  id: number;
  userId: string;
  booksId: number;
  amount: number;
  state: string;
  date: string;
  Books: IBook;
}

export default function MyBooks() {
  const info = useLoaderData() as IInformation[];
  console.log(info);

  return (
    <section className="flex-1">
      <div className="max-w-[1300px] mx-auto px-4">
        <h1 className="text-2xl font-bold my-8">My borrowed books</h1>
        <div className="grid grid-cols-2 md:grid-grid-cols-3 lg:grid-cols-5 md:gap-8 gap-2">
          {info.map((book) => (
            <BookCard key={book.Books.id} book={book.Books} removeCheckout />
          ))}
        </div>
      </div>
    </section>
  );
}
