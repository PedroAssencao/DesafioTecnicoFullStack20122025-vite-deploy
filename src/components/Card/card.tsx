import type { ReactNode } from "react";
import type { tbodyItem } from "../../types/systemTypes/TableInterface";
import Table from "../BaseComponents/Table/Table";
import "./style.css";

// Componente de container versátil que padroniza as seções do Dashboard.
export default function Card(props: {
  className?: string;
  hasFooter?: boolean;
  hasHeader?: boolean;
  hasTable?: boolean;
  hasBodyComponent?: boolean;
  BodyComponent?: ReactNode; // Permite a injeção de componentes complexos no corpo do card.
  tableHead?: string[];
  tableBodyItems?: tbodyItem[];
  title?: string;
  headerComponent?: ReactNode; // Espaço para botões de ação no cabeçalho
}) {
  return (
    <div className={`card-container ${props.className || ""}`}>
      {/* Renderiza o cabeçalho se o título ou ações forem necessários. */}
      {props.hasHeader && (
        <div className="card-container-header">
          <h4>{props.title}</h4>
          <>{props.headerComponent}</>
        </div>
      )}

      <div className="card-container-body">
        {/* Integração automática com o componente Table se a flag hasTable estiver ativa. */}
        {props.hasTable && (
          <Table
            Thead={props.tableHead ?? []}
            tbodyItems={props.tableBodyItems ?? []}
          />
        )}

        {/* Permite a renderização de componentes de status ou outros blocos de UI. */}
        {props.hasBodyComponent && <>{props.BodyComponent}</>}
      </div>

      {/* Renderiza o rodapé se a flag for ativada. */}
      {props.hasFooter && <div className="card-container-footer"></div>}
    </div>
  );
}
