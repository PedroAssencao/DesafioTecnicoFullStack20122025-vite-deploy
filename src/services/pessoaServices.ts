import type {
  Pessoa,
  PessoaAtualizarDTO,
  PessoaCriarDTO,
} from "../types/baseTypes/Pessoa";
import { AlertService, handleApiError } from "../util/alertUtils";

const apiUrl = import.meta.env.API_URL;

// Obtém a lista de pessoas para preenchimento de tabelas e selects.
export async function getPessoas(): Promise<Pessoa[]> {
  try {
    const response = await fetch(`${apiUrl}v1/Pessoa/BuscarTodasAsPessoas`);

    if (!response.ok) {
      const errorData = await handleApiError(response);
      throw errorData;
    }

    const data: Pessoa[] = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao buscar pessoas:", error);
    throw error;
  }
}

// Realiza o cadastro de uma nova pessoa no sistema.
export async function cadastrarNovaPessoa(
  dados: PessoaCriarDTO
): Promise<Pessoa | void> {
  try {
    const response = await fetch(apiUrl + "v1/Pessoa/CadastrarNovaPessoa", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      await handleApiError(response);
      return;
    }

    const resultado: Pessoa = await response.json();
    AlertService.success("Sucesso", "Pessoa cadastrada com sucesso!");
    return resultado;
  } catch (error) {
    console.error("Falha ao cadastrar pessoa:", error);
  }
}

// Atualiza dados de uma pessoa existente (Recurso adicional ao desafio).
export async function atualizarPessoa(
  dados: PessoaAtualizarDTO
): Promise<boolean> {
  try {
    const response = await fetch(apiUrl + "v1/Pessoa/AtualizarPessoa", {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      await handleApiError(response);
      return false;
    }

    const sucesso: boolean = await response.json();
    AlertService.success("Sucesso", "Pessoa atualizada com sucesso!");
    return sucesso;
  } catch (error) {
    console.error("Falha na comunicação com o servidor:", error);
    return false;
  }
}

// Remove uma pessoa e dispara a regra de exclusão de transações vinculadas.
export async function deletarPessoa(id: number): Promise<boolean> {
  try {
    const urlComParametro = `${apiUrl}v1/Pessoa/DeletarPessoa?id=${id}`;

    const response = await fetch(urlComParametro, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    });

    if (!response.ok) {
      await handleApiError(response);
      return false;
    }

    const sucesso: boolean = await response.json();
    AlertService.success("Sucesso", "Pessoa deletada com sucesso!");
    return sucesso;
  } catch (error) {
    console.error("Falha na comunicação ao tentar deletar:", error);
    return false;
  }
}
