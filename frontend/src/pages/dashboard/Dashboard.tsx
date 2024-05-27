import { useLoaderData } from "react-router-dom";
import BookCard from "../../components/book/BookCard";
import { IInformation } from "../myBooks/MyBooks";
import Information from "../../requests/Information";
import { useState } from "react";

interface FullInformation extends IInformation {
  User: {
    id: string;
    email: string;
    roleId: number;
    password: string;
    createdAt: string;
  };
}

export default function Dashboard() {
  const info = useLoaderData() as FullInformation[];

  const [bookInfo, setBookInfo] = useState<FullInformation[]>(info);

  async function returnBook(id: number) {
    await Information.returnBook(id);
    const books = await Information.getPendingBooks();
    setBookInfo(books.data);
  }

  console.log(bookInfo);

  return (
    <section className="flex-1">
      <div className="max-w-[1300px] mx-auto px-4">
        <h1 className="text-2xl font-bold my-8">All borrowed Books</h1>
        <div className="grid grid-cols-5 gap-4">
          {bookInfo.map((book) => (
            <div key={book.Books.id}>
              <BookCard
                book={book.Books}
                removeCheckout
                hasAction={() => returnBook(book.Books.id)}
              />
              <p className="font-bold text-xs">
                borrowed by: {book.User.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
