import "./style.css";

// Componente de botão genérico para padronização da identidade visual e comportamento.
export default function Button(props: {
  descricao: string; // Texto que será exibido no botão.
  onClick?: () => void; // Função de callback opcional para o evento de clique.
  className?: string; // Permite a passagem de classes CSS adicionais para customização específica.
  disabled?: boolean; // Controla o estado de interatividade (usado na regra de validação de menor de idade).
  typeButton?: "button" | "submit" | "reset"; // Define o comportamento do botão em formulários.
}) {
  return (
    <>
      <button
        // Combina a classe base com classes externas via template string.
        className={`custom-button ${props.className || ""}`}
        onClick={props.onClick}
        type={props.typeButton || "button"}
        disabled={props.disabled}
      >
        {props.descricao}
      </button>
    </>
  );
}
