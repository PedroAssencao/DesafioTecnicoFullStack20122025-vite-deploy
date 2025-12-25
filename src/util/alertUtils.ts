import Swal from "sweetalert2";

// Configuração global para notificações rápidas (Toasts) do sistema.
const Toast = Swal.mixin({
  timer: 3000,
  timerProgressBar: true,
  background: "#1B1E25",
  color: "#fff",
  confirmButtonColor: "#272A31",
  cancelButtonColor: "#d33",
});

// Função auxiliar para processar e exibir erros de validação retornados pela API.
export const handleApiError = async (response: Response) => {
  const errorData = await response.json();
  if (errorData.messages && Array.isArray(errorData.messages)) {
    const errorText = errorData.messages
      .map((m: any) => m.message)
      .join("<br>");

    Swal.fire({
      icon: "error",
      title: "Erro de validação",
      html: errorText,
      background: "#1B1E25",
      color: "#fff",
      confirmButtonColor: "#d33",
    });
  }
  return errorData;
};

export const AlertService = {
  // Exibe mensagem de sucesso após operações de cadastro ou deleção.
  success: (title: string, text?: string) => {
    return Toast.fire({
      icon: "success",
      title,
      color: "#fff",
      background: "#1B1E25",
      text,
    });
  },

  // Centraliza o feedback visual de erros capturados nas chamadas de API.
  error: (title: string, text?: string) => {
    return Swal.fire({
      icon: "error",
      title,
      text,
      color: "#fff",
      background: "#1B1E25",
      confirmButtonColor: "#d33",
    });
  },

  // Modal de confirmação para prevenir exclusões acidentais de registros.
  confirmDelete: async (itemNome: string) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: `Você está prestes a excluir "${itemNome}". Esta ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      color: "#fff",
      confirmButtonColor: "#d33",
      background: "#1B1E25",
      cancelButtonColor: "#272A31",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    return result.isConfirmed;
  },
};
