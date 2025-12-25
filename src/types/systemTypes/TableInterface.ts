// Define a estrutura de uma linha (row) para o componente de tabela genérico.
export interface tbodyItem {
  // Função opcional para disparar a exclusão do registro, recebendo o ID como parâmetro.
  deleteFunction?: (id: string) => void;

  // Função opcional para abrir o modo de edição do registro.
  editFunction?: (id: string) => void;

  // Array de strings contendo os dados que serão exibidos em cada coluna da linha.
  items: string[];
}
