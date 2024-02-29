import React from "react";

/**
 * The `Form` component in JavaScript React renders a form with specified inputs and styling, allowing
 * for submission with a custom submit button label.
 * @returns The `Form` component is being returned. It is a functional component that renders a form
 * with a title, inputs, and a submit button. The form includes input fields based on the `inputs`
 * array provided as a prop. The form also has a submit button with a label specified by the
 * `submitBtnLabel` prop. The `onSubmit` function is called when the form is submitted.
 */

export default function Form({
    formTitle,
    onSubmit,
    submitBtnLabel,
    inputs,
    disableSubmit,
}) {
    return (
        <>
            <form
                className="flex flex-col justify-center gap-2 w-108 p-8 font-sans text-left bg-gray-300 rounded"
                onSubmit={onSubmit}
            >
                <h1 className="font-bold text-2xl">{formTitle}</h1>
                {inputs?.map((input, index) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center text-left w-full"
                        >
                            <label
                                htmlFor={input?.name}
                                className="max-w-100% self-start font-bold mb-3"
                            >
                                {input?.title}
                            </label>
                            <input
                                className={
                                    "appearance-none w-full leading-tight box-border py-2 px-3 mx-1 border-2 border-solid border-gray-400 rounded invalid:border-red-500 valid:border-green-500 " +
                                    input?.peer
                                }
                                type={input?.type ?? "text"}
                                name={input?.name}
                                id={input?.name}
                                placeholder={input?.placeholder}
                                required={input?.required ?? false}
                                value={input?.value}
                                pattern={input?.pattern}
                                onChange={(e) => input?.onChange(e)}
                            />
                            <span
                                className={
                                    "text-red-500 font-semibold mt-1 self-start " +
                                    input?.peerClass
                                }
                            >
                                {input?.errorMessage}
                            </span>
                        </div>
                    );
                })}
                <button
                    className="button disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400 mt-5"
                    type="submit"
                    disabled={disableSubmit}
                >
                    {submitBtnLabel}
                </button>
            </form>
        </>
    );
}
