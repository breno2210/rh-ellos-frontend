import "./App.css"
import DashboardCards from "./components/DashboardCards"
import FuncionarioForm from "./components/FuncionarioForm"
import FuncionarioList from "./components/FuncionarioList"

function App(){

  return(

    <div className="app-container">

      <h1>Sistema de RH</h1>

      <div className="cards">
        <DashboardCards/>
      </div>

      <div className="form-section">
        <FuncionarioForm/>
      </div>

      <div className="list-section">
        <FuncionarioList/>
      </div>

    </div>

  )

}

export default App