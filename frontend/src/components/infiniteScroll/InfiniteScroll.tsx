import { RefObject, useCallback, useRef, useState } from "react";
import useBooksFetch, { BooksFetchResult } from "../../hooks/useBooksFetch";
import BookCard from "../book/BookCard";
import { Information } from "../../pages/newBook/NewBook";
import Input from "../form/Input";
import Select from "../form/Select";

export default function InfiniteScroll({
  info,
}: {
  info: Information;
}): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const { books, anotherPage, loading }: BooksFetchResult = useBooksFetch({
    query,
    page,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItem = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && anotherPage) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, anotherPage]
  );

  const book: RefObject<HTMLInputElement> = useRef(null);
  const author: RefObject<HTMLSelectElement> = useRef(null);
  const genres: RefObject<HTMLSelectElement> = useRef(null);

  const handleSearch = () => {
    if (book.current && author.current && genres.current) {
      setQuery(
        `title=${book.current.value}&authorId=${author.current.value}&genreId=${genres.current.value}`
      );
    }
  };

  return (
    <section>
      <div className="max-w-[1300px] mx-auto px-4">
        <h1 className="font-bold text-4xl pt-12 pb-6">Available books</h1>
        <div>
          <h2 className="font-bold text-xl pb-6">Filters:</h2>
          <form
            className="pb-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                name="book"
                type="text"
                placeholder="Enter a book name here..."
                reference={book}
              />
              <Select
                array={info.authors}
                reference={author}
                type="author"
                shouldBeDisabled={false}
              />
              <Select
                array={info.genres}
                reference={genres}
                type="genre"
                shouldBeDisabled={false}
              />
            </div>
            <button className="w-full bg-black text-white py-4 px-2 rounded-md font-bold">
              Submit search
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 md:grid-grid-cols-3 lg:grid-cols-5 gap-8">
          {books &&
            books.map((book, idx) => {
              if (books.length === idx + 1) {
                return (
                  <div ref={lastItem} key={idx}>
                    <BookCard book={book} />
                  </div>
                );
              } else {
                return (
                  <div key={idx}>
                    <BookCard book={book} />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </section>
  );
}
