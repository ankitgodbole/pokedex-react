import { Route, Routes } from "react-router-dom";
import Pokedex from "../pokedex/Pokedex.jsx";
import PokemonDetails from "../pokemonDetails/PokemonDetails.jsx";


function CustomRoutes( ) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Pokedex  />
        }
      />

      <Route path="/pokemon/:id" element={<PokemonDetails />} />
    </Routes>
  );
}

export default CustomRoutes;