import { type Categoria } from "./Categoria";
import { type Pessoa } from "./Pessoa";

// Define se a transação é uma Receita ou Despesa (utilizado para validações de regra de negócio).
export interface TipoTransacao {
  codigo: number;
  descricao: string;
}

// Representação completa da Transação com seus relacionamentos (Pessoa e Categoria).
export interface Transacao {
  codigo: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoria: Categoria;
  pessoa: Pessoa;
}

// DTO para criação: centraliza as chaves estrangeiras e o valor formatado para o processamento do formulário.
export interface TransacaoCriarDTO {
  descricao: string;
  valor: number;
  tipo: number; // Referência ao ID do TipoTransacao.
  categoriaCodigo: number; // FK para Categoria, respeitando a restrição de finalidade.
  valorDisplay: string; // Auxiliar para máscara de input monetário na interface.
  pessoaCodigo: number; // FK para Pessoa, utilizada para validar a regra de idade (menor de 18).
}
