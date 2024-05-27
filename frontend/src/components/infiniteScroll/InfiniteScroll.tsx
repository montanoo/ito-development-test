import { useCallback, useRef, useState } from "react";
import useBooksFetch, { BooksFetchResult } from "../../hooks/useBooksFetch";
import BookCard from "../book/BookCard";

export default function InfiniteScroll(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const { books, anotherPage, loading }: BooksFetchResult = useBooksFetch({
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
  return (
    <section>
      <div className="max-w-[1300px] mx-auto px-4">
        <h1 className="font-bold text-4xl pt-12 pb-6">Available books</h1>
        <div className="grid grid-cols-5 gap-8">
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
