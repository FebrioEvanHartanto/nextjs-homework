const Button = ({ buttonText, type }) => {
  return (
    <button
      type={type}
      className="px-4 py-2 bg-blue-500 text-white hover:text-gray-500"
    >
      {buttonText}
    </button>
  );
};

export default Button;
