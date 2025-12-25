import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      {/* Header fixo para navegação global da aplicação. */}
      <Header />

      {/* Container principal que centraliza o Dashboard de controle financeiro. */}
      <div className={"container-fluid"}>
        <Dashboard />
      </div>

      {/* Rodapé institucional com informações básicas do sistema. */}
      <Footer />
    </>
  );
}

export default App;
