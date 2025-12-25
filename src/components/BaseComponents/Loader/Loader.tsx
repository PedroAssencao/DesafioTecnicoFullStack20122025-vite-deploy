import './style.css';

// Componente de feedback visual exibido durante o carregamento assíncrono de dados da API.
export default function Loader() {
  return (
    <div className="loader-container">
      {/* Elemento CSS que representa o indicador de progresso (spinner). */}
      <div className="spinner"></div>
    </div>
  );
}