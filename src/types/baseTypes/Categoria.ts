import type { Transacao } from "./Transacao";

// Define a estrutura da finalidade da categoria (Receita, Despesa ou Ambas).
export interface Finalidade {
  codigo: number;
  descricao: string;
}

// Representação completa da Categoria com seus relacionamentos carregados.
export interface Categoria {
  codigo: number;
  nome: string;
  finalidade: Finalidade;
  // Lista de transações vinculadas para facilitar o cálculo de totais por categoria.
  transcacoes: Transacao[];
}

// Objeto simplificado para o envio de novos cadastros para a WebApi.
export interface CategoriaCriarDTO {
  nome: string;
  finalidade: number; // Envia o ID da finalidade escolhida no formulário.
}
