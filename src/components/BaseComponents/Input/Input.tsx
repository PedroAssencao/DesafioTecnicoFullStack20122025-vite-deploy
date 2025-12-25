import "./style.css";

// Componente de entrada de dados reutilizável com suporte a máscara monetária.
export default function Input(props: {
  label?: string;
  type?: "text" | "number" | "email" | "password" | "date";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  isCurrency?: boolean; // Define se o input deve se comportar como um campo de moeda (R$).
}) {
  // Aplica formatação em tempo real conforme a digitação.
  const applyMoneyMask = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");

    if (!cleanValue) return "";

    // Formata o número para o padrão pt-BR.
    const result = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(cleanValue) / 100);

    return result;
  };

  // Gerencia a mudança de valor, decidindo se aplica a máscara ou mantém o texto puro.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (props.isCurrency) {
      const masked = applyMoneyMask(inputValue);
      props.onChange(masked);
    } else {
      props.onChange(inputValue);
    }
  };

  return (
    <div className={`form-group ${props.className || ""}`}>
      {props.label && <label>{props.label}</label>}
      <div className="input-currency-wrapper">
        <input
          className={`custom-input ${
            props.isCurrency ? "input-with-prefix" : ""
          }`}
          // Forçado como "text" para suportar a máscara de caracteres especiais (vírgula/ponto).
          type="text"
          required={props.required}
          value={props.value}
          placeholder={props.placeholder}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
