import Http from "./Http";

export default {
  getBooks(page: number) {
    return Http.get(`/books/all?page=${page ?? 1}`);
  },
  getById(id: number) {
    return Http.get(`/books/${id}`);
  },
};
