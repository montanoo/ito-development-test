import image from "../../assets/forms__main.jpg";
import Input, { IError } from "../../components/form/Input";
import { RefObject, useRef, useState } from "react";
import Auth from "../../requests/Auth";
import useUserStore from "../../stores/userStore";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef: RefObject<HTMLInputElement> = useRef(null);
  const password: RefObject<HTMLInputElement> = useRef(null);
  const [error, setError] = useState<IError | undefined>();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (emailRef?.current?.value && password?.current?.value) {
      Auth.login({
        email: emailRef.current.value,
        password: password.current.value,
      })
        .then((res: AxiosResponse) => {
          console.log(res.data);
          setUser(res.data);
          localStorage.setItem("token", res.data.token);
          setError(undefined);
          navigate("/");
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  };

  return (
    <section className="flex-1 grid grid-cols-2">
      <div className="flex flex-col justify-center max-w-[1300px] mx-auto px-4">
        <div>
          <div className="font-bold text-gray-300 pb-8">developmenttest</div>
          <h3 className="text-8xl">Hello,</h3>
          <h4 className="font-bold text-7xl pb-8">Welcome back!</h4>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-gray-200/30 px-8 py-8 rounded-xl flex flex-col gap-4"
        >
          <Input
            name="email"
            type="email"
            placeholder="john.doe@mail.com"
            label="Email:"
            reference={emailRef}
            error={error}
          />
          <Input
            name="password"
            type="password"
            placeholder="*********"
            label="Password:"
            reference={password}
            error={error}
          />
          {error && <p className="text-red-500">{error.error}</p>}
          <div>
            <button className="bg-black text-white font-bold px-6 py-2 rounded-md">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="relative">
        <img
          src={image}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
