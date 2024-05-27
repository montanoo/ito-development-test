import { RefObject } from "react";
import { Author, Genre } from "../../pages/newBook/NewBook";

export default function Select({
  label,
  array,
  reference,
  type,
  shouldBeDisabled,
}: {
  label?: string;
  array: Author[] | Genre[];
  reference: RefObject<HTMLSelectElement>;
  type?: string;
  shouldBeDisabled?: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      <label className="font-bold pl-1">{label} </label>
      <select
        className="bg-transparent rounded-md text-sm py-4 border h-full px-4"
        ref={reference}
        defaultValue=""
      >
        <option value="" disabled={shouldBeDisabled}>
          Select {type ?? "option"}
        </option>
        {array.map((iteration) => (
          <option key={iteration.id} value={iteration.id}>
            {iteration.name}
          </option>
        ))}
      </select>
    </div>
  );
}
