import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-green-50 py-4 border-b sticky top-0">
      <div className="max-w-[1300px] grid grid-cols-2 mx-auto px-4 items-center">
        <h3 className="font-bold text-3xl">
          <Link to="/" className="cursor-pointer">
            Books.com
          </Link>
        </h3>
        <div className="flex items-center justify-end gap-4 font-bold">
          <Link
            to="/login"
            className="hover:text-green-800 transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-xl py-2 px-4 bg-black text-white
            hover:bg-green-800 transition-colors duration-300"
          >
            Start for free
          </Link>
        </div>
      </div>
    </header>
  );
}
