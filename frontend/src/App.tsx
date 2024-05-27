import { Link } from "react-router-dom";
import image from "./assets/bg__main.jpg";
import InfiniteScroll from "./components/infiniteScroll/InfiniteScroll";
function App() {
  return (
    <>
      <section className="flex-1 flex flex-col justify-center bg-green-50/10 border-b">
        <div className="grid grid-cols-2 gap-4 max-w-[1300px] mx-auto px-4 py-48 items-center justify-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold max-w-[450px]">
              Find the books you are looking for:
              <p className="text-green-500/70">easier, faster.</p>
            </h2>
            <div className="flex justify-start">
              <Link
                to="/register"
                className="mt-4 rounded-xl bg-black text-white px-4 py-4 font-bold text-xl cursor-pointer hover:bg-black/80 transition-colors duration-300"
              >
                Get started
              </Link>
            </div>
          </div>
          <div>
            <img src={image} alt="" className=" rounded-md max-h-[400px]" />
          </div>
        </div>
      </section>
      <InfiniteScroll />
    </>
  );
}

export default App;
