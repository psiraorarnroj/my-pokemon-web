import "./index.scss";

interface IButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled = false }: IButtonProps) => {
  return (
    <button
      className="button-container rounded-lg px-6 py-2 transition-colors duration-300"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
