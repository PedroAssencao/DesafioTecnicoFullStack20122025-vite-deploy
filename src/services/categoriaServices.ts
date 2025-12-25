import type {
  Categoria,
  CategoriaCriarDTO,
} from "../types/baseTypes/Categoria";
import { AlertService, handleApiError } from "../util/alertUtils";

const apiUrl = import.meta.env.VITE_API_URL;


export async function getCategorias(): Promise<Categoria[]> {
  try {
    const response = await fetch(
      `${apiUrl}v1/Categoria/BuscarTodasAsCategorias`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
        },
      }
    );

    if (!response.ok) {
      const errorData = await handleApiError(response);
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function cadastrarNovaCategoria(
  dados: CategoriaCriarDTO
): Promise<Categoria | void> {
  try {
    const response = await fetch(`${apiUrl}v1/Categoria/CriarCategoria`, {
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

    const resultado: Categoria = await response.json();
    AlertService.success("Sucesso", "Categoria cadastrada com sucesso!");
    return resultado;
  } catch (error) {
    console.error(error);
  }
}
