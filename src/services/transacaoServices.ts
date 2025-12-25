import type {
  Transacao,
  TransacaoCriarDTO,
} from "../types/baseTypes/Transacao";
import { AlertService, handleApiError } from "../util/alertUtils";

const apiUrl = import.meta.env.VITE_API_URL;

// Busca todas as transações para alimentar o histórico e os relatórios de totais.
export async function getTransacoes(): Promise<Transacao[]> {
  try {
    const response = await fetch(
      `${apiUrl}v1/Transacoes/BuscarTodasAsTransacoes`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
        },
      }
    );

    if (!response.ok) {
      console.log(response)
      const errorData = await handleApiError(response);
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Envia os dados para criação de transação, validando as regras de negócio no servidor.
export async function cadastrarNovaTransacao(
  dados: TransacaoCriarDTO
): Promise<Transacao | void> {
  try {
    const response = await fetch(`${apiUrl}v1/Transacoes/CriarTransacao`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const errorData = await handleApiError(response);
      throw errorData;
    }

    const resultado: Transacao = await response.json();
    // Feedback visual positivo utilizando o serviço de alertas customizado.
    AlertService.success("Sucesso", "Transação realizada com sucesso!");
    return resultado;
  } catch (error) {
    console.error(error);
  }
}
