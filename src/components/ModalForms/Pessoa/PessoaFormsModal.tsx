import { useState, useEffect } from "react";
import {
  type Pessoa,
  type PessoaCriarDTO,
  type PessoaAtualizarDTO,
} from "../../../types/baseTypes/Pessoa";
import {
  cadastrarNovaPessoa,
  atualizarPessoa,
} from "../../../services/pessoaServices";
import Button from "../../BaseComponents/Button/Button";
import Input from "../../BaseComponents/Input/Input";
import "./style.css";

// Adicionamos a prop pessoaParaEditar
export default function PessoaForm(props: {
  onSuccess: () => void;
  pessoaParaEditar?: Pessoa | null;
}) {
  const [formData, setFormData] = useState({
    codigo: 0,
    nome: "",
    idade: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Se houver pessoa para editar, preenche o formulário ao carregar
  useEffect(() => {
    if (props.pessoaParaEditar) {
      setFormData({
        codigo: props.pessoaParaEditar.codigo,
        nome: props.pessoaParaEditar.nome,
        idade: props.pessoaParaEditar.idade,
      });
    }
  }, [props.pessoaParaEditar]);

  const isEditing = formData.codigo > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let resultado;

      if (isEditing) {
        // Modo Edição
        const dadosUpdate: PessoaAtualizarDTO = {
          codigo: formData.codigo,
          nome: formData.nome,
          idade: formData.idade,
        };
        resultado = await atualizarPessoa(dadosUpdate);
      } else {
        // Modo Cadastro
        const dadosCreate: PessoaCriarDTO = {
          nome: formData.nome,
          idade: formData.idade,
        };
        resultado = await cadastrarNovaPessoa(dadosCreate);
      }

      if (resultado) {
        props.onSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      {/* O código fica oculto, mas presente no estado do formulário */}
      <Input
        label="Nome"
        placeholder="Ex: Pedro Assenção"
        required
        value={formData.nome}
        onChange={(val) => setFormData({ ...formData, nome: val })}
      />

      <Input
        label="Idade"
        type="number"
        placeholder="Ex: 21"
        required
        value={formData.idade || ""}
        onChange={(val) =>
          setFormData({ ...formData, idade: parseInt(val) || 0 })
        }
      />

      <div className="form-actions">
        <Button
          descricao={
            isSubmitting
              ? "Processando..."
              : isEditing
              ? "Salvar Alterações"
              : "Cadastrar"
          }
          className="button-save"
          typeButton="submit"
        />
      </div>
    </form>
  );
}
