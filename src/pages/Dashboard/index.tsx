import Card from "../../components/Card/card";
import { getPessoas, deletarPessoa } from "../../services/pessoaServices";
import {
  calcularSaldo,
  calcularTotalReceitas,
  calcularTotalDespesas,
} from "../../util/financeUtils";
import { getCategorias } from "../../services/categoriaServices";
import { getTransacoes } from "../../services/transacaoServices";
import { useEffect, useState } from "react";
import { type Pessoa } from "../../types/baseTypes/Pessoa";

import "./style.css";
import type { Categoria } from "../../types/baseTypes/Categoria";
import type { Transacao } from "../../types/baseTypes/Transacao";
import Loader from "../../components/BaseComponents/Loader/Loader";
import type { tbodyItem } from "../../types/systemTypes/TableInterface";
import Button from "../../components/BaseComponents/Button/Button";
import Modal from "../../components/Modal/Modal";
import PessoaForm from "../../components/ModalForms/Pessoa/PessoaFormsModal";
import CategoriaForm from "../../components/ModalForms/Categoria/CategoriaFormsModal";
import TransacaoForm from "../../components/ModalForms/Transacoes/TransacoesFormsModal";
import StatusGeral from "../../components/StatusGeral/StatusGeral";
import { AlertService } from "../../util/alertUtils";

type ModalType =
  | "PESSOA_CADASTRO"
  | "CATEGORIA_CADASTRO"
  | "TRANSACAO_CADASTRO"
  | "EDIT_PESSOA"
  | null;

export default function Dashboard() {
  const [listPessoas, setListPessoas] = useState<Pessoa[]>([]);
  const [listCategorias, setListCategorias] = useState<Categoria[]>([]);
  const [listTransacoes, setListTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | null>(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleOpenEditPessoa = (codigo: string) => {
    const pessoa = listPessoas.find((p) => p.codigo.toString() === codigo);
    if (pessoa) {
      setSelectedPessoa(pessoa);
      setActiveModal("PESSOA_CADASTRO");
    }
  };

  // Centraliza a atualização de dados para garantir consistência após ações de CRUD.
  async function fetchData() {
    setLoading(true);
    const [pessoas, categorias, transacoes] = await Promise.all([
      getPessoas(),
      getCategorias(),
      getTransacoes(),
    ]);
    setListCategorias(categorias);
    setListTransacoes(transacoes);
    setListPessoas(pessoas);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className={"card-grid-dashboard"}>
        {/* Componente que exibe o resumo financeiro consolidado (Total Geral). */}
        <Card
          className={"card-fullScreen"}
          hasBodyComponent={true}
          BodyComponent={
            <StatusGeral
              ListCategoria={listCategorias}
              ListPessoa={listPessoas}
            />
          }
        />

        {/* Listagem de Totais por Pessoa conforme requisito da especificação técnica. */}
        <Card
          className="card-sg"
          hasHeader={true}
          title="Consulta de totais por pessoa"
          headerComponent={
            <Button
              descricao="Nova Pessoa"
              onClick={() => setActiveModal("PESSOA_CADASTRO")}
            />
          }
          hasTable={true}
          tableHead={[
            "Codigo",
            "Nome",
            "Idade",
            "Receita",
            "Despesas",
            "Saldo",
            "Editar",
            "Deletar",
          ]}
          tableBodyItems={listPessoas.map(
            (pessoa) =>
              ({
                items: [
                  pessoa.codigo.toString(),
                  pessoa.nome,
                  pessoa.idade.toString(),
                  "R$: " + calcularTotalReceitas(pessoa.transacoes).toFixed(2),
                  "R$: " + calcularTotalDespesas(pessoa.transacoes).toFixed(2),
                  "R$: " + calcularSaldo(pessoa.transacoes).toFixed(2),
                ],
                // A deleção de pessoa dispara a deleção em cascata das transações no backend.
                deleteFunction: async (id: string) => {
                  const confirmou = await AlertService.confirmDelete(
                    "esta pessoa"
                  );
                  if (confirmou) {
                    const sucesso = await deletarPessoa(parseInt(id));
                    if (sucesso) fetchData();
                  }
                },
                editFunction: (id: string) => handleOpenEditPessoa(id),
              } as tbodyItem)
          )}
        />

        {/* Listagem de Totais por Categoria (Requisito Opcional implementado). */}
        <Card
          className="card-sg"
          hasHeader={true}
          title="Consulta de totais por categoria"
          headerComponent={
            <Button
              descricao="Nova Categoria"
              onClick={() => setActiveModal("CATEGORIA_CADASTRO")}
            />
          }
          hasTable={true}
          tableHead={[
            "Codigo",
            "Nome",
            "Finalidade",
            "Receita",
            "Despesas",
            "Saldo",
          ]}
          tableBodyItems={listCategorias.map(
            (categoria) =>
              ({
                items: [
                  categoria.codigo.toString(),
                  categoria.nome,
                  categoria.finalidade.descricao,
                  "R$: " +
                    calcularTotalReceitas(categoria.transcacoes).toFixed(2),
                  "R$: " +
                    calcularTotalDespesas(categoria.transcacoes).toFixed(2),
                  "R$: " + calcularSaldo(categoria.transcacoes).toFixed(2),
                ],
              } as tbodyItem)
          )}
        />

        {/* Histórico de Transações ordenado para exibir os lançamentos mais recentes primeiro. */}
        <Card
          className="card-sg"
          hasHeader={true}
          title="Ultimas transações"
          headerComponent={
            <Button
              descricao="Nova Transação"
              onClick={() => setActiveModal("TRANSACAO_CADASTRO")}
            />
          }
          hasTable={true}
          tableHead={[
            "Codigo",
            "Descrição",
            "Valor",
            "Tipo",
            "Categoria",
            "Pessoa",
          ]}
          tableBodyItems={listTransacoes
            .sort((a, b) => b.codigo - a.codigo)
            .map(
              (transacao) =>
                ({
                  items: [
                    transacao.codigo.toString(),
                    transacao.descricao,
                    "R$: " + transacao.valor.toFixed(2),
                    transacao.tipo.descricao,
                    transacao.categoria.nome,
                    transacao.pessoa.nome,
                  ],
                } as tbodyItem)
            )}
        />
      </div>

      {/* Switch Case para gerenciamento dinâmico de modais de cadastro. */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => {
          closeModal();
          setSelectedPessoa(null); // Limpa a seleção ao fechar para não bugar o próximo "Novo"
        }}
        title={activeModal?.replace("_", " ") || ""}
      >
        {(() => {
          switch (activeModal) {
            case "PESSOA_CADASTRO":
              return (
                <PessoaForm
                  pessoaParaEditar={selectedPessoa}
                  onSuccess={() => {
                    fetchData();
                    closeModal();
                    setSelectedPessoa(null);
                  }}
                />
              );
            case "CATEGORIA_CADASTRO":
              return (
                <CategoriaForm
                  onSuccess={() => {
                    fetchData();
                    closeModal();
                  }}
                />
              );
            case "TRANSACAO_CADASTRO":
              return (
                <TransacaoForm
                  onSuccess={() => {
                    fetchData();
                    closeModal();
                  }}
                  listCategorias={listCategorias}
                  listPessoas={listPessoas}
                />
              );
            default:
              return null;
          }
        })()}
      </Modal>
    </>
  );
}
