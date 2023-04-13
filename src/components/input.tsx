import { ChangeEventHandler, useCallback, useState } from "react";

interface Props {
    onSubmit: (zipCode: number) => Promise<void>;
}

export const InputSection: React.FunctionComponent<Props> = ({onSubmit}: Props) => {
    const [input, setInput] = useState("");

    const isValid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(input);

    const changeHandler = (e:any) => {
        const { value } = e.target;
        setInput(value)
    }

    const submitHandler = useCallback(() => {
        onSubmit(parseInt(input));
        setInput("");
    }, [input, onSubmit]);

    return <div className="flex flex-col gap-2 m-auto p-10">
        <label className="text-3xl">Zip Code</label>
        <input type='number' value={input} onChange={changeHandler} className="text-2xl w-[50%] text-black"/>
        <button disabled={!isValid} type="submit" onClick={submitHandler} className="border-2 border-solid border-white max-w-[200px]">Get Forecast</button>
    </div>
}