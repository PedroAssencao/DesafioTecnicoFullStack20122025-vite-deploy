import { type Transacao } from "./Transacao";

// Interface principal que representa a entidade Pessoa com suas transações vinculadas.
export interface Pessoa {
  codigo: number;
  nome: string;
  idade: number;
  // Relacionamento necessário para o cálculo de saldo e totais no Dashboard.
  transacoes: Transacao[];
}

// DTO para cadastro: segue a regra de negócio onde o Identificador é gerado automaticamente pelo backend.
export interface PessoaCriarDTO {
  nome: string;
  idade: number;
}

// DTO para atualização: inclui o código para identificação do registro no banco de dados.
export interface PessoaAtualizarDTO {
  codigo: number;
  nome: string;
  idade: number;
}
