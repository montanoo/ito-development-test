import { Link } from "react-router-dom";
import useUserStore from "../../stores/userStore";

export default function Header() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  console.log(user);

  return (
    <header className="bg-green-50 py-4 border-b sticky top-0 z-10">
      <div
        className={`max-w-[1300px] grid ${
          user ? "grid-cols-3" : "grid-cols-2"
        } mx-auto px-4 items-center`}
      >
        <h3 className="font-bold text-3xl">
          <Link to="/" className="cursor-pointer">
            Books.com
          </Link>
        </h3>

        {user && (
          <div className="flex items-center justify-end gap-4 font-bold">
            {user.exists.roleId === 1 && (
              <>
                <Link
                  to="/register"
                  className="underline underline-offset-4
                  hover:text-green-800 transition-colors duration-300"
                >
                  New user
                </Link>
                <Link
                  to="/dashboard"
                  className="underline underline-offset-4
                  hover:text-green-800 transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/books/new"
                  className="underline underline-offset-4
                  hover:text-green-800 transition-colors duration-300"
                >
                  New book
                </Link>
              </>
            )}

            <div className="flex items-center justify-end gap-4 font-bold">
              <Link
                to="/my/books"
                className="underline underline-offset-4
                  hover:text-green-800 transition-colors duration-300"
              >
                My books
              </Link>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          {user && (
            <button
              onClick={logout}
              className="hover:text-green-800 font-bold transition-colors duration-300"
            >
              Logout
            </button>
          )}
          {!user && (
            <div className="flex gap-4 font-bold ">
              <Link
                to="/login"
                className="hover:text-green-800 transition-colors duration-300"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
