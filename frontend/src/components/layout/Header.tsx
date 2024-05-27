import { Link } from "react-router-dom";
import useUserStore from "../../stores/userStore";

export default function Header() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <header className="bg-green-50 py-4 border-b sticky top-0 z-10">
      <div className="max-w-[1300px] grid grid-cols-2 mx-auto px-4 items-center">
        <h3 className="font-bold text-3xl">
          <Link to="/" className="cursor-pointer">
            Books.com
          </Link>
        </h3>
        {!user && (
          <div className="flex items-center justify-end gap-4 font-bold">
            <Link
              to="/login"
              className="hover:text-green-800 transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        )}
        {user && (
          <div className="flex items-center justify-end gap-4 font-bold">
            {user.exists.roleId === 1 && (
              <>
                <Link
                  to="/register"
                  className="rounded-xl py-2 px-4 bg-black text-white
                  hover:bg-green-800 transition-colors duration-300"
                >
                  New student
                </Link>
                <Link
                  to="/books/register"
                  className="rounded-xl py-2 px-4 bg-black text-white
                  hover:bg-green-800 transition-colors duration-300"
                >
                  New book
                </Link>
              </>
            )}
            <button
              onClick={logout}
              className="hover:text-green-800 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
