const Button = (props) => {
  let buttonClasses =
    "p-2 rounded-md shadow border focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed";

  switch (props.role) {
    case "primary":
      buttonClasses +=
        " bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-700";
      break;
    case "secondary":
      buttonClasses +=
        " bg-blue-400 text-white hover:bg-blue-500 focus-visible:ring-blue-500";
      break;
    case "tertiary":
      buttonClasses +=
        " text-blue-500 hover:text-blue-600 focus-visible:ring-blue-400";
      break;
    case "warning":
      buttonClasses += "bg-red-600";
      break;
    default:
      buttonClasses +=
        " bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-600";
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick?props.onClick:null}
      className={buttonClasses}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
