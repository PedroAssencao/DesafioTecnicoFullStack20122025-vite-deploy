import { useState } from "react";
import { cadastrarNovaCategoria } from "../../../services/categoriaServices";
import Button from "../../BaseComponents/Button/Button";
import Input from "../../BaseComponents/Input/Input";
import Select from "../../BaseComponents/Select/Select";
import "./style.css";

// Formulário para criação de categorias, essencial para a regra de restrição de transações.
export default function CategoriaForm(props: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    nome: "",
    finalidade: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Opções que definem se a categoria aceita receitas, despesas ou ambos os tipos.
  const finalidadeOptions = [
    { value: 1, label: "Despesa" },
    { value: 2, label: "Receita" },
    { value: 3, label: "Ambas" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Envio dos dados para o service que comunica com a WebApi.
    const resultado = await cadastrarNovaCategoria(formData);
    try {
      if (resultado) {
        // Callback para atualizar a listagem no dashboard e fechar o modal.
        props.onSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <Input
        label="Nome da Categoria"
        placeholder="Ex: Salário ou Lazer"
        required
        value={formData.nome}
        onChange={(val) => setFormData({ ...formData, nome: val })}
      />

      <Select
        label="Finalidade"
        required
        options={finalidadeOptions}
        value={formData.finalidade}
        onChange={(val) =>
          setFormData({ ...formData, finalidade: parseInt(val) || 0 })
        }
      />

      <div className="form-actions">
        <Button
          descricao={isSubmitting ? "Salvando..." : "Cadastrar Categoria"}
          className="button-save"
          typeButton="submit"
        />
      </div>
    </form>
  );
}
