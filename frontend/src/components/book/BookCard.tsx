import { Link } from "react-router-dom";
import { IBook } from "../../hooks/useBooksFetch";

export default function BookItem({ book }: { book: IBook }) {
  return (
    <div className="font-bold bg-gray-200/30 px-4 py-4 rounded-lg">
      <Link to={`/books/${book.id}`}>
        <div className="h-[300px] w-full rounded-xl bg-gray-400 animate-pulse" />
        <p className="text-lg mt-2">{book.title}</p>
        <p className="text-gray-600">
          {book.Author.name} -{" "}
          <span className="text-red-800 font-extrabold text-xs">
            {book.stock}
          </span>
        </p>
        <p className="text-sm pb-2">{book.Genre.name}</p>
        {book.stock ? (
          <div className="w-full bg-green-300 rounded-md cursor-pointer text-sm mb-2 px-2 py-2">
            Checkout
          </div>
        ) : (
          <p className="text-red-500 text-sm py-2">Out of stock.</p>
        )}
      </Link>
    </div>
  );
}
