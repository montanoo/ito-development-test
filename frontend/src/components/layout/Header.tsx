import { Link } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const routes = {
  admin: [
    { path: "/register", label: "New user" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/books/new", label: "New book" },
  ],
  user: [{ path: "/my/books", label: "My books" }],
  guest: [{ path: "/login", label: "Login" }],
};

export default function Header() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [menu, setMenu] = useState<boolean>(false);

  const handleNavClick = () => {
    setMenu(false);
  };

  return (
    <header className="bg-green-50 py-4 border-b fixed w-full top-0 z-10">
      <div className="max-w-[1300px] grid md:grid-cols-3 grid-cols-2 mx-auto px-4 items-center">
        <h3 className="font-bold md:text-3xl">
          <Link to="/" className="cursor-pointer">
            Books.com
          </Link>
        </h3>

        <div className="hidden md:block">
          {user && (
            <div className="flex items-center justify-center gap-4 font-bold">
              {user.exists.roleId === 1 &&
                routes.admin.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="underline underline-offset-4 hover:text-green-800 transition-colors duration-300"
                  >
                    {route.label}
                  </Link>
                ))}
              {routes.user.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className="underline underline-offset-4 hover:text-green-800 transition-colors duration-300"
                >
                  {route.label}
                </Link>
              ))}
            </div>
          )}
          <div className="flex justify-end">
            {!user &&
              routes.guest.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className="hover:text-green-800 transition-colors duration-300"
                >
                  {route.label}
                </Link>
              ))}
          </div>
        </div>
        <div className="hidden md:flex justify-end">
          {user && (
            <button
              onClick={logout}
              className="hover:text-green-800 font-bold transition-colors duration-300"
            >
              Logout
            </button>
          )}
        </div>

        <div className="flex justify-end md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            onClick={() => setMenu(true)}
          />
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div
            className="absolute px-4 py-4 z-30 h-[100vh] rounded-[5px] w-full bg-emerald-50 top-0 left-0"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <div className="flex justify-end px-4 left-0 fixed w-full h-full">
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                onClick={() => setMenu(false)}
                className="z-30"
              />
            </div>
            <div className="flex z-20 flex-col gap-5 justify-start mt-8 text-xl font-bold h-full">
              {user && (
                <>
                  <div className="flex flex-col items-start justify-start gap-4 font-bold">
                    {user.exists.roleId === 1 &&
                      routes.admin.map((route) => (
                        <Link
                          key={route.path}
                          to={route.path}
                          onClick={handleNavClick}
                          className="underline underline-offset-4 hover:text-green-800 transition-colors duration-300"
                        >
                          {route.label}
                        </Link>
                      ))}
                    {routes.user.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        onClick={handleNavClick}
                        className="underline underline-offset-4 hover:text-green-800 transition-colors duration-300"
                      >
                        {route.label}
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={logout}
                    className="hover:text-green-800 font-bold flex items-end pb-6 transition-colors duration-300 h-full"
                  >
                    Logout
                  </button>
                </>
              )}
              <div className="flex flex-col justify-end">
                {!user &&
                  routes.guest.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      onClick={handleNavClick}
                      className="hover:text-green-800 transition-colors duration-300"
                    >
                      {route.label}
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
