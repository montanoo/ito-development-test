import { useState, useEffect } from "react";
import Books from "../requests/Books";
import axios, { CancelTokenSource } from "axios";

export interface IBook {
  id: number;
  title: string;
  publishedYear: number;
  authorId: number;
  genreId: number;
  stock: number;
  Author: {
    id: number;
    name: string;
  };
  Genre: {
    id: number;
    name: number;
    description: string;
  };
}

export interface BooksFetchResult {
  loading: boolean;
  error: boolean;
  books: IBook[];
  anotherPage: boolean;
}

export default function useBooksFetch({
  query,
  page,
}: {
  query: string;
  page: number;
}): BooksFetchResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [anotherPage, setAnotherPage] = useState<boolean>(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const cancel: CancelTokenSource | undefined = axios.CancelToken.source();
    Books.getBooks(page, query)
      .then((res) => {
        console.log(res);
        setBooks((previous) => {
          return [...new Set([...previous, ...res.data.books])];
        });
        setAnotherPage(res.data.lastPage > page);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => {
      if (cancel) cancel.cancel();
    };
  }, [query, page]);

  return { loading, error, books, anotherPage };
}
