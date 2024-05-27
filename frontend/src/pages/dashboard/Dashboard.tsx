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
        <h1 className="text-2xl font-bold md:my-8 mt-24">All borrowed Books</h1>
        <div className="grid grid-cols-2 md:grid-grid-cols-3 lg:grid-cols-5 md:gap-8 gap-1 pb-4">
          {bookInfo.map((book) => (
            <div key={book.Books.id}>
              <BookCard
                book={book.Books}
                removeCheckout
                hasAction={() => returnBook(book.Books.id)}
              />
              <p className="text-xs">borrowed by: </p>
              <p className="font-bold text-xs break-all">{book.User.email}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
