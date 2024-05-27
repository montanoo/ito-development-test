import Http from "./Http";

export default {
  get() {
    return Http.get("/info/all");
  },
  myBooks() {
    return Http.get("/info/my/books");
  },
  getPendingBooks() {
    return Http.get("/info/pending");
  },
  returnBook(id: number, borrowId: number) {
    return Http.post("/info/return", { id, borrowId });
  },
};
