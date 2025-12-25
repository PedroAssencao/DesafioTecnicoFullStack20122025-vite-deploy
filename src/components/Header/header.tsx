import "./style.css";

// Componente de cabeçalho para identificação do sistema e navegação superior.
export default function Header() {
  return (
    <nav id={"header-nav"} className={"header-nav-class"}>
      {/* Título principal da aplicação, mantendo a neutralidade solicitada no desafio. */}
      <h3>Controle Financeiro</h3>
    </nav>
  );
}
