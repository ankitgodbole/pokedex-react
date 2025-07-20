import { useState } from "react";
import PokemonList from "../pokemonList/PokemonList.jsx";
import Search from "../search/Search";
import PokemonDetails from "../pokemonDetails/PokemonDetails.jsx";
import "./Pokedex.css";
import useDebounce from "../hooks/useDebounce.js";


function Pokedex( ) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 1000);

 
  
  return (
    <div className="pokedex-wrapper">
      <Search updateSearchTerm={setSearchTerm} />

      {/* ✅ As you type live update */}
      {debouncedSearch.trim() === "" ? (
        <PokemonList />
      ) : (
        <PokemonDetails pokemonName={debouncedSearch.toLowerCase()} />
      )}
    </div>
  );
}

export default Pokedex;
