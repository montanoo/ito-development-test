import { FC, ReactNode, RefObject } from "react";
import image from "../../assets/forms__main.jpg";
import Input, { IError } from "../../components/form/Input";

interface FormProps {
  handleSubmit: () => void;
  error?: IError;
  email: RefObject<HTMLInputElement>;
  password: RefObject<HTMLInputElement>;
  type: string;
  text: string[];
  children?: ReactNode; // Ensure children are correctly typed
}

const Form: FC<FormProps> = ({
  handleSubmit,
  error,
  email,
  password,
  type,
  text,
  children,
}) => {
  return (
    <section className="flex-1 grid grid-cols-2">
      <div className="flex flex-col justify-center max-w-[1300px] mx-auto px-4">
        <div>
          <div className="font-bold text-gray-300 pb-8">developmentest</div>
          <h3 className="text-8xl">{text[0]}</h3>
          <h4 className="font-bold text-7xl pb-8">{text[1]}</h4>
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
            reference={email}
            error={error}
          />
          {children}
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
            <button
              className="bg-black text-white font-bold px-6 py-2 rounded-md"
              type="submit"
            >
              {type}
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
};

export default Form;
