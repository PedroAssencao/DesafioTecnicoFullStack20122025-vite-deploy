import { type Transacao } from "../types/baseTypes/Transacao";

/**
 * Calcula o total de uma lista de transações filtrando pelo tipo.
 * Tipo 1 = Despesa, Tipo 2 = Receita
 */

export const calcularTotalPorTipo = (
  transacoes: Transacao[],
  tipoCodigo: number
): number => {
  if (!transacoes) return 0;
  return transacoes
    .filter((t) => t.tipo.codigo === tipoCodigo)
    .reduce((acc, t) => acc + t.valor, 0);
};

// Retorna o total de Despesas (Código 1)
export const calcularTotalDespesas = (transacoes: Transacao[]): number => {
  return calcularTotalPorTipo(transacoes, 1);
};

// Retorna o total de Receitas (Código 2)
export const calcularTotalReceitas = (transacoes: Transacao[]): number => {
  return calcularTotalPorTipo(transacoes, 2);
};

// Retorna o saldo líquido (Receitas - Despesas)
export const calcularSaldo = (transacoes: Transacao[]): number => {
  return calcularTotalReceitas(transacoes) - calcularTotalDespesas(transacoes);
};
