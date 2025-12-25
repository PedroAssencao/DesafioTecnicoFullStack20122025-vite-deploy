import { useState, useMemo } from "react";
import type { Categoria } from "../../types/baseTypes/Categoria";
import type { Pessoa } from "../../types/baseTypes/Pessoa";
import {
  calcularTotalReceitas,
  calcularTotalDespesas,
  calcularSaldo,
} from "../../util/financeUtils";
import Select from "../BaseComponents/Select/Select";
import "./style.css";

interface StatusGeralProps {
  ListPessoa: Pessoa[];
  ListCategoria: Categoria[];
}

// Componente da Dashboard que consolida os totais gerais
export default function StatusGeral({
  ListPessoa,
  ListCategoria,
}: StatusGeralProps) {
  const [visao, setVisao] = useState<"pessoa" | "categoria">("pessoa");

  // Consolida todas as transações da lista selecionada para realizar o cálculo global.
  const transacoesConsolidadas = useMemo(() => {
    if (visao === "pessoa") {
      return ListPessoa.flatMap((p) => p.transacoes || []);
    } else {
      return ListCategoria.flatMap((c) => c.transcacoes || []);
    }
  }, [visao, ListPessoa, ListCategoria]);

  // Aplica as funções utilitárias para obter os somatórios finais.
  const totalReceitas = calcularTotalReceitas(transacoesConsolidadas);
  const totalDespesas = calcularTotalDespesas(transacoesConsolidadas);
  const saldoGeral = calcularSaldo(transacoesConsolidadas);

  return (
    <div className="status-geral-wrapper">
      <div className="status-geral-header">
        <Select
          label="Filtrar Totais por:"
          value={visao}
          onChange={(val) => setVisao(val as "pessoa" | "categoria")}
          options={[
            { value: "pessoa", label: "Todas as Pessoas" },
            { value: "categoria", label: "Todas as Categorias" },
          ]}
        />
      </div>

      <div className="status-geral-grid">
        {/* Exibição do somatório de receitas conforme requisito. */}
        <div className="status-card receita">
          <span className="card-label">Total Receitas</span>
          <h2 className="card-value">R$ {totalReceitas.toFixed(2)}</h2>
        </div>

        {/* Exibição do somatório de despesas conforme requisito. */}
        <div className="status-card despesa">
          <span className="card-label">Total Despesas</span>
          <h2 className="card-value">R$ {totalDespesas.toFixed(2)}</h2>
        </div>

        {/* Exibição do saldo líquido (Receita - Despesa) com destaque visual para valores negativos. */}
        <div className="status-card saldo">
          <span className="card-label">Saldo Geral</span>
          <h2
            className={`card-value ${
              saldoGeral >= 0 ? "positivo" : "negativo"
            }`}
          >
            R$ {saldoGeral.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}
