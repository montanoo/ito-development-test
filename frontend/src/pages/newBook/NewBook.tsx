import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Input from "../../components/form/Input";
import Books, { ICreateBook } from "../../requests/Books";
import Select from "../../components/form/Select";

export interface Genre {
  id: number;
  name: string;
  description: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Roles {
  id: number;
  name: string;
  description: string;
}

export interface Information {
  genres: Genre[];
  authors: Author[];
  roles: Roles[];
}

export default function NewBook() {
  const info = useLoaderData() as Information;
  const title = useRef<HTMLInputElement>(null);
  const genre = useRef<HTMLSelectElement>(null);
  const year = useRef<HTMLInputElement>(null);
  const author = useRef<HTMLSelectElement>(null);
  const stock = useRef<HTMLInputElement>(null);

  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = () => {
    if (
      title.current?.value &&
      genre.current?.value &&
      year.current?.value &&
      author.current?.value &&
      stock.current?.value
    ) {
      const data: ICreateBook = {
        title: title.current.value,
        publishedYear: Number(year.current.value),
        authorId: Number(author.current.value),
        genreId: Number(genre.current.value),
        stock: Number(stock.current.value),
      };
      Books.create(data).then(() => {
        setSuccess(true);
      });
    }
  };

  return (
    <section className="max-w-[1300px] mx-auto md:px-4 flex-1 flex justify-center flex-col">
      <div className="font-bold text-gray-300">developmentest</div>
      <h1 className="font-bold text-4xl py-4 mb-2">
        Add new book<span className="text-green-500">.</span>
      </h1>
      <div className="bg-green-100/15 px-12 py-8 rounded-lg">
        <form
          className="flex flex-col gap-8 mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Input
              name="title"
              type="text"
              placeholder="The Amazing World of Gumball"
              label="Title: "
              reference={title}
            />
            <Select label="Genres:" array={info.genres} reference={genre} />
            <Input
              name="year"
              type="number"
              placeholder="2024"
              label="Year: "
              reference={year}
            />
            <Select label="Authors:" array={info.authors} reference={author} />
          </div>
          <Input
            name="stock"
            type="mumber"
            placeholder="20"
            label="Stock: "
            reference={stock}
          />
          <button
            type="submit"
            className="font-bold text-lg bg-black text-white w-full py-4 rounded-md hover:bg-black/70 transition-colors duration-300"
          >
            Add Book
          </button>
        </form>
        {success && (
          <div>
            <span className="text-green-500">You have created a new book!</span>
          </div>
        )}
      </div>
    </section>
  );
}
