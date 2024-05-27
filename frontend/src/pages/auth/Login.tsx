import { RefObject, useRef, useState } from "react";
import Form from "../../components/form/Form";
import { IError } from "../../components/form/Input";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import Auth from "../../requests/Auth";

export default function Login() {
  const email: RefObject<HTMLInputElement> = useRef(null);
  const password: RefObject<HTMLInputElement> = useRef(null);
  const [error, setError] = useState<IError | undefined>();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email?.current?.value && password?.current?.value) {
      Auth.login({
        email: email.current.value,
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
    <Form
      handleSubmit={handleSubmit}
      error={error}
      email={email}
      password={password}
      type="Login"
      text={["Hello,", "Welcome back!"]}
    />
  );
}
