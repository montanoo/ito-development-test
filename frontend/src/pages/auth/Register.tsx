import { RefObject, useRef, useState } from "react";
import Form from "../../components/form/Form";
import { IError } from "../../components/form/Input";
import { AxiosResponse } from "axios";
import Auth from "../../requests/Auth";
import Select from "../../components/form/Select";
import { useLoaderData } from "react-router-dom";
import { Information } from "../newBook/NewBook";

export default function Login() {
  const info = useLoaderData() as Information;
  const email: RefObject<HTMLInputElement> = useRef(null);
  const password: RefObject<HTMLInputElement> = useRef(null);
  const type: RefObject<HTMLSelectElement> = useRef(null);

  const [error, setError] = useState<IError | undefined>();

  const handleSubmit = () => {
    if (email?.current && password?.current && type?.current) {
      Auth.register({
        email: email.current.value,
        password: password.current.value,
        roleId: Number(type.current.value),
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
      text={["Register", "new account!"]}
    >
      <Select array={info.roles} reference={type} label="Roles:" />
    </Form>
  );
}
