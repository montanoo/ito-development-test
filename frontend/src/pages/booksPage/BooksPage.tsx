import { useLoaderData, useParams } from "react-router-dom";
import { IBook } from "../../hooks/useBooksFetch";
import Books from "../../requests/Books";
import { useState } from "react";

export default function BooksPage() {
  const { id } = useParams<{ id: string }>();
  const book = useLoaderData() as IBook;
  const [stock, setStock] = useState<number>(book.stock);
  const [error, setError] = useState<string>("");

  const handleClick = () => {
    Books.requestCopy(Number(id))
      .then(() => {
        setStock((prevStock) => prevStock - 1); // Update state
      })
      .catch(() => {
        setError("Already borrowed this book");
      });
  };

  return (
    <section className="flex-1 flex items-center">
      <div className="max-w-[1300px] mx-auto px-4 w-full">
        <div className="flex flex-col items-center w-full italic justify-center font-bold py-8 text-5xl relative my-8">
          <div className="w-full h-[350px] bg-gray-300 animate-pulse absolute rounded-sm" />
          <p className="z-20 text-lg mt-4 border-b border-b-black">
            <span className="text-green-500"> </span>
            {book?.Author?.name}
          </p>
          <h1 className="max-w-[400px] text-center z-20">
            {book.title}
            <span className="text-green-500">.</span>
          </h1>
          <div className="border rounded-xl z-20 border-black px-2 py-2 text-xs mt-4">
            {book.Genre.name}
          </div>
          <p className="z-20 text-lg mt-4">
            {stock ? `${stock} left` : "out of stock"}
          </p>
          {stock ? (
            <button
              onClick={handleClick}
              className="z-20 text-sm bg-black text-white font-bold px-4 py-4 rounded-md mt-2 hover:bg-black/80 transition-colors duration-300"
            >
              Request one
            </button>
          ) : (
            ""
          )}
          <div className="min-h-[1.2rem] mt-2">
            {error && <p className="text-xs text-red-500 z-20id">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
