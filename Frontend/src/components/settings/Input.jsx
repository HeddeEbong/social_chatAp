const Input = (props) => {
  const { label, name, value, onChange, type, error, disabled,...rest } = props;

  const labelClasses = "text-gray-900 capitalize font-semibold";

  return (
    <div className="flex flex-col space-y-2 w-full sm:w-auto">
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label}`}
        className={`rounded-md border-2 shadow border-gray-300 focus:border-blue-500 p-3 ${
          error
            ? "!border-red-400 !focus:border-red-400"
            : `${disabled ? "opacity-50 cursor-not-allowed" : ""}`
        }`}
        disabled={props.loading}
        {...rest}
      />
      {error && <p className="text-red-500 max-w-[244px]">{error}</p>}
    </div>
  );
};

export default Input;
