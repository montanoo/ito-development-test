import Http from "./Http";

export interface ICreateBook {
  title: string;
  publishedYear: number;
  authorId: number;
  genreId: number;
  stock: number;
}

export default {
  getBooks(page: number, query: string) {
    return Http.get(`/books/all?page=${page ?? 1}&${query}`);
  },
  getById(id: number) {
    return Http.get(`/books/${id}`);
  },
  create(data: ICreateBook) {
    return Http.post("/books/create", data);
  },
  requestCopy(id: number) {
    return Http.post("/info/request", { id });
  },
};
