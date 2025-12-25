import "./style.css";

// Define a estrutura padrão para as opções do dropdown.
interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  className?: string;
}

// Componente de seleção customizado para garantir a consistência visual dos formulários.
export default function Select(props: SelectProps) {
  return (
    <div className={`form-group ${props.className || ""}`}>
      {props.label && <label>{props.label}</label>}
      <select
        className="custom-input"
        required={props.required}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {/* Placeholder padrão para incentivar a seleção explícita pelo usuário. */}
        <option value="">Selecione...</option>

        {/* Renderização dinâmica das opções baseada nas listas enviadas via props. */}
        {props.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
