import "./style.css";
import { type tbodyItem } from "../../../types/systemTypes/TableInterface";
import Button from "../Button/Button";

// Componente de tabela genérico que renderiza dinamicamente cabeçalhos, dados e ações (CRUD).
export default function Table(props: {
  Thead: string[]; // Títulos das colunas definidos na chamada do componente.
  tbodyItems: tbodyItem[]; // Dados das linhas mapeados a partir das entidades (Pessoa, Categoria, Transação).
}) {
  return (
    <table className="table-component">
      <thead>
        <tr>
          {/* Mapeamento dos cabeçalhos da tabela. */}
          {props.Thead.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Renderização dinâmica das linhas baseada nos itens da propriedade tbodyItems. */}
        {props.tbodyItems.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.items.map((item, itemIndex) => (
              <td key={itemIndex}>{item}</td>
            ))}

            {/* Renderização condicional do botão de Edição caso a função seja fornecida. */}
            {row.editFunction != undefined && (
              <td>
                <Button
                  descricao={"Edit"}
                  className={"button-edit"}
                  onClick={() => row.editFunction?.(row.items[0])}
                />
              </td>
            )}

            {/* Renderização condicional do botão de Deleção para atender o requisito de gerenciamento. */}
            {row.deleteFunction != undefined && (
              <td>
                <Button
                  descricao={"Delete"}
                  className={"button-delete"}
                  onClick={() => row.deleteFunction?.(row.items[0])} // Dispara a exclusão
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
