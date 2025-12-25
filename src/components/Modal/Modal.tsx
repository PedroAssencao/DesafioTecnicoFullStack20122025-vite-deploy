import "./style.css";

// Componente de sobreposição (Overlay) para exibição de formulários de cadastro e edição.
export default function Modal(props: {
  isOpen: boolean; // Controla a visibilidade do modal.
  onClose: () => void; // Função para fechar o modal e restaurar o estado da página.
  title: string; // Título dinâmico (ex: "PESSOA CADASTRO").
  children: React.ReactNode; // Conteúdo interno (PessoaForm, TransacaoForm, etc).
  size?: string; // Permite definir larguras diferentes conforme a necessidade do formulário.
}) {
  // Gerencia o comportamento do scroll da página principal para evitar conflitos visuais.
  if (props.isOpen) {
    document.querySelector("body")?.style.setProperty("overflow", "hidden");
  } else {
    document.querySelector("body")?.style.removeProperty("overflow");
    return null; // Não renderiza nada se o modal estiver fechado.
  }

  return (
    <div className="modal-overlay">
      <div className={"modal-content " + (props.size || "modal-sg")}>
        <div className="modal-header">
          <h3>{props.title}</h3>
          <button onClick={props.onClose} className="close-button">
            X
          </button>
        </div>
        <div className="modal-body">{props.children}</div>
      </div>
    </div>
  );
}
