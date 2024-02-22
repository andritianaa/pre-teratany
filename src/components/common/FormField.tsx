import { Field } from "formik";

const FormField = (props: any) => {
  return (
    <>
      <div className="flex justify-between items-center mt-2">
        <label
          htmlFor={props.mark}
          className="block text-sm white:text-white pb-2"
        >
          {props.label}
        </label>
        {props.extra && (
          <a
            className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
            href="../examples/html/recover-account.html"
          >
            {props.extraDesc}
          </a>
        )}
      </div>
      <div className="relative">
        <Field
          type={props.type}
          id={props.mark}
          name={props.mark}
          className={
            props.height +
            " " +
            props.width +
            " custom-border px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 white:bg-gray-800 white:border-gray-700 white:text-gray-400"
          }
          aria-describedby="email-error"
          value={props.value}
        />
      </div>
    </>
  );
};

export default FormField;
