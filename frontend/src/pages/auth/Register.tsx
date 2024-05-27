import { RefObject, useRef, useState } from "react";
import Form from "../../components/form/Form";
import { IError } from "../../components/form/Input";
import { AxiosResponse } from "axios";
import Auth from "../../requests/Auth";

export default function Login() {
  const email: RefObject<HTMLInputElement> = useRef(null);
  const password: RefObject<HTMLInputElement> = useRef(null);
  const [error, setError] = useState<IError | undefined>();

  const handleSubmit = () => {
    if (email?.current?.value && password?.current?.value) {
      Auth.register({
        email: email.current.value,
        password: password.current.value,
        roleId: 2,
      })
        .then((res: AxiosResponse) => {
          console.log(res.data);
          setError(undefined);
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
      type="Register"
      text={["Register", "new student!"]}
    />
  );
}
