import "./App.css";
import CustomRoutes from "./customRoutes/CustomRoutes.jsx";
import { Link } from "react-router-dom";
 
const App = () => {
  
  return (
    <div className="app-wrapper">
      <Link
        to="/"
        className="pokedex-heading"
      >
        <h1 className="pokkedex-heading-main">Pokedex</h1>
      </Link>
      <CustomRoutes   />
    </div>
  );
};

export default App;
